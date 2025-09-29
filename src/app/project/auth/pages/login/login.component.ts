import { FormGroup, Validators } from '@angular/forms';

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/security/services/authService.service';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule,MaterialButtonModule,MaterialFormModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  authService=inject(AuthService);
  storate=inject(StorageService);
  hide=true;
  form: FormGroup= new FormGroup({});

  constructor(){
    super();
  }

  ngOnInit() {
    this.gerarForm();
    const rememberedEmail = this.storageService.localStorage.getItem('loginEmail');
    if (rememberedEmail) {
      this.form.controls['email'].setValue(rememberedEmail);
      this.form.controls['lembreMe'].setValue(true);
    }
  }

  gerarForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      lembreMe: [false]
    });
  }

  logar() {
    if (this.form.invalid) {
      let msg = "Login inválido! Verifique suas credenciais e tente novamente     "
      this.msgService.msgErro(msg);
      return;
    }

    const email= this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    this.lembrar();
    this.authService.autenticar(email,password)
      .subscribe({
        next: (data) => {
          this.msgService.msgSucesso("Login realizado com sucesso!");
          this.router.navigate([`/atleta/${data.usuario.atletaId}`]);
        },
        error: (err) => {
          let msg = "Login inválido! Verifique suas credenciais e tente novamente";
          if (!"403".startsWith(err.status)) {
            msg = "Sistema temporariamente indisponível. \n Por favor, abra um chamado para a STI, reportando o problema e tente novamente mais tarde."
          };
          this.msgService.msgErro(msg);
        }
      });
  }
  changeHide() {
    this.hide = !this.hide;
  }
  lembrar(){
    const lembrarMe = this.form.controls['lembreMe'].value;
    if(lembrarMe){
      if(this.form.controls['email'].valid){
        this.storageService.localStorage.setItem('loginEmail', this.form.controls['email'].value);
      }
    }else{
      this.storageService.localStorage.removeItem('loginEmail');
    }
  }

  esqueciSenha() {
    if (this.form.controls['email'].invalid) {
      let msg = "Por favor, informe um e-mail válido para recuperação de senha!"
      this.msgService.msgErro(msg);
      return;
    }
    const email = this.form.controls['email'].value;
    this.authService.passwordResetEmail(email)
      .subscribe({
        next: (data) => {
          this.msgService.msgSucesso("Instruções para recuperação de senha enviadas para o e-mail.");
        },
        error: (err) => {
          let msg = err.error.message || "Erro ao redefinir a senha!";
          this.msgService.msgErro(msg);
        }
      });
  }
}
