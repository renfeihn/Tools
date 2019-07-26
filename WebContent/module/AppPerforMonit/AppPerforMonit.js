define(["jquery",'echarts4'], function($,echarts) {
	return {
		load : function($el, scope, handler) {
			$('.AppPerforMonit-grid-layout', $el).height($('.main').height() - 40);
			var appList = [];

			function ajaxWithAfa(url,data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content){
						resolve(content.result);
					})
				});
			}

			$('#appNameFilter', $el).on('blur', function(){
				filterAppName(this.value);
			}).on('keydown', function(e){
				if(e.keyCode == '13'){
					filterAppName(this.value);
				}
			})

			function filterAppName(keyword){
				if(keyword == ''){
					$('.AppPerforMonit-applist', $el).children().removeClass('hide');
					return;
				}
				$('.AppPerforMonit-applist', $el).children().addClass('hide');
				appList.forEach(function(item,index){
					if(item['appName'].includes(keyword)){
						$('.AppPerforMonit-applist', $el).children().eq(index).removeClass('hide');
					}else{
						$('.AppPerforMonit-applist', $el).children().eq(index).addClass('hide');
					}
				})
			}


			$('.capsule-select', $el).on('click', 'a', function(){
				var value = this.dataset.value;
				$(this).addClass('selected').siblings().removeClass('selected');
				AppSort(value);
				drawApp(value);
			})

			function AppSort(type){
				appList.sort(function(a,b){
					if(a[type] < b[type]){
						return 1;
					}else if(a[type] == b[type]){
						return 0;
					}else{
						return -1;
					}
				});
			}

			function drawApp(type){
				var appHTML = '';
				appList.forEach((item) => {
					appHTML += `
					<div class="AppPerforMonit-app ${type}" 
						data-app-name="${item.appName}" 
						data-avg="${item.avg}" 
						data-count="${item.count}" 
						data-tps="${item.tps}">
						<p title="${item.appName}">${item.appName}</p>
					</div>`;
				});
				$('.AppPerforMonit-applist', $el).html(appHTML);
			}

			async function statisBasic(){
				var time = await ajaxWithAfa(`ESSearchAction_getNowTime.do`);
				var result_basic = await ajaxWithAfa(`AppStatisticAction_statisBasic.do`, {
					'type': 1,
					'startTime': new Date(time).Format('yyyy-MM-dd 00:00:00'),
					'endTime': new Date(time).Format('yyyy-MM-dd hh:mm:ss')
				});
				var result_tps = await ajaxWithAfa(`AppStatisticAction_statisTips.do`, {
					'type': 1,
					'startTime': new Date(time).Format('yyyy-MM-dd 00:00:00'),
					'endTime': new Date(time).Format('yyyy-MM-dd hh:mm:ss')
				});
				var buckets = result_basic.aggs.buckets;

				appList = buckets.map(function(item,index){
					return {
						'appName': item.key,// 应用名
						'avg': parseInt(item.avg.value),// 平均耗时
						'count': parseInt(item.count.value),// 交易量
						'tps': parseInt(result_tps[item.key]),// tps
					};
				})

				AppSort('count');
				drawApp('count');
			}

			statisBasic();


			$('.AppPerforMonit-applist', $el).on('click', '.AppPerforMonit-app', function(){
				var appName = this.dataset.appName;
				var avg = this.dataset.avg;
				var count = this.dataset.count;
				var tps = this.dataset.tps;
				app.domain.exports('AppPerforMonit', {
					'appName': appName,
					'avg': avg,
					'count': count,
					'tps': tps
				});
				app.dispatcher.load({//提前加载应用状态总览
					title: appName + "-性能监控",
					moduleId: "AppPerforMonit",
					section: "AppPerforTabs",
					id: 'AppPerforTabs' + appName
				});
			})
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});