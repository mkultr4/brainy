export const environment = {
  envName: 'production',
  enableTracing: false,
  production: true,
  urlSocketLogin: 'https://socket.squintapp.com/login',
  urlSocketRegistrar: 'https://socket.squintapp.com/registrar',
  urlSocketFeedback: 'https://socket.squintapp.com/feedback',
  urlSocketMyProfile: 'https://socket.squintapp.com/myprofile',
  urlUploadFile: 'https://localhost:3000/uploadFile',
  urlSocketMeetingNote: 'https://socket.squintapp.com/meetingnote',
  urlSocketInvitation: 'https://socket.squintapp.com/invitation',
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
  google:{
    apiKey:'xxxxxxxxx'
  }
};
