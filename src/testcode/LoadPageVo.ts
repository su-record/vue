import { BaseVo, BaseVoc } from "@/testcode/BaseVo";
import { CommonUtils } from "@/utils";
import { LoadPage } from "@/testcode/interface";

export class LoadPageVo extends BaseVo implements LoadPage {
  res_s_chatbot_yn = "N";
  res_s_chatbot_template_id = "";
  res_s_chatbot_page_id = "";
  res_s_chatbot_comp_id = "";
  res_s_chatbot_tts_text = "";
  res_s_chatbot_position_id = "";
  res_s_show_subtitle_yn = "N";
  res_s_show_page_id = "";
  res_s_show_comp_id = "";
  res_s_show_page_wait_ss = "";
  res_s_show_back_page_id = "";
  res_s_robot_location = "";

  constructor(data: any) {
    super(data);
    if (!data) return;

    CommonUtils.updateVO(this, data);
  }
}

export const createLoadPageVo = (options?: Partial<LoadPage>): LoadPage => {
  return {
    res_s_chatbot_yn: "N",
    res_s_chatbot_template_id: "",
    res_s_chatbot_page_id: "",
    res_s_chatbot_comp_id: "",
    res_s_chatbot_tts_text: "",
    res_s_chatbot_position_id: "",
    res_s_show_subtitle_yn: "N",
    res_s_show_page_id: "",
    res_s_show_comp_id: "",
    res_s_show_page_wait_ss: "",
    res_s_show_back_page_id: "",
    res_s_robot_location: "",
    ...BaseVoc,
    ...options,
  };
};
