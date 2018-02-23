'use strict'
/* eslint-env node, es6 */

const _ = require('lodash')

/**
 * Example using all implementations of the FizzBuzz problem in lib/fizzbuzz.js
 *
 * @module
 */

const FB = require('./lib/fizzbuzz')

/**
 * Upper limit of numbers to operate upon.
 *
 * @type {Number}
 */
const MAX = 100

/**
 * Numbers from 1 to MAX
 *
 * @type {Array.<Number>}
 */
const RANGE = FB.range(MAX, 1)

/**
 * Mutators to produce result.
 *
 * @type {Array.<FizzBuzzMutator>}
 */
const MUTATORS = [
  ['Fizz', i => i % 3 == 0 ],
  ['Buzz', i => i % 5 == 0 ]
]

/**
 * Default callback to print result to console.
 *
 * @param {Error|null} err - error report
 * @param {String} impl - name of the implementation
 * @param {Array.<Number,String>} results - results of run
 */
const CB = (err, impl, results) => {
  if(err) {
    throw new Error(err)
  }
  console.log(`${_.padEnd(impl, 12)}: ${results.join(' ')}\n`)
}

// run impls that take a MAX value
_.forEach([ 'naive', 'usingLodash'], name => {
  const op = FB[name]
  if(!_.isFunction(op)) {
    throw new TypeError(`failed to find ${key}`)
  }
  op(MAX, CB)
})

// run impls that require a RANGE and some MUTATORS
_.forEach(['parameterized', 'functional', 'events', 'promised'], name => {
  const op = _.get(FB, name)
  if(!_.isFunction(op)) {
    throw new TypeError(`failed to find ${key}`)
  }
  op(RANGE, MUTATORS, CB)
})
