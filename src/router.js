import Vue from 'vue'
import Router from "vue-router"
import Home from "./views/home"
import Index from "./views/index"
import Product from "./views/product"
import Detail from "./views/detail"
import Cart from "./views/cart"
import Order from "./views/order"
import OrderList from "./views/orderList"
import OrderConfirm from "./views/orderConfirm"
import OrderPay from "./views/orderPay"
import AliPay from "./views/alipay";

Vue.use(Router);

export default new Router({
	routes: [
		{//主路由
			path: '',
			name: 'home',
			component: Home,
			redirect: '/index',
			children: [//产品相关
				{//首页
					path: 'index',
					name: 'index',
					component: Index
				},
				{//产品主页
					path: 'product/:id',
					name: 'product',
					component: Product
				},
				{//产品详情
					path: 'detail/:id',
					name: 'detail',
					component: Detail
				}
			]
		},
		{//购物车
			path: '/cart',
			name: 'cart',
			component: Cart
		},
		{//订单相关
			path: '/order',
			name: 'order',
			component: Order,
			redirect: 'order/list',
			children: [
				{//订单列表
					path: 'list',
					name: 'order-list',
					component: OrderList
				},
				{//订单确认
					path: 'confirm',
					name: 'order-confirm',
					component: OrderConfirm
				},
				{//订单支付
					path: 'pay',
					name: 'order-pay',
					component: OrderPay
				},
				{//支付宝中转
					path: 'alipay',
					name: 'alipay',
					component: AliPay
				}
			]
		}
	]
})