<template lang="pug">
div
  .markdown(v-html="mark")
</template>

<script>
const md = require("markdown-it")();

let regex = /^:::\s(.*):.*\n\s*:::$/gm;

export default {
  name: "Markdown",
  props: {
    content: {
      required: true,
    },
    inputs: {},
  },
  methods: {
    getInput(field) {
      return this.inputs[field];
    },
  },
  computed: {
    mark() {
      try {
        //replace the input content here:
        let inputs = [...this.content.matchAll(regex)];

        let tmp = this.content.toString();

        for (let field of inputs) {
          tmp = tmp.replace(
            field[0],
            md.utils.escapeHtml(this.getInput(field[1]))
          );
        }

        return md.render(tmp);
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

  .input {
    color: red;
  }

  table {
    width: 100%;
    th {
      border-bottom: 1px silver solid;
    }
    td {
      text-align: center;
    }
  }
}
</style>
