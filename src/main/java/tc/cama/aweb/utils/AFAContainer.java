package tc.cama.aweb.utils;


import java.util.LinkedList;
import java.util.List;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.afa.core.device.VDModule;
import cn.com.agree.afa.core.device.VDService;
import cn.com.agree.afa.core.scoreboard.DeviceState;
import cn.com.agree.afa.core.scoreboard.score.ModuleScore;
import cn.com.agree.afa.core.scoreboard.score.ServiceScore;
import cn.com.agree.afa.omi.IOperationsManager;
import cn.com.agree.afa.omi.OmiException;
import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.util.CommonUtils;
import cn.com.agree.aweb.util.ConfigFileXPath;
import net.sf.json.JSONObject;
import tc.cama.aweb.bean.AFAInstance;
import tc.cama.aweb.bean.AFARegistry;
import tc.cama.aweb.bean.AfaDeviceType;
import tc.cama.aweb.bean.IsolateState;
import tc.cama.aweb.model.AfaInstanceVO;
import tc.cama.aweb.model.AfaRegistryVO;

public class AFAContainer
{
  private static boolean init = true;
  private static String clusterId = "clusterId";
  private static LinkedList<AFAInstance> instanceList = new LinkedList();
  private static LinkedList<AFARegistry> registryList = new LinkedList();
//  private static RegistryContainer registryContainer = new RegistryContainer();
  private static ManagerContainer managerContainer = new ManagerContainer();
//  private static StandardDbSupport dbOperation;
  
  public AFAContainer(List<AfaInstanceVO> instances,List<AfaRegistryVO> registrys)
   
  {
   
    for (AfaInstanceVO instance : instances) {
      instanceList.add(new AFAInstance(instance.getHost(), 
        instance.getPort(), instance.getName()));
    }
   
    for (AfaRegistryVO registry : registrys) {
      registryList.add(new AFARegistry(registry.getHost(), 
        registry.getPort(), registry.getName()));
    }
  }
  
  public static  IOperationsManager getExistManager(String host, int port) throws OmiException
  {
    return managerContainer.getManager(host, port);
  }
 
  public static DeviceState getManagerState(String host, int port)
  {
    return getManagerState(managerContainer.getExistsManager(host, port));
  }

  public static IOperationsManager getExistManager(String managerKey)
  {
    String[] idens = managerKey.split(":");
    
    return managerContainer.getExistsManager(idens[0], Integer.valueOf(idens[1]).intValue());
  }
  public static DeviceState getManagerState(IOperationsManager manager)
  {
    if (manager == null) {
      return DeviceState.Stopped;
    }
    try
    {
      manager.getGroupScores();
      return DeviceState.Running;
    }
    catch (OmiException e) {}
    return DeviceState.Stopped;
  }
  public static IsolateState getDvcIsolateState(String host, int port, AfaDeviceType dvcType, String... args)
		    throws Exception
		  {
		    return getDvcIsolateState(getExistManager(host, port), dvcType, args);
		  }

  public static IsolateState getDvcIsolateState(IOperationsManager manager, AfaDeviceType dvcType, String... args)
    throws Exception
  {
    if (DeviceState.Stopped.equals(getManagerState(manager))) {
      return IsolateState.CannotIsolate;
    }
    ConfigManager configManager = ConfigManager.createConfigManager(manager);
    return configManager.getIsolateState(manager, dvcType, args);
  }

  public static JSONObject getServiceScore(String host, int port, VDService service)
		    throws Exception
		  {
		    IOperationsManager manager = managerContainer.getExistsManager(host, port);
		    if (manager == null) {
		      throw new AWebException("不可运行的韵味管理器[host=" + host + ", port=" + port + "]");
		    }
		    ServiceScore score = manager.getServiceScore(service);
		    JSONObject object = new JSONObject();
		    object.put("restartCount", Integer.valueOf(score.getRestartCount()));
		    object.put("startupTime", formatTime(score.getStartupTime()));
		    object.put("isolateState", getDvcIsolateState(host, port, AfaDeviceType.SERVICE, new String[0]));
		    object.put("state", score.getState());
		    
		    VDModule module = service.getVDModule();
		    ModuleType mType = module.getModuleType();
		    if (ModuleType.LSR.equals(mType))
		    {
		      int sid = service.getID();
		      int mid = module.getID();
		      int gid = module.getGid();
		      ConfigManager configManager = ConfigManager.createConfigManager(manager);
		      String serviceTypeNum = configManager.getServiceTypeNum(ConfigFileXPath.lsrService(gid, mid, sid));
		      object.put("isolateState", getDvcIsolateState(host, port, AfaDeviceType.LSRSERVICE, new String[] { ""+gid, ""+mid, ""+sid, serviceTypeNum }));
		    }
		    return object;
		  }

  public static JSONObject getModuleScore(String host, int port, VDModule module)
    throws OmiException, AWebException
  {
    IOperationsManager manager = managerContainer.getExistsManager(host, port);
    if (manager == null) {
      throw new AWebException("����������������������[host=" + host + ", port=" + port + "]");
    }
    ModuleScore score = manager.getModuleScore(module);
    JSONObject object = new JSONObject();
    object.put("restartCount", Integer.valueOf(score.getRestartCount()));
    object.put("startupTime", formatTime(score.getStartupTime()));
    object.put("state", score.getState());
    
    return object;
  }
  private static String formatTime(long mills)
  {
    return mills == 0L ? "" : CommonUtils.formatTime("yyyy-MM-dd HH:mm:ss", mills);
  }
  
}