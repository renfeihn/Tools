package cn.com.agree.aweb.websocket;

import java.io.IOException;

import javax.websocket.CloseReason;
import javax.websocket.CloseReason.CloseCodes;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;

@ServerEndpoint("/websocket/{username}")
public class WebSocketEndPoint {

	private Logger logger = Logger.getLogger(WebSocketEndPoint.class);

	@OnOpen
	public void onOpen(Session session, EndpointConfig config,
			@PathParam("username") String username ) {
		
		CloseReason reason = null;
		if(WebSocketClientPool.getCurrentClientsCount() >= WebSocketClientPool.MAX_CLIENTS){
			reason = new CloseReason(CloseCodes.CANNOT_ACCEPT,
					"客户端连接已满，请稍后再试");
		}else if (username == null || username.trim().equals("")) {
			reason = new CloseReason(CloseCodes.CANNOT_ACCEPT,
					"用户名不能为空值");
		} else if (WebSocketClientPool.isConnected(username)) {
			reason = new CloseReason(CloseCodes.CANNOT_ACCEPT,
					"该用户名客户端已存在");
		}
		
		if(reason == null){
			WebSocketClientPool.putClient(new WSClient(username,session));
			logger.info(username + "is added");
		}else{
			try {
				session.close(reason);
			} catch (IOException e) {
				logger.error(e);
			}
		}

	}

	@OnMessage
	public void onMessage(String message, Session session) {
		// 处理客户端发过来的信息
	}
	
	@OnClose
	public void onClose(Session session, CloseReason reason){
		WebSocketClientPool.reomveClient(session);
	}
	
	@OnError
	public void onError(Session session, Throwable error){
		CloseReason reason = new CloseReason(CloseCodes.CLOSED_ABNORMALLY, error.getMessage());
		try {
			session.close(reason);
		} catch (IOException e) {
			logger.error(e);
		}
		
	}
}
