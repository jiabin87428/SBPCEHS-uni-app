<template>
	<view class="baseView">
		<textarea class="myText" :placeholder="placeholder" :value="text" @input="descInput"/>
		<view class="btn-row">
		    <button type="primary" class="primary" @tap="saveText">确定</button>
		</view>
	</view>
</template>

<script>
	import {
	    mapMutations
	} from 'vuex'
	export default {
    data() {
        return {
			placeholder: '请输入内容',
			text: '',
			key: '',
		}
    },
	onLoad(option) {
		this.placeholder = option.placeholder;
		this.text = option.text;
		this.key = option.key;
	},
	
    methods: {
		...mapMutations(['setInputPageText']),
        saveText() {
			this.$fire.fire(this.key, this.text);
			
			uni.navigateBack({
				delta: 1
			})
		},
		descInput(e) {
			this.text = e.detail.value;
		}
    }
}
</script>

<style>
	.baseView{  
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
	}
	/* .textView {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #C11E1E;
	} */
	.myText{
		width: 100%;
		height: 500upx;
		font-size: 30upx;
		background-color: #FFFFFF;
	}
</style>
