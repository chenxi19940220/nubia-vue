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
export default {

}
</script>

<style>

</style>
