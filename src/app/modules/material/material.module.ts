
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatButtonModule, MatMenuModule, MatTabsModule  } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

const MATERIAL_MODULES = [
  MatSliderModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule, 
  MatSnackBarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  MatSlideToggleModule,
  FormsModule,
  NoopAnimationsModule,

  MatMenuModule,
  // MatButtonModule,
  // // MatButtonToggleModule,
  // MatCardModule,
  // // MatCheckboxModule,
  // MatChipsModule,
  // MatDialogModule,
  // // MatDividerModule,
  // // MatExpansionModule,
  // MatFormFieldModule,
  // // MatGridListModule,
  // MatIconModule,
  // MatInputModule,
  // MatMenuModule,
  // MatProgressBarModule,
  // MatRadioModule,
  // MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  // MatTableModule,
  MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES]
})
export class MaterialModule {}
