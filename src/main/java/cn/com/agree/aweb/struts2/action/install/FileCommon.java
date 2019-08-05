package cn.com.agree.aweb.struts2.action.install;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.nio.channels.FileChannel;

/**
 * 复制文件夹或文件夹
 */
public class FileCommon {


    public static void main(String args[]) throws IOException {
//        // 源文件夹
        String url1 = "E:\\renfei\\zantong\\Code\\AIM_LOG\\temp\\baseConfig\\zookeeper";
//        // 目标文件夹
//        String url2 = "E:\\renfei\\zantong\\Code\\AIM_LOG\\tools\\src\\main\\resources\\outConfig\\10.9.3.140\\java\\";
//
//        // 创建目标文件夹
//        (new File(url2)).mkdirs();
//
//        copyDirectiory(url1, url2);

//        delFolder("c:/bb");


        url1 = url1 + "\\zoo.cfg";

//        String s = readFile(url1);
//        System.out.println(s);


        //修改文件
//        String zoo_cfg = sourcePath + "/zoo.cfg";

//        String content = FileCommon.readFile(url1);
//        // 文件追加内容
//        String append = "server." + 1 + "=192.168.1.1:2888:3888";
//        content = content + "\n" + append;
//        System.out.println("content: " + content);
//        FileCommon.writeFile(url1, content);

        String s = "{\"zkIds\": [\n" +
                "    \"1\",\n" +
                "    \"2\",\n" +
                "    \"3\"\n" +
                "  ]}";

        JSONObject object = JSONObject.parseObject(s);

        JSONArray zkIds = object.getJSONArray("zkIds");
        for (int i = 0; i < zkIds.size(); i++) {
            System.out.println(zkIds.get(i));
        }
    }

    public static String throwableToString(Throwable e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw, true);
        e.printStackTrace(pw);
        pw.flush();
        sw.flush();
        return sw.toString();
    }

    // 复制文件
    public static void copyFile(File sourceFile, File targetFile)
            throws IOException {
        FileChannel inputChannel = null;
        FileChannel outputChannel = null;
        try {
            inputChannel = new FileInputStream(sourceFile).getChannel();
            outputChannel = new FileOutputStream(targetFile).getChannel();
            outputChannel.transferFrom(inputChannel, 0, inputChannel.size());
        } finally {
            inputChannel.close();
            outputChannel.close();
        }
    }

    /**
     * 在已有的文件后面追加信息
     *
     * @param fileName
     * @param info
     * @throws IOException
     */
    public static void appendInfoToFile(String fileName, String info) {
        try {
            File file = new File(fileName);
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter fileWriter = new FileWriter(file, true);
            info = info + System.getProperty("line.separator");
            fileWriter.write(info);
            fileWriter.flush();
            fileWriter.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 清空已有的文件内容，以便下次重新写入新的内容
     *
     * @param fileName
     */
    public static void clearInfoForFile(String fileName) {
        File file = new File(fileName);
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter fileWriter = new FileWriter(file);
            fileWriter.write("");
            fileWriter.flush();
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 读文件内容
    public static String readFile(String fileName) {
        File file = new File(fileName);
        BufferedReader reader = null;
        StringBuffer sbf = new StringBuffer();
        try {
//            reader = new BufferedReader(new FileReader(file));
//            String tempStr;
//            while ((tempStr = reader.readLine()) != null) {
//                sbf.append(tempStr);
//            }
//            reader.close();
//            return sbf.toString();

            InputStream is = new FileInputStream(fileName);
            int iAvail = is.available();
            byte[] bytes = new byte[iAvail];
            is.read(bytes);
            is.close();
            return new String(bytes);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
        return sbf.toString();
    }

    // 写入文件
    public static boolean writeFile(String filePath, String content) {
        boolean b = false;
        File file = new File(filePath);
        //输出流
        FileOutputStream fop;
        try {
            fop = new FileOutputStream(file);
            if (!file.exists()) {
                file.createNewFile();
            }
            //将字符串转成字节
            byte[] contentInBytes = content.toString().getBytes();
            //写入文件
            fop.write(contentInBytes);
            fop.flush();
            //释放
            fop.close();
            b = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return b;
    }

    // 复制文件夹
    public static void copyDirectiory(String sourceDir, String targetDir)
            throws IOException {
        // 新建目标目录
        (new File(targetDir)).mkdirs();
        // 获取源文件夹当前下的文件或目录
        File[] file = (new File(sourceDir)).listFiles();
        for (int i = 0; i < file.length; i++) {
            if (file[i].isFile()) {
                // 源文件
                File sourceFile = file[i];
                // 目标文件
                File targetFile = new
                        File(new File(targetDir).getAbsolutePath()
                        + File.separator + file[i].getName());
                copyFile(sourceFile, targetFile);
            }
            if (file[i].isDirectory()) {
                // 准备复制的源文件夹
                String dir1 = sourceDir + "/" + file[i].getName();
                // 准备复制的目标文件夹
                String dir2 = targetDir + "/" + file[i].getName();
                copyDirectiory(dir1, dir2);
            }
        }
    }

    //删除文件夹
//param folderPath 文件夹完整绝对路径

    public static void delFolder(String folderPath) {
        try {
            delAllFile(folderPath); //删除完里面所有内容
            String filePath = folderPath;
            filePath = filePath.toString();
            java.io.File myFilePath = new java.io.File(filePath);
            myFilePath.delete(); //删除空文件夹
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //删除指定文件夹下所有文件
    //param path 文件夹完整绝对路径
    public static boolean delAllFile(String path) {
        boolean flag = false;
        File file = new File(path);
        if (!file.exists()) {
            return flag;
        }
        if (!file.isDirectory()) {
            return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
            if (path.endsWith(File.separator)) {
                temp = new File(path + tempList[i]);
            } else {
                temp = new File(path + File.separator + tempList[i]);
            }
            if (temp.isFile()) {
                temp.delete();
            }
            if (temp.isDirectory()) {
                delAllFile(path + "/" + tempList[i]);//先删除文件夹里面的文件
                delFolder(path + "/" + tempList[i]);//再删除空文件夹
                flag = true;
            }
        }
        return flag;
    }
}