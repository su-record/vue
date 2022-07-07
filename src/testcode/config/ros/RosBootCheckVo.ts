import { CommonUtils } from 'src/clobot/utils/CommonUtils';

export class RosBootCheckVo {
  public robot_loc = '' // "1층",
  public robot_docking = '' // "도킹",
  public robot_docking_tm = '' // "15:40:01",
  public robot_network = '' // "성공",
  public robot_process = '' // "성공",
  public robot_chatbot = '' // "성공",i
  public robot_boot_sucess = '' // "성공",
  public robot_network_tm = '' // "15:40:02",
  public robot_process_tm = '' // "15:40:02",
  public robot_chatbot_tm = '' // "15:40:02",
  public robot_disk_total = 0 // 27,
  public robot_disk_used = 0 // 9,
  public robot_disk_free = 0 // 17,
  public robot_disk_percent = 0 // 35,
  public robot_boot_sucess_flag = false // true,
  public robot_boot_sucess_tm = '' // "15:40:02"
  public robot_today = 'YYYY.MM.DD'
  public robot_boot_count = 0

  constructor(data: any) {
    CommonUtils.updateVO(this, data)
  }
}
