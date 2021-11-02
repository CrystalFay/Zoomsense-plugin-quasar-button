<template lang="pug">
.slide
  div {{ slides.currentslide }}
  div {{ content }}
</template>

<script>
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
      return this.slides.content[this.slides.currentslide];
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
<style lang="scss" scoped>
.slide {
  width: 400px;
  height: 400px;
  background: #33333366;
  color: white;
  padding: 20px;
  font-size: 26px;
}
</style>
