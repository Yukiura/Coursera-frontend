<template>
  <div class="result">
    <div class="inner">
      <div class="num">
        <span>共找到{{ this.$store.state.searchResultList.length }}条<span
            style="color: #00CC7E;">{{ this.$store.state.searchText }}</span>相关的结果</span>
      </div>
      <div class="resultListWrapper">
        <SearchResult v-for="result in this.$store.state.searchResultList" :result-body="result" :key="result.cid"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from "@/components/SearchResult";

export default {
  name: "SearchPage",
  components: {SearchResult}
}
</script>

<style scoped>
.result {
  width: 100%;
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}

.inner {
  width: 928px;
}

.num {
  padding-top: 50px;
  padding-bottom: 20px;
  font-size: 13px;
  font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
}
</style>