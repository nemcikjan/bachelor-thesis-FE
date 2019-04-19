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
  form: FormGroup;
  type: string;
  add = false;
  constructor(
    private route: ActivatedRoute,
    private configsService: ConfigsService
  ) {}
  configs: any[];
  nodes: any[];
  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.form = new FormGroup({
      nodeType: new FormControl({ value: this.type, disabled: true }, [
        Validators.required
      ]),
      interval: new FormControl({ hour: 0, minute: 1 }, [Validators.required]),
      nodeId: new FormControl(null, [Validators.required])
    });
    this.configsService
      .getConfigsListData(this.type)
      .subscribe(({ configs, nodes }) => {
        this.configs = configs;
        this.nodes = nodes;
      });
  }

  addConfig() {
    const { interval, ...rest } = this.form.value;
    const c = val => (val < 10 ? '0' + val : '' + val);
    const value = {
      ...rest,
      nodeType: this.type,
      interval: `${c(interval.hour)}-${c(interval.minute)}`
    };
    this.configsService.insertConfig(value).subscribe();
  }

  addNode() {}

  submitMethod() {}
}
