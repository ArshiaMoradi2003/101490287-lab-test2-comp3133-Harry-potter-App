import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.interface';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.css'
})
export class CharacterlistComponent implements OnInit {
  private service = inject(HarryPotterService);

  characters = signal<Character[]>([]);
  filteredCharacters = signal<Character[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  searchTerm = signal<string>('');

  ngOnInit(): void {
    this.service.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.filteredCharacters.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load characters. Please try again.');
        this.loading.set(false);
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
    if (!term.trim()) {
      this.filteredCharacters.set(this.characters());
    } else {
      const filtered = this.characters().filter(c =>
        c.name.toLowerCase().includes(term.toLowerCase())
      );
      this.filteredCharacters.set(filtered);
    }
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
