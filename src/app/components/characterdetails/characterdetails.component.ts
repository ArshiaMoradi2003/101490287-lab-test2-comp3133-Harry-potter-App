import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.interface';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.css'
})

export class CharacterdetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(HarryPotterService);

  character = signal<Character | null>(null);
  loading = signal<boolean>(true);
  error = signal<string>('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getCharacterById(id).subscribe({
        next: (data) => {
          this.character.set(data[0]);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Characters not found.');
          this.loading.set(false);
        }
      })
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
