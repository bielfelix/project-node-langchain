import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'



test('command upper tranforms message into UPPERCASE', async () => {

    const app = createServer()
    const msg = 'make THis message UPPER please!'
    const expected = msg.toUpperCase()
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: msg}
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.body, expected)

})

test('command lower tranforms message into LOWERCASE', async () => {

    const app = createServer()
    const msg = 'MAKE THIS MESSAGE LOWER PLEASE!'
    const expected = msg.toLowerCase()
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: msg}
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.body, expected)

})
