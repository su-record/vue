import axios, { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';
import { StoreMutationKey, StoreStateKey } from 'src/clobot/enums/StoreKeys';
import { Config } from 'src/clobot/Config';
import { DialogType, DialogVo, DialogVoOption } from 'src/clobot/models/DialogVo';
import { ChatbotInType } from 'src/clobot/ros/RosVoBase';
import { ChatbotIvo } from 'src/clobot/ros/ChatbotIvo';
import { RosManager } from 'src/clobot/ros/RosManager';
import { date, uid, colors } from 'quasar';
import { IProgressOptions } from 'src/clobot/interfaces/CommonInterface';
import { RoutePath } from 'src/clobot/enums/RoutePath';
import Konva from 'konva';
import { Router } from 'vue-router';
import { LoadPageVo } from 'src/clobot/ros/outputs/LoadPageVo';

export class CommonUtils {
  /**
   * @description 특정 VO를 넘겨진 data의 값으로 업데이트 )할때 쓰임
   * @param vo {Object} 업데이트 할 VO
   * @param data {Object} 업데이트 값을 가지고 있는 데이터
   * */
  public static updateVO(vo: any, data: any): void {
    if (!data) return
    for (const key in data) {
      const voKey = key
      if (vo.hasOwnProperty(voKey)) {
        vo[voKey] = data[key]
      }
    }
  }

  /**
   * @description : 인터페이스 형태로 된 모델을 업데이트 할 경우
   * */
  public static updateInterface(target: object, data: object): void {
    if (!data) return
    for (const key in data) {
      (target as any)[key] = (data as any)[key]
    }
  }

  public static showHideProgress(visible: boolean, msg?: string | null): void {
    const option: IProgressOptions = {
      visible: visible,
      spinnerSize: 120,
      spinnerColor: 'primary',
    }
    if(msg) {
      option.message = msg
    }
    Config.store.commit(StoreMutationKey.setProgress, option)
  }

  /**
   * @description : 다국어 처리를 위한 함수
   * */
  public static translate(code: string, param?: any): string {
    if (param) {
      return Config.i18n.t(code, param) as string
    } else {
      return Config.i18n.t(code) as string
    }
  }

  /***
   * @description : 글로벌로 팝업메세지를 띄우는 함수
   * */
  public static  showDialog(title: string, message: string,
                            type: DialogType = DialogType.ALERT,
                            callback?: (act: any) => void,
                            option?: DialogVoOption) {
    const msgVO: DialogVo = new DialogVo(title, message, callback, type, option)
    /*if (option) {
      CommonUtils.updateVO(msgVO, option)
    }*/
    Config.store.commit(StoreMutationKey.showDialog, msgVO)
  }

  public static genUUID(): string {
    return uid()
  }

  /***
   * @description : 마이크로타임베이스의 UUID를 생성
   * */
  public static genMicroTimeUUID(): string {
    const t0 = performance.now()
    const now = date.formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss') // dayjs().format('YYYY-MM-DD hh:mm:ss') // new Date().getTime()
    const t1 = performance.now()
    const micro = (t1 - t0).toFixed(6)
    const result = now + micro.replace('0.', '.') + this.genUUID()
    // console.log('>> micro =', result)
    return result
  }

  public static ynToBoolean(flag: 'Y' | 'N'): boolean {
    return flag === 'Y'
  }

  /***
   * @description : 챗봇 로컬 테스트용 Api
   * */
  public static async testChatbot(inStr: string,
                                  cb?: (res: any) => void,
                                  type: ChatbotInType = ChatbotInType.query): Promise<any> {
    const url = 'http://59.13.28.124:5201/chat'
    // const url = 'http://175.125.91.176:7003/chat'
    const body = new ChatbotIvo(inStr)
    body.in_type = type
    if (inStr === 'qi_tm_exhibit028') {
      body.dialogue_id = 'dialogue_619c31aa-24b3-4d40-987e-6415c2c82701'
    } else if (inStr === '125416') {
      body.dialogue_id = 'dialogue_b353f2af-4280-4c43-a8ea-d017dacbe3db'
    }
    return axios.post(url, body).then((res: AxiosResponse) => {
      if (cb) {
        cb(res.data)
      }
      Config.store.commit(StoreMutationKey.setChatbotVo, res.data)
    }).catch((err: AxiosError) => {
      console.log('>> 챗봇 요청에러 ::', err)
    })
  }

  /**
   * @description : 라우트 path 로부터 페이지의 아이디를 추출
   * */
  public static extractPageId(path: string): string {
    const split = path.split('/')
    let id = ''
    if (split.length >= 2) {
      id = split[split.length - 1]
    }
    return id
  }

  /***
   * @description > route path 를 기준으로 페이지의 이름을 추출
   * @param path > url 의 경로
   * */
  public static getPageTitle(path?: RoutePath): string {
    const enumValue = path || Config.router.currentRoute.value
    let title = '메인'
    for(const key in RoutePath) {
      const val = (RoutePath as any)[key]
      // console.log('>> val =', enumValue, val)
      if(val === enumValue) {
        title = key
      }
    }
    return title
  }

  /***
   * @description Vuex store의 state 값을 복사
   * */
  public static cloneStoreState(data: any): any {
    const str = JSON.stringify(data)
    return JSON.parse(str)
  }

  /**
   * @description base64로 인코딩된 이미지 데이터를 Blob 으로 반환
   * @return Blob
   * */
  public static base64ToBlob(b64Data: string, format = 'png'): Blob {
    const byteChars = atob(b64Data)
    const byteNums = new Array(byteChars.length)
    for (let i = 0; i < byteNums.length; i++) {
      byteNums[i] = byteChars.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNums)
    const type = `image/${format};base64`
    const blob = new Blob([byteArray], { type: type})
    return blob
  }

  /***
   * @description : 이미지의 url 경로 또는 base64 스트링을 가지고 HTMLImage를 반환
   * @param src : 이미지의 url 경로 또는 base64 코드
   * @return HTMLImageElement
   * */
  public static async generateImageEl(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if(!src) {
        reject()
        return
      }
      const img = new Image()
      img.onload = (ev: any) => {
        resolve(img)
      }
      if(src.length < 100) {
        img.src = src
      } else {
        const blob = CommonUtils.base64ToBlob(src)
        img.src = URL.createObjectURL(blob)
      }
    })
  }

  /***
   * @description 캔버스 이미지의 특정 위치에 대한 색상 정보를 반환
   * @return string : #ff00ff 등과 같은 스트링
   * */
  public static getColorFromCanvas(canvas: HTMLCanvasElement, ev: MouseEvent | Konva.Vector2d): string {
    const pos = canvas.getBoundingClientRect()
    if(!pos) return ''

    const ratio = window.devicePixelRatio // 사용자의 화면 해상도에 따라 동적 대응
    let tx = 0
    let ty = 0
    if(ev instanceof MouseEvent) {
      tx = (ev.pageX - pos.x) * ratio
      ty = (ev.pageY - pos.y) * ratio
    } else {
      tx = ev.x
      ty = ev.y
    }

    const ctx = canvas.getContext('2d')
    const data = ctx!.getImageData(tx, ty, 1, 1).data
    // 이미지에 투명도가 있는경우
    if((data[0] == 0) && (data[1] == 0) && (data[2] == 0) && (data[3] == 0)){
      console. log(' (Transparent color detected, cannot be converted to HEX)')
    }
    // const hex = '#' + ('000000' + RosUtil.rgbToHex(data[0], data[1], data[2])).slice(-6)
    const hex = colors.rgbToHex({r: data[0], g: data[1], b: data[2]})
    // console.log('>> 찍은 좌표의 컬러 =',tx, ty, hex)
    return hex
  }

  public static route(toUrl: RoutePath | string, callback?: CallableFunction): void {
    console.log('>> 페이지 이동  ::', toUrl)
    Config.store.commit(StoreMutationKey.setMicRecognitionVo, '')
    Config.store.commit(StoreMutationKey.setActiveKonvaLabel, null)

    void Config.router.push(toUrl).then(() => {
      const compId = (Config.store.state[StoreStateKey.pageVo] as LoadPageVo).res_s_show_comp_id
      console.log('>> 활성화 될 compId ::', compId)
    })
  }

  /***
   * @description : 앱의 전체 높이를 기준으로 대상 엘리먼트의 최대 높이를 반환
   * @param id 높이를 측정할 대상 엘리먼트의 id
   * @param bottom 아래 여백
   * */
  public static makeFullHeight(id: string, bottom = 0): string {
    let result = '100%'
    const target = document.getElementById(id)
    if(target) {
      /*const pageRect = CommonUtils.pageBoundRect
      const targetRect = target?.getClientRects()[0]
      const mt = window.innerHeight - pageRect.height
      result = _.toInteger(pageRect.height - CommonUtils.headerHeight / 2 - targetRect.y - bottom) + 'px'
      target.style.height = result*/

      const pageRect = CommonUtils.pageBoundRect
      const targetRect = target?.getClientRects()[0]
      const mt = window.innerHeight - targetRect.y - bottom
      result = _.toInteger(pageRect.height - CommonUtils.headerHeight / 2 - targetRect.y - bottom) + 'px'
      target.style.height = result
    }
    console.log('>> measureFullHeight ::', result)

    return result
  }

  /***
   * @description > TM쪽에 보내는 인풋 데이터로 변환
   *                res_ >> req_ 로 바꾸어 주는 함수
   * */
  public static parseToIvo(src: any): any {
    const ivo: any = {}
    for(const key in src) {
      const val = src[key]
      const replaced = key.replace('res_', 'req_')
      ivo[replaced] = val
    }
    console.log('>> 인풋변환 결과 ::', ivo)
    return ivo
  }

  public static trace(data: any, prefix = ''): void {
    console.log('------ [Trace begin] ' + prefix + ' ------')
    for(const key in data) {
      const append = `> ${key} :`
      console.log(append, data[key])
    }
    console.log('------ [Trace end] ------')
  }

  /***
   * @description MainLayout 의 Header 영역의 높이를 반환
   * */
  public static get headerHeight(): number {
    const header = document.getElementById('cb-header')
    return header?.getBoundingClientRect().height || 0
  }
  public static get pageBoundRect(): DOMRect {
    const page = document.getElementsByClassName('q-page')[0]
    console.log('>>> page ::', page.getBoundingClientRect())
    return page.getBoundingClientRect()
  }

  /***
   * @description ref를 기준으로 target top 속성을 설정
   * @param ref 기준이 되는 엘리먼트의 id 또는 class (class일 경우 앞에 반드시 '.'을 붙임)
   * @param target top 속성을 적용시킬 엘리먼트의 id 또는 class (class일 경우 앞에 반드시 '.'을 붙임)
   * @param pct ref 높이의 몇 퍼센트에 위치시킬지를 주는 값 (퍼센트) 기본 50 = 50%
   * */
  public static setRelativeTop(ref: string, target: string, pct = 50): void {
    const refEl = CommonUtils.getElementByIdOrClass(ref)
    const targetEl = CommonUtils.getElementByIdOrClass(target)

    if(!refEl || !targetEl) {
      console.log('>> setRelativeTop 처리할 수 없음 ::', refEl, targetEl)
      return
    }
    const pageTop = CommonUtils.pageBoundRect.y
    const refRect = refEl.getBoundingClientRect()
    const targetRect = targetEl.getBoundingClientRect()
    const mo = _.round(100 / pct, 2)

    const top = refRect.y + refRect.height / mo - pageTop - targetRect.height / mo
    targetEl.style.top = _.toInteger(top) + 'px'
  }
  public static getElementByIdOrClass(idOrClass: string): HTMLElement | undefined {
    let el: HTMLElement | undefined = undefined
    if(idOrClass.includes('.')) {
      const className = idOrClass.replace('.', '')
      const els = document.getElementsByClassName(className)
      if(els.length === 1) {
        el = els[0] as HTMLElement
      }
    } else {
      el = document.getElementById(idOrClass) || undefined
    }
    return el
  }
}
