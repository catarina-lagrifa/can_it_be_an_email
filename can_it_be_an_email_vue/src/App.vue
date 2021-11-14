<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
export default {
  setup() {
    const a11y = ref(true);

    onMounted(() => {
      document.body.addEventListener("keydown", keyMovement);
      document.body.addEventListener("mousemove", mouseovement);
    });

    onBeforeUnmount(() => {
      document.body.removeEventListener("keydown", keyMovement);
      document.body.removeEventListener("mousemove", mouseMovement);
    });

    const keyMovement = () => {
      a11y.value = true;
    };

    const mouseMovement = () => {
      a11y.value = false;
    };

    return {
      a11y,
      keyMovement,
      mouseMovement,
    };
  },
};
</script>
<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  height: 800px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
