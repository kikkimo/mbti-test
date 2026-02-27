/// <reference types="vitest/globals" />
import { Vi } from 'vitest'

declare module 'vitest' {
  export interface TestContext {
    // Add custom test context if needed
  }
}

declare module '@testing-library/jest-dom' {
  interface Matchers<R = any, T = any> extends Vi.Matchers<R, T> {}
}

declare global {
  namespace Vi {
    interface JestAssertion extends jest.Matchers<any, any> {}
  }
}
