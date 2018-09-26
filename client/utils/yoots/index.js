/* eslint-disable import/first */
import * as R from 'ramda'

import isString from './isString'

import { mergeByProp } from './mergeByProp'
export * from './mergeByProp'

import { pick } from './pick'
export * from './pick'

import { randomHex } from './randomHex'
export * from './randomHex'

import { ifDiffProps } from './ifDiffProps'
export * from './ifDiffProps'

export default {
  ...R,
  isString,
  pick,
  randomHex,
  ifDiffProps,
  mergeByProp,
}
