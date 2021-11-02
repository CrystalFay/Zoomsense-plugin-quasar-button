<template>
  <div id="app">
    <q-layout>
      <q-page-container>
        <q-page padding>
          <h1>Dashboard</h1>
          <div>
            <div v-for="(control, index) in uilibs" :key="index">
              <ComputedComponent
                :component="control"
                type="Dashboard"
                :firebase="db"
                :context="context"
              ></ComputedComponent>
            </div>
          </div>
          <h1>Overlay</h1>
          <div>
            <div v-for="(control, index) in overlay" :key="index">
              <ComputedComponent
                :component="control"
                type="Overlay"
                :firebase="db"
                :context="context"
              ></ComputedComponent>
            </div>
          </div>

          <!-- <Dashboard /> -->
          <!-- <Overlay /> -->
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import ComputedComponent from "./ComputedComponent.vue";
import Dashboard from "./components/Dashboard.vue";
import Overlay from "./components/Overlay.vue";

// Get a RTDB instance
import firebase from "firebase/app";
import "firebase/database";

export const db = firebase
  .initializeApp({
    databaseURL: "https://zoomsense-plugin-default-rtdb.firebaseio.com/",
  })
  .database();

export default {
  name: "App",
  components: {
    // Overlay,
    ComputedComponent,
  },
  data: () => {
    return {
      db: db,
      context: {
        meetingid: "1",
      },
      uilibs: {
        "plugin-example": {
          // url: "https://action-lab-aus.gitlab.io/zoomsense/zoomsense-plugin-directory/MyNewPlugin/main/MyNewPlugin.Dashboard.umd.min.js",
          local: Dashboard,
          url: "http://localhost:5000/dist/PluginExample.common.js",
        },
      },
      overlay: {
        "plugin-example": {
          // url: "https://action-lab-aus.gitlab.io/zoomsense/zoomsense-plugin-directory/MyNewPlugin/main/MyNewPlugin.Dashboard.umd.min.js",
          local: Overlay,
          url: "http://localhost:5000/dist/PluginExample.common.js",
        },
      },
    };
  },
};
</script>