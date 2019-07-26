package tc.cama.aweb.bean;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;

import org.dom4j.DocumentException;
import org.dom4j.Element;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.afa.core.device.DeviceFactory;
import cn.com.agree.afa.core.device.VDModule;
import cn.com.agree.afa.core.device.VDService;
import cn.com.agree.afa.core.scoreboard.score.GroupScore;
import cn.com.agree.afa.core.scoreboard.score.ModuleScore;
import cn.com.agree.afa.core.scoreboard.score.ServiceScore;
import cn.com.agree.afa.omi.IOperationsManager;
import cn.com.agree.afa.omi.OmiException;
import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.exception.AfaConfigException;
import cn.com.agree.aweb.util.AfaCommonUtil;
import cn.com.agree.aweb.util.CommonUtils;
import cn.com.agree.aweb.util.ConfigFileXPath;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tc.cama.aweb.utils.AFAContainer;
import tc.cama.aweb.utils.ConfigManager;
import tc.cama.aweb.utils.SchemaManager;

public class AfaTableStructure
{
  private IOperationsManager manager;
  private SchemaManager schemaManager;
  private ConfigManager configManager;
  private static final String SVC_NAME = "业务处理器";
  private static final String DCM_NAME = "缓存处理器";
  private static final String FORMAT_TIME = "yyyy-MM-dd HH:mm:ss";
  
  private AfaTableStructure(IOperationsManager manager)
    throws OmiException, DocumentException, AfaConfigException, UnsupportedEncodingException
  {
    this.manager = manager;
    doInit();
  }
  
  private void doInit()
    throws OmiException, DocumentException, AfaConfigException, UnsupportedEncodingException
  {
    this.configManager = ConfigManager.createConfigManager(this.manager);
    
    byte[] schemaContents = ConfigManager.getSchemaContents(this.manager);
    String schemaVersion = AfaCommonUtil.getSchemaVersion(schemaContents);
    this.schemaManager = (SchemaManager.getSchemaManager(schemaVersion) == null ? 
      SchemaManager.createSchemaManager(schemaContents) : 
      SchemaManager.getSchemaManager(schemaVersion));
  }
  
  public static AfaTableStructure instance(IOperationsManager manager)
    throws OmiException, DocumentException, AfaConfigException, UnsupportedEncodingException
  {
    return new AfaTableStructure(manager);
  }
  
  public JSONArray getWorkgroupNodes()
    throws Exception
  {
    JSONArray groupArr = null;
    Element workgroupsEle = this.configManager.selectSingleNode(ConfigFileXPath.workgroups());
    for (Object workgroupEle1 : workgroupsEle.elements())
    {
      //Element workgroupEle=ConvertUtils.convert(workgroupEle1, Element.class);
      Element workgroupEle=(Element)workgroupEle1;
      int gid = Integer.parseInt(workgroupEle.attributeValue("id"));
      if (groupArr == null) {
        groupArr = getWorkgroupNode(gid);
      } else {
        groupArr.addAll(getWorkgroupNode(gid));
      }
    }
    return groupArr;
  }
  
  public JSONArray getWorkgroupNode(int gid)
    throws Exception
  {
    GroupStructNode groupNode = getGroupNodeFromScore(gid);
    if (groupNode == null) {
      return null;
    }
    return JSONArray.fromObject(new GroupStructNode[] { groupNode });
  }
  
  private GroupStructNode getGroupNodeFromScore(int gid)
    throws Exception
  {
    GroupScore groupScore = this.manager.getGroupScore(gid);
    
    String name = getElementName(ConfigFileXPath.workgroup(gid));
    if (name == null) {
      return null;
    }
    IsolateState isolateState = this.configManager.getIsolateState(this.manager, AfaDeviceType.WORKGROUP, new String[] { String.valueOf(gid) });
    
    ModuleStructNode moduleNode = null;
    GroupStructNode groupNode = new GroupStructNode(gid, name, 
    	      groupScore.getState(), formatTime(groupScore.getStartupTime()), 
    	      groupScore.getRestartCount(), AfaDeviceType.WORKGROUP, AFAContainer.getManagerState(this.manager), 
    	      isolateState, AFAContainer.getDvcIsolateState(this.manager, AfaDeviceType.PLATFORM, new String[0]));
    	    
    Element lsrsEle = this.configManager.selectSingleNode(ConfigFileXPath.lsrs(gid));
    for (Object lsrEle1 : lsrsEle.elements())
    {  
     Element lsrEle=ConvertUtils.convert(lsrEle1, Element.class);
      int mid = Integer.parseInt(lsrEle.attributeValue("id"));
      moduleNode = getModuleNodeFromScore(gid, mid, ModuleType.LSR, isolateState);
      if (moduleNode != null) {
        groupNode.getLsrs().add(moduleNode);
      }
    }
    Element svcEle = this.configManager.selectSingleNode(ConfigFileXPath.svc(gid));
    if (svcEle != null)
    {
      moduleNode = getModuleNodeFromScore(gid, 1, ModuleType.SVC, isolateState);
      if (moduleNode != null) {
        groupNode.getSvcs().add(moduleNode);
      }
    }
    Element dcmEle = this.configManager.selectSingleNode(ConfigFileXPath.dcm(gid));
    if (dcmEle != null)
    {
      moduleNode = getModuleNodeFromScore(gid, 1, ModuleType.DCM, isolateState);
      if (moduleNode != null) {
        groupNode.getDcm().add(moduleNode);
      }
    }
    Element outsEle = this.configManager.selectSingleNode(ConfigFileXPath.outs(gid));
    for (Object outEle1 : outsEle.elements())
    { 
     Element outEle=ConvertUtils.convert(outEle1, Element.class);
      int mid = Integer.parseInt(outEle.attributeValue("id"));
      moduleNode = getModuleNodeFromScore(gid, mid, ModuleType.OUT, isolateState);
      if (moduleNode != null) {
        groupNode.getOuts().add(moduleNode);
      }
    }
    return groupNode;
  }
  
  public JSONArray getModuleNode(int gid, int mid, ModuleType moduleType, IsolateState pIsolateState)
    throws Exception
  {
    ModuleStructNode moduleNode = getModuleNodeFromScore(gid, mid, moduleType, pIsolateState);
    
    return JSONArray.fromObject(new ModuleStructNode[] { moduleNode });
  }
  
  private ModuleStructNode getModuleNodeFromScore(int gid, int mid, ModuleType moduleType, IsolateState pIsolateState)
    throws Exception
  {
    GroupScore gScore = this.manager.getGroupScore(gid);
    VDModule vdModule = DeviceFactory.getVDModule(gid, mid, moduleType);
    ModuleScore moduleScore = this.manager.getModuleScore(vdModule);
    
    String name = null;
    String xPath = null;
    String childXPath = null;
    AfaDeviceType type = null;
    switch (moduleType)
    {
    case LSR: 
      xPath = ConfigFileXPath.lsr(gid, mid);
      childXPath = ConfigFileXPath.lsrServices(gid, mid);
      type = AfaDeviceType.LSR;
      break;
    case OUT: 
      xPath = ConfigFileXPath.out(gid, mid);
      childXPath = ConfigFileXPath.outServices(gid, mid);
      type = AfaDeviceType.OUT;
      break;
    case SVC: 
      xPath = ConfigFileXPath.svc(gid);
      type = AfaDeviceType.SVC;
      name = "业务处理器";
      break;
    case DCM: 
      xPath = ConfigFileXPath.dcm(gid);
      childXPath = ConfigFileXPath.dcmServices(gid);
      type = AfaDeviceType.DCM;
      name = "缓存处理器";
    }
    Element element = this.configManager.selectSingleNode(xPath);
    if (element == null) {
      return null;
    }
    name = name == null ? element.attributeValue("name") : name;
    ModuleStructNode moduleNode = new ModuleStructNode(gid, mid, 
      moduleType, name, moduleScore.getState(), 
      formatTime(moduleScore.getStartupTime()), 
      moduleScore.getRestartCount(), type, gScore.getState(), 
      IsolateState.CannotIsolate, pIsolateState);
    if (childXPath != null)
    {
      Element services = this.configManager.selectSingleNode(childXPath);
      for (Object serviceEle1 : services.elements())
      { 
    	  Element serviceEle=ConvertUtils.convert(serviceEle1, Element.class);
         int sid = Integer.parseInt(serviceEle.attributeValue("id"));
         ServiceStructNode serviceNode = getServiceNodeFromScore(gid, mid, moduleType, sid, pIsolateState);
         if (serviceNode != null) {
          moduleNode.getServices().add(serviceNode);
        }
      }
    }
    return moduleNode;
  }
  
  public JSONArray getServiceNode(int gid, int mid, ModuleType moduleType, int sid, IsolateState pIsolateState)
    throws Exception
  {
    ServiceStructNode serviceNode = getServiceNodeFromScore(gid, mid, 
      moduleType, sid, pIsolateState);
    
    return JSONArray.fromObject(new ServiceStructNode[] { serviceNode });
  }
  
  private ServiceStructNode getServiceNodeFromScore(int gid, int mid, ModuleType moduleType, int sid, IsolateState pIsolateState)
    throws Exception
  {
    VDService vdService = DeviceFactory.getVDService(gid, mid, moduleType, sid);
    ModuleScore mScore = this.manager.getModuleScore(vdService.getVDModule());
    ServiceScore serviceScore = this.manager.getServiceScore(vdService);
    
    AfaDeviceType afaDevType = null;
    String xPath = null;
    if (ModuleType.LSR.equals(moduleType))
    {
      xPath = ConfigFileXPath.lsrService(gid, mid, sid);
      afaDevType = AfaDeviceType.LSRSERVICE;
    }
    else if (ModuleType.OUT.equals(moduleType))
    {
      xPath = ConfigFileXPath.outService(gid, mid, sid);
      afaDevType = AfaDeviceType.OUTSERVICE;
    }
    else if (ModuleType.DCM.equals(moduleType))
    {
      xPath = ConfigFileXPath.dcmService(gid, sid);
      afaDevType = AfaDeviceType.DCMSERVICE;
    }
    String name = getElementName(xPath);
    if (name == null) {
      return null;
    }
    String serviceType = getServiceTypeOption(moduleType, this.configManager.getServiceTypeNum(xPath));
    IsolateState isolateState = this.configManager.getIsolateState(this.manager, afaDevType, new String[] { ""+gid, ""+mid, ""+sid, serviceType });
    
    return new ServiceStructNode(gid, mid, moduleType, sid, name, 
      serviceScore.getState(), formatTime(serviceScore.getStartupTime()), 
      serviceScore.getRestartCount(), AfaDeviceType.SERVICE, 
      serviceType, mScore.getState(), isolateState, pIsolateState);
  }
  
  private String getServiceTypeOption(ModuleType moduleType, String typeNum)
  {
    if (typeNum == null) {
      return null;
    }
    JSONArray serviceTypes = this.schemaManager.getServiceTypes(moduleType);
    Iterator<?> iterator = serviceTypes.iterator();
    while (iterator.hasNext())
    {
      JSONObject enumeration = (JSONObject)iterator.next();
      if (typeNum.equals(enumeration.getString("value"))) {
        return enumeration.getString("options");
      }
    }
    return null;
  }
  
  private String formatTime(long mills)
  {
    return mills == 0L ? "" : CommonUtils.formatTime("yyyy-MM-dd HH:mm:ss", mills);
  }
  
  private String getElementName(String xPath)
  {
    Element element = this.configManager.selectSingleNode(xPath);
    if (element == null) {
      return null;
    }
    return element.attributeValue("name");
  }
}
