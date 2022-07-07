export interface Base {
  res_s_tm: string;
  res_b_is_ok: boolean;
  res_i_error_code: string;
  res_s_error_message: string;
}
export interface LoadPage extends Base {
  res_s_chatbot_yn: string;
  res_s_chatbot_template_id: string;
  res_s_chatbot_page_id: string;
  res_s_chatbot_comp_id: string;
  res_s_chatbot_tts_text: string;
  res_s_chatbot_position_id: string;
  res_s_show_subtitle_yn: string;
  res_s_show_page_id: string;
  res_s_show_comp_id: string;
  res_s_show_page_wait_ss: string;
  res_s_show_back_page_id: string;
  res_s_robot_location: string;
}
