import {RosMap, ServiceDataType, ServiceEndPoint, TopicEndPoint} from 'src/clobot/ros/RosMap';
import {Config} from 'src/clobot/Config';
import {CommonUtils} from 'src/clobot/utils/CommonUtils';
import {RosRobotControl} from 'src/clobot/ros/RosRobotControl';
import {Ros, Service, Topic} from 'roslib';
import {StoreMutationKey, StoreStateKey} from 'src/clobot/enums/StoreKeys';
import {ChatbotInType} from 'src/clobot/ros/RosVoBase';
import {ChangeRequestType, IRosResultCommon, ISubtitle} from 'src/clobot/ros/interfaces/IClobotMsgs';
import {RequestVoBase} from 'src/clobot/ros/inputs/RequestVoBase';
import {TopicPublishVoBase} from 'src/clobot/ros/inputs/TopicPublishVoBase';
import {LoadPageVo} from 'src/clobot/ros/outputs/LoadPageVo';
import {SttRecognitionSubVo} from 'src/clobot/ros/outputs/SttRecognitionSubVo';
import {ChatbotReqVo} from 'src/clobot/ros/inputs/ChatbotReqVo';
import {ChangeReqIvo} from 'src/clobot/ros/inputs/ChangeReqIvo';
import {RosErrorOvo, RosErrorType} from 'src/clobot/ros/RosErrorOvo';
import {RobotEffectPubVo, RobotEffectType} from './inputs/RobotEffectPubVo';
import {RosRobotControlVo} from './RosRobotControlVo';
import {RosScreenTouchVo} from 'src/clobot/ros/RosScreenTouchVo';
import {IRobotEmotion} from 'src/clobot/interfaces/CommonInterface';
import {LocaleCode} from 'src/clobot/enums/CommonEnums';
import {DialogType} from 'src/clobot/models/DialogVo';

const ROSLIB = (window as any).ROSLIB as any

export class RosManager {
  // private ROSLIB = (window as any).ROSLIB
  public ros!: Ros
  public rosMap!: RosMap
  private retryCnt = 0
  private retryTimeout!: NodeJS.Timeout

  private get wsUrl(): string {
    const url = Config.isDevMode ? '192.168.217.3:10000' : 'localhost:10000'
    return 'ws://' + url
  }

  private get isConnected(): boolean {
    return  Config.rootState[StoreStateKey.rosConnected] // Config.store.state[StoreStateKey.rosConnected] as boolean
  }

  constructor() {
    // empty
    // console.log('>> ROSLIB ::', (window as any).ROSLIB)
  }

  public connect(): void {
    this.init()
    // this.supportDevMode()
  }

  private init(): void {
    console.log('Ros 연결시도 :: : ', this.wsUrl)
    if(!Config.isDevMode) {
      CommonUtils.showHideProgress(true, '로봇에 연결중입니다...')
    }
    this.setConnected(false)

    if(!this.ros) {
      // Ros 클라이언트 생성
      this.ros = new ROSLIB.Ros({}) // new Ros({})
      this.ros.on('connection', this.onConnect)
      this.ros.on('error', this.onError)
      this.ros.on('close', this.onClose)

      this.rosMap = new RosMap(this.ros)
    }
    this.ros.connect(this.wsUrl)
  }

  private onConnect = (ev: any) => {
    console.log('>> RosBridge 연결완료')
    clearTimeout(this.retryTimeout)
    CommonUtils.showHideProgress(false)
    if (this.rosMap) {
      // 토픽맵 생성
      this.rosMap = new RosMap(this.ros)
      // 토픽 구독
      this.subscribeTopic()
    }
    this.setConnected(true)
  }
  private onError = (ev: any) => {
    console.log('>> RosBridge 에러 ::', ev)
    this.retryConnection()
  }
  private onClose = (ev: any) => {
    console.log('>> >> RosBridge 연결 끊김', ev)
    this.retryConnection()
  }

  private subscribeTopic(): void {
    console.log('>> 토픽구독 시작----------------')
    // 페이지 라우팅 //////////////////////////////////////////////////////////////////
    this.rosMap.get(TopicEndPoint.LOAD_PAGE).subscribe((msg: any) => {
      if (msg.data === '') return
      this.loadPage(msg, true)
    })

    // VrInout 화면용 마이크 음성인식 토픽 ////////////////////////////////////////////////////
    this.rosMap?.get(TopicEndPoint.RECOGNITION_STT_TEXT).subscribe((msg: any) => {
      const data = JSON.parse(msg.data)
      const vo = new SttRecognitionSubVo(data)
      console.log('>> 음성인식 토픽 ------------')
      console.table(data)
      /*if (vo.res_s_stt_text !== '') {
        Config.store.commit(StoreMutationKey.setMicRecognitionVo, vo)
      }*/
      Config.store.commit(StoreMutationKey.setMicRecognitionVo, vo)

      if (vo.res_s_stt_end_yn === 'Y') {
        // 음성입력이 완료된 경우 chatQuery 서비스 호출
        const ivo = new ChatbotReqVo({
          req_s_in_str: vo.res_s_stt_transfer_text
        })
        console.log('>> 음성입력이 완료!!!')
        void this.callChatQuery(ivo)
      }

      if (vo.res_s_stt_retry_yn === 'Y') {
        // Config.eBus.$emit(RosEventType.RETRY_MIC_COUNTDOWN)
      }

      if(vo.res_s_stt_mic_active_yn === 'N') {
        // 마이크 글로우효과 활상화
        // Config.store.commit(StoreMutationKey.setCrtRouterMeta, {backPath: RoutePath.챗봇_메인})
      }
    })

    // 서브타이틀 텍스트 업데이트 //////////////////////////////////////////////////////////////////
    this.rosMap?.get(TopicEndPoint.SUB_TITLE).subscribe((msg: any) => {
      console.log('>>>>>>>>> topic ::', msg)
      const data = JSON.parse(msg.data) as ISubtitle
      Config.store.commit(StoreMutationKey.setSubtitle, data.req_s_subtitle)
    })
  }

  private getService(endPoint: ServiceEndPoint): Service | undefined {
    let serviceType: ServiceDataType
    switch (endPoint) {
      case ServiceEndPoint.CHANGE_REQUEST:
        serviceType = ServiceDataType.CHANGE_REQUEST_SRV
        break
      case ServiceEndPoint.CHAT_QUERY:
        serviceType = ServiceDataType.CHAT_QUERY_SRV
        break
      case ServiceEndPoint.CONFIG_LOAD:
        serviceType = ServiceDataType.CONFIG_LOAD_SRV
        break
      case ServiceEndPoint.CONFIG_SAVE:
        serviceType = ServiceDataType.CONFIG_SAVE_SRV
        break
      case ServiceEndPoint.VOLUME_SAVE:
        serviceType = ServiceDataType.VOLUME_SAVE_SRV
        break
      case ServiceEndPoint.MIC_ACTIVATION:
        serviceType = ServiceDataType.MIC_ACTIVATION_SRV
        break
      case ServiceEndPoint.DOCENT_HIDDEN:
        serviceType = ServiceDataType.DOCENT_HIDDEN_SRV
        break
      case ServiceEndPoint.SCHEDULE_SAVE:
        serviceType = ServiceDataType.SCHEDULE_INSERT_SRV
        break
      case ServiceEndPoint.ROBOT_STATUS:
        serviceType = ServiceDataType.ROBOT_STATUS_SRV
        break
      default: {
        const ep = String(endPoint)
        const msg = `RosMap에 "${ep}"애 대한 서비스가 정의되어있지 않습니다.`
        CommonUtils.showDialog('', msg)
        return undefined
      }
    }
    const service = new ROSLIB.Service({ ros: this.ros, name: endPoint, serviceType: serviceType })
    return service
  }

  public async callService(endPoint: ServiceEndPoint, req: RequestVoBase, progress = false, msg?: string): Promise<IRosResultCommon | undefined> {
    if(Config.isOfflineDevMode) {
      console.warn('>> 오프라인 개발자 모드로 서비스 이용불가 !!')
      if(req instanceof ChangeReqIvo && req.toURL) {
        CommonUtils.route(req.toURL)
      }
      return undefined
    }

    if(!this.isConnected) {
      CommonUtils.showDialog('', 'Ros Bridge 연결 후 이용바람!!')
      return undefined
    }

    const service = this.getService(endPoint)
    if(!service) {
      CommonUtils.showDialog('', '서비스 end pont 가 등록되어 있지 않음!!')
      return undefined
    }

    if(progress) {
      CommonUtils.showHideProgress(true, msg || null)
    }
    return new Promise((resolve, reject) => {
      console.log('>> 서비스 요청 ::', endPoint, '--------')
      console.table(req)
      service.callService(req, (res: IRosResultCommon) => {
        CommonUtils.showHideProgress(false)
        console.log('>> 서비스 요청결과 ::', res)
        if(res.res_b_is_ok) {
          resolve(res)
        } else {
          console.log('>> 서비스 요청 후 에러 발생')
          const errorVo = new RosErrorOvo(res)
          this.rosErrorHandler(errorVo)
          reject(errorVo.res_s_error_message)
        }
      }, (err) => {
        CommonUtils.showHideProgress(false)
        CommonUtils.showDialog('', err)
        reject()
      })
    })
  }

  /***
   * @description 토픽발행용 함수
   * */
  public publish(vo: TopicPublishVoBase, endPoint: TopicEndPoint = TopicEndPoint.RECOGNITION_STT_TEXT, progress = true): void {
    // Config.store.commit(StoreMutationKey.setProgress, progress)
    // 타임스탬프 찍고
    vo.req_s_tm = CommonUtils.genMicroTimeUUID()
    // 토픽은 json string 으로 발행하기로 약속
    const toStr = JSON.stringify(vo)
    const topic: Topic = this.rosMap.get(endPoint)
    const msg = new ROSLIB.Message({data: toStr})
    console.log('>> 토픽발행 ::', endPoint, vo)
    topic.publish(msg)
  }

  /***
   * @description 페이지 전환 요청 등에 사용되는 함수
   * */
  public async callChangeRequest(ivo: ChangeReqIvo): Promise<void> {
    // 인터페이스에 정의되지 않은 키는 제거
    delete ivo.toURL
    const res: LoadPageVo = await this.callService(ServiceEndPoint.CHANGE_REQUEST, ivo) as any
    if(res) {
      this.loadPage(res, false)
    }
  }

  /***
   * @description 챗봇서비스 요청용 서비스 함수
   * */
  public async callChatQuery(ivo: ChatbotReqVo, callback?: CallableFunction): Promise<void> {
    const res = await this.callService(ServiceEndPoint.CHAT_QUERY, ivo, true) as any
    if(!res) return
    if(callback) {
      callback(res)
    }
    if(ivo.req_s_in_type === ChatbotInType.break) return

    this.loadPage(res, false)
  }

  /***
   * @description : LoadPage 토픽과 ChatRequest 서비스 응답결과시 호출되는 함수
   * @param isTopic 토픽으로 수신된 경우 true, 서비스로 수신된 경우 false
   * */
  public loadPage(msg: any, isTopic: boolean): void {
    Config.store.commit(StoreMutationKey.setProgress, false)
    Config.store.commit(StoreMutationKey.hideDialog)
    let data: any
    if(isTopic) {
      if (msg.data === '') return
      data = JSON.parse(msg.data)
    } else {
      data = msg
    }

    const vo = new LoadPageVo(data)

    // 에러 발생인 경우
    if(vo.res_s_error_type !== RosErrorType.NONE) {
      const errVo = new RosErrorOvo(vo)
      this.rosErrorHandler(errVo)
      return
    }

    if (vo.res_s_show_comp_id === '') {
      vo.res_s_show_comp_id =  Config.rootState[StoreStateKey.pageVo]?.res_s_show_comp_id as string
    }
    // 스토어에 데이터 저장 후
    const crtPageId = Config.store.state[StoreStateKey.crtPageId]
    vo.res_s_show_page_id = (vo.res_s_show_page_id === '') ? Config.store.state[StoreStateKey.crtPageId] : vo.res_s_show_page_id
    Config.store.commit(StoreMutationKey.setPageVo, vo)
    const path = '/' + vo.res_s_show_page_id
    // const components: any[] = Config.router.getMatchedComponents(path)
    console.log('>> 이동할 페이지 url ::', path)
    if (vo.res_s_show_page_id === crtPageId) {
      // res_show_page_id와 현채페이지가 같은 경우
      // Config.eBus.$emit(RosEventType.SAME_CHANGE_PAGE)
    }
    /*else if (components.length < 2) {
      // 라우터에 페이지가 등록되지 않은 경우
      console.error('!! 정의된 페이지가 없음::', path)
    }*/
    else {
      // 페이지 이동
      CommonUtils.route(path, ()=> {
        // Config.store.commit(StoreMutationKey.setPageVo, vo)
        // const crtPageId = Config.store.state[StoreStateKey.crtPageId]
      })
    }
  }

  private rosErrorHandler(vo: RosErrorOvo): void {
    Config.store.commit(StoreMutationKey.setErrorVo, vo)
    const locale = Config.rootState[StoreStateKey.crtLocale]
    if(vo.res_s_error_type === RosErrorType.ALERT) {
      const info = vo.res_s_error_info
      const title = (locale === LocaleCode.ko) ? info.s_error_name_ko : info.s_error_name_en
      const msg = (locale === LocaleCode.ko) ? info.s_error_message_ko : info.s_error_message_en
      const btnLabel = (locale === LocaleCode.ko) ? info.s_error_btn_label_ko : info.s_error_btn_label_en
      CommonUtils.showDialog(title, msg, DialogType.ALERT, () => {
        // 홈화면으로 이동 요청
        const ivo = new ChangeReqIvo({
          req_s_type: ChangeRequestType.홈으로
        })
        void this.callChangeRequest(ivo)
      }, {confirmLabel: btnLabel})
    }
    else if(vo.res_s_error_type === RosErrorType.ERROR) {
      // CommonUtils.route(RoutePath.)
    }
  }

  /**
   * @description : TTS 발화 요청npm
   * */
  public publishRequestTTS(compId: string): void {
    /*const ivo = new RosChangePageIVo(TopicMessageType.CHANGE_TTS)
    ivo.req_btn_id = compId
    console.log('[publishRequestTTS TopicMessageType.CHANGE_TTS] compId : ', compId)
    this.publish(ivo)*/
  }


  /**
   * @description : 로봇 Effect 처리
   * */
  public publishRobotEffect(type: RobotEffectType, value?: string | IRobotEmotion): void {
    const ivo = new RobotEffectPubVo(type, value)
    this.publish(ivo, TopicEndPoint.ROBOT_EFFECT)
  }
  /*public publishRobotEffect(value: IRobotEmotion): void {
    const ivo = new RobotEffectPubVo(type, value)
    this.publish(vaule, TopicEndPoint.ROBOT_EFFECT)
  }*/

  /**
   * @description : 관리자 화면 로봇 부가서비스(로봇 끄기, 프로그램 종료, 충전위치 보내기)
   * */
  public publishAdminCommand(type: RosRobotControl): void {
    const ivo = new RosRobotControlVo(type)
    this.publish(ivo, TopicEndPoint.ADMIN_COMMAND,false)
  }

  /**
   * @description : 화면을 터치할 때마다 발행
   * */
  public publishTouch(): void {
    if (this.rosMap){
      const ivo = new RosScreenTouchVo(Config.store.state[StoreStateKey.crtPageId])
      this.publish(ivo, TopicEndPoint.SCREEN_TOUCH, false)
    }
  }

  /**
   * @description : 도슨트 자막파일 TTS 요청
   * */
  public publishVtt(val: string): void {
    /*const arr = val.split('|')
    const lastStr = arr[arr.length - 1]
    const vo = new RosChangePageIVo(TopicMessageType.TTS_SUBTITLE)
    vo.req_video_tts_yn = 'Y'
    vo.req_video_tts = val
    console.log('[publishVtt TopicEndPoint.CHANGE_PAGE] val : ', val)
    this.publish(vo, TopicEndPoint.CHANGE_PAGE, false)
    Config.store.commit(StoreMutationKey.setSubtitle, {val: lastStr, tts: false})*/
  }

  public publishVttN(val: string, disableSubtitle?: boolean): void {
    /*const arr = val.split('|')
    const lastStr = arr[arr.length - 1]
    const vo = new RosChangePageIVo(TopicMessageType.TTS_SUBTITLE)
    vo.req_video_tts_yn = 'N'
    vo.req_video_tts = val
    console.log('[publishVttN TopicEndPoint.CHANGE_PAGE] val : ', val)
    this.publish(vo, TopicEndPoint.CHANGE_PAGE, false)
    if (!disableSubtitle) {
      Config.store.commit(StoreMutationKey.setSubtitle, {val: lastStr, tts: false})
    }*/
  }

  public publishRobotControl(type: RosRobotControl): void {
    /*const topic: Topic = this.rosMap.get(TopicEndPoint.ROBOT_CONTROL)
    const param = new RosRobotControlVo(null)
    param.req_page_id = Config.store.state[StoreStateKey.crtPageId]
    param.req_control_type = type
    const msg = new Message({data: JSON.stringify(param)})
    console.log('[publishRobotControl TopicMessageType.ROBOT_CONTROL] msg :', msg)
    topic.publish(msg)*/
  }

  /**
   * @description : TTS 발화 중지 요청
   * */
  public publishStopTts(): void {
    /*const vo = new RosChangePageIVo(TopicMessageType.PAGE_STOP_TTS)
    vo.req_page_id = Config.store.state[StoreStateKey.crtPageId]
    console.log('[publishStopTts TopicMessageType.PAGE_STOP_TTS] Call')
    this.publish(vo, TopicEndPoint.CHANGE_PAGE, false)*/
  }

  // 연결 재시도 함수
  private retryConnection(): void {
    if (Config.isDevMode) return
    this.setConnected(false)
    clearTimeout(this.retryTimeout)
    this.retryTimeout = setTimeout(() => {
      this.retryCnt ++
      this.init()
      console.log('>> 재연결 시도 횟수 =', this.retryCnt)
    }, 1000)
  }

  private setConnected(val: boolean): void {
    if (Config.store) {
      Config.store.commit(StoreMutationKey.setRosConnected, val)
    }
  }

  public supportDevMode(): void {
    if (!Config.isDevMode && !this.isConnected) return
    /*axios.get('/testData/고려1실유물알려줘_detail.json').then((res: AxiosResponse) => {
      const vo = new RosChatbotOvo(res.data.data)
      vo.isDummy = true
      Config.store.commit(StoreMutationKey.setChatbotVo, vo)
      const pageVo = new RosLoadPageVo({res_content: vo})
      Config.store.commit(StoreMutationKey.setPageVo, pageVo)
    })*/
  }
}
