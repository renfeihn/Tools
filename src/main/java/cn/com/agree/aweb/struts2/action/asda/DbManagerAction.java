package cn.com.agree.aweb.struts2.action.asda;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.service.aweb.ILoginService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.ExcelHandle;
import tc.bank.asda.dbmanager.model.DbBook;
import tc.bank.asda.dbmanager.model.DbExecuteRet;
import tc.bank.asda.dbmanager.model.DbManager;
import tc.bank.asda.dbmanager.service.IDbManagerService;
import tc.bank.common.date.DateUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("DbManagerActionBean")
@Scope("prototype")
public class DbManagerAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7472017650144828223L;

	@Autowired
	private IDbManagerService dbManagerService;

	@Autowired
	private ILoginService loginServer;

	/**
	 * DBManager主键ID
	 */
	private long id;
	/**
	 * 书签ID
	 */
	private long bookId;
	/**
	 * 执行SQL
	 */
	private String sql;
	/**
	 * 数据库类型
	 */
	private String dbType;
	/**
	 * JSON串
	 */
	private String manager;
	/**
	 * SQL书签JSON串
	 */
	private String dbBook;
	/**
	 * 密码
	 */
	private String passwd;
	/**
	 * 创建者
	 */
	
	private List<Integer> sharedUserIds;

	/**
	 * 最大链接数
	 */
	private int defaultRsNum;
	
	
	private String fileName;

	private InputStream inStream;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		this.dbType = dbType;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setInStream(InputStream inStream) {
		this.inStream = inStream;
	}

	public List<Integer> getSharedUserIds() {
		return sharedUserIds;
	}

	public void setSharedUserIds(List<Integer> sharedUserIds) {
		this.sharedUserIds = sharedUserIds;
	}

	public String getDbBook() {
		return dbBook;
	}

	public void setDbBook(String dbBook) {
		this.dbBook = dbBook;
	}

	public long getBookId() {
		return bookId;
	}

	public void setBookId(long bookId) {
		this.bookId = bookId;
	}

	/**
	 * 添加数据库管理
	 * 
	 * @return
	 */
	public String add() {
		try {
			DbManager dbManager = JSONObject.parseObject(manager, DbManager.class);
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				dbManager.setCreatedUser(userVO.getId());
				setStrutsMessage(
						StrutsMessage.successMessage().addParameter("result", dbManagerService.add(dbManager)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 分享数据库管理
	 * 
	 * @return
	 */
	public String share() {
		try {
			// 页面选取的是创建者，当前用户是分享者
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("用户过期！"));
				return ERROR;
			}
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", dbManagerService.share(id, sharedUserIds)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改数据库管理信息
	 * 
	 * @return
	 */
	public String update() {
		try {
			DbManager dbManager = JSONObject.parseObject(manager, DbManager.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					dbManagerService.update(dbManager.getId(), dbManager)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 删除数据库管理信息
	 * 
	 * @param sourceId
	 * @return
	 */
	public String del() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dbManagerService.del(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据类型查询数据库管理信息（dbType可以为空，则查询所有）DB2/Oracle/Mysql
	 * 
	 * @return
	 */
	public String getManagers() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			List<DbManager> managers = dbManagerService.getAllDbManager(userVO.getId(), dbType);
			for (DbManager tmp : managers) {
				AwebUser createUser = loginServer.getUserById(tmp.getCreatedUser());
				if (null != createUser) {
					tmp.setCreate(createUser.getUsername());
				}
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", managers));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 測試連接
	 * 
	 * @return
	 */
	public String testConnection() {
		try {
			DbManager dbManager = JSONObject.parseObject(manager, DbManager.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					dbManagerService.testConnection(dbManager, passwd)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("数据库连接超时，请检查相关配置信息!"));
			return ERROR;
		}
	}

	/**
	 * 执行SQL
	 * 
	 * @return
	 */
	public String executeSQL() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			List<DbExecuteRet> result = dbManagerService.executeSQL(id, sql, userVO.getId(), passwd, defaultRsNum);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(e.getMessage().split("ServiceFailException:")[1]));
			return ERROR;
		}
	}

	/**
	 * 查询执行历史
	 * 
	 * @return
	 */
	public String getExecuteHis() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					dbManagerService.getExecuteHis(userVO.getId(), id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据主键ID删除
	 * 
	 * @return
	 */
	public String delExecuteHis() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dbManagerService.delExecuteHis(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 清空SQL历史删除
	 * 
	 * @return
	 */
	public String delAllExecuteHis() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dbManagerService.delAllExecuteHis(userVO.getId(), id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查询数据库表名
	 * 
	 * @return
	 */
	public String getDbTables() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", dbManagerService.getDbTables(id, passwd)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 添加SQL书签
	 * 
	 * @return
	 */
	public String addDbBook() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			if (StringUtils.isEmpty(dbBook)) {
				setStrutsMessage(StrutsMessage.errorMessage("请求参数为空"));
				return ERROR;
			}
			DbBook book = JSONObject.parseObject(dbBook, DbBook.class);
			book.setUser(userVO.getId());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dbManagerService.addDbBook(book)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改SQL书签
	 * 
	 * @return
	 */
	public String updateDbBook() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			if (StringUtils.isEmpty(dbBook)) {
				setStrutsMessage(StrutsMessage.errorMessage("请求参数为空"));
				return ERROR;
			}
			DbBook book = JSONObject.parseObject(dbBook, DbBook.class);
			book.setUser(userVO.getId());
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", dbManagerService.updateDbBook(book)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 删除SQL书签
	 * 
	 * @return
	 */
	public String delDbBook() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dbManagerService.delDbBook(bookId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查询SQL书签列表
	 * 
	 * @return
	 */
	public String getDbBooks() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					dbManagerService.getDbBooks(userVO.getId(), id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 下载EXCEL文件
	 * 
	 * @return
	 */
	public String downExcel() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			List<DbExecuteRet> array = dbManagerService.executeSQL(id, sql, userVO.getId(), passwd, defaultRsNum);
			if (array.size() > 0) {
				DbExecuteRet ret = array.get(0);
				List<LinkedHashMap<String, Object>> list = ret.getQueryResult();
				List<Object[]> dataList = new ArrayList<>(list.size());
				Set<String> keys = list.get(0).keySet();
				Object[] rowNames = keys.toArray();
				for (Map<String, Object> map : list) {
					Object[] values = new Object[rowNames.length];
					for (int i = 0; i < rowNames.length; i++) {
						values[i] = map.get(rowNames[i]);
					}
					dataList.add(values);
				}
				return exportFile("数据库表数据", rowNames, dataList);
			}
			setStrutsMessage(StrutsMessage.errorMessage("没有满足条件的数据"));
			return ERROR;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 下载SQL-INSERT语句文件
	 * 
	 * @return
	 */
	public String downInsert() {
		FileWriter fw = null;
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			}
			List<String> list = dbManagerService.getInsertSQL(id, sql, userVO.getId(), passwd);
			if (null == list) {
				setStrutsMessage(StrutsMessage.errorMessage("查询数据为空"));
				return ERROR;
			}
			this.fileName = "Asda_db_" + DateUtils.format(new Date(), "yyyyMMdd") + ".sql";

			File downFilePath = new File(ServletActionContext.getServletContext().getRealPath("download"));
			if (!downFilePath.exists()) {
				downFilePath.mkdirs();
			}
			String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
			File file = new File(path);
			if (!file.exists()) {
				file.createNewFile();
			}
			fw = new FileWriter(file);
			for (String tmp : list) {
				fw.write(tmp);
				fw.write(System.getProperty("line.separator"));
			}
			fw.flush();
			return "stream";
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		} finally {
			if (null != fw) {
				try {
					fw.close();
				} catch (IOException e) {
					setStrutsMessage(StrutsMessage.errorMessage("文件流关闭失败"));
					return ERROR;
				}
			}
		}
	}

	/**
	 * 导出文件
	 * 
	 * @param logId
	 * @return
	 * @throws Exception
	 */
	public String exportFile(String title, Object[] rowName, List<Object[]> dataList) throws Exception {
		HSSFWorkbook workbook = null;
		OutputStream out = null;
		this.fileName = "Asda_db_" + DateUtils.format(new Date(), "yyyyMMdd") + ".xls";
		File downFilePath = new File(ServletActionContext.getServletContext().getRealPath("download"));
		if (!downFilePath.exists()) {
			downFilePath.mkdirs();
		}
		String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
		File file = new File(path);
		if (!file.exists()) {
			file.createNewFile();
		}
		workbook = ExcelHandle.export(title, rowName, dataList);
		out = new FileOutputStream(file);
		workbook.write(out);
		if (null != out) {
			out.close();
		}
		return "stream";
	}

	public InputStream getInStream() {
		if (inStream != null) {
			return inStream;
		}
		String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
		try {
			inStream = new FileInputStream(path);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		deleteFile(path);
		return inStream;
	}

	private boolean deleteFile(String filePath) {
		boolean flag = false;
		File file = new File(filePath);
		if (file.isFile() && file.exists()) {
			file.delete();
			flag = true;
		}
		return flag;
	}

	public int getDefaultRsNum() {
		return defaultRsNum;
	}

	public void setDefaultRsNum(int defaultRsNum) {
		this.defaultRsNum = defaultRsNum;
	}
}
