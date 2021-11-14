import { useStore } from "@/store/store";

export default function () {
  const { app } = useStore();

  let a = app.getters,
    mode;

  if (
    a.numberOfPeople >= 5 ||
    a.lengthOfMeeting >= 60 ||
    !a.isDecisionMade ||
    !a.isEveryoneAvailable ||
    a.issueComplexity <= 3
  ) {
    mode = "email";
  } else {
    mode = "meeting";
  }

  return mode;
}
