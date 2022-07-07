import { ConfigSaveSectionType } from 'src/clobot/ros/interfaces/IClobotMsgs';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { RequestVoBase } from 'src/clobot/ros/inputs/RequestVoBase';

export class SaveConfigIVo extends RequestVoBase{
  req_s_section_type : ConfigSaveSectionType = ConfigSaveSectionType.BASIC
  req_s_json_content : any

  constructor(data: any) {
    super(data)
    CommonUtils.updateVO(this, data)
  }
}

