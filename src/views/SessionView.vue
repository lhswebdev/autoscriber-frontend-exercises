<template>
  <v-card color="#385F73" dark class="card" style="padding-bottom: 10px;">
    <v-card-title class="headline" style="">
      Session:
      <code style="margin-left: 0.5em;">{{ sessionID }}</code>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          style="transition: 0.25s; margin: 0.5em;"
          :class="{
            green: copied
          }"
          v-bind="attrs"
          v-on="on"
          @click="">
            <!-- 
              TODO
              The @click directive runs a function on click.
              We want to run copyID() when the user clicks the button.
              For example:
                <v-btn @click="doSomething()">Do Something<v-btn>

              TASK
              Make the <v-btn> above run copyID() when clicked.
            -->
            <span v-if="!copied"><v-icon>mdi-link</v-icon> Copy</span>
            <span v-else><v-icon>mdi-check</v-icon> Copied!</span>
          </v-btn>
        </template>
        <span>Click to copy to clipboard</span>
      </v-tooltip>
    </v-card-title>

    
    <v-card-subtitle>
      <!-- 
        TODO
        The syntax for embedding variables in Vue is {{ variableName }}.
        For example, check line 5:
          <code style="margin-left: 0.5em;">{{ sessionID }}</code>
        This will automatically update the text within the <code> block when sessionID changes.
        Here in this <v-card-subtitle>, we want to show the `displayName` (the user's name).

        TASK
        Make this subtitle element look like:
          Joined as Kento
          Joined as Sangmin
          Joined as ANY_NAME_HERE
        The name of the user is stored in a variable called `displayName`.
       -->
    </v-card-subtitle>

    <v-card-subtitle>Click the microphone icon to start recording.</v-card-subtitle>
    <v-card-actions class="justify-center">
      <v-btn
        class="pink justify-center micbutton"
        fab
        dark
        x-large
        color="pink"
        @click="started ? stopRecognition() : startRecognition()"
      >
        <!-- 
          TODO
          Vue supports if-else statements right in the HTML.
          For example:
            let value = false;
            ...
            <div v-if="value">Only shown when value is true</div>
            <div v-else>Only shown when value is false</div>
          We want to show mdi-microphone-off only when the meeting is started,
          and mdi-microphone when the meeting has not yet been started.
          You can check whether a meeting has been started or not with the `started` variable.

          TASK
          Only show the v-icon containing mdi-microphone-off if `started` is true.
          Else, show the v-icon with mdi-microphone.
        -->
        <v-icon v-if="started">
          mdi-microphone-off
        </v-icon>
        <v-icon v-else>
          mdi-microphone
        </v-icon>
      </v-btn>
    </v-card-actions>
    <span v-if="started">
      <v-card-subtitle style="color: pink;" class="text-center">
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
    </span>
  </v-card>
</template>

<script>
import axios from 'axios';
import copy from 'copy-to-clipboard';
import askUser from '../components/askUser.js';
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
    copied: false,
    displayName: ''
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
    copyID() {
      copy(`${window.location.origin}#/session/${this.sessionID}`);
      clearTimeout(this.copied);
      this.copied = setTimeout(() => {
        this.copied = false;
      }, 1000);
    }
  },
  async mounted(){
    const name = (this.name || await askUser(this.$dialog, 'name') || 'Anonymous').trim();
    if (!name) return;
    this.displayName = name;
    axios.post(`${backend_domain}/join`, {
      name,
      meeting_id: this.sessionID
    });
  },
  props: {
    name:{
      type: String,
      default: null,
    },
    sessionID:{
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>