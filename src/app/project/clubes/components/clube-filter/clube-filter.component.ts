import { Component, inject, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Clube } from '../../../atleta/models/atleta.model';
import { ClubeService } from '../../services/clube.service';

@Component({
  selector: 'app-clube-filter',
  standalone: true,
  imports: [
    SharedModule,
    MaterialFormModule,
    MaterialButtonModule
  ],
  templateUrl: './clube-filter.component.html',
  styleUrl: './clube-filter.component.scss',
})
export class ClubeFilterComponent {
  clubeService=inject(ClubeService);
  myControl = new FormControl('');
  filtered!: Observable<Clube[]>;
  clubes: Clube[] = [];
  selected:Clube|null=null;
  select=output<Clube|null>();

  ngOnInit() {
    this.clubeService.read().subscribe(
      clubes => {
        this.clubes = clubes;
      }
    );
    this.filtered = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Clube[] {
    const filterValue = value.toLowerCase();
    return this.clubes.filter(clube => clube.nome.toLowerCase().includes(filterValue));
  }

  selectEvent($event: MatAutocompleteSelectedEvent) {
    this.selected=this.clubes.find(c=>c.nome===$event.option.value) || null;
    this.select.emit(this.selected);
  }
  cleanFilter() {
    this.myControl.setValue('');
  }
}
