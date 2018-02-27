'use strict'
/* eslint-env browser, commonjs, jquery, es6 */

const path = require('path')
const _ = require('lodash')
const expect = require('chai').expect
const FB = require(path.resolve('./lib/fizzbuzz'))

const MAX = 100

const RANGE = FB.range(MAX, 1)

const MUTATORS = [
  ['Fizz', i => i % 3 == 0],
  ['Buzz', i => i % 5 == 0]
]

describe('fizzbuzz', function () {
  let expected

  const CALLBACK =

  beforeEach(function () {
    expected = [
      1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz',
      16, 17, 'Fizz', 19, 'Buzz', 'Fizz', 22, 23, 'Fizz', 'Buzz', 26, 'Fizz', 28, 29, 'FizzBuzz',
      31, 32, 'Fizz', 34, 'Buzz', 'Fizz', 37, 38, 'Fizz', 'Buzz', 41, 'Fizz', 43, 44, 'FizzBuzz',
      46, 47, 'Fizz', 49, 'Buzz', 'Fizz', 52, 53, 'Fizz', 'Buzz', 56, 'Fizz', 58, 59, 'FizzBuzz',
      61, 62, 'Fizz', 64, 'Buzz', 'Fizz', 67, 68, 'Fizz', 'Buzz', 71, 'Fizz', 73, 74, 'FizzBuzz',
      76, 77, 'Fizz', 79, 'Buzz', 'Fizz', 82, 83, 'Fizz', 'Buzz', 86, 'Fizz', 88, 89, 'FizzBuzz',
      91, 92, 'Fizz', 94, 'Buzz', 'Fizz', 97, 98, 'Fizz', 'Buzz'
    ]
  })

  describe('iterator-based', function () {
    describe('naive', function () {
      it('should provide expected result', function (next) {
        FB.naive(MAX, (err, impl, results) => {
          expect(results).to.deep.equal(expected)
          next()
        })
      })
    })

    describe('usingLodash', function (next) {
      it('should provide expected result', function (next) {
        FB.usingLodash(MAX, (err, impl, results) => {
          expect(results).to.deep.equal(expected)
          next()
        })
      })
    })
  })

  describe('range+mutators-based', function () {
    describe('parameterized', function (next) {
      it('should provide expected result', function (next) {
        FB.parameterized(RANGE, MUTATORS, (err, impl, results) => {
          expect(results).to.deep.equal(expected)
          next()
        })
      })
    })

    describe('functional', function () {
      it('should provide expected result', function (next) {
        FB.functional(RANGE, MUTATORS, (err, impl, results) => {
          expect(results).to.deep.equal(expected)
          next()
        })
      })
    })

    describe('events', function () {
      it('should provide expected result', function (next) {
        FB.events(RANGE, MUTATORS, (err, impl, results) => {
          expect(results).to.deep.equal(expected)
          next()
        })
      })
    })

    describe('promised', function () {
      it('should provide expected result', function (next) {
        FB.promised(RANGE, MUTATORS, (err, impl, results) => {
          expect(results).to.deep.equal(expected)
          next()
        })
      })
    })
  })
})
