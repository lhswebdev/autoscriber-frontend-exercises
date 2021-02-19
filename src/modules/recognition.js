
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.continuous = false;
recognition.interimResults = true;
recognition.onstart = () => {
  console.debug('Recognition started');
};
recognition.onaudioend = () => recognition.stop();
recognition.onend = () => {
  recognition.start();
};
recognition.lang = 'en-US';

export { recognition };