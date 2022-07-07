import { RequestVoBase } from 'src/clobot/ros/inputs/RequestVoBase';

export class MicActivationReqVo extends RequestVoBase {
  public req_i_screen_second = 3
  public req_s_caller = 'WEB'
  constructor() {
    super()
  }
}
