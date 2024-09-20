import { UpdateSessionPage } from './pages/update-session/update-session.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'walkthrough',
    loadChildren: () => import('./pages/walkthrough/walkthrough.module').then( m => m.WalkthroughPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'synchronized',
    loadChildren: () => import('./pages/synchronized/synchronized.module').then( m => m.SynchronizedPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login-email',
    loadChildren: () => import('./pages/login-email/login-email.module').then( m => m.LoginEmailPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./pages/preferences/preferences.module').then( m => m.PreferencesPageModule)
  },
  {
    path: 'infos-personnel',
    loadChildren: () => import('./pages/infos-personnel/infos-personnel.module').then( m => m.InfosPersonnelPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'programme-result', // coach search result
    loadChildren: () => import('./pages/programme-result/programme-result.module').then( m => m.ProgrammeResultPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'pay-form',
    loadChildren: () => import('./pages/pay-form/pay-form.module').then( m => m.PayFormPageModule)
  },
  {
    path: 'exos-cible',
    loadChildren: () => import('./pages/exos-cible/exos-cible.module').then( m => m.ExosCiblePageModule)
  },
  {
    path: 'exercise', // exercise list page
    loadChildren: () => import('./pages/exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'update-session/:id',
    loadChildren: () => import('./pages/update-session/update-session.module').then( m => m.UpdateSessionPageModule)
  },
  {
    path: 'import-health-data',
    loadChildren: () => import('./pages/import-health-data/import-health-data.module').then( m => m.ImportHealthDataPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./pages/subscribe/subscribe.module').then( m => m.SubscribePageModule)
  },
  {
    path: 'success-payment',
    loadChildren: () => import('./pages/success-payment/success-payment.module').then( m => m.SuccessPaymentPageModule)
  },
  {
    path: 'adverts', // advertise page
    loadChildren: () => import('./pages/adverts/adverts.module').then( m => m.AdvertsPageModule)
  },
  {
    path: 'historic-sub',
    loadChildren: () => import('./pages/historic-sub/historic-sub.module').then( m => m.HistoricSubPageModule)
  },
  {
    path: 'success-pub',
    loadChildren: () => import('./pages/success-pub/success-pub.module').then( m => m.SuccessPubPageModule)
  },
  {
    path: 'success-order',
    loadChildren: () => import('./pages/success-order/success-order.module').then( m => m.SuccessOrderPageModule)
  },
  {
    path: 'my-programs',
    loadChildren: () => import('./pages/my-programs/my-programs.module').then( m => m.MyProgramsPageModule)
  },
  {
    path: 'show-programmes',
    loadChildren: () => import('./pages/show-programmes/show-programmes.module').then( m => m.ShowProgrammesPageModule)
  },
  {
    path: 'coaching-programmes',
    loadChildren: () => import('./pages/coaching-programmes/coaching-programmes.module').then( m => m.CoachingProgrammesPageModule)
  },
  {
    path: 'success-session',
    loadChildren: () => import('./pages/success-session/success-session.module').then( m => m.SuccessSessionPageModule)
  },
  {
    path: 'my-purchase',
    loadChildren: () => import('./pages/my-purchase/my-purchase.module').then(m=>m.MyPurchasePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m=>m.NotoficationsPageModule)
  },
  {
    path: 'notification-detail',
    loadChildren: () => import('./pages/notification-detail/notification-detail.module').then(m=>m.NotificationDetailPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
