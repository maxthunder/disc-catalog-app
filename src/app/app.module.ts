import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from "./components/login/login.component";
import {ProtectedComponent} from "./components/protected/protected.component";
import {CatalogComponent} from "./components/catalog/catalog.component";
import { WishlistComponent } from './components/wishlist/wishlist.component';
import {DataTablesModule} from "angular-datatables";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { AddDiscComponent } from './components/add-disc/add-disc.component';
import {MatDialogModule} from "@angular/material/dialog";
import {OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent, OktaAuthGuard} from '@okta/okta-angular';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSortModule} from "@angular/material/sort";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

const config = {
  issuer: 'https://dev-705927.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oawaajgtyCxmhZ7R4x6',
  pkce: true
};

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const appRoutes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'addDisc', component: AddDiscComponent },
  { path: 'wishlist', component: WishlistComponent },
  // {
  //   path: 'implicit/callback',
  //   component: OktaCallbackComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'protected',
  //   component: ProtectedComponent,
  //   canActivate: [ OktaAuthGuard ],
  //   data: {
  //     onAuthRequired
  //   }
  // },
];
@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    LoginComponent,
    ProtectedComponent,
    WishlistComponent,
    AddDiscComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule,
    DataTablesModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
