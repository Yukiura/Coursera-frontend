<template>
  <div class="player-box">
    <div class="head-info">
      <div class="inner">
        <div class="logo-wrapper">
          <el-avatar :size="64" :src="schoolLogo"></el-avatar>
        </div>
        <div class="info-wrapper">
          <div class="course-title">
            <span>{{ courseTitle }}</span>
          </div>
          <div class="class-details">
            <span>{{ className }}</span>
          </div>
        </div>
      </div>
    </div>
    <video ref="videoElement" style="width: 906px" @click="play"></video>
    <div class="control-panel">
      <div class="panel-box">
        <div v-show="isStudent">
          <div class="panel-item">
            <el-tooltip class="item" effect="light" content="举手" placement="top-start">
              <span style="font-size: 40px">🙋‍♀</span>
            </el-tooltip>
          </div>
          <div class="panel-item"  @click="signIn">
            <el-tooltip class="item" effect="light" content="签到" placement="top-start">
              <span style="font-size: 40px">💁</span>
            </el-tooltip>
          </div>
        </div>
        <div v-show="isTeacher">
          <div class="panel-item">
            <el-tooltip class="item" effect="light" content="随机点名" placement="top-start">
              <span style="font-size: 40px">🕵🏻</span>
            </el-tooltip>
          </div>
          <div class="panel-item"  @click="signIn">
            <el-tooltip class="item" effect="light" content="发布签到" placement="top-start">
              <span style="font-size: 40px">🧙🏻</span>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'

export default {
  name: "LiveTV",
  props: ['liveUrl', 'schoolLogo', 'courseTitle', 'className'],
  data() {
    return {
      flvPlayer: null,
      isStudent: false,
      isTeacher: false
    }
  },
  methods: {
    play() {
      this.flvPlayer.play();
    },
    signIn() {
      this.$bus.$emit('sign_in')
    }
  },
  mounted() {
    if (flvjs.isSupported()) {
      const videoElement = this.$refs.videoElement;
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: this.liveUrl
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
    }
    const roleSet = new Set(this.$store.state.roleList)
    this.isStudent = roleSet.has('学生')
    this.isTeacher = roleSet.has('教师')
  },
  beforeDestroy() {
    this.flvPlayer.pause()
    this.flvPlayer.unload()
    this.flvPlayer.detachMediaElement()
    this.flvPlayer.destroy()
    this.flvPlayer = null
  }
}
</script>

<style scoped>
.player-box {
  width: 906px;
  box-sizing: border-box;
  position: relative;
  display: block;
  font-family: Arial, "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", 微软雅黑, serif !important;
  margin-right: 20px;
}

.head-info {
  height: 98px;
  border: 1px solid #E3E5E7;
  border-radius: 12px 12px 0 0;
  box-sizing: border-box;
  position: relative;
  display: block;
  background-color: white;
}

.control-panel {
  height: 124px;
  border: 1px solid #E3E5E7;
  border-top-color: transparent;
  border-radius: 0 0 12px 12px;
  background-color: white;
  box-sizing: border-box;
  position: relative;
  display: block;
}

.inner {
  padding: 17px;
  position: relative;
  display: flex;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.logo-wrapper {
  display: block;
  width: 64px;
  height: 64px;
}

.info-wrapper {
  width: calc(100% - 81px);
  margin-left: 17px;
  flex: 1;
  align-self: center;
  display: block;
}

.course-title {
  min-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.class-details {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #9499A0;;
}

.panel-box {
  display: block;
  height: 84px;
  padding: 20px;
}

.panel-item {
  width: 80px;
  display: flex;
  float: right;
}

.panel-item:hover {
  cursor: pointer;
}
</style>