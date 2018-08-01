import * as R from 'ramda'
import isString from './isString'
import { pick } from './pick'
import { randomHex } from './randomHex'

export * from './pick'
export * from './randomHex'

export default {
  ...R,
  isString,
  pick,
  randomHex,
}
