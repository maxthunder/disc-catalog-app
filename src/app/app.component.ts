import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";
import {Router} from "@angular/router";
import {AddDiscComponent} from "./components/add-disc/add-disc.component";
import {DiscService} from "./services/disc.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, public router: Router, public dialog: MatDialog) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
        (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  private openAddDiscDialog(): void {
    const dialogRef = this.dialog.open(AddDiscComponent, {
      width: '250px',
      // data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      //gather form fields here
    })
  }

  login() {// might be able to remove this method, I believe it is unused
    this.oktaAuth.loginRedirect('/profile');
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    await this.router.navigateByUrl('/');
  }
}
