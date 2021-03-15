<template>
  <v-card color="#385F73" dark class="card" style="
    width: fit-content;
    padding: 0px 25px 20px 25px;
  ">
    <v-card-title class="headline justify-center"
      >Welcome to Autoscriber!</v-card-title
    >
    <v-card-actions class="justify-center" style="flex-wrap: wrap;">
      <v-btn class="blue paddedButton" dark large @click="createSession()">
        Create a New Session
      </v-btn>
      <v-btn class="green paddedButton" dark large @click="joinSession()">
        Join a Session
      </v-btn>
      <v-btn class="gray paddedButton" dark large @click="downloadNotes()">
        Download Notes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
import askName from '../components/askName.js';
const backend_domain = process.env.VUE_APP_BACKEND_DOMAIN;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = true;
recognition.onstart = () => {
  console.debug('Recognition started');
};
recognition.onaudioend = () => recognition.stop();
recognition.lang = 'en-US';
export default {
  data: () => ({
  }),
  methods: {
    async joinSession() {
      const meetingID = await this.$dialog.prompt({
        text: 'Session ID or Link',
        title: 'Enter a session ID or invite link.',
      });
      if (!meetingID) return;
      this.$router.push(`/session/${meetingID}`);
    },
    async createSession() {
      const name = await askName(this.$dialog);
      if (!name) return;
      const res = await axios.post(`${backend_domain}/host`, {
        name
      });
      this.$router.push(`/session/${res.meeting_id}`);
    }
  }
};
</script>

<style>
.paddedButton {
  margin: 5px;
}
</style>