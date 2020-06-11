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
		{
			path: '',
			name: 'home',
			component: Home,
			redirect: '/index',
			children: [
				{
					path: 'index',
					name: 'index',
					component: Index
				},
				{
					path: 'product/:id',
					name: 'product',
					component: Product
				},
				{
					path: 'detail/:id',
					name: 'detail',
					component: Detail
				}
			]
		},
		{
			path: '/cart',
			name: 'cart',
			component: Cart
		},
		{
			path: '/order',
			name: 'order',
			component: Order,
			redirect: 'order/list',
			children: [
				{
					path: 'list',
					name: 'order-list',
					component: OrderList
				},
				{
					path: 'confirm',
					name: 'order-confirm',
					component: OrderConfirm
				},
				{
					path: 'pay',
					name: 'order-pay',
					component: OrderPay
				},
				{
					path: 'alipay',
					name: 'alipay',
					component: AliPay
				}
			]
		}
	]
})