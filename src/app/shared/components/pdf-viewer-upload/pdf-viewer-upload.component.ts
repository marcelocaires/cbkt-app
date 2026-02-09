import { Component, input, output, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { MaterialButtonModule } from '../../material/material-button.module';
import { MaterialFormModule } from '../../material/material-form.module';
import { MaterialLayoutModule } from '../../material/material-layout.module';
import { MaterialProgressModule } from '../../material/material-progress.module';

@Component({
  selector: 'app-file-upload',
  templateUrl: './pdf-viewer-upload.component.html',
  styleUrls: ['./pdf-viewer-upload.component.scss'],
  standalone: true,
  imports: [SharedModule, MaterialButtonModule, MaterialFormModule, MaterialLayoutModule, MaterialProgressModule],
})
export class FileUploadComponent {
  src = input<string | null>(null);
  uploadUrl = input<string | null>(null);
  autoUpload = input<boolean>(false);
  fileName = input<string | null>(null);

  fileSelected = output<File>();
  uploadSuccess = output<any>();
  uploadError = output<any>();

  safeUrl: SafeResourceUrl | null = null;
  selectedFile: File | null = null;
  uploading = false;

  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    const srcVal = this.src();
    if (srcVal) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(srcVal);
    }
  }

  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.uploadError.emit({ message: 'Tipo de arquivo inválido. Somente PDF.' });
      return;
    }

    this.selectedFile = file;
    this.fileSelected.emit(file);

    const blobUrl = URL.createObjectURL(file);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);

    if (this.autoUpload()) {
      this.upload();
    }
  }

  async upload() {
    if (!this.selectedFile) return;
    const uploadUrlVal = this.uploadUrl();
    if (!uploadUrlVal) {
      // Sem endpoint: apenas emite sucesso com o arquivo para o host lidar
      this.uploadSuccess.emit({ file: this.selectedFile });
      return;
    }

    try {
      this.uploading = true;
      const form = new FormData();
      const fileNameVal = this.fileName();
      const name = fileNameVal || this.selectedFile.name || 'arquivo.pdf';
      form.append('file', this.selectedFile, name);

      const resp = await fetch(uploadUrlVal, {
        method: 'POST',
        body: form,
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(`Falha no upload: ${resp.status} ${text}`);
      }

      let data: any = null;
      const contentType = resp.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await resp.json();
      } else {
        data = await resp.text();
      }

      this.uploadSuccess.emit(data);
    } catch (err: any) {
      this.uploadError.emit(err);
    } finally {
      this.uploading = false;
    }
  }

  clearSelected() {
    this.selectedFile = null;
    const srcVal = this.src();
    this.safeUrl = srcVal
      ? this.sanitizer.bypassSecurityTrustResourceUrl(srcVal)
      : null;
  }
}
