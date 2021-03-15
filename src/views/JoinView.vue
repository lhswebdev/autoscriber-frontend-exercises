<template>
  <v-card color="#385F73" dark class="card" style="
    width: fit-content;
    padding: 0px 25px 20px 25px;
  ">
    <v-card-title class="headline justify-center"
      >Welcome to Autoscriber!</v-card-title
    >
    <v-card-actions class="justify-center">
      <v-btn class="blue" dark x-large>
        Create a New Session
      </v-btn>
      <v-btn class="green" dark x-large>
        Join a Session
      </v-btn>
      <v-btn class="gray" dark x-large>
        Download Notes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
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
    recordedSpeech: [{
      hot: true
    }],
    uuid: '',
    recognition,
    started: false,
  }),
  methods: {
    startRecognition() {
      this.recognition.onresult = async (event) => {
        const result = event.results[event.results.length - 1];
        const resultText = Array.from(result).map(d => d.transcript).join(' ');
        // const confidence = result[0].confidence;
        const index = Math.max(this.recordedSpeech.length - 1, 0);
        this.$set(this.recordedSpeech[index], 'text', resultText);
        if (result.isFinal) {
          console.debug(event);
          this.recordedSpeech[index].hot = false;
          this.recordedSpeech.push({
            hot: true
          });
          
          // Make post request after each blob
          const time = Math.floor(new Date().getTime()/1000);  // timestamp in seconds
          const blob = {
            uuid: this.uuid,
            message: this.recordedSpeech[index].text,
            timestamp: time,
          }; // Current blob
          const res = await axios.post(`${backend_domain}/add`, blob);
          if (!this.uuid) {
            this.uuid = res.data;
          }
        }
      };
      
      recognition.onend = () => {
        recognition.start();
      };
      this.recognition.start();
      this.started = true;
    },
    stopRecognition() {
      this.recognition.onend = undefined;
      this.recognition.stop();
      this.started = false;
    },
    endRecording() {
      if (this.started) {
        this.stopRecognition();
      }
      
      // do backend stuff!
    },
  }
};
</script>

<style>
</style>