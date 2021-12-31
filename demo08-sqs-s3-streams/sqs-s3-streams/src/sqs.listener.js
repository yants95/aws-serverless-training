class Handler {
    async main(event) {
        const [{ body, messageId }] = event.Records
        const item = JSON.parse(body)
        try {
            return {
                statusCode: 200,
                body: 'hello'
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Internal error'
            }
        }
    }
}

const handler = new Handler()
module.exports = handler.main.bind(handler)