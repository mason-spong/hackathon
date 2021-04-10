<template>
  <div class="multiple-choice-question-edit module-wrap">
    <div class="module-content">
      <h1 class="title">Multiple Choice</h1>
      <h2 class="question-edit">Describe your question</h2>
      <textarea class="large-textarea" v-model="moduleData.questionDescription" />

      <div
        class="questions"
        v-for="choice in this.moduleData.choices"
        :key="choice.id"
      >
        <input
          type="radio"
          :value="moduleData.choices.indexOf(choice)"
          class="question"
          v-model="moduleData.correctIndex"
        />
        <input v-model="choice.question" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleChoiceQuestionEdit",
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