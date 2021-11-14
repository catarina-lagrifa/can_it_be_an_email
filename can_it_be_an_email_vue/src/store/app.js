import { reactive, inject } from "vue";

export const createApp = () => {
  const state = reactive({
    number_of_people: 2,
    length_of_meeting: 5,
    is_decision_made: true,
    is_everyone_available: true,
    issue_complexity: 1,
    issue_complexity: 1,
    hourly_rate_of_employees: 15,
  });

  return { getters: state };
};

export const appSymbol = Symbol("app");
export const useApp = () => inject(appSymbol);
