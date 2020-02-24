interface Driver {
  checkPositiveNumber: (num: number) => boolean;
  addNumber: (num: number) => number;
}

export class AnotherClass {
  checkPositiveNumber(num: number): boolean {
    return num > 0
  }

  addNumber(num: number): number {
    return num + 1
  }
}


export class TargetClass {
  driver: Driver

  constructor(anotherClass: Driver) {
    this.driver = anotherClass
  }

  normalizedNum(num: number): number {
    const result = this.driver.checkPositiveNumber(num)
    return result ? 100 : 0
  }
}
