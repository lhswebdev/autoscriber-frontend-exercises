export default async function(dialog) {
  return await dialog.prompt({
    title: 'Display Name',
    text: 'Enter your name. This will be used in the transcript.',
  });
}