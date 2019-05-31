import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  public url: string;
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'user/upload',
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: "Sube tu avatar de usuario",
  };

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes de usuario'
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

    // Rellenar objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image);
  }

  ngOnInit() {

  }

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if (response && response.status) {
          this.status = 'success';
          console.log(response)
          let changes = response.changes;
          // Actualizar usuario en sesión
          if (changes.name) {
            this.user.name = changes.name;
          }

          if (changes.surname) {
            this.user.surname = changes.surname;
          }

          if (changes.email) {
            this.user.email = changes.email;
          }

          if (changes.description) {
            this.user.description = changes.description;
          }

          if (changes.image) {
            this.user.image = changes.image;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }
}
