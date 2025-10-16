import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
    selector: 'app-not-found',
    standalone: true,
    templateUrl: './not-found.html',
    styleUrls: ['./not-found.scss']
})
export class NotFoundComponent implements OnInit {
    @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
    private width!: number;
    private height!: number;
    private wordArr: { x: number; y: number; text: string; size: number }[] = [];
    private txtMinSize = 5;
    private txtMaxSize = 25;
    private acclerate = 0.5; // tốc độ cơ bản
    private mouse = { x: 0, y: 0 }; // vị trí chuột
    private parallaxOffset = { x: 0, y: 0 }; // độ lệch mượt

    ngOnInit(): void {
        const canvas = this.canvasRef.nativeElement;
        this.height = canvas.height = window.innerHeight;
        this.width = canvas.width = window.innerWidth;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        for (let i = 0; i < 15; i++) {
            this.addWord('404');
            this.addWord('page');
            this.addWord('not found');
            this.addWord('404');
        }

        this.render();
    }

    private random(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

    private rangeMap(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    private addWord(text: string) {
        this.wordArr.push({
            x: this.random(0, this.width),
            y: this.random(0, this.height),
            text,
            size: this.random(this.txtMinSize, this.txtMaxSize)
        });
    }

    private render = () => {
        // Làm mượt chuyển động cảm ứng (interpolation)
        this.parallaxOffset.x += (this.mouse.x - this.parallaxOffset.x) * 0.05;
        this.parallaxOffset.y += (this.mouse.y - this.parallaxOffset.y) * 0.05;

        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#fff';

        for (let i = 0; i < this.wordArr.length; i++) {
            const w = this.wordArr[i];
            this.ctx.font = `${w.size}px sans-serif`;

            // dịch chuyển chữ theo hướng chuột (rất nhẹ)
            const parallaxX = this.parallaxOffset.x * 0.02;
            const parallaxY = this.parallaxOffset.y * 0.02;

            this.ctx.fillText(w.text, w.x + parallaxX, w.y + parallaxY);

            const baseSpeed = this.rangeMap(w.size, this.txtMinSize, this.txtMaxSize, 0.2, 1);
            w.x += baseSpeed;

            if (w.x > this.width + 50) {
                w.x = -200;
                w.y = this.random(0, this.height);
                w.size = Math.floor(this.random(this.txtMinSize, this.txtMaxSize));
            }
        }

        requestAnimationFrame(this.render);
    };

    // 🖱️ Bắt vị trí chuột
    @HostListener('mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        // trung tâm canvas là (0,0)
        this.mouse.x = (e.clientX / this.width - 0.5) * 2; // từ -1 đến 1
        this.mouse.y = (e.clientY / this.height - 0.5) * 2;
    }

    goBack() {
        window.location.href = '/';
    }
}
