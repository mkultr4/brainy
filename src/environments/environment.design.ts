export const environment = {
    envName: 'design',
    enableTracing: false,
    production: false,
    urlSocketLogin: 'http://localhost:3000/login',
    urlSocketFeedback: 'http://localhost:3000/feedback',
    urlSocketMyProfile: 'https://socket.squintapp.com/myprofile',
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
      apiKey:'xxxxxxxxx'
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
      apiKey:'xxxxxxxxx'
    }


};
