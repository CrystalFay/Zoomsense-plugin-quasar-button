<template lang="pug">
transition(
  :key='visible',
  enter-active-class='animate__animated animate__fadeIn animate__fast',
  leave-active-class='animate__animated animate__fadeOut animate__fast'
)
  .content(v-if='visible')
    .column.justify-center.full-height
      .slide(:style='{ height: height, width: width }')
        transition(
          mode='out-in',
          enter-active-class='animate__animated animate__fadeIn animate__fast',
          leave-active-class='animate__animated animate__fadeOut animate__fast'
        )
          Markdown.full-height(
            v-bind:style='slides.style',
            :content='slides.content[slides.currentslide]',
            :key='slides.content[slides.currentslide]',
            :sequenceinputs='sequenceinputs',
            :meetinginputs='meetinginputs'
          )
</template>

<script>
import Markdown from './Markdown.vue';

export default {
  name: 'SlidesOverlay',
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
    ratio() {
      return this.slides.ratio || 4.0 / 3.0;
    },
    height() {
      return `${550 / this.ratio}px`;
      //- height: 412px;
      //- width: 550px;
    },
    width() {
      return '550px';
    },
    visible() {
      if (typeof this.slides.visible == undefined) return true;
      else return this.slides.visible;
    },
    getStyle() {
      return this.slides.style || {};
    },
  },
  data: () => {
    return {
      slides: {},
      meetinginputs: {},
      sequenceinputs: {},
    };
  },
  watch: {
    firebase: {
      immediate: true,
      handler() {
        // console.log(this.firebase);
        this.$rtdbBind(
          'slides',
          this.firebase.ref(`config/${this.context.meetingid}/current/currentState/plugins/slides`),
        );

        // if (this.context.sequenceid) {
        //if we should save/get data from the sequence level data:
        this.$rtdbBind('sequenceinputs', this.firebase.ref(`sequence/${this.context.sequenceid}/data/slides`));
        // } else {
        //if we should get/save data from the meeting-level
        this.$rtdbBind('meetinginputs', this.firebase.ref(`data/slides/${this.context.meetingid}`));
        // );
        // }
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
