// It is not possible to check if the app is removed from the pc (only when it's removed from chrome://apps)
if ('serviceWorker' in navigator) {
	//check if serviceWorkers are supported and register it (dev-tools>application>service workers)
	const register = navigator.serviceWorker.register('./../sw-template.js');
	register
		.then(() => {
			console.log('SW registered');
		})
		.catch((err) => {
			console.log('Registration failed:', err);
		});
}

// app install Homescreen
let deferredPrompt;
const appbtn = document.querySelector('.add-app');
const uninstallbtn = document.querySelector('.uninstall');
appbtn.style.display = 'none'; //hidden = problem with manifest or already added to homeScreen

// If chromium browser show url to uninstall page (chrome://apps)
var isChromium = !!window.chrome;
console.log(isChromium);
if (!isChromium) {
	uninstallbtn.innerHTML = 'This is not a chromium browser.';
}

window.addEventListener('beforeinstallprompt', (e) => {
	// e.preventDefault();
	console.log(e.platforms);
	deferredPrompt = e;
	uninstallbtn.style.display = 'none';
	appbtn.style.display = 'block';
});

appbtn.addEventListener('click', (e) => {
	deferredPrompt.prompt();
	deferredPrompt.userChoice.then((choiceResult) => {
		if (choiceResult.outcome === 'accepted') {
			console.log('User accepted the a2HS prompt');
		}
		deferredPrompt = null;
	});
});

// DISPLAY-MODE Detection
// Check how the app is loaded (browser vs app) (display the download button in browser only)
function getPWADisplayMode() {
	const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
	if (document.referrer.startsWith('android-app://')) {
		return 'twa';
	} else if (navigator.standalone || isStandalone) {
		return 'standalone';
	}
	return 'browser';
}

// Detect if display mode changes
window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
	let displayMode = 'browser';
	if (evt.matches) {
		displayMode = 'standalone';
	}
	// Log display mode change to analytics
	console.log('DISPLAY_MODE_CHANGED', displayMode);
});