<template>
	<view class="page">
		<view class="content">
			<view class="banner-image">
				<image :src="image" class="images"></image>
			</view>
			<view class="food-prepare">
				<view class="food-ready">准备食材:</view>
				<view class="food-detail">鸡蛋，番茄，鱿鱼，大闸蟹，猪肉，羊肉，大葱，黑胡椒，麻油，橄榄球，汽油，牛肉，羊肉</view>
			</view>
			<view class="zuofa">
				<view class="zuofa-i">做法:</view>
				<view class="food-detail">鸡蛋，番茄，鱿鱼，大闸蟹，猪肉，羊肉，大葱，黑胡椒，麻油，橄榄球，汽油，牛肉，羊肉</view>
			</view>
		</view>
	</view>
</template>

<script>
export default
{
	data() {
		return {
			food:undefined,
			image:undefined,
		};
	},
	methods:{
		getFoodDetail(Id){
			uni.request({
				url:'https://ygjs.mfmeat.top/index.php/api/food/foodDetail',
				data:{'Id':Id},
				dataType:'json',
				success: (res) => {
					this.food = res.data
					this.image ='https://ygjs.mfmeat.top/static/image/'+res.data.image 
				}
			})
		},
	},
	onLoad(option){
		this.getFoodDetail(option.id)
	},
}
</script>

<style>
	.page{
		width: 100%;
		background: #FF9933;
	}
	
	.content{
		width: 660upx;
		margin: 20upx auto;
		height: 100%;
	}
	.banner-image{
		width: 660upx;
		height: 465upx;
		margin: 20upx auto;
	}
	
	.images{
		width: 100%;
		height: 100%;
	}
	
	.food-prepare{
		width: 660upx;
	}
	
	.food-ready{
		width: 150upx;
		height: 50upx;
		margin-top: 50upx;
		background: #FFFFFF;
		font-family: "华文行楷";
		font-size: 35upx;
		padding: 15upx 10upx;
	}
	
	.food-detail{
		width: 100%;
		margin-top: 25upx;
		background: #FFFFFF;
	}
	
	.zuofa{
		background: #FFFFFF;
		margin-top: 50upx;
		width: 100%;
	}
	.zuofa-i{
		width: 660upx;
	}
</style>
