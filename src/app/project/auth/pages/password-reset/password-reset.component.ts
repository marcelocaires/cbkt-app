import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/security/services/authService.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';

export interface PasswordReset{
  password: string;
  token: string;
}

@Component({
  selector: 'app-password-reset',
  imports: [SharedModule,MaterialFormModule,MaterialButtonModule,MaterialLayoutModule],
  standalone: true,
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent extends BaseComponent  {
  authService=inject(AuthService);
  private cdRef = inject(ChangeDetectorRef);
  passwordHide=true;
  confirmHide=true;
  validToken=false;
  tokenMsg="";
  token:any;
  type:any;
  check:boolean=false;

  atleta:string|null=null;
  strongPasswordRegx: RegExp=/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[!@#$%^&*]).{6,}$/;

  form: FormGroup=this.formBuilder.group({
    senha: ['', [Validators.required, Validators.pattern(this.strongPasswordRegx)]],
    confirm: ['', [Validators.required,this.validateSamePassword]]
  });

  constructor(){
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.type = params.get('type');
      this.token = params.get('token');
      if (this.token!=null) {
        this.authService.passwordTokenCheck(this.token).subscribe({
          next: (response:any) => {
            this.atleta=response.nome.split(' ')[0];
            this.validToken = true;
            this.check=true;
            this.cdRef.detectChanges();
          },
          error: (error: HttpErrorResponse) => {
            this.validToken = false;
            this.check=true;
            this.cdRef.detectChanges();
          },
        });
      } else {
        this.validToken = false;
        this.check = true;
        this.cdRef.detectChanges();
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
