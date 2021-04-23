import { Component, OnInit } from '@angular/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  destroy$ = new Subject<void>();
  constructor(private authService: SocialAuthService) {}
  user: SocialUser;
  ngOnInit() {
    this.authService.authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  signInWithGoogle(): void {
    const googleLoginOptions = {
      scope: 'profile email',
    };
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions)
      .then(() => {
        console.log(this.user.idToken);
      });
  }

  signInWithFB(): void {
    const fbLoginOptions = {
      scope: 'public_profile,email',
      return_scopes: true,
      enable_profile_selector: true,
    };
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions)
      .then(() => {
        console.log(this.user.idToken);
      });
  }
}
