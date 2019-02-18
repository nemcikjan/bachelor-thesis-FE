import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, tap, mergeMap } from 'rxjs/operators';
import { ConfigsService } from '../configs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-configs-list',
  templateUrl: './configs-list.component.html',
  styleUrls: ['./configs-list.component.scss']
})
export class ConfigsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private configsService: ConfigsService
  ) {}
  typeConfigs: Observable<any>;
  ngOnInit() {
    this.typeConfigs = this.route.queryParams.pipe(
      mergeMap(({ type }) => this.configsService.getConfigsByType(type)),
      tap(console.log)
    );
  }
}
