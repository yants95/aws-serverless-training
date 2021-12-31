const handler = {
    async main(event) {
        return { statusCode: 200 }
    }
}

module.exports = handler.main.bind(handler)