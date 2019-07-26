// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   OutServiceConfigNode.java

package tc.cama.aweb.bean;

import org.dom4j.Document;
import org.dom4j.Element;

import cn.com.agree.aweb.exception.AfaConfigException;
import net.sf.json.JSONObject;
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.SchemaManager;

// Referenced classes of package cn.com.agree.aweb.afa4j.config.xml:
//			ConfigNodeSupport, ConfigFileXPath

public class OutServiceConfigNode extends ConfigNodeSupport
{

	private int gid;
	private int mid;
	private int sid;
	private ServiceConfigNode node;

	public OutServiceConfigNode(byte contents[], int gid, int mid, int sid, String serviceType)
		throws AfaConfigException
	{
		super(contents);
		this.gid = gid;
		this.mid = mid;
		this.sid = sid;
		node = ServiceConfigNodeFactory.createOutService(contents, gid, mid, sid, serviceType);
	}

	public OutServiceConfigNode(String configStr, String serviceType)
		throws AfaConfigException
	{
		super(configStr, AfaDeviceType.OUTSERVICE);
		node = ServiceConfigNodeFactory.createOutService(configStr, serviceType);
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
		Element outServiceEle = getElementByXPath(ConfigFileXPath.outService(gid, mid, sid));
		if (outServiceEle == null)
			throw new AfaConfigException("��ȡ�����ýӳ��������Ϣ����ȷ���Ƿ��ѱ�ɾ��");
		else
			return outServiceEle;
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
		return pageJson;
	}

	public Document createDocumentFromPageJson(String rootName, JSONObject pageJson)
	{
		return node.createDocumentFromPageJson(rootName, pageJson);
	}
}
