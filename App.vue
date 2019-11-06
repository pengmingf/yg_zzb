<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS  
			var version = plus.runtime.version;
			uni.request({
				url:'https://ygjs.mfmeat.top/index.php/api/main/checkUpdateUser',
				method:'POST',
				dataType:'json',
				success: (res) => {
					if(version < res.data.version)
					{
						var wgeturl = res.data.wgeturl;
						uni.showModal({
							title: "版本更新",
							content: '有新的版本发布，是否立即进行新版本下载？',
							confirmText:'立即更新',
							// cancelText:'稍后进行',
							showCancel:false,
							success: function (resM) 
							{
								if (resM.confirm) {
									uni.showToast({
										icon:"none",
										mask: true,
										title: '有新的版本发布，程序已启动自动更新。新版本下载完成后将自动弹出安装程序',  
										duration: 5000,  
									}); 
									// uni.showLoading({
									// 	title:'下载中，请稍后...',
									// })
									//设置 最新版本apk的下载链接
									// plus.runtime.openURL(wgeturl);  
									// uni.hideLoading();
									var downloadApkUrl = wgeturl;
									var dtask = plus.downloader.createDownload( downloadApkUrl, {}, function ( d, status ) {  
											// 下载完成  
											if ( status == 200 ) {
												console.log('success:');
												console.log(dtask);
												plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},function(){
													uni.showToast({
														title: '安装成功', 
														duration: 1500  
													}); 
												},function(error){  
													uni.showToast({  
														title: '安装失败', 
														icon:'none',
														duration: 1500  
													});  
												});
											} else {
												console.log('fail:');
												console.log(dtask);
												 uni.showToast({  
													title: '更新失败',
													duration: 1500  
												 });   
											}    
										});  
									dtask.start();
								} else if (res.cancel) {
									console.log('稍后更新');
								}
							},
						});
					}
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		src: url('https://at.alicdn.com/t/font_702773_g9f89om4v3j.ttf') format('truetype');
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype1');
	}
	
	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
</style>
