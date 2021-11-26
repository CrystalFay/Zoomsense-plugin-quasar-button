<template lang="pug">
.markdown(v-html='mark')
</template>

<script>
var taskLists = require('markdown-it-task-lists');
const md = require('markdown-it')().use(taskLists, { enabled: true });

// ::: s-fieldname:Title
// sequence data
// :::

// ::: fieldname:Title
// meeting level data
// :::

let regex = /^:::\s(s-)?(\w*):.*\n\s*:::$/gm;

export default {
  name: 'Markdown',
  props: {
    content: {
      required: true,
    },
    sequenceinputs: {},
    meetinginputs: {},
  },
  methods: {
    getInput(type, field) {
      if (type === 's-') return this.sequenceinputs[field] || '';
      else return this.meetinginputs[field] || '';
    },
  },
  computed: {
    mark() {
      try {
        //replace the input content here:
        let inputs = [...this.content.matchAll(regex)];

        let tmp = this.content.toString();

        for (let field of inputs) {
          // console.log(field);
          tmp = tmp.replace(field[0], md.utils.escapeHtml(this.getInput(field[1], field[2])));
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

  .task-list-item-checkbox {
    transform: scale(1.7) translate(0, -2px);
  }

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
