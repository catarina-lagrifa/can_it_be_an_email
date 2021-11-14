<script>
import { ref, computed } from "vue";

export default {
  props: {
    modelValue: Number,
    a11y: Boolean,
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    const options = ref([0, 1, 2, 3, 4]);

    const select = (val) => {
      emit("update:modelValue", val);
    };

    return { options, select };
  },
};
</script>

<template>
  <div class="checkbox-wrapper">
    <div class="checkbox-label">
      <label>None</label>
      <label>Extreme</label>
    </div>
    <div class="checkbox-container">
      <div
        v-for="opt in options"
        :key="opt"
        class="checkbox"
        @click="select(opt)"
        @keydown.enter="select(opt)"
      >
        <div class="checkbox-selector" :class="{ selected: modelValue == opt }">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  position: relative;
  width: var(--grid-column-2);
}

.checkbox-label {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-left: 6%;
}

.checkbox-label label {
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.checkbox-container {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
}

.checkbox {
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

.checkbox-selector {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: var(--color-action-disabled);
  -webkit-border-radius: 50%;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 24px;
  width: 24px;
}

.checkbox-selector * {
  cursor: pointer;
}

.checkbox-selector.selected {
  background-color: var(--color-action);
}

.checkbox-selector.selected .circle {
  background-color: var(--color-white);
  -webkit-border-radius: 50%;
  border-radius: 50%;
  display: none;
  height: 10px;
  width: 10px;
}

.checkbox-selector:hover .circle,
.checkbox-selector.selected .circle {
  display: block;
}
</style>
