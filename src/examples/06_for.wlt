for(n range(0 5)
    :when n % 2 == 0
    j [:a :b :c :d :e]) {
  [n j]
}

// Try wrapping the for in macroexpand to see the equivalent willet code
