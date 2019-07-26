package cn.com.agree.aweb.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import org.apache.commons.lang3.StringUtils;

import tc.bank.asda.es.bean.Mail;

public class MailUtil {

	private static MimeMessage createMixedMail(Session session, Mail mail) throws Exception {
		String from = mail.getFrom();
		String subject = mail.getSubject();
		String content = mail.getContent();
		List<String> receive = mail.getReceive();
		List<String> cc = mail.getCc();
		if (StringUtils.isEmpty(from) || null == receive || receive.size() == 0) {
			return null;
		}
		// 创建邮件
		MimeMessage message = new MimeMessage(session);
		// 设置邮件的基本信息
		message.setSubject(subject);
		message.setFrom(new InternetAddress(from));
		List<InternetAddress> to = new ArrayList<>(receive.size());
		for(String tmp : receive) {
			to.add(new InternetAddress(tmp));
		}
		InternetAddress[] address =(InternetAddress[])to.toArray(new InternetAddress[to.size()]);
		message.setRecipients(Message.RecipientType.TO, address);
		
		if(cc != null && cc.size()>0) {
			List<InternetAddress> list = new ArrayList<>(cc.size());
			for(String tmp : cc) {
				list.add(new InternetAddress(tmp));
			}
			InternetAddress[] ccAddress =(InternetAddress[])list.toArray(new InternetAddress[list.size()]);
			message.setRecipients(Message.RecipientType.CC, ccAddress);
		}
		// 图片
        MimeBodyPart image = new MimeBodyPart();
        DataHandler dh = new DataHandler(new FileDataSource(new File(mail.getImagePath())));
        image.setDataHandler(dh);     
        image.setContentID("aggree_icon"); 
        // 正文
        MimeBodyPart text = new MimeBodyPart();
        text.setContent(content + "<br><br><img src='cid:aggree_icon'/>", "text/html;charset=UTF-8");
        MimeMultipart  mm_text_image  = new MimeMultipart();
        mm_text_image.addBodyPart(text);
        mm_text_image.addBodyPart(image);
        mm_text_image.setSubType("related");
        
        //图片+文本
        MimeBodyPart text_image = new MimeBodyPart();
        text_image.setContent(mm_text_image);
        
        MimeMultipart mm = new MimeMultipart();
		mm.addBodyPart(text_image);
		// 附件
		File file = mail.getFile();
		if(null != file) {
			MimeBodyPart attachment = new MimeBodyPart();
			DataHandler dh2 = new DataHandler(new FileDataSource(file));
			attachment.setDataHandler(dh2);
			attachment.setFileName(MimeUtility.encodeText(dh2.getName()));
			mm.addBodyPart(attachment);
		    mm.setSubType("mixed");
		}
		message.setContent(mm);
		message.saveChanges();
		return message;
	}

	public static String send(String host, String protocol, String user, String password, Mail mail) {
		if (StringUtils.isAnyEmpty(host, protocol, user, password)) {
			return "邮件服务器未配置";
		}
		Transport ts = null;
		try {
			// 1、创建session
			Properties prop = new Properties();
			prop.setProperty("mail.host", host);
			prop.setProperty("mail.transport.protocol", protocol);
			prop.setProperty("mail.smtp.auth", "true");
			Session session = Session.getInstance(prop);
			if (null == session) {
				return "邮件服务器信息配置有误";
			}
			// 2、通过session得到transport对象
			ts = session.getTransport();
			// 3、连上邮件服务器
			ts.connect(host, user, password);
			// 4、创建邮件
			Message message = createMixedMail(session, mail);
			if (null == message) {
				return "邮件内容不足";
			}
			// 5、发送邮件
			ts.sendMessage(message, message.getAllRecipients());
			return "发送成功";
		} catch (Exception e) {
			e.printStackTrace();
			return "邮件发送失败";
		} finally {
			try {
				if (null != ts) {
					ts.close();
				}
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}
	}
}
