<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="primary" label="Click here" @click="appendTimestamp()"/>   
    <div v-for="item in timestamps" :key="item.id">
    {{item}}
    </div>
  </div>
</template>

<script>
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

   data: () => {
     return {
         timestamps: {},
     };
   },

  methods: {
    appendTimestamp() {
         //console.log(Date.now());
         this.firebase
            .ref('data/meta/86749567821_20211118T050000/ZoomSensor_1')
            .push(Date.now());
        
    }
  },

   watch: {
     firebase: {
       immediate: true,
       async handler() {
          this.$rtdbBind('timestamps', this.firebase.ref(`data/meta/86749567821_20211118T050000`));
       },
     },
   },
};
</script>

