import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth';
import { Network, DataSet, Options } from 'vis';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { NodeData } from 'src/app/store/app.model';
import { map, mergeMap } from 'rxjs/operators';
import { AppService } from '../service/app.service';
import { SetData } from 'src/app/store/app.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  @ViewChild('network') networkElement: ElementRef;
  @Select(AppState.data$) data$: Observable<NodeData[]>;
  selectedNodeData: NodeData;

  constructor(
    private authService: AuthService,
    private store: Store,
    private appService: AppService
  ) {}

  ngOnInit() {
    // initial data load
    this.appService
      .getData()
      .pipe(mergeMap(data => this.store.dispatch(new SetData(data))))
      .subscribe();
    const network = this.initOverviewNodes();
  }

  onSubmit() {
    this.authService.logout().subscribe();
  }

  private initOverviewNodes() {
    const nodes = new DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
      { id: 6, label: 'Main', group: 'main' }
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 6, to: 1 },
      { from: 6, to: 2 },
      { from: 6, to: 4 },
      { from: 6, to: 5 },
      { from: 6, to: 3 }
    ]);

    const data = {
      nodes,
      edges
    };

    const options: Options = {
      width: '100%',
      height: '500px',
      physics: {
        enabled: false
      },
      interaction: {
        dragNodes: false,
        dragView: false
      },
      edges: {
        dashes: true
      },
      nodes: {
        shape: 'image',
        image: 'assets/images/arduino_nano.png'
      },
      groups: {
        main: {
          shape: 'image',
          image: 'assets/images/arduino_uno.png'
        }
      }
    };

    return new Network(this.networkElement.nativeElement, data, options);
  }

  selecetCurrent(nodeId: string) {
    this.store
      .selectOnce(AppState.getById$)
      .pipe(map(findFn => findFn(nodeId)))
      .subscribe({
        next: selectedData => (this.selectedNodeData = selectedData)
      });
  }
}
