import {Store} from 'vuex';
import {VueI18n} from 'vue-i18n';
import {RosManager} from 'src/clobot/ros/RosManager';
import {QVueGlobals} from 'quasar';
import {StoreStateKey} from 'src/clobot/enums/StoreKeys';
import VueRouter, {Router} from 'vue-router';
import {IRootState} from 'src/store';
import { CacheablePage } from 'src/clobot/enums/CommonEnums';
import _ from 'lodash';
import { RoutePath } from 'src/clobot/enums/RoutePath';

export class Config {
  public static isDevMode = false
  public static qGlobals: QVueGlobals // $q
  public static router: Router // VueRouter |
  public static store: Store<IRootState>
  public static i18n: VueI18n
  public static rosManager: RosManager
  public static cacheablePages: string[] = []
  // public static colorCanvas: HTMLCanvasElement
  public static btnSound = new Audio('/sound/btn_click.mp3')
  public static beepSound = new Audio('/sound/vr_input.mp3')

  public static readonly WEEK_DAYS = new Map<string, string[]>([
    ['ko', ['일', '월', '화', '수', '목', '금', '토']],
    ['en', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']],
    ['jp', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']],
    ['cn', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']]
  ])

  // qr 코드, 서브타이틀, 하이 큐아이 모두 가려야 하는 경우들
  public static readonly ALL_HIDE_CONDITIONS: RoutePath[] = [
    RoutePath.이용안내,
    RoutePath.한국영화역사,
    RoutePath.영화인들,
    RoutePath.한국영화컬렉션,
    RoutePath.컬렉션_기본,
    RoutePath.컬렉션_기본_세부,
    RoutePath.컬렉션_해외,
    RoutePath.컬렉션_흥행,
    RoutePath.컬렉션_흥행_세부,
    RoutePath.컬렉션_영화제,
    RoutePath.컬렉션_영화제_세부,
    RoutePath.답변_영화,
    RoutePath.답변목록_1,
    RoutePath.답변목록_2,
    RoutePath.답변_1,
    RoutePath.답변_2,
    RoutePath.답변_3,
    RoutePath.답변_4
  ]

  public static readonly HI_QI_CONDITIONS: RoutePath[] = [
    RoutePath.메인,
    RoutePath.영화박물관,
    RoutePath.전시안내,
    RoutePath.영화와친해지기,
    RoutePath.영상자료원
  ]

  public static readonly QR_CONDITIONS: RoutePath[] = [
    RoutePath.메인,
    RoutePath.영상자료원,
    RoutePath.상영일정,
    RoutePath.영화박물관,
    RoutePath.전시안내,
    RoutePath.온라인전시,
    RoutePath.온라인전시_상세1,
    RoutePath.온라인전시_상세2,
    RoutePath.온라인전시_상세3,
    RoutePath.온라인전시_상세4,
    RoutePath.교육안내,
    RoutePath.영화와친해지기,
    RoutePath.챗봇_메인,
    RoutePath.챗봇_FAQ,
    RoutePath.챗봇_박물관_이용,
    RoutePath.챗봇_영화정보,
    RoutePath.도슨트_종료,
    RoutePath.도슨트_종료_C,
  ]

  public static readonly SUBTITLE_CONDITIONS: RoutePath[] = [
    RoutePath.메인,
    RoutePath.영상자료원,
    RoutePath.시네마테크_KOFA,
    RoutePath.영상도서관,
    RoutePath.상영일정,
    RoutePath.영화박물관,
    RoutePath.박물관소개,
    RoutePath.전시안내,
    RoutePath.상설전시,
    RoutePath.온라인전시,
    RoutePath.온라인전시_상세1,
    RoutePath.온라인전시_상세2,
    RoutePath.온라인전시_상세3,
    RoutePath.온라인전시_상세4,
    RoutePath.교육안내,
    RoutePath.영화와친해지기,
    RoutePath.도슨트_종료,
    RoutePath.도슨트_종료_C,
    RoutePath.기관소개,
    RoutePath.도슨트_일반_메인
  ]

  /***
   * @description : 챗봇데이터 캐시가 필요한 페이지의 캐시유지 또는 제거를 위한 변수로
   * MainLayout 의 뒤로 가기 버튼을 눌러서 네비게이션이 이루어지는 경우 true
   * router 에서 beforeEnter 함수에서 false 로 바꾸어줌.
   * */
  public static isBackBtnPressed = false

  /***
   * @description: 개발자모드에서 RosBridge 에 연결이 안되어있으면 true
   * */
  public static get isOfflineDevMode(): boolean {
    const rosConnected = Config.store.state[StoreStateKey.rosConnected]
    return Config.isDevMode && !rosConnected
  }

  public static init(): void {
    console.log('>> 런타임 환경 ::', process.env.NODE_ENV)

    // 캐시해야할 페이지 목록을 정의
    Config.cacheablePages = _.values(CacheablePage)

    Config.isDevMode = process.env.NODE_ENV === 'development'

    /*if(!Config.isDevMode) { // 프로덕션 빌드에서는 콘솔출력 방지
      console.log = function() {
        // mute
      }
      console.table = function () {
        // mute
      }
    }*/

    // void Config.createColorCanvas()

    if(Config.isDevMode) {
      // 개발자모드에서는 커서 보이도록
      document.body.setAttribute('style', 'cursor: default !import')
    }

    // Config.rosManager = new RosManager()
    // Config.rosManager.connect()
  }

  public static get rootState(): IRootState {
    return Config.store.state
  }

  /*private static async createColorCanvas(): Promise<void> {
    Config.colorCanvas = document.createElement('canvas')
    Config.colorCanvas.width = 256
    Config.colorCanvas.height = 10
    const image = await ComMonUtils.generateImageEl('/img/comMon/rainbow.png')
    this.colorCanvas.getContext('2d')!.drawImage(image, 0, 0)
  }*/
}
