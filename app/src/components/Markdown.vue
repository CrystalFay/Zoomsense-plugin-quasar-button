<template lang="pug">
.markdown(v-html="mark")
</template>

<script>
var md = require("markdown-it")();

export default {
  name: "Markdown",
  props: {
    content: {
      required: true,
    },
  },
  computed: {
    mark() {
      try {
        return md.render(this.content);
      } catch {
        return this.content;
      }
    },
  },
};
</script>

<style lang="scss">
.markdown {
  h1 {
    font-size: 28px;
    padding: 10px;
    margin: 0;
    line-height: 28px;
  }

  font-weight: 300;

  ul {
    margin-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 25px;
    li {
      padding: 0;
      margin: 0;
    }
  }

  p {
    padding: 10px;
    font-size: 18px;
  }

  img {
    margin-left: -10px;
    margin-top: -10px;
    width: 550px;
  }
}
</style>
