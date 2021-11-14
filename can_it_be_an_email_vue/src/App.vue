<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
export default {
  setup() {
    const a11y = ref(true);
    const windowWidth = ref(window.innerWidth);

    const keyMovement = () => {
      a11y.value = true;
    };

    const mouseMovement = () => {
      a11y.value = false;
    };

    const resize = () => (windowWidth.value = window.innerWidth);

    onMounted(() => {
      document.body.addEventListener("keydown", keyMovement);
      document.body.addEventListener("mousemove", mouseMovement);
      window.addEventListener("resize", resize);
    });

    onBeforeUnmount(() => {
      document.body.removeEventListener("keydown", keyMovement);
      document.body.removeEventListener("mousemove", mouseMovement);
      window.removeEventListener("resize", resize);
    });

    return {
      a11y,
      windowWidth,
      keyMovement,
      mouseMovement,
      resize,
    };
  },
};
</script>
<template>
  <div class="main-container">
    <router-view :a11y="a11y" :windowWidth="windowWidth" />
  </div>
</template>

<style scoped>
.main-container {
  width: inherit;
  height: 100vh;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
