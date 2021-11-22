<template>
  <div id="app">
    <q-layout>
      <q-page-container>
        <q-page padding>
          <Dashboard :firebase="db" :context="context" />
          <Overlay :firebase="db" :context="context" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';
import Overlay from './components/Overlay.vue';

// Get a RTDB instance
import firebase from 'firebase/app';
import 'firebase/database';

export const db = firebase
  .initializeApp({
    databaseURL: 'https://zoomsense-plugin-default-rtdb.firebaseio.com/',
  })
  .database();

export default {
  name: 'App',
  components: {
    Dashboard,
    Overlay,
  },
  data: () => {
    return {
      db: db,
      context: {
        meetingid: '3',
        sequenceid: 'user2',
      },
    };
  },
};
</script>