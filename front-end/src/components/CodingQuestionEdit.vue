<template>
  <div class="coding-question-edit module-wrap">
    <div class="module-content">
      <h1 class="title">Coding Question</h1>
      <h2 class="question-edit">Describe your question:</h2>
      <textarea placeholder="Your question here..." class="large-textarea" v-model="moduleData.questionDescription" />
      <prism-editor
        class="my-editor"
        v-model="code"
        :highlight="highlighter"
        line-numbers
      ></prism-editor>
    </div>
  </div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  name: "CodingQuestionEdit",
  components: {
    PrismEditor,
  },
  data: () => ({
    code: "\n\n\n\n\n\n\n\n\n",
  }),
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
  },
  props: {
    moduleData: Object,
  },
};
</script>

<style scoped>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  width: 90%;
  margin: 0 auto;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}


</style>