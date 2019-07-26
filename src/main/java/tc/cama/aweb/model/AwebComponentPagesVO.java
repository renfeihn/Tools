package tc.cama.aweb.model;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.util.CommonUtils;

/**
 * Created by lijiancheng@cfischina.com on 2016/5/13 2026.
 */
@Entity
@Table(name="Aweb_component_pages")
public class AwebComponentPagesVO {

    @Id
    @Column(name="ID", unique=true)
    private String id;

    @Column(name="NAME")
    private String name;

    @Column(name="CREATEUSER")
    private String createUser;

    @Column(name="CREATETIME")
    private String createTime;

    @Column(name="UPDATETIME")
    private String updateTime;
    
    @Column(name="SHAREGROUP")
    private String sharegroup;
    
    @Column(name="NICKNAME")
    private String nickname;
    
    @Column(name="USERGROUP")
    private String userGroup;
    
    @Column(name="DESCRIPTION")
    private String description;

	@Column(name="CONFIG", columnDefinition="BLOB")
    private byte[] config;

    public AwebComponentPagesVO(){
        this.id=java.util.UUID.randomUUID().toString();
        this.createTime= CommonUtils.formatTime(new Date().getTime());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public byte[] getConfig(){
        return config;
    }

    public String getConfigStr() {
        try {
            return new String(config, Constants.ENCODING_UTF8);
        } catch (UnsupportedEncodingException e) {
            return "";
        }
    }

    public void setConfig(String config) throws UnsupportedEncodingException {
        this.config = config.getBytes(Constants.ENCODING_UTF8);
    }

    public void setConfig(byte[] config) {
        this.config = config;
    }

    public String getSharegroup() {
		return sharegroup;
	}

	public void setSharegroup(String sharegroup) {
		this.sharegroup = sharegroup;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
