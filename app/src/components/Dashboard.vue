<template lang="pug">
div
  .row.items-center
    .col-auto
      q-toggle(v-model="slides.visible", @input="updateVisible()") Visible
    .col-auto
      q-btn(@click="prev", outline) Prev
    .col.text-center {{ currentSlide }} of {{ totalSlides }}
    .col-auto
      q-btn(outline, @click="next") Next
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
  computed: {
    currentSlide() {
      return this.slides.currentslide + 1;
    },
    totalSlides() {
      return this.slides.content ? this.slides.content.length : 0;
    },
  },
  methods: {
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
