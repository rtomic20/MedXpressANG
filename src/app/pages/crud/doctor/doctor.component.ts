import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoktorService } from '../../../layout/service/doctor.service';

@Component({
  standalone: true,
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  imports: [CommonModule],
})
export class DoctorComponent implements OnInit {
  doctors: any[] = [];

  constructor(private doktorService: DoktorService) {}

  ngOnInit(): void {
    this.doktorService.getAll().subscribe((data: any) => {
      this.doctors = data;
    });
  }
}
