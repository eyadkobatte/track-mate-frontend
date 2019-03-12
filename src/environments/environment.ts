// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAnu3Z3dkJaFSg4Br23NDJtYSdigLMstoo',
    authDomain: 'track-mate-23d06.firebaseapp.com',
    databaseURL: 'https://track-mate-23d06.firebaseio.com',
    projectId: 'track-mate-23d06',
    storageBucket: 'track-mate-23d06.appspot.com',
    messagingSenderId: '358306011016'
  },
  apiURL: 'http://localhost:3000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
