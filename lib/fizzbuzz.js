
const _ = require('lodash')

/** @module */

/** @deprecated */
const divisibleBy = function (num, divisor) { // memoized
  const self = divisibleBy
  self.memo = self.memo || []
  return self.memo[num] != null
    ? self.memo[num]
    : (self.memo[num] = num % divisor == 0)
}

/**
 * Max of values to process.
 * @type {number}
 */
const MAX = 100

/**
 * Naive implementation of FizzBuzz
 * @param  {number} [max=MAX] - max number of values
 * @return {Array.<String,Number>}
 */
const naive = function(max = MAX) {
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

/**
 * FizzBuzz implementation using lodash.
 * @param  {number} [max=MAX] - max number of values
 * @return {Array.<String,Number>}
 */
const usingLodash = function(max = MAX) {
  _.mixin({
    canDivideByThree: (val) => val % 3 == 0,
    canDivideByFive: (val) => val % 5 == 0
  })

  return _(_.range(1, 1 + max)) // exclusive
    .map(val => {
      const isModuloThree = _.canDivideByThree(val)
      const isModuloFive = _.canDivideByFive(val)

      if (isModuloThree && isModuloFive) {
        return 'FizzBuzz'
      }

      if (isModuloThree) {
        return 'Fizz'
      }

      if (isModuloFive) {
        return 'Buzz'
      }

      return val
    })
    .value()
}

/**
 * Parameterized implementation of FizzBuzz.
 *
 * @param  {Array.<Number>}  [range=[]] - range of numbers to process
 * @param  {Array.<FizzBuzzMutator>}  [mutators=[]] - used to mutate values in range
 * @return {Array.<String|Number>}
 */
const parameterized = function(range = [], mutators = []) {
  const result = []
  range.forEach((num) => {
    let name = ''
    mutators.forEach(([value, mutator]) => {
      if (mutator(num)) {
        name += value
        return
      }
    })
    result.push(name || num)
  })
  return result
}

/**
 * Functional implementation of FizzBuzz.
 *
 * @param  {Array.<Number>}  [range=[]] - range of numbers to process
 * @param  {Array.<FizzBuzzMutator>}  [mutators=[]] - used to mutate values in range
 * @return {Array.<String|Number>}
 */
const functional = function(range = [], mutators = []) {
  return range.map(num => {
    let name = ''
    mutators.forEach(([value, mutator]) => {
      if (mutator(num)) {
        name += value
        return
      }
    })
    return name || num
  })
}

/**
 * Pure functional implementation of FizzBuzz.
 *
 * @param  {Array.<Number>}  [range=[]] - range of numbers to process
 * @param  {Array.<FizzBuzzMutator>}  [mutators=[]] - used to mutate values in range
 * @return {Array.<String|Number>}
 *
 * @example
 * const NUMS = range(1, 100) // => [1, 2, 3, ..., 100]
 *
 * const MUTATORS = [
 *   ['Fizz', i => i % 3 == 0 ],
 *   ['Buzz', i => i % 5 == 0 ]
 * ]
 *
 * pure(NUMS, MUTATORS) // => [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', ...]
 */
const pure = function(range = [], mutators = []) {
  return range.map(num => {
    const res = mutators.map(([value, mutator]) => {
      return mutator(num) ? value : num
    }).filter(p => typeof p === 'string')
    return res.length ? res.join('') : num
  })
}

/**
 * Returns an array of len numbers beginning with start.
 *
 * @param  {Number} len       - length of result
 * @param  {Number} [start=0] - first value in result
 * @return {array}
 */
const range = function(len, start = 0) {
  return [...Array(len)].map((v, i) => i + start)
}

module.exports = {
  range,
  naive,
  usingLodash,
  parameterized,
  functional,
  pure
}

/**
 * @typedef FizzBuzzMutator
 * @type {Array}
 * @property {String} 0 - value
 * @property {Function} 1 - mutator
 */
