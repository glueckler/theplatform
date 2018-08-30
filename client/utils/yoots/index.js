import * as R from 'ramda'
import isString from './isString'
import { pick } from './pick'
import { randomHex } from './randomHex'
import { ifDiffProps } from './ifDiffProps'

export * from './pick'
export * from './randomHex'
export * from './ifDiffProps'

export default {
  ...R,
  isString,
  pick,
  randomHex,
  ifDiffProps,
}
