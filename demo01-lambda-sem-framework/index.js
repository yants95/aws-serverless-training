async function handler(event, context) {
    console.log('Ambiente..', JSON.stringify(process.env, null, 2));
    console.log('EVENTO..', JSON.stringify(event, null, 2));

    return {
        Hey: 'Jude!'
    }
}

module.exports = {
    handler
}