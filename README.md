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

## 商品详情页数据

> src/views/item.vue

```
<template>
  <div id="main">
    <div class="store-content item">
      <div class="item-box">
        <div class="grllery-wrapper">
          <div class="gallery">
            <div class="thumbnail">
              <ul>
                <li class="on"><img src="./assets/goods/ss1.jpg" /></li>
                <li><img src="./assets/goods/ss2.jpg" /></li>
                <li><img src="./assets/goods/ss3.jpg" /></li>
                <li><img src="./assets/goods/ss4.jpg" /></li>
                <li><img src="./assets/goods/ss5.jpg" /></li>
              </ul>
            </div>
            <div class="thumb">
              <ul>
                <li><img src="./assets/img/goods/b1.jpg" /></li>
                <li><img src="./assets/goods/b1.jpg" /></li>
                <li><img src="./assets/goods/b1.jpg" /></li>
                <li><img src="./assets/goods/b1.jpg" /></li>
                <li><img src="./assets/goods/b1.jpg" /></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="banner">
          <div class="sku-custom-title">
            <div class="params-price">
              <span><em>¥</em><i>199</i></span>
            </div>
            <div class="params-info">
              <h4>Smartisan 快充移动电源 10000mAh</h4>
              <h6>10000mAh 双向快充、轻盈便携、高标准安全保护</h6>
            </div>
          </div>
          <div class="sku-dynamic-params-panel">
            <div class="sku-dynamic-params clear">
              <span class="params-name">颜色</span>
              <ul class="params-colors">
                <li class="cur">
                  <a><i><img src="http://img01.smartisanos.cn/attr/v2/1000299/B37F37544921114CEF1EC01ED4DF44E4/20X20.jpg"></i></a>
                </li>
              </ul>
            </div>
            <div class="sku-dynamic-params clear">
              <div class="params-name">数量</div>
              <div class="params-detail clear">
                <div class="item-num js-select-quantity">
                  <span class="down down-disabled">-</span>
                  <span class="num">1</span>
                  <span class="up up-disabled">+</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sku-status">
            <div class="cart-operation-wrapper clearfix">
              <span class="blue-title-btn js-add-cart"><a>加入购物车</a></span>
              <span class="gray-title-btn"><a>现在购买</a></span>
            </div>
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
.item-box {
  width: 1098px;
  padding: 60px;
  margin-top: 32px;
  margin-bottom: 20px;
  display: table;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0,0,0,.1);
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.banner, .gallery-wrapper {
  display: table-cell;
}
.grllery-wrapper {
  vertical-align: top;
}
.gallery {
  float: left;
  width: 540px;
  display: table-cell;
}
.thumb, .thumbnail {
  display: table-cell;
  vertical-align: middle;
}
.thumbnail img {
  width: 54px;
  height: 54px;
}
.thumb img {
  width: 440px;
  height: 440px;
}
.thumbnail li {
  width: 54px;
  height: 54px;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 5px;
  cursor: pointer;
}
.thumbnail li:first-child {
  margin-top: 0;
}
.thumbnail li.on {
  padding: 10px;
  border: 3px solid #ccc;
  border: 3px solid rgba(0,0,0,.2);
}
.thumb > ul {
  margin-left: 20px;
  width: 440px;
  height: 440px;
  position: relative;
  overflow: hidden;
}
.item-box .banner {
  vertical-align: middle;
  width: 450px;
  margin-left: 10px;
}
.item-box .banner .sku-custom-title {
  overflow: hidden;
  padding: 8px 8px 18px 10px;
  position: relative;
}
.item-box .banner .params-price {
  position: absolute;
  right: 8px;
  bottom: 19px;
}
.item-box .banner .params-price span {
  display: block;
  color: #de4037;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
}
.item-box .banner .params-price span i {
  padding-left: 2px;
  font-size: 24px;
}
.item-box .banner .sku-custom-title h4 {
  font-size: 24px;
  line-height: 1.25;
  color: #000;
  margin-bottom: 13px;
}
.item-box .banner .sku-custom-title h6 {
  font-size: 14px;
  line-height: 1.5;
  color: #bdbdbd;
}
.item-box .banner .sku-custom-title .params-info {
  width: 360px;
}
.item-box .banner .sku-dynamic-params-panel {
  padding: 29px 0 8px 10px;
  border-top: 1px solid #ebebeb;
}
.item-box .banner .sku-dynamic-params {
  margin-bottom: 19px;
}
.item-box .banner .params-name {
  float: left;
  padding-right: 20px;
  font-size: 14px;
  color: #8d8d8d;
  line-height: 36px;
}
.item-box .banner .sku-dynamic-params .params-colors {
  float: left;
  line-height: 36px;
  margin: -10px 0 0 -10px;
  width: 402px;
}
.item-box .banner .sku-dynamic-params .params-colors>li {
  float: left;
  margin: 10px 0 0 10px;
}
.item-box .banner .sku-dynamic-params .params-colors>li a {
  display: block;
  width: 26px;
  height: 26px;
  border: 2px solid #E5E5E5;
  padding: 3px;
  text-align: center;
  color: #757575;
  border-radius: 50%;
}
.item-box .banner .sku-dynamic-params .params-colors>li.cur a {
  border-color: #B2B2B2;
  box-shadow: inset 0 0 0 1px #B2B2B2;
}
.item-box .banner .sku-dynamic-params .params-colors>li i, .item-box .banner .sku-dynamic-params .params-colors>li img {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 50%;
}
.item-box .banner .params-detail {
  line-height: 36px;
  float: left;
  width: 392px;
}
.item-box .item-num {
  float: left;
  width: 128px;
}
.item-box .item-num .down, .item-box .item-num .up {
  position: relative;
  float: left;
  width: 36px;
  height: 36px;
  line-height: 40px;
  text-indent: -9999em;
  cursor: pointer;
  user-select: none;
}
.item-box .item-num .down.down-disabled, .item-box .item-num .up.up-disabled {
  cursor: not-allowed;
}
.item-box .item-num .down:before, .item-box .item-num .up:before {
  content: '';
  position: absolute;
  left: -4px;
  right: -4px;
  top: 0;
  height: 45px;
  background: url(../assets/img/cart-updown-item.png) no-repeat;
  background-size: 100% auto;
}
.item-box .item-num .down:before {
  content: " ";
  background-position: 0 -60px;
}
.item-box .item-num .down.down-disabled:before, .item-box .item-num .down.down-disabled:hover:before {
  content: " ";
  background-position: 0 -300px;
}
.item-box .item-num .num {
  position: relative;
  overflow: hidden;
  float: left;
  width: 56px;
  height: 18px;
  margin: 7px 0 0;
  border: none;
  border-radius: 3px;
  line-height: 18px;
  text-align: center;
  font-size: 14px;
}
.item-box .item-num .up:before {
  background-position: 0 0;
}
.item-box .item-num .up.up-disabled:before, .item-box .item-num .up.up-disabled:hover:before {
  content: " ";
  background-position: 0 -240px;
}
.item-box .sku-status {
  position: relative;
  border-top: 1px solid #ebebeb;
  padding: 30px 0 0 10px;
}
.item-box .blue-title-btn {
  float: left;
  width: 143px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 7px;
  border: 1px solid #5c81e3;
  background-color: #5c85e5;
  background-image: linear-gradient(#779ae9,#5078df);
  color: #fff;
  cursor: pointer;
}
.item-box .blue-title-btn:hover {
  transition: all .15s ease-out;
  box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);
}
.item-box .blue-title-btn a, .item-box .green-title-btn a {
  color: #fff;
}
.item-box .gray-title-btn {
  display: inline-block;
  width: 143px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: linear-gradient(#fff,#fafafa);
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  color: #8c8c8c;
  cursor: pointer;
}
.item-box .gray-title-btn:hover {
  transition: all .15s ease-out;
  background: linear-gradient(#f6f6f6,#ededed);
}
.item-box .cart-operation-wrapper .gray-title-btn {
  margin-left: 20px;
}
</style>
```

> src/store/index.js

```
import Item from '@/views/item'

export default new Router({
  mode: 'history',  
  routes: [
    {
      path: '/item',
      name: 'Item',
      component: Item
    }
  ]
})
```

> src/components/shop-item.vue

```
<router-link :to="{path:'Item', query:{itemId:item.sku_info[itemIndex].sku_id}}"></router-link>

<router-link :to="{path:'Item', query:{itemId:item.sku_info[itemIndex].sku_id}}">查看详情</router-link>
```



