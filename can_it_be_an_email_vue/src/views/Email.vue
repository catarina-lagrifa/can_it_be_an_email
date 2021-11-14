<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "@/store/store";

export default {
  name: "email",
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
      } else {
        return "grid-column-4";
      }
    });

    const hourlyRate = ref(undefined);

    onMounted(() => {
      hourlyRate.value = app.getters?.hourly_rate_of_employees;
    });

    const totalCost = computed(() => {
      let a = app.getters;
      return parseInt(a.lengthOfMeeting * a.numberOfPeople * hourlyRate.value);
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
  <div class="email-wrapper" :class="[orientation, wrapperSizing]">
    <img
      v-if="windowWidth < 768"
      class="email-top"
      :class="imageSizing"
      src="../assets/img/img_email.png"
      alt="Emails being sent back and forth"
    />
    <div class="email-text-container" :class="textContainerSizing">
      <h1>Yes, it can be an email !</h1>
      <div class="description">
        <p>
          Sometimes there is no need to stop everyone from what they are doing
          to talk through things.
        </p>
        <p>
          An email allows everyone to
          <span class="bold">
            find their own time to read, process and respond
          </span>
          to the issue.
        </p>
        <p>
          If you are worried about the urgency of the situation just
          <span class="bold">mark your email as important</span> and, for bonus
          points, shoot a message to your co-workers letting them know.
        </p>
      </div>
      <div class="meeting-cost">
        <h3>Want to know how much the meeting would cost your company?</h3>
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
      class="email-bottom"
      :class="imageSizing"
      src="../assets/img/img_email.png"
      alt="Emails being sent back and forth"
    />
  </div>
</template>

<style scoped>
.email-wrapper {
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

.email-text-container {
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

.email-top,
.email-bottom {
  position: relative;
  z-index: -1;
}

.email-top {
  margin: var(--margin-top) 0;
}

.email-bottom {
  transform: translate(20vw, -20vh);
}
</style>
