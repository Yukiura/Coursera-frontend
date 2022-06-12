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
    <el-dialog title="选择班级" :visible.sync="selectionFormVisible">
      <el-form>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="selectedClassroomId" placeholder="请选择班级">
            <el-option v-for="classroom in classroomList" :label="classroom.name" :value="classroom.id"
                       :key="classroom.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectionFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectionFormConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchResult from "@/components/SearchResult";
import axios from "axios";

export default {
  name: "SearchPage",
  components: {SearchResult},
  data() {
    return {
      selectionFormVisible: false,
      formLabelWidth: '120px',
      selectedClassroomId: '',
      selectedCourseId: '',
      classroomList: []
    }
  },
  methods: {
    selectionFormConfirm() {
      axios.get('/api/classroom/verify', {
        headers: {
          token: localStorage.getItem('token')
        },
        params: {
          classroomId: this.selectedClassroomId
        }
      }).then(res => {
        const result = res.data
        if (result === true) {
          this.$message.error('不能重复选课');
        } else {
          axios.post('/api/classroom/select', null, {
            headers: {
              token: localStorage.getItem('token')
            },
            params: {
              classroomId: this.selectedClassroomId
            }
          }).then(res => {
            if (res.data === 1) {
              this.$message.success('选课成功')
            }
            this.selectionFormVisible = false
          })
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('select', (cid) => {
      if (this.$store.state.loginStat === false) {
        this.$message.info('请先登录')
        this.$router.push('/login')
        return
      }
      this.selectedCourseId = cid
      axios.get('/api/classroom/course', {
        headers: {
          token: localStorage.getItem('token')
        },
        params: {
          courseId: cid
        }
      }).then(res => {
        this.classroomList = res.data
        this.selectionFormVisible = true
      })
    })
  }
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