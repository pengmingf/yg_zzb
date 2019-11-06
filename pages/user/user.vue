<template>
	<view class="center">
		<view class="logo" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? imageUrl :avatarUrl" @click="changeImage"></image>
			<view class="logo-title" style="display: inline;">
				<text class="uer-name">{{login ? uerInfo.name : 'Hi.游客'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="noopen">
				<text class="list-icon">&#xe60c;</text>
				<text class="list-text">收藏食物</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item  border-bottom" @click="noopen">
				<text class="list-icon">&#xe60d;</text>
				<text class="list-text">历史订单</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="daka">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">打卡记录</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item  border-bottom" @click="goBody">
				<text class="list-icon">&#xe61a;</text>
				<text class="list-text">身体数据</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goAbout">
				<text class="list-icon">&#xe603;</text>
				<text class="list-text">关于</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @click="userManage">
				<text class="list-icon">&#xe609;</text>
				<text class="list-text">账号管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view> 
		</view>
		<view class="button_bom" v-if="login">
			<button type="warn" size="default" @click="loginout()">退出登录</button>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				login: false,
				avatarUrl: '/static/logo.png',
				uerInfo: {},
				imageUrl:null,
			}
		},
		
		onLoad() {
			var that = this;
			var tuser_id = uni.getStorageSync('tuser_id');
			if(tuser_id)
			{
				//从服务器拿去姓名以及头像
				uni.request({
					url:"https://ygjs.mfmeat.top/index.php/api/user/detail",
					data:{"tuser_id":tuser_id},
					method:"POST",
					dataType:"json",
					success: (res) => {
						if(res.data.code == 1)
						{
							this.login = true;
							this.uerInfo = res.data.message;
							this.imageUrl = this.uerInfo.image;
							uni.setStorage({
								key:"UserInfo",
								data:this.uerInfo,
								fail(){
									uni.showToast({
										title:"errorST"
									})
								}});
							
						}else{
							uni.showLoading({
								title:"异常错误，请重启APP"
							})
						}
					}
				})
			}else{
				this.goLogin();
			}
		},
		methods: {
			goLogin() {
				if (!this.login) {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			},
			changeImage(){
				// var str = "{\"code\":1,\"info\":\"https:\\/\\/ygjs.oss-cn-chengdu.aliyuncs.com\\/tuser_image\\/6933fda818d81e28e5602348a51c1053.png\"}";
				// var a = JSON.parse(str);
				// console.log(a);
				// return false;
				uni.chooseImage({
					count:1,
					sizeType:'compressed',
					success: (res) => {
						const tempFilePaths = res.tempFilePaths[0];
						uni.uploadFile({
							url:'https://ygjs.mfmeat.top/index.php/api/user/image',
							filePath:tempFilePaths,
							name:'image',
							formData:{
								'user':this.uerInfo.Id
							},
							success:(uploadFileRes) => {
								uploadFileRes.data = JSON.parse(uploadFileRes.data);
								if(uploadFileRes.data.code == 1 )
								{
									this.imageUrl = uploadFileRes.data.info;
								}else{
									console.log(uploadFileRes);
									uni.showModal({
										content:uploadFileRes.data.info
									}); 
								}
							},
							fail(){
								uni.showToast({
									title:'上传失败',
									icon:'none'
								})
							},
						});
					},
					fail() {
						uni.showToast({
							title:'打开相册失败',
							duration:3000
						});
					},
				})
			},
			noopen(){
				uni.showModal({
					content:"抱歉，此功能正在研发中，暂未开放"
				})
			},
			goAbout() {
				uni.navigateTo({
					url: './user_show'
				});
			}, 
			daka() {
				uni.navigateTo({
					url:'./daka'
				});
			},
			goBody(){
				uni.showToast({
					title:"请前往首页查看",
					icon:"none"
				})
			},
			loginout(){
				uni.showModal({
					content:"你确定要退出登录吗",
					success: (res) => {
						if(res.confirm == true)
						{
							uni.clearStorageSync();
							uni.reLaunch({
								url:'/pages/login/login'
							});
						}
					}
				})
			},
			userManage:()=>{
				uni.navigateTo({
					url:'/pages/userManage/userManage'
				})
			},
		}
	}
</script>

<style>
	@import './user.css';
	
	.button_bom{
		margin-top: 50upx;
	}
</style>
