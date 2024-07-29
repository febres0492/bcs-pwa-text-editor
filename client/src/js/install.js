const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO.: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event
    butInstall.classList.toggle('hidden', false)
});

// TODO.: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('button clicked')
    const event = window.deferredPrompt
    if (!event) { return }
    event.prompt()

    // stoping prompt
    window.deferredPrompt = null
    butInstall.classList.toggle('hidden', true)
});

// TODO.: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('app  installed', event)
});
