import { registrantsActions as A } from 'dux/registrants'
import { mkAPIReq } from 'api/utils'

// Form Fields
export const getRegistrants = mkAPIReq({
  fakeData: require('client/examples/fakeRegistrants.js'),
  action: A.LOAD,
})
