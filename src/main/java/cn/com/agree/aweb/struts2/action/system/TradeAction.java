package cn.com.agree.aweb.struts2.action.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AwebMenu;
import tc.cama.aweb.model.AwebMenuMenuView;
import tc.cama.aweb.service.ITradeManager;

@Controller("TradeActionBean")
@Scope("prototype")
public class TradeAction extends StandardActionSupport implements ModelDriven<AwebMenu>{


	private static final long serialVersionUID = 1L;
	
	@Autowired
	private ITradeManager tradeManager;

	private AwebMenu awebMenu=new AwebMenu();
	
	private Integer id;

	/**
	 * getters
	 * @return
	 */

	
	public ITradeManager getTradeManager() {
		return tradeManager;
	}


	public Integer getId() {
		return id;
	}


	public AwebMenu getAwebMenu() {
		return awebMenu;
	}

	/**
	 * setters
	 * @param mid
	 */

	
	public void setAwebMenu(AwebMenu awebMenu) {
		this.awebMenu = awebMenu;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setTradeManager(ITradeManager tradeManager) {
		this.tradeManager = tradeManager;
	}

	/**
	 * 获取交易列表信息
	 * @return
	 * 
	 */
	public String getAllTradeList() {
		List<AwebMenuMenuView> allTrades = tradeManager.getAllTradeList();
		if(allTrades!=null && allTrades.size()>0)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("list", allTrades));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("list", new JSONArray()));
		return SUCCESS;
	}
	
	/**
	 * 添加一条交易信息
	 * @return
	 * 
	 */
	public String addTrade() {
		int result=tradeManager.saveTrade(awebMenu);
		if(result>0)
			setStrutsMessage(StrutsMessage.successMessage());
		else
			setStrutsMessage(StrutsMessage.errorMessage("添加交易信息失败"));
		return SUCCESS;
	}
	
	/**
	 * 更新一条交易信息
	 * @return
	 * 
	 */
	public String updateTrade() {
		int result=tradeManager.updateTradeByMid(awebMenu);
		if(result>0)
			setStrutsMessage(StrutsMessage.successMessage());
		else
			setStrutsMessage(StrutsMessage.errorMessage("更新交易信息失败"));
		return SUCCESS;
	}
	
	/**
	 * 删除一条交易信息
	 * @return
	 * 
	 */
	public String deleteTrade() {
		int result=tradeManager.deleteTradeByMid(id);
		if(result>0)
			setStrutsMessage(StrutsMessage.successMessage());
		else
			setStrutsMessage(StrutsMessage.errorMessage("删除交易信息失败"));
		return SUCCESS;
	}

	@Override
	public AwebMenu getModel() {
		return awebMenu;
	}
	
	
}
