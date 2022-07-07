import { IRosResultCommon } from 'src/clobot/ros/interfaces/IClobotMsgs';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';

export abstract class ResultVoBase implements IRosResultCommon {
  public res_s_tm = ''
  public res_b_is_ok = false
  public res_i_error_code = ''
  public res_s_error_message = ''
  // public res_s_error_en_message = ''

  protected constructor(data: any) {
    CommonUtils.updateVO(this, data)
  }
}
