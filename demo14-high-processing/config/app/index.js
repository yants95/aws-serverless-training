const sleep = ms = new Promise(r => setTimeout(r, ms))

;(async () => {
    console.log('starting...', new Date().toISOString())
    await sleep(2000)
    console.log('finishing...', new Date().toISOString())
})()