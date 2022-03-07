import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { filter } from 'rxjs';
import { CoordsService } from '../map/coords.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';


@Component({
  selector: 'app-coord-form',
  templateUrl: './coord-form.component.html',
  styleUrls: ['./coord-form.component.css']
})
export class CoordFormComponent implements OnInit {

  @Output() coordSubmit = new EventEmitter()


  coordForm = this.fb.group({
    latitude: ['', [
      Validators.required,
      Validators.min(-90),
      Validators.max(90)
    ]],
    longitude: ['', [
      Validators.required,
      Validators.min(-180),
      Validators.max(180)
    ]]
  })

  constructor( 
    private fb: FormBuilder,
    private coordsService: CoordsService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    const draft = localStorage.getItem("COORDS");
    if (draft) {
      this.coordForm.setValue(JSON.parse(draft));
    }

    this.coordForm.valueChanges
      .pipe(
        filter(() => this.coordForm.valid)
      )
      .subscribe( val => localStorage.setItem("COORDS", JSON.stringify(val)));

    this.coordsService.coords$.subscribe( coords => {
      this.coordForm.patchValue({
        latitude: coords.lat,
        longitude: coords.lng
      });
    })
  }

  get latitude() {
    return this.coordForm.controls['latitude'];
  }

  get longitude() {
    return this.coordForm.controls['longitude'];
  }

  getCoordsData() {
    this.coordSubmit.emit(this.coordForm.value);
    this.coordsService.sendCoordsSubmit(this.coordForm.value)
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent)
  }

}
