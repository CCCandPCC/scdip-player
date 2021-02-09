import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    journey: null,
    pageContent: {},
    journeyParents: [],
    accountId: '',
    endpoint: process.env.VUE_APP_API_ENDPOINT
  },

  getters: {
    journeyTitle: state => {
      if (state.journey)
        return `Questions about ${state.journey}`

      return null
    },

    staticContent: state => id => {
      return state.pageContent.find(x => x.sort === "CONTENT_" + id)
    },
    apiEndpoint: state => state.accountId ? `${state.endpoint}/${state.accountId}` : state.endpoint
  },

  mutations: {
    setJourney(state, value) {
      state.journey = value
    },
    setJourneyParents(state, value) {
      state.journeyParents = value
    }, 
    setPageContent(state, content) {
      state.pageContent = content
    },
    setAccountId(state, value) {
      state.accountId = value
    }
  }
})