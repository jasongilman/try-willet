/*
  Demonstrates the chain macro. It threads an input through each function call in the block that's
  passed to the macro.
*/
const isEven = #(n) => n % 2 == 0
const double = #(n) => n * 2

chain(range(0 10)) {
  filter(isEven)
  map(double)
  reduce(#(sum n) => sum + n)
}
