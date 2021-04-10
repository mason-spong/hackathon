<template>
  <div class="free-response-question-edit">
    <h1 class="title">Free Response</h1>
    <h2 class="question-edit">Describe your question</h2>
    <input class="question" v-model="this.moduleData.questionDescription" />
    <textarea class="essay-answer" placeholder="Applicants answer will go here"/>

  </div>
</template>

<script>
export default {
  name: 'FreeResponseQuestionEdit',
  props: {
    moduleData: Object
  }
  
}
</script>