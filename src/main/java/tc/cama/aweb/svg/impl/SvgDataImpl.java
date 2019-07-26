package tc.cama.aweb.svg.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.bank.cama.cmdb.model.table.network.CmdbNetworkFlow;
import tc.bank.cama.cmdb.model.view.CmdbIpRelatedAppAndServer;
import tc.bank.cama.cmdb.service.CmdbServiceFactory;
import tc.bank.cama.cmdb.service.LogicalServerQuery;
import tc.bank.cama.cmdb.service.NetworkFlowQuery;
import tc.bank.cama.cmdb.service.ObjectQuery;
import tc.bank.cama.cmdb.service.SoftwareQuery;
import tc.bank.cama.core.service.alert.IHealthDegreeService;
import tc.cama.aweb.bean.AppConfigBean;
import tc.cama.aweb.bean.AppConfigSoftwareFrame;
import tc.cama.aweb.svg.ISVGData;
import tc.cama.aweb.svg.data.CategoryData;
import tc.cama.aweb.svg.data.EdgeData;
import tc.cama.aweb.svg.data.GraphData;
import tc.cama.aweb.svg.data.NodeData;
import tc.cama.aweb.svg.data.ShapeData;
import tc.cama.aweb.svg.tmpl.GraphType;
import tc.cama.aweb.svg.tmpl.TemplateFactory;

public class SvgDataImpl implements ISVGData {

	private CmdbServiceFactory cmdbServiceFactory;
	private IHealthDegreeService healthDegreeService;

	public IHealthDegreeService getHealthDegreeService() {
		return healthDegreeService;
	}

	public void setHealthDegreeService(IHealthDegreeService healthDegreeService) {
		this.healthDegreeService = healthDegreeService;
	}

	public CmdbServiceFactory getCmdbServiceFactory() {
		return cmdbServiceFactory;
	}

	public void setCmdbServiceFactory(CmdbServiceFactory cmdbServiceFactory) {
		this.cmdbServiceFactory = cmdbServiceFactory;
	}

	public String getSvgGraph(Long appId) throws Exception {

		String fn = TemplateFactory.getInstance().generate(GraphType.E.name(), getSvgGraphData(appId));
		System.out.println(fn);
		return fn;
	}

	/**
	 * 获取ip所在逻辑服务器的软件架构
	 * @param ip
	 * @return
	 */
	public AppConfigSoftwareFrame getSoftFrameByIp(String ip) throws Exception {
		LogicalServerQuery logicQuery = cmdbServiceFactory.getService(LogicalServerQuery.class);
		SoftwareQuery softQuery = cmdbServiceFactory.getService(SoftwareQuery.class);
		ObjectQuery objectQuery = cmdbServiceFactory.getService(ObjectQuery.class);
		AppConfigSoftwareFrame softwareFrame = new AppConfigSoftwareFrame();
		CmdbLogicalServer server = logicQuery.getIPRelatedServers(ip);
		if (server != null) {
			List<Object> softWares = softQuery.getServerRelatedSoftwares(server.getObjectId());
			List<String> cate2 = new ArrayList<String>();
			List<String> cate3 = new ArrayList<String>();

			List<AppConfigBean> objectSummarys = new ArrayList<AppConfigBean>();
			AppConfigBean root = new AppConfigBean();

			root.setName(server.getServerName());
			root.setPath("root");
			root.setType("0");
			root.setObjectId(server.getObjectId());
			int helRate1 = healthDegreeService.healthInspectByObjId(server.getObjectId());
			root.setHelRate(helRate1);
			objectSummarys.add(root);
			for (Object obj : softWares) {
				JSONObject json = (JSONObject) ConvertUtils.convert(obj, JSONObject.class);
				Object object = objectQuery.getObjectDetail(json.getLong("objectId"));
				if (object != null) {
					JSONObject json1 = (JSONObject) ConvertUtils.convert(object, JSONObject.class);
					AppConfigBean tempBean2 = new AppConfigBean();
					tempBean2.setType("1");
					tempBean2.setName(json1.getString("l2CateName"));
					tempBean2.setObjectId(json1.getLong("categoryId"));
					tempBean2.setParentPath("root");
					tempBean2.setPath("root/" + json1.getString("l2CateName"));

					AppConfigBean tempBean3 = new AppConfigBean();
					tempBean3.setType("2");
					tempBean3.setName(json1.getString("l3CateName"));
					tempBean3.setObjectId(json1.getLong("categoryId"));
					tempBean3.setParentPath("root/" + json1.getString("l2CateName"));
					tempBean3.setPath("root/" + json1.getString("l2CateName") + "/" + json1.getString("l3CateName"));

					AppConfigBean tempBean4 = new AppConfigBean();
					if (json1.getString("softwareName") != null) {
						tempBean4.setName(json1.getString("softwareName"));
					} else if (json1.getString("dbName") != null) {
						tempBean4.setName(json1.getString("dbName"));
					}
					tempBean4.setType("3");
					tempBean4.setObjectId(json1.getLong("objectId"));
					tempBean4.setParentPath(
							"root/" + json1.getString("l2CateName") + "/" + json1.getString("l3CateName"));
					tempBean4.setPath("root/" + json1.getString("l2CateName") + "/" + json1.getString("l3CateName")
							+ "/" + json1.getString("softwareName"));
					int helRate = healthDegreeService.healthInspectByObjId(json1.getLong("objectId"));
					tempBean4.setHelRate(helRate);

					if (!objectSummarys.contains(tempBean2) && (!cate2.contains(tempBean2.getName()))) {
						objectSummarys.add(tempBean2);

						cate2.add(tempBean2.getName());
					}
					if (!objectSummarys.contains(tempBean3) && (!cate3.contains(tempBean3.getName()))) {
						objectSummarys.add(tempBean3);
						cate3.add(tempBean3.getName());
					}
					if (!objectSummarys.contains(tempBean4)) {
						objectSummarys.add(tempBean4);
					}
				}
			}
			softwareFrame.setSoftwareFrame(objectSummarys);
		}
		return softwareFrame;
	}

	@SuppressWarnings("rawtypes")
	public GraphData getSvgGraphData(Long appId) throws Exception {

		NetworkFlowQuery nf = cmdbServiceFactory.getService(NetworkFlowQuery.class);
		// 获取本应用系统的系统名称
		ObjectQuery objectQuery = cmdbServiceFactory.getService(ObjectQuery.class);
		JSONObject application = (JSONObject) objectQuery.getObjectDetail(appId);
		String localAppName = (String) application.get("appName");

		GraphData graphData = new GraphData();
		Map<String, NodeData> qjNodes = new HashMap<String, NodeData>();

		List<NodeData> datas = new ArrayList<NodeData>();
		List<CategoryData> lCategory = new ArrayList<CategoryData>();
		List<CategoryData> rCategory = new ArrayList<CategoryData>();
		List<CategoryData> mCategory = new ArrayList<CategoryData>();

		/** 查询基础网络配置表 */
		List<CmdbNetworkFlow> flows = nf.getApplicationNetworkFlow(appId);
		
		Set<String> ipAddrs = new HashSet<String>();
		Set<String> leftString = new HashSet<String>();
		Set<String> rightString = new HashSet<String>();

		// 获取右侧节点集合
		List<String> rNode = new ArrayList<String>();
		// 组织ip列表
		if (flows != null) {
			for (CmdbNetworkFlow networkFlow : flows) {
				ipAddrs.add(networkFlow.getLocalIp());
				leftString.add(networkFlow.getLocalIp());
				ipAddrs.add(networkFlow.getRemoteIp());
				rightString.add(networkFlow.getRemoteIp());
			}
		}

		/** 查询ip所对应的应用信息 */
		Map<String, CmdbIpRelatedAppAndServer> server = nf.getIpRelatedAppsAndServers(ipAddrs);
		Set<String> redRemoteIP = new HashSet<String>(); // 红色接入节点集合记录

		Set<String> orangeRemoteIP = new HashSet<String>(); // 橙色接入节点集合记录

		// rightNode存放只在右侧的接出节点
		List<String> rightNode = new ArrayList<String>();
		rightNode.addAll(rightString);
		rightNode.removeAll(leftString);

		for (String rn : rightNode) {
			// 算出右侧节点的应用健康度
			Long appIs = server.get(rn).getAppIds().get(0);
		//	int appHealth = healthDegreeService.healthInspectByObjId(appIs);
			
			List<Integer> ipHealList=new ArrayList<Integer>();
			AppConfigSoftwareFrame appConfigSoftwareFrame=getSoftFrameByIp(rn);
			List<AppConfigBean> appConfigBeanList=appConfigSoftwareFrame.getSoftwareFrame();
			for(AppConfigBean appConfigBean:appConfigBeanList){
				ipHealList.add(appConfigBean.getHelRate());
			}
			for(Integer ipHeal:ipHealList){
				// 根据ip上关联的应用软件，服务器，中间件，数据库的健康度集合，进行颜色标识
				if (ipHeal >= 0 && ipHeal <= 30) {
					redRemoteIP.add(rn);
				} else if (ipHeal > 30 && ipHeal <= 70) {
					orangeRemoteIP.add(rn);
				}
			}
			
			
			
//			// 根据应用系统健康度，进行颜色标识
//			if (appHealth >= 0 && appHealth <= 30) {
//				redRemoteIP.add(rn);
//			} else if (appHealth > 30 && appHealth <= 70) {
//				orangeRemoteIP.add(rn);
//			}
		}

		// 非最右侧节点集
		List<String> LAMNode = new ArrayList<String>();
		LAMNode.addAll(ipAddrs);
		LAMNode.removeAll(rightNode);

		for (String lam : LAMNode) {
//			int appHealth = 100;
//			// 算出右侧节点的应用健康度
//			if (server.get(lam).getAppIds().contains(appId)) {
//				appHealth = healthDegreeService.healthInspectByObjId(appId);
//			} else {
//				Long appIs = server.get(lam).getAppIds().get(0);
//				appHealth = healthDegreeService.healthInspectByObjId(appIs);
//			}
//			// 根据应用系统健康度，进行颜色标识
//			if (appHealth >= 0 && appHealth <= 30) {
//				redRemoteIP.add(lam);
//			} else if (appHealth > 30 && appHealth <= 70) {
//				orangeRemoteIP.add(lam);
//			}
			
			List<Integer> ipHealList=new ArrayList<Integer>();
			AppConfigSoftwareFrame appConfigSoftwareFrame=getSoftFrameByIp(lam);
			List<AppConfigBean> appConfigBeanList=appConfigSoftwareFrame.getSoftwareFrame();
			for(AppConfigBean appConfigBean:appConfigBeanList){
				ipHealList.add(appConfigBean.getHelRate());
			}
			for(Integer ipHeal:ipHealList){
				// 根据ip上关联的应用软件，服务器，中间件，数据库的健康度集合，进行颜色标识
				if (ipHeal >= 0 && ipHeal <= 30) {
					redRemoteIP.add(lam);
				} else if (ipHeal > 30 && ipHeal <= 70) {
					orangeRemoteIP.add(lam);
				}
			}
			
		}

		// 添加左边节点
		if (flows != null) {
			for (CmdbNetworkFlow flow : flows) {
				String localIP = flow.getLocalIp();
				String remoteIP = flow.getRemoteIp();
				String port = flow.getRemotePort() + "";
				rNode.add(remoteIP);
				String appname = "";
				Long applicationId = new Long("0");

				if (qjNodes.containsKey(localIP)) {
					if (server.get(remoteIP).getAppIds().contains(appId)) {
						appname = localAppName;
					} else {
						appname = server.get(remoteIP).getAppNames().get(0);
					}

					// 如果已经存放过，则说明需要补充对接节点的剩余名称和线上的端口
					if (redRemoteIP.contains(remoteIP)) // 如果目标节点是红色的，就将接入线变为红色
						qjNodes.get(localIP).getEdge()
								.add(new EdgeData(remoteIP.replaceAll("\\.", ""), port, new ShapeData("", "red", "")));
					else if (orangeRemoteIP.contains(remoteIP)) // 如果目标节点是橙色的，就将接入线变为橙色
						qjNodes.get(localIP).getEdge().add(
								new EdgeData(remoteIP.replaceAll("\\.", ""), port, new ShapeData("", "orange", "")));
					else
						qjNodes.get(localIP).getEdge()
								.add(new EdgeData(remoteIP.replaceAll("\\.", ""), port, new ShapeData("", "", "")));
				} else {
					// 新建一个节点，并且加入第一个下一节点
					// String appname=server.get(localIP).getAppNames().get(0);
					if (server.get(localIP).getAppIds().contains(appId)) {
						appname = localAppName;
						applicationId = appId;
					} else {
						appname = server.get(localIP).getAppNames().get(0);
						applicationId = server.get(localIP).getAppIds().get(0);
					}

					// 根据应用系统健康度，进行颜色标识
					String color = "";
					if (redRemoteIP.contains(localIP)) {
						color = "red";
					} else if (orangeRemoteIP.contains(localIP)) {
						color = "orange";
					}

					NodeData node = new NodeData(appname, localIP.replaceAll("\\.", ""), localIP,
							new ArrayList<EdgeData>(), new ShapeData("", color, ""), localIP + "_" + applicationId);

					if (redRemoteIP.contains(remoteIP)) // 如果目标节点是红色的，就将接入线变为红色
						node.getEdge()
								.add(new EdgeData(remoteIP.replaceAll("\\.", ""), port, new ShapeData("", "red", "")));
					else if (orangeRemoteIP.contains(remoteIP)) // 如果目标节点是橙色的，就将接入线变为橙色
						node.getEdge().add(
								new EdgeData(remoteIP.replaceAll("\\.", ""), port, new ShapeData("", "orange", "")));
					else
						node.getEdge()
								.add(new EdgeData(remoteIP.replaceAll("\\.", ""), port, new ShapeData("", "", "")));

					qjNodes.put(localIP, node);

					// 计算层级顺序
					if (!rightString.contains(localIP)) {
						// 说明层级只在左侧存在
						lCategory.add(new CategoryData(appname, appname));
					} else {
						// 说明层级在两边都存在
						mCategory.add(new CategoryData(appname, appname));
					}
				}
			}
		}

		/** 开始处理右侧节点 */
		for (int m = 0; m < rNode.size(); m++) {
			String lable = rNode.get(m);
			if (!qjNodes.containsKey(lable)) {
				if (server.get(lable) != null) {
					String appname = server.get(lable).getAppNames().get(0);
					String color = "";
					String applicationId = server.get(lable).getAppIds().get(0) + "";
					if (orangeRemoteIP.contains(lable)) {
						color = "orange";
					} else if (redRemoteIP.contains(lable))
						color = "red";
					NodeData node = new NodeData(appname, lable.replaceAll("\\.", ""), lable, new ArrayList<EdgeData>(),
							new ShapeData("", color, ""), lable + "_" + applicationId);
					qjNodes.put(lable, node);
					// 说明属于右边层级
					rCategory.add(new CategoryData(appname, appname));
				}

			}
		}

		// 把全局的节点Map转变为最终的结果LIst
		Iterator iterator = qjNodes.entrySet().iterator();
		while (iterator.hasNext()) {
			Map.Entry entry = (Entry) iterator.next();
			datas.add((NodeData) entry.getValue());
		}

		// 设置svg图的名称、node节点
		graphData.setName("网络拓扑图");
		graphData.setNode(datas);

		// 组合前中后层级数据
		lCategory.addAll(mCategory);
		lCategory.addAll(rCategory);
		// 去重层级相同的应用名称
		List<CategoryData> Categorys = new ArrayList<CategoryData>();
		String qj = "";
		for (CategoryData data : lCategory) {
			String name = data.getName();
			if (!qj.contains(name)) {
				Categorys.add(data);
				qj = qj + name + ",";
			}
		}
		// 设置svg图的层级
		graphData.setCategory(Categorys);
		return graphData;

	}

	@Override
	public Map<String, CmdbIpRelatedAppAndServer> getIpRelatedAppsAndServers(String ipAddr) throws Exception {
		Set<String> ipAddrs = new HashSet<String>();
		ipAddrs.add(ipAddr);
		NetworkFlowQuery nf = cmdbServiceFactory.getService(NetworkFlowQuery.class);
		Map<String, CmdbIpRelatedAppAndServer> server = nf.getIpRelatedAppsAndServers(ipAddrs);
		if (server == null)
			server = new HashMap<String, CmdbIpRelatedAppAndServer>();
		return server;
	}

}
