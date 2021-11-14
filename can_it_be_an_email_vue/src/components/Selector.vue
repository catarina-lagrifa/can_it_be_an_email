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
    const selector = ref(null);
    const dropdown = ref(null);
    const optionRefs = ref([]);
    const focusedIdx = ref(null);
    const showDropdown = ref(false);
    const selectedRef = computed(() => {
      return props.options?.find((f) => f.value == props.modelValue);
    });

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
    @mouseleave="closeDropdown"
  >
    <div class="selector">
      <div
        ref="selector"
        tabindex="0"
        aria-haspopup="listbox"
        :aria-labelledby="`${id}_dropdown ${id}_selector`"
        :aria-expanded="showDropdown"
        :id="`${id}_selector`"
        class="selector-label"
        :class="{ 'a11y-focus': a11y }"
        @keyup.up.prevent="previousOption"
        @keyup.down.prevent="nextOption"
        @keydown.tab="closeDropdown"
        @keydown.enter.esc.prevent="toggleDropdown"
        @click="toggleDropdown"
      >
        <p>
          {{ selectedRef.label }}
        </p>
        <span class="selector-arrow material-icons-round">
          {{ showDropdown ? "keyboard_arrow_up" : "keyboard_arrow_down" }}
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
            {{ opt.label }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.selector-wrapper {
  position: relative;
  width: var(--grid-column-2);
}

.selector {
  width: inherit;
}

.selector * {
  cursor: pointer;
}

.selector-label {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: var(--color-white);
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 1px 5px 0px hsla(var(--color-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-shadow), 0.12);
  box-shadow: 0px 1px 5px 0px hsla(var(--color-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-shadow), 0.12);
  box-sizing: border-box;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 12px 16px;
  white-space: nowrap;
  width: inherit;
}

.selector-label:hover {
  -webkit-box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
  box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
}

.selector-label:active {
  background-color: var(--color-action-disabled);
}

.selector-arrow {
  color: var(--color-type-medium);
  font-size: 1.125rem;
  margin-left: 16px;
  transform: translateY(1px);
}

.dropdown {
  background-color: var(--color-white);
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
  box-shadow: 0px 1px 5px 0px hsla(var(--color-action-shadow), 0.2),
    0px 2px 2px 0px hsla(var(--color-action-shadow), 0.14),
    0px 3px 1px -2px hsla(var(--color-action-shadow), 0.12);
  margin: 0;
  max-height: calc(var(--layout-column-2) * 0.5);
  overflow-y: auto;
  padding: 5px;
  position: absolute;
  transform: translateY(1px);
  width: inherit;
  white-space: nowrap;
  z-index: 10;
}

.dropdown * {
  cursor: pointer;
}

.dropdown li {
  margin-bottom: 8px;
  padding: 8px 16px 8px 12px;
}

.dropdown li:last-child {
  margin-bottom: 0;
}

.dropdown li.selected p {
  color: var(--color-type-dark);
  font-weight: 500;
}

.dropdown li:hover,
.dropdown li.focused {
  border-radius: 3px;
  background-color: var(--color-action-background);
}

.dropdown li:hover p,
.dropdown li.focused p {
  color: var(--color-action-hover);
}
</style>
