import { RosVoBase } from 'src/clobot/ros/RosVoBase';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';

export class RosBatteryVo extends RosVoBase {
  public charging_yn: 'N' | 'Y' = 'N' // 충전중 여부
  public docent_force_hidden_yn: 'N' | 'Y' = 'N' // 도슨트 강제 Hidden
  public current_battery_rate = 50 // 현재밧데리 잔량

  constructor(data: any) {
    super(data)
    CommonUtils.updateVO(this, data)
  }
}
