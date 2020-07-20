
// Expands the "and" macro call here to show the RAW AST
console.log(JSON.stringify(
  macroexpandRaw(
    and(
      1
      true
      0
      false
    )
  )
  null 2))
