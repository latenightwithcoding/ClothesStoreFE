import { Component, ViewEncapsulation } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// 1. Import FormsModule để sử dụng [(ngModel)]
import { FormsModule } from '@angular/forms';
import {
    ClassicEditor,
    // Tính năng cơ bản
    Essentials, Paragraph, Bold, Italic, Heading, Link, List, BlockQuote,
    // Tính năng hình ảnh (Upload Local)
    Image, ImageUpload, ImageCaption, ImageStyle, ImageResize, ImageToolbar,
    Base64UploadAdapter, // Dùng để test. Nên đổi SimpleUploadAdapter cho production
    // Tính năng "Full" khác
    Table, TableToolbar, MediaEmbed, Indent, FindAndReplace
} from 'ckeditor5';
import { CommonModule } from '@angular/common';

// QUAN TRỌNG: 
// Gói 'ckeditor5' (DLL build) đã bao gồm nhiều plugin. 
// Nếu bạn thiếu plugin nào, bạn có thể cần phải cài đặt riêng lẻ, ví dụ:
// npm install @ckeditor/ckeditor5-list @ckeditor/ckeditor5-table ...
// và import chúng từ các gói đó. 
// Tuy nhiên, các bản dựng mới (v40+) thường đã có sẵn chúng trong 'ckeditor5'.

@Component({
    selector: 'test-page',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
    encapsulation: ViewEncapsulation.None,
    // 2. Thêm FormsModule vào imports
    imports: [CKEditorModule, FormsModule, CommonModule],
    standalone: true
})
export class TestPage {
    title = 'angular';

    public Editor = ClassicEditor;

    // 3. Tạo biến để binding với editor
    public editorData: string = '<p>Hello, world!</p>';

    // 4. Tạo biến để lưu trữ HTML sau khi submit
    public submittedHtml: string | null = null;

    // SỬA LỖI: Thêm kiểu ': any' để bỏ qua lỗi TypeScript TS2322
    // Cấu hình JS là đúng, nhưng typings của Angular/CKEditor không hiểu được
    // cấu trúc lồng nhau phức tạp của image.styles.
    public config: any = {
        // 1. Đặt license là 'GPL' vì chúng ta không dùng tính năng cloud/trả phí
        licenseKey: 'GPL',

        // 2. Thêm TẤT CẢ các plugin bạn muốn sử dụng
        plugins: [
            // Cơ bản
            Essentials, Paragraph, Bold, Italic, Heading, Link, List, BlockQuote,
            // Hình ảnh
            Image, ImageUpload, ImageCaption, ImageStyle, ImageResize, ImageToolbar,
            Base64UploadAdapter, // <-- Plugin xử lý upload (chuyển ảnh thành text base64)
            // Tính năng khác
            Table, TableToolbar, MediaEmbed, Indent, FindAndReplace
        ],

        // 3. Xây dựng toolbar đầy đủ
        toolbar: {
            items: [
                'undo', 'redo', '|',
                'findAndReplace', '|',
                'heading', '|',
                'bold', 'italic', '|',
                'link', 'uploadImage', 'insertTable', 'mediaEmbed', 'blockQuote', '|',
                'bulletedList', 'numberedList', 'outdent', 'indent'
            ],
            shouldNotGroupWhenFull: false
        },

        // 4. Cấu hình riêng cho plugin Ảnh (Image)
        image: {
            // Cấu hình thanh công cụ xuất hiện khi nhấp vào ảnh
            toolbar: [
                // Các nút căn chỉnh (do ImageStyle cung cấp)
                'imageStyle:inline',
                'imageStyle:wrapText', // Căn trái, chữ bao quanh
                'imageStyle:breakText', // Căn phải, chữ bao quanh
                '|',
                'toggleImageCaption', // Bật/tắt chú thích
                'imageTextAlternative' // Thêm text ALT
            ],
            // Thuộc tính 'styles' này gây ra lỗi TS, mặc dù nó đúng về mặt JS
            styles: [
                'inline',
                // Tùy chọn này cho phép chữ bao quanh ảnh
                { name: 'wrapText', title: 'Wrap text', class: 'image-style-side', icon: 'sideImage' },
                'breakText'
            ]
        },

        // 5. Cấu hình riêng cho plugin Bảng (Table)
        table: {
            contentToolbar: [
                'tableColumn', 'tableRow', 'mergeTableCells'
            ]
        },

        // 6. (KHUYÊN DÙNG CHO PRODUCTION) Thay thế Base64UploadAdapter
        // Xóa Base64UploadAdapter ở trên và thêm SimpleUploadAdapter
        // import { SimpleUploadAdapter } from 'ckeditor5';
        // plugins: [ ..., SimpleUploadAdapter ],
        // simpleUpload: {
        //     uploadUrl: 'http://may-chu-cua-ban.com/api/upload-anh',
        //     headers: {
        //         'Authorization': 'Bearer YOUR_TOKEN'
        //     }
        // }
    }

    // 5. Hàm xử lý sự kiện click nút Submit
    public onSubmit(): void {
        this.submittedHtml = this.editorData;
        console.log('Editor Data Submitted:', this.editorData);
    }
}

