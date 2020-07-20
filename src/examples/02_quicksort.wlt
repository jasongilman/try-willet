const quicksort = #([pivot ...others]) => {
  if (pivot) {
    concat(
      quicksort(filter(others #(v) => pivot >= v ))
      [pivot]
      quicksort(filter(others #(v) => pivot < v ))
    )
  }
}
quicksort([3 1 9 4 5 7 6 8 2 0])
