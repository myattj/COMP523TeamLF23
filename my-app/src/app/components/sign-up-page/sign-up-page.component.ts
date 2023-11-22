import { APP_ID, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  user: User;
  email: string;
  password: string;
  password2: string;
  submitted: boolean = false;
  match: boolean = true;

  constructor(private router: Router, private authService: AuthService){
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.user = { id: 0, email: this.email, password: this.password }
  }

  public onSubmit(){
      this.submitted = true;
      
      if(this.password != this.password2) {
        this.match = false;
      }
      if(this.match == true && this.email && this.password) {
        //api post sign up
        this.user.email = this.email;
        this.user.password = this.password;
        this.authService.addUser(this.user);
        this.router.navigate(['./']);
      }
  }
}
