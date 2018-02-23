'use strict'
/* eslint-env browser, commonjs, jquery, es6 */

const path = require('path')
const _ = require('lodash')
const expect = require('chai').expect
const FB = require(path.resolve('./lib/fizzbuzz'))

const MAX = 100

const NUMS = FB.range(MAX, 1)

const MUTATORS = [
  ['Fizz', i => i % 3 == 0],
  ['Buzz', i => i % 5 == 0]
]

describe('fizzbuzz', function () {

  let expected

  beforeEach(function () {
    expected = [
      1,   2, 'Fizz',  4, 'Buzz', 'Fizz',  7,  8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz',
      16, 17, 'Fizz', 19, 'Buzz', 'Fizz', 22, 23, 'Fizz', 'Buzz', 26, 'Fizz', 28, 29, 'FizzBuzz',
      31, 32, 'Fizz', 34, 'Buzz', 'Fizz', 37, 38, 'Fizz', 'Buzz', 41, 'Fizz', 43, 44, 'FizzBuzz',
      46, 47, 'Fizz', 49, 'Buzz', 'Fizz', 52, 53, 'Fizz', 'Buzz', 56, 'Fizz', 58, 59, 'FizzBuzz',
      61, 62, 'Fizz', 64, 'Buzz', 'Fizz', 67, 68, 'Fizz', 'Buzz', 71, 'Fizz', 73, 74, 'FizzBuzz',
      76, 77, 'Fizz', 79, 'Buzz', 'Fizz', 82, 83, 'Fizz', 'Buzz', 86, 'Fizz', 88, 89, 'FizzBuzz',
      91, 92, 'Fizz', 94, 'Buzz', 'Fizz', 97, 98, 'Fizz', 'Buzz'
    ]
  })

  describe('naive', function () {
    it('should provide expected result', function () {
      const actual = FB.naive(MAX)
      expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected))
    })
  })
  describe('usingLodash', function () {
    it('should provide expected result', function () {
      const actual = FB.usingLodash(MAX)
      expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected))
    })
  })
  describe('parameterized', function () {
    it('should provide expected result', function () {
      const actual = FB.parameterized(NUMS, MUTATORS)
      expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected))
    })
  })
  describe('functional', function () {
    it('should provide expected result', function () {
      const actual = FB.functional(NUMS, MUTATORS)
      expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected))
    })
  })
  describe('pure', function () {
    it('should provide expected result', function () {
      const actual = FB.pure(NUMS, MUTATORS)
      expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected))
    })
  })
})
