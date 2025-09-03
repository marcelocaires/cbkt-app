import { FormGroup, Validators } from '@angular/forms';

import { Component, inject } from '@angular/core';
import { appinfo } from '../../../../../environments/appinfo';
import { AuthService } from '../../../../core/security/services/authService.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule,MaterialButtonModule,MaterialFormModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  esqueciSenha() {
    this.msgService.msgSucesso("Instruções para recuperação de senha enviadas para o seu e-mail.");
  }
  authService=inject(AuthService);
  hide=true;
  form: FormGroup= new FormGroup({});
  sistemaSigla: string = appinfo.sistemaSigla;
  sistemaNome: string = appinfo.sistemaNome;
  sistemaVersao: string = appinfo.sistemaVersao;
  regional:string=appinfo.regionalNome;

  constructor(){
    super();
  }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  logar() {
    if (this.form.invalid) {
      let msg = "Login inválido! Verifique suas credenciais e tente novamente     "
      this.msgService.msgErro(msg);
      return;
    }

    const titulo= this.form.controls['titulo'].value;
    const senha = this.form.controls['senha'].value;

    this.authService.autenticar(titulo,senha)
      .subscribe({
        next: (data) => {
          this.msgService.msgSucesso("Login realizado com sucesso!");
          this.router.navigate(['admin']);
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
  changeHide() {
    this.hide = !this.hide;
  }
}
