import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { ChangeRequestType } from 'src/clobot/ros/interfaces/IClobotMsgs';
import { LocaleCode } from 'src/clobot/enums/CommonEnums';

export abstract class RosOutputBase {
  public req_s_tm = ''	// 요청일시(유니크한값)
  public req_s_type!: ChangeRequestType	// 요청구분
  public req_s_current_page_id = '' // 	현재보고 있는 페이지 아이디
  public req_s_current_comp_id = '' //	현재보고 있는 페이지 버튼아이디
  public req_s_current_page_title = '' //	현재보고 있는 페이지 이름
  public req_s_lang: LocaleCode = LocaleCode.ko	// 변경하고자하는 언어상위에 CHANGE_LANG 의존성
  public req_s_change_page_id = ''	// 변경하고자 하는 페이지 아이디
  public req_s_change_comp_id = ''	// 변경하고자 하는 페이지 버튼아이디
  public req_s_caller = 'WEB' //	요청자
  public req_s_gamepad_change_yn = '' //	게임패드로 실행여부

  protected constructor(data: any) {
    CommonUtils.updateVO(this, data)
  }
}
