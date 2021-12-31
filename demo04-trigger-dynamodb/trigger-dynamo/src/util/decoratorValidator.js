const decoratorValidator = (fn, schema, argsType) => {
    return async function (event) {
        const data = JSON.parse(event[argsType])

        // abortEarly = mostra todos os erros de uma vez
        const { error, value } = await schema.validate(
            data, { abortEarly: false }
        )

        // isso altera a instancia de arguments
        event[argsType] = value

        if (!error) return fn.apply(this, arguments)

        return {
            statusCode: 422,
            body: error.message
        }
    }
}

module.exports = decoratorValidator