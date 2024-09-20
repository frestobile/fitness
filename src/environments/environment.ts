// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  contact_url: '',
  base_url: 'https://thecommunifitapp.com/',
  terms_url: 'https://thecommunifitapp.com/',
  policies_url: 'https://thecommunifitapp.com/',
  firebaseConfig : {
    apiKey: "AIzaSyA8heC3p0rNiptpZ-4ASZdKvmxcOHLmK0M",
    authDomain: "fitness-app-400708.firebaseapp.com",
    projectId: "fitness-app-400708",
    storageBucket: "fitness-app-400708.appspot.com",
    messagingSenderId: "156510539903",
    appId: "1:156510539903:web:0928ee969b1a16f8adaf4a",
    measurementId: "G-L1LSEBSZ1S"
  },
  stripe: {
    api: "https://ossu-technology.com/stripe",
    public_key: "pk_test_51OOhjKDzvSSxyyNrmAjI3dRoywUutXBlmrbETWpO6XIDjXhORjqhWFVlU1wJLvS098m9hxpbeuLMEUyVqWvirFIC00KVBisrnh",
    secret_key: "sk_test_51OOhjKDzvSSxyyNr5vAxN2cOsp0UYLThpS6KAsirv0ezWpXH97YeXJSyitAXyJ5WaGS1M57ho8PVT2F7niV2WyiB00hdlDBdHX"
  },
  browser_color: '#2d2a21',
  tab_models: [
		'title',
		'currency',
		'company',
		'partner',
	],
	timeSync: 40000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
