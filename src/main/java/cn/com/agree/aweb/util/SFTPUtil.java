package cn.com.agree.aweb.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Properties;
import java.util.Vector;

//import org.apache.poi.util.IOUtils;
import org.apache.commons.compress.utils.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

public class SFTPUtil {

	private transient Logger log = LoggerFactory.getLogger(this.getClass());
	
    private ChannelSftp sftp;  
        
    private Session session;  
    /** FTP 登录用户名*/    
    private String username;  
    /** FTP 登录密码*/    
    private String password;  
    /** 私钥 */    
    private String privateKey;  
    /** FTP 服务器地址IP地址*/    
    private String host;  
    /** FTP 端口*/  
    private int port;  
        
    
    /**  
     * 构造基于密码认证的sftp对象  
     * @param username
     * @param password  
     * @param host  
     * @param port  
     */    
    public SFTPUtil(String username, String password, String host, int port) {  
        this.username = username;  
        this.password = password;  
        this.host = host;  
        this.port = port;  
    }  
    
    /**  
     * 构造基于秘钥认证的sftp对象 
     * @param username
     * @param host 
     * @param port 
     * @param privateKey 
     */  
    public SFTPUtil(String username, String host, int port, String privateKey) {  
        this.username = username;  
        this.host = host;  
        this.port = port;  
        this.privateKey = privateKey;  
    }  
    
    public SFTPUtil(){}  
    
    /** 
     * 连接sftp服务器 
     * 
     * @throws Exception  
     */  
    public void login(){  
        try {  
            JSch jsch = new JSch();  
            if (privateKey != null) {  
                jsch.addIdentity(privateKey);// 设置私钥  
                log.info("sftp connect,path of private key file：{}" , privateKey);  
            }  
            log.info("sftp connect by host:{} username:{}",host,username);  
    
            session = jsch.getSession(username, host, port);  
            log.info("Session is build");  
            if (password != null) {  
                session.setPassword(password);    
            }  
            Properties config = new Properties();  
            config.put("StrictHostKeyChecking", "no");  
                
            session.setConfig(config);  
            session.connect();  
            log.info("Session is connected");  
              
            Channel channel = session.openChannel("sftp");  
            channel.connect();  
            log.info("channel is connected");  
    
            sftp = (ChannelSftp) channel;  
            log.info(String.format("sftp server host:[%s] port:[%s] is connect successfull", host, port));  
        } catch (JSchException e) {  
            log.error("Cannot connect to specified sftp server : {}:{} \n Exception message is: {}", new Object[]{host, port, e.getMessage()});    
        }  
    }    
    
    /** 
     * 关闭连接 server  
     */  
    public void logout(){  
        if (sftp != null) {  
            if (sftp.isConnected()) {  
                sftp.disconnect();  
                log.info("sftp is closed already");  
            }  
        }  
        if (session != null) {  
            if (session.isConnected()) {  
                session.disconnect();  
                log.info("sshSession is closed already");  
            }  
        }  
    }  
    
    /**  
     * 将输入流的数据上传到sftp作为文件  
     *   
     * @param directory  
     *            上传到该目录  
     * @param sftpFileName  
     *            sftp端文件名  
     * @param input
     *            输入流  
     * @throws SftpException   
     * @throws Exception  
     */    
    public void upload(String directory, String sftpFileName, InputStream input) throws SftpException{  
        try {    
            sftp.cd(directory);  
        } catch (SftpException e) {  
            log.warn("directory is not exist");  
            sftp.mkdir(directory);  
            sftp.cd(directory);  
        }  
        sftp.put(input, sftpFileName);  
        log.info("file:{} is upload successful" , sftpFileName);  
    }  
    
    /**  
     * 上传单个文件 
     * 
     * @param directory  
     *            上传到sftp目录  
     * @param uploadFile 
     *            要上传的文件,包括路径  
     * @throws FileNotFoundException 
     * @throws SftpException 
     * @throws Exception 
     */  
    public void upload(String directory, String uploadFile) throws FileNotFoundException, SftpException{  
        File file = new File(uploadFile);  
        upload(directory, file.getName(), new FileInputStream(file));  
    }  
    
    /** 
     * 将byte[]上传到sftp，作为文件。注意:从String生成byte[]是，要指定字符集。 
     *  
     * @param directory 
     *            上传到sftp目录 
     * @param sftpFileName 
     *            文件在sftp端的命名 
     * @param byteArr 
     *            要上传的字节数组 
     * @throws SftpException 
     * @throws Exception 
     */  
    public void upload(String directory, String sftpFileName, byte[] byteArr) throws SftpException{  
        upload(directory, sftpFileName, new ByteArrayInputStream(byteArr));  
    }  
    
    /**  
     * 将字符串按照指定的字符编码上传到sftp 
     *   
     * @param directory 
     *            上传到sftp目录 
     * @param sftpFileName 
     *            文件在sftp端的命名 
     * @param dataStr 
     *            待上传的数据 
     * @param charsetName 
     *            sftp上的文件，按该字符编码保存 
     * @throws UnsupportedEncodingException 
     * @throws SftpException 
     * @throws Exception 
     */  
    public void upload(String directory, String sftpFileName, String dataStr, String charsetName) throws UnsupportedEncodingException, SftpException{    
        upload(directory, sftpFileName, new ByteArrayInputStream(dataStr.getBytes(charsetName)));    
    }  
    
    /** 
     * 下载文件  
     * 
     * @param directory 
     *            下载目录  
     * @param downloadFile 
     *            下载的文件 
     * @param saveFile 
     *            存在本地的路径 
     * @throws SftpException 
     * @throws FileNotFoundException 
     * @throws Exception 
     */    
    public void download(String directory, String downloadFile, String saveFile) throws SftpException, FileNotFoundException{  
        if (directory != null && !"".equals(directory)) {  
            sftp.cd(directory);  
        }  
        File file = new File(saveFile);  
        sftp.get(downloadFile, new FileOutputStream(file));  
        log.info("file:{} is download successful" , downloadFile);  
    }  
    /**  
     * 下载文件 
     * @param directory 下载目录 
     * @param downloadFile 下载的文件名 
     * @return 字节数组 
     * @throws SftpException 
     * @throws IOException 
     * @throws Exception 
     */  
    public byte[] download(String directory, String downloadFile) throws SftpException, IOException{  
        if (directory != null && !"".equals(directory)) {  
            sftp.cd(directory);  
        }  
        InputStream is = sftp.get(downloadFile);  
          
        byte[] fileData = IOUtils.toByteArray(is);
          
        log.info("file:{} is download successful" , downloadFile);  
        return fileData;  
    }  
    
    /** 
     * 删除文件 
     *   
     * @param directory 
     *            要删除文件所在目录 
     * @param deleteFile 
     *            要删除的文件 
     * @throws SftpException 
     * @throws Exception 
     */  
    public void delete(String directory, String deleteFile) throws SftpException{  
        sftp.cd(directory);  
        sftp.rm(deleteFile);  
    }  
    
    /** 
     * 列出目录下的文件 
     *  
     * @param directory 
     *            要列出的目录 
     * @return
     * @throws SftpException 
     */  
    public Vector<?> listFiles(String directory) throws SftpException {  
        return sftp.ls(directory);  
    }  
      
    public static void main(String[] args) throws SftpException, IOException {  
        SFTPUtil sftp = new SFTPUtil("aim", "aim", "10.9.3.253", 22);  
        sftp.login();  
        File file = new File("/Users/yangkuanjun/Downloads/q.txt");  
        InputStream is = new FileInputStream(file);  
        sftp.upload("/home/aim/manualUpDir", "w.txt", is);  
        sftp.logout();  
    }  
    public static String sftpDownload(String host, int port, String username,
			String passwd, String localSavedPath, String localSavedFileName,
			String remoteFilePath, String remoteFileName) {
		File localPath = new File(localSavedPath);
		if (!localPath.exists()) {
			localPath.mkdirs();
		}
		
		Session session = null;
		Channel channel = null;
		JSch jsch = new JSch();
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		try {
			if (port <= 0) {
				session = jsch.getSession(username, host);
			} else {
				session = jsch.getSession(username, host, port);
			}
       
			if (session == null) {
				return "Can not connect to " + host + ":" + port;
			}

			session.setPassword(passwd);
			// hints for first-time logging, options are:(ask | yes | no)
			session.setConfig("StrictHostKeyChecking", "no");
			session.connect(5000);
			
			channel = (Channel) session.openChannel("sftp");
			channel.connect(3000);
			ChannelSftp sftp = (ChannelSftp) channel;
			
			if (!remoteFilePath.endsWith("/")) {
				remoteFilePath = remoteFilePath.concat("/");
			}
			
			bis = new BufferedInputStream(sftp.get(remoteFilePath
					+ remoteFileName));
			
			bos = new BufferedOutputStream(new FileOutputStream(new File(
					localPath, localSavedFileName)));
			byte[] buf = new byte[8192];
			int n;
			while ((n = bis.read(buf)) != -1) {
				bos.write(buf, 0, n);
			}
			
			bos.flush();
			
			return "";
		} catch (Exception e) {
		    e.printStackTrace();
			return e.getMessage();
		} finally {
			if (bis != null) {
				try {
					bis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (session != null) {
				session.disconnect();
			}

			if (channel != null) {
				channel.disconnect();
			}
		}
	}
	
	
	public static String sftpUpload(String host, int port, String username,
			String passwd, String localFilePath, String remotePath,
			String remoteFileName,int timeoout) {

		File localFile = new File(localFilePath);
		if (!localFile.exists()) {
			return "Local file:" + localFilePath + " does not exists";
		}

		Session session = null;
		Channel channel = null;
		JSch jsch = new JSch();
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		try {
			if (port <= 0) {
				session = jsch.getSession(username, host);
			} else {
				session = jsch.getSession(username, host, port);
			}

			if (session == null) {
				return "Can not connect to " + host + ":" + port;
			}

			session.setPassword(passwd);
			// hints for first-time logging, options are:(ask | yes | no)
			session.setConfig("StrictHostKeyChecking", "no");
			session.connect(timeoout);

			channel = (Channel) session.openChannel("sftp");
			channel.connect(timeoout);
			ChannelSftp sftp = (ChannelSftp) channel;

			sftp.cd(remotePath);

			bos = new BufferedOutputStream(sftp.put(remoteFileName));
			bis = new BufferedInputStream(new FileInputStream(localFile));

			byte[] buf = new byte[8192];
			int n;
			while ((n = bis.read(buf)) != -1) {
				bos.write(buf, 0, n);
			}

			bos.flush();

		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		} finally {
			if (bis != null) {
				try {
					bis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (session != null) {
				session.disconnect();
			}

			if (channel != null) {
				channel.disconnect();
			}
		}

		return "";
	}
}
