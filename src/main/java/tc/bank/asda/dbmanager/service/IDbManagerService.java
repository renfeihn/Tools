package tc.bank.asda.dbmanager.service;

import java.util.List;

import tc.bank.asda.dbmanager.model.DBExecutHis;
import tc.bank.asda.dbmanager.model.DbBook;
import tc.bank.asda.dbmanager.model.DbExecuteRet;
import tc.bank.asda.dbmanager.model.DbManager;

public interface IDbManagerService {

    /**
     * 添加数据库管理
     *
     * @param manager
     * @return
     */
    boolean add(DbManager manager);

    /**
     * 分享数据库管理
     *
     * @param id
     * @param sharedUserIds
     * @return
     */
    boolean share(long id, List<Integer> sharedUserIds);

    /**
     * 修改数据库管理信息
     *
     * @param id
     * @param manager
     * @return
     */
    boolean update(long id, DbManager manager);

    /**
     * 删除数据库管理信息
     *
     * @param id
     * @return
     */
    boolean del(long id);

    /**
     * 根据类型查询数据库管理信息（dbType可以为空，则查询所有）
     *
     * @param createUser
     * @param dbType
     * @return
     */
    List<DbManager> getAllDbManager(Integer createdUser, String dbType);

    /**
     * 測試連接
     *
     * @param manager
     * @return
     */
    boolean testConnection(DbManager manager, String passwd);

    /**
     * 执行SQL
     *
     * @param id
     * @param sql
     * @param user
     * @return
     */
    List<DbExecuteRet> executeSQL(long id, String sql, Integer user, String passwd, int defaultRsNum);

    /**
     * 执行SQL
     *
     * @param id
     * @param sql
     * @param user
     * @return
     */
    List<String> getInsertSQL(long id, String sql, Integer user, String passwd);

    /**
     * 查询执行历史
     *
     * @param user
     * @param dbId
     * @return
     */
    List<DBExecutHis> getExecuteHis(Integer user, long dbId);

    /**
     * 根据主键ID删除
     *
     * @param id
     * @return
     */
    boolean delExecuteHis(long id);

    /**
     * 查询数据库表名
     *
     * @param dbId
     * @param passwd
     * @return
     */
    List<String> getDbTables(long dbId, String passwd);

    /**
     * 添加SQL标签
     *
     * @param book
     * @return
     */
    boolean addDbBook(DbBook book);

    /**
     * 修改SQL标签
     *
     * @param book
     * @return
     */
    boolean updateDbBook(DbBook book);

    /**
     * 根据主键ID删除SQL书签
     *
     * @param id
     * @return
     */
    boolean delDbBook(long id);

    /**
     * 查询SQL书签
     *
     * @param user
     * @param dbId
     * @return
     */
    List<DbBook> getDbBooks(Integer user, long dbId);

    /**
     * 删除某连接用户的所有SQL历史
     *
     * @param user 用户ID
     * @param dbId 数据库ID
     * @return
     */
    boolean delAllExecuteHis(Integer user, long dbId);

    /**
     * 功能说明：根据manager信息打开连接，执行SQL，包含分页
     * add by renfei 20190626 工具集中SQL查询功能
     *
     * @param manager  数据库连接信息
     * @param passwd
     * @param sql
     * @param pageNum
     * @param pageSize
     * @return
     */
    List<DbExecuteRet> executeSQL(DbManager manager, String passwd, String sql,
                                  int pageNum, int pageSize);


    /**
     * 功能说明：根据manager信息打开连接，查询库表名
     * add by renfei 20190626 工具集中SQL查询功能
     *
     * @param manager
     * @param passwd
     * @return
     */
    List<String> getDbTables(DbManager manager, String passwd);
}
