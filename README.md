# nubia-vue
基于vue2.0的商城实战开发

## 环境配置及目录结构

> 搭建环境

```
cnpm install --global vue-cli  全局安装vue-cli

vue init  初始化vue

vue init webpack my-project  创建项目

cnpm install  安装项目依赖

cnpm install vuex --save  安装vuex
```

> 文件目录

src

src/assets    样式文件和图片
- src/assets/css   
- src/assets/img   

src/components   组件

src/lib   模拟数据

src/router   路由配置文件

src/store   vuex相关文件

src/views   所有的单页面


## 商品列表页的布局

## 商品列表套数据

## 商品页组件

## 商品加入购物车

新增store文件夹，新增文件index.js

> src/store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({})

export default store
```

> main.js

```
import store from './store'

new Vue({
  store
})
```

> src/store/index.js

```
let store = new Vuex.Store({
  state: {
    carPanelData: []
  },
  mutations: {
    addCarPanelDate (state, data) {
      let bOff = true
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.sku_id) {
          goods.count++
          bOff = false
        }
      })
      if (bOff) {
        let goodsData = data
        Vue.set(goodsData, 'count', 1)
        state.carPanelData.push(goodsData)
      }
    }
  }
})
```

> src/components/shop-item.vue

```
export default {
  methods: {
    tableIndex (index) {
      this.itemIndex = index
    },
    addCarPanelHandle (data) {
      return this.$store.commit('addCarPanelDate', data)
    }
  }
}

<span class="item-blue-btn" @click="addCarPanelHandle(item.sku_info[itemIndex])">加入购物车 </span>
```


