package tc.bank.cama.core.service.metric;

public class MetricConstants {

	public static enum Metric {
		// 内存使用信息 - 内存总大小
		OS_MEM_MEM_TOTAL("os.mem.mem_total"),
		// 内存使用信息 - 已用内存
		OS_MEM_MEM_USED("os.mem.mem_used"),
		// 内存使用信息 - 空闲内存
		OS_MEM_MEM_FREE("os.mem.mem_free"),
		// 内存使用信息 - 共享内存
		OS_MEM_MEM_SHARED("os.mem.mem_shared"),
		// 内存使用信息 - 读缓存
		OS_MEM_MEM_BUFFERS("os.mem.mem_buffers"),
		// 内存使用信息 - 写缓存
		OS_MEM_MEM_CACHED("os.mem.mem_cached"),
		// 内存使用信息 - 系统使用读缓存
		OS_MEM_BUFFERS("os.mem.buffers"),
		// 内存使用信息 - 系统使用写缓存
		OS_MEM_CACHE("os.mem.cache"),
		// 内存使用信息 - 虚拟内存大小
		OS_MEM_SWAP_TOTAL("os.mem.swap_total"),
		// 内存使用信息 - 已用虚拟内存
		OS_MEM_SWAP_USED("os.mem.swap_used"),
		// 内存使用信息 - 空闲虚拟内存
		OS_MEM_SWAP_FREE("os.mem.swap_free"),
		// 内存使用信息 - 内存使用率
		OS_MEM_MEM_USED_PCT("os.mem.mem_used_pct"),
		// 内存使用信息 - 虚拟内存使用率
		OS_MEM_SWAP_USED_PCT("os.mem.swap_used_pct"),
		// 磁盘使用信息 - 每秒I/O请求数
		OS_DISK_TPS("os.disk.tps"),
		// 磁盘使用信息 - 每秒I/O请求数
		OS_DISK_BPS("os.disk.bps"),
		// 磁盘使用信息 - 每秒读取Block数
		OS_DISK_KB_READS("os.disk.kB_reads"),
		// 磁盘使用信息 - 每秒写入Block数
		OS_DISK_KB_WRTNS("os.disk.kB_wrtns"),
		// 磁盘使用信息 - 磁盘利用率
		OS_DISK_BUSY_PCT("os.disk.busy_pct"),
		// 磁盘使用信息 - 读入Block总数
		OS_DISK_KB_READ("os.disk.kB_read"),
		// 磁盘使用信息 - 写入Block总数
		OS_DISK_KB_WRTN("os.disk.kB_wrtn"),
		// 网络使用信息 - 每秒总数
		OS_NET_TKPS("os.net.tkps"),
		// 网络使用信息 - 每秒接收
		OS_NET_READ_KPS("os.net.read_kps"),
		// 网络使用信息 - 每秒发送
		OS_NET_WRITE_KPS("os.net.write_kps"),
		// 网络使用信息 - 每秒接收错误数
		OS_NET_READ_ERR("os.net.read_err"),
		// 网络使用信息 - 每秒发送错误数
		OS_NET_WRITE_ERR("os.net.write_err"),
		// 网络使用信息 - 每秒接收数据包
		OS_NET_READ_PKG("os.net.read_pkg"),
		// 网络使用信息 - 每秒发送数据包
		OS_NET_WRITE_PKG("os.net.write_pkg"),
		// 网络使用信息 - 读字节数
		OS_NET_READ_SIZE("os.net.read_size"),
		// 网络使用信息 - 写字节数
		OS_NET_WRITE_SIZE("os.net.write_size"),
		// 进程信息 - CPU占用
		OS_PROC_CPU_USED("os.proc.cpu_used"),
		// 进程信息 - 内存占用
		OS_PROC_MEM_USED("os.proc.mem_used"),
		// 进程信息 - 启动状态
		OS_PROC_STOP_FLAG("os.proc.stop_flag"),
		// 文件系统使用信息 - 总大小
		OS_FS_TOT_SIZE("os.fs.tot_size"),
		// 文件系统使用信息 - 使用大小
		OS_FS_USED_SIZE("os.fs.used_size"),
		// 文件系统使用信息 - 空闲大小
		OS_FS_FREE_SIZE("os.fs.free_size"),
		// 文件系统使用信息 - inode大小
		OS_FS_INODES("os.fs.inodes"),
		// 文件系统使用信息 - inode使用大小
		OS_FS_IUSED_SIZE("os.fs.iused_size"),
		// 文件系统使用信息 - inode使用比例
		OS_FS_IUSED_PCT("os.fs.iused_pct"),
		// 文件系统使用信息 - 文件使用比例
		OS_FS_USED_PCT("os.fs.used_pct"),
		// 端口使用信息 - 状态
		OS_PORT_STAT("os.port.stat"),
		// CPU运行信息 - 运行队列
		OS_CPU_RUN_QUENE("os.cpu.run_quene"),
		// CPU运行信息 - 等待队列
		OS_CPU_WAITE_QUENE("os.cpu.waite_quene"),
		// CPU运行信息 - 中断次数
		OS_CPU_INTERRUPT("os.cpu.interrupt"),
		// CPU运行信息 - 切换次数
		OS_CPU_CPU_CHANGE("os.cpu.cpu_change"),
		// CPU运行信息 - 用户cpu占用率
		OS_CPU_PCPU_USER("os.cpu.pcpu_user"),
		// CPU运行信息 - 系统cpu占用率
		OS_CPU_PCPU_SYS("os.cpu.pcpu_sys"),
		// CPU运行信息 - cpu空闲率
		OS_CPU_PIDLE("os.cpu.pidle"),
		// CPU运行信息 - io等待
		OS_CPU_CPU_IOWAIT("os.cpu.cpu_iowait"),
		// CPU运行信息 - cpu运行时间
		OS_CPU_CPU_RUNTIME("os.cpu.cpu_runtime"),
		// CPU运行信息 - cpu占用率
		OS_CPU_PCPU("os.cpu.pcpu"),
		// CPU运行信息 - 负载
		OS_CPU_LOAD_1MIN("os.cpu.load_1min"),
		
		// ab cpu利用率
		AB_PCPU("ab.pcpu"),
		// ab 内存利用率
		AB_PMEM("ab.pmem"),
		// ab 文件句柄数
		AB_FILENUM("ab.filenum"),
		// ab fin数
		AB_FINNUM("ab.finnum"),
		// ab 连接数
		AB_CONNECTNUM("ab.connectnum"),
		// ab timewait数
		AB_TIMEWAITNUM("ab.timewaitnum"),
		// ab closewait数
		AB_CLOSEWAITNUM("ab.closewaitnum"),
		// ab established数
		AB_ESTABLISHEDNUM("ab.establishednum"),
		// ab 通讯数
		AB_COMMCOUNT("ab.commcount"),
		// ab 数据库连接数
		AB_JDBC_CONNECTIONCOUNT("ab.jdbc_connectioncount"),
		// ab abs任务平均处理时间
		AB_TASK_AVERAGETASKTIME("ab.task_averagetasktime"),
		// ab abs任务平均间隔时间
		AB_TASK_COMPUTEAVERAGEINTERVAL("ab.task_computeaverageinterval"),
		// ab abs当前运行数
		AB_TASK_RUNNINGTASKS("ab.task_runningtasks"),
		// ab abs线程完成任务数
		AB_THREADPOOL_COMPLETEDTASKCOUNT("ab.threadpool_completedtaskcount"),
		// ab abs完成任务数
		AB_TASK_COMPLETEDTASKS("ab.task_completedtasks"),
		// ab abs活动线程数
		AB_THREADPOOL_ACTIVECOUNT("ab.threadpool_activecount"),
		// ab abs当前线程数--取线程池大小
		AB_THREADPOOL_SIZE("ab.threadpool_size"),
		// ab 交易数
		AB_TRADECOUNT("ab.tradecount"),
		//ab 物理内存已使用
		AB_PHYSICMEMUSED("ab.physicMemused"),
		//ab 堆内存已使用
		AB_MEM_HEAPUSED("ab.mem_heapused"),
		//abjvm内存已使用
		AB_RUN_USEMEM("ab.run_usemem"),
		//已加载类数 
		AB_CLASS_LOADCOUNT("ab.class_loadcc"),
		//堆栈用内存 
		AB_MEM_HEAPINIT("ab.mem_heapinit"),
		// survior1区容量 
		AB_JVMDTL_FROMSPACE_CAPACITY("ab.jvmdtl_fromspace_capacity"),
		// survior2区容量 
		AB_JVMDTL_TOSPACE_CAPACITY("ab.jvmdtl_tospace_capacity"),
		//eden区 
		AB_JVMINFO_E("ab.jvminfo_e"),
		//survior区容量 
		AB_JVMINFO_S0("ab.jvminfo_s0"),
		//survior区容量 
		AB_JVMINFO_S01("ab.jvminfo_s1"),
		//当前运行线程数
		AB_THREAD_LIVECOUNT("ab.thread_livecount"),
		//当前加载类数
		AB_CLASS_ALLLOADCOUNT("ab.class_allloadcount"),
		//最大连接数
		AB_JDBC_POOLMAXIMUMCONNECTIONS("ab.jdbc_poolmaximumconnections"),
		//最大空闲数
		AB_JDBC_POOLMAXIMUMIDLECONNECTIONS("ab.jdbc_poolmaximumidleconnections"),
		//等待队列
		AB_JDBC_WAITBUCKETQUEUESIZE("ab.jdbc_waitbucketqueuesize"),
		//数据库连接分析 
		AB_JDBC_BADCONNECTIONCOUNT("ab.jdbc_badconnectioncount"),
		//数据库检出分析
		AB_JDBC_CLAIMEDOVERDUECONNECTIONCOUNT("ab.jdbc_claimedoverdueconnectioncount"),
		
		/*DB2指标*/
		DB_DB2_APPCOUNTS_CURCON("db.db2.appcounts_curcon"),//当前连接数
		DB_DB2_APPCOUNTS_TOPCON("db.db2.appcounts_topcon"),//最大连接数
		DB_DB2_APPCOUNTS_PERUSED("db.db2.appcounts_perused"),//连接数使用率	
		DB_DB2_LOCKTIMEOUT_NUM("db.db2.locktimeout_num"),//应用锁超时数量		
		DB_DB2_DBSTATUS("db_db2.dbstatus"),//活动状态		
		DB_DB2_HADA_STATUS("db.db2.hada_status"),//状态
		DB_DB2_COMMIT_ACT("db.db2.commit_act"),//并发提交数
		DB_DB2_APP_NUM("db_db2.app_num"),//db2表状态异常数
		DB_DB2_PACKAGECACHE("db.db2.packagecache"),//db2PACKAGECACHE命中率
		DB_DB2_TABLESPACE_USED("db.db2.tablespace_used"),//使用百分比
		DB_DB2_TABLESPACE_USEDPAGES("db.db2.tablespace_usedpages"),//已用空间_MB
		DB_DB2_TABLESPACE_FREEPAGES("db.db2.tablespace_freepages"),//空闲空间_MB
		DB_DB2_TABLESPACE_PAGESIZE("db.db2.tablespace_pagesize"),//页大小(KB)	
		DB_DB2_TABLESPACE_STATUS("db.db2.tablespace_status"),//表空间状态
		DB_DB2_TABLESPACE_TBSP_USINGAUTOSTORAGE("db.db2.tablespace_tbsp_usingautostorage "),//使用自动存储
		DB_DB2_TABLESPACE_TOTALPAGES("db.db2.tablespace_totalpages"),//总页数		
		DB_DB2_LONGTIMELOCKTABLE("db.db2.longtimelocktable"),//db2超长时间锁表监控		
		DB_DB2_LONGOPATESENTENCE("db.db2.longopatesentence"),//db2超长执行语句		
		DB_DB2_LARGEAPPINFO("db.db2.largeappinfo"),//db2长时间运行的事务																								//stmt_text	db2长时间运行的事务											
									
		/*ORACLE指标*/
		DB_ORACLE_SGA("db.oracle.sga"),  //oracle当前SGA
		DB_ORACLE_SHARED_POOL_SIZE("db.oracle.shared_pool_size"),  //oracle当前共享内存
		DB_ORACLE_SESSION_COUNT("db.oracle.session_count"),  //当前会话数
		DB_ORACLE_SESSION_PCT("db.oracle.session_pct"), //会话数使用率
		DB_ORACLE_PROCESS_PCT("db.oracle.process_pct"), // Processes使用率
		DB_ORACLE_CURSORS_PCT("db.oracle.cursors_pct"), //Cursors使用率
		DB_ORACLE_LARGETASK_NUM("db.oracle.largetask_num"), //大事务信息数
		DB_ORACLE_TABLESPACE_USED("db.oracle.tablespace_used"); //已用百分比
		
		public final String name;

		Metric(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

	}

	public static enum Unit {
		// 百分比
		PERCENTNUM,
		//
		BIT,
		//
		BYTE,
		//
		KB,
		//
		MB,
		//
		GB,
		//
		TB;
	}
}
