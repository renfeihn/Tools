package tc.cama.aweb.service;

import tc.cama.aweb.bean.EventInFo;

public interface IAppCfgEvent {
	EventInFo getAppCfgEventByLogicServerId(Long logicServerId);
}
