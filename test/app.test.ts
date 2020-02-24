import { AnotherClass, TargetClass } from '../src/app'
import sinon from 'sinon'

const randomNum = (): number => {
  return Math.floor(Math.random() * 100)
}

// arrange
const another = new AnotherClass()
const target = new TargetClass(another)
const spy = sinon.spy(another, 'checkPositiveNumber')

const nums: Array<number> = []
let cnt = 0 // checkPositiveNumberが呼ばれた回数

describe('spy actions', () => {
  test('target.normalizedNum on spy', () => {
    nums.push(randomNum())
    expect(
      target.normalizedNum(nums.slice(-1)[0])
    ).toBe(100)
    // spy対象なのでcntが増える
    cnt++
    expect(
      spy.callCount
    ).toBe(cnt)
  })

  test('target.driver.checkPositiveNumber on spy', () => {
    nums.push(-1 * randomNum())
    expect(
      target.driver.checkPositiveNumber(nums.slice(-1)[0])
    ).toBe(false)
    // spy対象なのでcntが増える
    cnt++
    expect(
      spy.callCount
    ).toBe(cnt)
  })

  test('target.driver.addNumber not on spy', () => {
    nums.push(randomNum())
    expect(
      target.driver.addNumber(nums.slice(-1)[0])
    ).toBe(nums.slice(-1)[0] + 1)
    // spy対象ではないのでcntは増えない
    expect(
      spy.callCount,
    ).toBe(cnt)
  })
})

describe('results of spy target', () => {
  test('first result of spy target', () => {
    expect(
      spy.getCall(0).args[0] // checkPositiveNumberが呼ばれた際の引数
    ).toBe(nums[0])
    expect(
      spy.returnValues[0] // checkPositiveNumberが呼ばれた際の戻り値
    ).toBe(true)
  })

  test('second result of spy target', () => {
    expect(
      spy.getCall(1).args[0] // checkPositiveNumberが呼ばれた際の引数
    ).toBe(nums[1])
    expect(
      spy.returnValues[1] // checkPositiveNumberが呼ばれた際の戻り値
    ).toBe(false)
  })
})
