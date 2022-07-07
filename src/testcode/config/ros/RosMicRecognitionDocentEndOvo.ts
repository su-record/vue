import {RosVoBase} from 'src/clobot/ros/RosVoBase';
import {CommonUtils} from 'src/clobot/utils/CommonUtils';

export class RosMicRecognitionDocentEndOvo extends RosVoBase {
  public docent_end_text = ''

  constructor(data: any) {
    super(data)
    CommonUtils.updateVO(this, data)
  }
}
