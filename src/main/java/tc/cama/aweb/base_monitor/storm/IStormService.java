package tc.cama.aweb.base_monitor.storm;

import java.io.IOException;

import com.aim.alibaba.fastjson.JSONObject;

public interface IStormService {
	JSONObject getAppDetail(String path) throws IOException;
	
}
