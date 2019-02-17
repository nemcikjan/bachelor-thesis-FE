import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.scss']
})
export class ConfigDetailComponent implements OnInit {
  configForm = new FormGroup({
    timeInterval: new FormControl(''),
    password: new FormControl('')
  });
  constructor() {}

  ngOnInit() {}
}
