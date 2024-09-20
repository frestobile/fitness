import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'coach-profile',
        loadChildren: () => import('../../pages/coach-profile/coach-profile.module').then( m => m.CoachProfilePageModule)
      },
      {
        path: 'coach-profile/:id',
        loadChildren: () => import('../../pages/coach-profile/coach-profile.module').then( m => m.CoachProfilePageModule)
      },
      {
        path: 'programmes',
        loadChildren: () => import('../../pages/programme/programme.module').then( m => m.ProgrammePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../../pages/account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'account/statistics',
        loadChildren: () => import('../../pages/statistics/statistics.module').then( m => m.StatisticsPageModule)
      },
      {
        path: 'account/my-programs',
        loadChildren: () => import('../../pages/my-programs/my-programs.module').then( m => m.MyProgramsPageModule)
      },
      {
        path: 'account/my-program-detail/:id',
        loadChildren: () => import('../../pages/my-program-detail/my-program-detail.module').then(m=>m.MyProgramDetailPageModule),
      },
      {
        path: 'account/create-program',
        loadChildren: () => import('../../pages/create-program/create-program.module').then( m => m.CreateSessionPageModule)
      },
      {
        path: 'account/update-program/:id',
        loadChildren: () => import('../../pages/update-program/update-program.module').then( m => m.UpdateProgramPageModule)
      },
      {
        path: 'account/my-sessions',
        loadChildren: () => import('../../pages/my-sessions/my-sessions.module').then( m => m.MyBootcampsPageModule)
      },
      {
        path: 'account/my-session-detail/:id',
        loadChildren: () => import('../../pages/my-session-detail/my-session-detail.module').then(m=>m.MySessionnDetailPageModule),
      },
      {
        path: 'account/create-session',
        loadChildren: () => import('../../pages/create-session/create-session.module').then( m => m.CreateSessionPageModule)
      },
      {
        path: 'account/update-session/:id',
        loadChildren: () => import('../../pages/update-session/update-session.module').then( m => m.UpdateSessionPageModule)
      },
      {
        path: 'details-session/:id',
        loadChildren: () => import('../../pages/details-session/details-session.module').then( m => m.DetailsSessionPageModule)
      },
      {
        path: 'details-program/:id',
        loadChildren: () => import('../../pages/details-program/details-program.module').then( m => m.DetailsProgramPageModule)
      },
      {
        path: 'account/settings',
        loadChildren: () => import('../../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'account/change-language',
        loadChildren: () => import('../../pages/change-language/change-language.module').then( m => m.ChangeLanguagePageModule)
      },
      {
        path: 'account/infos-personnel',
        loadChildren: () => import('../../pages/infos-personnel/infos-personnel.module').then( m => m.InfosPersonnelPageModule)
      },
      {
        path: 'account/faq',
        loadChildren: () => import('../../pages/faq/faq.module').then( m => m.FaqPageModule)
      },
      {
        path: 'messagerie',
        loadChildren: () => import('../../pages/messagerie/messagerie.module').then( m => m.MessageriePageModule)
      },
      {
        path: 'chat/:id',
        loadChildren: () => import('../../pages/chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'account/my-purchase',
        loadChildren: () => import('../../pages/my-purchase/my-purchase.module').then(m=>m.MyPurchasePageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../../pages/notifications/notifications.module').then(m=>m.NotoficationsPageModule)
      },
      {
        path: 'notification-detail/:id',
        loadChildren: () => import('../../pages/notification-detail/notification-detail.module').then(m=>m.NotificationDetailPageModule)
      },
      {
        path: 'session-detail/:id',
        loadChildren: () => import('../../pages/session-detail/session-detail.module').then(m=>m.SessionnDetailPageModule),
      },
      {
        path: 'program-detail/:id',
        loadChildren: () => import('../../pages/program-detail/program-detail.module').then(m=>m.ProgramDetailPageModule),
      },
      {
        path: 'log-book',
        loadChildren: () => import('../../pages/log-book/log-book.module').then( m => m.LogBookPageModule)
      },
      {
        path: 'details-logbook',
        loadChildren: () => import('../../pages/details-logbook/details-logbook.module').then( m => m.DetailsLogbookPageModule)
      },
      {
        path: 'exercise',
        loadChildren: () => import('../../pages/exercise/exercise.module').then(m=>m.ExercisePageModule),
      },
      {
        path: 'training',
        loadChildren: () => import('../../pages/training/training.module').then(m=>m.TrainingPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
