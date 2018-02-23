'use strict'
/* eslint-env node, es6 */

const FB = require('./lib/fizzbuzz')

const MAX = 100

const NUMS = FB.range(MAX, 1)

const MUTATORS = [
  ['Fizz', i => i % 3 == 0 ],
  ['Buzz', i => i % 5 == 0 ]
]

const MAX_ITERATIONS = 10e6

console.log(`===============================\nafter ${MAX_ITERATIONS} iterations...\n===============================`)

console.time('naive')
FB.range(1, MAX_ITERATIONS).forEach(() => FB.naive())
console.timeEnd('naive')

console.time('usingLodash')
FB.range(1, MAX_ITERATIONS).forEach(() => FB.usingLodash())
console.timeEnd('usingLodash')

console.time('parameterized')
FB.range(1, MAX_ITERATIONS).forEach(() => FB.parameterized(NUMS, MUTATORS))
console.timeEnd('parameterized')

console.time('functional')
FB.range(1, MAX_ITERATIONS).forEach(() => FB.functional(NUMS, MUTATORS))
console.timeEnd('functional')

console.time('events')
FB.range(1, MAX_ITERATIONS).forEach(() => FB.events(NUMS, MUTATORS))
console.timeEnd('events')

console.time('promised')
FB.range(1, MAX_ITERATIONS).forEach(() => FB.promised(NUMS, MUTATORS))
console.timeEnd('promised')
