import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent, ScrollingBarComponent } from '../shared/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollingBarComponent],
  templateUrl: './pages/home/app.html',
  styleUrl: './pages/home/app.scss'
})
export class App {
  protected readonly title = signal('shop');
}
