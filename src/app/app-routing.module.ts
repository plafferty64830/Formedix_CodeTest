import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './views/search/search.component';
import { ImgViewComponent } from './views/img-view/img-view.component';

const routes:Routes = [
  { path: '', redirectTo: '/search', pathMatch:'full' },
  { path: 'search', component: SearchComponent },
  { path: 'imgView', component: ImgViewComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }