const PRISMIC_API_URL = 'https://mypetadoption.cdn.prismic.io/api/v2'

async function fetchMasterRef() {
  const { refs } = await fetch(PRISMIC_API_URL).then(function(response) {
    return response.json()
  })
  return refs[0].ref
}

export const state = () => ({
  pages: {},
  masterRef: ''
})

export const mutations = {
  savePage(state, page) {
    if (!state.pages) {
      state.pages = {}
    }
    state.pages[page.type] = page
  },
  saveMasterRef(state, masterRef) {
    state.masterRef = masterRef
  }
}

export const getters = {
  pages: state => {
    return state.pages
  },
  masterRef: state => {
    return state.masterRef
  }
}

export const actions = {
  async fetchSingleton({ commit, dispatch }, { prismic, page }) {
    const result = await prismic.api.getSingle(page)
    dispatch('fetchMasterRef')
    commit('savePage', result)
  },
  async fetchMasterRef({ commit }) {
    const result = await fetchMasterRef()
    commit('saveMasterRef', result)
  }
}
