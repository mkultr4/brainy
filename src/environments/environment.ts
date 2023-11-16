// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  envName: 'dev',
  enableTracing: false,
  production: false,

  urlSocketLogin: 'http://localhost:3000/login',
  urlSocketMyProfile: 'http://localhost:3000/myprofile',
  urlSocketRegistrar: 'http://localhost:3000/registrar',
  urlSocketFeedback: 'http://localhost:3000/feedback',
  urlUploadFile: 'http://localhost:3000/uploadFile',
  urlSocketMeetingNote: 'http://localhost:3000/meetingnote',
  urlSocketInvitation: 'http://localhost:3000/invitation',
  urlNotification: 'http://localhost:3000/notification',

  login: {
    social: {
      strategies: {
        facebook: {
          appId: 'xxxxxxxxx'
        },
        google: {
          clientId: 'xxxxxxxxx.apps.googleusercontent.com'
        }
      }
    }
  },
  iframely:{
    urlOembed:'https://iframe.ly/api/oembed',
    apiKey:'6f12550bexxxxxxxxx97520ed844f3b'
  },
  firebase: {
    apiKey: 'AIzaSyCrjWqE-jxgSIMt6cLaES_PyOv056NzosY',
    authDomain: 'xxxxxxxxx.firebaseapp.com',
    databaseURL: 'https://xxxxxxxxx.firebaseio.com',
    projectId: 'xxxxxxxxx',
    storageBucket: 'xxxxxxxxx.appspot.com',
    messagingSenderId: 'xxxxxxxxx',
  },
  google:{
    apiKey:'AIzaSyBfvW6075Y-czp35ssqdwu3t8CLtPJxDR8'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
