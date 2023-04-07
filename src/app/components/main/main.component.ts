import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ApiService } from 'src/app/services/api.service';
import { Entry } from 'src/app/Models/Entry';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './main.component.media.css']
})
export class MainComponent {
  userToken !: String;
  dataEntry: Entry[] = [];
  dataUser !: User;
  formShow: boolean = false;
  isLoading: boolean = true;

  constructor(private api: ApiService, private router: Router, private loginService: LoginServiceService)
  {
    if(this.loginService.userId === null || this.loginService.userId === undefined)
    {
      let savedToken = localStorage.getItem("main.userToken");
      this.userToken = savedToken !== null ? savedToken : "";
    }
    else
    {
      this.userToken = this.loginService.userId;
      localStorage.setItem("main.userToken", this.userToken.toString());
    }

    this.api.getEntries(this.userToken).subscribe(
      {
        next: (r) => {
          if(r.report == 0)
          {
            r.data.content.forEach(e =>
            {
              this.dataEntry.push(e);
            });
            this.isLoading = false;
          }
          else if(r.report == 1)
          {
            console.log("Token invalido");
          }
        },
      }
    )
    
    if(this.dataEntry[0] !== undefined && this.dataEntry[0] !== null)
    {
      this.dataUser = this.dataEntry[0].user;
    }
    else
    {
      this.api.getUser(this.userToken.toString()).subscribe(p =>
        {
          p.data.content.forEach(e =>
            {
              this.dataUser = e;
            });
        });
    }

    
  }

  ngOnInit()
  {
  }

  public ShowNew(): void
  {
    this.formShow = true;
  }

  public EventReceved(obj: any): void
  {
    this.isLoading = true;
    if(obj !== null && obj !== undefined)
    {
      this.api.save(obj, this.userToken.toString()).subscribe(r =>
      {
        this.dataUser.value = r.data.user.value;
        this.dataEntry.push(r.data);
        this.isLoading = false;
      });
    }
    else
    {
      this.isLoading = false;
    }
  
    this.formShow = false;
  }

  public RemoveEntry(id: String): void
  {
    this.isLoading = true;
    this.api.deleteEntry(id, this.userToken.toString()).subscribe(r => 
    {
      if(r.report == 0)
      {
        this.dataUser = r.data;
        // TODO: Remove this request
      //   this.api.getEntries(this.userToken.toString()).subscribe(r => 
      //   {
      //     if(r.report === 0)
      //     {
      //       r.data.content.forEach(e => 
      //       {
      //         this.dataEntry.push(e);
      //       });
      //     }
      //     else
      //     {
      //       console.log("Error: " + r.report + "(" + r.message + ")" );
      //     }
      //     this.isLoading = false;s
      //   })
        this.dataEntry.forEach((e, index) => 
        {
          if(e.id == id)
            this.dataEntry.splice(index, 1);
            this.isLoading = false;
            return;
        });
      }
      else
      {
        this.isLoading = false;
        console.log("Error: " + r.report + "(" + r.message + ")" );
      }
    });
  }
}
