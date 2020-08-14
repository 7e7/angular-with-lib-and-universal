import {
  Component,
  Input,
  HostListener,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { JbDialogHeaderComponent } from './jb-dialog-header/jb-dialog-header.component';
import { JbDialogContentComponent } from './jb-dialog-content/jb-dialog-content.component';
import { JbDialogActionsComponent } from './jb-dialog-actions/jb-dialog-actions.component';
import { JbDialogService } from './jb-dialog.service';
import { JbDialogVariantTypeEnum } from '../types/jb-dialog-variant-type.enum';
import { JbViewPortService } from '../jb-utils/services/viewport.service';

/**
 * Dialog Component
 * @example
 * <jb-dialog>
 *   <jb-dialog-content>
 *     Please check with your country's embassy to confirm their proof of travel requirements.
 *   </jb-dialog-content>
 *   <jb-dialog-actions>
 *     <button jbButton theme="primary" (click)="closeDialog()">Continue</button>
 *     <jb-dialog-cancel-button (click)="closeDialog()"> Cancel </jb-dialog-cancel-button>
 *   </jb-dialog-actions>
 * </jb-dialog>
 */
@Component({
  selector: 'jb-dialog',
  templateUrl: './jb-dialog.component.html',
  host: {
    class: 'jb-dialog',
  },
  styleUrls: ['./jb-dialog.component.scss'],
})
export class JbDialogComponent implements OnInit, AfterContentInit, OnDestroy {
  /** DIALOG TYPE Dialog type can be content, notification, or nutritional */
  @Input()
  dialogType: JbDialogVariantTypeEnum = JbDialogVariantTypeEnum.notification;
  @Input() disableCloseInteractions = false;

  // WIDTH INPUTS
  @Input() contentModalWidth = null;
  @Input() contentModalMaxWidth = null;

  @Output() onClose = new EventEmitter<any>();

  /** The header component. */
  @ContentChild(JbDialogHeaderComponent)
  header: JbDialogHeaderComponent;
  /** The content wrapper component. */
  @ContentChild(JbDialogContentComponent)
  content: JbDialogContentComponent;
  /** The action wrapper component, contains actions buttons. */
  @ContentChild(JbDialogActionsComponent)
  actions: JbDialogActionsComponent;

  isMobile: boolean;

  private isMobileSubscription: Subscription;

  constructor(
    public el: ElementRef,
    private dialogService: JbDialogService,
    private viewportService: JbViewPortService
  ) {}

  ngOnInit(): void {
    this.isMobileSubscription = this.viewportService
      .isMobile$()
      .subscribe((isMobileWidth) => (this.isMobile = isMobileWidth));
  }

  ngAfterContentInit(): void {
    if (this.header) {
      this.header.el.nativeElement
        .querySelector('button')
        .addEventListener('click', (event) => {
          this.handleCloseModal(event);
        });
    }

    if (this.actions) {
      if (this.dialogType === JbDialogVariantTypeEnum.notification) {
        this.verifyNotificationButtons();
      } else {
        // Setting `isRounded=false` causes ExpressionChangedAfterItHasBeenCheckedError if
        // there is an *ngIf on <jb-dialog-actions>, so we add a setTimeout to set it on another cycle
        setTimeout(() => {
          this.verifyContentButtons();
        });
      }
    }

    /*
      Content is always required for both variations of the modals. The title is only required
      on the content modal type, and last but not least, action buttons are required by the
      notification modal types.
    */
    if (!this.content) {
      console.warn('jb-dialog: Missing required jb-dialog-content component.');
    } else if (!this.header) {
      console.warn('jb-dialog: Missing required jb-dialog-header component.');
    } else if (!this.actions) {
      console.warn('jb-dialog: Missing required jb-dialog-actions component.');
    }
  }

  /** Clean up listeners. */
  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }

  /** Listens for a click event, if it happens outside the dialog box, it will close the modal */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (
      event.target === this.el.nativeElement.children[0] &&
      !this.disableCloseInteractions
    ) {
      this.handleCloseModal(event);
    }
  }

  /** Calls the dom service's to remove the component from the dom. */
  @HostListener('document:keydown.esc', ['$event'])
  handleEscapeEvent(event: KeyboardEvent): void {
    if (!this.disableCloseInteractions) {
      this.handleCloseModal(event);
    }
  }

  handleCloseModal(event: any): void {
    this.onClose.emit();
    this.dialogService.closeDialog();
  }

  /** Verifies the business requirements are met and applies extra styles to
   * the Notification/Warning modal's buttons.
   */
  private verifyNotificationButtons(): void {
    if (this.actions.actionButtons.length > 2) {
      console.warn(
        'jb-dialog-actions: Number of action buttons exceeded, please provide only two action buttons.'
      );
    } else if (this.actions.actionButtons.length === 0) {
      console.warn(
        'jb-dialog-actions: You must provide at least one action button.'
      );
    } else {
      this.actions.actionButtons.first.addClasses(['mb3', 'min-w-70']);
      if (this.actions.actionButtons.last) {
        this.actions.actionButtons.last.addClasses(['mb2', 'min-w-70']);
      }
    }
  }

  /** Verifies the business requirements are met and applies extra styles to the content modal's buttons. */
  private verifyContentButtons(): void {
    if (this.actions.actionButtons.length > 1) {
      console.warn(
        'jb-dialog-actions: You can only provide one action button for the content modal.'
      );
    }
    if (this.actions.actionButtons.length === 1) {
      this.actions.actionButtons.first.isRounded = false;
      this.actions.actionButtons.first.addClasses([
        'shadow-1',
        'w-100',
        'dn-ns',
      ]);
      this.actions.actionButtons.first.addAttribute('tabindex', '-1');
      this.actions.actionButtons.first.addAttribute('aria-hidden', 'true');
    }
  }
}
