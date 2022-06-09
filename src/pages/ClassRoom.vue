<template>
  <div class="outer">
    <div class="classroom-wrapper">
      <LiveTV :live-url="this.$route.query.pullUrl" :school-logo="this.$route.query.schoolLogo"
              :course-title="this.$route.query.courseTitle" :class-name="this.$route.query.className"/>
      <ChatZone :classId="this.$route.query.cid"/>
    </div>
  </div>
</template>

<script>
import ChatZone from "@/components/ChatZone";
import LiveTV from "@/components/LiveTV";

export default {
  name: "ClassRoom",
  components: {ChatZone, LiveTV},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.classroom-wrapper {
  min-width: 1320px;
  max-width: 1504px;
  width: 100%;
  position: relative;
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}

.outer {
  width: 100%;
  height: 100%;
  background-color: #B0C4DE;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}
</style>