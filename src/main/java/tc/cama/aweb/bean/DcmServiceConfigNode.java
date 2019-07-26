// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   DcmServiceConfigNode.java

package tc.cama.aweb.bean;

import org.dom4j.Document;
import org.dom4j.Element;

import cn.com.agree.aweb.exception.AfaConfigException;
import net.sf.json.JSONObject;
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.SchemaManager;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml:
//			ConfigNodeSupport, ConfigFileXPath

public class DcmServiceConfigNode extends ConfigNodeSupport
{

	private int gid;
	private int sid;
	private ServiceConfigNode node;

	public DcmServiceConfigNode(byte contents[], int gid, int sid, String serviceType)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.sid = sid;
		node = ServiceConfigNodeFactory.createDcmService(contents, gid, sid, serviceType);
	}

	public DcmServiceConfigNode(String configStr, String serviceType)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.DCMSERVICE);
		node = ServiceConfigNodeFactory.createDcmService(configStr, serviceType);
	}

	protected void initArea()
	{
		setBases(new String[] {
			"description", "identifier"
		});
		setCores(new String[0]);
		setGroups(new String[0]);
	}

	public Element getElement()
		throws AfaConfigException
	{
		Element dcmServiceEle = getElementByXPath(ConfigFileXPath.dcmService(gid, sid));
		if (dcmServiceEle == null)
			throw new AfaConfigException("获取不到该dcm服务的信息，请确认是否已被删除");
		else
			return dcmServiceEle;
	}

	public PageJson getPageJson(SchemaManager schema)
		throws AfaConfigException
	{
		PageJson pageJson = PageJson.allocate();
		setBaseAttribute(getElement(), pageJson, schema);
		iteratorElement(getElement(), pageJson, schema);
		node.initPageJson(schema);
		if (node.pageJson().getBase() != null)
			pageJson.getBase().putAll(node.pageJson().getBase());
		if (node.pageJson().getCore() != null)
			pageJson.getCore().putAll(node.pageJson().getCore());
		if (node.pageJson().getGroups() != null)
			pageJson.getGroups().putAll(node.pageJson().getGroups());
		if (node.pageJson().getSwitches() != null)
			pageJson.getSwitches().putAll(node.pageJson().getSwitches());
		if (node.pageJson().getLists() != null)
			pageJson.computeListsField().addAll(node.pageJson().getLists());
		if (node.pageJson().getFactorys() != null)
			pageJson.computeFactorysField().putAll(node.pageJson().getFactorys());
		if (node.pageJson().getCaches() != null)
			pageJson.computeCachesField().putAll(node.pageJson().getCaches());
		return pageJson;
	}

	public Document createDocumentFromPageJson(String rootName, JSONObject pageJson)
	{
		return node.createDocumentFromPageJson(rootName, pageJson);
	}
}
