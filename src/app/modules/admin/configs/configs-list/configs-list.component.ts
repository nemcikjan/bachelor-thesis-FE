import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tap, mergeMap, share, toArray, map } from 'rxjs/operators';
import { ConfigsService } from '../configs.service';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-configs-list',
  templateUrl: './configs-list.component.html',
  styleUrls: ['./configs-list.component.scss']
})
export class ConfigsListComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  type: string;
  constructor(
    private route: ActivatedRoute,
    private configsService: ConfigsService
  ) {}
  typeConfigs: any[];
  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.configsService.getConfigsByType(this.type).subscribe(configs => {
      this.typeConfigs = configs;
    });
  }

  addConfig() {}
}
