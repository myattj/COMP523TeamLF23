import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  email = '';
  password = '';
  submitted = false;
  constructor(private router: Router){
    
  }

  public onSubmit(){
      this.submitted = true;
      //Add confirm password validation
      //Add email and password to the database
      
      if(this.email && this.password) {
        this.router.navigate(['./']);
      }
      
  }
}
