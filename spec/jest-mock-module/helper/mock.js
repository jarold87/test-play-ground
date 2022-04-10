class MockHelper {
  constructor(module, methods) {
    this.module = module;
    this.methods = methods;
    this.mockedObject = {};
    this.originalImplementation = {};

    const importedModule = require(module);

    Object.assign(this.mockedObject, jest.requireActual(module));
    for (const method of this.methods) {
      this.originalImplementation[method] = importedModule[method];
      this.mockedObject[method] = jest.fn().mockImplementation(importedModule[method]);
    }

    jest.doMock(module, () => this.mockedObject);
  }

  setImplementation(method, implementation) {
    return this.mockedObject[method].mockImplementation(implementation);
  }

  restore() {
    for (const method of this.methods) {
      this.mockedObject[method].mockRestore();
      this.mockedObject[method].mockImplementation(this.originalImplementation[method]);
    }
  }

  getMock(method) {
    return this.mockedObject[method];
  }
}

module.exports = MockHelper;
