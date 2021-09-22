import { reqAddress, reqCategorys, reqShops, reqGoods, reqInfo, reqRatings } from '../api'
import { REQ_ADDRESS, REQ_CATEGORYS, REQ_SHOPS, SAVEUSER, SAVRTOKEN, RESET_USER, RESET_TOKEN, SAVEGOOS, SAVERATINGS, SAVEINFO, SAVEFOODCOUNT, REDUCEFOODCOUNT } from './mutations-types'
export default {
    async getAddress({ commit, state }) {
        const { longitude, latitude } = state
        const result = await reqAddress(longitude, latitude)
        if (result.code == 0) {
            const address = result.data
            commit(REQ_ADDRESS, address)
        }
    },
    async getCategorys({ commit }) {
        const result = await reqCategorys()
        if (result.code === 0) {
            const categorys = result.data
            commit(REQ_CATEGORYS, categorys)
        }
    },
    async getShops({ commit, state }) {
        const { longitude, latitude } = state
        const result = await reqShops({
            longitude,
            latitude,
        })
        if (result.code === 0) {
            const shops = result.data
            commit(REQ_SHOPS, shops)
        }
    },
    saveUser({ commit }, user) {
        const token = user.jwtToken
        localStorage.setItem('token_key', token)
        delete user.jwtToken
        commit(SAVEUSER, {
            user,
        })
        commit(SAVRTOKEN, {
            token,
        })
    },
    async autoLogin({ commit, state }) {
        if (!state.token && !state.user._id) {
            // const result = await reqAutoLogin()
            // if (result.code === 0) {
            //     const user = result.data
            //     commit(SAVEUSER, {
            //         user,
            //     })
            // }
        }
    },

    logout({ commit }) {
        localStorage.removeItem('token_key')
        commit(RESET_USER)
        commit(RESET_TOKEN)
    },
    async getShopsGoods({ commit }) {
        const result = await reqGoods()
        if (result.code == 0) {
            const goods = result.data
            console.log(goods)
            commit(SAVEGOOS, {
                goods,
            })
        }
    },
    async getShopsRatings({ commit }) {
        const result = await reqRatings()
        if (result.code == 0) {
            const ratings = result.data
            console.log(ratings)
            commit(SAVERATINGS, {
                ratings,
            })
        }
    },
    async getShopsInfo({ commit }) {
        const result = await reqInfo()
        if (result.code == 0) {
            const info = result.data
            commit(SAVEINFO, {
                info,
            })
        }
    },

    getfoodcount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(SAVEFOODCOUNT, { food })
        } else {
            commit(REDUCEFOODCOUNT, { food })
        }
    },
}