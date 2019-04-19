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
  configForm: FormGroup;
  nodeForm: FormGroup;
  type: string;
  add = false;
  node = false;
  constructor(
    private route: ActivatedRoute,
    private configsService: ConfigsService
  ) {}
  configs: any[];
  nodes: any[];
  textMask = {
    mask: [
      ...[...Array(5).fill(null)].reduce(
        prev => [...prev, ...[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, ':']],
        []
      ),
      ...[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/]
    ],
    guide: true,
    placeholderChar: 'x'
  };
  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.configForm = new FormGroup({
      nodeType: new FormControl({ value: this.type, disabled: true }, [
        Validators.required
      ]),
      interval: new FormControl({ hour: 0, minute: 1 }, [Validators.required]),
      nodeId: new FormControl(null, [Validators.required])
    });

    this.nodeForm = new FormGroup({
      nodeType: new FormControl({ value: this.type, disabled: true }, [
        Validators.required
      ]),
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
    const { interval, nodeId } = this.configForm.value;
    const c = val => (val < 10 ? '0' + val : '' + val);
    const value = {
      nodeId,
      nodeType: this.type,
      interval: `${c(interval.hour)}-${c(interval.minute)}`
    };
    this.configsService
      .insertConfig(value)
      .pipe(mergeMap(() => this.configsService.getConfigsByType(this.type)))
      .subscribe({
        next: configs => {
          this.configs = configs;
          this.add = false;
          this.configForm.reset();
        }
      });
  }

  addNode() {
    const node = { ...this.nodeForm.value, nodeType: this.type };
    this.configsService
      .insertNode(node)
      .pipe(mergeMap(() => this.configsService.getAllNodes(this.type)))
      .subscribe({
        next: nodes => {
          this.nodes = nodes;
          this.node = false;
          this.nodeForm.reset();
        }
      });
  }

  submitMethod() {}
}
