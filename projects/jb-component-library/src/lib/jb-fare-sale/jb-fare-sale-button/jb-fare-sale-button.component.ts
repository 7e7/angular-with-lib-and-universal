import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JbRevenue } from '../../types/jb-revenue.type';
import { JbFareSale } from '../../types/jb-fare-sale.type';

@Component({
  selector: 'jb-fare-sale-button',
  templateUrl: './jb-fare-sale-button.component.html',
  styleUrls: ['./jb-fare-sale-button.component.scss'],
  host: { class: 'dib' },
})
export class JbFareSaleButtonComponent {
  @Input() variant: JbFareSale = 'flight';
  @Input() revenueType: JbRevenue = 'price';
  @Input() value = '';
  @Input() available = true;
  @Input() clickable = true;
  @Input() target = '_self';
  @Input() href: string;
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
  @Output() click = new EventEmitter<void>();
}
