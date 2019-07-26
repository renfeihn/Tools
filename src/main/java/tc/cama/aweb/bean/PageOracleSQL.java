package tc.cama.aweb.bean;

public class PageOracleSQL {
	public static enum BaseSQL {

		/**
		 * 端口状态
		 */
		DB_ORACLE_PORTSTATUS(
				"select  port_status  from aim_data_db_oracle_pub_his where SAMPLE_TIME = (select MAX(SAMPLE_TIME) from aim_data_db_oracle_pub_his where mobj_id = ?) and mobj_id = ?"),
		/**
		 * 进程数量
		 */
		DB_ORACLE_PROCCESSCOUNT(
				"select count(id)as processcount from aim_data_db_oracle_processesuse_his where  sample_time = (select max(sample_time) from aim_data_db_oracle_processesuse_his where mobj_id =?) and mobj_id = ?"),
		/**
		 * 超长sql数
		 */
		DB_ORACLE_LONGTIMESQLCOUNT(
				"select count(id)as longsqlcount from aim_data_db_oracle_sqltimelong_his where sample_time = (select max(sample_time) from aim_data_db_oracle_sqltimelong_his where mobj_id = ?) and mobj_id = ?"),
		/**
		 * 超长事物数
		 */
		DB_ORACLE_LONGTIMETASKCOUNT(
				"select count(id)as longtaskcount from aim_data_db_oracle_longtimerunningtask_his where sample_time = (select max(sample_time) from aim_data_db_oracle_longtimerunningtask_his  where mobj_id = ? ) and mobj_id = ?"),

		/**
		 * 长时间等待数
		 */
		DB_ORACLE_LONGTIMEWAITCOUNT(
				"select count(id)as longwaitcount from aim_data_db_oracle_longtimewaitlock_his where sample_time = (select max(sample_time) from aim_data_db_oracle_longtimewaitlock_his where mobj_id = ?) and mobj_id = ?"),

		/**
		 * 长时间作业数
		 */
		DB_ORACLE_LONGTIMEWORKCOUNT(
				"select count(id)as longworkcount from aim_data_db_oracle_longtimeworknum_his where sample_time = (select max(sample_time) from aim_data_db_oracle_longtimeworknum_his where mobj_id = ?) and mobj_id = ?"),
		
		/**
		 * 失效对象数
		 */
		DB_ORACLE_LOSEEFFICACYOBJECT(
				"select count(id) as loseefficacyobject from aim_data_db_oracle_loseefficacyobject_his where sample_time = (select max(sample_time) from aim_data_db_oracle_loseefficacyobject_his where mobj_id = ?) and mobj_id = ?"),
		
		/**
		 * 死锁数
		 */
		DB_ORACLE_LOCKNUM(
				"select locknum from aim_data_db_oracle_pub_his where sample_time = (select max(sample_time) from aim_data_db_oracle_pub_his where mobj_id = ?) and mobj_id = ?"),
		
		/**
		 * SGA命中率
		 */
       DB_ORACLE_DICTSHOOT(
				"select dict_shoot from aim_data_db_oracle_pub_his where sample_time = (select max(sample_time) from aim_data_db_oracle_pub_his where mobj_id = ?) and mobj_id = ?"),
								
		/**
		 * 连接数
		 */
	   DB_ORACLE_SESSIONCOUNT(
				"select session_count from aim_data_db_oracle_pub_his where sample_time = (select max(sample_time) from aim_data_db_oracle_pub_his where mobj_id = ?) and mobj_id = ?");
			
		public final String name;

		BaseSQL(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

	}

	public static enum FormSQL {
		/**
		 * 表空间信息
		 */
		DB_ORACLE_TABLESPACE(
				"select name ,status, type, extent_management ,sizemb, usedmb ,freemb, used,extendsizemb from aim_data_db_oracle_tablespace_his  where SAMPLE_TIME=(select max(SAMPLE_TIME) from aim_data_db_oracle_tablespace_his  where  mobj_id = ?) and mobj_id = ?"),
		/**
		 * DATAGUARD状态
		 */
		DB_ORACLE_DATAGUARDSTATUS(
				"select mobj_id,dest_id,status from aim_data_db_oracle_dataguardstatus_his where sample_time = (select max(sample_time) from aim_data_db_oracle_dataguardstatus_his where mobj_id = ? ) and mobj_id = ?"),
		/**
		 * 备份信息
		 * 
		 */
		DB_ORACLE_BACKUP(
				"select input_type ,status , start_time ,end_time, elapsed_seconds from aim_data_db_oracle_backup_his where sample_time = (select max(sample_time) from aim_data_db_oracle_backup_his  where  mobj_id = ?) and mobj_id = ?"),
		/**
		 * 归档日志空间信息
		 */
		DB_ORACLE_TARLOGSPACE(
				"select grp,sequence,thread,bytes,members,archived,status,first_change,first_time from aim_data_db_oracle_logspace_his where sample_time = (select max(sample_time) from aim_data_db_oracle_logspace_his  where mobj_id = ?) and mobj_id = ?"),

		/**
		 * 失效对象
		 */
		DB_ORACLE_LOSEEFFICACYOBJECT(
				"select object_type,owner,object_name from aim_data_db_oracle_loseefficacyobject_his where sample_time = (select max(sample_time) from aim_data_db_oracle_loseefficacyobject_his  where mobj_id = ? ) and mobj_id = ?"),
		/**
		 * 执行时间最长sql
		 */
		DB_ORACLE_SQLTIMELONG(
				"select sql_text,elapsed_time,cpu_time from aim_data_db_oracle_sqltimelong_his where mobj_id = ? order by elapsed_time desc limit 5"),

		/**
		 * 读磁盘最多的sql语句
		 * 
		 */
		DB_ORACLE_SQLDISKREAD(
				"select sql_text,disk_reads from aim_data_db_oracle_sqldiskread_his where mobj_id = ? order by disk_reads desc limit 5"),

		/**
		 * 执行次数最多sql语句
		 * 
		 */
		DB_ORACLE_SQLEXECUTENUM(
				"select sql_text,executions from aim_data_db_oracle_sqlexecutenum_his where mobj_id = ? order by executions desc limit 5"),

		/**
		 * 表记录最多TOP5
		 * 
		 */
		DB_ORACLE_ALLBIGTBLRECORDS(
				"select owner, table_name, tablespace_name, status, compression, last_analyzed, num_rows, use_mb from aim_data_db_oracle_allbigtblrecords_his where mobj_id = ? group by table_name order by num_rows desc limit 5"),
		/**
		 * 长时间锁等待信息
		 */
		DB_ORACLE_LONGTIMEWAITLOCK(
				"select sid,serial,username,event,sql_id,times,program from aim_data_db_oracle_longtimewaitlock_his where sample_time = (select max(sample_time) from aim_data_db_oracle_longtimewaitlock_his where mobj_id =?) and mobj_id = ?"),

		/**
		 * seq信息
		 */
		DB_ORACLE_SEQUENCE(
				" select sequence_owner,sequence_name,min_value,max_value,last_number,seq_used from aim_data_db_oracle_sequence_his where sample_time=(select max(sample_time) from aim_data_db_oracle_sequence_his where mobj_id=?) and mobj_id = ?"),
		/**
		 * 超长事务
		 * 
		 */

		DB_ORACLE_LONGTASK(
				"select sid,username,machine,program,sql_text from aim_data_db_oracle_longtimerunningtask_his where sample_time=(select max(sample_time) from aim_data_db_oracle_longtimerunningtask_his where mobj_id = ?) and mobj_id = ?"),

		/**
		 * 大事务
		 */
		DB_ORACLE_LARGETASK(
				"select sid,username,status,osuser,program,used_ublk,sql_text from aim_data_db_oracle_largetask_his where sample_time=(select max(sample_time) from aim_data_db_oracle_largetask_his where mobj_id = ?) and mobj_id = ?"),

		/**
		 * 超长时间作业
		 */
		DB_ORACLE_LONGTIMEWORKNUM(
				"select sid,elapsed_seconds,opname,sql_text from aim_data_db_oracle_longtimeworknum_his where sample_time=(select max(sample_time) from aim_data_db_oracle_longtimeworknum_his where mobj_id = ?) and mobj_id = ?"),
		/**
		 * 死锁信息
		 */
		DB_ORACLE_LOCKINFO(
				"select	agent_name,in_channel,sample_time,app_id,server_id,service_id,ls_count from	aim_data_db_oracle_waitlocksession_his where sample_time = (select	max(sample_time) from aim_data_db_oracle_waitlocksession_his where mobj_id= ? ) and mobj_id = ?");
		public final String name;

		FormSQL(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}
	}
}
