import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/security/services/authService.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaskDirective } from '../../../../shared/directives/mask.directive';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { SharedModule } from '../../../../shared/shared.module';

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
  constructor() {
    super();
  }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      cpf: ['', [Validators.required]],
      dtNascimento: ['', [Validators.required]]
    });
  }

  validar() {
    if (this.form.invalid) {
      let msg = "Dados inválidos!"
      this.msgService.msgErro(msg);
      return;
    }

    this.authService.primeiroAcesso(this.form.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.msgService.msgSucesso("Login criado com sucesso!");
        },
        error: (err) => {
          let msg = "Login inválido! Verifique suas credenciais e tente novamente";
          if (!"400".startsWith(err.status)) {
            msg = "Sistema temporariamente indisponível. \n Por favor, abra um chamado para a STI, reportando o problema e tente novamente mais tarde."
          };
          this.msgService.msgErro(msg);
        }
      });
  }
}
