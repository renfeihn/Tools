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
import tc.cama.aweb.ab.model.AbServerLoad;
import tc.cama.aweb.ab.model.AimAbsAgentCur;
import tc.cama.aweb.ab.model.AimAbsAgentRep;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.service.IAbServerLoad;
import tc.cama.aweb.ab.service.IAimAbcAgentCurManager;
import tc.cama.aweb.bean.AbsBean;
import tc.cama.aweb.bean.AsbPortState;

public class AimAbcAgentCurImpl implements IAimAbcAgentCurManager {
	private IDbService dbService;
	private IAbServerLoad iAbServerLoad ;
	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	public IAbServerLoad getiAbServerLoad() {
		return iAbServerLoad;
	}

	public void setiAbServerLoad(IAbServerLoad iAbServerLoad) {
		this.iAbServerLoad = iAbServerLoad;
	}

	@Override
	public AimAbsAgentCur getAgentCurByObjId(Integer objId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", objId);
		return dbService.queryAsBean(AimAbsAgentCur.class, whereEx);
	}

	@Override
	public Map<String, List<String>> getAgentCurByObjIdDate(Integer objId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", objId);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
		String recordTime = sdf.format(new Date());
		whereEx.put("mobjId", objId);
		whereEx.put("srvServerDate", recordTime);
		List<String> prop = new ArrayList<String>();
		prop.add("recordTime");
		Sort sort = new Sort("ASC", prop);
		List<AimAbsAgentRep> list = dbService.queryAsBeanList(AimAbsAgentRep.class, whereEx, sort);
		Map<String, List<String>> echartsData = new HashMap<String, List<String>>();
		List<String> line1 = new ArrayList<String>();
		List<String> line2 = new ArrayList<String>();
		List<String> time = new ArrayList<String>();
		for (AimAbsAgentRep rep : list) {
			if (rep.getRecordTime() != null) {
				time.add(sdf1.format((rep.getRecordTime())));
				line1.add(rep.getPcpu());
				line2.add(rep.getPmem());
			}
		}
		echartsData.put("time", time);
		echartsData.put("line1", line1);
		echartsData.put("line2", line2);
		return echartsData;
	}

	@Override
	public AsbPortState getAgentRepPortsByObjId(Integer objId) {
		AsbPortState asbState = new AsbPortState();
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", objId);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
		String recordTime = sdf.format(new Date());
		whereEx.put("srvServerDate", recordTime);
		List<String> prop = new ArrayList<String>();
		prop.add("recordTime");
		Sort sort = new Sort("ASC", prop);
		List<AimAbsAgentRep> list = dbService.queryAsBeanList(AimAbsAgentRep.class, whereEx, sort);
		Map<String, List<String>> echartsData = new HashMap<String, List<String>>();
		List<String> line1 = new ArrayList<String>();// 端口数
		// List<String> curState=new ArrayList<String>();//fin数
		// List<String> line3=new ArrayList<String>();//timewait数
		// List<String> line4=new ArrayList<String>();//closewait数
		// List<String> line5=new ArrayList<String>();//established数'
		List<String> time = new ArrayList<String>();
		for (AimAbsAgentRep rep : list) {
			if (rep.getRecordTime() != null) {
				time.add(sdf1.format((rep.getRecordTime())));
				line1.add(rep.getConnectnum());
			}
		}
		JSONObject whereEx1 = new JSONObject();
		whereEx.put("mobjId", objId);
		AimAbsAgentCur cur = dbService.queryAsBean(AimAbsAgentCur.class, whereEx1);
		echartsData.put("time", time);
		echartsData.put("line1", line1);
		asbState.setEchartsData(echartsData);
		asbState.setAbsCur(cur);
		return asbState;

	}

	@Override
	public Map<String, List<String>> getAgentFileByObjId(Integer objId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", objId);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
		String recordTime = sdf.format(new Date());
		whereEx.put("srvServerDate", recordTime);
		List<String> prop = new ArrayList<String>();
		prop.add("recordTime");
		Sort sort = new Sort("ASC", prop);
		List<AimAbsAgentRep> list = dbService.queryAsBeanList(AimAbsAgentRep.class, whereEx, sort);
		Map<String, List<String>> echartsData = new HashMap<String, List<String>>();
		List<String> line1 = new ArrayList<String>();
		List<String> time = new ArrayList<String>();
		for (AimAbsAgentRep rep : list) {
			if (rep.getRecordTime() != null) {
				time.add(sdf1.format((rep.getRecordTime())));
				line1.add(rep.getFilenum());
			}
		}
		echartsData.put("time", time);
		echartsData.put("line1", line1);
		return echartsData;

	}

	@Override
	public AbsBean getPlatformState(Integer objId) {
		JSONObject whereEx = new JSONObject();
		DecimalFormat df = new DecimalFormat("#0.00");
		whereEx.put("mobjId", objId);
		AimAbsAgentCur abs = dbService.queryAsBean(AimAbsAgentCur.class, whereEx);
		AimAbsDynamicCur dynamic = dbService.queryAsBean(AimAbsDynamicCur.class, whereEx);
		AbsBean bean = new AbsBean();
		if (abs != null) {
			bean.setAbcCount(Integer.parseInt(abs.getConnectnum()));
			bean.setPhPc(abs.getPmem());

			bean.setPupc(abs.getPcpu());
			bean.setThreadState(abs.getStat());
			bean.setPortState((Integer.parseInt(abs.getFilenum()) == 0) && (Integer.parseInt(abs.getTimewaitnum()) == 0)
					&& (Integer.parseInt(abs.getClosewaitnum()) == 0));

		}
		if (dynamic != null && dynamic.getJvmTotalmem() != null && dynamic.getRunMaxmem() != null) {
			String use_Max = df.format(new Double(dynamic.getJvmTotalmem()) / new Double(dynamic.getRunMaxmem()));
			bean.setVimMen(use_Max);
		}
		return bean;
	}
	@Override
	public List<AbServerLoad> getServerLoad(){
		
		return iAbServerLoad.getAsbServerLoad();
	}
}
