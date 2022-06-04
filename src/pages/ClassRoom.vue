<template>
  <div>
    <LiveTV/>
    <ChatZone class-id="1"/>
  </div>
</template>

<script>
import ChatZone from "@/components/ChatZone";
import LiveTV from "@/components/LiveTV";

export default {
  name: "ClassRoom",
  components: {LiveTV, ChatZone},
  data() {
    return {
      token: ''
    }
  },
  methods: {},
  beforeCreate() {
    this.token = localStorage.getItem('token')
  }
}
</script>

<style scoped>

</style>