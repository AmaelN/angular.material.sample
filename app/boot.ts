
import MainController from './controller/mainController';
import UserService from './services/userService';

    angular.module('contactManagerApp', [
                'ngMaterial',
                'ngMdIcons',
                'ngMessages'
          ])
          .service('userService', UserService)
          .controller('mainController', MainController)
          .config(($mdIconProvider: angular.material.IIconProvider,
              $mdThemingProvider: angular.material.IThemingProvider
              )=>{

             $mdIconProvider
                .defaultIconSet('./assets/svg/avatars.svg',128)
                .icon("google_plus", "./assets/svg/google_plus.svg",512)
                .icon("hangouts", "./assets/svg/hangouts.svg",512)
                .icon("twitter", "./assets/svg/twitter.svg",512)
                .icon("phone", "./assets/svg/phone.svg",512)
             
             $mdThemingProvider.theme('default')
                .primaryPalette('purple')
                .accentPalette('orange');
          })
           .run(function($log){
             $log.debug("startApp running ");
           });
   // angular.bootstrap(document, ['contactManagerApp']);
