import { LocaleCode } from 'src/clobot/enums/CommonEnums';
import { ChatbotInType } from 'src/clobot/ros/RosVoBase';
import { ChatbotTemplateId } from 'src/clobot/ros/outputs/RosChatbotOvo';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';

export enum ChangeRequestType {
  페이지변경 = 'CHANGE_PAGE',
  언어변경 = 'CHANGE_LANG',
  뒤로가기 = 'CHANGE_BACK',
  // 챗봇뒤로가기 = 'CHANGE_CHAT_BACK',
  홈으로 = 'CHANGE_HOME',
  챗홈으로 = 'CHANGE_CHAT_HOME',
  TTS_요청 = 'TTS_REQUEST',
  관리자화면 = 'CHANGE_ADMIN'
}
export enum ChangeRequestCallType {
  페이지 = 'PAGE',
  컴포넌트 = 'COMPONENT'
}

export interface IRosRequestCommon {
  req_s_tm?: string
  req_s_lang?: LocaleCode
  req_s_caller?: string // 데스트탑은 항상 WEB
}

/**
 * @description > 서비스 요청결과용 공통 인터페이스
 * */
export interface IRosResultCommon {
  res_s_tm?: string
  res_b_is_ok?: boolean
  res_i_error_code?: string | number
  res_s_error_message?: string
  // res_s_error_en_message?: string
}

//// ChangeRequest 서비스 //////////////////////////////////////////////////////////////////////////
export interface IChangeRequest extends IRosRequestCommon {
  req_s_type?: ChangeRequestType
  req_s_change_comp_id?: string
  req_s_current_page_id?: string
  req_s_current_page_title?: string
  req_s_gamepad_change_yn?: string // 게임패드 실행 여부
}
export interface IChangeResult extends IRosResultCommon {
  res_s_show_subtitle_yn: string // 자막 유무
  res_s_show_page_id: string // 보여줄 페이지 아이디
  res_s_show_comp_id: string // 보여줄 페이지 버튼아이디

  res_s_chatbot_content_yn?: string // 챗봇컨텐트가 있는지 여부 (Y/N)
  res_s_chatbot_template_id: string // 식별된 template id
  res_s_chatbot_page_id: string
  res_s_chatbot_btn_id?: string
  res_i_robot_battery_rate?: number // 현재밧데리잔량
  res_s_json_content?: string // 챗봇응답결과

  res_s_video_id: string // 동영상 아이디
  res_s_docent_group_yn: string // 도슨트그룹여부(넘어온 값 그대로 보내주면 됨)
  /***
   * 다음도슨트아이디 (docent play 페이지에서 해당값을 전달해주면 play 종료후 해당값으로 요청 바랍니다)
   * compId 필드에 해당 값을 넣어서 보내준다.
   * */
  res_s_next_docent_goal_id: string
}

/// 마이크 활성화 서비스, 아웃풋은 기본 아웃풋 인터페이스 사용 ////////////////////////////////////////////////////////////////////
export interface MicActivationRequest extends IRosRequestCommon {
  req_i_screen_second: 1 | 2 | 3 // 화면에서 보이는 1,2,3 (3번이후에 TM 에서 비프엠 발생 )
}

// 챗봇질의 서비스 ///////////////////////////
export interface ChatQueryInput extends IRosRequestCommon {
  req_s_in_str?: string
  req_s_in_type?: ChatbotInType | string
  req_s_raw_str?: string // 번역이안된 원본
  req_s_page_id?: string
  req_s_comp_id?: string
}

// 챗봇에서 주는 약속된 명령 타입
export enum ChatQueryAction {
  charge = 'charge',
  volume_up = 'volume_up',
  volume_down = 'volume_down',
  toilet = 'toilet',
  toilet_m = 'toilet_m',
  toilet_w = 'toilet_w'
}
export interface ChatQueryResult extends IRosResultCommon {
  res_s_action: ChatQueryAction
  res_s_chatbot_template_id: ChatbotTemplateId
  res_s_chatbot_page_id: string
  res_s_chatbot_comp_id: string
  res_s_chatbot_emotion?: string
  res_s_chatbot_head?: string
  res_s_chatbot_tts_text?: string
  res_i_robot_battery_rate?: number
  res_s_docent_hidden_yn?: string // Y/N
  res_s_json_content: string
}

// 환경설정 데이터 요청결과(요청은 기본 인풋사용)  /////////////////////////////////
export interface ConfigLoadResult extends IRosResultCommon {
  res_s_robot_location: string, // 로봇위치
  res_s_customer: string, // 고객사
  res_s_json_content: string
}

// 환경설정 저장 서비스(아웃풋은 기본 아웃풋) /////////////////////////////////////////////////////
export enum ConfigSaveSectionType {
  // SECTION_FIX_PROMOTE,SECTION_DOCENT,SECTION_BASIC,SECTION_MOVE_SETUP,SECTION_BATTERY_RFIX_PROMOTE = 'SECTION_FIX_PROMOTE',
  FIX_PROMOTE = 'SECTION_FIX_PROMOTE',
  DOCENT = 'SECTION_DOCENT',
  BASIC = 'SECTION_BASIC',
  STATUS = 'SECTION_STATUS',
  FORCE_CHARGE = 'SECTION_FORCE_CHARGE',
  MOVE_SETUP = 'SECTION_MOVE_SETUP',
  BATTERY_REF = 'SECTION_BATTERY_REF',
  GAMEPAD = 'SECTION_GAMEPAD',
  ROBOT_AUTO_OFF = 'ROBOT_AUTO_OFF'
}

// 로봇 볼륨저장 서비스(아웃풋은 기본 아웃풋) ////////////////////////////////////////////////////////////////
export interface RobotVolumeRequest extends IRosRequestCommon {
  req_i_system_volume: number
}

// 도슨트 사용설정 서비스(아웃풋은 기본 아웃풋) //////////////////////////////////////////////
export interface DocentHiddenRequest extends IRosRequestCommon{
  req_s_docent_use_yn: 'Y' | 'N'
}

// 서브타이틀표시용 토픽
export interface ISubtitle {
  req_s_tm?: string
  req_s_caller?: string
  req_s_subtitle: string
}

// 스케쥴 서비스 //////////////////////////////////////////////////////////////////
export enum ScheduleType {
  INTERVAL = 'INTERVAL',
  CUSTOM = 'CUSTOM',
  IMMEDIATELY = 'IMMEDIATELY'
}

export enum ScheduleExeMode {
  이동홍보 = 'SCH',
  문화해설 = 'DOCENT',
  문화해설_어린이 = 'DOCENT_CHILD'
}

export class CustomSchedule {
  public i_sch_seq_id = 1
  public s_robot_location = ''
  public s_customer = ''
  public s_sch_start_hhmm = ''
  public s_sch_end_hhmm = ''
  public i_sch_order = 1
  // public s_exe_mode = ScheduleExeMode.이동홍보
  public s_mode_id = ''
  public s_is_activate_yn = 'Y'

  constructor(data: any | null) {
    if(!data) return
    CommonUtils.updateVO(this, data)
  }
}

export class ScheduleInterval {
  req_s_move_promotion_flag_yn = 'Y'
  req_i_move_promotion_start_mm = 10
  req_i_move_promotion_play_mm = 15
  i_playing_mm = 20
  array_times: string[] = []

  constructor(data: any) {
    CommonUtils.updateVO(this, data)
  }
}

export class RobotAutoOffData{
  public i_day = 1
  public s_day_name = '일'
  public s_time_hh = 18
  public s_time_mm = 10
  public s_active_yn = 'N'

  constructor(data: any | null) {
    if(!data) return
    CommonUtils.updateVO(this, data)
  }
}

export interface ScheduleSaveRequest extends IRosRequestCommon {
  req_s_sch_type: ScheduleType
  req_s_sch_json_data: ScheduleInterval
}

// 로봇관리자 부가서비스 (아웃풋은 기본 아웃풋) /////////////////////////////////////////////////////
export enum AdminCommandType {
  // SOUND_TEST, ROBOT_OFF, ROBOT_REBOOTING,프로그램종료
  SOUND_TEST = 'SOUND_TEST',
  ROBOT_OFF = 'ROBOT_OFF',
  ROBOT_REBOOTING = 'ROBOT_REBOOTING',
  프로그램종료 = '프로그램종료'
}

export interface AdminCommandRequest extends IRosRequestCommon {
  req_s_command_type: AdminCommandType
  req_i_sound_value: number // SOUND_TEST  일때만 의미 있음
}

// 로봇상태 서비스 ///////////////////////////////////////////////////////////
export interface RobotStatusResult extends IRosResultCommon {
  res_s_force_charge_yn: string // 강제충전여부
  res_s_gamepad_activate_yn: string // 게임패드활성화여부
  res_s_docent_hidden_yn: string // 도슨트 버튼 숨김여부
  res_i_robot_battery_rate: number // 현재 밧데리정보
  res_s_rms_connect_yn: string // 관제 연결 가능 여부
  res_s_internet_connect_yn: string // 인터넷 연결 여부
  res_s_rosbridge_connect_yn: string // rosbridge 연결 여부
  res_s_dabeeo_connect_yn: string // 다비오 연결여부
}

