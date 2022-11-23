<template>
  <div ref="popup" class="popup" v-show="shopPopup">
    <div class="info">
      <ul>
        <li>信息1：xxx</li>
        <li>信息2：xxx</li>
        <li>信息3：xxx</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardModal",
  props: ["shopPopup"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.popup {
  width: 200px;
  background-color: white;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgb(177, 177, 177);
}
.popup .info {
  font-size: 14px;
  text-align: left;
}
ul {
  padding-left: 0;
}
</style>