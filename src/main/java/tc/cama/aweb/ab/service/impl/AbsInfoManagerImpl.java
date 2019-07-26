package tc.cama.aweb.ab.service.impl;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.common.db.IDbService;
import tc.bank.common.db.Sort;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.model.AimAbsDynamicRep;
import tc.cama.aweb.ab.model.AimAbsStatisConfig;
import tc.cama.aweb.ab.service.IAbsInfoManager;

public class AbsInfoManagerImpl implements IAbsInfoManager {

	private IDbService dbService;

	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	@Override
	public Map<String, List<String>> getJvmEcharts(Integer mobjId) {
		JSONObject whereEx = new JSONObject();
		// 时间格式化
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
		DecimalFormat df=new DecimalFormat("#0.00");
		String srvServerDate = sdf.format(new Date());
		// 条件
		whereEx.put("mobjId", mobjId);
		whereEx.put("srvServerDate", srvServerDate);
		// 排序
		List<String> prop = new ArrayList<String>();
		prop.add("recordTime");
		Sort sort = new Sort("ASC", prop);

		List<AimAbsDynamicRep> absDynamicRep = dbService.queryAsBeanList(AimAbsDynamicRep.class, whereEx, sort);

		Map<String, List<String>> echartsData = new HashMap<String, List<String>>();
		List<String> line1 = new ArrayList<String>();
		List<String> time = new ArrayList<String>();
		/** jvm
		 * 内存使用率
		 *
		 */
		for (AimAbsDynamicRep rep : absDynamicRep) {
			if (rep.getRecordTime()!= null  
					&&rep.getJvmTotalmem()!= null  
					&&!rep.getJvmTotalmem().equals("")
					&&rep.getRunMaxmem()!=null
					&&!rep.getJvmTotalmem().equals("0")) {
				time.add(sdf1.format((rep.getRecordTime())));
				line1.add(df.format(((new Double(rep.getJvmTotalmem())/new Double(rep.getRunMaxmem())))*100));
			}
		}
		echartsData.put("time", time);
		echartsData.put("line1", line1);
		return echartsData;
	}

	@Override
	public Map<String, List<String>> getLoginCountEcharts(Integer mobjId) {
		JSONObject whereEx = new JSONObject();
		// 时间格式化
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
		String srvServerDate = sdf.format(new Date());
		// 条件
		whereEx.put("mobjId", mobjId);
		whereEx.put("srvServerDate", srvServerDate);
		// 排序
		List<String> prop = new ArrayList<String>();
		prop.add("recordTime");
		Sort sort = new Sort("ASC", prop);

		List<AimAbsDynamicRep> absDynamicRep = dbService.queryAsBeanList(AimAbsDynamicRep.class, whereEx, sort);

		Map<String, List<String>> echartsData = new HashMap<String, List<String>>();
		List<String> line1 = new ArrayList<String>();
		List<String> time = new ArrayList<String>();
		for (AimAbsDynamicRep rep : absDynamicRep) {
			if (rep.getRecordTime() != null && rep.getRunConnections() != null && !rep.getRunConnections().equals("")) {
				time.add(sdf1.format((rep.getRecordTime())));
				line1.add(rep.getRunConnections());
			}
		}
		echartsData.put("time", time);
		echartsData.put("line1", line1);
		return echartsData;
	}

	@Override
	public AimAbsStatisConfig getSglAbsByMobjId(Integer mobjId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", mobjId);
		return dbService.queryAsBean(AimAbsStatisConfig.class, whereEx);
	}

	@Override
	public List<AimAbsStatisConfig> getAbsList() {
		JSONObject whereEx = new JSONObject();
		return dbService.queryAsBeanList(AimAbsStatisConfig.class, whereEx);
	}

	@Override
	public int getAbsCountOnline(String instStatus) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("instStatus", instStatus);
		return dbService.count(AimAbsStatisConfig.class, whereEx);
	}

	@Override
	public int getAbsCount() {
		JSONObject whereEx = new JSONObject();
		return dbService.count(AimAbsStatisConfig.class, whereEx);
	}

	@Override
	public JSONObject getJvmPercentInfo(Integer mobjId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", mobjId);
		JSONObject result = new JSONObject();
		AimAbsDynamicCur absInfo = dbService.queryAsBean(AimAbsDynamicCur.class, whereEx);
		DecimalFormat df = new DecimalFormat("0.00");
		float percent = 0.0f;

		if (null != absInfo&&null != absInfo.getRunMaxmem()&&!"".equals(absInfo.getRunMaxmem())) {
			if (null != absInfo && null != absInfo.getJvmTotalmem() && !absInfo.getJvmTotalmem().equals("")
					&& !absInfo.getRunMaxmem().equals("")) {
				if (Integer.parseInt(absInfo.getJvmTotalmem()) != 0 && Integer.parseInt(absInfo.getRunMaxmem()) != 0) {
					percent = Float.parseFloat(absInfo.getJvmTotalmem()) / Float.parseFloat(absInfo.getRunMaxmem());
				}
			}
			boolean flag = percent > 0.80;
			result.put("percent", df.format(percent*100)+"%");
			result.put("flag", flag);
		}

		return result;
	}
	// @Override
	// public AimAbsDynamicCur getAbsInfo(Integer mobjId) {
	//
	// AimAbsDynamicCur absInfo = dbService.queryAsBean(AimAbsDynamicCur.class,
	// whereEx);
	// return absInfo;
	// }

}
