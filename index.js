'use strict'
/* eslint-env node, es6 */

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
const NUMS = FB.range(MAX, 1)

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
 * Result of all FizzBuzz implementations.
 *
 * @type {Object}
 */
const RESULT = {
  naive: FB.naive().join(' '),
  lodash: FB.usingLodash().join(' '),
  parameterized: FB.parameterized(NUMS, MUTATORS).join(' '),
  funcional: FB.functional(NUMS, MUTATORS).join(' '),
  pure: FB.pure(NUMS, MUTATORS).join(' ')
}

console.log(RESULT)
