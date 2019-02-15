import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth';
import { Network, DataSet, Options } from 'vis';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('network') networkElement: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const nodes = new DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
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
      }
    };

    const network = new Network(
      this.networkElement.nativeElement,
      data,
      options
    );
  }

  onSubmit() {
    this.authService.logout().subscribe();
  }
}
