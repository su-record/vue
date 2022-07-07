import { CommonUtils } from 'src/clobot/utils/CommonUtils';

export enum RosErrorType {
  NONE = 'NONE',
  ALERT = 'ALERT', // 팝업 메세지만 보여줌
  WARNING = 'WARNING', // 메세지만 보여줌
  ERROR = 'ERROR' // 페이지전환
}
export interface IRosErrorInfo {
  i_error_code: number // 200,
  s_error_name_ko: string // "3D 맵 연결 실패",
  s_error_name_en: string // "3D 맵 연결 실패",
  s_error_message_ko: string // "3D 맵 불러오기를 실패했습니다.<br>다른 서비스를 이용하시는 건 어떠세요?",
  s_error_message_en: string //  "3D map import failed.<br>How about using a different service?"
  s_error_btn_label_ko: string
  s_error_btn_label_en: string
}

export enum RosErrorCode {
  ERROR_REQUEST_EXCEPTION = 101,
  ERROR_HTTP = 102,
  ERROR_CONNECTION = 103,
  ERROR_TIMEOUT = 104,
  ERROR_CHAT_STATUS_TYPEERROR = 105,
  ERROR_EXCEPT = 106,
}

export enum RosErrorModule {
  CHATBOT = 'CHATBOT',
  NAVI = 'NAVI',
  MP3 = 'MP3'
}

export class RosErrorOvo {
  public res_s_error_type!: RosErrorType
  public res_s_error_info!: IRosErrorInfo
  public res_s_error_message = ''

  constructor(data: any) {
    CommonUtils.updateVO(this, data);
    if(!data) return
    const error_info = data.res_s_error_info;
    this.res_s_error_info = (typeof error_info === 'string') ? JSON.parse(error_info) : error_info
    console.log('>> 에러정보 ::', this.res_s_error_info)
  }
}
