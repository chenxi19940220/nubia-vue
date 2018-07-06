<template>
    <div class="item">
      <div>
          <div class="item-img">
              <img :src="item.sku_info[itemIndex].ali_image" :alt="item.name">
              <h6>{{item.name}}</h6>
              <h3>{{item.name_title}}</h3>
          </div>
          <div class="params-colors">
              <ul class="colors-list">
                  <li v-for="(sku,index) in item.sku_info" :key="index">
                    <a href="javascript:;" :class="{'active': index === itemIndex}" @click="tableIndex(index)">
                      <img :src="sku.spec_json.image">
                    </a>
                  </li>
              </ul>
          </div>
          <div class="item-btns clearfix">
              <span class="item-gray-btn">
                <router-link :to="{path: 'Item', query: {itemId:item.sku_info[itemIndex].sku_id}}">查看详情</router-link>
              </span>
              <span class="item-blue-btn" @click="addCarPanelHandle(item.sku_info[itemIndex])">加入购物车 </span>
          </div>
          <div class="item-price clearfix">
              <i>¥</i><span>{{item.price}}</span>
          </div>
          <div class="item-cover">
            <router-link :to="{path:'Item', query:{itemId:item.sku_info[itemIndex].sku_id}}"></router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      itemIndex: 0
    }
  },
  methods: {
    tableIndex (index) {
      this.itemIndex = index
    },
    addCarPanelHandle (data) {
      let itemData = {info: data, count: 1}
      return this.$store.commit('addCarPanelDate', itemData)
    }
  }
}
</script>

<style>

</style>
