package cn.com.agree.aweb.struts2.action.system;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.service.aweb.ILoginService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.logging.Logger;
import cn.com.agree.logging.LoggerFactory;

@Controller("NoPasswdLogActionBean")
@Scope("prototype")
public class NoPasswdLogAction extends StandardActionSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4486505841297662655L;
	private Logger log = LoggerFactory.getLogger(NoPasswdLogAction.class);
	private String tokenId;
	@Autowired
	private ILoginService loginServer;
	
	
	public ILoginService getLoginServer() {
		return loginServer;
	}



	public void setLoginServer(ILoginService loginServer) {
		this.loginServer = loginServer;
	}



	public String getTokenId() {
		return tokenId;
	}



	public void setTokenId(String tokenId) {
		this.tokenId = tokenId;
	}



	public String login() throws Exception{
		String tokenUrl = "http://10.8.221.9:8081/bam/identity/json/isTokenValid?tokenid="+tokenId;
		String userUrl = "http://10.8.221.9:8081/bam/identity/json/attributes?subjectid="+tokenId+"&attributenames=appwatch&appid=appwatch&clientIp=127.0.0.1";
		String msg = "";
		log.info("tokenId:"+tokenId);
		try {
			URL realUrl = new URL(tokenUrl);
			HttpURLConnection conn = (HttpURLConnection)realUrl.openConnection();
			conn.setRequestProperty("Accept-Charset", "utf-8");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//			conn.connect();
			BufferedReader in = null;
			if(conn.getResponseCode()>=300){
				in = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
				throw new Exception("http request is not success,response code is "+conn.getResponseCode());
			}else{
				in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			}
			StringBuilder json = new StringBuilder();
			String line;
			if(in!=null){
				while((line = in.readLine()) != null){
					json.append(line);
				}
			}
			JSONObject jo = JSONObject.parseObject(json.toString());
			//test
//			jo.put("boolean", true);
			log.info("token-valid:"+jo.toJSONString());
			if(jo.getBooleanValue("boolean")){
				realUrl = new URL(userUrl);
				conn = (HttpURLConnection)realUrl.openConnection();
				conn.setRequestProperty("Accept-Charset", "utf-8");
				conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//				conn.connect();
				if(conn.getResponseCode()>=300){
					in = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
				}else
				in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				json = new StringBuilder();
				
				while((line = in.readLine()) != null){
					json.append(line);
				}
				jo = JSONObject.parseObject(json.toString());
				
				//test
//				String str = "{\"token\":{\"tokenId\":\"AQIC5wM2LY4SfcwS2mPhkyUgzM8smAsC4Q2v_95JV5N40Hg.*AAJTSQACMDEAAlNLABM4MzM2MDIyNTI2Njc3OTc2OTU5*\"},\"roles\":[],\"attributes\":[{\"values\":[\"admin\"],\"name\":\"luotong\"}]}";
//				jo = JSONObject.parseObject(str);
				
				
				log.info("userInfo:"+jo.toJSONString());
				//jo user信息
				if(jo.containsKey("token")){
					JSONArray ja = (JSONArray) jo.get("attributes");
					@SuppressWarnings("unchecked")
					List<String> ls = (List<String>) ja.getJSONObject(0).get("values");
					String username = null;
					if(ls.size()>0){
						username = ls.get(0);
					}
					if(username!=null){
						msg = loginServer.userIfExist(username);
						if(msg.equals("")){
							return "redirect";
						}
					}
					return "shouquan";
					
				}
			}
				return "renzheng";
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 获取StrutsMessage对象
	 * @param msg
	 * @return
	 */
	private StrutsMessage getStrutsMessageBean(String msg){
		return "".equals(msg) ? StrutsMessage.successMessage() : StrutsMessage.errorMessage(msg);
	}
	
}
