import { IRosRequestCommon } from 'src/clobot/ros/interfaces/IClobotMsgs';
import { LocaleCode } from 'src/clobot/enums/CommonEnums';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { Config } from 'src/clobot/Config';
import { StoreStateKey } from 'src/clobot/enums/StoreKeys';

export class RequestVoBase implements IRosRequestCommon {
  public req_s_tm = ''
  public req_s_lang = LocaleCode.ko
  public req_s_caller = 'WEB' // 데스트탑은 항상 WEB
  constructor(option?: any) {
    this.req_s_tm = CommonUtils.genMicroTimeUUID()
    this.req_s_lang = Config.store.state[StoreStateKey.crtLocale]
  }
}
