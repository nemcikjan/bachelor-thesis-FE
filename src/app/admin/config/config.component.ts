import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  configForm = new FormGroup({
    timeInterval: new FormControl(''),
    password: new FormControl('')
  });
  constructor() {}

  ngOnInit() {}
}
