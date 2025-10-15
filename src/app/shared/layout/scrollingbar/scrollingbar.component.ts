import { Component } from '@angular/core';
import { NgxMarqueeModule } from 'ngx-marquee';

@Component({
    selector: 'app-scrolling-bar',
    standalone: true,
    imports: [NgxMarqueeModule],
    templateUrl: './scrollingbar.component.html',
    styleUrls: ['./scrollingbar.component.scss']
})
export class ScrollingBarComponent {
}