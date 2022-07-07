import { CommonUtils } from 'src/clobot/utils/CommonUtils';

export class SttRecognitionSubVo {
  public res_i_stt_idx = 0 //	순서	0,1,2,0
  public res_s_stt_text = ''// 	STT 인식 텍스트
  public res_s_stt_end_yn = 'N' // 완료여부
  public res_s_stt_retry_yn = 'N' //	UI에서  재요청 처리 요청 (3회 재처리 하는 부분에서 사용)
  public res_s_stt_transfer_text = ''	// STT 번역 텍스트
  public res_s_stt_mic_active_yn = 'N'	// 마이크활성화 가능 여부(사용하는지 확인 필요)

  constructor(data: any) {
    CommonUtils.updateVO(this, data)
  }
}
