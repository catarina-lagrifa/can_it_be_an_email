<script>
import { ref, computed } from "vue";

export default {
  props: {
    id: String,
    modelValue: { type: [String, Boolean], default: null },
    options: { type: Array, required: true },
    a11y: Boolean,
  },
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const { t } = useI18n();

    const selector = ref(null);
    const dropdown = ref(null);
    const optionRefs = ref([]);
    const focusedIdx = ref(null);
    const showDropdown = ref(false);
    const selectedRef = ref(null);

    const setOptionRef = (el) => {
      if (el) optionRefs.value.push(el);
    };

    const activeDescendant = computed(() => {
      return `${props.id}_${props.modelValue}`;
    });

    const openDropdown = () => {
      if (!props.disabled) {
        showDropdown.value = true;
        if (props.a11y) focusedIdx.value = 0;
      }
    };

    const closeDropdown = () => {
      selector.value.blur();
      showDropdown.value = false;
      focusedIdx.value = null;
      emit("close");
    };

    const previousOption = () => {
      if (showDropdown.value) {
        if (focusedIdx.value == 0) focusedIdx.value = props.options.length - 1;
        else focusedIdx.value -= 1;
      } else {
        let idx = props.options.findIndex((f) => f.value == props.modelValue);
        if (idx == 0) {
          emit(
            "update:modelValue",
            props.options[props.options.length - 1].value
          );
        } else emit("update:modelValue", props.options[idx - 1].value);
      }
    };

    const nextOption = () => {
      if (showDropdown.value) {
        if (focusedIdx.value == props.options.length - 1) focusedIdx.value = 0;
        else focusedIdx.value += 1;
      } else {
        let idx = props.options.findIndex((f) => f.value == props.modelValue);
        if (idx == props.options.length - 1) {
          emit("update:modelValue", props.options[0].value);
        } else emit("update:modelValue", props.options[idx + 1].value);
      }
    };

    const toggleDropdown = () => {
      if (showDropdown.value) {
        if (focusedIdx.value != null) {
          selectOption(props.options[focusedIdx.value]);
        } else closeDropdown();
      } else openDropdown();
    };

    const selectOption = (opt) => {
      emit("update:modelValue", opt.value);
      closeDropdown();
    };

    return {
      t,
      selector,
      dropdown,
      optionRefs,
      focusedIdx,
      showDropdown,
      selectedRef,
      setOptionRef,
      activeDescendant,
      openDropdown,
      closeDropdown,
      previousOption,
      nextOption,
      toggleDropdown,
      selectOption,
    };
  },
};
</script>
<template>
  <div
    class="selector-wrapper"
    :class="{ active: showDropdown }"
    v-click-outside="closeDropdown"
  >
    <div class="selector">
      <div
        ref="selector"
        tabindex="0"
        aria-haspopup="listbox"
        :aria-labelledby="`${id}_dropdown ${id}_selector`"
        :aria-expanded="showDropdown"
        :id="`${id}_selector`"
        class="selector-text"
        :class="{ 'a11y-focus': a11y }"
        @keyup.up.prevent="previousOption"
        @keyup.down.prevent="nextOption"
        @keydown.tab="closeDropdown"
        @keydown.enter.esc.prevent="toggleDropdown"
        @click="toggleDropdown"
      >
        <p>
          {{ selectedRef.text }}
        </p>
        <span class="selector-arrow material-icons-rounded">
          {{ showDropdown ? "keyboard_arrow_down" : "keyboard_arrow_up" }}
        </span>
      </div>
      <ul
        v-if="showDropdown"
        ref="dropdown"
        :id="`${id}_dropdown`"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="`${id}_dropdown`"
        :aria-activedescendant="activeDescendant"
        class="dropdown"
        @keyup.up.prevent="showDropdown"
        @keyup.down.prevent="nextOption"
        @keydown.enter.esc.prevent="toggleDropdown"
      >
        <li
          v-for="(opt, idx) in options"
          :key="idx"
          :ref="setOptionRef"
          :id="`${id}_${opt.value}`"
          role="option"
          :aria-selected="focusedIdx === idx"
          :class="{
            focused: focusedIdx === idx,
            selected: opt.selected,
          }"
          @mouseenter="focusedIdx = idx"
          @mouseleave="focusedIdx = undefined"
          @click.stop.prevent="selectOption(opt)"
        >
          <p>
            {{ opt.text }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.selector-wrapper {
  position: relative;
}

.selector * {
  cursor: pointer;
}

.selector-text {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  padding-right: 16px;
}

.selector-text:hover {
  -webkit-box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
  box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
}

.selector-text:active {
  background-color: var(--color-action-disabled);
}

.selector-arrow {
  color: var(--color-type-medium);
  margin-left: 16px;
  transform: translateY(1px);
}

.dropdown {
  -webkit-box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
  box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
  z-index: 10;
}
</style>
