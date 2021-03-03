<template>
  <v-card color="#385F73" dark class="card">
    <v-card-title class="headline"
      >Welcome to Autoscriber</v-card-title
    >

    <v-card-subtitle>Click the microphone icon to begin the speech recognition demo.</v-card-subtitle>
    <v-card-actions class="justify-center">
      <v-btn
        class="pink justify-center micbutton"
        fab
        dark
        x-large
        color="pink"
        @click="started ? stopRecognition() : startRecognition()"
      >
        <v-icon v-if="started">
          mdi-microphone-off
        </v-icon>
        <v-icon v-else>
          mdi-microphone
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-subtitle v-if="started" style="color: pink;" class="text-center">
      Speech recognition is running!
    </v-card-subtitle>
    <v-card-subtitle>
      <p v-for="(item, index) in recordedSpeech" :key="index" :style="{
        color: item.hot ? 'orange' : undefined
      }" :class="{
        'text-center': item.hot
      }">
        {{ item.text }}
      </p>
    </v-card-subtitle>
    <v-card-actions class="justify-end">
      <v-btn v-if="recordedSpeech[0].text" class="pink justify-center"
        dark
        x-large
        color="pink"
        @click="endRecording()"
      >
        Finish and Summarize
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
const backend_domain = 'localhost';
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
    recognition,
    started: false,
  }),
  methods: {
    startRecognition() {
      this.recognition.onresult = event => {
        const result = event.results[event.results.length - 1];
        const resultText = Array.from(result).map(d => d.transcript).join(' ');
        // const confidence = result[0].confidence;
        const index = Math.max(this.recordedSpeech.length - 1, 0);
        this.$set(this.recordedSpeech[index], 'text', resultText);
        if (result.isFinal) {
          console.log(resultText);
          console.debug(event);
          this.recordedSpeech[index].hot = false;
          this.recordedSpeech.push({
            hot: true
          });

          // Make post request after each blob
          const time = new Date();
          const req = {
            uuid: '',
            message: this.recordedSpeech[0].text,
            timestamp: Math.floor(time.getTime()/1000),
          };
          const uuid = axios.post(`${backend_domain}:3000/add`, req);
          console.log(uuid);
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
    }
  }
};
</script>

<style>
</style>