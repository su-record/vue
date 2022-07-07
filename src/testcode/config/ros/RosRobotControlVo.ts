import { RosRobotControl } from 'src/clobot/ros/RosRobotControl';
import { RequestVoBase } from 'src/clobot/ros/inputs/RequestVoBase';

export class RosRobotControlVo extends RequestVoBase {
  public req_control_type: RosRobotControl | string = ''
  constructor(data: any) {
    super(data);
  }
}
