<template>
  <div class="free-response-question module-wrap">
    <div class="module-content">
      <h1 class="title">Free Response</h1>
      <h2 class="question">{{ moduleData.questionDescription }}</h2>
      <textarea
        class="essay-answer large-textarea"
        placeholder="Applicants answer will go here"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FreeResponseQuestion",
  props: {
    moduleData: Object,
  },
};
</script>