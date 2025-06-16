import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoktorService } from '../../../layout/service/doctor.service';

@Component({
  standalone: true,
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.scss'],
  imports: [CommonModule],
})
export class DoctorComponent implements OnInit {
  doctors: any[] = [];

  constructor(private doktorService: DoktorService) {}

ngOnInit(): void {
  this.doktorService.getAll().subscribe((data: any) => {
    this.doctors = data.map((d: any) => ({
      ...d,
      medicinske_sestre: [d.sestra_ime], 
      showNurses: false
    }));
  });
}



toggleNurses(doctor: any) {
  doctor.showNurses = !doctor.showNurses;
}

}

