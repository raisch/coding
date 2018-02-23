'use strict'
/* eslint-env browser, commonjs, jquery, es6 */

const util = require('util')
const EventEmitter = require('events')
const _ = require('lodash')

const noop = () => {}

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
const naive = function (max = MAX, cb = noop) {
  if (!_.isNumber(max) && max) {
    throw new TypeError('max must be greater than zero')
  }
  if (!_.isFunction(cb)) {
    throw new TypeError('cb must be a function')
  }

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

  cb(null, 'naive', result)
}

/**
 * FizzBuzz implementation using lodash.
 * @param  {number} [max=MAX] - max number of values
 * @param  {Callback} cb
 */
const usingLodash = function (max = MAX, cb = noop) {
  if (!_.isNumber(max) && max) {
    throw new TypeError('max must be greater than zero')
  }
  if (!_.isFunction(cb)) {
    throw new TypeError('cb must be a function')
  }

  _.mixin({
    canDivideByThree: (val) => val % 3 == 0,
    canDivideByFive: (val) => val % 5 == 0
  })

  const result = _(_.range(1, 1 + max)) // exclusive
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

  cb(null, 'usingLodash', result)
}

/**
 * Parameterized implementation of FizzBuzz.
 *
 * @param  {Array.<Number>}  [range=[]] - range of numbers to process
 * @param  {Array.<FizzBuzzMutator>}  [mutators=[]] - used to mutate values in range
 * @param  {Callback} cb
 */
const parameterized = function (range = [], mutators = [], cb = noop) {
  if (!_.isArray(range)) {
    throw new TypeError('range must be an array')
  }
  if (!_.isArray(mutators)) {
    throw new TypeError('mutators must be an array')
  }
  if (!_.isFunction(cb)) {
    throw new TypeError('cb must be a function')
  }
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
  cb(null, 'parameterized', result)
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
const functional = function (range = [], mutators = [], cb = noop) {
  if (!_.isArray(range)) {
    throw new TypeError('range must be an array')
  }
  if (!_.isArray(mutators)) {
    throw new TypeError('mutators must be an array')
  }
  if (!_.isFunction(cb)) {
    throw new TypeError('cb must be a function')
  }

  const result = range.map(num => {
    const res = mutators.map(([value, mutator]) => {
      return mutator(num) ? value : num
    }).filter(p => typeof p === 'string')
    return res.length ? res.join('') : num
  })

  cb(null, 'functional', result)
}

/**
 * Event-based implementation of FizzBuzz.
 *
 * @param  {Array.<Number>}  [range=[]] - range of numbers to process
 * @param  {Array.<FizzBuzzMutator>}  [mutators=[]] - used to mutate values in range
 * @param  {Callback} [cb] - if not provided, result will be printed via console.log
 */
const events = function (range = [], mutators = [], cb = noop) {
  if (!_.isArray(range)) {
    throw new TypeError('range must be an array')
  }
  if (!_.isArray(mutators)) {
    throw new TypeError('mutators must be an array')
  }
  if (!_.isFunction(cb)) {
    throw new TypeError('cb must be a function')
  }

  const E = new EventEmitter()

  E.on('start', () => { // initialize
    const opts = {
      range: _.merge([], range),
      mutators: _.merge([], mutators),
      current: {
        num: null,
        mutator: null,
        result: null
      },
      results: []
    }
    // console.log(`start: ${JSON.stringify(opts.current)}`)
    E.emit('nextNumber', opts)
  })

  E.on('nextNumber', opts => { // process next number in range
    opts.current.num = opts.range.shift()
    // console.log(`nextNumber(${JSON.stringify(opts.current)})`)
    if (!opts.current.num) {
      E.emit('complete', opts)
      return
    }
    opts.current.result = []
    E.emit('nextMutator', opts)
  })

  E.on('nextMutator', opts => { // process next mutator in mutators using num
    opts.current.mutator = opts.mutators.shift()
    // console.log(`nextMutator(${JSON.stringify(opts.current)})`)
    if (!opts.current.mutator) {
      opts.current.result = _.uniq(opts.current.result)

      const num = opts.current.result.filter(_.isNumber).shift()
      const str = opts.current.result.filter(_.isString).join('')

      opts.results.push(str || num)

      opts.mutators = _.merge([], mutators) // refresh mutators
      opts.current = {} // clear current state

      E.emit('nextNumber', opts)
      return
    }

    let [value, op] = opts.current.mutator
    opts.current.result.push(op(opts.current.num) ? value : opts.current.num)
    // console.log(`after mutator: ${JSON.stringify(opts.current)}`)
    E.emit('nextMutator', opts)
  })

  E.on('complete', opts => { // print results
    // console.log(`complete: ${JSON.stringify(opts, null, 2)}`)
    cb(null, 'events', opts.results)
  })

  E.emit('start')
}

const promised = function (range = [], mutators = [], cb = noop) {
  if (!_.isArray(range)) {
    throw new TypeError('range must be an array')
  }
  if (!_.isArray(mutators)) {
    throw new TypeError('mutators must be an array')
  }
  if (!_.isFunction(cb)) {
    throw new TypeError('cb must be a function')
  }

  const createMutatorPromise = (num) => new Promise((resolve, reject) => {
    const res = mutators.map(([value, mutator]) => {
      return mutator(num) ? value : num
    }).filter(_.isString)
    resolve(res.length ? res.join('') : num)
  })

  const promises = range.map(num => new Promise((resolve, reject) => {
    const res = mutators.map(([value, mutator]) => {
      return mutator(num) ? value : num
    }).filter(_.isString)
    resolve(res.length ? res.join('') : num)
  }))

  Promise.all(promises)
    .then(res => cb(null, 'promised', res))
    .catch(e => {
      console.error(`promised ERROR: ${e}`)
    })
}

/**
 * Returns an array of len numbers beginning with start.
 *
 * @param  {Number} len       - length of result
 * @param  {Number} [start=0] - first value in result
 * @return {array}
 */
const range = function (len, start = 0) {
  return [...Array(len)].map((v, i) => i + start)
}

module.exports = {
  range,
  naive,
  usingLodash,
  parameterized,
  functional,
  events,
  promised
}

/**
 * @typedef FizzBuzzMutator
 * @type {Array}
 * @property {String} 0 - value
 * @property {Function} 1 - mutator
 */

/**
 * @typedef {Function} Callback
 */
