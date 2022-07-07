import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { RequestVoBase } from 'src/clobot/ros/inputs/RequestVoBase';

export class RosScreenTouchVo extends RequestVoBase{

  public req_s_current_page_id = ''

  constructor(data: any) {
    super();
    CommonUtils.updateVO(this, data)
  }
}
