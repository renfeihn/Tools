package tc.bank.asda.toolset.service;

import java.util.Map;

/**
 * 功能说明：工具集中所有服务
 *
 * @author Renfei
 */
public interface IToolsetService {


    /**
     * 功能说明：代理服务端对代理服务端的文件上传 ac2acUpload : AgentClientToAgentClientUpload
     *
     * @param fromIp
     * @param fromPath
     * @param toIp
     * @param toPath
     * @param fileName
     * @return
     */
    Map<String, Object> ac2acUpload(String fromIp, String fromPath,
                                    String toIp, String toPath, String fileName);


    /**
     * 功能说明：AIM服务端向代理客户端通过的文件上传 s2acUpload：ServerToAgentClientUpload
     *
     * @param fromPath
     * @param fileName
     * @param toIp
     * @param toPath
     * @return
     */
    Map<String, Object> s2acUpload(String fromPath, String fileName,
                                   String toIp, String toPath);


    /**
     * 功能说明：获取选中的文件内容
     *
     * @param fromIp
     * @param fromPath
     * @param fileName
     * @return
     */
    Map<String, Object> getFileContent(String fromIp, String fromPath, String fileName);


    /**
     * 功能说明：向服务器端写文件
     *
     * @param id       历史记录ID
     * @param toIp
     * @param toPath
     * @param fileName
     * @param content
     * @return
     */
    Map<String, Object> writeFile(Long id, String toPath, String fileName, String content);

    /**
     * 功能说明：配置文件编辑 查询配置目录树
     *
     * @param nodeAttr
     * @return
     */
    Map<String, Object> getCfgFileByNodeAttr(String nodeAttr);


    /**
     * 功能说明：查询文件修改历史
     *
     * @param instanceIds
     * @param fromPath
     * @param fileName
     * @return
     */
    Map<String, Object> getFileHists(String instanceIds, String fromPath, String fileName);


    /**
     * 功能说明：编辑文件
     *
     * @param instanceIds
     * @param fromPath
     * @param fileName
     * @param content
     * @return
     */
    Map<String, Object> editFile(String instanceIds, String fromPath, String fileName, String content);

    /**
     * 功能说明：取消编辑文件
     *
     * @param id
     * @return
     */
    Map<String, Object> cancelEditFile(Long id);
}
