import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderPipe } from './table-header.pipe';

@NgModule({
  declarations: [TableHeaderPipe],
  imports: [CommonModule],
  exports: [TableHeaderPipe]
})
export class SharedModule {}
