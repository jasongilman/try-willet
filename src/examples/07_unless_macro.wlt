/**
 * An example of creating a macro. It's similar to `if` but only runs if the condition is falsey.
 */
defmacro unless = #(context block condition) => {
  quote {
    if (!unquote(condition)) {
      unquote(block)
    }
  }
}

unless(false) {
  console.log('The condition was not truthy')
}
