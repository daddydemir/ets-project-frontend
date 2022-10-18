import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElasticService } from 'src/app/services/elastic.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  form!: FormGroup;
  
  options = ["Istanbul","Izmir", "sivas","ankara","mardin"];

  filteredOptions = [""];
  constructor(
    private fb: FormBuilder,
    private service: ElasticService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      'employee': ['']
    });
    this.form.get('employee')?.valueChanges.subscribe(
      response => {
        console.log('data is ', response);
        this.filterData(response);
      }
    );
  }

  filterData(entered:any){
    this.filteredOptions = this.options.filter(
      item => {
        return item.toLowerCase().indexOf(entered.toLowerCase()) > -1;
      }
    );
  }
}
