<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  props: {
    a11y: Boolean,
    windowWidth: Number,
  },
  setup(props) {
    const orientation = computed(() => {
      if (props.windowWidth < 1024) return "columns";
      else "rows";
    });

    const imageSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      }
      if (props.windowWidth >= 768 && props.windowWidth < 1024) {
        return "grid-column-3";
      } else if (props.windowWidth >= 1024 && props.windowWidth < 1280) {
        return "grid-column-4";
      } else {
        return "grid-column-6";
      }
    });

    const textContainerSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      } else if (props.windowWidth >= 768 && props.windowWidth < 1280) {
        return "grid-column-4";
      } else {
        return "grid-column-5";
      }
    });

    const { push } = useRouter();

    const goto = () => {
      push("/share-some-details");
    };

    return { orientation, imageSizing, textContainerSizing, goto };
  },
};
</script>

<template>
  <div class="home-wrapper" :class="orientation">
    <img
      :class="imageSizing"
      src="../assets/img/img_home.png"
      alt="Girl working on her computer deciding whether she should send an email or have a meeting."
    />
    <div
      class="home-text-container"
      :class="[orientation, textContainerSizing]"
    >
      <h1>Can it be an email?</h1>
      <p>
        Meeting overload is a real problem so start boosting your team
        productivity by using the right form of communication!
      </p>
      <button
        role="button"
        tabindex="0"
        aria-label="Find out"
        :class="{ 'a11y-focus': a11y }"
        @click="goto"
        @keydown.enter="goto"
      >
        Find out
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-wrapper {
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.home-text-container {
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
