<template lang="pug">
div
  q-card(flat, bordered)
    q-skeleton(v-if="loading")
    Component(
      :is="computedComponent",
      :firebase="firebase",
      :context="context"
    )
</template>

<script>
import loadRemoteModule, {
  createRequires,
} from "@paciolan/remote-module-loader";

const dependencies = {
  // firebase: require("firebase"),
  vue: require("vue"),
};

const requires = createRequires(dependencies);

export default {
  name: "DynamicComponent",
  props: {
    local: {
      required: false,
    },
    component: {
      required: true,
      type: Object,
    },
    type: {
      required: true,
      type: String,
    },
    firebase: {
      required: true,
      type: Object,
    },
    context: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      computedComponent: null,
      loading: true,
    };
  },
  watch: {
    component: {
      immediate: true,
      async handler(newComponent, prevComponent = "") {
        if (this.component.local) {
          console.log(`Loading Local`);
          this.computedComponent = this.component.local;
        } else {
          if (newComponent.url === prevComponent.url) return;

          console.log(`${this.component.url}:${this.type}`);
          const Imported = await loadRemoteModule({ requires })(
            `${this.component.url}`
          );
          this.computedComponent = Imported[this.type];
        }
        this.loading = false;

        //registering locally:
        //this.$options.components[componentName] = componentConfig.default;
      },
    },
  },
};
</script>