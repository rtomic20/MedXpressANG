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
    isEditing: boolean = false;
    infirmarie: any[] = [];
    doktors: any[] = [];

    editAmbulantaId: number | null = null;

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
        this.refreshInfirmaries();

        this.doctorService.getAll().subscribe((data: any) => {
            this.doktors = data;
            console.log('Dobiveni doktori:', this.doktors);
        });
    }

    refreshInfirmaries() {
        this.infirmariesService.getAll().subscribe((data: any) => {
            this.infirmarie = data;
            console.log('Ambulante:', this.infirmarie);
        });
    }

    openAddModal() {
        this.isEditing = false;
        this.editAmbulantaId = null;
        this.novaAmbulanta = {
            Infirmary_name: '',
            lat: 0,
            long: 0,
            doktor: null,
            medicinska_sestra: null,
            sestra_ime: ''
        };
        this.showModal = true;
    }

    openEditModal(amb: any) {
        this.isEditing = true;
        this.editAmbulantaId = amb.id;

        this.novaAmbulanta = {
            Infirmary_name: amb.Infirmary_name,
            lat: amb.lat,
            long: amb.long,
            doktor: amb.doktor,
            medicinska_sestra: amb.medicinska_sestra,
            sestra_ime: amb.sestra_ime || ''
        };

        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.isEditing = false;
        this.editAmbulantaId = null;
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

    spremiAmbulantu() {
        const payload: any = {
            Infirmary_name: this.novaAmbulanta.Infirmary_name,
            lat: this.novaAmbulanta.lat,
            long: this.novaAmbulanta.long,
            doktor: this.novaAmbulanta.doktor,
            medicinska_sestra: this.novaAmbulanta.medicinska_sestra
        };

        if (this.isEditing && this.editAmbulantaId !== null) {
            console.log('PUT na backend za id:', this.editAmbulantaId);

            this.infirmariesService.update(this.editAmbulantaId, payload).subscribe({
                next: () => {
                    this.refreshInfirmaries();
                    this.closeModal();
                    console.log('Ambulanta ažurirana.');
                },
                error: (error) => {
                    console.error('Greška kod ažuriranja:', error);
                }
            });
        } else {
            console.log('POST na backend');

            this.infirmariesService.create(payload).subscribe({
                next: () => {
                    this.refreshInfirmaries();
                    this.closeModal();
                    console.log('Ambulanta spremljena.');
                },
                error: (error) => {
                    console.error('Greška kod spremanja:', error);
                }
            });
        }
    }
    onDelete(id: number) {
        if (confirm('Jeste li sigurni da želite obrisati ovu ambulantu?')) {
            this.infirmariesService.delete(id).subscribe({
                next: () => {
                    alert('Ambulanta je uspješno obrisana.');
                    this.refreshInfirmaries();
                },
                error: (err) => {
                    console.error('Greška pri brisanju:', err);
                    alert('Došlo je do greške prilikom brisanja.');
                }
            });
        }
    }
}
