package cn.com.agree.aweb.cluster.login;

import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletResponse;

public class AsyncHttpService extends Thread {
	
	private String requestURL;

	public AsyncHttpService(String requestURL) {
		this.requestURL = requestURL;
	}

	@Override
	public void run() {
		sendRequest(requestURL);
	}

	private static void sendRequest(String reqUrl) {
		HttpURLConnection urlConnection = null;
		try {
			URL url = new URL(reqUrl);
			urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setRequestMethod("POST");
			urlConnection.setDoInput(true);
			urlConnection.setDoOutput(false);
			urlConnection.setUseCaches(false);
			urlConnection.connect();
			int resCode = urlConnection.getResponseCode();
			if (resCode != HttpServletResponse.SC_OK) {
				
			}
		} catch (Exception e) {
			
		} finally {
			if (urlConnection != null) {
				try {
					urlConnection.disconnect();
				} catch (Exception e) {
					;
				}
			}
		}
	}
}
