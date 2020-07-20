// An asynchronous function that will wait a number of milliseconds
const wait = #(millis) => new Promise(#(resolve) => {
  setTimeout(resolve millis)
})

// An example macro that will measure the time it takes to run the block that's passed
defmacro time = #(context block) => {
  quote {
    const start = Date.now()
    const result = unquote(block)
    console.log(`Took ${Date.now() - start} ms.`)
    result
  }
}

#(@async #() => {
  time {
    await wait(1000)
    5
  }
})()
