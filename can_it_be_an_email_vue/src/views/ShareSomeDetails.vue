<template>
  <div class="about">
    <h1>Share some details</h1>
    <p>Answer the following questions based on the meeting you intend on having</p>
    <h4>How many people will be needed?</h4>
    <h4>How long do you expect the meeting to last?</h4>
    <h4>Does a decision have to be made?</h4>
    <h4>Is everyone avaliable?</h4>
    <h4>What is the complexity of the issue?</h4>
    <select>None</select>
    <select>Extreme</select>
    <button>GET ANSWER</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
