export const environment = {
  production: true,
  contact_url: '',
  terms_url: 'http://localhost:8000/',
  policies_url: 'http://localhost:8000/',
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
