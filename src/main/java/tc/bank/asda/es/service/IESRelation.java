package tc.bank.asda.es.service;

import java.util.Collection;
import java.util.Map;

/**
 * es关联流水查询
 * 
 * @author zero
 * 
 */
public interface IESRelation {

	/**
	 * 根据日志ID获取关联流水，返回数据格式
	 * 
	 * <pre>
	 * [
	 * 	[{
	 * 		"_type":"asda",
	 * 		"_source":{
	 * 			"_head_.logtime":"2018-04-09T19:32:02.527+0800",
	 * 			"_head_.logid":100088,
	 * 			"stop":"2018-04-09T19:32:02.528+0800",
	 * 			"_head_.hostip":"10.9.3.168",
	 * 			"_head_.appid":70285,
	 * 			"_head_.appname":"跨行网银支付结算系统（网银互联系统）",
	 * 			"_struct_.loghours":"19",
	 * 			"_head_.category2":"应用程序",
	 * 			"_head_.category3":"APP",
	 * 			"_head_.sourcename":"日志平台AFA4J日志收集",
	 * 			"_head_.category1":"软件",
	 * 			"duration":1,
	 * 			"_struct_.tradename":" LWarning:日志预警\n",
	 * 			"start":"2018-04-09T19:32:02.527+0800",
	 * 			"sysdate":"2018-04-09T19:32:02.544+0800",
	 * 			"_head_.type":"B",
	 * 			"_head_.logsn":"204900708636489500000000000000231461",
	 * 			"_head_.file":"/home/aim/camaApp/log/app/20180409/asda/LWarning/G1_asda_LWarning_62.log",
	 * 			"_head_.sourceid":"100024"
	 * 		},
	 * 		"_id":"70285I204900708636489500000000000000231461",
	 * 		"_routing":"70285",
	 * 		"_index":"applog-20180409",
	 * 		"_score":1.0
	 * 	}]
	 * ]
	 * </pre>
	 * 
	 * @param appId
	 *            应用ID
	 * @param date
	 *            年月日
	 * @param logId
	 *            日志ID
	 * @return
	 * @throws Exception
	 */
	public Collection<Collection<Map<String, Object>>> getRelationByLogID(String appId, String date, String logId) throws Exception;

}
