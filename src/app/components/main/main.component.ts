import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ApiService } from 'src/app/services/api.service';
import { Entry } from 'src/app/Models/Entry';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  dataEntry: Entry[] = [];
  dataUser !: User;
  formShow: boolean = false;

  constructor(private api: ApiService, private router: Router, private loginService: LoginServiceService)
  {
  }

  ngOnInit()
  {
    let userId: string | null = null;

    // this.route.paramMap.subscribe(param =>
    // {
    //   userId = param.get("id");
    // });
    userId = this.loginService.userId;


    if(userId !== null && userId !== undefined)
    {
      this.api.getEntries(userId).subscribe(p =>
      {
        p.content.forEach(e =>
          {
            this.dataEntry.push(e);
            console.log(formatDate(e.date, "dd/MM/yyyy", "en-US", "-3"));
          });
      });
      
      

      this.api.getUser(userId).subscribe(p =>
        {
          p.content.forEach(e =>
            {
              this.dataUser = e;
            });
        });
    }

    else
    {
      this.router.navigate([""]);
    }

  }

  public ShowNew(): void
  {
    this.formShow = true;
  }

  public EventReceved(obj: any): void
  {
    this.api.save(obj, this.dataUser.id.toString()).subscribe(r =>
      {
        this.dataUser.value = r.user.value;
        this.dataEntry.push(r);
      });
    
    
    this.formShow = false;
  }

}
