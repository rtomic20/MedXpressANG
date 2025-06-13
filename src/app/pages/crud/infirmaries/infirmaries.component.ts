import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmbulantaService } from '../../../layout/service/infrmary.service';
import { DoktorService } from '../../../layout/service/doctor.service';

@Component({
  standalone: true,
  selector: 'app-infirmaries',
  templateUrl: './infirmaries.component.html',
  styleUrls: ['./infirmaries.scss'],
  imports: [CommonModule, FormsModule],
})
export class InfirmariesAPI implements OnInit {
  infirmarie: any[] = [];
  doktors: any[] = [];

  novaAmbulanta = {
    Infirmary_name: '',
    lat: 0,
    long: 0,
    doktor: null,
    medicinska_sestra: null,
    sestra_ime: ''
  };

  constructor(
    private infirmariesService: AmbulantaService,
    private doctorService: DoktorService
  ) {}

  ngOnInit(): void {
    this.infirmariesService.getAll().subscribe((data: any) => {
      this.infirmarie = data;
    });

    this.doctorService.getAll().subscribe((data: any) => {
      this.doktors = data;
    });
  }

  onDoctorChange(doktorId: number) {
    const selected = this.doktors.find(d => d.doktor_id === doktorId);
    if (selected) {
      this.novaAmbulanta.medicinska_sestra = selected.sestra_id;
      this.novaAmbulanta.sestra_ime = selected.sestra_ime;
    }
  }

  dodajAmbulantu() {
    this.infirmariesService.create(this.novaAmbulanta).subscribe(() => {
      this.infirmariesService.getAll().subscribe((data: any) => {
        this.infirmarie = data;
      });

      this.novaAmbulanta = {
        Infirmary_name: '',
        lat: 0,
        long: 0,
        doktor: null,
        medicinska_sestra: null,
        sestra_ime: ''
      };
    });
  }
}
