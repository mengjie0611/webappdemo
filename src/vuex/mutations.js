
import {REQ_ADDRESS,CLEARCARTFOODS,REQ_CATEGORYS,REQ_SHOPS,SAVEUSER,SAVRTOKEN,RESET_TOKEN,RESET_USER,SAVEGOOS,SAVEINFO,SAVERATINGS,SAVEFOODCOUNT,REDUCEFOODCOUNT} from './mutations-types'
import Vue from 'vue'
export default{
  [REQ_ADDRESS](state,address){
    state.address = address
  },
  [REQ_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [REQ_SHOPS] (state, shops) {
    state.shops = shops
  },
  [SAVRTOKEN] (state, {token}) {
    state.token = token
  },
  [SAVEUSER] (state, {user}) {
    state.user = user
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  [SAVEGOOS] (state,{goods}) {
    state.goods = goods
  },
  [SAVERATINGS] (state,{ratings}) {
    state.ratings = ratings
  },
  [SAVEINFO] (state,{info}) {
    state.info = info
  },
  [SAVEFOODCOUNT](state,{food}){
    if(food.count){
      food.count++
    }else{
      Vue.set(food, 'count', 1)
      state.cartfoods.push(food)
    }
  },
  [REDUCEFOODCOUNT](state,{food}){
  if(food.count > 0){
      food.count--
      if(food.count == 0){
        state.cartfoods.splice(state.cartfoods.indexOf(food),1)
      }
    }
  },
  [CLEARCARTFOODS](state){
    state.cartfoods.forEach(food => 
      food.count = 0
    );
      state.cartfoods = []
  }
}