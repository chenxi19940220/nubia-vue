import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    carPanelData: [],
    maxOff: false,
    carShow: false,
    carTimer: null
  },
  getters: {
    totalCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    totalPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.count * goods.price
      })
      return price
    }
  },
  mutations: {
    addCarPanelDate (state, data) {
      let bOff = true
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.info.sku_id) {
          goods.count += data.count
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count -= data.count
            state.maxOff = true
            return
          }
          state.carShow = true
        }
      })
      if (bOff) {
        let goodsData = data.info
        Vue.set(goodsData, 'count', data.count)
        state.carPanelData.push(goodsData)
        state.carShow = true
      }
    },
    delCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
          return id
        }
      })
    },
    closePrompt (state) {
      state.maxOff = false
    },
    showCar (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    hideCar (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      }, 500)
    }
  }
})

export default store
