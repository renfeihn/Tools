package tc.bank.asda.dataclean.service;

import java.util.List;

import tc.bank.asda.dataclean.model.LogAchiveHost;

public interface ILogAchiveService {

	public List<LogAchiveHost> getLogAchiveHostList() ;
	
	public LogAchiveHost getLogAchiveHost(long id) ;
	
	public boolean addLogAchiveHost(LogAchiveHost lah) ;
	
	public boolean updateLogAchiveHost(LogAchiveHost lah) ;
	
	public boolean delLogAchiveHost(long id) ;
}
