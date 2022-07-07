import { ChatbotInType, ChatbotParams } from 'src/clobot/ros/RosVoBase';

export class ChatbotIvo {
  domain_id = 'acc_children'
  channel_id = '0'
  in_type: ChatbotInType = ChatbotInType.query
  in_str = ''
  parameters: ChatbotParams = {
    user_id: 'acc_bot_1',
    device_type: 'robot',
    lang: 'ko',
    raw_str: ''
  }
  session_id = 'acc_bot_1' // user_id 와 동일하게 작성
  dialogue_id = ''

  constructor(inStr = '', type?: ChatbotInType) {
    this.in_str = inStr
    // this.dialogue_id = 'dialogue_' + CommonUtils.genUUID()
    if(type) {
      this.in_type = type
    }

    /*if(Config.isDevMode) {
      const flag = 'ibricks_test'
      this.parameters.user_id = this.parameters.device_type = this.session_id = flag
    }*/
  }
}
