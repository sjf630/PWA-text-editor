const buttonInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  buttonInstall.classList.toggle('hidden', false);
});

buttonInstall.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  buttonInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  buttonInstall.classList.toggle('hidden', true);
  deferredPrompt = null;
});