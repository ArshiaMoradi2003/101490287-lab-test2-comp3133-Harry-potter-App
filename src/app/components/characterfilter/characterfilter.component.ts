import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.interface';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.css'
})
export class CharacterfilterComponent implements OnInit {
  private service = inject(HarryPotterService);

  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  houseControl = new FormControl('Gryffindor');

  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  selectedHouse = signal<string>('');

  ngOnInit(): void {
    this.loadHouse('Gryffindor');
  }

  onHouseChange(event: MatSelectChange): void {
    this.loadHouse(event.value);
  }

  loadHouse(house: string): void {
    this.selectedHouse.set(house);
    this.loading.set(true);
    this.error.set('');

    this.service.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load characters for this house.');
        this.loading.set(false);
      }
    });
  }

  getHouseColor(house: string): string {
    switch (house) {
      case 'Gryffindor': return '#ae0001';
      case 'Slytherin': return '#2a623d';
      case 'Hufflepuff': return '#ecb939';
      case 'Ravenclaw': return '#222f5b';
      default: return '#888';
    }
  }
}
