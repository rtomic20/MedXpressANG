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
    imports: [CommonModule, FormsModule]
})
export class InfirmariesAPI implements OnInit {
    showModal: boolean = false;
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
            console.log('Dobiveni doktori:', this.doktors);
        });
    }

    onDoctorChange(doktorId: any) {
        const id = Number(doktorId);
        const selected = this.doktors.find((d) => d.doktor_id === id);

        if (selected) {
            this.novaAmbulanta.doktor = selected.doktor_id;

            if (selected.sestra && selected.sestra.medicinskasestra_id) {
                this.novaAmbulanta.medicinska_sestra = selected.sestra.medicinskasestra_id;
                this.novaAmbulanta.sestra_ime = `${selected.sestra.ime} ${selected.sestra.prezime}`;
            } else {
                this.novaAmbulanta.medicinska_sestra = null;
                this.novaAmbulanta.sestra_ime = '';
            }
        }
    }

    dodajAmbulantu() {
        const payload: any = {
            Infirmary_name: this.novaAmbulanta.Infirmary_name,
            lat: this.novaAmbulanta.lat,
            long: this.novaAmbulanta.long,
            doktor: this.novaAmbulanta.doktor,
            medicinska_sestra: this.novaAmbulanta.medicinska_sestra
        };

        if (this.novaAmbulanta.medicinska_sestra !== null) {
            payload.medicinska_sestra = this.novaAmbulanta.medicinska_sestra;
        }

        console.log('Šaljem na backend:', payload);

        this.infirmariesService.create(payload).subscribe({
            next: () => {
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

                this.showModal = false;

                console.log('Ambulanta uspješno spremljena.');
            },
            error: (error) => {
                console.error('Greška prilikom spremanja ambulante:', error);
            }
        });
    }
}
