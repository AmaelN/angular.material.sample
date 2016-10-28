import {model} from '../model';

export class AddUserDialogController{

    user : model.CreateUser;

    static $inject = ['$mdDialog'];
    
    constructor(private $mdDialog: angular.material.IDialogService) { }
    
    avatars =[
        'svg-1','svg-2','svg-3','svg-4'
    ]
    
    cancel():void {
        this.$mdDialog.cancel();
    }
    
    save():void {
        this.$mdDialog.hide( this.user);
    }
}

// angular.module('contactManagerApp')
//     .controller('addUserDialogController', AddUserDialogController);
