<template>
  <div id="main">
    <div class="sku-box store-content">
        <div class="gray-box">
            <div class="item-title">精选配件</div>
            <div class="item-box">
              <shop-item v-for="item in goodsData" :key="item.id" :item="item"></shop-item>
            </div>
        </div>
    </div>
    <prompt></prompt>
  </div>
</template>

<script>
import axios from 'axios'
import shopItem from '@/components/shop-item'
import prompt from '@/components/prompt'

export default {
  data () {
    return {
      goodsData: []
    }
  },
  components: {
    shopItem,
    prompt
  },
  created: function () {
    axios.get('https://www.easy-mock.com/mock/5b3cccfe3a326b5fcb8dca26/nubia-vue/newGoodsData')
      .then(response => {
        console.log(response.data)
        this.goodsData = response.data
      })
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
  }
}
</script>

<style>
.sku-box {
    position: relative;
}
.store-content {
    width: 1200px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
    position: relative;
}
.gray-box {
    overflow: hidden;
    margin-top: 32px;
}
.item-title {
    font-size: 24px;
    color: #7e7e7e;
    line-height: 40px;
    text-align: left;
    margin-bottom: 8px;
}
.sku-box .item-box {
    clear: both;
    overflow: hidden;
    margin-left: -13px;
}
.sku-box .item-box .item {
    position: relative;
    float: left;
    width: 290px;
    height: 450px;
    background: #f4f3f1;
    box-sizing: border-box;
    cursor: pointer;
    margin-left: 13px;
}
.sku-box .item .item-img {
    display: block;
    padding: 30px 0 10px;
    transition: transform 0.2s linear;
}
.sku-box .item .item-img:hover {
    transform: translate3d(0, -6px, 0);
}
.sku-box .item .item-img img {
    display: block;
    width: 206px;
    height: 206px;
    margin: 0 auto 30px;
}
.sku-box .item h3, .sku-box .item h6 {
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.sku-box .item h6 {
    line-height: 1.2;
    font-size: 16px;
    color: #222;
    margin: 0 auto;
    padding: 0 14px;
}
.sku-box .item h3 {
    line-height: 1.2;
    font-size: 12px;
    color: #FF4D4D;
    margin: 8px auto 14px;
}
.sku-box .item .params-colors {
    margin-top: 23px;
    text-align: center;
}
.sku-box .item .colors-list {
    display: inline-block;
    overflow: hidden;
}
.sku-box .item .colors-list li {
    float: left;
    margin: 0 5px;
}
.sku-box .item .colors-list>li a {
    width: 8px;
    height: 8px;
    border: 1px solid #e5e5e5;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    padding: 2px;
    display: block;
}
.sku-box .item .colors-list>li a.active {
    box-shadow: inset 0 0 0 1px #b2b2b2;
    border-color: #b2b2b2;
}
.sku-box .item .colors-list>li img {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    display: block;
}
.sku-box .item .item-btns {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 29px;
    text-align: center;
    opacity: 0;
    z-index: 10;
}
.sku-box .item:hover .item-btns {
    opacity: 1;
    transition: all .2s ease-in;
}
.sku-box .item .item-btns .item-blue-btn, .sku-box .item .item-btns .item-disabled-btn, .sku-box .item .item-btns .item-gray-btn, .sku-box .item .item-btns .item-green-btn {
    width: 116px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border: none;
    border-radius: 16px;
    color: #666;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    margin: 0 6px;
    display: inline-block;
}
.sku-box .item .item-btns .item-gray-btn {
    background: #fff;
    color: #f35c49;
}
.sku-box .item .item-btns .item-gray-btn a {
    background: #fcfcfc;
}
.sku-box .item .item-btns .item-blue-btn {
    background: #f35c49 !important;
    color: #fff !important;
    margin-left: 10px;
}
.sku-box .item .item-price {
    font-family: Arial;
    color: #c30a18;
    margin-top: 24px;
    text-align: center;
    opacity: 1;
}
.sku-box .item .item-price i {
    font-size: 16px;
}
.sku-box .item .item-price span {
    font-size: 18px;
    padding-left: 4px;
}
.sku-box .item:hover .item-price {
    opacity: 0;
    transition: all .1s ease-out;
}
.sku-box .item .item-cover a {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    width: 100%;
    height: 310px;
}
</style>
