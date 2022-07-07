import { ResultVoBase } from 'src/clobot/ros/outputs/ResultVoBase';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { ScheduleType } from 'src/clobot/ros/interfaces/IClobotMsgs';

export class ConfigSectionVo {

  public SECTION_ROBOT_LOCATION  = {
    s_robot_location_name : '으뜸홀'
  }

  public SECTION_FIX_PROMOTE = {
    s_fix_promotion_flag_yn : 'Y',
    i_fix_promotion_tts_repeat_ss : 60
  }

  public SECTION_DOCENT = {
    s_docent_use_yn : 'Y'
  }

  public SECTION_BASIC = {
    i_system_volume: 55,
    s_robot_docking_status : 'Y'
  }
  public SECTION_STATUS = {
    i_current_battery_rate:  73,
    i_remain_disk_gb : 60,
    i_fix_life_minute : 240,
    i_move_life_minute : 120
  }

  public SECTION_FORCE_CHARGE = {
    s_force_charge_yn : 'Y',
    s_force_charge_start_hm : '1000',
    s_force_charge_end_hm : '1300',
    i_force_exec_charge_min_battery : 10
  }

  public SECTION_MOVE_SETUP = {
    s_move_promotion_flag_yn: 'Y',
    s_sch_type: ScheduleType.INTERVAL,
    i_move_promotion_start_mm : 10,
    i_move_promotion_play_mm : 10,

    immediately_schedule : {
      i_playing_mm : 30,
      s_mode_id : 'sch'
    },

    custom_schedule : [
      {
        i_sch_seq_id: 1,
        s_robot_location: 'loc_1',
        s_customer: 'museum',
        s_sch_start_hhmm: '0900',
        s_sch_end_hhmm: '0920',
        i_sch_order: 1,
        s_mode_id: 'sch',
        s_is_activate_yn: 'Y'
      },
      {
        i_sch_seq_id: 2,
        s_robot_location: 'loc_1',
        s_customer: 'museum',
        s_sch_start_hhmm: '1000',
        s_sch_end_hhmm: '1030',
        i_sch_order: 2,
        s_mode_id: 'docent_group_1',
        s_is_activate_yn: 'Y'
      },
      {
        i_sch_seq_id: 3,
        s_robot_location: 'loc_1',
        s_customer: 'museum',
        s_sch_start_hhmm: '1100',
        s_sch_end_hhmm: '1130',
        i_sch_order: 3,
        s_mode_id: 'docent_group_2',
        s_is_activate_yn: 'Y'
      },
    ]
  }

  public SECTION_BATTERY_REF = {
    i_move_promotion_enable_min_battery : 40,
    i_move_promotion_disable_min_battery : 30,
  }

  public SECTION_GAMEPAD = {
    s_gamepad_activate_yn : 'Y'
  }

  public DOCENT_GROUP_LIST = [
    {
      i_order: 1,
      s_mode_id : 'sch',
      s_mode_name : '이동홍보',
    },
    {
      i_order: 2,
      s_mode_id : 'docent_group_1',
      s_mode_name : '도슨트그룹1',
    },
    {
      i_order: 3,
      s_mode_id : 'docent_group_2',
      s_mode_name : '도슨트그룹2',
    },
  ]

  public ROBOT_AUTO_OFF = {
    s_auto_off_yn : 'Y',
    arr_data: [
      {
        i_day : 1,
        s_day_name : '일',
        s_time_hh : 18,
        s_time_mm : 10,
        s_active_yn : 'Y',
      },
      {
        i_day : 2,
        s_day_name : '월',
        s_time_hh : 18,
        s_time_mm : 10,
        s_active_yn : 'Y',
      },
      {
        i_day : 3,
        s_day_name : '화',
        s_time_hh : 17,
        s_time_mm : 10,
        s_active_yn : 'Y',
      }
    ]
  }

}

export class ConfigLoadVo extends ResultVoBase {
  public res_s_robot_location = '' // 로봇위치
  public res_s_customer = '' // 고객사
  public res_s_json_content = ''

  public sectionVo: ConfigSectionVo = new ConfigSectionVo()

  constructor(data?: any) {
    super(data)
    CommonUtils.updateVO(this, data)
    if(this.res_s_json_content !== '') {
      this.sectionVo = JSON.parse(this.res_s_json_content)
    }
  }
}
