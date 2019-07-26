define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			
			const category = 'linux,MySQL,redis,kafka,afa,Tomcat,elasticsearch,Storm,Hbase,aix,ZooKeeper';

			//点击跳转
			$('.moniotr-wrap',$el).on('click','.monitor-item',function(){
				let href = $(this).attr('data-href');
				let frame = $(this).attr('data-frame');
				if(!href && !frame){
					app.alert('敬请期待');
					return;
				}
				if(frame){
					let type = $(this).attr('class').split(' ')[1];
					app.dispatcher.load({
						title: type + '监控',
						moduleId: 'baseMonitor',
						section: 'monitorFrame',
						id: "monitorFrame" + type,
						params: {
							type: type,
							src: frame
						}
					});
					return;
				}
				let path = href.split('#');
				let category = $(this).attr('data-id');
				app.dispatcher.load({
					title: category + '监控',
					moduleId: path[0],
					section: path.slice(1),
					id: "",
					params: {
						category: category
					}
				});
			});

			getInstances();
			function getInstances() {
				$('.event-num',$el).addClass('hide');
				app.common.ajaxWithAfa({
					url: 'CommonMonitorAction_getMyMonitorInstance.do',
					data: {
						category: category
					}
				}).done(content => {
					render(content.result);
				});
			}

			getAgentNum();
			function getAgentNum() {
				let whereMap = {
					os_type: 'all',
					agent_status: 'all',
					ping_status: 'all',
					telnet_status: 'all',
					agent_user_status: 'all'
				};
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url: 'AgentManagerAction_getAgentListSimple.do',
						data: {
							whereStr: JSON.stringify(whereMap)
						}
					}).then(function (data) {
						let num = data.list.length;
						$('.agent .monitor-name>i',$el).text(num);
					})
				});
			}

			function render(data) {
				for(let i in data){
					let $item = $('.moniotr-wrap .'+i,$el);
					let className = !data[i]['event_num']  ? 'hide' : '';
					$('.event-num',$item).text(data[i]['event_num']);
					$('.event-num',$item).attr('class',`event-num ${className}`);
					$('.monitor-name>i',$item).text(data[i]['obj_num']);
				}
			}

		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){

		}
		
	}
});
