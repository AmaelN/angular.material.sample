import {model} from '../model';
import {IUserService} from '../services/userService';    

export class ContactPanelController{
    static $inject = ['userService', '$mdBottomSheet'];

    constructor(
        private userService: IUserService,
        private $mdBottomSheet :angular.material.IBottomSheetService){
        this.user = userService.selectedUser;
    }        

    user: model.User;

    actions = [
        { name:'Phone', icon :'phone'},
        { name:'Twitter', icon :'twitter'},
        { name:'Google+', icon :'google_plus'},
        { name:'Hangout', icon :'hangouts'},            
    ];

    submitContact(action):void{
        this.$mdBottomSheet.hide(action);
    }
}

// angular.module('contactManagerApp')
//     .controller('contactPanelController', ContactPanelController);
