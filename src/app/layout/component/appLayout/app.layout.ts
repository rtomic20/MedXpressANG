import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './app.layout.html',
  styleUrls: ['./app.layout.scss'],
  imports: [RouterModule, CommonModule],
})
export class AppLayout {}
