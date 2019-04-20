import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatIconRegistry
} from '@angular/material';
import { SettingsService } from '../settings.service';
import { Log, LogStateEnum } from '../../interfaces/logs.interface';
import {
  animate,
  trigger,
  state,
  style,
  transition
} from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-settings-overview',
  templateUrl: './settings-overview.component.html',
  styleUrls: ['./settings-overview.component.scss']
})
export class SettingsOverviewComponent implements OnInit {
  displayedColumns: string[] = [
    'hash',
    'topic',
    'state',
    'status',
    'err',
    'timestamp'
  ];
  dataSource = new MatTableDataSource<Log>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'pending',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/baseline-hourglass_empty-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'errored',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/baseline-error_outline-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'successful',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/baseline-check_circle_outline-24px.svg'
      )
    );
  }

  ngOnInit() {
    this.settingsService.getLogs().subscribe({
      next: logs => {
        this.dataSource.data = [...logs];
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  getIcon(state: LogStateEnum) {
    switch (state) {
      case LogStateEnum.PENDING:
        return 'pending';
      case LogStateEnum.ERRORED:
        return 'errored';
      case LogStateEnum.SUCCESSFUL:
        return 'successful';
      default:
        break;
    }
  }
}
