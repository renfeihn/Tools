package tc.bank.asda.logmanagement.model;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;

@Table(name = "aim_log_archive")
public class LogManagement implements Serializable {

    private static final long serialVersionUID = 4248228169314670312L;

    public enum Frequency{
        /*按日*/
        day,
        /*按月*/
        month,
        /*按年*/
        year,
    }

    /**
     * 数据库主键
     */
    @Id
    private Long id;
    /**
     * 一级分类
     */
    @Column(name = "category1")
    private String category1;
    /**
     * 二级分类
     */
    @Column(name = "category2")
    private String category2;
    /**
     * 三级分类
     */
    @Column(name = "category3")
    private String category3;
    /**
     * 服务器IP
     */
    @Column(name = "ip")
    private String ip;
    /**
     * 对象ID
     */
    @Column(name = "object_id")
    private long objId;
    /**
     * 应用名称
     */
    @Column(name = "application")
    private String application;
    /**
     * 应用ID
     */
    @Column(name = "app_id")
    private long appId;
    /**
     * 归档容量
     */
    @Column(name = "capacity")
    private Float capacity;
    /**
     * 归档日期
     */
    @Column(name = "datetime")
    private Date dateTime;

    /**
     * 统计频次
     */
    @Transient
    private Frequency frequency;
    @Transient
    private String beginTime;
    @Transient
    private String endTime;

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Frequency getFrequency() {
        return frequency;
    }

    public void setFrequency(Frequency frequency) {
        this.frequency = frequency;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory1() {
        return category1;
    }

    public void setCategory1(String category1) {
        this.category1 = category1;
    }

    public String getCategory2() {
        return category2;
    }

    public void setCategory2(String category2) {
        this.category2 = category2;
    }

    public String getCategory3() {
        return category3;
    }

    public void setCategory3(String category3) {
        this.category3 = category3;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public Float getCapacity() {
        return capacity;
    }

    public void setCapacity(Float capacity) {
        this.capacity = capacity;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

	public long getObjId() {
		return objId;
	}

	public void setObjId(long objId) {
		this.objId = objId;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}
}
