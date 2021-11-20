<template lang="pug">
div
  .row.items-center
    .col-auto
      q-toggle(v-model="slides.visible", @input="updateVisible()") Visible
    .col-auto
      q-btn(@click="prev", outline) Prev
    .col.text-center {{ currentSlide }} of {{ totalSlides }}
    .col 
      div(v-for="input in getInputs", :key="input.field")
        q-input(
          outlined,
          autogrow,
          :label="input.title",
          @input="updateField($event, input.field, input.type)",
          :value="input.type === 's-' ? sequenceinputs[input.field] : meetinginputs[input.field]"
        )
    .col-auto
      q-btn(outline, @click="next") Next
    .col-auto
      .scaled_wrap
        .scaled
          Markdown(
            :content="nextslide",
            :sequenceinputs="sequenceinputs",
            :meetinginputs="meetinginputs"
          )
</template>

<script>
import Markdown from "./Markdown.vue";

let regex = /^:::\s(s-)?(\w*):(.*)\n\s*:::$/gm;

export default {
  name: "Dashboard",
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
  },
  data: () => {
    return {
      slides: {},
      sequenceinputs: {},
      meetinginputs: {},
    };
  },
  computed: {
    getInputs() {
      if (!this.slides.content) return;
      //parse current content for input tags:
      let text = this.slides.content[this.slides.currentslide];

      // console.log(text);
      let inputs = [...text.matchAll(regex)];

      return inputs.map((el) => {
        // console.log(el);
        return {
          type: el[1] ? el[1] : "m-",
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
      if (
        this.slides.content &&
        this.slides.content.length > this.slides.currentslide
      )
        return this.slides.content[this.slides.currentslide + 1];
      else return "";
    },
  },
  methods: {
    updateField(event, field, type) {
      // console.log(`${type}:${field} with ${event}`);
      //write to firebase data node
      //TODO: debounce, and
      if (type === "s-") {
        // console.log("s");
        this.firebase
          .ref(`sequence/${this.context.sequenceid}/data/slides/${field}`)
          .set(event);
      } else {
        // console.log("m");
        //also update the markdown display:
        this.firebase
          .ref(`data/slides/${this.context.meetingid}/${field}`)
          .set(event);
      }
    },
    async updateVisible() {
      await this.firebase
        .ref(
          `config/${this.context.meetingid}/current/currentState/plugins/slides/visible`
        )
        .set(this.slides.visible);
    },
    async save() {
      await this.firebase
        .ref(`config/${this.context.meetingid}/current/slides`)
        .set(this.slides);
    },
    async next() {
      if (!this.slides.currentslide) {
        this.slides.currentslide = 0;
      }
      if (this.totalSlides > this.slides.currentslide + 1) {
        this.slides.currentslide++;
        await this.firebase
          .ref(
            `config/${this.context.meetingid}/current/currentState/plugins/slides/currentslide`
          )
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
          .ref(
            `config/${this.context.meetingid}/current/currentState/plugins/slides/currentslide`
          )
          .set(this.slides.currentslide);
      }
    },
  },
  watch: {
    firebase: {
      immediate: true,
      async handler() {
        // console.log(this.firebase);
        this.$rtdbBind(
          "sequenceinputs",
          this.firebase.ref(`sequence/${this.context.sequenceid}/data/slides`)
        );
        // } else {
        //if we should get/save data from the meeting-level
        this.$rtdbBind(
          "meetinginputs",
          this.firebase.ref(`data/slides/${this.context.meetingid}`)
        );

        this.$rtdbBind(
          "slides",
          this.firebase.ref(
            `config/${this.context.meetingid}/current/currentState/plugins/slides`
          )
        );
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.scaled {
  width: 550px;
  background: silver;
  height: 412px;
  overflow: hidden;
  transform: scale(0.4);
  transform-origin: top left;
}

.scaled_wrap {
  width: 219px;
  overflow: hidden;
  height: 165px;
}
</style>