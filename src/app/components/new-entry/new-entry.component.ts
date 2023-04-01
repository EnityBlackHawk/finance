import { Component, EventEmitter, Output } from '@angular/core';
import { CurrencyPipe, formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent {

  @Output() eventEmmiter: EventEmitter<any> = new EventEmitter();

  today: String;
  entryForm !: FormGroup;

  constructor(
    private currencyPipe: CurrencyPipe,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  )
  {
    let date = new Date;
    let temp = formatDate(date, "yyyy-MM-dd", "en-US", "-0300");
    console.log(temp);
    this.today = temp;

    this.entryForm = this.formBuilder.group(
      {
        date: [this.today],
        value: [''],
        description: [''],
        credit: ['']
      }
    );
    
    // this.entryForm.valueChanges.subscribe(form =>
    //   {
    //     if(form.value)
    //     {
    //       this.entryForm.patchValue(
    //         {
    //           value: this.currencyPipe.transform(form.value, "BRL", "symbol", '2.2-2', "pt-BR")
    //         }, {emitEvent: false}
    //       )
    //     }
    //   }
    //)

  }


  public OnEmmit(obj: any): void
  {
    this.eventEmmiter.emit(obj);
  }

  public OnSubmit(): void
  {
    this.entryForm.patchValue(
      {
        date: formatDate(this.entryForm.value.date, "yyyy-MM-ddTHH:mm:ss.SSSZZZZZ", "pt-BR", "-0300"),
        //value: this.entryForm.value.value.replace(',','.')
      }
    );
    console.log(this.entryForm.value);
    this.OnEmmit(this.entryForm.value);
  }


}
