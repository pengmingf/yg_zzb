<template>
    <view class="content">
		<view>
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
							<swiper-item class="swiper-item">
								<image src="https://ygjs.oss-cn-chengdu.aliyuncs.com/jl1.jpg" />
							</swiper-item> 
							<swiper-item class="swiper-item">
								<image src="https://ygjs.oss-cn-chengdu.aliyuncs.com/jl2.jpg" />
							</swiper-item> 
							<swiper-item class="swiper-item">
								<image src="https://ygjs.oss-cn-chengdu.aliyuncs.com/jl3.jpg" />
							</swiper-item> 
							<swiper-item class="swiper-item">
								<image src="https://ygjs.oss-cn-chengdu.aliyuncs.com/jl4.jpg" />
							</swiper-item> 
						</swiper>
					</view>
				</view>
			</view>
		</view>
		
		<view style="margin-top: 20upx;">体重变化图</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">体重</view>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
		</view>
		
		<view style="margin-top: 20upx;">身体数据图</view>
		<uni-charts-body>shujutu</uni-charts-body>
    </view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	import uniChartsBody from '@/components/u-charts-body/u-charts-body.vue';
	var _self;
	var canvasObj = {};
	var tuser_id;
	var body_id;

    export default {
		components: {
			uniChartsBody
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				tips: '',
				pixelRatio: 1,
				serverData: '',
				itemCount: 30, //x轴单屏数据密度
				sliderMax: 50
			}
		},
        onLoad() {
			_self = this;
            if (!uni.getStorageSync('tuser_id')) {
                uni.showModal({
                    title: '未登录',
                    content: '您未登录，需要登录后才能继续',
                    showCancel: false,
                    success: (res) => {
						uni.reLaunch({
							url: '../login/login'
						});
					}
                });
            }
			this.tuser_id = uni.getStorageSync('tuser_id');
			this.body_id = 1;
			this.cWidth = uni.upx2px(750); 
			this.cHeight = uni.upx2px(500);
        },
		
		onReady(){
			this.getServerData(); 
		},
		/*这里设置右上角消息触碰事件*/
		onNavigationBarButtonTap(e) {
			
			uni.showLoading({
				title:"跳转中，请稍后"
			});
			uni.navigateTo({
				url:"../msg/msg",
				success: () => {
					// 取消红点或者角标 
					this.setStyle(e.index,false,"");
				},
				complete: () => {
					uni.hideLoading();
				}
			})
			
			
		},
		
		methods:{
			/*从服务器拿折线图数据*/
			getServerData() {
				uni.showLoading({
					title: "正在加载数据..."
				})
				uni.request({
					url: 'https://ygjs.mfmeat.top/index.php/api/main/data',
					data: {"tuser_id":_self.tuser_id,"body_id":_self.body_id},
					method:"post",
					dataType:"json",
					success: function(res) {
						_self.fillData(res.data);
					},
					fail: () => {
						_self.tips = "网络错误，请稍后重试";
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			/*那服务器上的数据填充进折线图中*/
			fillData(data) {
				this.serverData = data;
				this.tips = data.tips;
				let LineA = {
					categories: [],
					series: []
				};
				LineA.categories = data.LineA.categories;
				LineA.series = data.LineA.series;  
				this.showLineA("canvasLineA", LineA);
				},
			/*配置渲染折线图*/
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:5,
					},
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4, 
						scrollShow: true, 
						scrollAlign: 'left',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						// disabled:true,
						// disableGrid:true,
						gridType: 'dash',
						splitNumber: 5,
						min:80,
						max:150, 
						format: (val) => {
							return val + '斤'
						}  
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: { 
						lineStyle: 'straight'
					},
				});
			
			},
			/*触摸折线图*/
			touchLineA(e) {
				canvasObj['canvasLineA'].scrollStart(e);
			},
			/*移动折线图*/
			moveLineA(e) {
				canvasObj['canvasLineA'].scroll(e);
			},
			/*移动完成松开折线图*/
			touchEndLineA(e) {
				canvasObj['canvasLineA'].scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasLineA'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			/*触碰后让右上角红点消失*/
			setStyle(index, show,text) {
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				if(show){
					// if(index === 0)
					currentWebview.showTitleNViewButtonRedDot({index:index,text:text})
					currentWebview.setTitleNViewButtonBadge({index:index,text:text})
				}else{
					currentWebview.hideTitleNViewButtonRedDot({index:index})
					currentWebview.removeTitleNViewButtonBadge({index:index})
				}
				//#ifndef
				// #endif
			}
		}, 
    
	}
</script>

<style>
    .hello {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .title {
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul {
        font-size: 30upx;
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul>view {
        line-height: 50upx;
    }
	/* 图标样式 */
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
		padding: 25upx;
	}

	.charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
	}

	/* 圆弧进度样式 */
	.qiun-charts3 {
		width: 750upx;
		height: 250upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;
	}

	.qiun-tip {
		display: block;
		width: auto;
		overflow: hidden;
		padding: 15upx;
		height: 30upx;
		line-height: 30upx;
		margin: 10upx;
		background: #ff9933;
		font-size: 30upx;
		border-radius: 8upx;
		justify-content: center;
		text-align: center;
		border: 1px solid #dc7004;
		color: #FFFFFF;
	}
	
	/*swiper*/
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
</style>
