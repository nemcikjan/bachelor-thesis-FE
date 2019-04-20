import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  ViewContainerRef,
  ViewChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import {
  tap,
  mergeMap,
  share,
  toArray,
  map,
  startWith,
  filter,
  takeUntil
} from 'rxjs/operators';
import { ConfigsService } from '../configs.service';
import { Observable, of, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigItem } from '../../interfaces/configs.interface';
import { TextMaskConfig } from 'angular2-text-mask';

import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatPaginator, MatTableDataSource } from '@angular/material';
const macAddrCharRegex = /[a-fA-F0-9]/;
const maskConfig: TextMaskConfig = {
  mask: [
    ...[...Array(5).fill(null)].reduce(
      prev => [...prev, ...[macAddrCharRegex, macAddrCharRegex, ':']],
      []
    ),
    ...[macAddrCharRegex, macAddrCharRegex]
  ],
  guide: true,
  placeholderChar: 'x'
};

const nodeFormInit = type => ({
  nodeType: { value: type, disabled: true }
});

const confFormInit = type => ({
  nodeType: { value: type, disabled: true }
});

@Component({
  selector: 'app-configs-list',
  templateUrl: './configs-list.component.html',
  styleUrls: ['./configs-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ConfigsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nodeId', 'nodeType', 'interval', 'createdAt'];
  configForm: FormGroup;
  nodeForm: FormGroup;
  type: string;
  add = false;
  node = false;
  configs: ConfigItem[] = [];
  nodes: any[];
  textMask = maskConfig;
  expandedElement: ConfigItem | null;
  expandedElementHistory = new MatTableDataSource<ConfigItem>([]);
  showHistorySpinner = true;
  private changeSubject = new Subject();
  private changeSubject$ = this.changeSubject.asObservable();
  private destroySubject$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private configsService: ConfigsService
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.configForm = new FormGroup({
      nodeType: new FormControl({ value: this.type, disabled: true }, [
        Validators.required
      ]),
      interval: new FormControl(null, [Validators.required, Validators.min(1)]),
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

    this.changeSubject$
      .pipe(
        mergeMap(() => this.configsService.getConfigsByType(this.type)),
        takeUntil(this.destroySubject$)
      )
      .subscribe({
        next: configs => (this.configs = configs)
      });
  }

  addConfig() {
    const value = {
      nodeType: this.type,
      ...this.configForm.value
    };
    this.configsService.insertConfig(value).subscribe({
      next: () => {
        this.changeSubject.next();
        this.add = false;
        this.configForm.reset(confFormInit(this.type));
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
          this.nodeForm.reset(nodeFormInit(this.type));
        }
      });
  }

  expandedElementChange() {
    this.expandedElementHistory.data = [];
    of(this.expandedElement)
      .pipe(
        tap(e => {
          if (!!!e) {
            this.expandedElementHistory.data = [];
          }
        }),
        filter(elem => !!elem),
        tap(() => (this.showHistorySpinner = true)),
        map(e => this.nodes.find(n => n.nodeId === e.nodeId).id as string),
        mergeMap(e => this.configsService.getNodeConfigs(e)),
        takeUntil(this.destroySubject$)
      )
      .subscribe(res => {
        res = res.filter(e => !!Object.keys(e).length);
        this.expandedElementHistory.data = res;
        this.showHistorySpinner = false;
      });
  }

  useConfig(objectId: string) {
    this.configsService.updateCurrentConfig(objectId).subscribe({
      next: () => this.changeSubject.next()
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }
}
