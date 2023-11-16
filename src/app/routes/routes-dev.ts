import { Routes } from '@angular/router';
import { LoginGuardService as LoginGuard } from '../services/auth/login-guard.service';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuardService as AuthGuard } from '../services/auth/auth-guard.service';

export const appRoutingDev: Routes = [
    // Default
    { path: '', component: HomeComponent},
    // Public
    { path: 'public', loadChildren: '../app/modules/public/public.module#PublicModule', canActivate: [LoginGuard] },
    // Private
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            // Workspaces
            { path: 'workspaces', loadChildren: '../app/modules/workspaces/workspaces.module#WorkspacesModule' },
            // Dashboard
            { path: 'dashboard', loadChildren: '../app/modules/dashboard/dashboard.module#DashboardModule' },
            // Brands
            { path: 'brands', loadChildren: '../app/modules/brands/brands.module#BrandsModule' },
            // Brand Profile
            { path: 'brands/:id', loadChildren: '../app/modules/brand-profile/brand-profile.module#BrandProfileModule' },
            // Feedback Close
            {
                path: 'feedback/close/:id',
                loadChildren: '../app/modules/feedback-close/feedback-close.module#FeedbackCloseModule'
            },
            // Feedback
            { path: 'feedback', loadChildren: '../app/modules/feedback/feedback.module#FeedbackModule' },
            // Meeting Note Close
            {
                path: 'meeting-note/close/:id',
                loadChildren: '../app/modules/meeting-note-close/meeting-note-close.module#MeetingNoteCloseModule'
            },
            // Meeting Note
            { path: 'meeting-note', loadChildren: '../app/modules/meeting-note/meeting-note.module#MeetingNoteModule' },
            // Brief templates
            { path: 'brief-templates', loadChildren: '../app/modules/brief-template/brief-template.module#BriefTemplateModule' },
            // Brief close
            {
                path: 'brief/close/:id',
                loadChildren: '../app/modules/brief-close/brief-close.module#BriefCloseModule'
            },
            // Brief presentation
            {
                path: 'brief/presentation', 
                loadChildren: '../app/modules/brief-presentation/brief-presentation.module#BriefPresentationModule',
            },
            // Brief
            { path: 'brief', loadChildren: '../app/modules/brief/brief.module#BriefModule' },
            // Team
            { path: 'team', loadChildren: '../app/modules/team/team.module#TeamModule' },
            // Profile user
            { path: 'profile/user', loadChildren: '../app/modules/profile-user/profile-user.module#ProfileUserModule' },
            // Profile
            { path: 'profile/:id', loadChildren: '../app/modules/profile/profile.module#ProfileModule' },
            // Profile invitation
            {
                path: 'profile-invitation/:id',
                loadChildren: '../app/modules/profile-invitation/profile-invitation.module#ProfileInvitationModule'
            },
        ]
    },
    // Errors
    { path: 'error', loadChildren: '../app/modules/error/error.module#ErrorModule' },
    // Default
    { path: '**', component: HomeComponent},

];
