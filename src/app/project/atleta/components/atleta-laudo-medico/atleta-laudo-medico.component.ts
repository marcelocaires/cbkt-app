import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';
import { OsService, UploadFileRequest, UploadFileResponse } from '../../../services/os.service';
import { Atleta } from '../../models/atleta.model';

@Component({
  selector: 'app-atleta-laudo-medico',
  templateUrl: 'atleta-laudo-medico.component.html',
  styleUrls: ['atleta-laudo-medico.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialProgressModule
  ]
})
export class AtletaLaudoMedicoComponent {
  atleta = input.required<Atleta>();
  isValid=input<boolean>(false);
  isUpdateMode = input<boolean>(false);
  onUpdateUrl = output<string>();

  private osService = inject(OsService);
  private sanitizer = inject(DomSanitizer);

  relatorioUrl = signal<SafeResourceUrl | null>(null);
  selectedFile = signal<File | null>(null);
  uploading = signal<boolean>(false);
  uploadErrorMsg = signal<string | null>(null);
  private storedUrl = signal<string | null>(null);
  isUpdate=false;
  ngOnInit(): void {
    const atletaVal = this.atleta();
    if (this.atleta().isPcd && atletaVal.id) {
      this.osService.getUrlLaudoMedicoAtleta(atletaVal.id).subscribe({
        next: (response) => {
          if (response.url) {
            this.storedUrl.set(response.url);
            this.setViewerUrl(response.url);
            this.isUpdate=true;
          }
        },
        error: (error) => {
          console.error('Erro ao obter relatório médico do atleta:', error);
        }
      });
    }
  }

  onFileInputChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const file = inputEl.files && inputEl.files[0] ? inputEl.files[0] : null;
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.uploadErrorMsg.set('Tipo de arquivo inválido. Envie um PDF.');
      this.selectedFile.set(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      this.uploadErrorMsg.set('O arquivo ultrapassa 10MB.');
      this.selectedFile.set(null);
      return;
    }

    this.uploadErrorMsg.set(null);
    this.selectedFile.set(file);

    const previewUrl = URL.createObjectURL(file);
    this.setViewerUrl(previewUrl);
  }

  uploadRelatorio(): void {
    const atletaVal = this.atleta();
    const file = this.selectedFile();

    if (!file || !atletaVal?.id) {
      return;
    }

    const request: UploadFileRequest = {
      id: atletaVal.id,
      file
    };

    this.uploading.set(true);

    this.osService.uploadLaudoMedicoAtleta(request)
      .pipe(finalize(() => this.uploading.set(false)))
      .subscribe({
        next: (response: UploadFileResponse) => {
          const url = response.objectUrl
          const key=response.key;
          if (url) {
            this.storedUrl.set(url);
            this.setViewerUrl(url);
          }
          this.selectedFile.set(null);
          this.onUpdateUrl.emit(key);
        },
        error: (error) => {
          console.error('Erro ao enviar relatório médico:', error);
          this.uploadErrorMsg.set('Erro ao enviar relatório. Tente novamente.');
        }
      });
  }

  clearSelected(): void {
    this.selectedFile.set(null);
    this.uploadErrorMsg.set(null);
    this.setViewerUrl(this.storedUrl());
  }

  private setViewerUrl(url: string | null): void {
    this.relatorioUrl.set(url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null);
  }
}
