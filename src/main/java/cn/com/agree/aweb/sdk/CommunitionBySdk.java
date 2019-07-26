package cn.com.agree.aweb.sdk;

import java.io.File;
import java.io.IOException;
import java.net.Inet4Address;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeoutException;

import org.apache.commons.lang.math.NumberUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.afa.aim.connector.AimConnetorException;
import cn.com.agree.afa.aim.connector.AimResponseMessage;
import cn.com.agree.afa.aim.connector.aim.device.AimConnector;
import cn.com.agree.afa.aim.connector.future.IFuture;
import cn.com.agree.afa.aim.connector.util.URL;
import cn.com.agree.afa.aim.connector.util.URLPersistUtils;

public class CommunitionBySdk extends AimConnectorSupport {
	private static final Logger LOGGER = LoggerFactory.getLogger(CommunitionBySdk.class);
	private Object lock = new Object();
	private boolean closed = false;

	private AimConnector aimconnector = null;

	protected AimConnector getAimconnector() throws IOException {
		if (closed) {
			throw new IOException("服务已关闭");
		}
		if (aimconnector != null && aimconnector.isActive()) {
			return aimconnector;
		}
		synchronized (lock) {
			if (aimconnector != null && aimconnector.isActive()) {
				return aimconnector;
			}
			if (aimconnector != null) {
				aimconnector.destroy();
			}
			File file = new File(".sdk");
			if (!file.exists()) {
				file.createNewFile();
			}
			System.setProperty("sdk.prop.file", file.getAbsolutePath());
			URLPersistUtils.clear();
			try {
				String agentName = getAgentName();
				if (agentName == null || agentName.isEmpty()) {
					agentName = getAgentType() + "_" + Inet4Address.getLocalHost().getHostAddress();
				}
				LOGGER.info("SDK连接: urls={}", getUrls());
				aimconnector = new AimConnector(urls(), agentName, getRegisterMc(), getRegisterTc(), new JSONObject(),
						getIoThreads(), new AwebProtocolListener());
				LOGGER.info("SDK连接成功: agentName={}, urls={}", agentName, getUrls());
			} catch (AimConnetorException e) {
				throw new IOException(e);
			}
			lock.notifyAll();
		}
		return aimconnector;
	}

	private List<URL> urls() {
		String[] urls = StringUtils.split(getUrls(), ",");
		List<URL> list = new ArrayList<URL>();
		if (urls != null) {
			for (String url : urls) {
				String[] addr = StringUtils.split(url, ":");
				if (addr.length != 2) {
					LOGGER.error("错误的连接：{}", url);
					continue;
				}
				URL aurl = new URL(addr[0].trim(), NumberUtils.toInt(addr[1].trim()));
				list.add(aurl);
			}
		}
		return list;
	}

	/**
	 * asyncControlBySdk：同步control请求
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return JSONObject
	 * @throws Exception
	 */
	public AimResponseMessage asyncControlBySdk(String mc, String tc, byte mode, JSONObject data, String to,
			int timeoutMillis) throws IOException, TimeoutException {
		return getAimconnector().control(mc, tc, mode, to, data, timeoutMillis);
	}

	/**
	 * asyncControlToAfa:同步Control请求AFA4J平台
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return JSONObject
	 * @throws Exception
	 */
	public JSONObject asyncControlToAfa(String mc, String tc, JSONObject data, int timeoutMillis)
			throws IOException, TimeoutException {
		AimResponseMessage rspMsg = asyncControlBySdk(mc, tc, (byte) 2, data, getDefaultTo(), timeoutMillis);
		return rspMsg.getData();
	}

	/**
	 * 同步request请求
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return JSONObject
	 * @throws Exception
	 */
	public AimResponseMessage asyncRequestBySdk(String mc, String tc, byte mode, JSONObject data, String to,
			int timeoutMillis) throws IOException, TimeoutException {
		return getAimconnector().request(mc, tc, mode, to, data, timeoutMillis);
	}

	/**
	 * asyncRequestToAfa:同步request请求AFA4J
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param data
	 *            请求json参数：请求参数
	 * @return JSONObject
	 * @throws Exception
	 */
	public JSONObject asyncRequestToAfa(String mc, String tc, JSONObject data) throws IOException, TimeoutException {
		AimResponseMessage rspMsg = asyncRequestBySdk(mc, tc, (byte) 2, data, getDefaultTo(), getTimeoutMills());
		return rspMsg.getData();
	}

	/**
	 * asyncRequestToAfa:同步request请求AFA4J
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param data
	 *            请求json参数：请求参数
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return JSONObject
	 * @throws Exception
	 */
	public JSONObject asyncRequestToAfa(String mc, String tc, JSONObject data, int timeoutMillis)
			throws IOException, TimeoutException {
		AimResponseMessage rspMsg = asyncRequestBySdk(mc, tc, (byte) 2, data, getDefaultTo(), timeoutMillis);
		return rspMsg.getData();
	}

	/**
	 * @asyncRequestToAgent:同步请求agent
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @return JSONObject
	 * @throws Exception
	 */
	public JSONObject asyncRequestToAgent(String mc, String tc, JSONObject data, String to)
			throws IOException, TimeoutException {
		AimResponseMessage rspMsg = asyncRequestBySdk(mc, tc, (byte) 2, data, to, getTimeoutMills());
		return rspMsg.getData();
	}

	/**
	 * @asyncRequestToAgent:同步请求agent
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return JSONObject
	 * @throws Exception
	 */
	public JSONObject asyncRequestToAgent(String mc, String tc, JSONObject data, String to, int timeoutMillis)
			throws IOException, TimeoutException {
		AimResponseMessage rspMsg = asyncRequestBySdk(mc, tc, (byte) 2, data, to, timeoutMillis);
		return rspMsg.getData();
	}

	/**
	 * controlBySdk：异步control请求
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture controlBySdk(String mc, String tc, byte mode, JSONObject data, String to, int timeoutMillis)
			throws IOException {
		return getAimconnector().control(mc, tc, mode, data, to, timeoutMillis);
	}

	/**
	 * controlToAfa:异步Control请求至AFA4J平台
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture controlToAfa(String mc, String tc, JSONObject data, int timeoutMillis) throws IOException {
		return controlBySdk(mc, tc, (byte) 2, data, getDefaultTo(), timeoutMillis);
	}

	/**
	 * controlToAgent:异步Control请求agent
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture controlToAgent(String mc, String tc, JSONObject data, String to, int timeoutMillis)
			throws IOException {
		return controlBySdk(mc, tc, (byte) 2, data, to, timeoutMillis);
	}

	/**
	 * reportBySdk：report请求
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return JSONObject
	 * @throws Exception
	 */
	public void reportBySdk(String mc, String tc, byte mode, JSONObject data, String to) throws IOException {
		getAimconnector().report(mc, tc, mode, data, to);
	}

	/**
	 * reportToAfa:同步report请求AFA4J
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param data
	 *            请求json参数：请求参数
	 * @return 平台数据
	 * @throws Exception
	 */
	public void reportToAfa(String mc, String tc, JSONObject data) throws IOException {
		reportBySdk(mc, tc, (byte) 2, data, getDefaultTo());
	}

	/**
	 * requestBySdk：异步request请求
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture requestBySdk(String mc, String tc, byte mode, JSONObject data, String to, int timeoutMillis)
			throws IOException {
		return getAimconnector().request(mc, tc, mode, data, to, getTimeoutMills());
	}

	/**
	 * requestToAfa:异步request请求AFA4J
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture requestToAfa(String mc, String tc, JSONObject data) throws IOException {
		return requestBySdk(mc, tc, (byte) 2, data, getDefaultTo(), getTimeoutMills());
	}

	/**
	 * requestToAfa:异步request请求AFA4J
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture requestToAfa(String mc, String tc, JSONObject data, int timeoutMillis) throws IOException {
		return requestBySdk(mc, tc, (byte) 2, data, getDefaultTo(), timeoutMillis);
	}

	/**
	 * @requestToAgent:异步请求agent
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture requestToAgent(String mc, String tc, JSONObject data, String to) throws IOException {
		return requestBySdk(mc, tc, (byte) 2, data, to, getTimeoutMills());
	}

	/**
	 * @requestToAgent:异步请求agent
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return IFuture
	 * @throws Exception
	 */
	public IFuture requestToAgent(String mc, String tc, JSONObject data, String to, int timeoutMillis)
			throws IOException {
		return requestBySdk(mc, tc, (byte) 2, data, to, timeoutMillis);
	}

	/**
	 * sysncControlToAgent:同步Control请求agent
	 * 
	 * @param mc
	 *            请求mc：服务代码
	 * @param tc
	 *            请求tc：交易代码
	 * @param mode
	 *            模式：预留字段
	 * @param data
	 *            请求json参数：请求参数
	 * @param to
	 *            目标设备
	 * @param timeoutMillis
	 *            超时时间，单位毫秒，默认20秒
	 * @return JSONObject
	 * @throws Exception
	 */
	public JSONObject sysncControlToAgent(String mc, String tc, JSONObject data, String to, int timeoutMillis)
			throws IOException, TimeoutException {
		AimResponseMessage rspMsg = asyncControlBySdk(mc, tc, (byte) 2, data, to, timeoutMillis);
		return rspMsg.getData();
	}

	/**
	 * 注销链接
	 * 
	 * @param mc
	 *            mc:注销MC
	 * @param tc
	 *            tc:注销TC
	 * @param data
	 *            请求json参数：请求参数
	 * @throws Exception
	 */
	public void unregister(String mc, String tc, JSONObject data) throws IOException {
		getAimconnector().unregister(mc, tc, data);
	}

	public void destroy() {
		try {
			closed = true;
			if (aimconnector != null && aimconnector.isActive()) {
				LOGGER.info("注销SDK连接");
				aimconnector.unregister(getUnregisterMc(), getUnregisterTc(), new JSONObject());
			}
			aimconnector = null;
		} catch (IOException e) {
			LOGGER.info(e.getMessage(), e);
		}
	}

}
