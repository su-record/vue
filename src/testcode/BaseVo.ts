import { CommonUtils } from "@/utils";
import { Base } from "@/testcode/interface";

export abstract class BaseVo implements Base {
  res_s_tm = "";
  res_b_is_ok = false;
  res_i_error_code = "";
  res_s_error_message = "";

  protected constructor(data: any) {
    CommonUtils.updateVO(this, data);
  }
}

export const BaseVoc: Base = {
  res_s_tm: "",
  res_b_is_ok: false,
  res_i_error_code: "",
  res_s_error_message: "",
};
