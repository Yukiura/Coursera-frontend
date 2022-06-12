<template>
  <div class="chat-zone-wrapper">
    <el-container style="height: 120px;">
    </el-container>
    <div class="history-msg">
      <el-container style="height: 459px; overflow-y:scroll;">
        <el-col>
          <el-row v-for="msg in msgList" :key="msg.time">
            <MsgItem :msg-body="msg"/>
          </el-row>
        </el-col>
      </el-container>
    </div>
    <div class="input-zone">
      <el-input v-model="input" placeholder="说点什么，参与互动吧" style="width: 292px"></el-input>
      <div class="operation-zone">
        <div class="interaction-zone">
        </div>
        <el-button @click="send" :disabled="sendCheck" type="primary">发送</el-button>
      </div>
    </div>
    <el-dialog title="签到" :visible.sync="signInDialogVisible">
      <div v-show="startSignInVisible">
        <div v-show="signInEnded">
          <el-form>
            <el-form-item label="发起签到" :label-width="formLabelWidth">
              <el-select v-model="duration" placeholder="请选择签到持续时长">
                <el-option label="5分钟" value="5"></el-option>
                <el-option label="10分钟" value="10"></el-option>
                <el-option label="15分钟" value="15"></el-option>
                <el-option label="30分钟" value="30"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button @click="startSignIn" type="primary">开始</el-button>
        </div>
        <div v-show="signInOnGoing">
          <span>签到将于{{ signInTimeLeft }}后结束</span>
        </div>
        <el-table :data="signedInList">
          <el-table-column property="sid" label="学号" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
        </el-table>
      </div>
      <div v-show="signInVisible">
        <div v-show="signInOnGoing">
          <span>签到将于{{ signInTimeLeft }}后结束</span>
          <el-button @click="signIn" type="primary" :disabled="signInCompleted">签到</el-button>
        </div>
        <div v-show="signInCompleted">
          <span>您已经完成签到</span>
        </div>
        <div v-show="signInEnded">
          <span>老师尚未发布签到</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MsgItem from "@/components/MsgItem";

let socket

export default {
  name: "ChatZone",
  props: ['classId'],
  components: {MsgItem},
  data() {
    return {
      token: '',
      username: '',
      msgList: [],
      studentList: [],
      input: '',
      signInDialogVisible: false,
      duration: '',
      formLabelWidth: '120px',
      signInTimeLeft: '',
      signedInList: [],
      startSignInVisible: false,
      signInVisible: false,
      role: '',
      signInOnGoing: false,
      signInCompleted: false,
      signInEnded: false
    }
  },
  computed: {
    sendCheck() {
      return this.input === '';
    }
  },
  methods: {
    send() {
      socket.send(JSON.stringify({
        code: 200,
        type: "TEXT",
        data: this.input
      }))
      this.input = ''
    },
    startSignIn() {
      socket.send(JSON.stringify({
        code: 200,
        type: 'SIGN_IN_START',
        data: this.duration
      }))
    },
    signIn() {
      socket.send(JSON.stringify({
        code: 200,
        type: 'SIGN_IN',
        data: null
      }))
    }
  },
  mounted() {
    const roleSet = new Set(this.$store.state.roleList)
    this.startSignInVisible = roleSet.has('教师')
    this.signInVisible = roleSet.has('学生')
    this.role = roleSet.has('教师') ? 1 : 0
    this.$bus.$on('sign_in', () => {
      socket.send(JSON.stringify({
        code: 200,
        type: 'SIGN_IN_STATUS',
        data: null
      }))
      this.signInDialogVisible = true
    })
    this.token = localStorage.getItem('token')
    this.username = localStorage.getItem('username')
    socket = new WebSocket('ws://localhost:80/chat')
    // WebSocket打开时, 使用token验证用户身份, 并且发送班级Id到后台
    socket.onopen = () => {
      console.log("Websocket成功打开")
      socket.send(JSON.stringify({
        code: 200,
        type: "VERIFY",
        data: this.token
      }))
      socket.send(JSON.stringify({
        code: 200,
        type: "CLASS",
        data: this.classId + ''
      }))
      // 设置消息处理逻辑
      socket.onmessage = (msg) => {
        console.log("Websocket消息: " + msg.data)
        let msgBody = JSON.parse(msg.data)
        let msgType = msgBody.type
        console.log("消息类型: " + msgType)
        if (msgType === 'HISTORY') {
          // 获取历史消息
          console.log("加载历史消息")
          this.msgList = msgBody.data
        } else if (msgType === 'LIST') {
          // 获取在线用户列表
          console.log("获取班级学生列表")
          this.studentList = msgBody.data
        } else if (msgType === 'TEXT') {
          // 获取消息
          msgBody.id = this.msgList[this.msgList.length - 1].id + 1
          this.msgList.push(msgBody.data)
        } else if (msgType === 'COUNTDOWN') {
          this.signInTimeLeft = msgBody.data
        } else if (msgType === 'SIGN_IN_LIST') {
          this.signedInList = msgBody.data
        } else if (msgType === 'SIGN_IN_STATUS') {
          let signInStatus = msgBody.data
          if (signInStatus === 2) {
            this.signInOnGoing = false
            this.signInCompleted = true
          } else if (signInStatus === 1) {
            this.signInCompleted = false
            this.signInOnGoing = true
            this.signInEnded = false
          } else if (signInStatus === 0) {
            this.signInOnGoing = false
            this.signInCompleted = false
            this.signInEnded = true
          }
        }
      }
    }
  }
}

</script>

<style scoped>
.chat-zone-wrapper {
  width: 302px;
  height: 732px;
  display: block;
  background-color: white;
  border: 1px solid #E3E5E7;;
  border-radius: 12px;
}

.input-zone {
  width: 292px;
  height: 100px;
  display: block;
  padding: 5px;
  background-color: #eff2f6;
}

.history-msg {
  height: 459px;
  background-color: #eff2f6;
  padding: 5px;
}

.operation-zone {
  display: flex;
  margin-top: 10px;
}

.interaction-zone {
  display: flex;
  width: 220px;
}

.interaction-item {
  display: flex;
  width: 40px;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 14px;
  background-color: #F5F5F5;
}

/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #999999;
}
</style>