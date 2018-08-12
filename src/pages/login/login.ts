import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  toast: any;

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, toastCtl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.toast = toastCtl;
  }

  async login(user: User) {
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result) {
        this.navCtrl.setRoot('ProfilePage')
      }
    }
    catch(e){
      this.toast.create({
        message: `Incorrect Email or Password.`,
        duration: 3000
      }).present();
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }
}
