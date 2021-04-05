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

/*
  TODO
  We have a function here.
  This function is imported in many parts of the frontend.
  For the function to be "importable", we need to "export" it.
  The syntax to export a default function is:
    export default function() { }
  You can export async functions in a similar way.

  TASK
  Export the function below as the default function for the askUser module.
*/
async function(dialog, id) {
  return await dialog.prompt(prompts[id]);
}