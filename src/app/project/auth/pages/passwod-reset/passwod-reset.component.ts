import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { appinfo } from '../../../../../../../environments/appinfo';
import { BaseComponent } from '../../../../../shared/components/base/base.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { AuthService, PasswordReset } from '../../services/authService.service';

@Component({
  selector: 'app-passwod-reset',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './passwod-reset.component.html',
  styleUrl: './passwod-reset.component.scss'
})
export class PasswodResetComponent extends BaseComponent  {
  authService=inject(AuthService);
  passwordHide=true;
  confirmHide=true;
  validToken=false;
  tokenMsg="";
  email:any;
  token:any;
  strongPasswordRegx: RegExp=/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[!@#$%^&*]).{6,}$/;

  form: FormGroup=this.formBuilder.group({
    senha: ['', [Validators.required, Validators.pattern(this.strongPasswordRegx)]],
    confirm: ['', [Validators.required,this.validateSamePassword]]
  });
  sistemaSigla: string = appinfo.sistemaSigla;
  sistemaNome: string = appinfo.sistemaNome;
  sistemaVersao: string = appinfo.sistemaVersao;
  regional:string=appinfo.regionalNome;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params != null) {
        this.email = params.get('email');
        this.token = params.get('token');
        this.authService.passwordTokenCheck(this.token).subscribe({
          next: (response:any) => {
            this.validToken = true;
          },
          error: (error: HttpErrorResponse) => {
            this.validToken = false;
            //this.msgService.msgErro(error.error.error);
          },
        });
      }
    });
  }

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('senha');
    const confirmPassword = control.parent?.get('confirm');
    return password?.value == confirmPassword?.value ? null : { 'notSame': true };
  }

  get passwordFormField() {
    return this.form.get('senha');
  }

  get confirmFormField() {
    return this.form.get('confirm');
  }

  uppercaseMatcher(){
    return /^(?=.*[A-Z])/.test(this.passwordFormField?.value);
  }
  lowercaseMatcher(){
    return /(?=.*[a-z])/.test(this.passwordFormField?.value);
  }
  numberMatcher(){
    return /(.*[0-9].*)/.test(this.passwordFormField?.value);
  }
  especialMatcher(){
    return /(?=.*[!@#$%^&*])/.test(this.passwordFormField?.value);
  }
  lengthMatcher(){
    return /.{6,}/.test(this.passwordFormField?.value);
  }

  submit(){
    if(this.form.valid){

      if(this.passwordFormField?.value != this.confirmFormField?.value ){
        this.msgService.msgErro('As senhas não conferem!');
        return;
      }

      const passwordReset:PasswordReset={
        password: this.passwordFormField?.value,
        email: this.email,
        token: this.token
      }

      this.authService.passwordReset(passwordReset).subscribe({
        complete: () => {
          this.msgService.msgSucesso('Sua senha foi cadastrada com sucesso!');
          this.form.reset;
          this.router.navigate(['']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.msgService.msgErro('Token inválido ou expirado!');
          }
        },
      });
    }
  }
}
