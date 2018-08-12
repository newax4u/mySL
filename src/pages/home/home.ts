import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item/item.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from '../../models/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  profileData: Observable<Profile>;
  
  constructor(private afAuth: AngularFireAuth, private afDatabse: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController, private shopping: ShoppingListService) {
    this.afAuth.authState.subscribe(data => {
      if((this.navCtrl.getPrevious() == null) && data && data.email && data.uid) {
        this.toast.create({
          message: `Wellcome to ShoppingList, ${data.email}`,
          duration: 3000
        }).present();

        this.profileData = this.afDatabse.object(`profile/${data.uid}`).valueChanges();
        console.log(this.profileData);
      }
      else {
        this.toast.create({
          message: `Could not find authentication detail.`,
          duration: 3000
        }).present();
      }
    });

    this.shoppingList$ = this.shopping
      .getShoppingList() // DB List
      .snapshotChanges() //Key and Value
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, 
          ...c.payload.val()
        }));
      })
  }

  //{
  //  key: 'value-here',
  //  name: 'iPad Pro'
  //}
}
