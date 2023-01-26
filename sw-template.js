// https://web.dev/offline-cookbook/
// https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
const cacheName = 'static-v2'; //change version if code is updated (production only)
const dynamicCacheName = 'dynamic-v3'; //change version if code is updated (production only)
const cacheMode = 'developing'; // set it to 'production' when finished developing. otherwise keep it on 'developing'

// APP SHELL (only the essential files ex: nav.css, index.html, ... )
// check urls if you get a:
// Uncaught (in promise) TypeError: Failed to execute 'Cache' on 'addAll': Request failed
const resourcesToPrecache = [
	'/',
	'/404.html',
	'/index.html',
	'/offline.html', //==> required if a page of you'r website is not cached yet and you have no internet connection. ==> this page is shown
	'/pwa-installer.js',
	'/testdata/someLogic.js',
	// '/src/js/ajax.js',
	// '/css/home.css',
	// '/images/logo.jpg',
	// 'https://fonts.googleapis.com/css?family=Raleway:400,700',
];

// new service service detected and installed
self.addEventListener('install', (event) => {
	console.log('SW Installed');
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			cache.addAll(resourcesToPrecache);
		})
	);
});
// activate event
self.addEventListener('activate', (evt) => {
	//console.log('service worker activated');
	evt.waitUntil(
		caches.keys().then((keys) => {
			//console.log(keys);
			return Promise.all(
				keys
				.filter((key) => key !== cacheName && key !== dynamicCacheName)
				.map((key) => {
					console.log('Service worker: Clearing Old Cache');
					caches.delete(key);
				})
			);
		})
	);
});

// limit cache size (no oversized cache plz)
const limitCacheSize = (name, size) => {
	caches.open(name).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length > size) {
				cache.delete(keys[0]).then(limitCacheSize(name, size));
			}
		});
	});
};

//  fetch = Cache every http request you'll see in network tab
self.addEventListener('fetch', (event) => {
	console.log(event.request);
	if (event.request.url.indexOf('https://jef-api.onrender.com') === -1 && event.request.url.indexOf('https://ehb-mct.github.io') === -1 &&
		event.request.url.indexOf('http://maps.google.com') === -1) {
		// https://stackoverflow.com/questions/33262385/service-worker-force-update-of-new-assets
		if (cacheMode == 'developing') {
			// #METHOD 1
			// Network first (cache as fallback)
			// request file from network / if offline get it from cache (longer loading time but better while developing)
			event.respondWith(
				fetch(event.request)
				.then(function (response) {
					// if ((event.request.mode === 'navigate' )  && response.status == 404) {
					if (response.status == 404) {
						return caches.match('/404.html');
					}

					return caches.open(dynamicCacheName).then(function (cache) {
						return cache.put(event.request, response.clone()).then(function () {
							return response;
						});
					});
				})
				.catch(function (e) {
					console.log('error:', e);
					return offline();
				})
			);
		} else if (cacheMode == 'production') {
			// #METHOD 2
			// Stale-while-revalidate

			event.respondWith(
				caches
				.open(dynamicCacheName)
				.then(function (cache) {
					return cache.match(event.request).then(function (response) {
						var fetchPromise = fetch(event.request).then(function (networkResponse) {
							if (networkResponse.status == 404) {
								return caches.match('/404.html');
							}
							cache.put(event.request, networkResponse.clone());
							return networkResponse;
						});
						return response || fetchPromise;
					});
				})
				.catch((e) => {
					console.log('error:', e);
					return offline();
				})
			);
		} else {
			// #METHOD 3
			// Cache first (network as fallback)(to update files ==> change cacheNames)
			// Always check if file exist in cache (faster load time after 1st visit)
			event.respondWith(
				caches
				.match(event.request)
				.then((cacheRes) => {
					return (
						cacheRes ||
						fetch(event.request).then((networkRes) => {
							if (networkRes.status == 404) {
								return caches.match('/404.html');
							}
							return caches.open(dynamicCacheName).then((cache) => {
								// console.log(cache.keys((key) => console.log(key)).then((e) => console.log(e)));
								cache.put(event.request.url, networkRes.clone());
								limitCacheSize(dynamicCacheName, 30); // 30 files
								return networkRes;
							});
						})
					);
				})
				.catch((e) => {
					console.log('error:', e);
					return offline();
				})
			);
		}
	}
});

async function LogPromise(promise) {
	const result = await promise;
	console.log(result);
	return result;
}

function offline() {
	return caches.match('/offline.html').then((offlineResponse) => {
		// console.log(LogPromise(offlineResponse));
		const newResponse = new Response(offlineResponse.body, {
			// body: offlineResponse.body.getReader(),
			status: 503,
			statusText: offlineResponse.statusText,
			headers: new Headers(offlineResponse.headers),
			url: offlineResponse.url,
			redirected: true,
		});
		// console.log(LogPromise(newResponse));
		return newResponse;
	});
}