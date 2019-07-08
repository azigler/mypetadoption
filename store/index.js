export const state = () => ({
  debug: true,
  user: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user || null
  }
}
