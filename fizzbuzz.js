
const _ = require('lodash')

const divisibleBy = function (num, divisor) { // memoized
  const self = divisibleBy
  self.memo = self.memo || []
  return self.memo[num] != null
    ? self.memo[num]
    : (self.memo[num] = num % divisor == 0)
}

/**
 * Max value.
 * @type {number}
 */
const MAX = 100

function naiveFizzBuzz (max = MAX) {
  let result = []

  for (let target = 1; target <= max; target++) {
    const isDivisableByThree = target % 3 == 0
    const isDivisableByFive = target % 5 == 0

    if (isDivisableByThree && isDivisableByFive) {
      result.push('FizzBuzz')
      continue
    }

    if (isDivisableByThree) {
      result.push('Fizz')
      continue
    }

    if (isDivisableByFive) {
      result.push('Buzz')
      continue
    }

    result.push(target)
  }

  return result
}

function lodashFizzBuzz (max = MAX) {
  return _.range(1, max + 1) // exclusive
    .map(val => {
      const isDivisableByThree = val % 3 == 0
      const isDivisableByFive = val % 5 == 0

      if (isDivisableByThree && isDivisableByFive) {
        return 'FizzBuzz'
      }

      if (isDivisableByThree) {
        return 'Fizz'
      }

      if (isDivisableByFive) {
        return 'Buzz'
      }

      return val
    })
}

function parameterizedFizzBuzz (range = [], tests = []) {
  const result = []
  range.forEach((num) => {
    let name = ''
    tests.forEach(([value, predicate]) => {
      if (predicate(num)) {
        name += value
        return
      }
    })
    result.push(name ? name : num)
  })
  return result
}

function functionalFizzBuzz (range = [], tests = []) {
  return range.map(num => {
    let name = ''
    tests.forEach(([value, predicate]) => {
      if (predicate(num)) {
        name += value
        return
      }
    })
    return name ? name : num
  })
}

function pureFizzBuzz (range = [], tests = []) {
  return range.map(num => {
    const parts = tests.map(([value, predicate]) => {
      return predicate(num) ? value : num
    })
    let res = parts.filter(p => typeof p === 'string')
    return res.length ? res.join('') : num
  })
}

/**
 * Returns an array of len numbers starting at start.
 * @param  {Number} len       - length of result
 * @param  {Number} [start=0] - first value in result
 * @return {array}
 */
function range (len, start = 0) {
  return [...Array(len)].map((v, i) => i + start)
}

// print results of all methodologies

console.log({
  result: {
    naive: naiveFizzBuzz().join(' '),
    lodash: lodashFizzBuzz().join(' '),
    param: parameterizedFizzBuzz(
      range(100, 1),
      [
        ['Fizz', function (i) { return i % 3 == 0 }],
        ['Buzz', function (i) { return i % 5 == 0 }]
      ]
    ).join(' '),
    functional1: functionalFizzBuzz(
      range(100, 1)
      [
        ['Fizz', function (i) { return i % 3 == 0 }],
        ['Buzz', function (i) { return i % 5 == 0 }]
      ]
    ).join(' '),
    pure: pureFizzBuzz(
      range(100, 1),
      [
        ['Fizz', i => i % 3 == 0 ],
        ['Buzz', i => i % 5 == 0 ]
      ]
    ).join(' ')
  }
})
