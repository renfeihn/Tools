package cn.com.agree.aweb.struts2.action.monitorTools.dataQuery;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.servlet.ServletContext;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.util.SdkDataUtil;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * @author zhouyuehui@agree.com.cn 
 * @description 审计查询Action
 * 2017年3月8日 下午7:23:59  
 */
@Controller(value="AuditQueryActionBean")
@Scope("prototype")
public class AuditQueryAction extends AimStandardActionSupport {
	private static final long serialVersionUID = 4884187859760261746L;
	private String urlParams;
	private String start_time; 
	private String end_time; 
	private String supportgroup; 
	private String app_name;
	private String paramKeyWords;
	
	/**
	 * @description 获取审计列表
	 */
	public String getAuditList(){
		String totalrownum = null;
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("type", "0");
//		SdkDataUtil.putData("supportgroup", supportgroup, private_req_map);
//		SdkDataUtil.putData("app_name", app_name, private_req_map);
		SdkDataUtil.putData("starttime", start_time, private_req_map);
		SdkDataUtil.putData("endtime", end_time, private_req_map);
		SdkDataUtil.putData("operatorman", paramKeyWords, private_req_map);//操作人模糊搜索
		JSONObject reqParamss = JSONObject.parseObject(urlParams);//前台传过来分页 后台分页需要的参数
		JSONArray order_params = reqParamss.getJSONArray("order_field_list");
		JSONArray order_field_list = new JSONArray();
		if(order_params!=null&&!order_params.isEmpty()){
			JSONArray tempdate = new JSONArray();
			JSONArray temptime = new JSONArray();

			for (int i = 0; i < order_params.size(); i++) {
				if (i % 2 == 0) {
					tempdate.add("crt_date");
					temptime.add("crt_time");
				} else {
					tempdate.add(order_params.get(i));
					temptime.add(order_params.get(i));
					order_field_list.add(tempdate);
					order_field_list.add(temptime);
				}
			}
		}
		
		private_req_map.put("order_field_list", order_field_list);
		Integer iDisplayStart = reqParamss.getInteger("iDisplayStart");
    	Integer iDisplayLength = reqParamss.getInteger("iDisplayLength");
    	Integer currpage = (iDisplayStart/iDisplayLength)+1;
    	JSONObject publicdata = new JSONObject();
    	publicdata.put("username",getUserName());
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_",currpage+"");
		publicdata.put("_pagenum_",iDisplayLength+"");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_sql",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					totalrownum = dataBySdk.getJSONObject("public_rsp").getString("totalrownum");
					strutsMessage.successMessage().addParameter("objInfo", SdkDataUtil.transSdkData(dataBySdk)).addParameter("totalrownum", totalrownum);
				}else{
					strutsMessage.errorMessage("后台无返回数据无数据！");
				}
			}else{
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	//生成审计列表excel
	public String createAuditExcel(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("type", "0");
		SdkDataUtil.putData("supportgroup", supportgroup, private_req_map);
		SdkDataUtil.putData("app_name", app_name, private_req_map);
		SdkDataUtil.putData("starttime", start_time, private_req_map);
		SdkDataUtil.putData("endtime", end_time, private_req_map);
		SdkDataUtil.putData("operatorman", paramKeyWords, private_req_map);//操作人模糊搜索
		private_req_map.put("like_field_list", new String[]{"operatorman"});//对这几个字段进行模糊搜索
    	JSONObject publicdata = new JSONObject();
    	publicdata.put("username",getUserName());
		publicdata.put("_opertype_","0");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_sql",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("statue","1");
					//生成excel表格
					String title[] = new String[]{"所属组","所属系统","数据库","数据库用户","SQL","操作人","时间","查询时长(ms)","结果行数","结果信息","状态"};
					String excelSheet = "审计列表";
					//取后台返回数据中的以下列
					String str0[]= new String[]{"supportgroup","app_name","db_name","username","crt_date","crt_time","status","url","sqlstr","result_num","crt_user_no","result_time","remork"};
					JSONObject jsonob0 = (JSONObject) dataBySdk.get("private_rsp");
					String[][] tableData = SdkDataUtil.getTableData(str0, jsonob0);
					String newTableData[][] = new String[tableData.length][title.length];//新的table数据数组
					for(int i=0;i<tableData.length;i++){
							newTableData[i][0] = tableData[i][0];
							newTableData[i][1] = tableData[i][1];
							newTableData[i][2] = tableData[i][2];
							newTableData[i][3] = tableData[i][3];
							newTableData[i][4] = tableData[i][8];//sql
							newTableData[i][5] = tableData[i][10];//操作人
							newTableData[i][6] = tableData[i][4]+tableData[i][5];//时间
							newTableData[i][7] = tableData[i][11];//查询时长
							newTableData[i][8] = tableData[i][9];//结果行数
							newTableData[i][9] = tableData[i][12];//结果信息
							newTableData[i][10] = "0000".equals(tableData[i][6])?"成功":"失败";
 					}
					JExcel(newTableData,title,excelSheet);
				}else{
					strutsMessage.errorMessage("后台无返回数据无数据！");
				}
			}else{
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
    /**
     * 将数据导入表格  newStr为excel中的数据，title为excel第一行  excelTitle为sheet的名字
     */
    public void JExcel(String[][] newstr,String[] title,String exceltitle){
        try {   
            ServletContext servletContext = ServletActionContext.getServletContext();
            String filePath= servletContext.getRealPath("/Auditreport");
            File file = new File(filePath);
            if(!file.isDirectory()){
            	file.mkdir();
            }
            // 输出的excel的路径   
//            String filePath = "./jxl.xls";
             // 创建Excel工作薄   
            WritableWorkbook workBook;   
             // 新建立一个jxl文件,即在e盘下生成testJXL.xls   
            OutputStream os = new FileOutputStream(filePath+File.separator+"审计列表.xls");   
            workBook=Workbook.createWorkbook(os);    
            WritableCellFormat colorSet = null; 
            // 添加第一个工作表并设置第一个Sheet的名字   
            WritableSheet sheet = workBook.createSheet(exceltitle, 0);
            sheet.setColumnView(0, 12);
            sheet.setColumnView(1, 15);
            sheet.setColumnView(2, 10);
            sheet.setColumnView(3, 10);
            sheet.setColumnView(4, 20);
            sheet.setColumnView(5, 10);
            sheet.setColumnView(6, 20);
            sheet.setColumnView(7, 10);
            sheet.setColumnView(8, 10);
            sheet.setColumnView(9, 10);
            sheet.setColumnView(10, 20);
            sheet.setColumnView(11, 10);
            Label label;   
            for(int i=0;i<title.length;i++){
                // Label(x,y,z) 代表单元格的第x+1列，第y+1行, 内容z   
         	   colorSet = new WritableCellFormat(); //要给每个cell设置背景颜色，则每个cell需要new一个设置实例
         	// 设置居中   
                colorSet.setAlignment(Alignment.CENTRE); 
         	   // 设置边框线   
                colorSet.setBorder(Border.ALL, BorderLineStyle.THIN); 
         	   colorSet.setBackground(jxl.format.Colour.GOLD);
                // 在Label对象的子对象中指明单元格的位置和内容   
                label = new Label(i,0,title[i],colorSet);   
                // 将定义好的单元格添加到工作表中   
                sheet.addCell(label);
            }    
            // 填充数据
            for(int i =0;i<newstr.length;i++){
         	   for(int j = 0;j<newstr[i].length;j++){
         		   label = new Label(j,i+1,newstr[i][j]);
         		   sheet.addCell(label);
         	   }
            }
          // 写入数据   
           workBook.write();   
            // 关闭文件   
            workBook.close();
            os.close();
        } catch (Exception e) {   
            System.out.println("---出现异常---");   
             e.printStackTrace();   
         }
    }
	public String getUrlParams() {
		return urlParams;
	}
	public void setUrlParams(String urlParams) {
		this.urlParams = urlParams;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}
	public String getSupportgroup() {
		return supportgroup;
	}
	public void setSupportgroup(String supportgroup) {
		this.supportgroup = supportgroup;
	}
	public String getApp_name() {
		return app_name;
	}
	public void setApp_name(String app_name) {
		this.app_name = app_name;
	}
	public String getParamKeyWords() {
		return paramKeyWords;
	}
	public void setParamKeyWords(String paramKeyWords) {
		this.paramKeyWords = paramKeyWords;
	}
}
