
function naiveFizzBuzz() {
  let result = ''

  const lowerBound = 1
  const upperBound = 100

  const divisibleBy = function (num, divisor) { // memoized
    const self = divisibleBy
    self.memo = self.memo || []
    return self.memo[num] != null
      ? self.memo[num]
      : (self.memo[num] = num % divisor == 0)
  }

  for (let target = lowerBound; target <= upperBound; target++) {
    const divisableByThree = target % 3 == 0
    const divisableByFive = target % 5 == 0

    if (divisableByThree && divisableByFive) {
      result += 'fizzbuzz '
      continue
    }

    if (divisableByThree) {
      result += 'fizz '
      continue
    }

    if (divisableByFive) {
      result += 'buzz '
      continue
    }

    result += `${target} `
  }

  console.log(result)
}
