import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/User';
import {UserService} from '../user.service';

@Component({
  selector: 'register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  submitted: boolean;

  ngOnInit(): void {
    this.submitted = false;
  }

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      userId: [null, [Validators.required, Validators.minLength(2)]],
    });
  }

  get firstNameCtrl(): AbstractControl { return this.registerForm.get('firstName'); }
  get lastNameCtrl(): AbstractControl { return this.registerForm.get('lastName'); }
  get userIdCtrl(): AbstractControl { return this.registerForm.get('userId'); }

  submit(): void {
    this.user = {
      firstName: this.firstNameCtrl.value,
      lastName: this.lastNameCtrl.value,
      userId: this.userIdCtrl.value,
    };
    this.submitted = true;

    if (this.firstNameCtrl.valid && this.lastNameCtrl.valid && this.userIdCtrl.valid) {
      this.userService.getUser(this.userIdCtrl.value).subscribe(
        (user) => {
          if (user === null) {
            this.userService.createUser(this.user).subscribe(
              (savedUser) => {
                this.user = savedUser;
              });
          } else {
            alert('The User Id ' + this.userIdCtrl.value + ' is applied already.');
          }
        }
      );
    }
  }
}
