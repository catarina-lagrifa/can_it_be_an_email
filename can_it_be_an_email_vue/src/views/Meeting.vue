<script>
import { ref, computed } from "vue";

export default {
  name: "meeting",
  props: {
    a11y: Boolean,
    windowWidth: Number,
  },
  setup(props) {
    const orientation = computed(() => {
      if (props.windowWidth < 1024) return "columns";
      else "rows";
    });

    const wrapperSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      } else if (props.windowWidth >= 768 && props.windowWidth < 1024) {
        return "grid-column-4";
      } else {
        return "grid-column-8";
      }
    });

    const textContainerSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      } else if (props.windowWidth >= 768 && props.windowWidth < 1024) {
        return "grid-column-4";
      } else {
        return "grid-column-5";
      }
    });

    const imageSizing = computed(() => {
      if (props.windowWidth < 768) {
        return "grid-column-1";
      } else if (props.windowWidth >= 768 && props.windowWidth < 1024) {
        return "grid-column-3";
      } else if (props.windowWidth >= 1024 && props.windowWidth < 1280) {
        return "grid-column-4";
      } else {
        return "grid-column-6";
      }
    });

    const hourlyRate = ref(4);

    const totalCost = computed(() => {
      // let a = app.getters;
      return 6;
      // return (
      //   (a.length_of_meeting / 60) *
      //   a.number_of_people *
      //   a.hourly_rate_of_employees
      // );
    });

    return {
      orientation,
      wrapperSizing,
      textContainerSizing,
      imageSizing,
      hourlyRate,
      totalCost,
    };
  },
};
</script>

<template>
  <div class="meeting-wrapper" :class="[orientation, wrapperSizing]">
    <img
      v-if="windowWidth < 768"
      class="meeting-top"
      :class="imageSizing"
      src="../assets/img/img_meeting.png"
      alt="meetings being sent back and forth"
    />
    <div class="meeting-text-container" :class="textContainerSizing">
      <h1>No, it should be a meeting.</h1>
      <div class="description">
        <p>
          When done right meetings can
          <span class="bold">
            boost your team productivity and improve their interpersonal
            relationships.
          </span>
        </p>
        <p>
          Just be sure to
          <span class="bold"> shoot an meeting with the meeting summary </span>
          to everyone involved in the end of it. You would be surprised with how
          much time is lost rethinking decisions because people forget why an
          action was taken.
        </p>
      </div>
      <div class="meeting-cost">
        <h3>Want to know how much the meeting will cost your company?</h3>
        <div class="field" :class="orientation">
          <h4>Average hourly rate of the attendees in £</h4>
          <input
            id="hourly_rate"
            v-model="hourlyRate"
            type="number"
            class="grid-column-1"
          />
        </div>

        <h5>The total cost would be {{ totalCost }}£</h5>
      </div>
    </div>
    <img
      v-if="windowWidth >= 768"
      class="meeting-bottom"
      :class="imageSizing"
      src="../assets/img/img_meeting.png"
      alt="meetings being sent back and forth"
    />
  </div>
</template>

<style scoped>
.meeting-wrapper {
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

.meeting-text-container {
  align-self: start;
  margin-top: var(--margin-top);
}

.description p {
  margin-bottom: 16px;
  max-width: var(--grid-column-4);
}

.meeting-cost {
  margin-top: 80px;
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
  max-width: var(--grid-column-4);
}

.field input {
  text-align: right;
}

.field.columns {
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  margin-bottom: 32px;
}

.field.columns label {
  margin-bottom: 16px;
}

.meeting-top,
.meeting-bottom {
  position: relative;
  z-index: -1;
}

.meeting-top {
  margin: var(--margin-top) 0;
}

.meeting-bottom {
  transform: translate(20vw, -20vh);
}
</style>
