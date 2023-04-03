import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  badCredentials : boolean = false;
  apiStatus !: String;
  isLoading: boolean = false;

  constructor(private router: Router, private api: ApiService, private loginService: LoginServiceService)
  {
    this.loginForm = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl(''),
      });
  }


  ngOnInit()
  {
    console.log("IsProduction: ", environment.production);
    this.api.getStatus().subscribe(r =>
      {
        this.apiStatus = r.report ? r.data : r.message;
      })
  }

  public OnSubmit(): void
  {
    this.isLoading = true;
    this.api.autenticate(this.loginForm.value).subscribe(o => 
      {
        if(o.report === 0)
        {
          this.loginService.userId = o.data.toString();
          this.router.navigate(['main']);
        }
        else
        {
          console.log(o.message);
          this.badCredentials = true;
          this.isLoading = false;
        }
      });

  }
}
