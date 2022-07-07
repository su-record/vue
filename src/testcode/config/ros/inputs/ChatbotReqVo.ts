import { RequestVoBase } from 'src/clobot/ros/inputs/RequestVoBase';
import { ChatQueryInput } from 'src/clobot/ros/interfaces/IClobotMsgs';
import { ChatbotInType } from 'src/clobot/ros/RosVoBase';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { Config } from 'src/clobot/Config';
import { StoreStateKey } from 'src/clobot/enums/StoreKeys';

export class ChatbotReqVo extends RequestVoBase implements ChatQueryInput {
  public req_s_in_str = ''	// 챗봇질의어
  public req_s_in_type = ChatbotInType.query	// 챗봇질의유형
  public req_s_raw_str = ''	// 번역이안된 원본
  public req_s_page_id = ''	// 요청페이지아이디
  public req_s_comp_id = ''	// 요청 버튼 아이디
  constructor(options?: ChatQueryInput) {
    super()
    this.req_s_page_id = Config.store.state[StoreStateKey.crtPageId]
    CommonUtils.updateVO(this, options)
  }
}
