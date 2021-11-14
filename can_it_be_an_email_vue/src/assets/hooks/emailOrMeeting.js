import { useStore } from "@/store/store";

const { app } = useStore();

const emailOrMeeting = () => {
  let a = app.getters,
    mode;

  if (a.number_of_people <= 2) {
    if (a.length_of_meeting <= 10) {
      if (a.is_decision_made) {
        if (a.is_everyone_available) mode = "meeting";
        else mode = "email";
      } else {
        if (a.is_everyone_available) {
          if (a.issue_complexity <= 2) mode = "email";
          else mode = "meeting";
        } else {
          mode = "email";
        }
      }
    } else {
      if (a.is_decision_made) {
        if (a.is_everyone_available) {
          if (a.issue_complexity <= 2) mode = "email";
          else mode = "meeting";
        } else {
          mode = "email";
        }
      } else {
        if (a.is_everyone_available) {
          if (a.issue_complexity <= 3) mode = "email";
          else mode = "meeting";
        } else {
          mode = "email";
        }
      }
    }
  } else {
    if (a.length_of_meeting <= 15) {
      if (a.is_decision_made) {
        if (a.is_everyone_available) {
          if (a.issue_complexity <= 2) mode = "email";
          else mode = "meeting";
        } else {
          if (a.issue_complexity <= 3) mode = "email";
          else mode = "meeting";
        }
      } else {
        if (a.is_everyone_available) {
          if (a.issue_complexity <= 3) mode = "email";
          else mode = "meeting";
        } else {
          if (a.issue_complexity <= 4) mode = "email";
          else mode = "meeting";
        }
      }
    } else {
      if (a.is_decision_made) {
        if (a.is_everyone_available) {
          if (a.issue_complexity <= 2) mode = "email";
          else mode = "meeting";
        } else {
          if (a.issue_complexity <= 3) mode = "email";
          else mode = "meeting";
        }
      } else {
        if (a.is_everyone_available) {
          if (a.issue_complexity <= 3) mode = "email";
          else mode = "meeting";
        } else {
          if (a.issue_complexity <= 4) mode = "email";
          else mode = "meeting";
        }
      }
    }
  }

  return mode;
};

export default () => emailOrMeeting;
