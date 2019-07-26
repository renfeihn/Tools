package cn.com.agree.aweb.struts2.action.appmonitor;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.date.DateUtils;
import tc.cama.aweb.service.IESHttpService;
import tc.cama.aweb.service.IHbaseQueryService;

@Controller("HbaseQueryActionBean")
@Scope("prototype")
public class HbaseQueryAction extends StandardActionSupport {

	private static final String TRAN_TABLE = "transrecord";

	public static final String TranSerialno = "TranSerialno";
	public static final String reqseqno = "reqseqno";
	public static final String rspseqno = "rspseqno";
	/**
	 * 
	 */
	private static final long serialVersionUID = 5599837079330253784L;
	@Autowired
	private IHbaseQueryService hbaseQuery;
	@Autowired
	private IESHttpService esHttpService;
	private String appname;
	private String date;
	private String flowno;
	private String tradeflowno;
	private String jsontradelist;

	public IHbaseQueryService getHbaseQuery() {
		return hbaseQuery;
	}

	public String getAppname() {
		return appname;
	}

	public String getDate() {
		return date;
	}

	public String getFlowno() {
		return flowno;
	}

	public String getTradeflowno() {
		return tradeflowno;
	}

	public String getJsontradelist() {
		return jsontradelist;
	}

	public void setHbaseQuery(IHbaseQueryService hbaseQuery) {
		this.hbaseQuery = hbaseQuery;
	}

	public void setAppname(String appname) {
		this.appname = appname;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setFlowno(String flowno) {
		this.flowno = flowno;
	}

	public void setTradeflowno(String tradeflowno) {
		this.tradeflowno = tradeflowno;
	}

	public void setJsontradelist(String jsontradelist) {
		this.jsontradelist = jsontradelist;
	}

	public IESHttpService getEsHttpService() {
		return esHttpService;
	}

	public void setEsHttpService(IESHttpService esHttpService) {
		this.esHttpService = esHttpService;
	}

	/**
	 * 根据交易流水号在HBase中查询结构化流水，支持批量查询
	 * 
	 * @return
	 * @throws Exception
	 */
	public String queryTradeInfo() throws Exception {
		if (appname == null || "".equals(appname)) {
			setStrutsMessage(StrutsMessage.errorMessage("应用系统不能为空"));
			return ERROR;
		}
		if (date == null || "".equals(date)) {
			setStrutsMessage(StrutsMessage.errorMessage("日期不能为空"));
			return ERROR;
		}

		if (tradeflowno == null || "".equals(tradeflowno)) {
			setStrutsMessage(StrutsMessage.errorMessage("流水号不能为空"));
			return ERROR;
		}

		date = date.replaceAll("-", "");
		date = date.replaceAll("/", "");
		JSONArray array = new JSONArray();
		String[] flownos = tradeflowno.split(",");
		for (int i = 0; i < flownos.length; i++) {
			String flowno = StringUtils.rightPad(appname, 10, ' ') + date + flownos[i];
			if (flownos[i].startsWith(appname)) {
				flowno = flownos[i];
			}
			array.add(hbaseQuery.queryTable(TRAN_TABLE, appname, date, flowno));
		}
		if (array == null || array.isEmpty()) {
			setStrutsMessage(StrutsMessage.errorMessage("查询数据为空"));
			return ERROR;
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("tradelist", array));
		return SUCCESS;
	}

	/**
	 * 交易路径还原
	 * 
	 * @return
	 * @throws Exception
	 */
	public String tradePathReduce() throws Exception {
		if (jsontradelist == null || "".equals(jsontradelist)) {
			setStrutsMessage(StrutsMessage.errorMessage("交易列表不能为空"));
			return ERROR;
		}
		JSONArray requestArray = JSON.parseArray(jsontradelist);
		JSONArray tradelist = new JSONArray();
		for (int i = 0; i < requestArray.size(); i++) {
			JSONObject object = requestArray.getJSONObject(i);
			// String date = object.getString("date");
			String appname = object.getString("appname");
			String serialno = object.getString("serialno");
			String flowno = StringUtils.rightPad(appname, 10, ' ') + date + serialno;
			JSONObject result = hbaseQuery.queryTable(TRAN_TABLE, appname, date, flowno);
			result.put("serialno", serialno);
			tradelist.add(result);
		}
		if (tradelist == null || tradelist.isEmpty()) {
			setStrutsMessage(StrutsMessage.errorMessage("查询数据为空"));
			return ERROR;
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("Reducedtradelist", reduce(tradelist)));
		return SUCCESS;
	}

	public String tradePathReduceByTradeseqno() throws Exception {
		if (appname == null || "".equals(appname)) {
			setStrutsMessage(StrutsMessage.errorMessage("应用系统不能为空"));
			return ERROR;
		}
		if (date == null || "".equals(date)) {
			setStrutsMessage(StrutsMessage.errorMessage("日期不能为空"));
			return ERROR;
		}
		if (tradeflowno == null || "".equals(tradeflowno)) {
			setStrutsMessage(StrutsMessage.errorMessage("流水号不能为空"));
			return ERROR;
		}
		date = date.replaceAll("-", "");
		date = date.replaceAll("/", "");
		JSONObject transrecord = hbaseQuery.queryTable(TRAN_TABLE, appname, date, tradeflowno);
		if (transrecord == null || transrecord.isEmpty()) {
			setStrutsMessage(StrutsMessage.errorMessage("交易流水号[" + tradeflowno + "]未找到!"));
			return ERROR;
		}

		JSONArray tradelist = new JSONArray();
		
		String TranSerialno = transrecord.getString("TranSerialno");
		if(TranSerialno!=null){
			Map<String, Object> whereEx = new HashMap<String, Object>();
			whereEx.put("TranSerialno", TranSerialno);
			JSONObject jo = hbaseQuery.queryList(TRAN_TABLE, whereEx);
			for (String key : jo.keySet()) {
				JSONObject val = jo.getJSONObject(key);
				String ServiceModule = val.getString("ServiceModule");
				if(ServiceModule!=null){
					val.put("app", ServiceModule);
				}
				val.put("serialno", key);
				long start = val.getDate("TranStart").getTime();
				long end = val.getDate("TranStop").getTime();
				val.put("TranDuration", end - start);
				tradelist.add(val);
			}
		}else{
		
		String acct = transrecord.getString("AcctNb");
		String reqDate = transrecord.getString("reqDate");
		String reqTime = transrecord.getString("reqTime");
		if (acct == null || reqDate == null || reqTime == null) {
			transrecord.put("serialno", tradeflowno);
			tradelist.add(transrecord);
		} else {
			final Map<String, Integer> sort = new HashMap<String, Integer>();
			sort.put("POC_WY", 0);
			sort.put("POC_QZ", 1);
			sort.put("POC_ED", 2);
			Map<String, Object> whereEx = new HashMap<String, Object>();
			whereEx.put("AcctNb", acct);
			whereEx.put("reqDate", reqDate);
			whereEx.put("reqTime", reqTime);
			JSONObject jo = hbaseQuery.queryList(TRAN_TABLE, whereEx);
			for (String key : jo.keySet()) {
				JSONObject val = jo.getJSONObject(key);
				val.put("serialno", key);
				long start = val.getDate("TranStart").getTime();
				long end = val.getDate("TranStop").getTime();
				val.put("TranDuration", end - start);
				tradelist.add(val);
			}
			Comparator<Object> compar = new Comparator<Object>() {
				@Override
				public int compare(Object o1, Object o2) {
					JSONObject jo1 = (JSONObject) o1;
					JSONObject jo2 = (JSONObject) o2;
					String app1 = jo1.getString("app");
					String app2 = jo2.getString("app");
					if (sort.containsKey(app1) && sort.containsKey(app2)) {
						return sort.get(app1) - sort.get(app2);
					}
					return 0;
				}
			};
			Collections.sort(tradelist, compar);
		}
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("Reducedtradelist", reduce(tradelist)));
		return SUCCESS;
	}

	/**
	 * 1.0 根据交易流水号+日期+app查找业务流水 2.0 根据业务流水在applog-日期中查找关键字,检索出所有存在关键字的交易流水号 3.0
	 * 根据二次检索出的所有交易流水号进行交易路径还原
	 * 
	 * @return
	 * @throws Exception
	 */
	public String tradePathReduceByTradeseqnoBak() throws Exception {
		if (appname == null || "".equals(appname)) {
			setStrutsMessage(StrutsMessage.errorMessage("应用系统不能为空"));
			return ERROR;
		}
		if (date == null || "".equals(date)) {
			setStrutsMessage(StrutsMessage.errorMessage("日期不能为空"));
			return ERROR;
		}

		if (tradeflowno == null || "".equals(tradeflowno)) {
			setStrutsMessage(StrutsMessage.errorMessage("流水号不能为空"));
			return ERROR;
		}

		date = date.replaceAll("-", "");
		date = date.replaceAll("/", "");
		String flowno = StringUtils.rightPad(appname, 10, ' ') + date + tradeflowno;
		JSONObject transrecord = hbaseQuery.queryTable(TRAN_TABLE, appname, date, flowno);

		if (transrecord == null || transrecord.isEmpty()) {
			setStrutsMessage(StrutsMessage.errorMessage("交易流水号[" + tradeflowno + "]未找到!"));
			return ERROR;
		}
		String bussseqno = transrecord.getString("TranSerialno");
		String start = transrecord.getString("TranStart");
		String end = transrecord.getString("TranStop");
		long startTs = DateUtils.parse(start, "yyyy-MM-dd HH:mm:ss.SSS").getTimeInMillis();
		long endTs = DateUtils.parse(end, "yyyy-MM-dd HH:mm:ss.SSS").getTimeInMillis();
		String app = transrecord.getString("app");
		if (StringUtils.containsIgnoreCase(app, "eci")) {
			startTs += TimeUnit.MINUTES.toMillis(22);
			endTs += TimeUnit.MINUTES.toMillis(22);
		}
		JSONObject ret = esHttpService.fuzzyQueryTransRecord(date, date, null, bussseqno);
		if (ret == null || ret.isEmpty()) {
			setStrutsMessage(StrutsMessage.errorMessage("业务流水号[" + bussseqno + "]在日志中无法找到!"));
			return ERROR;
		}

		JSONArray tradelist = new JSONArray();
		if (ret.containsKey("aggregations")) {
			JSONObject aggregations = ret.getJSONObject("aggregations");
			if (aggregations.containsKey("aggserialno")) {
				JSONObject aggserialno = aggregations.getJSONObject("aggserialno");
				if (aggserialno.containsKey("buckets")) {
					JSONArray buckets = aggserialno.getJSONArray("buckets");
					for (int i = 0; i < buckets.size(); i++) {
						JSONObject resultObj = (JSONObject) buckets.get(i);
						if (resultObj.containsKey("aggserialno_type")) {
							JSONObject aggserialno_type = resultObj.getJSONObject("aggserialno_type");
							String appname = "";
							String serialno = "";
							serialno = resultObj.getString("key");
							if (aggserialno_type.containsKey("buckets")) {
								JSONArray subbuckets = aggserialno_type.getJSONArray("buckets");
								if (subbuckets != null && subbuckets.size() > 0) {
									appname = subbuckets.getJSONObject(0).getString("key");
								}
							}
							String reqflowno = StringUtils.rightPad(appname, 10, ' ') + date + serialno;

							JSONObject result = hbaseQuery.queryTable(TRAN_TABLE, appname, date, reqflowno);

							result.put("serialno", serialno);

							if (result.getString("TranSerialno") != null && result.getString("TranStart") != null
									&& result.getString("app") != null
									&& bussseqno.equals(result.getString("TranSerialno").trim())
									&& !serialno.equals(result.getString("TranSerialno"))) {
								String _app = transrecord.getString("app");
								long _startTs = DateUtils
										.parse(result.getString("TranStart"), "yyyy-MM-dd HH:mm:ss.SSS")
										.getTimeInMillis();
								long _endTs = DateUtils.parse(result.getString("TranStop"), "yyyy-MM-dd HH:mm:ss.SSS")
										.getTimeInMillis();
								if (StringUtils.containsIgnoreCase(_app, "eci")) {
									_startTs += TimeUnit.MINUTES.toMillis(22);
									_endTs += TimeUnit.MINUTES.toMillis(22);
								}
								long delta = TimeUnit.MINUTES.toMillis(5);
								if (StringUtils.equals(app, _app)) {
									delta = 1000;
								}
								if ((Math.abs(startTs - _startTs) < delta) && (Math.abs(endTs - _endTs) < delta)) {
									tradelist.add(result);
								}
							}

							// if(result.getString("TranStart")!=null&&result.getString("app")!=null&&!serialno.equals(result.getString("TranSerialno")))
							// {
							// tradelist.add(result);
							// }

						}
					}
				}
			}
		}

		setStrutsMessage(StrutsMessage.successMessage().addParameter("Reducedtradelist", reduce(tradelist)));
		return SUCCESS;

	}

	public String queryLogList() throws Exception {
		if (appname == null || "".equals(appname)) {
			setStrutsMessage(StrutsMessage.errorMessage("应用系统名称不能为空"));
			return ERROR;
		}

		if (date == null || "".equals(date)) {
			setStrutsMessage(StrutsMessage.errorMessage("日期不能为空"));
			return ERROR;
		}
		date = date.replaceAll("-", "");
		date = date.replaceAll("/", "");
		JSONObject content = hbaseQuery.queryTableOffset(TRAN_TABLE, appname, date);
		if (content == null || content.isEmpty()) {
			setStrutsMessage(StrutsMessage.errorMessage("流水号不能为空"));
			return ERROR;
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("tradelist", getTradeList(content, tradeflowno)));
		return SUCCESS;
	}

	private JSONArray getTradeList(JSONObject content, String tradeflowno) {
		JSONArray ret = new JSONArray();
		for (String key : content.keySet()) {
			JSONObject o = content.getJSONObject(key);
			if ("".equals(tradeflowno)) {
				o.put("flowno", key);
				ret.add(o);
			} else {
				if (o.containsKey(TranSerialno)) {
					if (o.getString(TranSerialno).indexOf(tradeflowno) != -1) {
						o.put("flowno", key);
						ret.add(o);
					}
				} else if (o.containsKey(reqseqno)) {
					if (o.getString(reqseqno).indexOf(tradeflowno) != -1) {
						o.put("flowno", key);
						ret.add(o);
					}
				} else if (o.containsKey(rspseqno)) {
					if (o.getString(rspseqno).indexOf(tradeflowno) != -1) {
						o.put("flowno", key);
						ret.add(o);
					}
				}
			}

		}
		return ret;
	}

	private List<TradePath> reduce(JSONArray tradelist) throws Exception {
		// 1.0找出业务流水相同的所有交易
		// 2.0按照请求流水+请求渠道
		// 3.0剩下节点都是孤立的节点
		Map<String, List<TradePath>> tradegroupBybussflowno = new HashMap<String, List<TradePath>>();
		List<TradePath> notgrouped = new ArrayList<TradePath>();
		for (int i = 0; i < tradelist.size(); i++) {
			JSONObject object = tradelist.getJSONObject(i);

			String tranSerialno = object.getString("TranSerialno");
			if (tranSerialno != null && !"".equals(tranSerialno)) {
				tranSerialno = tranSerialno.trim();
				List<TradePath> list = tradegroupBybussflowno.get(tranSerialno);
				if (list == null) {
					list = new ArrayList<TradePath>();
					tradegroupBybussflowno.put(tranSerialno, list);
				}
				list.add(createTradePath(object));
			} else {
				notgrouped.add(createTradePath(object));
			}
		}
		List<TradePath> retList = new ArrayList<TradePath>();
		for (String serialno : tradegroupBybussflowno.keySet()) {
			List<TradePath> oneSerialnoPaths = tradegroupBybussflowno.get(serialno);

			serializeTradePath(oneSerialnoPaths, retList);
		}
		retList.addAll(notgrouped);

		// sortTradePath(retList);
		return retList;
	}

	/**
	 * 对全部流水进行排序
	 * 
	 * @param paths
	 * @throws ParseException
	 */
	private void sortTradePath(List<TradePath> paths) throws ParseException {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

		// 对第一层进行排序
		for (int i = 0; i < paths.size(); i++) {
			for (int j = 0; j < paths.size() - 1; j++) {
				Date firstTime = null;
				Date secondTime = null;
				firstTime = df.parse(paths.get(j).getTranStart());
				secondTime = df.parse(paths.get(j + 1).getTranStart());
				if (firstTime.getTime() > secondTime.getTime()) {
					TradePath temp = new TradePath();
					temp = paths.get(j);
					paths.set(j, paths.get(j + 1));
					paths.set(j + 1, temp);
				}

			}
		}

	}

	/**
	 * 根据sendseqno和reqseqno对路径进行连接重组
	 * 
	 * @param paths
	 * @param ret
	 * @throws Exception
	 */
	private void serializeTradePath(List<TradePath> paths, List<TradePath> ret) throws Exception {
		List<TradePath> copys = new ArrayList<TradePath>();
		copys.addAll(paths);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		for (TradePath trade : paths) {
			String reqseqno = trade.getReqseqno();

			if (reqseqno != null && !"".equals(reqseqno)) {
				reqseqno = reqseqno.trim();
				String reqchanl = trade.getReqchannel();
				for (TradePath copyTrade : copys) {

					if (reqchanl != null) {

						if (reqchanl.equals(copyTrade.getAppname()) && reqseqno.equals((copyTrade.getSendseqno() != null
								? copyTrade.getSendseqno().replaceAll("\n|\r", "") : null))) {

							copyTrade.addNextTradePath(trade);
						}
					} else {
						/**
						 * AS400服务方的请求渠道为空时默认用ESB
						 */
						if ("AS400".equals(trade.getAppname()) && "ESB".equals(copyTrade.getAppname()) && reqseqno
								.equals(copyTrade.getReqseqno() != null ? copyTrade.getReqseqno().trim() : null)) {
							trade.setReqchannel("ESB");
							copyTrade.addNextTradePath(trade);

						}

					}

				}
			}
		}

		// 处理hadoop中sendseqno获取不全的情况
		// for(int i=0;i<paths.size();i++){
		// if(paths.get(i).getReqchannel()!=null)
		// {
		// TradePath searchTrade=paths.get(i);
		// boolean containFlag=false;
		// for(int g=0;g<paths.size();g++){
		//
		// if(paths.get(g).getNextTradePaths().contains(searchTrade)){
		// containFlag=true;
		// break;
		// }
		//
		// }
		// if(containFlag){
		// continue;
		// }
		//
		//
		//
		// try {
		// JSONObject result = esHttpService.fuzzyQueryAppLog(date, date,
		// searchTrade.getReqchannel(), searchTrade.getReqseqno());
		// if(result.containsKey("hits")){
		// JSONObject hits=result.getJSONObject("hits");
		// if(hits.containsKey("hits")){
		// JSONArray innerArray=hits.getJSONArray("hits");
		// if(innerArray.size()>0)
		// {
		// for( int h=0;h<innerArray.size();h++)
		// {
		// JSONObject innerHits=innerArray.getJSONObject(h);
		// if(innerHits.containsKey("_source")){
		// JSONObject source=innerHits.getJSONObject("_source");
		// if(source.containsKey("serialno")){
		// String esSerialno=source.getString("serialno").replaceAll("\n|\r",
		// "");
		//
		// for(int j=0;j<paths.size();j++){
		// TradePath item=paths.get(j);
		// if(item.getReqchannel()==null){
		// if(esSerialno.equals(item.getSerialno().replaceAll("\n|\r",
		// ""))&&searchTrade.getReqchannel().equals(item.getAppname())){
		//
		// if(!item.getNextTradePaths().contains(searchTrade)){
		//
		// if(item.getNextTradePaths().size()==0){
		// item.addNextTradePath(searchTrade);
		// }else {
		// for(int g=0;g<item.getNextTradePaths().size();g++)
		// {
		// TradePath innerItem= item.getNextTradePaths().get(g);
		// Date innerDate=df.parse(innerItem.getTranStart());
		// Date outDate=df.parse(searchTrade.getTranStart());
		// if(innerDate.getTime()>outDate.getTime())
		// {
		// item.getNextTradePaths().add(g, searchTrade);
		// break;
		// }else
		// if(innerDate.getTime()<outDate.getTime()&&(g+1)==item.getNextTradePaths().size())
		// {
		// item.addNextTradePath(searchTrade);
		// break;
		// }
		// }
		//
		// }
		// }
		//
		// }
		// }
		// }
		// }
		//
		// }
		// }
		// }
		// }
		// }
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		//
		// }
		// }

		for (TradePath copyTrade : copys) {

			if (copyTrade.getTradeDuration() == null && copyTrade.getTranStart() != null
					&& copyTrade.getTranStop() != null) {
				Date startDate = df.parse(copyTrade.getTranStart());
				Date endDate = df.parse(copyTrade.getTranStop());
				long duration = endDate.getTime() - startDate.getTime();
				copyTrade.setTradeDuration(String.valueOf(duration));
			}

			clearHaveSerialize(copyTrade.getNextTradePaths(), paths);
		}

		ret.addAll(paths);
	}

	private void clearHaveSerialize(List<TradePath> tmps, List<TradePath> paths) {

		if (tmps.size() > 0) {

			for (TradePath tmp : tmps) {
				if (tmp.getNextTradePaths().size() > 0) {

					clearHaveSerialize(tmp.getNextTradePaths(), paths);
				} else {
					paths.remove(tmp);
				}
			}
			for (TradePath tmp : tmps) {
				paths.remove(tmp);
			}
		}
	}

	private TradePath createTradePath(JSONObject object) {
		TradePath tradePath = new TradePath();
		tradePath.setDate(date);
		tradePath.setAppname(object.getString("app"));
		tradePath.setRespcode(object.getString("RespCode"));
		tradePath.setRespmsg(object.getString("RespMsg"));
		tradePath.setRespstat(object.getString("RespStat"));
		tradePath.setSerialno(object.getString("serialno"));
		tradePath.setTradeDuration(object.getString("TranDuration"));
		tradePath.setTranserialno(object.getString("TranSerialno"));
		tradePath.setReqchannel(object.getString("reqchannel"));
		tradePath.setReqseqno(object.getString("reqseqno"));
		tradePath.setSendseqno(object.getString("sendseqno"));
		tradePath.setTranStart(object.getString("TranStart"));
		tradePath.setTranStop(object.getString("TranStop"));
		return tradePath;
	}

	class TradePath {
		private String date;
		private String appname;
		private String serialno;
		private String transerialno;
		private String respstat;
		private String respcode;
		private String respmsg;
		private String tradeDuration;
		private String reqseqno;
		private String reqchannel;
		private String sendseqno;
		private String tranStart;
		private String tranStop;
		private List<TradePath> nextTradePaths = new ArrayList<TradePath>();

		public String getDate() {
			return date;
		}

		public String getAppname() {
			return appname;
		}

		public String getSerialno() {
			return serialno;
		}

		public String getTradeDuration() {
			return tradeDuration;
		}

		public void setDate(String date) {
			this.date = date;
		}

		public void setAppname(String appname) {
			this.appname = appname;
		}

		public void setSerialno(String serialno) {
			this.serialno = serialno;
		}

		public void setTradeDuration(String tradeDuration) {
			this.tradeDuration = tradeDuration;
		}

		public void addNextTradePath(TradePath tradePath) {
			nextTradePaths.add(tradePath);
		}

		public void removeNextTradePath(TradePath tradePath) {
			nextTradePaths.remove(tradePath);
		}

		public String getTranserialno() {
			return transerialno;
		}

		public String getRespstat() {
			return respstat;
		}

		public String getRespcode() {
			return respcode;
		}

		public String getTranStart() {
			return tranStart;
		}

		public String getTranStop() {
			return tranStop;
		}

		public void setTranStop(String tranStop) {
			this.tranStop = tranStop;
		}

		public void setTranStart(String tranStart) {
			this.tranStart = tranStart;
		}

		public String getRespmsg() {
			return respmsg;
		}

		public void setTranserialno(String transerialno) {
			this.transerialno = transerialno;
		}

		public void setRespstat(String respstat) {
			this.respstat = respstat;
		}

		public void setRespcode(String respcode) {
			this.respcode = respcode;
		}

		public void setRespmsg(String respmsg) {
			this.respmsg = respmsg;
		}

		public List<TradePath> getNextTradePaths() {
			return nextTradePaths;
		}

		public void setNextTradePaths(List<TradePath> nextTradePaths) {
			this.nextTradePaths = nextTradePaths;
		}

		public String getReqseqno() {
			return reqseqno;
		}

		public String getReqchannel() {
			return reqchannel;
		}

		public void setReqseqno(String reqseqno) {
			this.reqseqno = reqseqno;
		}

		public void setReqchannel(String reqchannel) {
			this.reqchannel = reqchannel;
		}

		public String getSendseqno() {
			return sendseqno;
		}

		public void setSendseqno(String sendseqno) {
			this.sendseqno = sendseqno;
		}

	}
}
