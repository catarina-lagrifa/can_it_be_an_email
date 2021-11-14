import { reactive, inject } from "vue";

export const createApp = () => {
  const state = reactive({
    numberOfPeople: 2,
    lengthOfMeeting: 5,
    isDecisionMade: true,
    isEveryoneAvailable: true,
    issueComplexity: 1,
    hourly_rate_of_employees: 15,
  });

  return { getters: state };
};

export const appSymbol = Symbol("app");
export const useApp = () => inject(appSymbol);
