<template>
  <div class="course-page-wrapper">
    <div class="inner">
      <div class="title-wrapper">
        <span>我的课程</span>
      </div>
      <div class="course-list-wrapper">
        <CourseCard v-for="cid in classList" :class-id="cid" :key="cid"/>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from "@/components/CourseCard";
import axios from "axios";

export default {
  name: "MyCourses",
  components: {CourseCard},
  data() {
    return {
      classList: []
    }
  },
  mounted() {
    axios.get('/api/classroom/list', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(res => {
      this.classList = res.data
    })
  }
}
</script>

<style scoped>
.course-page-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}

.course-list-wrapper {
  width: 1200px;
  height: 1032px;
  display: block;
  margin-top: 30px;
}

.title-wrapper {
  padding-left: 20px;
  font-size: 19px;
  font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
}

.inner {
  width: 1200px;
  padding-top: 100px;
}
</style>