<template>
	<view class="page">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<!-- <view class="content"> -->
		<!-- 做菜列表 -->
			<view v-show="current === 0">
				<view class="uni-product-list">
					<view class="uni-product" v-for="(product,index) in productList" :key="index" @click="foodDetail(product)">
						<view class="image-view">
							<image v-if="renderImage" class="uni-product-image" :src="product.image"></image>
						</view>
						<view class="uni-product-title">{{product.name}}</view> 
						<view class="uni-product-price" v-if="product.favourPrice">
							<text class="uni-product-price-favour">￥{{product.originalPrice}}</text>
							<text class="uni-product-price-original">￥{{product.favourPrice}}</text>
							<text class="uni-product-tip">{{product.tip}}</text>
						</view> 
						<view class="uni-product-price" v-if="!product.favourPrice">
							<text class="uni-product-price-original">￥{{product.originalPrice}}</text>
						</view>
					</view> 
				</view>
			</view>
			<!-- 今日特供 -->
			<view v-show="current === 1">
				<view class="uni-product-list">
					<view class="uni-product" v-for="(product,index) in foodList" :key="index">
						<view class="image-view">
							<image v-if="renderImage" class="uni-product-image" :src="product.image"></image>
						</view>
						<view class="uni-product-title">{{product.name}}</view> 
						<view class="uni-product-price">
							<text class="uni-product-price-original">￥{{product.originalPrice}}</text>
							<text class="uni-product-tip" @click="yuding(product)">{{product.tip}}</text>
						</view>
					</view> 
				</view>
			</view>
		<!-- </view> -->
		
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
export default {
	components: {
		uniSegmentedControl
	},
    data() {
        return {
			items: ['菜谱', '明日特供'],
			styleType: 'button',
			activeColor: '#007aff',
			current: 0,
			productList: [],		//菜谱
			foodList:[],			//今日特供
            renderImage: false,
			tuser_id:uni.getStorageSync('tuser_id')
        };
    },
    methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index
			}
		},
		yuding(product){
			uni.showModal({
				content:"预订此餐，明日会有管家为您送上。确定要预订吗？",
				confirmColor:'#FF3333',
				confirmText:"预订",
				success: (res) => {
					if (res.confirm) {
						uni.request({
							url:"https://ygjs.mfmeat.top/index.php/api/food/yuding",
							data:{'tuser':this.tuser_id,'foodId':product.Id},
							method:"POST",
							dataType:'json',
							success: (res) => {
								uni.showLoading({
									mask:true,
									title:"预定中..."
								})
								if(res.data.code == 1)
								{
									uni.showModal({
										content:"预订成功",
										showCancel:false
									})
								}
								else if(res.data.code == 2)
								{
									uni.showModal({
										content:"您已预订该餐品,请勿重复预定",
										showCancel:false
									})  
								}
								else if(res.data.code == 3)
								{
									uni.showModal({
										content:"该商品已下架",
										showCancel:false
									})  
								}
								else{
									uni.showModal({
										content:"预订失败",
										showCancel:false
									})
								}
							},
							complete: (res) => {
								uni.hideLoading();
							}
						})
					} else if (res.cancel) {
						uni.showToast({
							icon:'none',
							title:"您已取消预订"
						});
					}
				}
			})
			
		},
        loadData(action = 'add') { 
            //     {
            //         image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg',
            //         title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
            //         originalPrice: 2899,
            //         favourPrice: 2799,
            //         tip: '自营'
            //     }
			uni.request({
				url:"https://ygjs.mfmeat.top/index.php/api/food/menu",
				dataType:"json",
				success: (res) => {
					// console.log(res.data);
					res.data.productList.forEach(item => { 
						this.productList.push(item); 
					}),
					res.data.foodList.forEach(item => {
						this.foodList.push(item); 
					})
				}
			})

            if (action === 'refresh') {
                this.productList = [];
            }

            // data.forEach(item => {
            //     this.productList.push(item);
            // });
        },
		foodDetail(product){
			uni.navigateTo({
				url:"detail?id="+product.Id
			})
		}
    },
    onLoad() {
        this.loadData();
        setTimeout(()=> {
            this.renderImage = true; 
        }, 300);
    },
    // onPullDownRefresh() {
    //     this.loadData('refresh');
    //     setTimeout(() => {
    //         uni.stopPullDownRefresh();
    //     }, 3000);
    // },
    // onReachBottom() {
    //     this.loadData();
    // }
};
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}
	.uni-common-mt {
		margin-top: 20upx;
	}
	
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300upx;
		text-align: center;
	}
	.uni-product-list {
	    display: flex;
	    width: 100%;
	    flex-wrap: wrap;
	    flex-direction: row;
	},
	.uni-product {
	    padding: 20upx;
	    display: flex;
	    flex-direction: column;
	},
	.uni-product-image {
	    height: 330upx;
	    width: 330upx;
	},
	.uni-product-title {
	    width: 300upx;
	    word-break: break-all;
	    display: -webkit-box;
	    overflow: hidden;
		line-height:1.5;
	    text-overflow: ellipsis;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	},
	.uni-product-price {
		margin-top:10upx;
	    font-size: 28upx;
		line-height:1.5;
	    position: relative;
	}
	
	.uni-product-price-original {
	    color: #e80080;
	}
	
	.uni-product-price-favour {
	    color: #888888;
	    text-decoration: line-through;
	    margin-left: 10upx;
	}
	
	.uni-product-tip {
	    position: absolute;
	    right: 10upx;
	    background-color: #ff3333;
	    color: #ffffff;
	    padding: 0 10upx;
	    border-radius: 5upx;
	},
	.image-view {
	    height: 330upx;
	    width: 330upx;
		margin:12upx 0;
	}
</style>