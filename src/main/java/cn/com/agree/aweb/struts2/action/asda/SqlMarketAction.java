package cn.com.agree.aweb.struts2.action.asda;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.sqlmarket.model.AimlSqlMarketCfg;
import tc.bank.asda.sqlmarket.model.AimlSqlMarketGroup;
import tc.bank.asda.sqlmarket.model.AimlSqlMarketSqlInterest;
import tc.bank.asda.sqlmarket.service.IAimlSqlMarketService;
import tc.cama.aweb.model.AwebUser;
import tc.cama.aweb.nmon.GZipCompressUtil;

@Controller("SqlMarketActionBean")
@Scope("prototype")
public class SqlMarketAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7472017650144828223L;

	@Autowired
	private IAimlSqlMarketService sqlMarketService;

	/**
	 * id
	 */
	private long id;
	/**
	 * sqlId
	 */
	private long sqlId;
	
	/**
	 * groupId
	 */
	private long groupId;
	
	/**
	 * 分组名称
	 */
	private String groupName;
	
	/**
	 * sqlMarketCfg bean
	 */
	private String sqlMarketCfgBean;
	
	/**
	 * sqlMarketInterest bean
	 */
	private String sqlMarketInterestBean;

	/**
	 * 可见好友
	 */
	private List<Long> userIds;

	/**
	 * 条件参数
	 */
	private String conditions;
	
	/**
	 * 条件参数
	 */
	private String sorts;
	
	/**
	 * 更新标志
	 */
	private String updateFlag;
	
	/**
	 * sqlMarketGroup bean
	 */
	private String sqlMarketGroupBean;

	/**
	 * 上传文件
	 */
	private List<File> upfile;
	
	/**
	 * 
	 */
	private long userId;
	
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getGroupId() {
		return groupId;
	}

	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}
	
	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getSqlMarketCfgBean() {
		return sqlMarketCfgBean;
	}

	public void setSqlMarketCfgBean(String sqlMarketCfgBean) {
		this.sqlMarketCfgBean = sqlMarketCfgBean;
	}

	public String getSqlMarketGroupBean() {
		return sqlMarketGroupBean;
	}

	public void setSqlMarketGroupBean(String sqlMarketGroupBean) {
		this.sqlMarketGroupBean = sqlMarketGroupBean;
	}

	public List<Long> getUserIds() {
		return userIds;
	}

	public void setUserIds(List<Long> userIds) {
		this.userIds = userIds;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public String getSorts() {
		return sorts;
	}

	public void setSorts(String sorts) {
		this.sorts = sorts;
	}

	public String getUpdateFlag() {
		return updateFlag;
	}

	public void setUpdateFlag(String updateFlag) {
		this.updateFlag = updateFlag;
	}

	public long getSqlId() {
		return sqlId;
	}

	public void setSqlId(long sqlId) {
		this.sqlId = sqlId;
	}

	public String getSqlMarketInterestBean() {
		return sqlMarketInterestBean;
	}

	public void setSqlMarketInterestBean(String sqlMarketInterestBean) {
		this.sqlMarketInterestBean = sqlMarketInterestBean;
	}
	
	public List<File> getUpfile() {
		return upfile;
	}

	public void setUpfile(List<File> upfile) {
		this.upfile = upfile;
	}
	
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	/**
	 * 文件流转为byte[]
	 */
	private byte[] getFileContent(File file) throws Exception {
		FileInputStream fis = null;
		ByteArrayOutputStream bos = null;
		try {
            fis = new FileInputStream(file);
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
	 * 添加sql市场配置
	 * 
	 * @return
	 */
	public String addCfg() {
		try {
			AimlSqlMarketCfg sqlMarketCfg = JSONObject.parseObject(sqlMarketCfgBean, AimlSqlMarketCfg.class);
			if(upfile!=null&&upfile.size()>0){
				String attachmentPath = sqlMarketCfg.getAttachmentPath();
				if(StringUtils.isEmpty(attachmentPath)||attachmentPath.split("#").length!=upfile.size()){
					return ERROR;
				}
				String[] attachmentPaths = attachmentPath.split("#");
				String attachPathTmp = null;
				List<byte[]> attachList = new ArrayList<byte[]>();
				
				for(int i=0;i<upfile.size();i++){
					
					byte[] filecontent = getFileContent(upfile.get(i));
//					Decoder decoder = Base64.getDecoder();
//					byte[] filecontent = decoder.decode(upfile.split(",")[1]);
					//获取文件内容
					attachList.add(GZipCompressUtil.zip(filecontent));
					attachPathTmp = attachmentPaths[i];
					if(attachmentPaths[i].indexOf("\\")!=-1){
						attachPathTmp = attachmentPaths[i].substring(attachmentPaths[i].lastIndexOf("\\")+1);
					}
					if(attachmentPaths[i].indexOf("/")!=-1){
						attachPathTmp = attachmentPaths[i].substring(attachmentPaths[i].lastIndexOf("/")+1);
					}
					if(i==0){
						sqlMarketCfg.setAttachmentPath(attachPathTmp);
					}else{
						sqlMarketCfg.setAttachmentPath(sqlMarketCfg.getAttachmentPath()+"#"+attachPathTmp);
					}
				}
				sqlMarketCfg.setAttachment(attachList);
			}
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				sqlMarketCfg.setCreateUser(userVO.getId());
				setStrutsMessage(
						StrutsMessage.successMessage().addParameter("result", sqlMarketService.addCfg(sqlMarketCfg,userIds,groupName)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改
	 * 
	 * @return
	 */
	public String updateCfgByFlag() {
		try {
			AimlSqlMarketCfg sqlMarketCfg = JSONObject.parseObject(sqlMarketCfgBean, AimlSqlMarketCfg.class);
			if("2".equals(updateFlag)){
				AwebUser userVO = this.getUserVO();
				if (null == userVO) {
					setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
					return ERROR;
				} else {
					sqlMarketCfg.setCreateUser(userVO.getId());
				}
			}
			if(upfile!=null&&upfile.size()>0){
				String attachmentPath = sqlMarketCfg.getAttachmentPath();
				if(StringUtils.isEmpty(attachmentPath)||attachmentPath.split("#").length!=upfile.size()){
					return ERROR;
				}
				String[] attachmentPaths = attachmentPath.split("#");
				String attachPathTmp = null;
				List<byte[]> attachList = new ArrayList<byte[]>();
				
				for(int i=0;i<upfile.size();i++){
					
					byte[] filecontent = getFileContent(upfile.get(i));
//					Decoder decoder = Base64.getDecoder();
//					byte[] filecontent = decoder.decode(upfile.split(",")[1]);
					//获取文件内容
					attachList.add(GZipCompressUtil.zip(filecontent));
					attachPathTmp = attachmentPaths[i];
					if(attachmentPaths[i].indexOf("\\")!=-1){
						attachPathTmp = attachmentPaths[i].substring(attachmentPaths[i].lastIndexOf("\\")+1);
					}
					if(attachmentPaths[i].indexOf("/")!=-1){
						attachPathTmp = attachmentPaths[i].substring(attachmentPaths[i].lastIndexOf("/")+1);
					}
					if(i==0){
						sqlMarketCfg.setAttachmentPath(attachPathTmp);
					}else{
						sqlMarketCfg.setAttachmentPath(sqlMarketCfg.getAttachmentPath()+"#"+attachPathTmp);
					}
				}
				sqlMarketCfg.setAttachment(attachList);
			}
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.updateCfg(updateFlag, sqlMarketCfg, userIds)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取所有数据
	 * 
	 * @return
	 */
	public String getAllCfg() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.getAllCfg()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取所有配置信息数据(我发布的和sql圈)
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String getAllCfgView() {
		try {
			Map<String,String> conditionMap = JSONObject.parseObject(conditions, Map.class);
			Map<String,String> sortsMap = null;
			if(StringUtils.isNotEmpty(sorts)){
				sortsMap = JSONObject.parseObject(sorts, Map.class);
			}
			if(conditionMap.containsKey("flag")&&"1".equals(conditionMap.get("flag"))){
				// sql圈
				AwebUser userVO = this.getUserVO();
				if (null == userVO) {
					setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
					return ERROR;
				} else {
					conditionMap.put("userId", userVO.getId().toString());
				}
			}else if(conditionMap.containsKey("owner")&&"1".equals(conditionMap.get("owner"))){
				// 我发布的
				AwebUser userVO = this.getUserVO();
				if (null == userVO) {
					setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
					return ERROR;
				} else {
					conditionMap.put("createUser", userVO.getId().toString());
					conditionMap.put("publishFlag","1");
				}
			}else if(conditionMap.containsKey("owner")&&"0".equals(conditionMap.get("owner"))){
				// 我未发布的
				AwebUser userVO = this.getUserVO();
				if (null == userVO) {
					setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
					return ERROR;
				} else {
					conditionMap.put("createUser", userVO.getId().toString());
					conditionMap.put("publishFlag","0");
				}
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.getAllCfgView(conditionMap,sortsMap)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取所有配置信息数据（我关注的）
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String getAllCfgViewByUserId() {
		try {
			Map<String,String> conditionMap = JSONObject.parseObject(conditions, Map.class);
			Map<String,String> sortsMap = null;
			if(StringUtils.isNotEmpty(sorts)){
				sortsMap = JSONObject.parseObject(sorts, Map.class);
			}
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				conditionMap.put("userId", userVO.getId().toString());
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.getAllCfgViewByUserId(conditionMap,sortsMap)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	
	
	/**
	 * 获取用户关注
	 * 
	 * @return
	 */
	public String getInterests() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.getInterests(userVO.getId())));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 添加用户关注
	 * 
	 * @return
	 */
	public String addInterest() {
		try {
			AimlSqlMarketSqlInterest bean = JSONObject.parseObject(sqlMarketCfgBean, AimlSqlMarketSqlInterest.class);
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				bean.setUserId(userVO.getId());
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.addInterest(bean)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 取消用户关注
	 * 
	 * @return
	 */
	public String delByUserId() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.delByUserId(sqlId, userVO.getId())));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 查询sql可见人
	 * 
	 * @return
	 */
	public String getUserNames() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.getUserNames(sqlId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 添加评分
	 * 
	 * @return
	 */
	public String addScore() {
		
		try {
			
			AimlSqlMarketSqlInterest sqlMarketInterest = JSONObject.parseObject(sqlMarketInterestBean, AimlSqlMarketSqlInterest.class);
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				sqlMarketInterest.setUserId(userVO.getId());
				setStrutsMessage(
						StrutsMessage.successMessage().addParameter("result", sqlMarketService.addScore(sqlMarketInterest)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改
	 * 
	 * @return
	 */
	public String updateCfg() {
		try {
			AimlSqlMarketCfg sqlMarketCfg = JSONObject.parseObject(sqlMarketCfgBean, AimlSqlMarketCfg.class);
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.updateCfg(sqlMarketCfg)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 删除
	 * 
	 * @param sourceId
	 * @return
	 */
	public String delCfgById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.delCfgById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据id获取信息
	 * 
	 * @return
	 */
	public String getCfgById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.getCfgById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据分组id获取信息
	 * 
	 * @return
	 */
	public String getCfgByGroupId() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.getCfgByGroupId(groupId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 添加sql分组配置
	 * 
	 * @return
	 */
	public String addGroup() {
		try {
			AimlSqlMarketGroup sqlMarketGroup = JSONObject.parseObject(sqlMarketGroupBean, AimlSqlMarketGroup.class);
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.addGroup(sqlMarketGroup)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 获取所有数据
	 * 
	 * @return
	 */
	public String getAllGroup() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sqlMarketService.getAllGroup()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改
	 * 
	 * @return
	 */
	public String updateGroup() {
		try {
			AimlSqlMarketGroup sqlMarketGroup = JSONObject.parseObject(sqlMarketGroupBean, AimlSqlMarketGroup.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					sqlMarketService.updateGroup(sqlMarketGroup)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 删除
	 * 
	 * @param sourceId
	 * @return
	 */
	public String delGroupById() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.delGroupById(groupId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据id获取信息
	 * 
	 * @return
	 */
	public String getGroupById() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.getGroupById(groupId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 根据id获取信息
	 * 
	 * @return
	 */
	public String isInterest() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", sqlMarketService.isInterest(userId, sqlId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

}
