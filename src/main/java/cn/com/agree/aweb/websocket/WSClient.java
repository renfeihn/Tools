package cn.com.agree.aweb.websocket;

import javax.websocket.Session;

public class WSClient {
	private String username;
	private Session session;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Session getSession() {
		return session;
	}
	public void setSession(Session session) {
		this.session = session;
	}
	public WSClient(String username, Session session) {
		this.username = username;
		this.session = session;
	}
	public WSClient() {
	}
	
}
