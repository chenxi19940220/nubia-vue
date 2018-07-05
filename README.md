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


新建文件prompt.vue

> src/components/prompt.vue

```
<template>
  <div id="prompt">
    <div class="module-dialog-layer" style="display: block;"></div>
    <div class="clear module-dialog module-dialog-confirm module-dialog-show" style="display: block; opacity: 1;">
      <div class="dialog-panel">
        <div class="topbar">
          <div class="dialog-tit clear">
            <h4 class="js-dialog-title">提示</h4>
          </div>
          <span class="dialog-close png"></span>
        </div>
        <div class="dialog-con js-dialog-container">
          <div class="confirm-msg">商品已达到最大可购买数量，无法继续添加</div>
        </div>
        <div class="dialog-btn-wrap clear">
          <div class="blue-main-btn normal-main-btn js-dialog-done">
            <a>确定</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.module-dialog-layer{
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .8;
    filter: alpha(opacity=80);
}
.module-dialog{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  text-align: center;
  opacity: 0;
  transition: opacity .2s ease-in;
}
.module-dialog:after{
  content: '';
  height: 100%;
  margin-left: -.25em;
}
.module-dialog .dialog-panel, .module-dialog:after{
  display: inline-block;
  vertical-align: middle;
}
.module-dialog .dialog-panel{
  position: relative;
  width: 436px;
  min-width: 200px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0,0,0,.14);
  box-shadow: 0 10px 30px rgba(0,0,0,1);
  text-align: left;
}
.module-dialog .topbar{
  overflow: hidden;
  width: 100%;
  height: 69px;
  border-radius: 13px 13px 0 0;
}
.module-dialog .dialog-tit{
  height: 60px;
    padding: 0 15px;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #d4d4d4;
    box-shadow: rgba(0,0,0,.06) 0 1px 7px;
    background: linear-gradient(#fbfbfb,#ececec);
    line-height: 60px;
}
.module-dialog .dialog-tit h4{
  float: left;
  padding-left: 15px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
}
.module-dialog .dialog-close{
  overflow: hidden;
  display: block;
  position: absolute;
  right: 17px;
  top: 18px;
  z-index: 20;
  width: 16px;
  height: 17px;
  padding: 4px 5px;
  background: url(../assets/img/ui.png) no-repeat -16px -16px;
  text-indent: -9999em;
  opacity: .7;
  cursor: pointer;
  transition: all .3s linear;
}
.module-dialog .dialog-close:hover{
  opacity: 1;
}
.module-dialog .dialog-con{
  min-width: 220px;
}
.module-dialog .confirm-error-msg, .module-dialog .confirm-msg{
  max-width: 310px;
  min-height: 50px;
  margin: 50px auto;
  line-height: 24px;
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 16px;
}
.module-dialog .dialog-btn-wrap{
  height: 51px;
  padding: 18px 10px 0;
  line-height: 51px;
  border-radius: 0 0 13px 13px;
  background: url(../assets/img/account-bottom-bar-bg.png) 0 0 repeat-x;
}
.blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
  display: block;
  padding: 1px;
  margin: 0 auto;
  border-radius: 9px;
  background: #015e94;
  background: linear-gradient(#5598c9,#2a6da2);
  text-align: center;
  text-shadow: rgba(255,255,255,.496094) 0 1px 0;
  cursor: pointer;
  user-select: none;
}
.normal-main-btn{
  height: 38px;
}
.module-dialog .dialog-btn-wrap .blue-main-btn{
  float: right;
}
.module-dialog .dialog-btn-wrap .blue-main-btn, .module-dialog .dialog-btn-wrap .blue-main-btn a{
  width: 100px;
}
.blue-main-btn a, .gray-main-btn a, .jianguo-blue-main-btn a{
  display: block;
    padding: 2px 0;
    border-radius: 9px;
    background: #5f7ed7;
    background: linear-gradient(#739fe1,#5f7ed7);
    box-shadow: inset 0 1px 3px #92b6ec, inset 0 0 2px #627dca, inset 0 -2px 3px #4c69b8;
    text-shadow: #4f70b3 0 -1px 0;
    cursor: pointer;
    color: #fff;
    transition: all .3s ease;
}
.normal-main-btn a{
  height: 34px;
  line-height: 34px;
}
.blue-main-btn a:hover{
  box-shadow: inset 0 1px 3px #83a9e1, inset 0 0 2px #627dca, inset 0 -2px 3px #5a77c7, inset 0 0 100px rgba(48,77,147,.4);
}
.blue-main-btn a:active{
  box-shadow: inset 0 2px 5px #3d67a5, inset 0 0 2px #627dca, inset 0 0 100px rgba(25,108,232,.5);
}
</style>
```

> src/views/shop.vue

```
<prompt></prompt>

import prompt from '@/components/prompt'

export default {
  components: {
    prompt
  }
}
```

> src/store/index.js

```
let store = new Vuex.Store({
  state: {
    maxOff: false
  }
})
```

> src/components/prompt.vue

```
export default {
  name: 'prompt',
  computed: {
    maxOff () {
      return this.$store.state.maxOff
    }
  }
}

<div id="prompt" v-if="maxOff"></div>
```

> src/store/index.js

```
let store = new Vuex.Store({
  state: {
    carPanelData: [],
    maxOff: false
  },
  mutations: {
    addCarPanelDate (state, data) {
      let bOff = true
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.sku_id) {
          goods.count++
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count--
            state.maxOff = true
          }
        }
      })
      if (bOff) {
        let goodsData = data
        Vue.set(goodsData, 'count', 1)
        state.carPanelData.push(goodsData)
      }
    },
    closePrompt (state) {
      state.maxOff = false
    }
  }
})
```

> src/components/prompt.vue

```
export default {
  name: 'prompt',
  computed: {
    maxOff () {
      return this.$store.state.maxOff
    }
  },
  methods: {
    closePrompt () {
      this.$store.commit('closePrompt')
    }
  }
}

<a @click="closePrompt">确定</a>

<span class="dialog-close png" @click="closePrompt"></span>
```

> src/components/car-panel.vue

```
<div class="nav-cart-wrapper" v-if="carShow"></div>

export default {
  computed: {
    carShow () {
      return this.$store.state.carShow
    }
  }
}
```

> src/store/index.js

```
let store = new Vuex.Store({
  state: {
    carShow: false,
    carTimer: null
  },
  mutations: {
    showCar (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    hideCar (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      }, 1000)
    }
  }
})
```

> src/components/car-panel.vue

```
export default {
  methods: {
    showCarHandle () {
      this.$store.commit('showCar')
    },
    hideCarHandle () {
      this.$store.commit('hideCar')
    }
  }
}

<li class="nav-cart" @mouseenter="showCarHandle" @mouseleave="hideCarHandle"></li>
```

> src/store/index.js

```
let store = new Vuex.Store({
  mutations: {
    addCarPanelDate (state, data) {
      let bOff = true
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.sku_id) {
          goods.count++
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count--
            state.maxOff = true
            return
          }
          state.carShow = true
        }
      })
      if (bOff) {
        let goodsData = data
        Vue.set(goodsData, 'count', 1)
        state.carPanelData.push(goodsData)
        state.carShow = true
      }
    }
  }
})
```

> src/components/car-panel.vue

```
<div class="empty" v-if="count < 0">
    <h3>购物车为空</h3>
    <p>您还没有选购任何商品，现在前往商城选购吧!</p>
</div>

<div class="full" v-else></div>

<span class="cart-empty-num cart-num" :class="{'cart-num': count > 0}">
    <i>{{count}}</i>
</span>
```
