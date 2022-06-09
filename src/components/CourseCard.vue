<template>
  <div class="course-card-wrapper" @click="handleClick">
    <el-card :body-style="{ padding: '0px' }" class="course-card" shadow="hover">
      <img
          :src="card.cover"
          class="image" alt="课程封面">
      <div class="common-info-wrapper">
        <el-image style="width: 38px; height: 38px; float: left; padding-right: 10px"
                  fit="fill"
                  :src="card.schoolLogo"/>
        <div class="title">
          <span>{{ card.courseTitle }}</span>
        </div>
        <div class="school">
          <span>{{ card.schoolName }}</span>
        </div>
        <div class="bar-wrapper-hidden">
          <div class="bar" style="width: 0"></div>
        </div>
        <div class="class-info">
          <span>{{ card.className }}</span>
        </div>
        <div class="status">
          <i class="el-icon-user-solid" style="padding-right: 5px"></i>
          <span>{{ studentNum }}人参加</span>
          <span style="color: #42b983; font-size: medium; float: right" v-show="live">正在上课</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import copy from 'copy-to-clipboard'

export default {
  name: "CourseCard",
  props: ['classId'],
  data() {
    return {
      card: {
        cover: '',
        courseTitle: '',
        schoolName: '',
        schoolLogo: '',
        className: '',
      },
      pushUrl: '',
      studentNum: 0,
      live: true
    }
  },
  methods: {
    handleClick() {
      const roleSet = new Set(this.$store.state.roleList)
      axios.get('/api/classroom/status', {
        headers: {
          token: localStorage.getItem('token')
        },
        params: {
          classId: this.classId
        }
      }).then(res => {
        const status = res.data
        console.log("课堂状态: " + status)
        if (status === 0) {
          if (roleSet.has("教师")) {
            axios.get('/api/livestream/token', {
              headers: {
                token: localStorage.getItem('token')
              },
              params: {
                cid: this.classId
              }
            }).then(res => {
              this.$alert('推流地址: rtmp://localhost/live/', '开始直播', {
                confirmButtonText: '复制密钥',
                callback: () => {
                  copy(`${this.classId}?${res.data}`)
                  this.$message({
                    type: 'success',
                    message: `串流密钥成功复制到剪贴板`
                  })
                }
              });
            })
          } else {
            this.$message('请等待老师开始上课')
          }
        } else if (status === 1) {
          axios.get('/api/livestream/token', {
            headers: {
              token: localStorage.getItem('token')
            },
            params: {
              cid: this.classId
            }
          }).then(res => {
            this.$router.push({
              name: 'classroom',
              query: {
                cid: this.classId,
                pullUrl: `http://localhost:8080/live/${this.classId}.flv?${res.data}`,
                schoolLogo: this.card.schoolLogo,
                courseTitle: this.card.courseTitle,
                className: this.card.className
              }
            })
          })
        }
      })
    }
  },
  mounted() {
    axios.get('/api/course/card', {
      headers: {
        token: localStorage.getItem('token')
      },
      params: {
        classId: this.classId
      }
    }).then(res => {
      this.card = res.data
    })
    axios.get('/api/classroom/student/num', {
      headers: {
        token: localStorage.getItem('token')
      },
      params: {
        classId: this.classId
      }
    }).then(res => {
      this.studentNum = res.data
    })
    axios.get('/api/classroom/status', {
      headers: {
        token: localStorage.getItem('token')
      },
      params: {
        classId: this.classId
      }
    }).then(res => {
      this.live = res.data === 1
    })
  }
}
</script>

<style scoped>
.course-card-wrapper {
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: top;
  position: relative;
}

.course-card-wrapper:hover {
  cursor: pointer;
}

.image {
  width: 100%;
  display: block;
  height: 110px;
}

.course-card {
  width: 212px;
  height: 246px;
}

.title {
  font-size: 14px;
}

.school {
  padding-top: 4px;
  color: #999999;
  font-size: 12px;
}

.common-info-wrapper {
  padding: 14px;
  height: 60px;
}

.bar-wrapper-hidden {
  top: 20px;
  margin-bottom: 6px;
  width: 100%;
  height: 6px;
}

.class-info {
  padding-top: 4px;
  font-size: 14px;
}

.status {
  padding-top: 10px;
  color: #999999;
  font-size: 13px;
}
</style>