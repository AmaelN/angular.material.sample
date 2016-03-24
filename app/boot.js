var ContactManagerApp;
(function (ContactManagerApp) {
    angular
        .module('contactManagerApp', [
        'ngMaterial',
        'ngMdIcons',
        'ngMessages'
    ])
        .service('userService', ContactManagerApp.UserService)
        .controller('mainController', ContactManagerApp.MainController)
        .config(function ($mdIconProvider, $mdThemingProvider) {
        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);
        $mdThemingProvider.theme('default')
            .primaryPalette('purple')
            .accentPalette('orange');
    })
        .run(function ($log) {
        $log.debug("startApp running ");
    });
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=boot.js.map