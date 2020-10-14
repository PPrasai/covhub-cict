import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';
import { BasicAuth } from '../../@models/auth-response.model';
import { AuthService } from '../core/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HOME } from '../../app.conf';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  loading = false;

  redirectDelay: number;
  showMessages = { error: null, success: null };
  submitted = false;
  private returnUrl: string = HOME;

  constructor(
    private authService: AuthService,
    protected router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    super(authService, {}, changeDetector, router);
    super.socialLinks = [];
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || HOME;
    if (
      this.authService.isAuthenticated ||
      this.authService.isAdmin() ||
      this.authService.isPrivileged ||
      !this.authService.isInPublicMode) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    const { email, password } = this.user;
    this.authService.login(email, password)
      .subscribe((val: BasicAuth.Response) => {
        if (BasicAuth.isSuccess(val)) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.showMessages.error = val.error;
        }
      });
  }

}
