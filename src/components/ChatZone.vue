<template>
  <div>
    <el-card>
      <MsgItem v-for="msg in msgList" :msg-body="msg" :key="msg.time"/>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button @click="send" :disabled="sendCheck">发送</el-button>
    </el-card>
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
        data: this.classId,
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

</style>