<template lang="pug">
div
  .row.q-gutter-md
    .col-auto
      .row.items-center
        .scaled_wrap.relative-position
          .absolute-top-right
            q-badge Current
          .scaled
            Markdown(:content='currentslidecontent', :sequenceinputs='sequenceinputs', :meetinginputs='meetinginputs')
      .row.items-center.q-mt-sm
        q-toggle(v-model='slides.visible', @input='updateVisible()')
        q-btn(@click='prev', outline, round, icon='chevron_left')
        .col.text-center {{ currentSlide }} of {{ totalSlides }}
        q-btn(outline, @click='next', round, icon='chevron_right')
    .col-auto
      .scaled_wrap.relative-position
        .absolute-top-right
          q-badge Next
        .scaled
          Markdown(:content='nextslide', :sequenceinputs='sequenceinputs', :meetinginputs='meetinginputs')
    .col
      div(v-for='input in getInputs', :key='input.field')
        Editor(
          :initialValue='input.type === "s-" ? sequenceinputs[input.field] : meetinginputs[input.field]',
          :options='editoroptions',
          initialEditType='wysiwyg',
          :height='"auto"',
          ref='toastuiEditor',
          @change='updateField(this, input.field, input.type)'
        )
</template>

<script>
import Markdown from './Markdown.vue';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

let regex = /^:::\s(s-)?(\w*):(.*)\n\s*:::$/gm;

export default {
  name: 'Dashboard',
  props: {
    firebase: {
      required: true,
    },
    context: {
      required: false,
    },
  },
  components: {
    Markdown,
    Editor,
  },
  data: () => {
    return {
      slides: {},
      sequenceinputs: {},
      meetinginputs: {},
      editoroptions: {
        usageStatistics: false,
        hideModeSwitch: true,
        toolbarItems: [['bold', 'italic', 'ul', 'task', 'image']],
      },
    };
  },
  computed: {
    getInputs() {
      if (!this.slides.content) return;
      //parse current content for input tags:
      let text = this.slides.content[this.slides.currentslide];

      // console.log(text);
      let inputs = [...text.matchAll(regex)];

      return inputs.map(el => {
        // console.log(el);
        return {
          type: el[1] ? el[1] : 'm-',
          field: el[2],
          title: el[3],
        };
      });
    },
    currentSlide() {
      return this.slides.currentslide + 1;
    },
    totalSlides() {
      return this.slides.content ? this.slides.content.length : 0;
    },
    nextslide() {
      if (this.slides.content && this.slides.content.length > this.slides.currentslide)
        return this.slides.content[this.slides.currentslide + 1];
      else return '';
    },
    currentslidecontent() {
      if (this.slides.content && this.slides.content.length > this.slides.currentslide)
        return this.slides.content[this.slides.currentslide];
      else return '';
    },
  },
  methods: {
    updateField(event, field, type) {
      // console.log();

      // console.log(`${type}:${field} with ${event}`);
      //write to firebase data node
      //TODO: debounce, and
      if (type === 's-') {
        this.firebase
          .ref(`sequence/slides/${this.context.sequenceid}/current/${field}`)
          .set(this.$refs.toastuiEditor[0].invoke('getMarkdown'));
      } else {
        this.firebase
          .ref(`data/slides/${this.context.meetingid}/current/${field}`)
          .set(this.$refs.toastuiEditor[0].invoke('getMarkdown'));
      }
    },
    async updateVisible() {
      await this.firebase
        .ref(`config/${this.context.meetingid}/current/currentState/plugins/slides/visible`)
        .set(this.slides.visible);
    },
    async save() {
      await this.firebase.ref(`config/${this.context.meetingid}/current/slides`).set(this.slides);
    },
    async next() {
      if (!this.slides.currentslide) {
        this.slides.currentslide = 0;
      }
      if (this.totalSlides > this.slides.currentslide + 1) {
        this.slides.currentslide++;
        await this.firebase
          .ref(`config/${this.context.meetingid}/current/currentState/plugins/slides/currentslide`)
          .set(this.slides.currentslide);
      }
    },
    async prev() {
      if (!this.slides.currentslide) {
        this.slides.currentslide = 0;
      }
      if (this.slides.currentslide > 0) {
        this.slides.currentslide--;
        await this.firebase
          .ref(`config/${this.context.meetingid}/current/currentState/plugins/slides/currentslide`)
          .set(this.slides.currentslide);
      }
    },
  },
  watch: {
    firebase: {
      immediate: true,
      async handler() {
        // console.log(this.firebase);
        this.$rtdbBind('sequenceinputs', this.firebase.ref(`sequence/slides/${this.context.sequenceid}/current`));
        // } else {
        //if we should get/save data from the meeting-level
        this.$rtdbBind('meetinginputs', this.firebase.ref(`data/slides/${this.context.meetingid}/current/`));

        this.$rtdbBind(
          'slides',
          this.firebase.ref(`config/${this.context.meetingid}/current/currentState/plugins/slides`),
        );
      },
    },
  },
};
</script>

<style lang="scss">
.ProseMirror.toastui-editor-contents {
  padding: 4px 10px !important;
}
</style>

<style lang="scss" scoped>
.scaled {
  width: 550px;
  // background: silver;

  height: 412px;
  overflow: hidden;
  transform: scale(0.4);
  transform-origin: top left;
}

.scaled_wrap {
  width: 219px;
  overflow: hidden;
  height: 165px;
  border: 1px solid silver;
  border-radius: 5px;
}
</style>