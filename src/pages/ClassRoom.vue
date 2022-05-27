<template>
  <div>
    <LiveTV/>
    <ChatZone/>
  </div>
</template>

<script>
import ChatZone from "@/components/ChatZone";
import LiveTV from "@/components/LiveTV";

export default {
  name: "ClassRoom",
  components: {LiveTV, ChatZone},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>