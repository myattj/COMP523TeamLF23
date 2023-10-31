import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  email = '';
  password = '';
  submitted = false;
  constructor(private router: Router){
    
  }

  public onSubmit(){
      console.log(this.email);
      console.log(this.password);
      this.submitted = true;

      if(this.email && this.password) {
        this.router.navigate(['./home']);
      }
      
  }
}
