// 운영시간 안내용

import { CommonUtils } from 'src/clobot/utils/CommonUtils';

export class OperationOursVo {
  // date = "2020년 9월 14일" // <-- 쓰지 않음
  public time = '' // 휴관일
  public standard = '' // 2020년09월14일 13시 기준
  public weather = '' // 맑음 25.0°C
  public time_0 = '' // 미운영
  public time_1 = '' // 미운영
  public time_2 = '' // 미운영
  public time_3 = '' // 미운영
  public time_4 = '' // 미운영
  public date = ''

  constructor(data: any) {
    CommonUtils.updateVO(this, data)
  }
}
