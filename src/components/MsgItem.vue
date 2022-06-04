<template>
  <div>
    <span>
      {{ msgBody.sender }}: {{ msgBody.text }}
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

</style>