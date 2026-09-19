# LangChain and LangGraph Reference Implementation

A technical reference implementation for LangChain and LangGraph with Node.js and TypeScript.

## Attribution

This repository is based on source material from the Software Engineering with Applied AI program published by UNIPDS and Erick Wendel.

Upstream material:
https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada

The base exercise comes from that material. I keep this repository public as hands-on technical implementation, not as an original implementation of the underlying course example.

## What the project demonstrates

- LangChain basics
- LangGraph execution flow
- Fastify integration
- Environment-based configuration
- LangSmith tracing configuration
- Automated tests
- TypeScript executed directly by modern Node.js

## Security note

Local credentials must be provided through a non-versioned `.env` file.

Use:

```bash
cp .env.example .env
```

Never commit real LangSmith or provider credentials.

## Run

Install dependencies:

```bash
npm ci
```

Create the local environment file:

```bash
cp .env.example .env
```

Run the project:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Portfolio status

This repository represents structured technical implementation of LangChain and LangGraph fundamentals.

It should not be treated as a flagship original project. The value here is the concrete implementation of the framework and execution model.


## License and distribution

The upstream course repository is published under CC BY-NC-ND 4.0. Its LICENSE.md states that modified or adapted versions may not be distributed under the NoDerivatives condition. This repository is therefore not presented as a permissively licensed open-source derivative. See [NOTICE.md](NOTICE.md) for the provenance and licensing note.
