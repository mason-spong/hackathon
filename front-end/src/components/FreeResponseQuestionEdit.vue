<template>
  <div class="free-response-question-edit module-wrap">
    <div class="module-content">
      <h1 class="title">Free Response</h1>
      <h2 class="question-edit">Describe your question:</h2>
      <textarea placeholder="Your question here..." class="question large-textarea" v-model="moduleData.questionDescription" />
      <textarea
        class="essay-answer large-textarea"
        placeholder="Applicant's answer will go here"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FreeResponseQuestionEdit",
  props: {
    moduleData: Object,
  },
};
</script>