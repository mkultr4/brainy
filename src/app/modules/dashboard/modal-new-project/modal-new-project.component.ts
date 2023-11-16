import { Component, OnInit, Input, Renderer } from '@angular/core';
import { trigger, state, style, useAnimation, transition, animate, query, stagger } from '@angular/animations';
import { fadeAnimation } from '../../../app.animations';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Router } from '@angular/router';
import { RolService } from '../../../services/roles/rol.service';

@Component({
  selector: 'app-modal-new-project',
  templateUrl: './modal-new-project.component.html',
  styleUrls: ['./modal-new-project.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('*', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => void', [
        useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '300ms 300ms' } }),
      ]),
      transition('void => *', [
        useAnimation(fadeAnimation, { params: { from: 0, to: 1, time: '300ms' } }),
      ])
    ]),
    trigger('chooserProjectAnimation', [
      state('void', style({ display: 'none' })),
      state('product', style({ display: 'block' })),
      // Enter
      transition('void => product', [
        style({ display: 'block' }),
        query('.chooser-project,.modal-header', style({ opacity: 0, transform: 'translateY(200px)' })),
        query('.chooser-project,.modal-header', stagger('100ms', [
          animate('200ms ease-out', style({
            opacity: 1,
            transform: 'translateY(0)'
          })),
        ]))
      ]),
      transition('new-draft => product', [
        query('.chooser-project,.modal-header', style({ opacity: 0, transform: 'translateY(200px)' })),
        query('.chooser-project,.modal-header', stagger('100ms', [
          animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]))

      ]),
      // Hide
      transition('product=> *', [
        query('.chooser-project,.modal-header', stagger('-100ms', [
          animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(200px)' })),
        ]))

      ]),

    ]),
    trigger('newDraftAnimation', [

      transition('* => void', [
        query('.modal-content-display,.modal-header', style({ opacity: 1, transform: 'translateY(0)' })),
        query('.modal-content-display,.modal-header', stagger('-150ms', [
          animate('250ms ease-out', style({ opacity: 0, transform: 'translateY(200px)' })),
        ])),
      ]),
      transition('void => *', [
        query('.modal-content-display,.modal-header', style({ opacity: 0, transform: 'translateY(200px)' })),
        animate('600ms ease-out'),
        query('.modal-content-display,.modal-header', stagger('150ms', [
          animate('250ms  ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]))
      ])
    ]),
    trigger('newFeedAnimation', [

      transition('* => void', [
        query('.modal-content-display,.modal-header', style({ opacity: 1, transform: 'translateY(0)' })),
        query('.modal-content-display,.modal-header', stagger('-150ms', [
          animate('250ms ease-out', style({ opacity: 0, transform: 'translateY(200px)' })),
        ])),
      ]),
      transition('void => *', [
        query('.modal-content-display,.modal-header', style({ opacity: 0, transform: 'translateY(200px)' })),
        animate('600ms ease-out'),
        query('.modal-content-display,.modal-header', stagger('150ms', [
          animate('250ms  ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]))
      ])
    ])
  ]
})
export class ModalNewProjectComponent implements OnInit {
  public visible = false;
  public mouseOverBrief = false;
  public mouseOverFeed = false;
  public mouseOverDraftboolean = false;
  public stateModal = 'void';
  public isShowCreateDraft = false;
  public fadeInState: string;
  public showBack = false;
  public tour = false;
  // Inputs
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() currentUser: User;
  @Input() briefTemplateTour = false;
  constructor(
    private renderer: Renderer,
    private router: Router
  ) {

  }

  ngOnInit() {
  }


  showModal() {
    this.renderer.setElementClass(document.body, 'overflow-hidden', true);
    this.visible = true;
    setTimeout(() => {
      this.stateModal = 'product';
    }, 100);
  }
  closeModal(create?: string) {
    
    this.stateModal = 'void';
    this.isShowCreateDraft = false;
    setTimeout(() => {
      this.renderer.setElementClass(document.body, 'overflow-hidden', false);
      this.visible = false;
      this.showBack = false;
      if (create) {
        if (create === 'feedback') {
  
          this.router.navigate(['/feedback']);
        }
        if (create === 'meeting-note') {
          this.router.navigate(['/meeting-note']);
        }
  
        if (create === 'brief') {
          this.router.navigate(['/brief-templates'],{queryParams:{tour:this.briefTemplateTour}});
          /* if (RolService.isAdminRol(this.workspaceAccess.rol.key)) {
            this.router.navigate(['/brief/template']);
          } else {
            this.router.navigate(['/brief/template/libraries']);
          }*/
        }
      }

    }, 400);



  }
  back() {
    this.stateModal = 'void';
    this.showBack = false;
    setTimeout(() => {
      this.stateModal = 'choose-product';
    }, 500);

  }
  createMettingNote() {

    this.closeModal('meeting-note');
  }
  createFeedback() {
    this.closeModal('feedback');
  }
  createBrief() {
    this.closeModal('brief');
  }

}
