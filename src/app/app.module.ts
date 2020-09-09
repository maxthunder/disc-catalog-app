import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import {ProtectedComponent} from "./protected/protected.component";
import {CatalogComponent} from "./catalog/catalog.component";
import { WantedDiscsComponent } from './wanted-discs/wanted-discs.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const config = {
  issuer: 'https://dev-705927.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oawaajgtyCxmhZ7R4x6',
  pkce: true
}

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const appRoutes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    LoginComponent,
    ProtectedComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
