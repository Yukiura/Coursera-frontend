<template>
  <div class="msg-item-wrapper">
    <span class="sender">
      {{ msgBody.sender }}:
    </span>
    <span class="text">
      {{ msgBody.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: "MsgItem",
  props: ['msgBody']
}
</script>

<style scoped>
.msg-item-wrapper {
  width: 270px;
  padding: 5px;
  font-size: 13px;
}

.sender {
  color: #9499A0;;
}

.text {
  color: #61666D;
}
</style>