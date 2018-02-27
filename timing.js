'use strict'
/* eslint-env node, es6 */

const FB = require('./lib/fizzbuzz')

const MAX = 100

const RANGE = FB.range(MAX, 1)

const MUTATORS = [
  ['Fizz', i => i % 3 == 0 ],
  ['Buzz', i => i % 5 == 0 ]
]

const MAX_ITERATIONS = 10e3

let naiveCount = 0,
    lodashCount = 0,
    paramterizedCount = 0,
    functionalCount = 0,
    eventsCount = 0,
    promisedCount = 0

console.log(`===============================\nafter ${MAX_ITERATIONS} iterations...\n===============================`)

console.time('naive')
FB.range(MAX_ITERATIONS, 1).forEach(() => {
  FB.naive(MAX, () => {
    if (++naiveCount === MAX_ITERATIONS) {
      console.timeEnd('naive')
    }
  })
})

console.time('usingLodash')
FB.range(MAX_ITERATIONS, 1).forEach(() => {
  FB.usingLodash(MAX, () => {
    if (++lodashCount === MAX_ITERATIONS) {
      console.timeEnd('usingLodash')
    }
  })
})

console.time('parameterized')
FB.range(MAX_ITERATIONS, 1).forEach(() => {
  FB.parameterized(RANGE, MUTATORS, () => {
    if (++paramterizedCount === MAX_ITERATIONS) {
      console.timeEnd('parameterized')
    }
  })
})

console.time('functional')
FB.range(MAX_ITERATIONS, 1).forEach(() => {
  FB.functional(RANGE, MUTATORS, () => {
    if (++functionalCount === MAX_ITERATIONS) {
      console.timeEnd('functional')
    }
  })
})

console.time('events')
FB.range(MAX_ITERATIONS, 1).forEach(() => {
  FB.events(RANGE, MUTATORS, () => {
    if (++eventsCount === MAX_ITERATIONS) {
      console.timeEnd('events')
    }
  })
})

console.time('promised')
FB.range(MAX_ITERATIONS, 1).forEach(() => {
  FB.promised(RANGE, MUTATORS, () => {
    if (++promisedCount === MAX_ITERATIONS) {
      console.timeEnd('promised')
    }
  })
})
