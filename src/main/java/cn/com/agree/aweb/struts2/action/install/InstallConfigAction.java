package cn.com.agree.aweb.struts2.action.install;

import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Renfei on 2019/7/29.
 */
@Controller("InstallConfigActionBean")
@Scope("prototype")
public class InstallConfigAction extends StandardActionSupport {


    static String classesPath = InstallConfigAction.class.getClassLoader().getResource("").getPath();


    private String id;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 文件内容 json格式
     */
    private String fileContent;

    /**
     * 功能说明：数据文件名称
     */
    public enum DataFileName {
        serverConfig, javaConfig, zookeeperConfig, stormConfig, mysqlConfig, esConfig, kafkaConfig, hbaseConfig;

        @Override
        public String toString() {
            return this.name();
        }
    }

    /**
     * 功能说明：自定义渲染模板
     *
     * @param template 模版
     * @param params   参数
     * @return
     */
    public static String processTemplate(String template,
                                         Map<String, Object> params) {
        if (template == null || params == null)
            return null;
        StringBuffer sb = new StringBuffer();
        Matcher m = Pattern.compile("\\$\\{\\w+\\}").matcher(template);
        while (m.find()) {
            String param = m.group();
            Object value = params.get(param.substring(2, param.length() - 1));
            m.appendReplacement(sb, value == null ? "" : value.toString());
        }
        m.appendTail(sb);
        return sb.toString();
    }


    /**
     * 功能说明：根据文件名获取内容
     *
     * @param fileName
     * @return
     * @throws IOException
     */
    private JSONObject getFileContent(String fileName) throws IOException {
        String filePathAll = classesPath + "configData/" + fileName + ".json";
        System.out.println("读取文件路径：" + filePathAll);
//        Resource resource = new ClassPathResource("configData/" + fileName + ".json");
        File file = new File(filePathAll);

        // 读文件到字符串
        String data = org.apache.commons.io.FileUtils.readFileToString(file, "UTF-8");
        return JSON.parseObject(data);
    }

    /**
     * 功能说明：根据json文件名获取对应list数据
     *
     * @param fileName
     * @return
     * @throws IOException
     */
    private JSONArray getListByFileName(String fileName) throws IOException {
        return getFileContent(fileName).getJSONArray("list");
    }


    /**
     * 功能说明：根据ID查找json中数据
     *
     * @param fileName
     * @param id
     * @return
     * @throws IOException
     */
    private JSONObject getInfoById(String fileName, String id) throws IOException {
        JSONObject o = null;
        JSONArray list = getListByFileName(fileName);
        if (null != list && list.size() > 0) {
            for (int i = 0; i < list.size(); i++) {
                JSONObject object = list.getJSONObject(i);
                String idValue = object.getString("id");
                if (org.apache.commons.lang.StringUtils.isNotEmpty(idValue) && id.equals(idValue)) {
                    o = object;
                    break;
                }
            }
        }

        return o;
    }


    /**
     * 功能说明：生成安装java脚本
     *
     * @throws IOException
     */
    private void genJava() throws IOException {
        System.out.println("gen java start");
        // 先修改文件
        JSONObject java = getFileContent(DataFileName.javaConfig.name());
        JSONArray list = java.getJSONArray("list");

        if (null != list && list.size() > 0) {
            for (int i = 0; i < list.size(); i++) {
                JSONObject javaObj = list.getJSONObject(i);
                String javaPath = java.getString("java_path");
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), javaObj.getString("server_id"));
                String ip = serverObj.getString("ip");

                String sourcePath = classesPath + "/baseConfig/java";
                String targetPath = classesPath + "/outConfig/" + ip + "/java/";

                FileUtils.copyDirectiory(sourcePath, targetPath);

                //修改文件
                String install_jdk8_path = targetPath + "install_jdk8.sh";
                String content = FileUtils.readFile(install_jdk8_path);
                Map map = new HashMap();
                map.put("javaPath", javaPath);
                content = this.processTemplate(content, map);
                System.out.println("content: " + content);
                FileUtils.writeFile(install_jdk8_path, content);
            }
        }

        System.out.println("gen java end");
    }


    /**
     * 功能说明：生成安装zk脚本
     *
     * @throws IOException
     */
    private void genZookeeper() throws IOException {
        System.out.println("gen zk start");

        // 先修改文件
        JSONArray list = getListByFileName(DataFileName.zookeeperConfig.name());
        JSONObject zkObj = getFileContent(DataFileName.zookeeperConfig.name());

        if (null != list && list.size() > 0) {

            String appendStr = "";

            // 修改原文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject javaObj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), javaObj.getString("server_id"));
                String ip = serverObj.getString("ip");

                // 文件追加内容
                int ii = i + 1;
                String append = "server." + ii + "=" + ip + ":2888:3888";
                appendStr = appendStr + "\n" + append;
            }


            // 生成下发文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject javaObj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), javaObj.getString("server_id"));
                String ip = serverObj.getString("ip");

                String sourcePath = classesPath + "/baseConfig/zookeeper";
                String targetPath = classesPath + "/outConfig/" + ip + "/zookeeper/";

                FileUtils.copyDirectiory(sourcePath, targetPath);

                //修改 install_zk.sh
                String install_zookeeper = targetPath + "install_zk.sh";
                String content = FileUtils.readFile(install_zookeeper);
                Map map = new HashMap();
                map.put("serverId", i + 1);
                content = this.processTemplate(content, map);
                FileUtils.writeFile(install_zookeeper, content);

                // 修改 zoo.cfg
                String zoo_cfg = targetPath + "zoo.cfg";

                content = FileUtils.readFile(zoo_cfg);
                map.put("dataDir", zkObj.get("dataDir"));
                map.put("dataLogDir", zkObj.get("dataLogDir"));
                map.put("clientPort", zkObj.get("clientPort"));
                content = this.processTemplate(content, map);
                // 文件追加内容
                content = content + "\n" + appendStr;
                System.out.println("content: " + content);
                FileUtils.writeFile(zoo_cfg, content);
            }
        }

        System.out.println("gen zk end");
    }


    /**
     * 功能说明：生成安装storm脚本
     *
     * @throws IOException
     */
    private void genStorm() throws IOException {
        System.out.println("gen storm start");
        // 先修改文件
        JSONArray list = getListByFileName(DataFileName.stormConfig.name());
        JSONObject stormObj = getFileContent(DataFileName.stormConfig.name());
        JSONObject zkObj = getFileContent(DataFileName.zookeeperConfig.name());

        if (null != list && list.size() > 0) {

            String nimbus_seeds = "";

            // 修改原文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject javaObj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), javaObj.getString("server_id"));
                String ip = serverObj.getString("ip");

                // 文件追加内容
                String append = "\"" + ip + "\"";
                if (i > 0) {
                    nimbus_seeds += ",";
                }
                nimbus_seeds += append;
            }

            // storm zookeeper
            StringBuffer storm_zookeeper_servers = new StringBuffer("\n");
            // asda zookeeper
            StringBuffer asda_parser_zookeeper_hosts = new StringBuffer();
            // asda jdbc zk
            StringBuffer jdbc_pool_zk_ip_port = new StringBuffer();

            // 获取zk列表
            JSONArray zkIds = stormObj.getJSONArray("zkIds");
            for (int i = 0; i < zkIds.size(); i++) {
                String zkId = zkIds.getString(i);
                JSONObject zk = this.getInfoById(DataFileName.zookeeperConfig.name(), zkId);
                JSONObject server = this.getInfoById(DataFileName.serverConfig.name(), zk.getString("server_id"));
                storm_zookeeper_servers.append("  - \"" + server.get("ip") + "\"").append("\n");

                if (i > 0) {
                    asda_parser_zookeeper_hosts.append(",");
                    jdbc_pool_zk_ip_port.append(",");
                }
                asda_parser_zookeeper_hosts.append(server.get("ip")).append(":").append(zkObj.get("clientPort"));
                jdbc_pool_zk_ip_port.append(server.get("ip"));
                if (i == zkIds.size() - 1) {
                    jdbc_pool_zk_ip_port.append(":").append(zkObj.get("clientPort"));
                }

            }

            // asda kafka
            StringBuffer kafka_bootstrap_ip_port = new StringBuffer();

            // 获取所有kafka配置
            JSONObject kafkaObj = this.getFileContent(DataFileName.kafkaConfig.name());
            JSONArray kafkaList = kafkaObj.getJSONArray("list");
            if (null != kafkaList && kafkaList.size() > 0) {
                for (int i = 0; i < kafkaList.size(); i++) {
                    JSONObject kafka = kafkaList.getJSONObject(i);
                    JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), kafka.getString("server_id"));

                    if (i > 0) {
                        kafka_bootstrap_ip_port.append(",");
                    }
                    kafka_bootstrap_ip_port.append(serverObj.get("ip")).append(":").append(kafkaObj.get("listeners_prot"));
                }
            }

            // asda es
            String es_clusterName = "";
            StringBuffer es_nodes = new StringBuffer();
            JSONObject esObj = this.getFileContent(DataFileName.esConfig.name());
            JSONArray esList = kafkaObj.getJSONArray("list");
            if (null != esList && esList.size() > 0) {
                for (int i = 0; i < esList.size(); i++) {
                    JSONObject es = esList.getJSONObject(i);
                    es_clusterName = es.getString("clusterName");
                    JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), es.getString("server_id"));

                    if (i > 0) {
                        es_nodes.append(",");
                    }
                    es_nodes.append(serverObj.get("ip")).append(":").append(esObj.get("http_port"));
                }
            }


            // asda phoenix
            StringBuffer jdbc_pool_hbase_ip = new StringBuffer();
            JSONArray hbaseList = this.getListByFileName(DataFileName.hbaseConfig.name());
            if (null != hbaseList && hbaseList.size() > 0) {
                for (int i = 0; i < hbaseList.size(); i++) {
                    JSONObject hbase = esList.getJSONObject(i);
                    JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), hbase.getString("server_id"));

                    if (i > 0) {
                        jdbc_pool_hbase_ip.append(",");
                    }
                    jdbc_pool_hbase_ip.append(serverObj.get("ip"));
                }
            }

            // 生成下发文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject obj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), obj.getString("server_id"));
                String ip = serverObj.getString("ip");

                String sourcePath = classesPath + "/baseConfig/storm";
                String targetPath = classesPath + "/outConfig/" + ip + "/storm/";

                FileUtils.copyDirectiory(sourcePath, targetPath);

                //修改 install_storm.sh
                String install_zookeeper = targetPath + "install_storm.sh";
                String content = FileUtils.readFile(install_zookeeper);
                Map map = new HashMap();
                // 是否安装拓扑
                Boolean exec_asda = obj.getBooleanValue("exec_asda");
                map.put("exec_asda", exec_asda);
                content = this.processTemplate(content, map);
                FileUtils.writeFile(install_zookeeper, content);

                // 修改 storm.yaml
                String storm_yaml = targetPath + "storm.yaml";

                content = FileUtils.readFile(storm_yaml);

                map.put("storm_local_hostname", "\"" + ip + "\"");
                map.put("storm_zookeeper_servers", storm_zookeeper_servers.toString());
                map.put("storm_zookeeper_port", zkObj.get("clientPort"));
                map.put("storm_zookeeper_root", stormObj.get("storm.zookeeper_root"));
                map.put("transactional_zookeeper_root", stormObj.get("transactional_zookeeper_root"));
                map.put("nimbus_seeds", nimbus_seeds);

//                map.put("storm_local_dir", stormObj.get("storm_local_dir"));
//                map.put("storm_log_dir", stormObj.get("storm_log_dir"));
                map.put("storm_home", stormObj.get("storm_home"));
                map.put("ui_port", stormObj.get("ui_port"));
                map.put("logviewer_port", stormObj.get("logviewer_port"));

                content = this.processTemplate(content, map);
//                System.out.println("content: " + content);
                FileUtils.writeFile(storm_yaml, content);


                // 需要安装拓扑 拓扑配置文件 asda.json
                String asda_json = targetPath + "asda.json";

                if (exec_asda) {
                    // 修改拓扑配置文件 asda.json
                    content = FileUtils.readFile(asda_json);

                    map.put("topology_name", serverObj.get("topology_name"));
                    map.put("asda_parser_zookeeper_hosts", asda_parser_zookeeper_hosts.toString());
                    map.put("redis_sentinel_ip_port", stormObj.get("redis_sentinel_ip_port"));
                    map.put("kafka_bootstrap_ip_port", kafka_bootstrap_ip_port.toString());

                    map.put("es_clusterName", es_clusterName);
                    map.put("es_nodes", es_nodes.toString());


                    map.put("jdbc_pool_zk_ip_port", jdbc_pool_zk_ip_port.toString());
                    map.put("jdbc_pool_hbase_ip", jdbc_pool_hbase_ip.toString());

                    map.put("afa_urls", stormObj.get("afa_urls"));

                    content = this.processTemplate(content, map);
                    System.out.println("content: " + content);
                    FileUtils.writeFile(asda_json, content);

                } else {
                    // 不安装拓扑的机器上删除 asda.json
                    File file = new File(asda_json);
                    if (file.isFile()) {
                        file.delete();
                    }
                }
            }
        }

        System.out.println("gen storm end");
    }


    /**
     * 功能说明：生成安装mysql脚本
     *
     * @throws IOException
     */
    private void genMysql() throws IOException {
        System.out.println("gen mysql start");
        // 先修改文件
        JSONArray list = getListByFileName(DataFileName.mysqlConfig.name());
        JSONObject mysqlObj = getFileContent(DataFileName.mysqlConfig.name());

        if (null != list && list.size() > 0) {

            // 复制文件并 生成最新文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject obj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), obj.getString("server_id"));
                String ip = serverObj.getString("ip");
                String server_id = ip.substring(ip.lastIndexOf(".") + 1, ip.length());

                String sourcePath = classesPath + "/baseConfig/mysql_install";
                String targetPath = classesPath + "/outConfig/" + ip + "/mysql_install/";

                FileUtils.copyDirectiory(sourcePath, targetPath);

                //修改 install_storm.sh
                Map map = new HashMap();
                // 修改 my.cnf
                String my_cnf = targetPath + "my.cnf";

                String content = FileUtils.readFile(my_cnf);

                map.put("home_path", mysqlObj.getString("home_path"));
                map.put("user", mysqlObj.getString("user"));
                map.put("port", mysqlObj.getString("port"));
                map.put("server_id", server_id);
                // 双活对方
                int slave_parallel_workers = 2;
                if (list.size() < 2 || i > 0) {
                    slave_parallel_workers = 1;
                }
                map.put("slave_parallel_workers", slave_parallel_workers);

                // 本机
                map.put("auto_increment_offset", i + 1);


                content = this.processTemplate(content, map);
//                System.out.println("content: " + content);
                FileUtils.writeFile(my_cnf, content);

            }
        }

        System.out.println("gen mysql end");

    }

    /**
     * 功能说明：生成安装es脚本
     *
     * @throws IOException
     */
    private void genEs() throws IOException {
        System.out.println("gen es start");

        // 先修改文件
        JSONArray list = getListByFileName(DataFileName.esConfig.name());
        JSONObject esObj = getFileContent(DataFileName.esConfig.name());

        if (null != list && list.size() > 0) {

            String discovery_zen_ping_unicast_hosts = "";

            // 修改原文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject javaObj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), javaObj.getString("server_id"));
                String ip = serverObj.getString("ip");

                // 文件追加内容
                String append = "\"" + ip + "\"";
                if (i > 0) {
                    discovery_zen_ping_unicast_hosts += ",";
                }
                discovery_zen_ping_unicast_hosts += "\n" + append;
            }


            // 复制文件并 生成最新文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject obj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), obj.getString("server_id"));
                String ip = serverObj.getString("ip");

                String sourcePath = classesPath + "/baseConfig/es";
                String targetPath = classesPath + "/outConfig/" + ip + "/es/";

                FileUtils.copyDirectiory(sourcePath, targetPath);

                Map map = new HashMap();
                // 修改 elasticsearch.yml
                String elasticsearch_yml = targetPath + "elasticsearch.yml";

                String content = FileUtils.readFile(elasticsearch_yml);

                map.put("cluster_name", esObj.getString("cluster_name"));
                map.put("http_port", esObj.get("http_port"));
                map.put("transport_tcp_port", esObj.get("transport_tcp_port"));
                // 本机
                map.put("discovery_zen_ping_unicast_hosts", discovery_zen_ping_unicast_hosts);

                content = this.processTemplate(content, map);
//                System.out.println("content: " + content);
                FileUtils.writeFile(elasticsearch_yml, content);

            }
        }

        System.out.println("gen es end");

    }


    /**
     * 功能说明：生成安装kafka脚本
     *
     * @throws IOException
     */
    private void genKafka() throws IOException {
        System.out.println("gen kafka start");

        // 先修改文件
        JSONArray list = getListByFileName(DataFileName.kafkaConfig.name());
        JSONObject kafkaObj = getFileContent(DataFileName.kafkaConfig.name());

        if (null != list && list.size() > 0) {

            // 获取zk列表
            StringBuffer zookeeper_connect = new StringBuffer("\n");
            JSONArray zkIds = kafkaObj.getJSONArray("zkIds");
            for (int i = 0; i < zkIds.size(); i++) {
                String zkId = zkIds.getString(i);
                JSONObject zkObj = this.getFileContent(DataFileName.zookeeperConfig.name());
                JSONObject zk = this.getInfoById(DataFileName.zookeeperConfig.name(), zkId);
                JSONObject server = this.getInfoById(DataFileName.serverConfig.name(), zk.getString("server_id"));
                if (i > 0 && i < list.size()) {
                    zookeeper_connect.append(",");
                }
                zookeeper_connect.append(server.get("ip") + ":" + zkObj.get("clientPort"));
            }

            // 复制文件并 生成最新文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject obj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), obj.getString("server_id"));
                String ip = serverObj.getString("ip");

                String sourcePath = classesPath + "/baseConfig/kafka";
                String targetPath = classesPath + "/outConfig/" + ip + "/kafka/";

                FileUtils.copyDirectiory(sourcePath, targetPath);

                Map map = new HashMap();
                // 修改 server.properties
                String server_properties = targetPath + "server.properties";

                String content = FileUtils.readFile(server_properties);

                map.put("broker_id", i + 1);
                map.put("ip", ip);
                map.put("listeners_prot", kafkaObj.get("listeners_prot"));
                map.put("kafka_home", kafkaObj.get("kafka_home"));
                // 本机
                map.put("zookeeper_connect", zookeeper_connect);

                content = this.processTemplate(content, map);
                System.out.println("content: " + content);
                FileUtils.writeFile(server_properties, content);

            }
        }
        System.out.println("gen kafka end");

    }


    /**
     * 功能说明：生成安装 hadoop hbase phoenix脚本
     *
     * @throws IOException
     */
    private void genHbase() throws IOException {
        System.out.println("gen hbase start");
        // 先修改文件
        JSONArray list = getListByFileName(DataFileName.hbaseConfig.name());
        JSONObject hbaseObj = getFileContent(DataFileName.hbaseConfig.name());
        JSONObject zkObj = this.getFileContent(DataFileName.zookeeperConfig.name());

        if (null != list && list.size() > 0) {

            StringBuffer ha_zookeeper_quorum = new StringBuffer();

            // hbase-site hbase_zookeeper_quorum
            StringBuffer hbase_zookeeper_quorum = new StringBuffer();
            Object zookeeper_clientPort = zkObj.get("clientPort");


            // 获取zk列表
            JSONArray zkIds = hbaseObj.getJSONArray("zkIds");
            for (int i = 0; i < zkIds.size(); i++) {
                String zkId = zkIds.getString(i);
                JSONObject zk = this.getInfoById(DataFileName.zookeeperConfig.name(), zkId);
                JSONObject server = this.getInfoById(DataFileName.serverConfig.name(), zk.getString("server_id"));
                if (i > 0 && i < list.size()) {
                    ha_zookeeper_quorum.append(",");
                    hbase_zookeeper_quorum.append(",");
                }
                ha_zookeeper_quorum.append(server.get("ip") + ":" + zookeeper_clientPort);
                hbase_zookeeper_quorum.append(server.get("ip"));
            }


            int nn = 0;
            int jn = 0;
            int rm = 0;

            // hdfs_site dfs.ha.namenodes.asda
            String dfs_ha_namenodes_asda = "";
            // hdfs_site dfs.namenode
            StringBuffer dfs_namenode_address = new StringBuffer("\n");
            // hdfs_site
            String dfs_journalnode_shared = "";

            // yarn_site yarn_resourcemanager_ids
            String yarn_resourcemanager_ids = "";
            // yarn_site yarn.resourcemanager.hostname
            StringBuffer yarn_resourcemanager_hostname = new StringBuffer("\n");

            // slaves
            StringBuffer slaves_ip = new StringBuffer();

            // regionservers
            StringBuffer regionservers_ip = new StringBuffer();

            // backup-masters
            StringBuffer masters_ip = new StringBuffer();

            // 组建数据
            for (int i = 0; i < list.size(); i++) {
                JSONObject obj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), obj.getString("server_id"));
                String ip = serverObj.getString("ip");

                // hadoop 管理主节点 NameNode
                Boolean hadoop_nn = obj.getBoolean("hadoop_nn");
                // hadoop 数据同步 JournalNode
                Boolean hadoop_jn = obj.getBoolean("hadoop_jn");
                // hadoop 资源管理器 resourcemanager
                Boolean hadoop_rm = obj.getBoolean("hadoop_rm");
                // hadoop 数据节点 DataNode
                Boolean hadoop_dn = obj.getBoolean("hadoop_dn");
                // hbase 主节点 master
                Boolean hbase_ha = obj.getBoolean("hbase_ha");
                // hbase 区域服务 RegionServers
                Boolean hbase_rs = obj.getBoolean("hbase_rs");

                // hdsf-site数据
                if (hadoop_nn) {
                    nn++;
                    if (nn > 1) {
                        dfs_ha_namenodes_asda += ",";
                    }
                    dfs_ha_namenodes_asda += "nn" + nn;


                    dfs_namenode_address.append("<property>\n" +
                            "    <name>dfs.namenode.rpc-address.asda.nn" + nn + "</name>\n" +
                            "    <value>" + ip + ":" + hbaseObj.get("namenode_rpc_port") + "</value>\n" +
                            "  </property>\n");

                    dfs_namenode_address.append("<property>\n" +
                            "    <name>dfs.namenode.http-address.asda.nn" + nn + "</name>\n" +
                            "    <value>" + ip + ":" + hbaseObj.get("namenode_http_port") + "</value>\n" +
                            "  </property>\n");
                }

                if (hadoop_jn) {
                    jn++;
                    if (jn > 1) {
                        dfs_journalnode_shared += ";";
                    }
                    dfs_journalnode_shared += ip + ":" + hbaseObj.get("journalnode_share_port");
                }

                if (hadoop_rm) {
                    rm++;
                    if (rm > 1) {
                        yarn_resourcemanager_ids += ",";
                    }
                    yarn_resourcemanager_ids += "rm" + nn;

                    yarn_resourcemanager_hostname.append("<property>\n" +
                            "    <name>yarn.resourcemanager.hostname.rm" + rm + "</name>\n" +
                            "    <value>" + ip + "</value>\n" +
                            "  </property>");

                    yarn_resourcemanager_hostname.append("<property>\n" +
                            "    <name>yarn.resourcemanager.webapp.address.rm" + rm + "</name>\n" +
                            "    <value>" + ip + ":" + hbaseObj.get("yarn_resourcemanager_webapp_address") + "</value>\n" +
                            "  </property>");
                }

                if (hadoop_dn) {
                    slaves_ip.append(ip).append("\n");
                }


                if (hbase_rs) {
                    regionservers_ip.append(ip).append("\n");
                }

                if (hbase_ha) {
                    masters_ip.append(ip).append("\n");
                }

            }


            // 复制文件并 生成最新文件
            for (int i = 0; i < list.size(); i++) {
                JSONObject obj = list.getJSONObject(i);
                JSONObject serverObj = this.getInfoById(DataFileName.serverConfig.name(), obj.getString("server_id"));
                String ip = serverObj.getString("ip");

                String sourcePath = classesPath + "/baseConfig/hbase";
                String targetPath = classesPath + "/outConfig/" + ip + "/hbase/";

                Boolean is_mater = null == obj.getBoolean("is_master") ? false : obj.getBoolean("is_master");
                if (!is_mater) {
                    continue;
                }

                // 只生成主节点文件，其它节点通过copy模式下发
                FileUtils.copyDirectiory(sourcePath, targetPath);

                Map<String, Object> map = new HashMap();
                // 修改 hdoop_conf/core-site.xml start -----------------------
                String core_site = targetPath + "hadoop_conf/core-site.xml";
                // 获取文件内容
                String content = FileUtils.readFile(core_site);

                map.put("fs_defaultFS", hbaseObj.get("fs_defaultFS"));
                map.put("hadoop_home", hbaseObj.get("hadoop_home"));
                map.put("ha_zookeeper_quorum", ha_zookeeper_quorum);

                content = this.processTemplate(content, map);
                System.out.println("core_site: " + content);
                // 修改完内容 写入文件
                FileUtils.writeFile(core_site, content);
                // 修改 hdoop_conf/core-site.xml  end -----------------------

                // 修改 hdoop_conf/hdfs-site.xml start -----------------------
                String hdfs_site = targetPath + "hadoop_conf/hdfs-site.xml";
                // 获取文件内容
                content = FileUtils.readFile(hdfs_site);

                map.put("fs_defaultFS", hbaseObj.get("fs_defaultFS"));
                map.put("hadoop_home", hbaseObj.get("hadoop_home"));
                map.put("dfs_ha_namenodes_asda", dfs_ha_namenodes_asda);
                map.put("dfs_namenode_address", dfs_namenode_address.toString());
                map.put("dfs_journalnode_shared", dfs_journalnode_shared);

                content = this.processTemplate(content, map);
                System.out.println("hdfs_site: " + content);
                // 修改完内容 写入文件
                FileUtils.writeFile(hdfs_site, content);
                // 修改 hdoop_conf/hdfs-site.xml  end -----------------------


                // 修改 hdoop_conf/yarn-site.xml start -----------------------
                map.clear();
                String yarn_site = targetPath + "hadoop_conf/yarn-site.xml";
                // 获取文件内容
                content = FileUtils.readFile(yarn_site);

                map.put("yarn_resourcemanager_cluster_id", hbaseObj.get("yarn_resourcemanager_cluster_id"));


                map.put("hadoop_home", hbaseObj.get("hadoop_home"));
                map.put("ha_zookeeper_quorum", ha_zookeeper_quorum.toString());
                map.put("yarn_resourcemanager_hostname", yarn_resourcemanager_hostname.toString());
                map.put("yarn_resourcemanager_ids", yarn_resourcemanager_ids);

                content = this.processTemplate(content, map);
                System.out.println("yarn_site: " + content);
                // 修改完内容 写入文件
                FileUtils.writeFile(yarn_site, content);
                // 修改 hdoop_conf/yarn-site.xml  end -----------------------


                // 修改 hdoop_conf/slaves start -----------------------
                map.clear();
                String slaves = targetPath + "hadoop_conf/slaves";
                // 获取文件内容
                content = FileUtils.readFile(slaves);
                map.put("slaves_ip", slaves_ip.toString());

                content = this.processTemplate(content, map);
                System.out.println("slaves: " + content);
                // 修改完内容 写入文件
                FileUtils.writeFile(slaves, content);
                // 修改 hdoop_conf/slaves  end -----------------------


                // 修改 hbase_conf/hbase-site.xml start -----------------------
                map.clear();
                String hbase_site = targetPath + "hbase_conf/hbase-site.xml";
                // 获取文件内容
                content = FileUtils.readFile(hbase_site);
                map.put("fs_defaultFS", hbaseObj.get("fs_defaultFS"));
                map.put("hadoop_home", hbaseObj.get("hadoop_home"));
                map.put("hbase_zookeeper_quorum", hbase_zookeeper_quorum.toString());
                map.put("zookeeper_clientPort", zookeeper_clientPort);

                content = this.processTemplate(content, map);
                System.out.println("hbase_site: " + content);
                // 修改完内容 写入文件
                FileUtils.writeFile(hbase_site, content);
                // 修改 hbase_conf/hbase-site.xml  end -----------------------


                // 修改 hbase_conf/regionservers start -----------------------
                map.clear();
                String regionservers = targetPath + "hbase_conf/regionservers";
                // 获取文件内容
                content = FileUtils.readFile(regionservers);
                map.put("regionservers", regionservers_ip.toString());

                content = this.processTemplate(content, map);
                System.out.println("regionservers: " + content);
                // 修改完内容 写入文件
                FileUtils.writeFile(regionservers, content);
                // 修改 hbase_conf/regionservers  end -----------------------


                // 修改 hbase_conf/backup-masters start -----------------------
                map.clear();
                String backup_masters = targetPath + "hbase_conf/backup-masters";
                // 获取文件内容
                content = FileUtils.readFile(backup_masters);
                map.put("masters_ip", masters_ip.toString());

                content = this.processTemplate(content, map);
                System.out.println("backup_masters: " + content);
                // 修改完内容 写入文件
                FileUtils.writeFile(backup_masters, content);
                // 修改 hbase_conf/regionservers  end -----------------------

            }
        }
        System.out.println("gen hbase end");
    }


    /**
     * 查询文件内容
     *
     * @return
     */
    public String getFileData() {
        try {

            JSONObject object = getFileContent(fileName);
//            System.out.println(JSONObject.toJSONString(object));
            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", object));
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 查询文件内容
     *
     * @return
     */
    public String getFileDataById() {
        try {

            JSONObject object = getInfoById(fileName, id);
//            System.out.println(JSONObject.toJSONString(object));
            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", object));
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 保存文件
     *
     * @return
     */
    public String saveFileData() {
        try {

            String fileNameAll = classesPath + "configData/" + fileName + ".json";

            System.out.println(fileNameAll);
            System.out.println(fileContent);

            FileUtils.writeFile(fileNameAll, fileContent);

            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", true));
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 功能说明：获取服务器配置
     *
     * @return
     */
    public String getServerConfig() {
        try {

//            FileUtils.delFolder(classesPath + "\\outConfig\\");

//            genJava();
//            genZookeeper();
//            genStorm();
//            genMysql();
//            genEs();
//            genKafka();
//            genHbase();


            JSONArray array = getListByFileName(DataFileName.serverConfig.name());
            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", array));
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }


    /**
     * 功能说明：获取服务器配置
     *
     * @return
     */
    public String install() {
        try {

            FileUtils.delFolder(classesPath + "/outConfig/");

            genJava();
            genZookeeper();
            genStorm();
            genMysql();
            genEs();
            genKafka();
            genHbase();

            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", true));
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileContent() {
        return fileContent;
    }

    public void setFileContent(String fileContent) {
        this.fileContent = fileContent;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
