<template>
  <router-view/>
  <!-- 중앙 모달 -->
  <clobot-dialog
    v-for="vo in dialogs"
    :key="vo.id"
    :vo="vo"
  />

  <!-- QR 코드 -->
  <qr-code v-show="qrVisible" class="absolute-bottom" />

  <!--  <sub-title />-->
  <sub-title2 v-show="subTitleVisible" />

  <!-- 디버깅용 메뉴 셀렉트  -->
  <clobot-select
    v-if="linkVisible"
    :options="options"
    class="dev-link-btn"
    v-model="crtMenu"
    use-input
    input-debounce="0"
    label="페이지 선택/검색"
    option-label="name"
    option-value="path"
    @filter="filterFn"
    @update:model-value="onLinkSelected"
    clearable
    color="red"
  />
</template>

<script lang="ts">
import {State} from 'vuex-class';
import {CommonUtils} from 'src/clobot/utils/CommonUtils';
import {StoreStateKey} from 'src/clobot/enums/StoreKeys';
import ClobotDialog from 'components/common/ClobotDialog.vue';
import {Options, Vue} from 'vue-class-component';
import {DialogVo} from 'src/clobot/models/DialogVo';
import {RosManager} from 'src/clobot/ros/RosManager';
import {Config} from 'src/clobot/Config';
import {RoutePath} from 'src/clobot/enums/RoutePath';
import SubTitle from 'components/common/SubTitle.vue';
import ClobotSelect from 'components/common/ClobotSelect.vue';
import SubTitle2 from 'components/SubTitle2.vue';
import {Watch} from 'vue-property-decorator';
import QrCode from 'components/QrCode.vue';


@Options({
  name: 'App',
  components: { QrCode, SubTitle2, ClobotSelect, SubTitle, ClobotDialog}
})
export default class App extends Vue {
  /***********************************************************************************************
   * Store
   * **********************************************************************************************/
  @State(StoreStateKey.dialogs) readonly dialogs!: DialogVo[]

  /***********************************************************************************************
   * Decorators
   * **********************************************************************************************/
  @Watch('$route.path') private routeWatch(): void {
    // console.log('@routeWatch !!!')
    this.updateBg()
  }

  /***********************************************************************************************
   * Getters
   * **********************************************************************************************/
  private get linkVisible(): boolean {
    if (Config.isDevMode) {
      for (const routePathKey in RoutePath) {
        const path: string = (RoutePath as any)[routePathKey];
        const item = {name: routePathKey, path: path};
        this.links.push(item);
      }
      this.options = this.links
    }
    return Config.isDevMode
  }

  private get qrVisible(): boolean {
    const path = this.$route.path as RoutePath
    return !Config.ALL_HIDE_CONDITIONS.includes(path) && Config.QR_CONDITIONS.includes(path)
  }

  private get subTitleVisible(): boolean {
    const path = this.$route.path as RoutePath
    return !Config.ALL_HIDE_CONDITIONS.includes(path) && Config.SUBTITLE_CONDITIONS.includes(path)
  }

  /***********************************************************************************************
   * Variables
   * **********************************************************************************************/
  private crtMenu = null
  private links: { name: string, path: string }[] = []
  private options: { name: string, path: string }[] = []
  private appEl!: HTMLElement | null

  /***********************************************************************************************
   * Life cycles
   * **********************************************************************************************/
  created(): void {
    // 다크모드로 셋팅
    Config.qGlobals = this.$q
    // Config.qGlobals.dark.set(true)
    Config.rosManager = new RosManager()
    Config.rosManager.connect()
  }

  mounted(): void {
    // CommonUtils.showDialog('', '테스트' + this.crtLocale)
    this.appEl = document.getElementById('q-app')
    this.appEl!.onclick = this.onAppClick
    this.updateBg()
    // console.log('>> appEl className ::', this.appEl!.className)
    // console.log('>> appEl style ::', this.appEl!.style)
  }

  /***********************************************************************************************
   * Methods
   * **********************************************************************************************/
  private filterFn(val: string, update: CallableFunction): void {
    if (val === '') {
      update(() => {
        this.options = this.links
      })
      return
    }
    update(() => {
      const needle = val.toLowerCase()
      this.options = this.links.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
    })
  }

  private onLinkSelected(item: { name: string, path: string }) {
    if (!item) return
    CommonUtils.route(item.path)
  }

  // 라우트 경로에 따라 앱의 백그라운드 이미지를 바꿔줌
  private updateBg(): void {
    let bgName = ''
    switch (this.$route.path as RoutePath) {
      case RoutePath.메인:
        bgName = 'bg-main.jpg'
            break

      case RoutePath.도슨트_대기:
      case RoutePath.홍보_대기:
        bgName = 'bg-3.jpg'
        break

      case RoutePath.대기:
      case RoutePath.루트:
      case RoutePath.길안내_대기:
        bgName = 'bg-4.jpg'
            break

      case RoutePath.이동홍보_주행:
      case RoutePath.길안내_종료:
        bgName = 'bg-5.jpg'
        break

      case RoutePath.이동홍보_1:
      case RoutePath.도슨트이동_0:
      case RoutePath.길안내_시작:
        bgName = 'bg-6.jpg'
        break

      case RoutePath.도슨트이동_1:
      case RoutePath.도슨트이동_2:
      case RoutePath.도슨트이동_3:
      case RoutePath.도슨트이동_4:
      case RoutePath.도슨트이동_5:
      case RoutePath.영화와친해지기:
        bgName = 'bg-movie.png'
        break

      case RoutePath.도킹:
      case RoutePath.언도킹:
        bgName = 'bg-move.jpg'
        break

      case RoutePath.충전기이동:
        bgName = 'bg-movecharge.jpg'
        break

      case RoutePath.비상정지:
      case RoutePath.ROS_끊김:
        bgName = 'bg-emergency.jpg'
        break

      case RoutePath.경로탐색실패:
        bgName = 'bg-failed.jpg'
        break

      case RoutePath.부팅대기:
        bgName = 'bg-reminding.jpg'
        break

      case RoutePath.관제제어:
        bgName = 'bg-servercontrol.jpg'
        break

      case RoutePath.부팅체크:
      case RoutePath.관리자:
        this.appEl!.style.background = '#0a2a70'
        return

      case RoutePath.도슨트_플레이:
      case RoutePath.도슨트_플레이_C:
        this.appEl!.style.background = 'black'
        return

      // 배경이미지 안나온 부분
      default:
        this.appEl!.style.background = ''
        return
    }
    console.log('>> bg =', bgName)
    this.appEl!.style.background = `url(/imgs/bg/${bgName}) no-repeat`
  }

  private onAppClick(): void {
    // console.log('$$$$$$ cc')
    Config.rosManager.publishTouch()
  }
}
</script>
<style lang="scss" scoped>
.dev-link-btn {
  position: absolute;
  z-index: 3;
  top: 170px;
  left: 40px;
  width: 250px;
}
</style>
