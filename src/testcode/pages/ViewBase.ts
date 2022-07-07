import {Options, Vue, VueDecorator} from 'vue-class-component'
import { StoreMutationKey, StoreStateKey } from 'src/clobot/enums/StoreKeys';
import { BrandColor, CacheablePage, IconCode, LocaleCode } from 'src/clobot/enums/CommonEnums';
import { RoutePath } from 'src/clobot/enums/RoutePath';
import { RosBatteryVo } from 'src/clobot/ros/RosBatteryVo';
import { RosChatbotOvo } from 'src/clobot/ros/outputs/RosChatbotOvo';
import { Config } from 'src/clobot/Config';
import { CommonUtils } from 'src/clobot/utils/CommonUtils';
import { Mutation, State } from 'vuex-class';
import { ChangeRequestType } from 'src/clobot/ros/interfaces/IClobotMsgs';
import { LoadPageVo } from 'src/clobot/ros/outputs/LoadPageVo';
import {ILabel, IRouteMeta} from 'src/clobot/interfaces/CommonInterface';
import { ChatbotReqVo } from 'src/clobot/ros/inputs/ChatbotReqVo';
import { ChatbotInType } from 'src/clobot/ros/RosVoBase';


/*@Options({
  name: 'ViewBase',
  // components: {}
})*/
export default class ViewBase extends Vue {
  /***********************************************************************************************
   * Store
   * **********************************************************************************************/
  @State(StoreStateKey.progress) readonly progress!: boolean
  @State(StoreStateKey.crtLocale) readonly crtLocale!: LocaleCode
  @State(StoreStateKey.subtitle) protected readonly subtitle!: string
  @State(StoreStateKey.fromPath) protected readonly fromPath!: RoutePath | string
  @State(StoreStateKey.crtPageId) protected readonly crtPageId!: string
  @State(StoreStateKey.onlyKorean) protected readonly onlyKorean!: boolean
  @State(StoreStateKey.batteryVo) protected readonly batteryVo!: RosBatteryVo
  @State(StoreStateKey.chatbotVo) protected readonly chatbotVo!: RosChatbotOvo
  @State(StoreStateKey.chatbotAnswerVisible) protected readonly chatbotAnswerVisible!: boolean
  @State(StoreStateKey.pageVo) protected readonly pageVo!: LoadPageVo
  @State(StoreStateKey.rosConnected) protected readonly rosConnected!: boolean
  // 자막보기 패널이 열려있는지 유무
  @State(StoreStateKey.subTitleOpened) protected readonly subTitleOpened!: boolean
  @State(StoreStateKey.cashedPages) protected readonly cashedPages!: CacheablePage[]
  @State(StoreStateKey.activeKonvaLabel) protected activeKonvaLabel!: ILabel
  @State(StoreStateKey.isChatbotAnswerPage) protected isChatbotAnswerPage!: boolean
  @State(StoreStateKey.crtRouterMeta) protected crtRouterMeta!: IRouteMeta
  @State(StoreStateKey.crtParamInStr) protected crtParamInStr!: string

  @Mutation(StoreMutationKey.setSubtitle) protected setSubtitle!: (payload: { val: string, tts: boolean }) => void
  @Mutation(StoreMutationKey.setProgress) protected setProgress!: (val: boolean) => void
  @Mutation(StoreMutationKey.setCrtPageId) protected setCrtPageId!: (id: string) => void
  @Mutation(StoreMutationKey.setChatbotAnswerVisible) protected setChatbotAnswerVisible!: (val: boolean) => void
  @Mutation(StoreMutationKey.setMicRecognitionVo) protected setMicRecognitionVo!: (msg: string) => void
  @Mutation(StoreMutationKey.initCrtButtonId) protected initCrtButtonId!: () => void
  @Mutation(StoreMutationKey.addCachedPage) protected addCachedPage!: (pageName: CacheablePage) => void
  @Mutation(StoreMutationKey.setCrtParamInStr) protected setCrtParamInStr!: (value: string) => void

  /***********************************************************************************************
   * Variables
   * **********************************************************************************************/
  protected routePath = RoutePath
  protected iconCode = IconCode
  protected brandColor = BrandColor
  protected changeRequestType = ChangeRequestType

  protected get activeCompId(): string {
    return this.pageVo.res_s_show_comp_id
  }

  /***
   * @description 페이지 아이디를 기준으로 언어코드를 반환하거나 번역을 제공
   * @param translate true 면 번역된 문장을 리턴
   * @param prefix pageId 를 쓰지 않을 경우 값을 할당
   * */
  protected getLocaleCode(tail: string, translate = false, prefix?: string): string {
    const pageId = CommonUtils.extractPageId(this.$route.path)
    // let code = `${this.crtPageId}.${this.crtPageId}_${tail}`
    let code = `${pageId}.${pageId}_${tail}`
    if(prefix) {
      code = `${prefix}.${prefix}_${tail}`
    }
    if(translate) {
      return CommonUtils.translate(code)
    } else {
      return code
    }
  }

  protected getComId(tail: string): string {
    return `${this.crtPageId}_${tail}`
  }

  protected localeAndCompId(tail: string, translate = false, prefix?: string): {code: string, id: string} {
    const result = {code: '', id: ''}
    let code = `${this.crtPageId}.${this.crtPageId}_${tail}`
    if(prefix) {
      code = `${prefix}.${prefix}_${tail}`
    }
    if(translate) {
      code = CommonUtils.translate(code)
    }
    result.code = code
    result.id = `${this.crtPageId}_${tail}`
    return result
  }

  protected getIconPath(fileName: string): string {
    return `/imgs/icons/${fileName}`
  }

  /*mounted(): void {
    console.log('>> ViewBase mounted ::', this.crtLocale)
  }*/
}
