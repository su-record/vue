export interface ChatbotParams {
  user_id: string
  device_type: string
  lang: 'ko' | 'en' | 'jp' | 'ch'
  raw_str: string
}
export enum ChatbotInType {
  query = 'query',
  param = 'param',
  multi = 'multi',
  intro = 'intro',
  break = 'break'
}
export enum ChatbotResponseStatus {
  match = 'match',
  multi_intent = 'multi_intent',
  not_match = 'not_match'
}
export enum ChatbotDialogueStatus {
  E = 'E', // 종료
  I = 'I' // 진행중
}

export interface IChatbotDesc {
  text: string
}
export interface IChatbotButton {
  text: string
  type?: ChatbotInType | string
  value: string
}
export interface IChatbotImageButton extends IChatbotButton {
  url: string
}
export interface IChatbotImage {
  text: string
  url: string
}
export interface IChatbotDesc {
  text: string
}
export interface IChatbotSound {
  url: string
}
export interface IChatbotVideo {
  video_url: string
  web_url: string
  title: string
  content: string
}
export interface IChatbotDescImage {
  description: IChatbotDesc[]
  image: IChatbotImage[]
}
export interface IChatbotDescImageSound {
  description: IChatbotDesc[]
  image: IChatbotImage[]
  sound: IChatbotSound[]
}
export interface IChatbotExhibition {
  content?: string
  position?: string // exhibition_poi_36
  showroom?: string // 1전시실
  title: string // 무예도보통지
  /// 이동홍보2 용
  image_url?: string
  place_info?: string
  time?: string
  status?: string
  duration?: string
}
export interface IChatbotTour {
  address: string
  image_url: string
  mapx: string
  mapy: string
  title: string
  tour_intro: string
}
export interface ILatLng {
  lat: number,
  lng: number
}

// 챗봇에서 유물이 위치하는 층수와 해당 roomCode를 위한 인터페이스
export interface IChatbotRelic{
  floor_num : string // 층 수
  showroom_code : string // 해당 유물 룸코드
}
export interface ICustomImgText {
  title: string // 영화명
  text1: string // 개봉년도
  text2: string // 감독명
  text3: string //
  text4: string
  text5: string
  image_url: string
  type: string
  value: string
}

export interface ChatbotQuery {
  channel_id: string
  domain_id: string
  in_type: ChatbotInType

  in_st: string
  parameters: ChatbotParams
  session_id: string // user_id 와 동일하게 작성
  dialogue_id: string
}

export interface IChatbotCustomCode {
  action: string
  button_id: string
  emotion: string
  expression: string
  head: string
  page_id: string
  sound: string
}


export enum RosResponseType {
  CHANGE_PAGE =  'CHANGE_PAGE',
  LANG_SUB_TITLE = 'LANG_SUB_TITLE'
}

export abstract class RosVoBase {
  public req_tm: string | number = 0
  protected constructor(data: any) {
    if(!data) {
      this.req_tm = '' // CommonUtils.genMicroTimeUUID()
    } else {
      this.req_tm = data.req_tm
    }
  }
}
