import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, ViewChild, Input, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [];
  @Input() isLoading = false;
  @Input() generalConfig: {};
  @Input() clickFunctionAction: any;
  @Input() configColumns: [];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Input() dataSource: MatTableDataSource<any>;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuggest: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.configColumns.forEach(element => {
      // tslint:disable-next-line: no-string-literal
      this.displayedColumns.push(element['value']);
    });
  }

  ngAfterViewInit() {
    this.paginatorFun();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  paginatorFun() {
    if (typeof this.dataSource !== 'undefined') {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    }
  }

  clickAction(item, action): void {
    this.onSuggest.emit([item, action]);
  }

}
