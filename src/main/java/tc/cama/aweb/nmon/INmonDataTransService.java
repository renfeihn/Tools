package tc.cama.aweb.nmon;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.bank.common.core.Page;

public interface INmonDataTransService {
	
	/**
	 * 上传文件并解析入库
	 * @param filecontent
	 * @param filename
	 * @param ipAddr
	 * @param mobj_id
	 * @throws Exception
	 */
	public boolean uploadFile(JSONObject filecontent,String ipAddr,String mobj_id)throws Exception;

	/**
	 * 
	 * @param content 获取服务器列表
	 * @throws Exception
	 */
	public Page<CmdbLogicalServer> getServerList(int page,int num) throws Exception;
}
