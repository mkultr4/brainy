import { NgModule } from '@angular/core';
import { BriefPresentationRoutingModule } from './brief-presentation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { BriefPresentationContentComponent } from './brief-presentation-content/brief-presentation-content.component';
import { BriefPresentationCreateComponent } from './brief-presentation-create/brief-presentation-create.component';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { BriefPresentationHeaderComponent } from './brief-presentation-header/brief-presentation-header.component';
import { ModalNewBriefPresentationComponent } from './modal-new-brief-presentation/modal-new-brief-presentation.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';
import { FloatingNoteModule } from '../floating-note/floating-note.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { BriefPresentationLeftSidenavComponent } from './brief-presentation-left-sidenav/brief-presentation-left-sidenav.component';
import { BriefPresentationSlideSidenavComponent } from './brief-presentation-slide-sidenav/brief-presentation-slide-sidenav.component';
import { BriefPresentationSlideComponent } from './brief-presentation-slide/brief-presentation-slide.component';
import { BriefPresentationToolbarComponent } from './brief-presentation-toolbar/brief-presentation-toolbar.component';
import { BriefPresentationElementComponent } from './brief-presentation-slide/brief-presentation-element/brief-presentation-element.component';
import { SlideTextComponent } from './brief-presentation-slide/slide-text/slide-text.component';
import { SlideLogoComponent } from './brief-presentation-slide/slide-logo/slide-logo.component';
import { SlideImageComponent } from './brief-presentation-slide/slide-image/slide-image.component';
import { SlideImageSidenavComponent } from './brief-presentation-slide-sidenav/slide-image-sidenav/slide-image-sidenav.component';
import { SlideLogoSidenavComponent } from './brief-presentation-slide-sidenav/slide-logo-sidenav/slide-logo-sidenav.component';
import { SlideTextSidenavComponent } from './brief-presentation-slide-sidenav/slide-text-sidenav/slide-text-sidenav.component';
import { SlideShapeComponent } from './brief-presentation-slide/slide-shape/slide-shape.component';
import { SlideShapeSidenavComponent } from './brief-presentation-slide-sidenav/slide-shape-sidenav/slide-shape-sidenav.component';
import { ElementDropdownColorsComponent } from './brief-presentation-toolbar/element-dropdown-colors/element-dropdown-colors.component';
import { ElementDropdownFontSizeComponent } from './brief-presentation-toolbar/element-dropdown-font-size/element-dropdown-font-size.component';
import { BriefPresentationToolbarMainComponent } from './brief-presentation-toolbar-main/brief-presentation-toolbar-main.component';
import { BriefPresentationSlideHeaderComponent } from './brief-presentation-slide-header/brief-presentation-slide-header.component';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
  imports: [
    SharedModule,
    SharedModalModule,
    SharedComponentsModule,
    SharedCoreModule,
    SharedParticipantsModule,
    CommentThreadModule,
    FloatingNoteModule,
    BriefPresentationRoutingModule,
    SortablejsModule
  ],
  providers:[
    InvitationStrategyService
  ],
  declarations: [
    BriefPresentationContentComponent,
    BriefPresentationCreateComponent,
    ModalNewBriefPresentationComponent,
    BriefPresentationHeaderComponent,
    // Main toolbar
    BriefPresentationToolbarMainComponent,
    BriefPresentationLeftSidenavComponent,
    BriefPresentationSlideSidenavComponent,
    // Main
    BriefPresentationSlideHeaderComponent,
    BriefPresentationSlideComponent,
    BriefPresentationToolbarComponent,
    ElementDropdownColorsComponent,
    ElementDropdownFontSizeComponent,
    // Elements
    BriefPresentationElementComponent,
    SlideTextComponent,
    SlideLogoComponent,
    SlideImageComponent,
    SlideShapeComponent,
    // Elements sidenav
    SlideImageSidenavComponent,
    SlideLogoSidenavComponent,
    SlideTextSidenavComponent,
    SlideShapeSidenavComponent
  ]
})
export class BriefPresentationModule { }
