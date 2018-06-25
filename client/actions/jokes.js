export const JOKE_ACTIONS = {
  LOAD: 'LOAD_JOKES',
}

const { LOAD } = JOKE_ACTIONS

export default {
  [LOAD]: ({ jokes = {} }) => ({
    ...jokes,
    notFunny: 'this is not a joke',
  }),
}
