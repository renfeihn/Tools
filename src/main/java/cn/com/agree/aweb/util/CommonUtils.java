package cn.com.agree.aweb.util;

import cn.com.agree.aweb.Constants;
import org.apache.commons.lang.RandomStringUtils;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class CommonUtils {

    public static Date getDateTime() throws ParseException {
        SimpleDateFormat sDateFormat = new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss");
        String date = sDateFormat.format(new Date());

        return sDateFormat.parse(date);
    }

    public static String getNowTime() {
        SimpleDateFormat sDateFormat = new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss");
        return sDateFormat.format(new Date());
    }

    public static String getUnfmtTime() {
        SimpleDateFormat sDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        return sDateFormat.format(new Date());
    }

    public static String formatTime(String format, long mills) {
        return new SimpleDateFormat(format).format(new Date(mills));
    }

    public static String formatTime(long mills) {
        return formatTime("yyyy-MM-dd HH:mm:ss", mills);
    }

    /**
     * @Description: 库表唯一ID
     * @author Athrun tang.pm@cfischina.com
     * @date 2015年9月11日 上午10:38:08
     * @version V1.0
     */
    public static String getUUID() {
        return UUID.randomUUID().toString();
    }

    /**
     * @Description: 库表唯一ID，对外显示的
     * @author Athrun tang.pm@cfischina.com
     * @date 2015年9月11日 上午10:38:01
     * @version V1.0
     */
    public static String getShowUUID() {
        String id = createId();
        return id.substring(0, 4) + "-" + id.substring(4, 8) + "-" + id.substring(8, 12);
    }

    /**
     * @return 单位：秒
     * @Description: 获取时间间隔
     * @author Athrun tang.pm@cfischina.com
     * @date 2015年8月21日 上午11:54:20
     * @version V1.0
     */
    public static int jugeTimeSpacing(String sj1, String sj2) {
        SimpleDateFormat myFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long seconds = 0;
        try {
            java.util.Date date = myFormatter.parse(sj1);
            java.util.Date mydate = myFormatter.parse(sj2);

            seconds = (date.getTime() - mydate.getTime()) / 1000;

            // 这里精确到了秒，我们可以在做差的时候将时间精确到天
        } catch (Exception e) {
            return -1;
        }
        return (int) seconds;
    }

    /**
     * @param str
     * @return
     */
    public static byte[] getBytes(String str) {
        try {
            return str.getBytes(Constants.ENCODING_UTF8);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }


    private static String createId() {
        String id = UUID.randomUUID().toString();
        id = DEKHash(id) + "";
        int diff = 12 - id.length();
        String randStr = RandomStringUtils.randomAlphabetic(12);
        for (int i = 0; i < diff; i++) {
            int randIndex = (int) (Math.random() * randStr.length());
            int index = (int) (Math.random() * id.length());
            id = id.substring(0, index) + randStr.charAt(randIndex) + id.substring(index, id.length());
        }
        return id;
    }

    private static int DEKHash(String str) {
        int hash = str.length();
        for (int i = 0; i < str.length(); i++) {
            hash = ((hash << 5) ^ (hash >> 27)) ^ str.charAt(i);
        }
        return (hash & 0x7FFFFFFF);
    }

//    public static String formatXmlConfig(Document document)
//            throws IOException {
//        String encoding = document.getXMLEncoding();
//
//        OutputFormat format = OutputFormat.createPrettyPrint();
//
//        format.setEncoding(encoding);
//
//        StringWriter writer = new StringWriter();
//
//        XMLWriter xmlwriter = new XMLWriter(writer, format);
//
//        String returnValue = null;
//        xmlwriter.write(document);
//        returnValue = writer.toString();
//        writer.close();
//
//        return returnValue;
//    }
}
