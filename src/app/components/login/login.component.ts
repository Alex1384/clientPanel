import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { auth } from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) {}

  ngOnInit() {

// tslint:disable-next-line: no-shadowed-variable
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger',
          timout: 4000
        });
      });
  }
}
