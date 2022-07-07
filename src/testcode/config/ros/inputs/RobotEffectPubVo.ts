import { TopicPublishVoBase } from 'src/clobot/ros/inputs/TopicPublishVoBase';
import {IRobotEmotion} from 'src/clobot/interfaces/CommonInterface';
import {CommonUtils} from 'src/clobot/utils/CommonUtils';

export enum RobotEffectType {
  PAGE_EFFECT = 'PAGE_EFFECT',
  PAGE_TTS = 'PAGE_TTS',
  /*ROBOT_HEAD = 'ROBOT_HEAD',
  ROBOT_EYE = 'ROBOT_EYE',
  ROBOT_LED = 'ROBOT_LED',*/
  ROBOT_EMOTION = 'ROBOT_EMOTION',
  VOLUME_UP = 'VOLUME_UP',
  VOLUME_DOWN = 'VOLUME_DOWN'
}

export class RobotEffectPubVo extends TopicPublishVoBase {
  public req_s_effect_type : RobotEffectType // 효과 타입
  public req_s_effect_page_id = '' // PAGE_EFFECT 일때만 사용
  public req_s_effect_value: any // TTS 문구, HEAD, LED,  문자인 숫자일수 있음


  constructor(type: RobotEffectType, value?: string | IRobotEmotion) {
    super()
    this.req_s_effect_type = type
    if(value) {
      this.req_s_effect_value = value
    }
  }
}

/*export class RobotEffectPubVo extends TopicPublishVoBase implements IRobotEmotion {
  public p_head = ''
  public p_eye = ''
  public p_led = ''


  constructor(value: IRobotEmotion) {
    super()
    CommonUtils.updateVO(this, value)
  }
}*/
