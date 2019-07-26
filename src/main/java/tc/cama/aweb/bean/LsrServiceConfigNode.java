package tc.cama.aweb.bean;

import org.dom4j.Document;
import org.dom4j.Element;

import cn.com.agree.aweb.exception.AfaConfigException;
import cn.com.agree.aweb.util.AfaCommonUtil;
import cn.com.agree.aweb.util.ConfigFileXPath;
import cn.com.agree.aweb.util.DcmCacheConfigUtil;
import net.sf.json.JSONObject;
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.SchemaManager;

public class LsrServiceConfigNode
  extends ConfigNodeSupport
{
  private int gid;
  private int mid;
  private int sid;
  private ServiceConfigNode node;
  
  
  public LsrServiceConfigNode(byte[] contents, int gid, int mid, int sid, String serviceType)
    throws AfaConfigException
  {
    super(contents);
    this.gid = gid;
    this.mid = mid;
    this.sid = sid;
    this.node = ServiceConfigNodeFactory.createLsrService(contents, gid, mid, sid, serviceType);
  }
  public LsrServiceConfigNode(String configStr, String serviceType)
    throws AfaConfigException
  {
    super(configStr, AfaDeviceType.LSRSERVICE);
    this.node = ServiceConfigNodeFactory.createLsrService(configStr, serviceType);
  }
  
  protected void initArea()
  {
    setBases(new String[] {
      "description", "identifier", "isolation", "defaultMC", "defaultTC", "packetType" });
    
    setCores(new String[0]);
    
    setGroups(new String[0]);
  }
  
  public Element getElement()
    throws AfaConfigException
  {
    Element lsrServiceEle = getElementByXPath(ConfigFileXPath.lsrService(this.gid, this.mid, this.sid));
    if (lsrServiceEle == null) {
      throw new AfaConfigException("��������������������������������������������");
    }
    return lsrServiceEle;
  }
  
  public PageJson getPageJson(SchemaManager schema)
    throws AfaConfigException
  {
    PageJson pageJson = PageJson.allocate();
    setBaseAttribute(getElement(), pageJson, schema);
    iteratorElement(getElement(), pageJson, schema);
    
    this.node.initPageJson(schema);
    if (this.node.pageJson().getBase() != null) {
      pageJson.getBase().putAll(this.node.pageJson().getBase());
    }
    if (this.node.pageJson().getCore() != null) {
      pageJson.getCore().putAll(this.node.pageJson().getCore());
    }
    if (this.node.pageJson().getGroups() != null) {
      pageJson.getGroups().putAll(this.node.pageJson().getGroups());
    }
    if (this.node.pageJson().getSwitches() != null) {
      pageJson.getSwitches().putAll(this.node.pageJson().getSwitches());
    }
    if (this.node.pageJson().getCodec() != null) {
      pageJson.computeCodecField().putAll(this.node.pageJson().getCodec());
    }
    if (this.node.pageJson().getTasks() != null) {
      pageJson.computeTasksField().addAll(this.node.pageJson().getTasks());
    }
    if (this.node.pageJson().getLists() != null) {
      pageJson.computeListsField().addAll(this.node.pageJson().getLists());
    }
    return pageJson;
  }
  
  public Document createDocumentFromPageJson(String rootName, JSONObject pageJson)
  {
    Document serviceDom = this.node.createDocumentFromPageJson(rootName, pageJson);
    
    Element serviceEle = DcmCacheConfigUtil.selectSingleNode(serviceDom, ".//ns:service");
    AfaCommonUtil.adjustTagPosition(this.node.getServiceType(), serviceEle);
    return serviceDom;
  }
}
