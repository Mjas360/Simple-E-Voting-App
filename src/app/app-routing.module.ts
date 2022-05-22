import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo, } from '@angular/fire/auth-guard';

//send unauthoried user to login
const redirectLoggedInToLogin = () => redirectUnauthorizedTo(['/auth'])

//Authomatically log in users
const redirectLoggedInToHome = () => redirectLoggedInTo(['/folder/folder'])

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    ...canActivate(redirectLoggedInToLogin)
  },
  {
    path: 'chat-room',
    loadChildren: () => import('./chat-room/chat-room.module').then( m => m.ChatRoomPageModule),
    ...canActivate(redirectLoggedInToLogin)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    ...canActivate(redirectLoggedInToLogin)
  },
  {
    path: 'model',
    loadChildren: () => import('./model/model.module').then( m => m.ModelPageModule),
    ...canActivate(redirectLoggedInToLogin)
  },
  {
    path: 'tmodel',
    loadChildren: () => import('./tmodel/tmodel.module').then( m => m.TmodelPageModule),
    ...canActivate(redirectLoggedInToLogin)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule),
    ...canActivate(redirectLoggedInToLogin)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    ...canActivate(redirectLoggedInToLogin)
  },
  {
    path: 'pixmodel',
    loadChildren: () => import('./pixmodel/pixmodel.module').then( m => m.PixmodelPageModule),
    ...canActivate(redirectLoggedInToLogin)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
