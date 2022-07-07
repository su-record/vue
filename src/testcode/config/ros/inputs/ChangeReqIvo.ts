import {RequestVoBase} from 'src/clobot/ros/inputs/RequestVoBase';
import {ChangeRequestType, IChangeRequest} from 'src/clobot/ros/interfaces/IClobotMsgs';
import {Config} from 'src/clobot/Config';
import {StoreStateKey} from 'src/clobot/enums/StoreKeys';
import {CommonUtils} from 'src/clobot/utils/CommonUtils';
import {RoutePath} from 'src/clobot/enums/RoutePath';
import {LoadPageVo} from 'src/clobot/ros/outputs/LoadPageVo';

export class ChangeReqIvo extends RequestVoBase implements IChangeRequest {
  public req_s_type = ChangeRequestType.페이지변경
  public req_s_current_page_id = ''
  public req_s_current_page_title = ''
  public req_s_gamepad_change_yn = 'N'
  public req_s_change_comp_id = ''
  public req_s_docent_group_yn = 'N' // 도슨트그룹여부

  public toURL?: RoutePath // 로컬 테스트용

  constructor(option?: IChangeRequest) {
    super()
    this.req_s_current_page_id = Config.store.state[StoreStateKey.crtPageId]
    this.req_s_current_page_title = CommonUtils.getPageTitle()

    const vo = Config.store.state[StoreStateKey.pageVo] as LoadPageVo
    this.req_s_gamepad_change_yn = vo.req_s_gamepad_change_yn || 'N'
    // this.req_s_docent_group_yn = option.

    if(option) {
      CommonUtils.updateVO(this, option)
    }
  }
}
