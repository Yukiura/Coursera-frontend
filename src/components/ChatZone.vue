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
      <el-button @click="send" :disabled="sendCheck" style="margin-top: 8px; float: right; margin-right: 10px" type="primary">发送</el-button>
    </div>
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
      input: ''
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
        data: this.input,
        sender: this.username,
        receiver: "SYS"
      }))
      this.input = ''
    }
  },
  mounted() {
    this.token = localStorage.getItem('token')
    this.username = localStorage.getItem('username')
    socket = new WebSocket('ws://localhost:80/chat')
    // WebSocket打开时, 使用token验证用户身份, 并且发送班级Id到后台
    socket.onopen = () => {
      console.log("Websocket成功打开")
      socket.send(JSON.stringify({
        code: 200,
        type: "VERIFY",
        data: this.token,
        sender: this.username,
        receiver: "SYS"
      }))
      socket.send(JSON.stringify({
        code: 200,
        type: "CLASS",
        data: this.classId + '',
        sender: this.username,
        receiver: "SYS"
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