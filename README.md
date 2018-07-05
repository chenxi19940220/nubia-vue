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

新增car-panel.vue文件
> src/components/car-panel.vue

```
<template>
  <li class="nav-cart">
      <a href="">购物车<i class="iconfont icon-gouwuche"></i></a>
      <span class="cart-empty-num cart-num">
          <i>0</i>
      </span>
      <div class="nav-cart-wrapper">
          <div class="nav-cart-list">
              <div class="empty">
                  <h3>购物车为空</h3>
                  <p>您还没有选购任何商品，现在前往商城选购吧!</p>
              </div>
              <div class="full">
                  <div class="nav-cart-items">
                      <ul>
                          <li class="clear">
                              <div class="cart-item js-cart-item cart-item-sell">
                                  <div class="cart-item-inner">
                                      <div class="item-thumb"></div>
                                      <div class="item-desc">
                                          <div class="cart-cell">
                                              <h4>
                                                  <a href="#/item/100027401">Z18mini 青瓷蓝</a>
                                              </h4>
                                              <p class="attrs">
                                                  <span>青瓷蓝</span>
                                              </p>
                                              <h6>
                                                  <span class="price-icon">¥</span>
                                                  <span class="price-num">49</span>
                                                  <span class="item-num">x 1</span>
                                              </h6>
                                          </div>
                                      </div>
                                      <div class="del-btn">删除</div>
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
                  <div class="nav-cart-total">
                      <p>共 <strong class="ng-binding">1</strong> 件商品</p>
                      <h5>合计：<span class="price-icon">¥</span>
                          <span ng-bind="cartMenu.totalPrice" class="price-num ng-binding">49</span>
                      </h5>
                      <h6>
                          <a ng-href="http://www.smartisan.com/shop/#/cart" href="http://www.smartisan.com/shop/#/cart" class="nav-cart-btn">去购物车</a>
                      </h6>
                  </div>
              </div>
          </div>
      </div>
  </li>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

> src/components/header-nav.vue

```
<car-panel></car-panel>

import carPanel from '@/components/car-panel'

export default {
  components: {
    carPanel
  }
}
```

> src/components/car-panel.vue

```
export default {
  computed: {
    carPanelData () {
      return this.$store.state.carPanelData
    }
  }
}

<li class="clear" v-for="(item, index) in carPanelData" :key="index"></li>

<a href="#/item/100027401">{{item.title}}</a>

<span>{{item.spec_json.show_name}}</span>
```

> src/store/index.js

```
let store = new Vuex.Store({
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
  }
})
```

> src/components/car-panel.vue

```
export default {
  computed: {
    count () {
      return this.$store.getters.totalCount
    },
    total () {
      return this.$store.getters.totalPrice
    }
  }
}

<p>共 <strong class="ng-binding">{{count}}</strong> 件商品</p>

<h5>合计：
    <span class="price-icon">¥</span>
    <span ng-bind="cartMenu.totalPrice" class="price-num ng-binding">{{total}}</span>
</h5>

<span class="price-num">{{item.price}}</span>
<span class="item-num">x {{item.count}}</span>
```

## 购物车商品删除

> src/store/index.js

```
let store = new Vuex.Store({
  mutations: {
    delCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
          return id
        }
      })
    }
  }
})
```

> src/components/car-panel.vue

```
export default {
  methods: {
    delCarPanelHandle (id) {
      this.$store.commit('delCarPanelData', id)
    }
  }
}

<div class="del-btn" @click="delCarPanelHandle(item.sku_id)">删除</div>
```


