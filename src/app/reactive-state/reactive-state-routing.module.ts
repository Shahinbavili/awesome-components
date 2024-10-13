import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CandidateListComponent} from "./components/candidate-list/candidate-list.component";

const routes: Routes = [
  {path: 'candidates', component: CandidateListComponent},
  {path: 'candidates/:id', component: CandidateListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'candidates'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule {
}
