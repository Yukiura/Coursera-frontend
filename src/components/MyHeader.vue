<template>
  <div class="international-header report-wrap-module">
    <div class="mini-header m-header mini-type">
      <div class="mini-header__content mini-header--login">
        <div class="nav-link">
          <div class="item">
            <el-image :src="logoImg" style="height: 40px"></el-image>
          </div>
        </div>
        <div class="nav-search-box">
          <SearchBar/>
        </div>
        <div class="nav-user-center">
          <div class="user-con signin">
            <div class="item">
              <el-avatar class="mini-avatar" :src="this.$store.state.userAvatar">
                <span @click="handleAvatar" class="login-prompt" style="font-size: 15px;">登录</span>
              </el-avatar>
            </div>
            <div class="item">
              <div class="nav-item nav-item-dynamic">
                <span>{{ this.$store.state.username }}</span>
              </div>
            </div>
            <div class="item" style="width: 100px">
              <el-button type="primary" v-show="this.$store.state.loginStat">用户中心</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../assets/logo.png'
import SearchBar from "@/components/SearchBar";

export default {
  name: "PageHeader",
  components: {SearchBar},
  data() {
    return {
      logoImg: logo,
      avatar: ''
    };
  },
  methods: {
    handleAvatar() {
      if (this.$route.path !== '/login')
        this.$router.push('/login')
    },
    check() {
      console.log('登录状态: ' + this.$store.state.loginStat)
      console.log('用户名: ' + this.$store.state.username)
    }
  }
}
</script>

<style scoped>
.international-header {
  min-width: 999px;
  min-height: 56px;
}

.nav-item {
  float: left;
  text-align: center;
  /* line-height: 42px; */
  /* height: 42px; */
  position: relative;
  background-color: rgba(255, 255, 255, 0);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.international-header .mini-type, .van-popover .mini-type {
  position: relative;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
}

.international-header *, .van-popover * {
  box-sizing: border-box;
}

.mini-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: relative;
}

.mini-header__content {
  box-sizing: border-box;
  padding: 10px 24px;
  line-height: 30px;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.bili-header-m .nav-search-box, .international-header .nav-search-box {
  margin: 0 10px;
  width: 500px;
  transition: 0.3s width;
  display: flex;
}

.international-header {
  -webkit-font-smoothing: antialiased;
  font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  position: relative;
  z-index: 1000;
  margin: 0;
  padding: 0;
}

.nav-user-center {
  display: flex;
  flex-shrink: 0;
}

.nav-user-center .user-con {
  display: flex;
  align-items: center;
}

.nav-user-center .user-con .item {
  position: relative;
  display: flex;
  margin-left: 12px;
  cursor: pointer;
}

.mini-header {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 56px;
}

a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  word-break: break-word;
}

* {
  margin: 0;
  padding: 0;
}

div {
  display: block;
}
</style>