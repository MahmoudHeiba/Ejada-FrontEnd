import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { SessionStorageService } from "./session-storage.service";
import { LoadingComponent } from "./components/loading/loading.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { NavSideComponent } from "../admin/component/nav-side/nav-side.component";
import { NavBarComponent } from "../admin/component/nav-bar/nav-bar.component";
import { MatCardModule } from '@angular/material/card';
import { DeleteDialogComponent } from "./components/delete/delete.dialog.component";
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const modules: any = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatSortModule,
  MatInputModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatDialogModule,
  MatTooltipModule,
  MatMenuModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatTreeModule,
  MatCheckboxModule,
  MatTabsModule,
  MatRadioModule,
  MatGridListModule
]

const components: any = [
  NavSideComponent,
  NavBarComponent,
  LoadingComponent,
  NotFoundComponent,
  DeleteDialogComponent,
];

const services = [
  SessionStorageService
];


@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        ...services,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    }
  }
}