import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // <-- THAY ĐỔI: Import AppComponent

// Khởi động ứng dụng với AppComponent làm component gốc
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));