package tc.cama.aweb.service;

import java.util.List;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;
import tc.bank.cama.cmdb.model.table.extention.CmdbApplication;
import tc.cama.aweb.bean.EventInFo;
import tc.cama.aweb.bean.PageCfgObjectSummary;
import tc.cama.aweb.bean.PageCfgSoftDeploy;

/**
 * SVG相关接口
 * @author Xsy
 *
 */
public interface ISvgInfo {

	JSONObject getSvgInfo(JSONObject request) throws Exception;
	
	JSONObject getAppSourceSvgInfo(Long app_id, String app_name)
			throws Exception;
}
