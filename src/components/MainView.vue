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
        @click="startRecognition()"
      >
        <v-icon dark>
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
      }">
        {{ item.text }}
      </p>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { recognition } from '@/modules/recognition.js';

export default {
  data: () => ({
    recordedSpeech: [{
      hot: true
    }],
    recognition,
    started: false
  }),
  methods: {
    startRecognition() {
      recognition.onresult = event =>{
        const result = event.results[event.results.length - 1];
        const resultText = Array.from(result).map(d => d.transcript).join(' ');
        // const confidence = result[0].confidence;
        console.log(resultText);
        const index = Math.max(this.recordedSpeech.length - 1, 0);
        this.$set(this.recordedSpeech[index], 'text', resultText);
        if (result.isFinal) {
          this.recordedSpeech[index].hot = false;
          this.recordedSpeech.push({
            hot: true
          });
        }
      };
      recognition.start();
      this.started = true;
    }
  }
};
</script>

<style>
</style>