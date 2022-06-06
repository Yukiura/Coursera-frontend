<template>
  <div class="result-wrapper">
    <div class="cover-wrapper">
      <el-image :src="this.resultBody.cover" class="cover-img"/>
    </div>
    <div class="info-wrapper">
      <div class="course-title">
        <span>{{ this.resultBody.name }}</span>
      </div>
      <div class="school-info">
        <div class="logo-wrapper">
          <el-image :src="this.resultBody.logo" style="height: 30px; margin-right: 5px"/>
        </div>
        <div class="school-title">
          <span>{{ this.resultBody.school }}</span>
        </div>
      </div>
      <div class="course-desc">
        <span>{{ this.resultBody.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  props: ['resultBody']
}
</script>

<style scoped>
.result-wrapper {
  width: 928px;
  height: 150px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: block;
  box-shadow: 0px 0px 0px rgb(0 0 0 / 0%);
  cursor: pointer;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  border-bottom-color: rgb(230, 230, 230);
}

.cover-img {
  transition: all 0.5s ease-in-out 0s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}

.cover-img:hover {
  transform: scale(1.1);
}

.result-wrapper:hover {
  background-color: #f5f5f5;
}

.cover-wrapper {
  overflow: hidden;
  width: 265px;
  height: 150px;
  float: left;
  position: relative;
  display: block;
}

.info-wrapper {
  margin-left: 280px;
  display: block;
  height: 150px;
}

.course-title {
  margin-top: 0px;
  line-height: 20px;
  font-size: 16px;
  height: 20px;
  overflow: hidden;
  font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
  display: block;
  color: #FF9000;
}

.school-info {
  margin-top: 10px;
  font-size: 13px;
  line-height: 18px;
  height: 30px;
  color: #333;
  font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
  display: flex;
}

.logo-wrapper {
  height: 30px;
  margin-right: 6px;
  display: flex;
  align-items: center;
}

.school-title {
  display: flex;
  align-items: center;
  color: #999;
}

.course-desc {
  margin-top: 14px;
  margin-right: 10px;
  font-size: 13px;
  color: #666;
  line-height: 22px;
}

.course-desc:hover {
  color: #00CC7E;
}
</style>