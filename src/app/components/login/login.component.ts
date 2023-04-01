import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  badCredentials : boolean = false;

  constructor(private router: Router, private api: ApiService, private loginService: LoginServiceService)
  {
    this.loginForm = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl('')
      });
  }


  ngOnInit()
  {
  }

  public OnSubmit(): void
  {
    this.api.autenticate(this.loginForm.value).subscribe(o => 
      {
        console.log(o.data);
        if(o.data !== undefined)
        {
          this.loginService.userId = o.data.toString();
          this.router.navigate(['main']);
        }
        else
        {
          this.badCredentials = true;
        }
      });
    

  }
}
