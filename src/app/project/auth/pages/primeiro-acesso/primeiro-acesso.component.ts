import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/security/services/authService.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaskDirective } from '../../../../shared/directives/mask.directive';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CpfValidator } from '../../../../shared/validators/cpf-validator';
import { Util } from '../../../../shared/util/util';

interface UsuarioCriado {
  nome: string;
  email: string;
}

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.scss'],
  standalone: true,
  imports: [SharedModule,MaterialButtonModule,MaterialFormModule,MaskDirective,RouterLink]
})
export class PrimeiroAcessoComponent extends BaseComponent implements OnInit {
  authService=inject(AuthService);
  form: FormGroup= new FormGroup({});
  usuarioCriado: UsuarioCriado | null = null;
  isUsuarioCriado: boolean = false;
  private cdRef = inject(ChangeDetectorRef);
  constructor() {
    super();
  }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      cpf: ['', [Validators.required,CpfValidator]],
      dtNascimento: ['', [Validators.required]]
    });
  }

  validar() {
    if (this.form.invalid) {
      let msg = "Dados inválidos!"
      this.msgService.msgErro(msg);
      return;
    }

    this.form.value.cpf = this.form.value.cpf.replace(/\D/g, '');
    this.form.value.dtNascimento = Util.formatarDataBR(this.form.value.dtNascimento);

    this.authService.primeiroAcesso(this.form.value)
      .subscribe({
        next: (data: any) => {
          this.usuarioCriado = data;
          this.isUsuarioCriado = true;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          let msg = err.error.message || "Erro ao criar usuário!";
          this.msgService.msgErro(msg);
        }
      });
  }
}
