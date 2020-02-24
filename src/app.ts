import sinon from 'sinon'

import assert from 'assert'

const randomNum = (): number => {
  return Math.floor(Math.random() * 100)
}

interface Driver {
  checkPositiveNumber: (num: number) => boolean;
  addNumber: (num: number) => number;
}

class AnotherClass {
  checkPositiveNumber(num: number): boolean {
    return num > 0
  }

  addNumber(num: number): number {
    return num + 1
  }
}


class TargetClass {
  driver: Driver

  constructor(anotherClass: Driver) {
    this.driver = anotherClass
  }

  normalizedNum(num: number): number {
    const result = this.driver.checkPositiveNumber(num)
    return result ? 100 : 0
  }
}

// arrange
const another = new AnotherClass()
const target = new TargetClass(another)
const spy = sinon.spy(another, 'checkPositiveNumber')

const nums: Array<number> = []
let cnt = 0 // checkPositiveNumberが呼ばれた回数

nums.push(randomNum())
assert.equal(
  target.normalizedNum(nums.slice(-1)[0]),
  100
)
cnt++
assert.equal(
  spy.callCount,
  cnt
)

nums.push(-1 * randomNum())
assert.equal(
  target.driver.checkPositiveNumber(nums.slice(-1)[0]),
  false
)
cnt++
assert.equal(
  spy.callCount,
  cnt
)

nums.push(randomNum())
assert.equal(
  target.driver.addNumber(nums.slice(-1)[0]),
  nums.slice(-1)[0] + 1
)
assert.equal(
  spy.callCount,
  cnt
)

assert.equal(
  spy.getCall(0).args[0], // checkPositiveNumberが呼ばれた際の引数(1回目)
  nums[0]
)
assert.equal(
  spy.returnValues[0], // checkPositiveNumberが呼ばれた際の戻り値(1回目)
  true
)

assert.equal(
  spy.getCall(1).args[0], // checkPositiveNumberが呼ばれた際の引数(2回目)
  nums[1]
)
assert.equal(
  spy.returnValues[1], // checkPositiveNumberが呼ばれた際の戻り値(2回目)
  false
)
