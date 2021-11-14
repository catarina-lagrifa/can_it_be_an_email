<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

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

    const { currentRoute } = useRouter();

    return {
      a11y,
      windowWidth,
      keyMovement,
      mouseMovement,
      resize,
      currentRoute,
    };
  },
};
</script>
<template>
  <div class="main-container" :class="currentRoute.name">
    <router-view :a11y="a11y" :windowWidth="windowWidth" />
  </div>
</template>

<style scoped>
.main-container {
  width: inherit;
  height: 100vh;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.main-container.home {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
