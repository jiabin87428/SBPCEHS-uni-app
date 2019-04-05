<template>
	<view class="baseView">
		123123
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	export default {
			computed: mapState(['userInfo']),
			components: {},
			data() {
				return {
					
				}
			},
			onLoad(option) {
				this.$fire.once("APP_HIDE", result=>{
					console.log(result);
				});
			},
			methods: {
				
			}
		}
</script>

<style>
	@import url("../../../css/common.css");
</style>
