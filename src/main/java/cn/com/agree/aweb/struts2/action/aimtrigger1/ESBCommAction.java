package cn.com.agree.aweb.struts2.action.aimtrigger1;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.service.impl.RemoteServiceImpl;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

@Controller("ESBCommActionBean")
@Scope("prototype")
public class ESBCommAction extends StandardActionSupport{
	/**
	 * 
	 */
	private String headJson;
	private String cusmID;
	private String bodyJson;
	private static final long serialVersionUID = 7751923277069257011L;
	@Autowired
	RemoteServiceImpl remoteService;
	
	public String getHeadJson() {
		return headJson;
	}
	public void setHeadJson(String headJson) {
		this.headJson = headJson;
	}
	public String getBodyJson() {
		return bodyJson;
	}
	public void setBodyJson(String bodyJson) {
		this.bodyJson = bodyJson;
	}
	public String commESB() throws Exception{
		String jsonString="{\"$SYS_HEAD\":{\"@CONSUMER_ID\":[\"string\",6,0,false,\"400007\"],\"@ESB_SEQ_NO\":[\"string\",26,0,false,\"80080020170322020941161111\"],\"@USER_ID\":[\"string\",30,0,false,\"0100\"],\"@SERVICE_CODE\":[\"string\",11,0,false,\"11002000003\"],\"@SOURCE_BRANCH_NO\":[\"string\",20,0,false,\"00000916\"],\"@FILE_PATH\":[\"string\",512,0,false,\"\"],\"@SERVICE_SCENE\":[\"string\",2,0,false,\"02\"]},\"$APP_HEAD\":{\"@BUSS_SEQ_NO\":[\"string\",26,0,false,\"80080020170322020941161111\"]},\"$BODY\":{\"@EMAIL\":[\"string\",150,0,false,\"\"],\"@PACKAGE_LENGTH\":[\"int\",10,0,false,3],\"@TRAN_PASSWORD\":[\"string\",50,0,false,\"123456\"],\"@BATCH_FLAG\":[\"string\",1,0,false,\"0\"],\"#TEMPLATE_PARA_ARRAY\":{\"@PARA_VALUE\":[\"string\",4000,0,false,[\"ESB:[恢复]应用-应用服务器22,超过间隔时间173秒未收到AP22采集的数据\"]],\"size\":1},\"@NOTICE_MODE\":[\"string\",3,0,false,\"0\"],\"#PHONE_ARRAY\":{\"@PHONE_NO\":[\"string\",20,0,false,[\"15765535119\",\"212131321\"]],\"size\":2}},\"$LOCAL_HEAD\":{}}";
		 Map map=JSON.parseObject(jsonString, Map.class);
		//Map map=getMap();
		JSONObject reqData=new JSONObject();
		 reqData.put("recv", map);
		
		JSONObject data = remoteService.exchange("aweb", "ESB11", reqData);
		
	  setStrutsMessage(StrutsMessage.successMessage().addParameter("result", data));
		return SUCCESS;
	}
	public String getUnpackData() throws IOException{
         Map head=new HashMap(); 
         Map body=new HashMap();
		// Map sysHead=new HashMap();
		// sysHead.put("@FILE_PATH", new Object[]{"string",512,0,false,"12132132"});
	//	 Head.put("$SYS_HEAD", sysHead);
         head.put("coustNo","400007");
         head.put("esbSeqNo","80080020170322020941161111");
         head.put("userID","0100");
         head.put("serviceCode","11002000003");
         head.put("sourceBranchNo","00000916");
         head.put("filePath","");
         head.put("serviceScene","02");
         head.put("bussSeqNo","80080020170322020941161111");
         body.put("email", "asasa@qa.com");
         body.put("packageLength",3);
         body.put("tranPassword", "123456");
         body.put("batchFlag", "0");
         body.put("templateParaArray", new Object[]{"ESB:[恢复]应用-应用服务器22,超过间隔时间173秒未收到AP22采集的数据"});
         body.put("noticeMode", "0");
         body.put("phoneArray",new Object[]{"15765535119"});
		 List<Object>	list=new ArrayList<Object>();
		JSONObject reqData=new JSONObject();
		 reqData.put("smsHead", head);
		 reqData.put("smsBody", body);
		JSONObject data = remoteService.exchange("aweb", "SMS", reqData);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", data.get("rspXML")));
		return SUCCESS;
	}
	public Map getHead(String headJson){
		Map map=JSON.parseObject(headJson, Map.class);
		return map;
	}
    public Map getBody(String bodyJson){
    	Map map=JSON.parseObject(bodyJson, Map.class);
		return map;
	}
	public static void log(Object obj){
		System.out.println(JSON.toJSONString(obj,true));
	}
	public static  Map getMap(){
		 Map<Object,Object> map=new HashMap<Object,Object>();
		 Map<Object,Object> syshead=new HashMap<Object,Object>();
		 Map<Object,Object> apphead=new HashMap<Object,Object>();
		 Map<Object,Object> localhead=new HashMap<Object,Object>();
		 Map<Object,Object> body=new HashMap<Object,Object>();
		 /**
		  * syshead下的 
		  */
		 Map<Object,Object> esbseqno=new HashMap<Object,Object>();
		 List<Object> field1=new ArrayList<Object>();
		 field1.add("string");
		 field1.add(26);
		 field1.add(0);
		 field1.add(false);
		 field1.add("80080020170322020941161111");
		 syshead.put("@ESB_SEQ_NO",field1);
		
		// Object[] val=new Object[]{80080020170322020941161111};
		 
		 Map<Object,Object> userid=new HashMap<Object,Object>();
		 List<Object> field2=new ArrayList<Object>();
		 field2.add("string");
		 field2.add(30);
		 field2.add(0);
		 field2.add(false);
		 field2.add("0100");
	//	 userid.put("@USER_ID", field2);
		 syshead.put("@USER_ID",field2);
		 Map<Object,Object> sourcebranchno=new HashMap<Object,Object>();
		 List<Object> field3=new ArrayList<Object>();
		 field3.add("string");
		 field3.add(20);
		 field3.add(0);
		 field3.add(false);
		 field3.add("00000916");
		 syshead.put("@SOURCE_BRANCH_NO", field3);
		// syshead.put("$SOURCE_BRANCH_NO",sourcebranchno);
		 Map<Object,Object> servicescene=new HashMap<Object,Object>();
		 List<Object> field4=new ArrayList<Object>();
		 field4.add("string");
		 field4.add(2);
		 field4.add(0);
		 field4.add(false);
		 field4.add("02");
		 syshead.put("@SERVICE_SCENE", field4);
		// syshead.put("$SERVICE_SCENE",servicescene);
		 Map<Object,Object> servicecode=new HashMap<Object,Object>();
		 List<Object> field5=new ArrayList<Object>();
		 field5.add("string");
		 field5.add(11);
		 field5.add(0);
		 field5.add(false);
		 field5.add("11002000003");
		 syshead.put("@SERVICE_CODE", field5);
		// syshead.put("$SERVICE_CODE",servicecode);
		 Map<Object,Object> consumerid=new HashMap<Object,Object>();
		 List<Object> field6=new ArrayList<Object>();
		 field6.add("string");
		 field6.add(6);
		 field6.add(0);
		 field6.add(false);
		 field6.add("400007");
		 syshead.put("@CONSUMER_ID", field6);
		// syshead.put("$CONSUMER_ID",consumerid);
		 Map<Object,Object> filepath=new HashMap<Object,Object>();
		 List<Object> field7=new ArrayList<Object>();
		 field7.add("string");
		 field7.add(512);
		 field7.add(0);
		 field7.add(false);
		 field7.add("");
		 syshead.put("@FILE_PATH", field7);
		// syshead.put("$FILE_PATH",filepath);
		 map.put("$SYS_HEAD",syshead);
		 //syshead结束 
		 //localhead开始 
		 //List<Object> field16=new ArrayList<Object>();
		 
		 map.put("$LOCAL_HEAD",localhead);
		 //localhead结束 
		 //apphead开始 
		 Map<Object,Object> bussseqno=new HashMap<Object,Object>();
		 List<Object> field9=new ArrayList<Object>();
		 field9.add("string");
		 field9.add(26);
		 field9.add(0);
		 field9.add(false);
		 field9.add("80080020170322020941161111");
		 apphead.put("@BUSS_SEQ_NO", field9);
		 //apphead.put("$BUSS_SEQ_NO",bussseqno);
		 map.put("$APP_HEAD",apphead);
		 
		 //apphead结束 
		
		//body开始
		 Map<Object,Object> noticeMode=new HashMap<Object,Object>();
		 List<Object> field10=new ArrayList<Object>();
		 field10.add("string");
		 field10.add(3);
		 field10.add(0);
		 field10.add(false);
		 field10.add("0");
		 body.put("@NOTICE_MODE", field10);
		 List<Object> field11=new ArrayList<Object>();
		 field11.add("string");
		 field11.add(50);
		 field11.add(0);
		 field11.add(false);
		 field11.add("123456");
		 body.put("@TRAN_PASSWORD", field11);
		 Map<Object,Object> phoneArray=new HashMap<Object,Object>();
		 phoneArray.put("size",2);
		 List<Object> phoneArr=new ArrayList<Object>();
		 List<Object> phoneField1=new ArrayList<Object>();
		 List<Object> pArr=new ArrayList<Object>();
		 pArr.add("13712323389");
		 pArr.add("212131321");
		 phoneField1.add("string");
		 phoneField1.add(20);
		 phoneField1.add(0);
		 phoneField1.add(false);
		 phoneField1.add(pArr);
		 phoneArr.add(phoneField1);
		 phoneArray.put("@PHONE_NO",phoneField1);
		 body.put("#PHONE_ARRAY",phoneArray);
		 Map<Object,Object> templateParaArray=new HashMap<Object,Object>();
		 templateParaArray.put("size",1);
		 List<Object> templateArr1=new ArrayList<Object>();
		 List<Object> Arr1=new ArrayList<Object>();
		 Arr1.add("ESB:[恢复]应用-应用服务器22,超过间隔时间173秒未收到AP22采集的数据");
		 templateArr1.add("string");
		 templateArr1.add(4000);
		 templateArr1.add(0);
		 templateArr1.add(false);
		 templateArr1.add(Arr1);
		 templateParaArray.put("@PARA_VALUE",templateArr1);
		
		 body.put("#TEMPLATE_PARA_ARRAY",templateParaArray);
		 List<Object> field12=new ArrayList<Object>();
		 field12.add("int");
		 field12.add(10);
		 field12.add(0);
		 field12.add(false);
		 field12.add(3);
		 body.put("@PACKAGE_LENGTH", field12);
		 List<Object> field13=new ArrayList<Object>();
		 field13.add("string");
		 field13.add(150);
		 field13.add(0);
		 field13.add(false);
		 field13.add("");
		 body.put("@EMAIL", field13);
		 List<Object> field14=new ArrayList<Object>();
		 field14.add("string");
		 field14.add(1);
		 field14.add(0);
		 field14.add(false);
		 field14.add("0");
		 body.put("@BATCH_FLAG", field14);
		 
		 map.put("$BODY",body);
		 return map;
	}	
	public static void main(String[] args){
		String str="select *　from \"%s\" ";
		//List <Object>　list=new ArrayList<Object>();
	 List<Object>	list=new ArrayList<Object>();
	 list.add(1565464646l);
	 Object[] params=list.toArray();
		//System.out.println(params[0]);
		String str1=String.format(str, params);
		System.out.println(str1);
	}
}



