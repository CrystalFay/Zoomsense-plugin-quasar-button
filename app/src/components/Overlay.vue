<template>
  <div>{{ slides.currentslide }}</div>
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
