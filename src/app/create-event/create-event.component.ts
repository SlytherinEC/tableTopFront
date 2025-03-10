import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  gameForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private eventService: EventService
  ) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      maxParticipants: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.gameForm.valid) {
      try {
        this.eventService.addEvent({
          title: this.gameForm.get('title')?.value,
          description: this.gameForm.get('description')?.value,
          date: this.gameForm.get('date')?.value,
          location: this.gameForm.get('location')?.value,
          maxParticipants: parseInt(this.gameForm.get('maxParticipants')?.value)
        });
        
        this.router.navigate(['/eventos']);
      } catch (error) {
        this.errorMessage = 'Error al crear el evento';
        console.error('Error creating event:', error);
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
    }
  }
}
