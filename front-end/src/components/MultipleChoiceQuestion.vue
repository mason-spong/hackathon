<template>
  <div class="multiple-choice-question module-wrap">
    <div class="module-content">
      <h1 class="title">Multiple Choice</h1>
      <h2 class="question-edit">{{ moduleData.questionDescription }}</h2>

      <div
        class="questions"
        v-for="choice in this.moduleData.choices"
        :key="choice.id"
      >
        <input
          type="radio"
          :value="choice.question"
          class="question"
          v-model="radioVal"
        />
        <p class="possibility">{{ choice.question }}</p>
        <!-- <input v-model="choice.question" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleChoiceQuestion",
  data() {
    return {
      radioVal: "",
    };
  },
  props: {
    moduleData: Object,
  },
};
</script>

<style scoped>
.possibility {
  display: inline;
}
</style>