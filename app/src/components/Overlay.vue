<template lang="pug">
.slide(v-if="visible")
  div(v-html="content")
</template>

<script>
import { marked } from "marked";

export default {
  name: "SlidesOverlay",
  props: {
    firebase: {
      required: true,
    },
    context: {
      required: false,
    },
  },
  computed: {
    content() {
      try {
        return marked.parse(this.slides.content[this.slides.currentslide]);
      } catch {
        return this.slides.content[this.slides.currentslide];
      }
    },
    visible() {
      if (typeof this.slides.visible == undefined) return true;
      else return this.slides.visible;
    },
  },
  data: () => {
    return {
      slides: {},
    };
  },
  watch: {
    firebase: {
      immediate: true,
      handler() {
        // console.log(this.firebase);
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
<style lang="scss">
.slide {
  width: 400px;
  height: 225px;
  background: #33333366;
  color: white;
  font-size: 26px;
}
</style>
