package tc.bank.asda.logconfig.service;

import tc.bank.asda.logconfig.model.AimlCfgLogSourceAgent;

public interface IAimlAutoCfgLogSourceService {

	boolean addFileBySource(boolean judgeBatch,String ip,int port,String user,String pass,String ftpFile,AimlCfgLogSourceAgent agent,String filePath);
}

