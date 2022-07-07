import {
  ChatbotDialogueStatus,
  ChatbotInType,
  ChatbotResponseStatus,
  IChatbotButton,
  IChatbotCustomCode,
  IChatbotDesc,
  IChatbotExhibition,
  IChatbotImage,
  IChatbotImageButton,
  IChatbotRelic,
  IChatbotVideo,
  ICustomImgText
} from 'src/clobot/ros/RosVoBase';
import {OperationOursVo} from 'src/clobot/ros/OperationOursVo';
import {StoreStateKey} from 'src/clobot/enums/StoreKeys';
import {Config} from 'src/clobot/Config';
import {LocaleCode} from 'src/clobot/enums/CommonEnums';
import {CommonUtils} from 'src/clobot/utils/CommonUtils';
import {
  ICollectionFestivalDetail,
  ICollectionInfoDetail,
  ICustomBoxOffice,
  ICustomSchedule,
  IMuseumEduInfo
} from 'src/clobot/interfaces/IKofa';

export enum ChatbotTemplateId {
  tpl00 = 'tpl-com-00',
  tpl01 = 'tpl-com-01',
  tpl02 = 'tpl-com-02',
  tpl03 = 'tpl-com-03',
  tpl04 = 'tpl-com-04',
  tpl05 = 'tpl-com-05',
  tpl_etc = 'tpl-com-etc',
  tpl_hour = 'tpl-single-hours',
  tpl_exhibition = 'tpl-single-exhibition',
  tpl_exhibit = 'tpl-single-exhibit',
  tpl_tour = 'tpl-single-tour',
  tpl_single_video = 'tpl-single-video'
}

export class RosChatbotOvo {
  public in_type: ChatbotInType = ChatbotInType.query
  public in_str = ''
  public in_str_display = ''
  public response_status: ChatbotResponseStatus | null = null
  public dialogue_status: ChatbotDialogueStatus | null = null
  public dialogue_id = ''
  public speech: string[] = []
  public template_id: ChatbotTemplateId | string = ''

  public description: IChatbotDesc[] | null = null
  public button: IChatbotButton[] = []
  public image: IChatbotImage[] | null = []
  public image_button: IChatbotImageButton[] = []
  public custom_hours: OperationOursVo[] | null = null
  public custom_video: IChatbotVideo[] = []
  public custom_img_text: ICustomImgText[] = []

  // 영화박물관(KOFA)용 //////////////////////////////////////////////////////////////
  public custom_festival: ICollectionInfoDetail[] = []
  public custom_boxoffice: ICustomBoxOffice[] = []
  public custom_festival_detail: ICollectionFestivalDetail[] = []
  public custom_schedule: ICustomSchedule[] = []
  public custom_edu: IMuseumEduInfo[] = []

  // 전시실 템플릿
  public custom_exhibition: IChatbotExhibition[] | null = null
  public custom_exhibit: IChatbotExhibition[] = []

  public temp_directYN = 'N'

  public custom : IChatbotRelic[]  = []
  public custom_code: IChatbotCustomCode | null = null

  public global_parameter_data: {name: string, value: string}[] = []

  // U.I용 파생 변수
  public inStrVisible = true
  public isDummy = false

  constructor(data: any) {
    if(!data) return
    CommonUtils.updateVO(this, data)
    this.in_type = data.in_type
    this.global_parameter_data = data.global_parameter_data || []
    if (
      this.in_type === ChatbotInType.param
      || this.in_type === ChatbotInType.multi
      || Config.store.state[StoreStateKey.crtLocale] !== LocaleCode.ko
    ) {
      // 코드성 질문이 표시되지 않도록 처리
      // 제가 찾은 정보입니다.
      this.in_str_display = CommonUtils.translate('a_answer_1.text1')
    } else {
      // 코드성 문자는 빈문자 처리
      const str = isNaN(Number(data.in_str)) ? data.in_str : ''
      this.in_str_display = this.in_str = str // data.in_str
    }

    const result = data.result
    const f = result.fulfillment
    this.response_status = f.response_status || null
    this.template_id = f.template_id
    this.speech = f.speech[0]
    this.custom_code = f.custom_code
    const messages: any[] = f.messages

    if(result.hasOwnProperty('meta')) {
      const m = result.meta
      this.dialogue_status = m.dialogue_status
    }

    for(let i = 0; i < messages.length; i++) {
      const item = messages[i]
      CommonUtils.updateVO(this, item)
    }

    // 특별전시용 파서
    if(messages.length > 0) {
      const data = messages[0]
      CommonUtils.updateVO(this, data)
    }

    // 맵 위치정보(floor, showroom_code)
    if(messages.length > 2) {
      const data = messages[2]
      CommonUtils.updateVO(this, data)
    }

    if(this.template_id === '') {
      this.template_id = ChatbotTemplateId.tpl00
      if(this.description) {
        this.template_id = ChatbotTemplateId.tpl01 // answer_1
      }
      if(this.button && this.button.length > 0) {
        this.template_id = ChatbotTemplateId.tpl02
      }
      if(this.image && this.image.length > 0) { // answer_3
        this.template_id = ChatbotTemplateId.tpl03
      }
      if(this.image_button && this.image_button.length > 0) {
        this.template_id = ChatbotTemplateId.tpl04
      }
      if(this.image && this.description) {
        this.template_id = ChatbotTemplateId.tpl05
      }
    }

    // 사용자 음성입력 내용 표시여부
    this.inStrVisible = !this.template_id.includes('single')
    console.log('[RosChatbotOvo] template_id ::', this.template_id, this.speech)
  }
}
