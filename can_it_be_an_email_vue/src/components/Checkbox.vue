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

    const select = (val) = {
      emit('update:modelValue', val)
    }

    return { options, select };
  },
};
</script>

<template>
  <div class="checkbox-wrapper">
    <div
      v-for="opt in options"
      :key="opt"
      @click="select(opt)"
      @keydown.enter="select(opt)"
    >
      <label v-if="opt == 0">None</label>
      <label v-else-if="opt == options.length - 1">Extreme</label>
      <div class="checkbox" :class="{ selected: modelValue == opt }">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  position: relative;
}

.checkbox-wrapper label {
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.checkbox-wrapper .checkbox {
  background-color: var(--color-action-disabled);
  -webkit-border-radius: 50%;
  border-radius: 50%;
  height: 24px;
  width: 24px;
}

.checkbox-wrapper .checkbox * {
  cursor: pointer;
}

.checkbox-wrapper .checkbox.selected {
  background-color: var(--color-action);
}

.checkbox-wrapper .checkbox.selected .circle {
  background-color: var(--color-white);
  -webkit-border-radius: 50%;
  border-radius: 50%;
  display: none;
  height: 8px;
  width: 8px;
}

.checkbox-wrapper .checkbox:hover .circle,
.checkbox-wrapper .checkbox.selected .circle {
  display: block;
}
</style>
