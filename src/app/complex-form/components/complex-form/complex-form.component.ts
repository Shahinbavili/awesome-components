import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith, tap} from "rxjs/operators";
import {ComplexFormService} from "../../services/complex-form.service";
import {confirmEqualValidator} from "../../validators/confirm-equal.validator";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;
  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private complexFormService: ComplexFormService) {
  }

  ngOnInit(): void {
    this.initMainControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }

  private initMainControls() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this.formBuilder.control('email');
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')]
    });
    this.phoneCtrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')]
    })
  }

  private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith<string, string>(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl))
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith<string, string>(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
    );
  }

  setEmailValidators(showEmailCtrl: boolean) {
    if (showEmailCtrl) {
      this.emailCtrl.addValidators([
        Validators.required,
        Validators.email
      ]);
      this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email
      ]);
    } else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  };

  setPhoneValidators(showPhoneCtrl: boolean) {
    if (showPhoneCtrl) {
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
      ]);
    } else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ esr requis';
    } else if (ctrl.hasError('email')) {
      return 'Merci d\'entrer une adresse e-mail valide';
    } else if (ctrl.hasError('pattern')) {
      return 'Ce numéro de téléphone doit contenir uniquement des chiffres';
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  onSubmitForm() {
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          //user saved successfully
          this.resetForm()
        } else {
          //user not saved: error case
          console.error('Echec de l\'enregistrement')
        }
      })
    ).subscribe();
  }

  private resetForm() {
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
  }

}

