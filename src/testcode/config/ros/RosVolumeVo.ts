import { RosVoBase } from 'src/clobot/ros/RosVoBase';
import { LocaleCode } from 'src/clobot/enums/CommonEnums';
import { RequestVoBase } from 'src/clobot/ros/inputs/RequestVoBase';

export class RosVolumeVo extends RequestVoBase {
  public req_i_system_volume = 0
  public req_s_caller = 'WEB'

  constructor(data : any) {
    super(null)
    this.req_i_system_volume = 0
  }
}
