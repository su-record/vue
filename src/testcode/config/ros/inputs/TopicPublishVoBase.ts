import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { Config } from 'src/clobot/Config';
import { StoreStateKey } from 'src/clobot/enums/StoreKeys';

export abstract class TopicPublishVoBase {
  public req_s_tm = ''
  public req_s_lang = ''
  public req_s_caller = 'WEB'
  protected constructor() {
    // this.req_s_tm = CommonUtils.genMicroTimeUUID()
    this.req_s_lang = Config.store.state[StoreStateKey.crtLocale]
  }
}
