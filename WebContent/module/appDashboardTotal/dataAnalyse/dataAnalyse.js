define([],function(){
	
    return {
        
        load:function($el,scope,handler){
        	let params = scope.params;
        	let cateParam = {
        			"category": {
        				"cate1": [],"cate2": [],"cate3": []
        			},
        			"app": {
        				"cate1": [{cateId: params.cate1}],
        				"cate2": [{cateId: params.cate2}],
        				"cate3": [{cateId: params.id}]
        			}
        	};
        	const tradeSql = "*| select _id as id , _struct_.logName as 交易名称, start as 交易时间, duration as 交易耗时 , stop from applog-todayDate where _head_.type='B' and  duration > 1000 order by duration desc";
        	const ipSql = "*| select count(*), max(duration) as maxTime, avg(duration) as avgTime  from applog-* where _head_.type='B'  group by _head_.hostip";
        	const softSql = "*| select count(*), max(duration) as maxTime, avg(duration) as avgTime from applog-* where _head_.type='B'  group by  _head_.objectid";
        	
        	//交易
        	let $trade_tab = $('#trade_tab',$el).DataTable({
        		"pagingType": 'full_numbers',
        		'sort': false,
				'searching'	: false,
        		'columns': [{
        			data: 'index',defaultContent: '',title: '序号',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
        		},{
        			data: '交易名称',defaultContent: '',title: '交易名称'
        		},{
        			data: '交易时间',defaultContent: '',title: '交易时间',
        			render: function(data,type,row,meta){
        				return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
        			}
        		},{
        			data: '交易耗时',defaultContent: '',title: '交易耗时'
        		}]
        	});  	
        	
        	//ip
        	let $ip_tab = $('#ip_tab',$el).DataTable({
        		"pagingType": 'full_numbers',
        		'sort': false,
				'searching'	: false,
        		'columns': [{
        			data: 'index',defaultContent: '',title: '序号',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
        		},{
        			data: 'name',defaultContent: '',title: '主机'
        		},{
        			data: 'COUNT(*)',defaultContent: '',title: '总交易量'
        		},{
        			data: 'avgTime',defaultContent: '',title: '平均耗时'
        		},{
        			data: 'maxTime',defaultContent: '',title: '最大耗时'
        		}]
        	});
        	
        	//软件
        	let $soft_tab = $('#soft_tab',$el).DataTable({
        		"pagingType": 'full_numbers',
        		'sort': false,
				'searching'	: false,
        		'columns': [{
        			data: 'index',defaultContent: '',title: '序号',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
        		},{
        			data: 'name',defaultContent: '',title: '软件名称'
        		},{
        			data: 'COUNT(*)',defaultContent: '',title: '总交易量'
        		},{
        			data: 'avgTime',defaultContent: '',title: '平均耗时'
        		},{
        			data: 'maxTime',defaultContent: '',title: '最大耗时'
        		}]
        	});
        	
        	
        	init();
        	
        	function init() {
        		getData(tradeSql,$trade_tab);
        		getData(ipSql,$ip_tab);
        		getData(softSql,$soft_tab);
        	}
        	
        	
        	function bindEvents() {
        		
        	}
        	
        	
        	
        function getData(sql,table) {
        	let date = new Date().Format('yyyyMMdd');
        	sql = sql.replace('todayDate',date).replace('p_appid',params.id);
        	let endTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
        	let startTime = new Date().Format('yyyy-MM-dd 00:00:00');
        	let p = {
    				search: sql,
    				startTime: startTime,
    				endTime: endTime,
    				cate: JSON.stringify(cateParam),
    				logType: 1,
    				size: 10,
    				from: 0
    		};
    		return sqlSearch(p,table);
        }

    	function sqlSearch(urlData,table) {
    		table.clear().draw();
			app.common.ajaxWithAfa({
				url:'ESSearchAction_sqlSearchWithAggregationsParse.do',
				data:urlData
			}).done(function (data) {
				var result = data.result;
				let arr = result.agg;
				if(!arr || arr.length == 0){
					return;
				}
				arr.map(item => {
					item.name = item['_head_.hostip'] || item['_head_.objectid'] || '';
				})
				table.rows.add(arr).draw();
			})
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
