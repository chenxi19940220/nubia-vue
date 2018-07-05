<template>
  <div id="header">
    <div class="nav-global">
        <div class="container">
            <div class="nav-logo">
                <a href=""></a>
            </div>
            <ul class="nav-aside">
                <li class="nav-user">
                    <a href="">
                        <i class="iconfont icon-zhanghu"></i>
                    </a>
                    <div class="nav-user-wrapper">
                        <div class="nav-user-list">
                            <dl class="nav-user-avatar">
                                <dd>
                                    <span class="ng-scope"></span>
                                </dd>
                                <dt class="ng-binding">+86 138****9453</dt>
                            </dl>
                            <ul>
                                <li class="order">
                                    <a href="javascript:;">我的订单</a>
                                </li>
                                <li class="support">
                                    <a href="javascript:;">售后服务</a>
                                </li>
                                <li class="coupon">
                                    <a href="javascript:;">我的优惠</a>
                                </li>
                                <li class="information">
                                    <a href="javascript:;">账户资料</a>
                                </li>
                                <li class="address">
                                    <a href="javascript:;">收货地址</a>
                                </li>
                                <li class="logout">
                                    <a href="javascript:;">退出</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <car-panel></car-panel>
            </ul>
            <ul class="nav-list">
                <li><a href="#">商城</a></li>
                <li><a href="#">手机</a></li>
                <li><a href="#">红魔手机</a></li>
                <li><a href="#">配件</a></li>
                <li><a href="#">摄影</a></li>
                <li><a href="#">服务</a></li>
                <li><a href="#">体验店</a></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import carPanel from '@/components/car-panel'

export default {
  components: {
    carPanel
  }
}
</script>

<style>

</style>
