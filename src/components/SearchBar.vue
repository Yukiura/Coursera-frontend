<template>
  <div>
    <el-input placeholder="搜索你感兴趣的课程" v-model="input">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchBar",
  data() {
    return {
      input: ''
    }
  },
  methods: {
    search() {
      axios.get('/api/course/search', {
        params: {
          name: this.input
        }
      }).then(res => {
        console.log("搜索结果: " + res.data)
        this.$store.dispatch('setSearchResults', res.data)
        this.$store.dispatch('setSearchText', this.input)
        // 先判断以防止重复路由跳转报错
        if (this.$route.path !== '/search')
          this.$router.push('/search')
      })
    }
  }
}
</script>

<style scoped>

</style>