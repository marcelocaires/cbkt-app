import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { OsService, UploadFileRequest, UploadFileResponse } from '../../../services/os.service';
import { Atleta } from '../../models/atleta.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
  selector: 'app-atleta-foto',
  templateUrl: './atleta-foto.component.html',
  styleUrls: ['./atleta-foto.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    PageTitleComponent
  ]
})
export class AtletaFotoComponent extends BaseComponent{
  osService=inject(OsService);
  atleta = input.required<Atleta>();
  isHeader = input<boolean>(false);
  isUpdateMode = input<boolean>(false);
  onFotoUpdate = output<string>();
  onFotoError = output<boolean>();

  previewUrl = signal<string | null>(null);
  selectedFile = signal<File | null>(null);
  isDragging = signal<boolean>(false);

  ngOnInit(): void {
    if (this.atleta()) {
      const atleta=this.atleta();
      if(atleta && atleta.id){
        this.osService.getUrlFotoAtleta(atleta.id).subscribe({
          next: (response) => {
            this.atleta().urlFoto = response.url;
          },
          error: (error) => {
            console.error('Erro ao carregar a foto do atleta:', error);
            this.onFotoError.emit(true);
          }
        });
      };
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      this.processFile(files[0]);
    }
  }

  private processFile(file: File): void {
    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.msgService.msgErro('Por favor, selecione apenas arquivos de imagem (JPG, PNG ou WEBP).');
      return;
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.msgService.msgErro('O arquivo deve ter no máximo 5MB.');
      return;
    }

    this.selectedFile.set(file);

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  uploadFoto(): void {
    const file = this.selectedFile();
    if (file) {
      const request:UploadFileRequest={
        id:this.atleta().id!,
        file:file
      };
      this.osService.uploadFotoAtleta(request).subscribe({
        next: (response:UploadFileResponse) => {
          this.msgService.msgSucesso('Foto atualizada com sucesso!');
          this.atleta().urlFoto = response.objectUrl;
          this.previewUrl.set(null);
          this.selectedFile.set(null);
          this.onFotoUpdate.emit(response.key);
          this.onFotoError.emit(false);
        },
        error: (error) => {
          this.msgService.msgErro('Erro ao enviar a foto. Por favor, tente novamente.');
        }
      });
    }
  }

  cancelar(): void {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
  }

  getFotoUrl(): string {
    const atleta = this.atleta();
    if (this.previewUrl()) {
      return this.previewUrl()!;
    }
    if (atleta && atleta.urlFoto) {
      return atleta.urlFoto;
    }
    return atleta && atleta.sexo === 'F'
      ? 'assets/images/avatar-af.png'
      : 'assets/images/avatar-am.png';
  }
}
