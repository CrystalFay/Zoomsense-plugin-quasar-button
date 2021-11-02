<template lang="pug">
div
  q-btn(@click="next") Next
  q-btn(@click="prev") Prev
</template>

<script>
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
  data: () => {
    return {
      slides: {},
    };
  },
  methods: {
    async save() {
      await this.firebase
        .ref(`config/${this.context.meetingid}/current/slides`)
        .set(this.slides);
    },
    async next() {
      if (!this.slides.currentslide) {
        this.slides.currentslide = 0;
      }
      this.slides.currentslide++;
      await this.firebase
        .ref(`config/${this.context.meetingid}/current/slides/currentslide`)
        .set(this.slides.currentslide);
    },
    async prev() {
      if (!this.slides.currentslide) {
        this.slides.currentslide = 0;
      }
      this.slides.currentslide--;
      await this.firebase
        .ref(`config/${this.context.meetingid}/current/slides/currentslide`)
        .set(this.slides.currentslide);
    },
  },
  watch: {
    firebase: {
      immediate: true,
      handler() {
        // console.log(this.firebase);
        this.$rtdbBind(
          "slides",
          this.firebase.ref(`config/${this.context.meetingid}/current/slides`)
        );
      },
    },
  },
};
</script>
