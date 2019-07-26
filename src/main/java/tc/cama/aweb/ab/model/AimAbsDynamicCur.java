package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abs_dynamic_cur")
public class AimAbsDynamicCur implements Serializable {
/**
 *记录id
*/
@Column(name = "id")
private Integer id;
/**
 *对象id
*/
@Column(name = "mobj_id")
private Integer mobjId;
/**
 *记录时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "record_time")
private Date recordTime;
/**
 *代理名称
*/
@Column(name = "agrent_name")
private String agrentName;
/**
 *暂没有用，默认为空
*/
@Column(name = "in_channel")
private String inChannel;
/**
 *采集时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "sample_time")
private Date sampleTime;
/**
 *，暂没有用，默认为空
*/
@Column(name = "app_id")
private Integer appId;
/**
 *，暂没有用，默认为空
*/
@Column(name = "server_id")
private Integer serverId;
/**
 *，暂没有用，默认为空
*/
@Column(name = "service_id")
private Integer serviceId;
/**
 *服务器日期
*/
@Column(name = "srv_server_date")
private String srvServerDate;
/**
 *服务器时间
*/
@Column(name = "srv_server_time")
private String srvServerTime;
/**
 *ip
*/
@Column(name = "srv_ip")
private String srvIp;
/**
 *代理名称
*/
@Column(name = "srv_agentname")
private String srvAgentname;
/**
 *agent响应日期
*/
@Column(name = "srv_agent_date")
private String srvAgentDate;
/**
 *agent响应时间
*/
@Column(name = "srv_agent_time")
private String srvAgentTime;
@Column(name = "jvmdtl_config1")
private String jvmdtlConfig1;
@Column(name = "jvmdtl_config2")
private String jvmdtlConfig2;
@Column(name = "jvmdtl_config3")
private String jvmdtlConfig3;
/**
 *最小堆使用比例
*/
@Column(name = "jvmdtl_config_minheapfreeratio")
private String jvmdtlConfigMinheapfreeratio;
/**
 *最大堆可用比例
*/
@Column(name = "jvmdtl_config_maxheapfreeratio")
private String jvmdtlConfigMaxheapfreeratio;
/**
 *最大堆空间大小
*/
@Column(name = "jvmdtl_config_maxheapsize")
private String jvmdtlConfigMaxheapsize;
/**
 *新生代分配大小
*/
@Column(name = "jvmdtl_config_newsize")
private String jvmdtlConfigNewsize;
/**
 *最大可新生代分配大
*/
@Column(name = "jvmdtl_config_maxnewsize")
private String jvmdtlConfigMaxnewsize;
/**
 *老年代大小
*/
@Column(name = "jvmdtl_config_oldsize")
private String jvmdtlConfigOldsize;
/**
 *新生代比例
*/
@Column(name = "jvmdtl_config_newratio")
private String jvmdtlConfigNewratio;
/**
 *新生代与suvivor的比
*/
@Column(name = "jvmdtl_config_survivorratio")
private String jvmdtlConfigSurvivorratio;
/**
 *perm区大小
*/
@Column(name = "jvmdtl_config_permsize")
private String jvmdtlConfigPermsize;
/**
 *最大可分配perm区大
*/
@Column(name = "jvmdtl_config_maxpermsize")
private String jvmdtlConfigMaxpermsize;
/**
 *新生代容量
*/
@Column(name = "jvmdtl_newgeneration_capacity")
private String jvmdtlNewgenerationCapacity;
/**
 *已使用
*/
@Column(name = "jvmdtl_newgeneration_used")
private String jvmdtlNewgenerationUsed;
/**
 *剩余容量
*/
@Column(name = "jvmdtl_newgeneration_free")
private String jvmdtlNewgenerationFree;
/**
 *使用比例
*/
@Column(name = "jvmdtl_newgeneration_ratio")
private String jvmdtlNewgenerationRatio;
/**
 *伊甸区容量
*/
@Column(name = "jvmdtl_edenspace_capacity")
private String jvmdtlEdenspaceCapacity;
/**
 *已使用
*/
@Column(name = "jvmdtl_edenspace_used")
private String jvmdtlEdenspaceUsed;
/**
 *剩余容量
*/
@Column(name = "jvmdtl_edenspace_free")
private String jvmdtlEdenspaceFree;
/**
 *使用比例
*/
@Column(name = "jvmdtl_edenspace_ratio")
private String jvmdtlEdenspaceRatio;
/**
 *survior1区容量
*/
@Column(name = "jvmdtl_fromspace_capacity")
private String jvmdtlFromspaceCapacity;
/**
 *survior1区已使用
*/
@Column(name = "jvmdtl_fromspace_used")
private String jvmdtlFromspaceUsed;
/**
 *survior1区剩余容量
*/
@Column(name = "jvmdtl_fromspace_free")
private String jvmdtlFromspaceFree;
/**
 *survior1区使用比例
*/
@Column(name = "jvmdtl_fromspace_ratio")
private String jvmdtlFromspaceRatio;
/**
 *survior2区容量
*/
@Column(name = "jvmdtl_tospace_capacity")
private String jvmdtlTospaceCapacity;
/**
 *survior2区已使用
*/
@Column(name = "jvmdtl_tospace_used")
private String jvmdtlTospaceUsed;
/**
 *survior2区剩余容量
*/
@Column(name = "jvmdtl_tospace_free")
private String jvmdtlTospaceFree;
/**
 *survior2区使用比例
*/
@Column(name = "jvmdtl_tospace_ratio")
private String jvmdtlTospaceRatio;
/**
 *老生代容量
*/
@Column(name = "jvmdtl_congeneration_capacity")
private String jvmdtlCongenerationCapacity;
/**
 *老生代已使用
*/
@Column(name = "jvmdtl_congeneration_used")
private String jvmdtlCongenerationUsed;
/**
 *老生代剩余容量
*/
@Column(name = "jvmdtl_congeneration_free")
private String jvmdtlCongenerationFree;
/**
 *老生代使用比例
*/
@Column(name = "jvmdtl_congeneration_ratio")
private String jvmdtlCongenerationRatio;
/**
 *perm区容量
*/
@Column(name = "jvmdtl_permgeneration_capacity")
private String jvmdtlPermgenerationCapacity;
/**
 *perm区已使用
*/
@Column(name = "jvmdtl_permgeneration_used")
private String jvmdtlPermgenerationUsed;
/**
 *perm区剩余容量
*/
@Column(name = "jvmdtl_permgeneration_free")
private String jvmdtlPermgenerationFree;
/**
 *perm区使用比例
*/
@Column(name = "jvmdtl_permgeneration_ratio")
private String jvmdtlPermgenerationRatio;
/**
 *Survivor区
*/
@Column(name = "jvminfo_s0")
private String jvminfoS0;
/**
 *Survivor区
*/
@Column(name = "jvminfo_s1")
private String jvminfoS1;
/**
 *Eden 区
*/
@Column(name = "jvminfo_e")
private String jvminfoE;
/**
 *老年代
*/
@Column(name = "jvminfo_o")
private String jvminfoO;
/**
 *永久代
*/
@Column(name = "jvminfo_p")
private String jvminfoP;
/**
 *Minor GC
*/
@Column(name = "jvminfo_ygc")
private String jvminfoYgc;
/**
 *Minor GC耗时
*/
@Column(name = "jvminfo_ygct")
private String jvminfoYgct;
/**
 *Full GC
*/
@Column(name = "jvminfo_fgc")
private String jvminfoFgc;
/**
 *Full GC耗时
*/
@Column(name = "jvminfo_fgct")
private String jvminfoFgct;
/**
 *Minor & Full GC共计耗时
*/
@Column(name = "jvminfo_gct")
private String jvminfoGct;
/**
 *活动线程
*/
@Column(name = "thread_livecount")
private String threadLivecount;
/**
 *启动线程
*/
@Column(name = "thread_startcount")
private String threadStartcount;
/**
 *守护线程
*/
@Column(name = "thread_daemoncount")
private String threadDaemoncount;
/**
 *加载类数量
*/
@Column(name = "class_allloadcount")
private String classAllloadcount;
/**
 *已经加载类
*/
@Column(name = "class_loadcount")
private String classLoadcount;
/**
 *还未加载类
*/
@Column(name = "class_unloadcount")
private String classUnloadcount;
/**
 *平均检出时间
*/
@Column(name = "jdbc_averagecheckouttime")
private String jdbcAveragecheckouttime;
/**
 *过期平均检出时间
*/
@Column(name = "jdbc_averageoverduecheckouttime")
private String jdbcAverageoverduecheckouttime;
/**
 *平均响应时间
*/
@Column(name = "jdbc_averagerequesttime")
private String jdbcAveragerequesttime;
/**
 *存储平均等待时间
*/
@Column(name = "jdbc_averagewaitbuckettime")
private String jdbcAveragewaitbuckettime;
/**
 *平均等待时间
*/
@Column(name = "jdbc_averagewaittime")
private String jdbcAveragewaittime;
/**
 *错误连接数
*/
@Column(name = "jdbc_badconnectioncount")
private String jdbcBadconnectioncount;
/**
 *声明过期连接数
*/
@Column(name = "jdbc_claimedoverdueconnectioncount")
private String jdbcClaimedoverdueconnectioncount;
/**
 *当前活动数
*/
@Column(name = "jdbc_connectioncount")
private String jdbcConnectioncount;
/**
 *等待率
*/
@Column(name = "jdbc_hadtowaitrate")
private String jdbcHadtowaitrate;
/**
 *IDLE数
*/
@Column(name = "jdbc_idlecount")
private String jdbcIdlecount;
/**
 *连接驱动
*/
@Column(name = "jdbc_driver")
private String jdbcDriver;
/**
 *最大空闲连接
*/
@Column(name = "jdbc_poolmaximumidleconnections")
private String jdbcPoolmaximumidleconnections;
/**
 *最大连接数
*/
@Column(name = "jdbc_poolmaximumconnections")
private String jdbcPoolmaximumconnections;
/**
 *等待时间
*/
@Column(name = "jdbc_waittime")
private String jdbcWaittime;
/**
 *应答数
*/
@Column(name = "jdbc_requestcount")
private String jdbcRequestcount;
/**
 *等待存储大小
*/
@Column(name = "jdbc_waitbucketqueuesize")
private String jdbcWaitbucketqueuesize;
/**
 *最大空闲时间
*/
@Column(name = "jdbc_pooldropconnectionsnotusedfor")
private String jdbcPooldropconnectionsnotusedfor;
/**
 *最大等待时间
*/
@Column(name = "jdbc_pooltimetowait")
private String jdbcPooltimetowait;
/**
 *数据库链接密码
*/
@Column(name = "jdbc_password")
private String jdbcPassword;
/**
 *数据库连接URL
*/
@Column(name = "jdbc_url")
private String jdbcUrl;
/**
 *用户名
*/
@Column(name = "jdbc_username")
private String jdbcUsername;
@Column(name = "jdbc_localrequestrate")
private String jdbcLocalrequestrate;
/**
 *建立连接超时时间
*/
@Column(name = "jdbc_logintimeout")
private String jdbcLogintimeout;
@Column(name = "jdbc_operationthreadcount")
private String jdbcOperationthreadcount;
@Column(name = "jdbc_poolmaximumcheckouttime")
private String jdbcPoolmaximumcheckouttime;
@Column(name = "jdbc_poolpingconnectionsnotusedfor")
private String jdbcPoolpingconnectionsnotusedfor;
/**
 *申请数据库连接时是否检查
*/
@Column(name = "jdbc_poolpingenabled")
private String jdbcPoolpingenabled;
/**
 *非heap最大值
*/
@Column(name = "mem_nonheapmax")
private String memNonheapmax;
/**
 *heap已使用
*/
@Column(name = "mem_heapused")
private String memHeapused;
/**
 *非heap初始化
*/
@Column(name = "mem_nonheapinit")
private String memNonheapinit;
/**
 *heap已提交
*/
@Column(name = "mem_heapcommited")
private String memHeapcommited;
/**
 *heap初始化
*/
@Column(name = "mem_heapinit")
private String memHeapinit;
/**
 *heap最大值
*/
@Column(name = "mem_heapmax")
private String memHeapmax;
/**
 *非heap已提交
*/
@Column(name = "mem_nonheapcommited")
private String memNonheapcommited;
/**
 *非heap已使用
*/
@Column(name = "mem_nonheapused")
private String memNonheapused;
/**
 *jvm内存
*/
@Column(name = "jvm_totalmem")
private String jvmTotalmem;
/**
 *服务状态
*/
@Column(name = "run_status")
private String runStatus;
/**
 *客户端连接数
*/
@Column(name = "run_connections")
private String runConnections;
/**
 *空闲处理器
*/
@Column(name = "run_availableprocessors")
private String runAvailableprocessors;
/**
 *JVM空闲内存
*/
@Column(name = "run_freememory")
private String runFreememory;
/**
 *日志更新时间
*/
@Column(name = "run_loginterval")
private String runLoginterval;
/**
 *JVM最大可用内存
*/
@Column(name = "run_maxmem")
private String runMaxmem;
/**
 *JVM目前占用内存
*/
@Column(name = "run_usemem")
private String runUsemem;
/**
 *最大内存
*/
@Column(name = "os_mem")
private String osMem;
/**
 *服务运行时间
*/
@Column(name = "run_runingtime")
private String runRuningtime;
/**
 *活动线程数
*/
@Column(name = "threadpool_activecount")
private String threadpoolActivecount;
/**
 *完成任务数
*/
@Column(name = "threadpool_completedtaskcount")
private String threadpoolCompletedtaskcount;
/**
 *核心线程数
*/
@Column(name = "threadpool_coresize")
private String threadpoolCoresize;
/**
 *最大线程池数
*/
@Column(name = "threadpool_maxpoolsize")
private String threadpoolMaxpoolsize;
/**
 *最大线程数
*/
@Column(name = "threadpool_maxsize")
private String threadpoolMaxsize;
/**
 *线程池大小
*/
@Column(name = "threadpool_size")
private String threadpoolSize;
/**
 *任务数汇总
*/
@Column(name = "threadpool_taskcount")
private String threadpoolTaskcount;
/**
 *是否关闭
*/
@Column(name = "threadpool_isclose")
private String threadpoolIsclose;
/**
 *是否已经终止
*/
@Column(name = "threadpool_isstop_")
private String threadpoolIsstop;
/**
 *是否终止
*/
@Column(name = "threadpool_terminating")
private String threadpoolTerminating;
/**
 *任务平均处理时间
*/
@Column(name = "task_averagetasktime")
private String taskAveragetasktime;
/**
 *任务平均每秒处理数
*/
@Column(name = "task_averagetaskspersecond")
private String taskAveragetaskspersecond;
/**
 *完成任务数
*/
@Column(name = "task_completedtasks")
private String taskCompletedtasks;
/**
 *平均间隔时间
*/
@Column(name = "task_computeaverageinterval")
private String taskComputeaverageinterval;
/**
 *当前运行数
*/
@Column(name = "task_runningtasks")
private String taskRunningtasks;
/**
 *物理内存总量
*/
@Column(name = "physicmemtotal")
private String physicmemtotal;
/**
 *物理内存使用
*/
@Column(name = "physicmemused")
private String physicmemused;
/**
 *端口
*/
@Column(name = "port")
private String port;
/**
 *进程号
*/
@Column(name = "pid")
private String pid;
/**
 *备注1: 备用字段1
*/
@Column(name = "inst_note1")
private String instNote1;
/**
 *备注2: 备用字段2
*/
@Column(name = "inst_note2")
private String instNote2;
/**
 *备注3: 备用字段3
*/
@Column(name = "inst_note3")
private String instNote3;
/**
 *@return 记录id
*/
public Integer getId(){return this.id;}
/**
 *@param id 记录id
*/
@Column(name = "id")
public void setId(Integer id) {this.id = id;}
/**
 *@return 对象id
*/
public Integer getMobjId(){return this.mobjId;}
/**
 *@param mobjId 对象id
*/
@Column(name = "mobj_id")
public void setMobjId(Integer mobjId) {this.mobjId = mobjId;}
/**
 *@return 记录时间
*/
public Date getRecordTime(){return this.recordTime;}
/**
 *@param recordTime 记录时间
*/
@Column(name = "record_time")
public void setRecordTime(Date recordTime) {this.recordTime = recordTime;}
/**
 *@return 代理名称
*/
public String getAgrentName(){return this.agrentName;}
/**
 *@param agrentName 代理名称
*/
@Column(name = "agrent_name")
public void setAgrentName(String agrentName) {this.agrentName = agrentName;}
/**
 *@return 暂没有用，默认为空
*/
public String getInChannel(){return this.inChannel;}
/**
 *@param inChannel 暂没有用，默认为空
*/
@Column(name = "in_channel")
public void setInChannel(String inChannel) {this.inChannel = inChannel;}
/**
 *@return 采集时间
*/
public Date getSampleTime(){return this.sampleTime;}
/**
 *@param sampleTime 采集时间
*/
@Column(name = "sample_time")
public void setSampleTime(Date sampleTime) {this.sampleTime = sampleTime;}
/**
 *@return ，暂没有用，默认为空
*/
public Integer getAppId(){return this.appId;}
/**
 *@param appId ，暂没有用，默认为空
*/
@Column(name = "app_id")
public void setAppId(Integer appId) {this.appId = appId;}
/**
 *@return ，暂没有用，默认为空
*/
public Integer getServerId(){return this.serverId;}
/**
 *@param serverId ，暂没有用，默认为空
*/
@Column(name = "server_id")
public void setServerId(Integer serverId) {this.serverId = serverId;}
/**
 *@return ，暂没有用，默认为空
*/
public Integer getServiceId(){return this.serviceId;}
/**
 *@param serviceId ，暂没有用，默认为空
*/
@Column(name = "service_id")
public void setServiceId(Integer serviceId) {this.serviceId = serviceId;}
/**
 *@return 服务器日期
*/
public String getSrvServerDate(){return this.srvServerDate;}
/**
 *@param srvServerDate 服务器日期
*/
@Column(name = "srv_server_date")
public void setSrvServerDate(String srvServerDate) {this.srvServerDate = srvServerDate;}
/**
 *@return 服务器时间
*/
public String getSrvServerTime(){return this.srvServerTime;}
/**
 *@param srvServerTime 服务器时间
*/
@Column(name = "srv_server_time")
public void setSrvServerTime(String srvServerTime) {this.srvServerTime = srvServerTime;}
/**
 *@return ip
*/
public String getSrvIp(){return this.srvIp;}
/**
 *@param srvIp ip
*/
@Column(name = "srv_ip")
public void setSrvIp(String srvIp) {this.srvIp = srvIp;}
/**
 *@return 代理名称
*/
public String getSrvAgentname(){return this.srvAgentname;}
/**
 *@param srvAgentname 代理名称
*/
@Column(name = "srv_agentname")
public void setSrvAgentname(String srvAgentname) {this.srvAgentname = srvAgentname;}
/**
 *@return agent响应日期
*/
public String getSrvAgentDate(){return this.srvAgentDate;}
/**
 *@param srvAgentDate agent响应日期
*/
@Column(name = "srv_agent_date")
public void setSrvAgentDate(String srvAgentDate) {this.srvAgentDate = srvAgentDate;}
/**
 *@return agent响应时间
*/
public String getSrvAgentTime(){return this.srvAgentTime;}
/**
 *@param srvAgentTime agent响应时间
*/
@Column(name = "srv_agent_time")
public void setSrvAgentTime(String srvAgentTime) {this.srvAgentTime = srvAgentTime;}
/**
 *@return %s
*/
public String getJvmdtlConfig1(){return this.jvmdtlConfig1;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setJvmdtlConfig1(String jvmdtlConfig1) {this.jvmdtlConfig1 = jvmdtlConfig1;}
/**
 *@return %s
*/
public String getJvmdtlConfig2(){return this.jvmdtlConfig2;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setJvmdtlConfig2(String jvmdtlConfig2) {this.jvmdtlConfig2 = jvmdtlConfig2;}
/**
 *@return %s
*/
public String getJvmdtlConfig3(){return this.jvmdtlConfig3;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setJvmdtlConfig3(String jvmdtlConfig3) {this.jvmdtlConfig3 = jvmdtlConfig3;}
/**
 *@return 最小堆使用比例
*/
public String getJvmdtlConfigMinheapfreeratio(){return this.jvmdtlConfigMinheapfreeratio;}
/**
 *@param jvmdtlConfigMinheapfreeratio 最小堆使用比例
*/
@Column(name = "jvmdtl_config_minheapfreeratio")
public void setJvmdtlConfigMinheapfreeratio(String jvmdtlConfigMinheapfreeratio) {this.jvmdtlConfigMinheapfreeratio = jvmdtlConfigMinheapfreeratio;}
/**
 *@return 最大堆可用比例
*/
public String getJvmdtlConfigMaxheapfreeratio(){return this.jvmdtlConfigMaxheapfreeratio;}
/**
 *@param jvmdtlConfigMaxheapfreeratio 最大堆可用比例
*/
@Column(name = "jvmdtl_config_maxheapfreeratio")
public void setJvmdtlConfigMaxheapfreeratio(String jvmdtlConfigMaxheapfreeratio) {this.jvmdtlConfigMaxheapfreeratio = jvmdtlConfigMaxheapfreeratio;}
/**
 *@return 最大堆空间大小
*/
public String getJvmdtlConfigMaxheapsize(){return this.jvmdtlConfigMaxheapsize;}
/**
 *@param jvmdtlConfigMaxheapsize 最大堆空间大小
*/
@Column(name = "jvmdtl_config_maxheapsize")
public void setJvmdtlConfigMaxheapsize(String jvmdtlConfigMaxheapsize) {this.jvmdtlConfigMaxheapsize = jvmdtlConfigMaxheapsize;}
/**
 *@return 新生代分配大小
*/
public String getJvmdtlConfigNewsize(){return this.jvmdtlConfigNewsize;}
/**
 *@param jvmdtlConfigNewsize 新生代分配大小
*/
@Column(name = "jvmdtl_config_newsize")
public void setJvmdtlConfigNewsize(String jvmdtlConfigNewsize) {this.jvmdtlConfigNewsize = jvmdtlConfigNewsize;}
/**
 *@return 最大可新生代分配大
*/
public String getJvmdtlConfigMaxnewsize(){return this.jvmdtlConfigMaxnewsize;}
/**
 *@param jvmdtlConfigMaxnewsize 最大可新生代分配大
*/
@Column(name = "jvmdtl_config_maxnewsize")
public void setJvmdtlConfigMaxnewsize(String jvmdtlConfigMaxnewsize) {this.jvmdtlConfigMaxnewsize = jvmdtlConfigMaxnewsize;}
/**
 *@return 老年代大小
*/
public String getJvmdtlConfigOldsize(){return this.jvmdtlConfigOldsize;}
/**
 *@param jvmdtlConfigOldsize 老年代大小
*/
@Column(name = "jvmdtl_config_oldsize")
public void setJvmdtlConfigOldsize(String jvmdtlConfigOldsize) {this.jvmdtlConfigOldsize = jvmdtlConfigOldsize;}
/**
 *@return 新生代比例
*/
public String getJvmdtlConfigNewratio(){return this.jvmdtlConfigNewratio;}
/**
 *@param jvmdtlConfigNewratio 新生代比例
*/
@Column(name = "jvmdtl_config_newratio")
public void setJvmdtlConfigNewratio(String jvmdtlConfigNewratio) {this.jvmdtlConfigNewratio = jvmdtlConfigNewratio;}
/**
 *@return 新生代与suvivor的比
*/
public String getJvmdtlConfigSurvivorratio(){return this.jvmdtlConfigSurvivorratio;}
/**
 *@param jvmdtlConfigSurvivorratio 新生代与suvivor的比
*/
@Column(name = "jvmdtl_config_survivorratio")
public void setJvmdtlConfigSurvivorratio(String jvmdtlConfigSurvivorratio) {this.jvmdtlConfigSurvivorratio = jvmdtlConfigSurvivorratio;}
/**
 *@return perm区大小
*/
public String getJvmdtlConfigPermsize(){return this.jvmdtlConfigPermsize;}
/**
 *@param jvmdtlConfigPermsize perm区大小
*/
@Column(name = "jvmdtl_config_permsize")
public void setJvmdtlConfigPermsize(String jvmdtlConfigPermsize) {this.jvmdtlConfigPermsize = jvmdtlConfigPermsize;}
/**
 *@return 最大可分配perm区大
*/
public String getJvmdtlConfigMaxpermsize(){return this.jvmdtlConfigMaxpermsize;}
/**
 *@param jvmdtlConfigMaxpermsize 最大可分配perm区大
*/
@Column(name = "jvmdtl_config_maxpermsize")
public void setJvmdtlConfigMaxpermsize(String jvmdtlConfigMaxpermsize) {this.jvmdtlConfigMaxpermsize = jvmdtlConfigMaxpermsize;}
/**
 *@return 新生代容量
*/
public String getJvmdtlNewgenerationCapacity(){return this.jvmdtlNewgenerationCapacity;}
/**
 *@param jvmdtlNewgenerationCapacity 新生代容量
*/
@Column(name = "jvmdtl_newgeneration_capacity")
public void setJvmdtlNewgenerationCapacity(String jvmdtlNewgenerationCapacity) {this.jvmdtlNewgenerationCapacity = jvmdtlNewgenerationCapacity;}
/**
 *@return 已使用
*/
public String getJvmdtlNewgenerationUsed(){return this.jvmdtlNewgenerationUsed;}
/**
 *@param jvmdtlNewgenerationUsed 已使用
*/
@Column(name = "jvmdtl_newgeneration_used")
public void setJvmdtlNewgenerationUsed(String jvmdtlNewgenerationUsed) {this.jvmdtlNewgenerationUsed = jvmdtlNewgenerationUsed;}
/**
 *@return 剩余容量
*/
public String getJvmdtlNewgenerationFree(){return this.jvmdtlNewgenerationFree;}
/**
 *@param jvmdtlNewgenerationFree 剩余容量
*/
@Column(name = "jvmdtl_newgeneration_free")
public void setJvmdtlNewgenerationFree(String jvmdtlNewgenerationFree) {this.jvmdtlNewgenerationFree = jvmdtlNewgenerationFree;}
/**
 *@return 使用比例
*/
public String getJvmdtlNewgenerationRatio(){return this.jvmdtlNewgenerationRatio;}
/**
 *@param jvmdtlNewgenerationRatio 使用比例
*/
@Column(name = "jvmdtl_newgeneration_ratio")
public void setJvmdtlNewgenerationRatio(String jvmdtlNewgenerationRatio) {this.jvmdtlNewgenerationRatio = jvmdtlNewgenerationRatio;}
/**
 *@return 伊甸区容量
*/
public String getJvmdtlEdenspaceCapacity(){return this.jvmdtlEdenspaceCapacity;}
/**
 *@param jvmdtlEdenspaceCapacity 伊甸区容量
*/
@Column(name = "jvmdtl_edenspace_capacity")
public void setJvmdtlEdenspaceCapacity(String jvmdtlEdenspaceCapacity) {this.jvmdtlEdenspaceCapacity = jvmdtlEdenspaceCapacity;}
/**
 *@return 已使用
*/
public String getJvmdtlEdenspaceUsed(){return this.jvmdtlEdenspaceUsed;}
/**
 *@param jvmdtlEdenspaceUsed 已使用
*/
@Column(name = "jvmdtl_edenspace_used")
public void setJvmdtlEdenspaceUsed(String jvmdtlEdenspaceUsed) {this.jvmdtlEdenspaceUsed = jvmdtlEdenspaceUsed;}
/**
 *@return 剩余容量
*/
public String getJvmdtlEdenspaceFree(){return this.jvmdtlEdenspaceFree;}
/**
 *@param jvmdtlEdenspaceFree 剩余容量
*/
@Column(name = "jvmdtl_edenspace_free")
public void setJvmdtlEdenspaceFree(String jvmdtlEdenspaceFree) {this.jvmdtlEdenspaceFree = jvmdtlEdenspaceFree;}
/**
 *@return 使用比例
*/
public String getJvmdtlEdenspaceRatio(){return this.jvmdtlEdenspaceRatio;}
/**
 *@param jvmdtlEdenspaceRatio 使用比例
*/
@Column(name = "jvmdtl_edenspace_ratio")
public void setJvmdtlEdenspaceRatio(String jvmdtlEdenspaceRatio) {this.jvmdtlEdenspaceRatio = jvmdtlEdenspaceRatio;}
/**
 *@return survior1区容量
*/
public String getJvmdtlFromspaceCapacity(){return this.jvmdtlFromspaceCapacity;}
/**
 *@param jvmdtlFromspaceCapacity survior1区容量
*/
@Column(name = "jvmdtl_fromspace_capacity")
public void setJvmdtlFromspaceCapacity(String jvmdtlFromspaceCapacity) {this.jvmdtlFromspaceCapacity = jvmdtlFromspaceCapacity;}
/**
 *@return survior1区已使用
*/
public String getJvmdtlFromspaceUsed(){return this.jvmdtlFromspaceUsed;}
/**
 *@param jvmdtlFromspaceUsed survior1区已使用
*/
@Column(name = "jvmdtl_fromspace_used")
public void setJvmdtlFromspaceUsed(String jvmdtlFromspaceUsed) {this.jvmdtlFromspaceUsed = jvmdtlFromspaceUsed;}
/**
 *@return survior1区剩余容量
*/
public String getJvmdtlFromspaceFree(){return this.jvmdtlFromspaceFree;}
/**
 *@param jvmdtlFromspaceFree survior1区剩余容量
*/
@Column(name = "jvmdtl_fromspace_free")
public void setJvmdtlFromspaceFree(String jvmdtlFromspaceFree) {this.jvmdtlFromspaceFree = jvmdtlFromspaceFree;}
/**
 *@return survior1区使用比例
*/
public String getJvmdtlFromspaceRatio(){return this.jvmdtlFromspaceRatio;}
/**
 *@param jvmdtlFromspaceRatio survior1区使用比例
*/
@Column(name = "jvmdtl_fromspace_ratio")
public void setJvmdtlFromspaceRatio(String jvmdtlFromspaceRatio) {this.jvmdtlFromspaceRatio = jvmdtlFromspaceRatio;}
/**
 *@return survior2区容量
*/
public String getJvmdtlTospaceCapacity(){return this.jvmdtlTospaceCapacity;}
/**
 *@param jvmdtlTospaceCapacity survior2区容量
*/
@Column(name = "jvmdtl_tospace_capacity")
public void setJvmdtlTospaceCapacity(String jvmdtlTospaceCapacity) {this.jvmdtlTospaceCapacity = jvmdtlTospaceCapacity;}
/**
 *@return survior2区已使用
*/
public String getJvmdtlTospaceUsed(){return this.jvmdtlTospaceUsed;}
/**
 *@param jvmdtlTospaceUsed survior2区已使用
*/
@Column(name = "jvmdtl_tospace_used")
public void setJvmdtlTospaceUsed(String jvmdtlTospaceUsed) {this.jvmdtlTospaceUsed = jvmdtlTospaceUsed;}
/**
 *@return survior2区剩余容量
*/
public String getJvmdtlTospaceFree(){return this.jvmdtlTospaceFree;}
/**
 *@param jvmdtlTospaceFree survior2区剩余容量
*/
@Column(name = "jvmdtl_tospace_free")
public void setJvmdtlTospaceFree(String jvmdtlTospaceFree) {this.jvmdtlTospaceFree = jvmdtlTospaceFree;}
/**
 *@return survior2区使用比例
*/
public String getJvmdtlTospaceRatio(){return this.jvmdtlTospaceRatio;}
/**
 *@param jvmdtlTospaceRatio survior2区使用比例
*/
@Column(name = "jvmdtl_tospace_ratio")
public void setJvmdtlTospaceRatio(String jvmdtlTospaceRatio) {this.jvmdtlTospaceRatio = jvmdtlTospaceRatio;}
/**
 *@return 老生代容量
*/
public String getJvmdtlCongenerationCapacity(){return this.jvmdtlCongenerationCapacity;}
/**
 *@param jvmdtlCongenerationCapacity 老生代容量
*/
@Column(name = "jvmdtl_congeneration_capacity")
public void setJvmdtlCongenerationCapacity(String jvmdtlCongenerationCapacity) {this.jvmdtlCongenerationCapacity = jvmdtlCongenerationCapacity;}
/**
 *@return 老生代已使用
*/
public String getJvmdtlCongenerationUsed(){return this.jvmdtlCongenerationUsed;}
/**
 *@param jvmdtlCongenerationUsed 老生代已使用
*/
@Column(name = "jvmdtl_congeneration_used")
public void setJvmdtlCongenerationUsed(String jvmdtlCongenerationUsed) {this.jvmdtlCongenerationUsed = jvmdtlCongenerationUsed;}
/**
 *@return 老生代剩余容量
*/
public String getJvmdtlCongenerationFree(){return this.jvmdtlCongenerationFree;}
/**
 *@param jvmdtlCongenerationFree 老生代剩余容量
*/
@Column(name = "jvmdtl_congeneration_free")
public void setJvmdtlCongenerationFree(String jvmdtlCongenerationFree) {this.jvmdtlCongenerationFree = jvmdtlCongenerationFree;}
/**
 *@return 老生代使用比例
*/
public String getJvmdtlCongenerationRatio(){return this.jvmdtlCongenerationRatio;}
/**
 *@param jvmdtlCongenerationRatio 老生代使用比例
*/
@Column(name = "jvmdtl_congeneration_ratio")
public void setJvmdtlCongenerationRatio(String jvmdtlCongenerationRatio) {this.jvmdtlCongenerationRatio = jvmdtlCongenerationRatio;}
/**
 *@return perm区容量
*/
public String getJvmdtlPermgenerationCapacity(){return this.jvmdtlPermgenerationCapacity;}
/**
 *@param jvmdtlPermgenerationCapacity perm区容量
*/
@Column(name = "jvmdtl_permgeneration_capacity")
public void setJvmdtlPermgenerationCapacity(String jvmdtlPermgenerationCapacity) {this.jvmdtlPermgenerationCapacity = jvmdtlPermgenerationCapacity;}
/**
 *@return perm区已使用
*/
public String getJvmdtlPermgenerationUsed(){return this.jvmdtlPermgenerationUsed;}
/**
 *@param jvmdtlPermgenerationUsed perm区已使用
*/
@Column(name = "jvmdtl_permgeneration_used")
public void setJvmdtlPermgenerationUsed(String jvmdtlPermgenerationUsed) {this.jvmdtlPermgenerationUsed = jvmdtlPermgenerationUsed;}
/**
 *@return perm区剩余容量
*/
public String getJvmdtlPermgenerationFree(){return this.jvmdtlPermgenerationFree;}
/**
 *@param jvmdtlPermgenerationFree perm区剩余容量
*/
@Column(name = "jvmdtl_permgeneration_free")
public void setJvmdtlPermgenerationFree(String jvmdtlPermgenerationFree) {this.jvmdtlPermgenerationFree = jvmdtlPermgenerationFree;}
/**
 *@return perm区使用比例
*/
public String getJvmdtlPermgenerationRatio(){return this.jvmdtlPermgenerationRatio;}
/**
 *@param jvmdtlPermgenerationRatio perm区使用比例
*/
@Column(name = "jvmdtl_permgeneration_ratio")
public void setJvmdtlPermgenerationRatio(String jvmdtlPermgenerationRatio) {this.jvmdtlPermgenerationRatio = jvmdtlPermgenerationRatio;}
/**
 *@return Survivor区
*/
public String getJvminfoS0(){return this.jvminfoS0;}
/**
 *@param jvminfoS0 Survivor区
*/
@Column(name = "jvminfo_s0")
public void setJvminfoS0(String jvminfoS0) {this.jvminfoS0 = jvminfoS0;}
/**
 *@return Survivor区
*/
public String getJvminfoS1(){return this.jvminfoS1;}
/**
 *@param jvminfoS1 Survivor区
*/
@Column(name = "jvminfo_s1")
public void setJvminfoS1(String jvminfoS1) {this.jvminfoS1 = jvminfoS1;}
/**
 *@return Eden 区
*/
public String getJvminfoE(){return this.jvminfoE;}
/**
 *@param jvminfoE Eden 区
*/
@Column(name = "jvminfo_e")
public void setJvminfoE(String jvminfoE) {this.jvminfoE = jvminfoE;}
/**
 *@return 老年代
*/
public String getJvminfoO(){return this.jvminfoO;}
/**
 *@param jvminfoO 老年代
*/
@Column(name = "jvminfo_o")
public void setJvminfoO(String jvminfoO) {this.jvminfoO = jvminfoO;}
/**
 *@return 永久代
*/
public String getJvminfoP(){return this.jvminfoP;}
/**
 *@param jvminfoP 永久代
*/
@Column(name = "jvminfo_p")
public void setJvminfoP(String jvminfoP) {this.jvminfoP = jvminfoP;}
/**
 *@return Minor GC
*/
public String getJvminfoYgc(){return this.jvminfoYgc;}
/**
 *@param jvminfoYgc Minor GC
*/
@Column(name = "jvminfo_ygc")
public void setJvminfoYgc(String jvminfoYgc) {this.jvminfoYgc = jvminfoYgc;}
/**
 *@return Minor GC耗时
*/
public String getJvminfoYgct(){return this.jvminfoYgct;}
/**
 *@param jvminfoYgct Minor GC耗时
*/
@Column(name = "jvminfo_ygct")
public void setJvminfoYgct(String jvminfoYgct) {this.jvminfoYgct = jvminfoYgct;}
/**
 *@return Full GC
*/
public String getJvminfoFgc(){return this.jvminfoFgc;}
/**
 *@param jvminfoFgc Full GC
*/
@Column(name = "jvminfo_fgc")
public void setJvminfoFgc(String jvminfoFgc) {this.jvminfoFgc = jvminfoFgc;}
/**
 *@return Full GC耗时
*/
public String getJvminfoFgct(){return this.jvminfoFgct;}
/**
 *@param jvminfoFgct Full GC耗时
*/
@Column(name = "jvminfo_fgct")
public void setJvminfoFgct(String jvminfoFgct) {this.jvminfoFgct = jvminfoFgct;}
/**
 *@return Minor & Full GC共计耗时
*/
public String getJvminfoGct(){return this.jvminfoGct;}
/**
 *@param jvminfoGct Minor & Full GC共计耗时
*/
@Column(name = "jvminfo_gct")
public void setJvminfoGct(String jvminfoGct) {this.jvminfoGct = jvminfoGct;}
/**
 *@return 活动线程
*/
public String getThreadLivecount(){return this.threadLivecount;}
/**
 *@param threadLivecount 活动线程
*/
@Column(name = "thread_livecount")
public void setThreadLivecount(String threadLivecount) {this.threadLivecount = threadLivecount;}
/**
 *@return 启动线程
*/
public String getThreadStartcount(){return this.threadStartcount;}
/**
 *@param threadStartcount 启动线程
*/
@Column(name = "thread_startcount")
public void setThreadStartcount(String threadStartcount) {this.threadStartcount = threadStartcount;}
/**
 *@return 守护线程
*/
public String getThreadDaemoncount(){return this.threadDaemoncount;}
/**
 *@param threadDaemoncount 守护线程
*/
@Column(name = "thread_daemoncount")
public void setThreadDaemoncount(String threadDaemoncount) {this.threadDaemoncount = threadDaemoncount;}
/**
 *@return 加载类数量
*/
public String getClassAllloadcount(){return this.classAllloadcount;}
/**
 *@param classAllloadcount 加载类数量
*/
@Column(name = "class_allloadcount")
public void setClassAllloadcount(String classAllloadcount) {this.classAllloadcount = classAllloadcount;}
/**
 *@return 已经加载类
*/
public String getClassLoadcount(){return this.classLoadcount;}
/**
 *@param classLoadcount 已经加载类
*/
@Column(name = "class_loadcount")
public void setClassLoadcount(String classLoadcount) {this.classLoadcount = classLoadcount;}
/**
 *@return 还未加载类
*/
public String getClassUnloadcount(){return this.classUnloadcount;}
/**
 *@param classUnloadcount 还未加载类
*/
@Column(name = "class_unloadcount")
public void setClassUnloadcount(String classUnloadcount) {this.classUnloadcount = classUnloadcount;}
/**
 *@return 平均检出时间
*/
public String getJdbcAveragecheckouttime(){return this.jdbcAveragecheckouttime;}
/**
 *@param jdbcAveragecheckouttime 平均检出时间
*/
@Column(name = "jdbc_averagecheckouttime")
public void setJdbcAveragecheckouttime(String jdbcAveragecheckouttime) {this.jdbcAveragecheckouttime = jdbcAveragecheckouttime;}
/**
 *@return 过期平均检出时间
*/
public String getJdbcAverageoverduecheckouttime(){return this.jdbcAverageoverduecheckouttime;}
/**
 *@param jdbcAverageoverduecheckouttime 过期平均检出时间
*/
@Column(name = "jdbc_averageoverduecheckouttime")
public void setJdbcAverageoverduecheckouttime(String jdbcAverageoverduecheckouttime) {this.jdbcAverageoverduecheckouttime = jdbcAverageoverduecheckouttime;}
/**
 *@return 平均响应时间
*/
public String getJdbcAveragerequesttime(){return this.jdbcAveragerequesttime;}
/**
 *@param jdbcAveragerequesttime 平均响应时间
*/
@Column(name = "jdbc_averagerequesttime")
public void setJdbcAveragerequesttime(String jdbcAveragerequesttime) {this.jdbcAveragerequesttime = jdbcAveragerequesttime;}
/**
 *@return 存储平均等待时间
*/
public String getJdbcAveragewaitbuckettime(){return this.jdbcAveragewaitbuckettime;}
/**
 *@param jdbcAveragewaitbuckettime 存储平均等待时间
*/
@Column(name = "jdbc_averagewaitbuckettime")
public void setJdbcAveragewaitbuckettime(String jdbcAveragewaitbuckettime) {this.jdbcAveragewaitbuckettime = jdbcAveragewaitbuckettime;}
/**
 *@return 平均等待时间
*/
public String getJdbcAveragewaittime(){return this.jdbcAveragewaittime;}
/**
 *@param jdbcAveragewaittime 平均等待时间
*/
@Column(name = "jdbc_averagewaittime")
public void setJdbcAveragewaittime(String jdbcAveragewaittime) {this.jdbcAveragewaittime = jdbcAveragewaittime;}
/**
 *@return 错误连接数
*/
public String getJdbcBadconnectioncount(){return this.jdbcBadconnectioncount;}
/**
 *@param jdbcBadconnectioncount 错误连接数
*/
@Column(name = "jdbc_badconnectioncount")
public void setJdbcBadconnectioncount(String jdbcBadconnectioncount) {this.jdbcBadconnectioncount = jdbcBadconnectioncount;}
/**
 *@return 声明过期连接数
*/
public String getJdbcClaimedoverdueconnectioncount(){return this.jdbcClaimedoverdueconnectioncount;}
/**
 *@param jdbcClaimedoverdueconnectioncount 声明过期连接数
*/
@Column(name = "jdbc_claimedoverdueconnectioncount")
public void setJdbcClaimedoverdueconnectioncount(String jdbcClaimedoverdueconnectioncount) {this.jdbcClaimedoverdueconnectioncount = jdbcClaimedoverdueconnectioncount;}
/**
 *@return 当前活动数
*/
public String getJdbcConnectioncount(){return this.jdbcConnectioncount;}
/**
 *@param jdbcConnectioncount 当前活动数
*/
@Column(name = "jdbc_connectioncount")
public void setJdbcConnectioncount(String jdbcConnectioncount) {this.jdbcConnectioncount = jdbcConnectioncount;}
/**
 *@return 等待率
*/
public String getJdbcHadtowaitrate(){return this.jdbcHadtowaitrate;}
/**
 *@param jdbcHadtowaitrate 等待率
*/
@Column(name = "jdbc_hadtowaitrate")
public void setJdbcHadtowaitrate(String jdbcHadtowaitrate) {this.jdbcHadtowaitrate = jdbcHadtowaitrate;}
/**
 *@return IDLE数
*/
public String getJdbcIdlecount(){return this.jdbcIdlecount;}
/**
 *@param jdbcIdlecount IDLE数
*/
@Column(name = "jdbc_idlecount")
public void setJdbcIdlecount(String jdbcIdlecount) {this.jdbcIdlecount = jdbcIdlecount;}
/**
 *@return 连接驱动
*/
public String getJdbcDriver(){return this.jdbcDriver;}
/**
 *@param jdbcDriver 连接驱动
*/
@Column(name = "jdbc_driver")
public void setJdbcDriver(String jdbcDriver) {this.jdbcDriver = jdbcDriver;}
/**
 *@return 最大空闲连接
*/
public String getJdbcPoolmaximumidleconnections(){return this.jdbcPoolmaximumidleconnections;}
/**
 *@param jdbcPoolmaximumidleconnections 最大空闲连接
*/
@Column(name = "jdbc_poolmaximumidleconnections")
public void setJdbcPoolmaximumidleconnections(String jdbcPoolmaximumidleconnections) {this.jdbcPoolmaximumidleconnections = jdbcPoolmaximumidleconnections;}
/**
 *@return 最大连接数
*/
public String getJdbcPoolmaximumconnections(){return this.jdbcPoolmaximumconnections;}
/**
 *@param jdbcPoolmaximumconnections 最大连接数
*/
@Column(name = "jdbc_poolmaximumconnections")
public void setJdbcPoolmaximumconnections(String jdbcPoolmaximumconnections) {this.jdbcPoolmaximumconnections = jdbcPoolmaximumconnections;}
/**
 *@return 等待时间
*/
public String getJdbcWaittime(){return this.jdbcWaittime;}
/**
 *@param jdbcWaittime 等待时间
*/
@Column(name = "jdbc_waittime")
public void setJdbcWaittime(String jdbcWaittime) {this.jdbcWaittime = jdbcWaittime;}
/**
 *@return 应答数
*/
public String getJdbcRequestcount(){return this.jdbcRequestcount;}
/**
 *@param jdbcRequestcount 应答数
*/
@Column(name = "jdbc_requestcount")
public void setJdbcRequestcount(String jdbcRequestcount) {this.jdbcRequestcount = jdbcRequestcount;}
/**
 *@return 等待存储大小
*/
public String getJdbcWaitbucketqueuesize(){return this.jdbcWaitbucketqueuesize;}
/**
 *@param jdbcWaitbucketqueuesize 等待存储大小
*/
@Column(name = "jdbc_waitbucketqueuesize")
public void setJdbcWaitbucketqueuesize(String jdbcWaitbucketqueuesize) {this.jdbcWaitbucketqueuesize = jdbcWaitbucketqueuesize;}
/**
 *@return 最大空闲时间
*/
public String getJdbcPooldropconnectionsnotusedfor(){return this.jdbcPooldropconnectionsnotusedfor;}
/**
 *@param jdbcPooldropconnectionsnotusedfor 最大空闲时间
*/
@Column(name = "jdbc_pooldropconnectionsnotusedfor")
public void setJdbcPooldropconnectionsnotusedfor(String jdbcPooldropconnectionsnotusedfor) {this.jdbcPooldropconnectionsnotusedfor = jdbcPooldropconnectionsnotusedfor;}
/**
 *@return 最大等待时间
*/
public String getJdbcPooltimetowait(){return this.jdbcPooltimetowait;}
/**
 *@param jdbcPooltimetowait 最大等待时间
*/
@Column(name = "jdbc_pooltimetowait")
public void setJdbcPooltimetowait(String jdbcPooltimetowait) {this.jdbcPooltimetowait = jdbcPooltimetowait;}
/**
 *@return 数据库链接密码
*/
public String getJdbcPassword(){return this.jdbcPassword;}
/**
 *@param jdbcPassword 数据库链接密码
*/
@Column(name = "jdbc_password")
public void setJdbcPassword(String jdbcPassword) {this.jdbcPassword = jdbcPassword;}
/**
 *@return 数据库连接URL
*/
public String getJdbcUrl(){return this.jdbcUrl;}
/**
 *@param jdbcUrl 数据库连接URL
*/
@Column(name = "jdbc_url")
public void setJdbcUrl(String jdbcUrl) {this.jdbcUrl = jdbcUrl;}
/**
 *@return 用户名
*/
public String getJdbcUsername(){return this.jdbcUsername;}
/**
 *@param jdbcUsername 用户名
*/
@Column(name = "jdbc_username")
public void setJdbcUsername(String jdbcUsername) {this.jdbcUsername = jdbcUsername;}
/**
 *@return %s
*/
public String getJdbcLocalrequestrate(){return this.jdbcLocalrequestrate;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setJdbcLocalrequestrate(String jdbcLocalrequestrate) {this.jdbcLocalrequestrate = jdbcLocalrequestrate;}
/**
 *@return 建立连接超时时间
*/
public String getJdbcLogintimeout(){return this.jdbcLogintimeout;}
/**
 *@param jdbcLogintimeout 建立连接超时时间
*/
@Column(name = "jdbc_logintimeout")
public void setJdbcLogintimeout(String jdbcLogintimeout) {this.jdbcLogintimeout = jdbcLogintimeout;}
/**
 *@return %s
*/
public String getJdbcOperationthreadcount(){return this.jdbcOperationthreadcount;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setJdbcOperationthreadcount(String jdbcOperationthreadcount) {this.jdbcOperationthreadcount = jdbcOperationthreadcount;}
/**
 *@return %s
*/
public String getJdbcPoolmaximumcheckouttime(){return this.jdbcPoolmaximumcheckouttime;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setJdbcPoolmaximumcheckouttime(String jdbcPoolmaximumcheckouttime) {this.jdbcPoolmaximumcheckouttime = jdbcPoolmaximumcheckouttime;}
/**
 *@return %s
*/
public String getJdbcPoolpingconnectionsnotusedfor(){return this.jdbcPoolpingconnectionsnotusedfor;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setJdbcPoolpingconnectionsnotusedfor(String jdbcPoolpingconnectionsnotusedfor) {this.jdbcPoolpingconnectionsnotusedfor = jdbcPoolpingconnectionsnotusedfor;}
/**
 *@return 申请数据库连接时是否检查
*/
public String getJdbcPoolpingenabled(){return this.jdbcPoolpingenabled;}
/**
 *@param jdbcPoolpingenabled 申请数据库连接时是否检查
*/
@Column(name = "jdbc_poolpingenabled")
public void setJdbcPoolpingenabled(String jdbcPoolpingenabled) {this.jdbcPoolpingenabled = jdbcPoolpingenabled;}
/**
 *@return 非heap最大值
*/
public String getMemNonheapmax(){return this.memNonheapmax;}
/**
 *@param memNonheapmax 非heap最大值
*/
@Column(name = "mem_nonheapmax")
public void setMemNonheapmax(String memNonheapmax) {this.memNonheapmax = memNonheapmax;}
/**
 *@return heap已使用
*/
public String getMemHeapused(){return this.memHeapused;}
/**
 *@param memHeapused heap已使用
*/
@Column(name = "mem_heapused")
public void setMemHeapused(String memHeapused) {this.memHeapused = memHeapused;}
/**
 *@return 非heap初始化
*/
public String getMemNonheapinit(){return this.memNonheapinit;}
/**
 *@param memNonheapinit 非heap初始化
*/
@Column(name = "mem_nonheapinit")
public void setMemNonheapinit(String memNonheapinit) {this.memNonheapinit = memNonheapinit;}
/**
 *@return heap已提交
*/
public String getMemHeapcommited(){return this.memHeapcommited;}
/**
 *@param memHeapcommited heap已提交
*/
@Column(name = "mem_heapcommited")
public void setMemHeapcommited(String memHeapcommited) {this.memHeapcommited = memHeapcommited;}
/**
 *@return heap初始化
*/
public String getMemHeapinit(){return this.memHeapinit;}
/**
 *@param memHeapinit heap初始化
*/
@Column(name = "mem_heapinit")
public void setMemHeapinit(String memHeapinit) {this.memHeapinit = memHeapinit;}
/**
 *@return heap最大值
*/
public String getMemHeapmax(){return this.memHeapmax;}
/**
 *@param memHeapmax heap最大值
*/
@Column(name = "mem_heapmax")
public void setMemHeapmax(String memHeapmax) {this.memHeapmax = memHeapmax;}
/**
 *@return 非heap已提交
*/
public String getMemNonheapcommited(){return this.memNonheapcommited;}
/**
 *@param memNonheapcommited 非heap已提交
*/
@Column(name = "mem_nonheapcommited")
public void setMemNonheapcommited(String memNonheapcommited) {this.memNonheapcommited = memNonheapcommited;}
/**
 *@return 非heap已使用
*/
public String getMemNonheapused(){return this.memNonheapused;}
/**
 *@param memNonheapused 非heap已使用
*/
@Column(name = "mem_nonheapused")
public void setMemNonheapused(String memNonheapused) {this.memNonheapused = memNonheapused;}
/**
 *@return jvm内存
*/
public String getJvmTotalmem(){return this.jvmTotalmem;}
/**
 *@param jvmTotalmem jvm内存
*/
@Column(name = "jvm_totalmem")
public void setJvmTotalmem(String jvmTotalmem) {this.jvmTotalmem = jvmTotalmem;}
/**
 *@return 服务状态
*/
public String getRunStatus(){return this.runStatus;}
/**
 *@param runStatus 服务状态
*/
@Column(name = "run_status")
public void setRunStatus(String runStatus) {this.runStatus = runStatus;}
/**
 *@return 客户端连接数
*/
public String getRunConnections(){return this.runConnections;}
/**
 *@param runConnections 客户端连接数
*/
@Column(name = "run_connections")
public void setRunConnections(String runConnections) {this.runConnections = runConnections;}
/**
 *@return 空闲处理器
*/
public String getRunAvailableprocessors(){return this.runAvailableprocessors;}
/**
 *@param runAvailableprocessors 空闲处理器
*/
@Column(name = "run_availableprocessors")
public void setRunAvailableprocessors(String runAvailableprocessors) {this.runAvailableprocessors = runAvailableprocessors;}
/**
 *@return JVM空闲内存
*/
public String getRunFreememory(){return this.runFreememory;}
/**
 *@param runFreememory JVM空闲内存
*/
@Column(name = "run_freememory")
public void setRunFreememory(String runFreememory) {this.runFreememory = runFreememory;}
/**
 *@return 日志更新时间
*/
public String getRunLoginterval(){return this.runLoginterval;}
/**
 *@param runLoginterval 日志更新时间
*/
@Column(name = "run_loginterval")
public void setRunLoginterval(String runLoginterval) {this.runLoginterval = runLoginterval;}
/**
 *@return JVM最大可用内存
*/
public String getRunMaxmem(){return this.runMaxmem;}
/**
 *@param runMaxmem JVM最大可用内存
*/
@Column(name = "run_maxmem")
public void setRunMaxmem(String runMaxmem) {this.runMaxmem = runMaxmem;}
/**
 *@return JVM目前占用内存
*/
public String getRunUsemem(){return this.runUsemem;}
/**
 *@param runUsemem JVM目前占用内存
*/
@Column(name = "run_usemem")
public void setRunUsemem(String runUsemem) {this.runUsemem = runUsemem;}
/**
 *@return 最大内存
*/
public String getOsMem(){return this.osMem;}
/**
 *@param osMem 最大内存
*/
@Column(name = "os_mem")
public void setOsMem(String osMem) {this.osMem = osMem;}
/**
 *@return 服务运行时间
*/
public String getRunRuningtime(){return this.runRuningtime;}
/**
 *@param runRuningtime 服务运行时间
*/
@Column(name = "run_runingtime")
public void setRunRuningtime(String runRuningtime) {this.runRuningtime = runRuningtime;}
/**
 *@return 活动线程数
*/
public String getThreadpoolActivecount(){return this.threadpoolActivecount;}
/**
 *@param threadpoolActivecount 活动线程数
*/
@Column(name = "threadpool_activecount")
public void setThreadpoolActivecount(String threadpoolActivecount) {this.threadpoolActivecount = threadpoolActivecount;}
/**
 *@return 完成任务数
*/
public String getThreadpoolCompletedtaskcount(){return this.threadpoolCompletedtaskcount;}
/**
 *@param threadpoolCompletedtaskcount 完成任务数
*/
@Column(name = "threadpool_completedtaskcount")
public void setThreadpoolCompletedtaskcount(String threadpoolCompletedtaskcount) {this.threadpoolCompletedtaskcount = threadpoolCompletedtaskcount;}
/**
 *@return 核心线程数
*/
public String getThreadpoolCoresize(){return this.threadpoolCoresize;}
/**
 *@param threadpoolCoresize 核心线程数
*/
@Column(name = "threadpool_coresize")
public void setThreadpoolCoresize(String threadpoolCoresize) {this.threadpoolCoresize = threadpoolCoresize;}
/**
 *@return 最大线程池数
*/
public String getThreadpoolMaxpoolsize(){return this.threadpoolMaxpoolsize;}
/**
 *@param threadpoolMaxpoolsize 最大线程池数
*/
@Column(name = "threadpool_maxpoolsize")
public void setThreadpoolMaxpoolsize(String threadpoolMaxpoolsize) {this.threadpoolMaxpoolsize = threadpoolMaxpoolsize;}
/**
 *@return 最大线程数
*/
public String getThreadpoolMaxsize(){return this.threadpoolMaxsize;}
/**
 *@param threadpoolMaxsize 最大线程数
*/
@Column(name = "threadpool_maxsize")
public void setThreadpoolMaxsize(String threadpoolMaxsize) {this.threadpoolMaxsize = threadpoolMaxsize;}
/**
 *@return 线程池大小
*/
public String getThreadpoolSize(){return this.threadpoolSize;}
/**
 *@param threadpoolSize 线程池大小
*/
@Column(name = "threadpool_size")
public void setThreadpoolSize(String threadpoolSize) {this.threadpoolSize = threadpoolSize;}
/**
 *@return 任务数汇总
*/
public String getThreadpoolTaskcount(){return this.threadpoolTaskcount;}
/**
 *@param threadpoolTaskcount 任务数汇总
*/
@Column(name = "threadpool_taskcount")
public void setThreadpoolTaskcount(String threadpoolTaskcount) {this.threadpoolTaskcount = threadpoolTaskcount;}
/**
 *@return 是否关闭
*/
public String getThreadpoolIsclose(){return this.threadpoolIsclose;}
/**
 *@param threadpoolIsclose 是否关闭
*/
@Column(name = "threadpool_isclose")
public void setThreadpoolIsclose(String threadpoolIsclose) {this.threadpoolIsclose = threadpoolIsclose;}
/**
 *@return 是否已经终止
*/
public String getThreadpoolIsstop(){return this.threadpoolIsstop;}
/**
 *@param threadpoolIsstop 是否已经终止
*/
@Column(name = "threadpool_isstop_")
public void setThreadpoolIsstop(String threadpoolIsstop) {this.threadpoolIsstop = threadpoolIsstop;}
/**
 *@return 是否终止
*/
public String getThreadpoolTerminating(){return this.threadpoolTerminating;}
/**
 *@param threadpoolTerminating 是否终止
*/
@Column(name = "threadpool_terminating")
public void setThreadpoolTerminating(String threadpoolTerminating) {this.threadpoolTerminating = threadpoolTerminating;}
/**
 *@return 任务平均处理时间
*/
public String getTaskAveragetasktime(){return this.taskAveragetasktime;}
/**
 *@param taskAveragetasktime 任务平均处理时间
*/
@Column(name = "task_averagetasktime")
public void setTaskAveragetasktime(String taskAveragetasktime) {this.taskAveragetasktime = taskAveragetasktime;}
/**
 *@return 任务平均每秒处理数
*/
public String getTaskAveragetaskspersecond(){return this.taskAveragetaskspersecond;}
/**
 *@param taskAveragetaskspersecond 任务平均每秒处理数
*/
@Column(name = "task_averagetaskspersecond")
public void setTaskAveragetaskspersecond(String taskAveragetaskspersecond) {this.taskAveragetaskspersecond = taskAveragetaskspersecond;}
/**
 *@return 完成任务数
*/
public String getTaskCompletedtasks(){return this.taskCompletedtasks;}
/**
 *@param taskCompletedtasks 完成任务数
*/
@Column(name = "task_completedtasks")
public void setTaskCompletedtasks(String taskCompletedtasks) {this.taskCompletedtasks = taskCompletedtasks;}
/**
 *@return 平均间隔时间
*/
public String getTaskComputeaverageinterval(){return this.taskComputeaverageinterval;}
/**
 *@param taskComputeaverageinterval 平均间隔时间
*/
@Column(name = "task_computeaverageinterval")
public void setTaskComputeaverageinterval(String taskComputeaverageinterval) {this.taskComputeaverageinterval = taskComputeaverageinterval;}
/**
 *@return 当前运行数
*/
public String getTaskRunningtasks(){return this.taskRunningtasks;}
/**
 *@param taskRunningtasks 当前运行数
*/
@Column(name = "task_runningtasks")
public void setTaskRunningtasks(String taskRunningtasks) {this.taskRunningtasks = taskRunningtasks;}
/**
 *@return 物理内存总量
*/
public String getPhysicmemtotal(){return this.physicmemtotal;}
/**
 *@param physicmemtotal 物理内存总量
*/
@Column(name = "physicmemtotal")
public void setPhysicmemtotal(String physicmemtotal) {this.physicmemtotal = physicmemtotal;}
/**
 *@return 物理内存使用
*/
public String getPhysicmemused(){return this.physicmemused;}
/**
 *@param physicmemused 物理内存使用
*/
@Column(name = "physicmemused")
public void setPhysicmemused(String physicmemused) {this.physicmemused = physicmemused;}
/**
 *@return 端口
*/
public String getPort(){return this.port;}
/**
 *@param port 端口
*/
@Column(name = "port")
public void setPort(String port) {this.port = port;}
/**
 *@return 进程号
*/
public String getPid(){return this.pid;}
/**
 *@param pid 进程号
*/
@Column(name = "pid")
public void setPid(String pid) {this.pid = pid;}
/**
 *@return 备注1: 备用字段1
*/
public String getInstNote1(){return this.instNote1;}
/**
 *@param instNote1 备注1: 备用字段1
*/
@Column(name = "inst_note1")
public void setInstNote1(String instNote1) {this.instNote1 = instNote1;}
/**
 *@return 备注2: 备用字段2
*/
public String getInstNote2(){return this.instNote2;}
/**
 *@param instNote2 备注2: 备用字段2
*/
@Column(name = "inst_note2")
public void setInstNote2(String instNote2) {this.instNote2 = instNote2;}
/**
 *@return 备注3: 备用字段3
*/
public String getInstNote3(){return this.instNote3;}
/**
 *@param instNote3 备注3: 备用字段3
*/
@Column(name = "inst_note3")
public void setInstNote3(String instNote3) {this.instNote3 = instNote3;}

}