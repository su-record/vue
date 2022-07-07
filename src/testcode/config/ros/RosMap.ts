import {Ros, Topic} from 'roslib'
const ROSLIB = (window as any).ROSLIB as any

export enum TopicEndPoint {
  SCREEN_TOUCH = '/topic/ui/robot/screen_touch', // 스크린 터치시 마다 발행

  LOAD_PAGE = '/topic/robot/ui/load_page', // 구독전용
  SUB_TITLE = '/topic/robot/ui/page_subtitle', // 화면 서브타이틀 영역에 보여줄 내용 (구독전용) /topic/robot/ui/page_subtitle

  // CURRENT_BATTERY = '/robot/ui/robot_current_battery', // 구독전용
  RECOGNITION_STT_TEXT = '/topic/robot/ui/recognition_stt_text', // 음성인식결과를 화면에 전달 (구독전용)

  // ERROR = '/robot/ui/common_error_popup',
  // ROBOT_CONTROL = '/ui/robot/request_robot_control', // 로봇 컨트롤 (관리자)
  // HI_QUI_INFO = '/robot/ui/hi_qi_info', // 고객이 "하이 큐아이"라고 말할때마다 수신되는 토픽(구독전용)

  //도슨트 등에서 이모션 토픽발행시 사용
  ROBOT_EFFECT = '/topic/ui/robot_effect', // IRobotEmotion 을 전달
  ADMIN_COMMAND = '/topic/ui/robot/admin_command' // 로봇 관리(TM 종료, 로봇 종료, 강제 충전) 전용
}
/*export enum TopicMessageType {
  TTS_SUBTITLE = 'TTS_SUBTITLE', // 도슨트 자막 음성발화 요청
  SPEAKER_VOLUME = 'SPEAKER_VOLUME',
  CHANGE_TTS = 'CHANGE_TTS', // 음성 발화 요청
  PAGE_STOP_TTS = 'PAGE_STOP_TTS' // 페이지변환 없이 TTS 또는 음성 있는 경우
}*/
export enum TopicDataType {
  String = 'std_msgs/String',
  Empty = 'std_msgs/Empty'
}

export enum ServiceEndPoint {
  // 변경요청
  CHANGE_REQUEST = '/service/ui/robot/change_request',
  // 챗봇질의
  CHAT_QUERY = '/service/ui/robot/chat_query',
  // 환경설정내용 불러오기
  CONFIG_LOAD = '/service/ui/robot/config_load',
  // 환경설정저장
  CONFIG_SAVE = '/service/ui/robot/config_save',
  // 로봇 볼륨 저장
  VOLUME_SAVE = '/service/ui/robot/robot_volume_save',
  // 마이크 활성화
  MIC_ACTIVATION = '/service/ui/robot/mic_activation',
  // 도슨트 사용 설정
  DOCENT_HIDDEN = '/service/ui/robot/docent_hidden',
  // 스케줄 등록
  SCHEDULE_SAVE = '/service/ui/robot/sch_save',
  // 로봇상태
  ROBOT_STATUS = '/service/ui/robot/robot_status',
}
export enum ServiceDataType {
  CHANGE_REQUEST_SRV = 'q4_msgs/ChangeRequestSrv',
  CHAT_QUERY_SRV = 'q4_msgs/ChatQuerySrv',
  CONFIG_LOAD_SRV = 'q4_msgs/ConfigLoadSrv',
  // ROBOT_EFFECT_SRV = 'q4_msgs/RobotEffectSrv',
  MIC_ACTIVATION_SRV = 'q4_msgs/MicActivationSrv',
  CONFIG_SAVE_SRV = 'q4_msgs/ConfigSaveSrv',
  DOCENT_HIDDEN_SRV = 'q4_msgs/DocentHiddenSrv',
  SCHEDULE_INSERT_SRV = 'q4_msgs/SchInsertSrv',
  ROBOT_STATUS_SRV = 'q4_msgs/RobotStatusSrv',
  VOLUME_SAVE_SRV = 'q4_msgs/RobotVolumeSaveSrv'
}


export class RosMap extends Map {
  constructor(ros: Ros) {
    super()
    this.set(TopicEndPoint.LOAD_PAGE,             new ROSLIB.Topic({ros: ros, name: TopicEndPoint.LOAD_PAGE, messageType: TopicDataType.String}))
    this.set(TopicEndPoint.SCREEN_TOUCH,          new ROSLIB.Topic({ros: ros, name: TopicEndPoint.SCREEN_TOUCH, messageType: TopicDataType.String, latch: true}))
    this.set(TopicEndPoint.RECOGNITION_STT_TEXT,  new ROSLIB.Topic({ros: ros, name: TopicEndPoint.RECOGNITION_STT_TEXT, messageType: TopicDataType.String, latch: true}))
    this.set(TopicEndPoint.ROBOT_EFFECT,          new ROSLIB.Topic({ros: ros, name: TopicEndPoint.ROBOT_EFFECT, messageType: TopicDataType.String, latch: true}))
    this.set(TopicEndPoint.ADMIN_COMMAND,         new ROSLIB.Topic({ros: ros, name: TopicEndPoint.ADMIN_COMMAND, messageType: TopicDataType.String, latch: true}))
    this.set(TopicEndPoint.SUB_TITLE,             new ROSLIB.Topic({ros: ros, name: TopicEndPoint.SUB_TITLE, messageType: TopicDataType.String, latch: true}))

    // this.set(TopicEndPoint.SPEAKER_VOLUME,        new Topic({ros: ros, name: TopicEndPoint.SPEAKER_VOLUME, messageType: TopicDataType.String, latch: true}))
    // this.set(TopicEndPoint.RECOGNITION_DOCENT_END_TEXT,  new Topic({ros: ros, name: TopicEndPoint.RECOGNITION_DOCENT_END_TEXT, messageType: TopicDataType.String, latch: true}))
    // this.set(TopicEndPoint.ERROR,                 new Topic({ros: ros, name: TopicEndPoint.ERROR, messageType: TopicDataType.String, latch: true}))
    // this.set(TopicEndPoint.ROBOT_CONTROL,         new Topic({ros: ros, name: TopicEndPoint.ROBOT_CONTROL, messageType: TopicDataType.String, latch: true}))
    // this.set(TopicEndPoint.HI_QUI_INFO,           new Topic({ros: ros, name: TopicEndPoint.HI_QUI_INFO, messageType: TopicDataType.String, latch: true}))
  }
}
