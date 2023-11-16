import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { IndexComponent } from './components/index/index.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ToastrBrainyComponent } from './components/toastr-brainy/toastr-brainy.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './services/language/language.service';
import { SanitizePipe } from './pipes/sanitize.pipe';
import {DataTableModule} from "angular-6-datatable";
import { AuthGuardService } from '../app/services/auth/auth-guard.service';
import { LoginGuardService } from '../app/services/auth/login-guard.service';
import { AuthService, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { MessagingService } from './services/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NotificationService } from './services/notifications/notification.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Social configuration
const googleId = environment.login.social.strategies.google.clientId;
const facebookId = environment.login.social.strategies.facebook.appId;


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(googleId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(facebookId)
  }
]);

// Provider for social
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    SanitizePipe,
    ToastrBrainyComponent
  ],
  imports: [
    DataTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      enableHtml: false,
      positionClass: 'toast-top-right',
      messageClass: 'toast-message',
      toastClass: 'toast-brainy',
      toastComponent: ToastrBrainyComponent,
      closeButton: true
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  entryComponents: [ToastrBrainyComponent],
  providers: [
    AuthGuardService,
    LoginGuardService,
    AuthService,
    MessagingService,
    NotificationService,
    { provide: AuthServiceConfig, useFactory: provideConfig},
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _languageService: LanguageService) {
    // Current language
    const currentLanguage = this._languageService.getCurrentLanguage();
    // All languages
    const languages = this._languageService.getLanguagesMock();
    // Set the default language
    this._languageService.setDefaultLanguage('es');
    // If not in locale storage
    if (!currentLanguage) {
      // Default language
      const defaultLanguage = languages.filter(lang => lang.code.toLocaleLowerCase() === 'es')[0];
      // Browser language
      const browserLangStr = this._languageService.browserLang;
      console.log('browserLangStr', browserLangStr);
      // Existe browser language
      const browserLanguage = languages.filter(lang => lang.code.toLocaleLowerCase() === browserLangStr)[0];

      if (browserLanguage) {
        this._languageService.setLanguage(browserLanguage);
      } else {
        this._languageService.setLanguage(defaultLanguage);
      }
    } else {
      this._languageService.setLanguage(currentLanguage);
    }

    
  }
}
