export default class {
  constructor(testBoolean) {
    this.internalBoolean = testBoolean
  }

  testBool() {
    return this.internalBoolean
  }

  static blah() {
    return 'blah'
  }
}
