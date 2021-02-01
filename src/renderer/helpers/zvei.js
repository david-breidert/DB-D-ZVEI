function getTonNummer(f) {
  const frequenzen = [
    1060,
    1160,
    1270,
    1400,
    1530,
    1670,
    1830,
    2000,
    2200,
    2400,
    2600,
    1240
  ]
  const toleranz = 13
  let currentTon = -1
  frequenzen.forEach((value, index) => {
    const min = value - toleranz
    const max = value + toleranz
    if (f >= min && f <= max) {
      if (index === 9) {
        currentTon = 0
      } else if (index === 10) {
        currentTon = 'R'
      } else if (index === 11) {
        currentTon = 'S'
      } else {
        currentTon = index + 1
      }
    }
  })
  return currentTon
}

function getValidatedTonfolge(tf, minTonCount, maxTonCount) {
  let counter = 0
  const result = []
  const counters = []
  tf.forEach((value, index) => {
    counter++
    if (value !== tf[index + 1] || index === tf.length - 1) {
      if (counter >= minTonCount && counter <= maxTonCount) {
        result.push(value)
        counters.push(counter)
      }
      counter = 0
    }
  })
  if (result.length > 5) {
    let lowestCount = 0
    while (result.length > 5) {
      counters.forEach((v, i) => {
        if (v < counters[lowestCount]) {
          lowestCount = i
        }
      })
      console.log(lowestCount)
      result.splice(lowestCount, 1)
    }
  } else if (result.length < 5) {
    return null
  }
  result.forEach((value, index) => {
    if (value === 'R') {
      result[index] = result[index - 1]
    }
  })
  return result
}

export { getTonNummer, getValidatedTonfolge }
