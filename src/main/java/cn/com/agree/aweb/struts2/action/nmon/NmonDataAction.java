package cn.com.agree.aweb.struts2.action.nmon;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.service.IRemoteService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.cama.aweb.nmon.GZipCompressUtil;
import tc.cama.aweb.nmon.INmonDataTransService;

/**
 * nmon数据入库
 * 
 * @author 上官
 *
 */
@Controller("NmonDataActionBean")
@Scope("prototype")
public class NmonDataAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -144194308559871730L;
	@Autowired
	private INmonDataTransService service;
	private String upfileFileName;
	private File upfile;
	private String server_id;
	private String ipaddr;
	private String mobj_Id;
	private int page;
	private int num;
	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public String getServer_id() {
		return server_id;
	}

	public void setServer_id(String server_id) {
		this.server_id = server_id;
	}

	public String getIpaddr() {
		return ipaddr;
	}

	public void setIpaddr(String ipaddr) {
		this.ipaddr = ipaddr;
	}

	public String getMobj_Id() {
		return mobj_Id;
	}

	public void setMobj_Id(String mobj_Id) {
		this.mobj_Id = mobj_Id;
	}

	public String getUpfileFileName() {
		return upfileFileName;
	}

	public void setUpfileFileName(String upfileFileName) {
		this.upfileFileName = upfileFileName;
	}

	public File getUpfile() {
		return upfile;
	}

	public void setUpfile(File upfile) {
		this.upfile = upfile;
	}


	/**
	 * 文件流转为byte[]
	 */
	private byte[] getFileContent() throws Exception {
		FileInputStream fis = null;
		ByteArrayOutputStream bos = null;
		try {
            fis = new FileInputStream(upfile);  
            bos = new ByteArrayOutputStream();  
            byte[] b = new byte[1024];  
            int n;  
            while ((n = fis.read(b)) != -1)  
            {  
                bos.write(b, 0, n);  
            }  
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}		
		
		return  bos.toByteArray();
	}
	
	
	
	/**
	 * 上传文件
	 * @return
	 * @throws Exception
	 */
	public  String uploadFile() throws Exception{
		byte[] filecontent = getFileContent();
		//获取文件内容
		JSONObject content = new JSONObject();
		content.put("content", GZipCompressUtil.zip(filecontent));
		boolean flag = service.uploadFile(content, ipaddr, mobj_Id);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("flag", flag));
		return SUCCESS;
	}
	
	public String getServerList() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("lists", service.getServerList(page,num)));
		return SUCCESS;
	}
	
}
