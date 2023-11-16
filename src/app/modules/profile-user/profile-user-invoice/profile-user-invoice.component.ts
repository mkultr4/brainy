import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-profile-user-invoice',
  templateUrl: './profile-user-invoice.component.html',
  styleUrls: ['./profile-user-invoice.component.scss']
})
export class ProfileUserInvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }

  download() {
   
    var data = [
      {
        name: "Test 1",
        age: 13,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
    ];
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      useBom: true,
      noDownload: true,
      headers: ["First Name", "Last Name", "ID"]
    };
    new Angular5Csv(data, 'filename');
    }
  
  @ViewChild('content') content: ElementRef;
  public downloadPDF(){ 
    let doc = new jsPDF();
    let specialElementHandlers ={
      '#editor':function(element,renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;
    console.log(content);
    doc.fromHTML(content.innerHTML,15,15,{
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('Billing_history.pdf');
  
  }

}
