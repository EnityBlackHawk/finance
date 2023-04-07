import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  version: String;

  constructor(
    private router: Router, 
    private api: ApiService, 
    private loginService: LoginServiceService
    )
  {
    this.loginForm = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl(''),
      });
    this.version = environment.version;
  }


  ngOnInit()
  {
    this.api.getStatus().subscribe(
      {
        next: (r) => 
        {
          this.apiStatus = r.report ? r.data : r.message;
        },
        error: (e) =>
        {
          console.log(e);
          this.apiStatus = "Failed (" + e.statusText + ")";
        }
      }
    )
  }

  public OnSubmit(): void
  {
    this.isLoading = true;
    this.api.autenticate(this.loginForm.value).subscribe((o) => 
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
