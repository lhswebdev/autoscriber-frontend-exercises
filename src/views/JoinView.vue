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
import askUser from '../components/askUser.js';
import { saveAs } from 'file-saver';
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
    async getMeetingId() {
      let meetingID = await askUser(this.$dialog, 'session');
      if (!meetingID) return;
      const split = meetingID.split('/session/');
      if (split.length > 1) meetingID = split[1].substr(1);
      return meetingID;
    },
    async joinSession() {
      // TODO
      // This function redirects the user to the session screen.
      // First, we need to ask for the meeting ID.
      // You can ask the user for a meeting ID with:
      //   await this.getMeetingId();
      // We want to set this meeting ID to a variable called `meetingID` (const).
      //
      // TASK
      // Set a constant variable called `meetingID` and set it to the meeting id input by the user.
      
      if (meetingID) {
        // TODO
        // Now that we have the meeting ID, we can redirect the user.
        // We want to go to `/session/${meetingID}`.
        // For example, if our meeting ID was 'testMeetingId', we would redirect to:
        //   /session/testMeetingId
        // You can redirect the page like this:
        //   this.$router.push(PATH_YOU_WANT_TO_GO_TO);
        //
        // TASK
        // Redirect the user to /session/testMeetingId.
        
      }
    },
    async createSession() {
      const name = await askUser(this.$dialog, 'name');
      if (!name) return;
      const res = await axios.post(`${backend_domain}/host`, {
      });
      this.$router.push({
        name: 'Session',
        params: {
          sessionID: res.data.meeting_id,
          name
        }
      });
    },
    async downloadNotes() {
      const meetingID = await this.getMeetingId();
      if (meetingID) {
        const text = await axios.get(`${backend_domain}/download?id=${meetingID}`);
        saveAs(new Blob([text], {type: 'text/plain;charset=utf-8'}), `notes_${meetingID}.md`); 
      }
    }
  }
};
</script>

<style>
.paddedButton {
  margin: 5px;
}
</style>