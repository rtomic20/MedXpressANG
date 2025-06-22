import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacientService} from '../../../layout/service/pacients.service';

@Component({
    standalone:true,
    selector:'app-pacients',
    templateUrl:'./pacients.component.html',
    styleUrls:['./pacients.scss'],
    imports: [CommonModule]
})
export class PacientsAPI implements OnInit{
    pacienti: any[] = [];
    constructor(private pacientsService:PacientService ){}
    ngOnInit(): void {
        this.pacientsService.getAll().subscribe((data:any)=>{
            this.pacienti=data;
        });
    }
}