import { Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { guestGuard } from './guards/guest.guard';
import { InterestsComponent } from './pages/interests/interests.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyMatchesComponent } from './pages/my-matches/my-matches.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'interests',
    component: InterestsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'me',
    component: MyProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'matches',
    component: MyMatchesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'lists',
    component: ListComponent,
    canActivate: [authGuard],
  }
];
