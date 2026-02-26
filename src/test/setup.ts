import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

// Extend Vitest's expect with jest-dom matchers
declare global {
  namespace Vi {
    interface JestAssertion extends jest.Matchers {}
  }
}

afterEach(() => {
  cleanup()
})
