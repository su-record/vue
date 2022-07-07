import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { RosChatbotOvo } from 'src/clobot/ros/outputs/RosChatbotOvo';
import { Config } from 'src/clobot/Config';
import { StoreMutationKey } from 'src/clobot/enums/StoreKeys';
import { LocaleCode } from 'src/clobot/enums/CommonEnums';
import { RosOutputBase } from 'src/clobot/ros/outputs/RosOutputBase';
import { RosErrorType } from 'src/clobot/ros/RosErrorOvo';
import {IChangeResult} from 'src/clobot/ros/interfaces/IClobotMsgs';

export class LoadPageVo extends RosOutputBase {
  public res_s_chatbot_yn = 'N' // 챗봇으로 받은 페이지여부
  public res_s_chatbot_template_id = ''
  public res_s_chatbot_page_id = ''
  public res_s_chatbot_comp_id = ''
  public res_s_chatbot_tts_text = ''
  public res_s_show_subtitle_yn = 'N'	// 자막 유무

  public res_s_show_page_id = ''	//보여줄 페이지 아이디
  public res_s_show_comp_id = 'permanent-medium_b6'	//보여줄 페이지 버튼아이디
  public res_s_show_page_wait_ss = ''	// 보여줄페이지의 대기초
  public res_s_show_back_page_id = ''	// 뒤로가기 페이지 아이디
  public res_s_robot_lang = LocaleCode.ko // 보여줄페이지 언어

  public res_s_robot_location = ''	// 로봇의 위치 정보 (1층, 2층 )

  public res_s_error_type?: RosErrorType
  public res_s_error_info = ''
  // public res_i_error_code = 0	// 에러코드
  // public res_s_error_message = ''


  public res_s_content: RosChatbotOvo | any = null	// 챗봇으로 받은 컨텐츠
  public res_i_robot_battery_rate = 100	// 로봇 밧데리 잔량
  public res_s_docent_hidden_yn = 'N'	// 도슨트 숨김 여부
  public res_s_gamepad_change_yn = 'N'

  public res_s_video_id = ''
  public res_s_docent_group_yn = 'N'
  public res_s_next_docent_goal_id = ''

  constructor(data: any) {
    super(data)

    if (!data) return
    CommonUtils.updateVO(this, data)

    /*this.robot_request = new RosChangePageIVo(data.robot_request || null)
    if (_.isEmpty(data.robot_response))
      return

    CommonUtils.updateVO(this, data.robot_response)*/

    if (typeof this.res_s_content === 'string' && this.res_s_content !== '') {
      this.res_s_content = JSON.parse(this.res_s_content)
      console.log('---JSON 파싱 [res_s_content]-----')
      console.log(this.res_s_content)
      // console.log('result ::', this.res_s_content['result'])
    }

    // 챗봇데이터인 경우
    if (this.res_s_chatbot_yn === 'Y' || this.res_s_content.hasOwnProperty('result')) {
      console.log('챗봇 데이터임 !!!')

      this.res_s_show_comp_id = this.res_s_chatbot_comp_id

      this.res_s_content = new RosChatbotOvo(this.res_s_content)
      Config.store.commit(StoreMutationKey.setChatbotVo, this.res_s_content)
    }

    /*vo.res_s_show_page_id = vo.res_s_chatbot_page_id
    vo.res_s_show_comp_id = vo.res_s_chatbot_comp_id*/

    /*else if (data.hasOwnProperty('res_s_robot_location')) {
      this.res_s_chatbot_content = new RosAdminVo(data.res_content)
    }*/
    /*const batteryVo = _.clone(Config.store.state[StoreStateKey.batteryVo])
    batteryVo.docent_force_hidden_yn = this.res_docent_hidden_yn
    Config.store.commit(StoreMutationKey.setBatteryVo, batteryVo)*/
  }
}
