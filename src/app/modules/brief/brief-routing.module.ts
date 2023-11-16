import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BriefCreateComponent } from './brief-create/brief-create.component';
import { BriefContentComponent } from './brief-content/brief-content.component';
import { BriefTemplateContentComponent } from './brief-template-content/brief-template-content.component';
import { BriefCreateTemplateComponent } from './brief-create-template/brief-create-template.component';
import { BriefTemplatePitchComponent } from './brief-template-pitch/brief-template-pitch.component';
import { BriefPitchContentComponent } from './brief-pitch-content/brief-pitch-content.component';
import { BriefEditTemplateComponent } from './brief-edit-template/brief-edit-template.component';

const routes: Routes = [

  { path: 'project', component: BriefCreateComponent },
  { path: 'template', component: BriefCreateTemplateComponent },
  { path: 'edit/template/:id', component: BriefEditTemplateComponent },
  { path: 'project/:id', component: BriefContentComponent },
  { path: 'project/pitch/:id', component: BriefPitchContentComponent },
  { path: 'template/:id', component: BriefTemplateContentComponent },
  { path: 'template-pitch/:id', component: BriefTemplatePitchComponent },
  { path: '**', redirectTo: 'template' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BriefRoutingModule { }
