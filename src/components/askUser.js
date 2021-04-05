const prompts = {
  'name': {
    title: 'Display Name',
    text: 'Enter your name. This will be used in the transcript.',
  },
  'session': {
    title: 'Session ID or Link',
    text: 'Enter a session ID or invite link.'
  }
};

export default async function(dialog, id) {
  return await dialog.prompt(prompts[id]);
}