<template lang="pug">
transition(
  :key="visible",
  enter-active-class="animate__animated animate__fadeIn animate__fast",
  leave-active-class="animate__animated animate__fadeOut animate__fast"
)
  .content(v-if="visible")
    .column.justify-center.full-height
      .slide
        transition(
          mode="out-in",
          enter-active-class="animate__animated animate__fadeIn animate__fast",
          leave-active-class="animate__animated animate__fadeOut animate__fast"
        )
          Markdown(
            :content="slides.content[slides.currentslide]",
            :key="slides.content[slides.currentslide]"
          )
</template>

<script>
import Markdown from "./Markdown.vue";

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
  components: {
    Markdown,
  },
  computed: {
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

<style src="animate.css/animate.css">
/* global styles */
</style> 

<style lang="scss">
.slide {
  background: rgb(1, 77, 109);
  color: white;
  border-radius: 5px;
  font-size: 26px;
  height: 412px;
  width: 550px;
  filter: drop-shadow(0 0 10px black);
  overflow: hidden;
}

.content {
  position: absolute;
  height: 720px;
  width: 480px;
  z-index: -3;
  left: 10px;
  transform: perspective(1500px) rotateY(15deg);
}

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
