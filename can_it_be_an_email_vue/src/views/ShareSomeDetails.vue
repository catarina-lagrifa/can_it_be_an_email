<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Selector from "@/components/Selector";
import Checkbox from "@/components/Checkbox";
import { useStore } from "@/store/store";
import useEmailOrMeeting from "@/hooks/useEmailOrMeeting";

export default {
  name: "share",
  components: {
    Selector,
    Checkbox,
  },
  props: {
    a11y: Boolean,
    windowWidth: Number,
  },
  setup(props) {
    const { app } = useStore();

    const orientation = computed(() => {
      if (props.windowWidth < 1024) return "columns";
      else "rows";
    });

    const wrapperSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      } else if (props.windowWidth >= 768 && props.windowWidth < 1024) {
        return "grid-column-4";
      } else if (props.windowWidth >= 1024 && props.windowWidth < 1280) {
        return "grid-column-6";
      } else {
        return "grid-column-8";
      }
    });

    const formSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      } else if (props.windowWidth >= 768 && props.windowWidth < 1280) {
        return "grid-column-2";
      } else {
        return "grid-column-6";
      }
    });

    const imageSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      } else if (props.windowWidth >= 768 && props.windowWidth < 1280) {
        return "grid-column-2";
      } else {
        return "grid-column-4";
      }
    });

    const timeList = ref([
      { value: 5, label: "5 minutes" },
      { value: 10, label: "10 minutes" },
      { value: 15, label: "15 minutes" },
      { value: 20, label: "20 minutes" },
      { value: 30, label: "30 minutes" },
      { value: 45, label: "45 minutes" },
      { value: 60, label: "60 hour" },
      { value: 90, label: "90 minutes" },
      { value: 91, label: "More" },
    ]);

    const booleanList = ref([
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ]);

    const getPath = useEmailOrMeeting();
    const { push } = useRouter();

    const getAnswer = () => {
      let path = getPath;
      push(`/${path}`);
    };

    return {
      getters: app.getters,
      orientation,
      wrapperSizing,
      formSizing,
      imageSizing,
      timeList,
      booleanList,
      getAnswer,
    };
  },
};
</script>

<template>
  <div class="share-wrapper" :class="wrapperSizing">
    <div class="header">
      <h2>Share some details</h2>
      <p>
        Answer the following questions based on the meeting you intend on having
      </p>
    </div>
    <form :class="formSizing">
      <div class="field" :class="orientation">
        <label for="people">How many people will be needed?</label>
        <input
          id="people"
          v-model="getters.numberOfPeople"
          type="number"
          class="grid-column-2"
        />
      </div>
      <div class="field" :class="orientation">
        <label for="time">How long do you expect the meeting to last?</label>
        <selector
          id="time"
          v-model:modelValue="getters.lengthOfMeeting"
          :options="timeList"
        />
      </div>
      <div class="field" :class="orientation">
        <label for="decision">Does a decision have to be made?</label>
        <selector
          id="decision"
          v-model:modelValue="getters.isDecisionMade"
          :options="booleanList"
        />
      </div>
      <div class="field" :class="orientation">
        <label for="available">Is everyone avaliable?</label>
        <selector
          id="available"
          v-model:modelValue="getters.isEveryoneAvailable"
          :options="booleanList"
        />
      </div>
      <div class="field" :class="orientation">
        <label for="complexity">What is the complexity of the issue?</label>
        <checkbox
          id="complexity"
          v-model:modelValue="getters.issueComplexity"
        />
      </div>
    </form>
    <button
      role="button"
      tabindex="0"
      aria-label="Get answer"
      :class="{ 'a11y-focus': a11y }"
      @click="getAnswer"
      @keydown.enter="getAnswer"
    >
      Get answer
    </button>
    <div class="plane-wrapper" :class="imageSizing">
      <img
        class="plane-path"
        src="../assets/img/img_plane_path.png"
        alt="Paper plane"
      />
      <img
        class="plane"
        src="../assets/img/img_plane.png"
        alt="Paper plane route traced"
      />
    </div>
  </div>
</template>

<style scoped>
.share-wrapper {
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
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.header {
  align-self: flex-start;
  margin-top: var(--margin-top);
}

.share-wrapper form {
  margin: 64px 0;
}

.field {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.field:not(:last-child) {
  margin-bottom: 40px;
}

.field.columns {
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.field.columns label {
  margin-bottom: 16px;
}

.field.columns:not(:last-child) {
  margin-bottom: 48px;
}

button {
  align-self: flex-end;
}

.plane-wrapper {
  position: relative;
  transform: translate(23vw, -18vh);
  z-index: -1;
}

.plane {
  position: absolute;
  right: 0;
  top: 0;
  width: 30%;
}

.plane-path {
  width: 70%;
}
</style>
