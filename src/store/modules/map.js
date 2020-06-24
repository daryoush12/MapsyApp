const state = () => ({
    isDrawing: false,
})

const getters = {}

const actions = {
    setDrawingState({ commit }, value) {
        commit('setDrawing', value)
    },
}

const mutations = {
    setDrawing(state, value) {
        console.log(value)
        state.isDrawing = value
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
