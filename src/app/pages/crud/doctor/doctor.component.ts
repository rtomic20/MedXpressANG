import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoktorService } from '../../../layout/service/doctor.service';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.scss'],
    imports: [CommonModule, FormsModule]
})
export class DoctorComponent implements OnInit {
    doctors: any[] = [];

    showModal = false;
    showEditModal = false;
    odabraniDoktorZaEdit: any = null;

    noviDoktor = {
        ime: '',
        prezime: '',
        email: '',
        korisnicko_ime: '',
        lozinka: '',
        specijalizacija: '',
        razina_specijalizacije: '',
        sestra: {
            ime: '',
            prezime: '',
            email: '',
            korisnicko_ime: '',
            lozinka: '',
            radno_iskustvo: '',
            specializirane_tehnike: ''
        }
    };

    constructor(private doktorService: DoktorService) {}

    ngOnInit(): void {
        this.loadDoctors();
    }

    loadDoctors() {
        this.doktorService.getAll().subscribe((data: any) => {
            this.doctors = data.map((d: any) => ({
                ...d,
                showNurses: false
            }));
        });
    }

    toggleNurses(doctor: any) {
        doctor.showNurses = !doctor.showNurses;
    }

    addNewDoctor() {
        this.doktorService.addDoctorWithNurses(this.noviDoktor).subscribe({
            next: (response) => {
                console.log('Dodano:', response);
                this.showModal = false;
                this.loadDoctors();
                this.resetForm();
            },
            error: (err) => {
                console.error('Greška pri dodavanju:', err);
            }
        });
    }

    resetForm() {
        this.noviDoktor = {
            ime: '',
            prezime: '',
            email: '',
            korisnicko_ime: '',
            lozinka: '',
            specijalizacija: '',
            razina_specijalizacije: '',
            sestra: {
                ime: '',
                prezime: '',
                email: '',
                korisnicko_ime: '',
                lozinka: '',
                radno_iskustvo: '',
                specializirane_tehnike: ''
            }
        };
    }
    editDoctor(doctor: any) {
        console.log('Edit:', doctor);
        this.odabraniDoktorZaEdit = JSON.parse(JSON.stringify(doctor)); // deep copy
        this.showEditModal = true;
    }

    saveEditedDoctor() {
        this.doktorService.update(this.odabraniDoktorZaEdit.doktor_id, this.odabraniDoktorZaEdit).subscribe({
            next: (response) => {
                console.log('Ažurirano:', response);
                this.showEditModal = false;
                this.loadDoctors();
            },
            error: (err) => {
                console.error('Greška pri ažuriranju:', err);
            }
        });
    }

    deleteDoctor(doctor: any) {
        this.doktorService.delete(doctor.doktor_id).subscribe({
            next: () => {
                console.log('Obrisano:', doctor);
                this.loadDoctors();
            },
            error: (err) => {
                console.error('Greška pri brisanju:', err);
            }
        });
    }
}
