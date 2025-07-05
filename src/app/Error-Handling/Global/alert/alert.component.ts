import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {

  showAlert: string | undefined;
  showMessage: string | undefined;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.getAlert().subscribe((error: { message: string; details: string }) => {
      this.showAlert = error.message;
      this.showMessage = error.details;
    })
  }

  closeAlert() {
    this.showAlert = undefined;
    this.showMessage = undefined;
  }
}
