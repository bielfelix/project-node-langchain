import {
    START,
    END,
    MessagesZodMeta,
    StateGraph,
} from "@langchain/langgraph";
import { withLangGraph } from "@langchain/langgraph/zod";
import { BaseMessage } from "langchain";
import { z } from "zod/v3";

import { identifyIntent } from "./nodes/identifyIntentNode.ts";
import { chatResponseNode } from "./nodes/chatResponseNode.ts";
import { lowerCaseNode } from "./nodes/lowerCaseNode.ts";
import { upperCaseNode } from "./nodes/upperCaseNode.ts";

// A "mochila" que viaja pelo grafo. Os .default() dizem o que usar
// quando o campo nao vem preenchido — sem eles o teste quebra.
const GraphState = z.object({
    messages: withLangGraph(
        z.custom<BaseMessage[]>(),
        MessagesZodMeta
    ),
    output: z.string().default(""),
    command: z
        .enum(["uppercase", "lowercase", "unknown"])
        .default("unknown"),
});

export type GraphState = z.infer<typeof GraphState>;

export function buildGraph() {
    const workflow = new StateGraph({
        stateSchema: GraphState,
    })
        // 1. As estacoes de trabalho
        .addNode("identifyIntent", identifyIntent)
        .addNode("lowercase", lowerCaseNode)
        .addNode("uppercase", upperCaseNode)
        .addNode("chatResponse", chatResponseNode)

        // 2. Por onde a mensagem entra
        .addEdge(START, "identifyIntent")

        // 3. A bifurcacao: UM caminho so.
        //    Nao pode haver .addEdge fixo saindo de "identifyIntent"
        //    alem desta condicional — senao dois nos rodam juntos,
        //    os dois escrevem em "output" e da o erro
        //    INVALID_CONCURRENT_GRAPH_UPDATE
        .addConditionalEdges(
            "identifyIntent",
            (state: GraphState) => {
                switch (state.command) {
                    case "uppercase":
                        return "uppercase";
                    case "lowercase":
                        return "lowercase";
                    default:
                        return "fallback";
                }
            },
            {
                uppercase: "uppercase",
                lowercase: "lowercase",
                fallback: "chatResponse",
            }
        )

        // 4. Saidas. Nao sao tres END diferentes: sao tres setas
        //    apontando para a mesma linha de chegada.
        .addEdge("uppercase", END)
        .addEdge("lowercase", END)
        .addEdge("chatResponse", END);

    return workflow.compile();
}