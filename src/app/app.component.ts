import { Component, OnDestroy } from '@angular/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnDestroy {
  title = 'login-social';
  destroy$ = new Subject<void>();
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
      });
  }
  signInWithGoogle(): void {
    const googleLoginOptions = {
      scope: 'profile email',
    };
    this.authService.signIn(
      GoogleLoginProvider.PROVIDER_ID,
      googleLoginOptions
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
