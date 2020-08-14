import { Component, OnInit, Input } from '@angular/core';
import { JbViewPortService } from '../../../jb-utils/services/viewport.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jb-filters-collapsible',
  templateUrl: './jb-filters-collapsible.component.html',
})
export class JbFiltersCollapsibleComponent implements OnInit {
  @Input() drawerName = 'filters';
  isMobile$ = new Observable();

  constructor(private viewportService: JbViewPortService) {}

  ngOnInit(): void {
    this.isMobile$ = this.viewportService.isMobile$();
  }
}
