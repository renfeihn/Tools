package cn.com.agree.aweb.struts2.action.system;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.bank.common.db.Sort;
import tc.bank.common.db.Sort.Order;
import tc.cama.aweb.model.AwebUser;
import tc.cama.aweb.model.AwebUserOperation;
import tc.cama.aweb.service.IUserOperation;

@Scope("prototype")
@Controller("UserOperationActionBean")
public class UserOperationAction extends StandardActionSupport implements ModelDriven<AwebUserOperation>{
	
	private static final long serialVersionUID = 1L;

	@Autowired
	IUserOperation userOperationService;
	
	private AwebUserOperation awebUserOperation = new AwebUserOperation();
	
	private int page;
	private int size;
	private String dateTime;
	private String startTime;
	private String endTime;
	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}
	
	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	@Override
	public AwebUserOperation getModel() {
		return this.awebUserOperation;
	}
	
	public String save() throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date tempTime = sdf.parse(dateTime);
		awebUserOperation.setTime(tempTime);
		HttpSession session = getSession();
		if (session == null) {
			return SUCCESS;
		}
		AwebUser user = (AwebUser) getSession().getAttribute(Constants.SESSION_USERVO);
		if (user == null) {
			return SUCCESS;
		}
		String username = user.getUsername();
		awebUserOperation.setUsername(username);
		int rows = userOperationService.save(awebUserOperation);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("rows", rows));
		return SUCCESS;
	}
	
	public String queryAwebUserOperationByPage() throws Exception {
		Pageable pageable = new Pageable(page, size);
		List<Order> orders = new ArrayList<Order>();
		String direction = "desc";
	    String property = "time";
	    Order order = new Order(direction, property);
	    orders.add(order);
		Sort sort = new Sort(orders);
		Page<AwebUserOperation> awebUserOperations = userOperationService.queryAwebUserOperationByPage(awebUserOperation, startTime, endTime, pageable, sort);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("awebUserOperations", awebUserOperations));
		return SUCCESS;
	}
	

}
