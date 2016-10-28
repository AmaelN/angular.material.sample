(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var mainController_1 = require('./controller/mainController');
var userService_1 = require('./services/userService');
angular.module('contactManagerApp', ['ngMaterial', 'ngMdIcons', 'ngMessages']).service('userService', userService_1.default).controller('mainController', mainController_1.default).config(["$mdIconProvider", "$mdThemingProvider", function ($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider.defaultIconSet('./assets/svg/avatars.svg', 128).icon("google_plus", "./assets/svg/google_plus.svg", 512).icon("hangouts", "./assets/svg/hangouts.svg", 512).icon("twitter", "./assets/svg/twitter.svg", 512).icon("phone", "./assets/svg/phone.svg", 512);
    $mdThemingProvider.theme('default').primaryPalette('purple').accentPalette('orange');
}]).run(["$log", function ($log) {
    $log.debug("startApp running ");
}]);
// angular.bootstrap(document, ['contactManagerApp']);



},{"./controller/mainController":4,"./services/userService":6}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddUserDialogController = function () {
    function AddUserDialogController($mdDialog) {
        _classCallCheck(this, AddUserDialogController);

        this.$mdDialog = $mdDialog;
        this.avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
    }

    _createClass(AddUserDialogController, [{
        key: 'cancel',
        value: function cancel() {
            this.$mdDialog.cancel();
        }
    }, {
        key: 'save',
        value: function save() {
            this.$mdDialog.hide(this.user);
        }
    }]);

    return AddUserDialogController;
}();

AddUserDialogController.$inject = ['$mdDialog'];
exports.AddUserDialogController = AddUserDialogController;
// angular.module('contactManagerApp')
//     .controller('addUserDialogController', AddUserDialogController);



},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContactPanelController = function () {
    function ContactPanelController(userService, $mdBottomSheet) {
        _classCallCheck(this, ContactPanelController);

        this.userService = userService;
        this.$mdBottomSheet = $mdBottomSheet;
        this.actions = [{ name: 'Phone', icon: 'phone' }, { name: 'Twitter', icon: 'twitter' }, { name: 'Google+', icon: 'google_plus' }, { name: 'Hangout', icon: 'hangouts' }];
        this.user = userService.selectedUser;
    }

    _createClass(ContactPanelController, [{
        key: 'submitContact',
        value: function submitContact(action) {
            this.$mdBottomSheet.hide(action);
        }
    }]);

    return ContactPanelController;
}();

ContactPanelController.$inject = ['userService', '$mdBottomSheet'];
exports.ContactPanelController = ContactPanelController;
// angular.module('contactManagerApp')
//     .controller('contactPanelController', ContactPanelController);



},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var model_1 = require('../model');
var contactPanelController_1 = require('../controller/contactPanelController');
var addUserDialogController_1 = require('../controller/addUserDialogController');

var MainController = function () {
    function MainController(userService, $mdSidenav, $mdToast, $mdDialog, $mdMedia, $mdBottomSheet) {
        _classCallCheck(this, MainController);

        this.userService = userService;
        this.$mdSidenav = $mdSidenav;
        this.$mdToast = $mdToast;
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
        this.$mdBottomSheet = $mdBottomSheet;
        this.tabIndex = 0;
        this.searchText = "";
        this.users = [];
        this.selected = null;
        this.newNote = new model_1.model.Note('', null);
        var self = this;
        this.userService.loadAllUsers().then(function (x) {
            self.users = x;
            self.selected = x[0];
            self.userService.selectedUser = self.selected;
            console.log(self.users);
        });
    }

    _createClass(MainController, [{
        key: 'selectUser',
        value: function selectUser(user) {
            this.selected = user;
            this.userService.selectedUser = user;
            var sidenav = this.$mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }
            this.tabIndex = 0;
        }
    }, {
        key: 'setFormScope',
        value: function setFormScope(scope) {
            this.formScope = scope;
        }
    }, {
        key: 'addNote',
        value: function addNote() {
            this.selected.notes.push(this.newNote);
            // reset the form
            this.formScope.noteForm.$setUntouched();
            this.formScope.noteForm.$setPristine();
            this.newNote = new model_1.model.Note('', null);
            this.openToast("Note added");
        }
    }, {
        key: 'clearNotes',
        value: function clearNotes($event) {
            var confirm = this.$mdDialog.confirm().title("Are you sure you want to delete all notes?").textContent('All notes will be deleted, you can\'t undo this action.').targetEvent($event).ok("Yes").cancel("No");
            var self = this;
            this.$mdDialog.show(confirm).then(function () {
                self.selected.notes = [];
                self.openToast('Cleared notes');
            });
        }
    }, {
        key: 'showContactOptions',
        value: function showContactOptions($event) {
            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('wrapper')),
                templateUrl: 'view/contactSheet.html',
                controller: contactPanelController_1.ContactPanelController,
                controllerAs: "cp"
            }).then(function (clickedItem) {
                clickedItem && console.log(clickedItem.name + ' clicked!');
            });
        }
    }, {
        key: 'removeNote',
        value: function removeNote(note) {
            var foundIndex = this.selected.notes.indexOf(note);
            this.selected.notes.splice(foundIndex, 1);
            this.openToast("Note was removed");
        }
    }, {
        key: 'openToast',
        value: function openToast(message) {
            this.$mdToast.show(this.$mdToast.simple().textContent(message).position('top right').hideDelay(3000));
        }
    }, {
        key: 'toggleSideNav',
        value: function toggleSideNav() {
            this.$mdSidenav('left').toggle();
        }
    }, {
        key: 'addUser',
        value: function addUser($event) {
            var self = this;
            var useFullScreen = this.$mdMedia('sm') || this.$mdMedia('xs');
            this.$mdDialog.show({
                templateUrl: "view/newUserDialog.html",
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: addUserDialogController_1.AddUserDialogController,
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then(function (user) {
                var newUser = model_1.model.User.fromCreate(user);
                self.users.push(newUser);
                self.selectUser(newUser);
                self.openToast("User added");
            }, function () {
                console.log('You cancelled the dialog.');
            });
        }
    }]);

    return MainController;
}();

MainController.$inject = ['userService', '$mdSidenav', "$mdToast", "$mdDialog", "$mdMedia", "$mdBottomSheet"];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainController;
// angular.module('contactManagerApp')
//    .controller('mainController', MainController); 



},{"../controller/addUserDialogController":2,"../controller/contactPanelController":3,"../model":5}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var model;
(function (model) {
    var CreateUser = function CreateUser(firstName, lastName, avatar, bio) {
        _classCallCheck(this, CreateUser);

        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.bio = bio;
    };

    model.CreateUser = CreateUser;

    var User = function () {
        function User(name, avatar, bio, notes) {
            _classCallCheck(this, User);

            this.name = name;
            this.avatar = avatar;
            this.bio = bio;
            this.notes = notes;
        }

        _createClass(User, null, [{
            key: "fromCreate",
            value: function fromCreate(user) {
                return new User(user.firstName + ' ' + user.lastName, user.avatar, user.bio, []);
            }
        }]);

        return User;
    }();

    model.User = User;

    var Note = function Note(title, date) {
        _classCallCheck(this, Note);

        this.title = title;
        this.date = date;
    };

    model.Note = Note;
})(model = exports.model || (exports.model = {}));



},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function () {
    function UserService($q) {
        _classCallCheck(this, UserService);

        this.$q = $q;
        this.selectedUser = null;
        this.users = [{
            name: 'Adan Blur',
            avatar: 'svg-1',
            bio: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.',
            notes: [{ title: "Pay back dinner", date: new Date("2016-01-12") }, { title: "Buy flower", date: new Date("2016-01-19") }]
        }, {
            name: 'George Duke',
            avatar: 'svg-2',
            bio: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.',
            notes: []
        }, {
            name: 'Gener Delosreyes',
            avatar: 'svg-3',
            bio: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS.",
            notes: []
        }, {
            name: 'Lawrence Ray',
            avatar: 'svg-4',
            bio: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.',
            notes: []
        }, {
            name: 'Ernesto Urbina',
            avatar: 'svg-5',
            bio: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.',
            notes: []
        }, {
            name: 'Gani Ferrer',
            avatar: 'svg-6',
            bio: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada.",
            notes: []
        }];
    }

    _createClass(UserService, [{
        key: 'loadAllUsers',
        value: function loadAllUsers() {
            return this.$q.when(this.users);
        }
    }]);

    return UserService;
}();

UserService.$inject = ['$q'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserService;
// angular.module('contactManagerApp')
// .service('userService', UserService);



},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wXFxqc1xcYm9vdC5qcyIsIi50bXBcXGpzXFxjb250cm9sbGVyXFxhZGRVc2VyRGlhbG9nQ29udHJvbGxlci5qcyIsIi50bXBcXGpzXFxjb250cm9sbGVyXFxjb250YWN0UGFuZWxDb250cm9sbGVyLmpzIiwiLnRtcFxcanNcXGNvbnRyb2xsZXJcXG1haW5Db250cm9sbGVyLmpzIiwiLnRtcFxcanNcXG1vZGVsLmpzIiwiLnRtcFxcanNcXHNlcnZpY2VzXFx1c2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUNBLElBQU0sbUJBQW1CLFFBQVEsNkJBQVIsQ0FBekI7QUFDQSxJQUFNLGdCQUFnQixRQUFRLHdCQUFSLENBQXRCO0FBQ0EsUUFBUSxNQUFSLENBQWUsbUJBQWYsRUFBb0MsQ0FDaEMsWUFEZ0MsRUFFaEMsV0FGZ0MsRUFHaEMsWUFIZ0MsQ0FBcEMsRUFLSyxPQUxMLENBS2EsYUFMYixFQUs0QixjQUFjLE9BTDFDLEVBTUssVUFOTCxDQU1nQixnQkFOaEIsRUFNa0MsaUJBQWlCLE9BTm5ELEVBT0ssTUFQTCxDQU9ZLFVBQUMsZUFBRCxFQUFrQixrQkFBbEIsRUFBeUM7QUFDakQsb0JBQ0ssY0FETCxDQUNvQiwwQkFEcEIsRUFDZ0QsR0FEaEQsRUFFSyxJQUZMLENBRVUsYUFGVixFQUV5Qiw4QkFGekIsRUFFeUQsR0FGekQsRUFHSyxJQUhMLENBR1UsVUFIVixFQUdzQiwyQkFIdEIsRUFHbUQsR0FIbkQsRUFJSyxJQUpMLENBSVUsU0FKVixFQUlxQiwwQkFKckIsRUFJaUQsR0FKakQsRUFLSyxJQUxMLENBS1UsT0FMVixFQUttQix3QkFMbkIsRUFLNkMsR0FMN0M7QUFNQSx1QkFBbUIsS0FBbkIsQ0FBeUIsU0FBekIsRUFDSyxjQURMLENBQ29CLFFBRHBCLEVBRUssYUFGTCxDQUVtQixRQUZuQjtBQUdILENBakJELEVBa0JLLEdB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QkFBTSxnQkFEVjtBQUVJLG9CQUFRLE9BRlo7QUFHSSxpQkFBSyxpTUFIVDtBQUlJLG1CQUFPO0FBSlgsU0E1QlMsRUFrQ1Q7QUFDSSxrQkFBTSxhQURWO0FBRUksb0JBQVEsT0FGWjtBQUdJLGlCQUFLLDJaQUhUO0FBSUksbUJBQU87QUFKWCxTQWxDUyxDQUFiO0FBeUNIOzs7O3VDQUNjO0FBQ1gsbUJBQU8sS0FBSyxFQUFMLENBQVEsSUFBUixDQUFhLEtBQUssS0FBbEIsQ0FBUDtBQUNIOzs7Ozs7QUFFTCxZQUFZLE9BQVosR0FBc0IsQ0FBQyxJQUFELENBQXRCO0FBQ0EsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEVBQUUsT0FBTyxJQUFULEVBQTdDO0FBQ0EsUUFBUSxPQUFSLEdBQWtCLFdBQWxCO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IG1haW5Db250cm9sbGVyXzEgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvbWFpbkNvbnRyb2xsZXInKTtcbmNvbnN0IHVzZXJTZXJ2aWNlXzEgPSByZXF1aXJlKCcuL3NlcnZpY2VzL3VzZXJTZXJ2aWNlJyk7XG5hbmd1bGFyLm1vZHVsZSgnY29udGFjdE1hbmFnZXJBcHAnLCBbXG4gICAgJ25nTWF0ZXJpYWwnLFxuICAgICduZ01kSWNvbnMnLFxuICAgICduZ01lc3NhZ2VzJ1xuXSlcbiAgICAuc2VydmljZSgndXNlclNlcnZpY2UnLCB1c2VyU2VydmljZV8xLmRlZmF1bHQpXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgbWFpbkNvbnRyb2xsZXJfMS5kZWZhdWx0KVxuICAgIC5jb25maWcoKCRtZEljb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyKSA9PiB7XG4gICAgJG1kSWNvblByb3ZpZGVyXG4gICAgICAgIC5kZWZhdWx0SWNvblNldCgnLi9hc3NldHMvc3ZnL2F2YXRhcnMuc3ZnJywgMTI4KVxuICAgICAgICAuaWNvbihcImdvb2dsZV9wbHVzXCIsIFwiLi9hc3NldHMvc3ZnL2dvb2dsZV9wbHVzLnN2Z1wiLCA1MTIpXG4gICAgICAgIC5pY29uKFwiaGFuZ291dHNcIiwgXCIuL2Fzc2V0cy9zdmcvaGFuZ291dHMuc3ZnXCIsIDUxMilcbiAgICAgICAgLmljb24oXCJ0d2l0dGVyXCIsIFwiLi9hc3NldHMvc3ZnL3R3aXR0ZXIuc3ZnXCIsIDUxMilcbiAgICAgICAgLmljb24oXCJwaG9uZVwiLCBcIi4vYXNzZXRzL3N2Zy9waG9uZS5zdmdcIiwgNTEyKTtcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxuICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ3B1cnBsZScpXG4gICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKTtcbn0pXG4gICAgLnJ1bihmdW5jdGlvbiAoJGxvZykge1xuICAgICRsb2cuZGVidWcoXCJzdGFydEFwcCBydW5uaW5nIFwiKTtcbn0pO1xuLy8gYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnY29udGFjdE1hbmFnZXJBcHAnXSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb3QuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbmNsYXNzIEFkZFVzZXJEaWFsb2dDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigkbWREaWFsb2cpIHtcbiAgICAgICAgdGhpcy4kbWREaWFsb2cgPSAkbWREaWFsb2c7XG4gICAgICAgIHRoaXMuYXZhdGFycyA9IFtcbiAgICAgICAgICAgICdzdmctMScsICdzdmctMicsICdzdmctMycsICdzdmctNCdcbiAgICAgICAgXTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLiRtZERpYWxvZy5jYW5jZWwoKTtcbiAgICB9XG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuaGlkZSh0aGlzLnVzZXIpO1xuICAgIH1cbn1cbkFkZFVzZXJEaWFsb2dDb250cm9sbGVyLiRpbmplY3QgPSBbJyRtZERpYWxvZyddO1xuZXhwb3J0cy5BZGRVc2VyRGlhbG9nQ29udHJvbGxlciA9IEFkZFVzZXJEaWFsb2dDb250cm9sbGVyO1xuLy8gYW5ndWxhci5tb2R1bGUoJ2NvbnRhY3RNYW5hZ2VyQXBwJylcbi8vICAgICAuY29udHJvbGxlcignYWRkVXNlckRpYWxvZ0NvbnRyb2xsZXInLCBBZGRVc2VyRGlhbG9nQ29udHJvbGxlcik7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZFVzZXJEaWFsb2dDb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jbGFzcyBDb250YWN0UGFuZWxDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1c2VyU2VydmljZSwgJG1kQm90dG9tU2hlZXQpIHtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICB0aGlzLiRtZEJvdHRvbVNoZWV0ID0gJG1kQm90dG9tU2hlZXQ7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ1Bob25lJywgaWNvbjogJ3Bob25lJyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnVHdpdHRlcicsIGljb246ICd0d2l0dGVyJyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnR29vZ2xlKycsIGljb246ICdnb29nbGVfcGx1cycgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ0hhbmdvdXQnLCBpY29uOiAnaGFuZ291dHMnIH0sXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMudXNlciA9IHVzZXJTZXJ2aWNlLnNlbGVjdGVkVXNlcjtcbiAgICB9XG4gICAgc3VibWl0Q29udGFjdChhY3Rpb24pIHtcbiAgICAgICAgdGhpcy4kbWRCb3R0b21TaGVldC5oaWRlKGFjdGlvbik7XG4gICAgfVxufVxuQ29udGFjdFBhbmVsQ29udHJvbGxlci4kaW5qZWN0ID0gWyd1c2VyU2VydmljZScsICckbWRCb3R0b21TaGVldCddO1xuZXhwb3J0cy5Db250YWN0UGFuZWxDb250cm9sbGVyID0gQ29udGFjdFBhbmVsQ29udHJvbGxlcjtcbi8vIGFuZ3VsYXIubW9kdWxlKCdjb250YWN0TWFuYWdlckFwcCcpXG4vLyAgICAgLmNvbnRyb2xsZXIoJ2NvbnRhY3RQYW5lbENvbnRyb2xsZXInLCBDb250YWN0UGFuZWxDb250cm9sbGVyKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGFjdFBhbmVsQ29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoJy4uL21vZGVsJyk7XG5jb25zdCBjb250YWN0UGFuZWxDb250cm9sbGVyXzEgPSByZXF1aXJlKCcuLi9jb250cm9sbGVyL2NvbnRhY3RQYW5lbENvbnRyb2xsZXInKTtcbmNvbnN0IGFkZFVzZXJEaWFsb2dDb250cm9sbGVyXzEgPSByZXF1aXJlKCcuLi9jb250cm9sbGVyL2FkZFVzZXJEaWFsb2dDb250cm9sbGVyJyk7XG5jbGFzcyBNYWluQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IodXNlclNlcnZpY2UsICRtZFNpZGVuYXYsICRtZFRvYXN0LCAkbWREaWFsb2csICRtZE1lZGlhLCAkbWRCb3R0b21TaGVldCkge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgIHRoaXMuJG1kU2lkZW5hdiA9ICRtZFNpZGVuYXY7XG4gICAgICAgIHRoaXMuJG1kVG9hc3QgPSAkbWRUb2FzdDtcbiAgICAgICAgdGhpcy4kbWREaWFsb2cgPSAkbWREaWFsb2c7XG4gICAgICAgIHRoaXMuJG1kTWVkaWEgPSAkbWRNZWRpYTtcbiAgICAgICAgdGhpcy4kbWRCb3R0b21TaGVldCA9ICRtZEJvdHRvbVNoZWV0O1xuICAgICAgICB0aGlzLnRhYkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gXCJcIjtcbiAgICAgICAgdGhpcy51c2VycyA9IFtdO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXdOb3RlID0gbmV3IG1vZGVsXzEubW9kZWwuTm90ZSgnJywgbnVsbCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy51c2VyU2VydmljZVxuICAgICAgICAgICAgLmxvYWRBbGxVc2VycygpXG4gICAgICAgICAgICAudGhlbigoeCkgPT4ge1xuICAgICAgICAgICAgc2VsZi51c2VycyA9IHg7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkID0geFswXTtcbiAgICAgICAgICAgIHNlbGYudXNlclNlcnZpY2Uuc2VsZWN0ZWRVc2VyID0gc2VsZi5zZWxlY3RlZDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYudXNlcnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2VsZWN0VXNlcih1c2VyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB1c2VyO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnNlbGVjdGVkVXNlciA9IHVzZXI7XG4gICAgICAgIHZhciBzaWRlbmF2ID0gdGhpcy4kbWRTaWRlbmF2KCdsZWZ0Jyk7XG4gICAgICAgIGlmIChzaWRlbmF2LmlzT3BlbigpKSB7XG4gICAgICAgICAgICBzaWRlbmF2LmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWJJbmRleCA9IDA7XG4gICAgfVxuICAgIHNldEZvcm1TY29wZShzY29wZSkge1xuICAgICAgICB0aGlzLmZvcm1TY29wZSA9IHNjb3BlO1xuICAgIH1cbiAgICBhZGROb3RlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLm5vdGVzLnB1c2godGhpcy5uZXdOb3RlKTtcbiAgICAgICAgLy8gcmVzZXQgdGhlIGZvcm1cbiAgICAgICAgdGhpcy5mb3JtU2NvcGUubm90ZUZvcm0uJHNldFVudG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmZvcm1TY29wZS5ub3RlRm9ybS4kc2V0UHJpc3RpbmUoKTtcbiAgICAgICAgdGhpcy5uZXdOb3RlID0gbmV3IG1vZGVsXzEubW9kZWwuTm90ZSgnJywgbnVsbCk7XG4gICAgICAgIHRoaXMub3BlblRvYXN0KFwiTm90ZSBhZGRlZFwiKTtcbiAgICB9XG4gICAgY2xlYXJOb3RlcygkZXZlbnQpIHtcbiAgICAgICAgdmFyIGNvbmZpcm0gPSB0aGlzLiRtZERpYWxvZy5jb25maXJtKClcbiAgICAgICAgICAgIC50aXRsZShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgYWxsIG5vdGVzP1wiKVxuICAgICAgICAgICAgLnRleHRDb250ZW50KCdBbGwgbm90ZXMgd2lsbCBiZSBkZWxldGVkLCB5b3UgY2FuXFwndCB1bmRvIHRoaXMgYWN0aW9uLicpXG4gICAgICAgICAgICAudGFyZ2V0RXZlbnQoJGV2ZW50KVxuICAgICAgICAgICAgLm9rKFwiWWVzXCIpXG4gICAgICAgICAgICAuY2FuY2VsKFwiTm9cIik7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuc2hvdyhjb25maXJtKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWQubm90ZXMgPSBbXTtcbiAgICAgICAgICAgIHNlbGYub3BlblRvYXN0KCdDbGVhcmVkIG5vdGVzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaG93Q29udGFjdE9wdGlvbnMoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuJG1kQm90dG9tU2hlZXQuc2hvdyh7XG4gICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpKSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlldy9jb250YWN0U2hlZXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBjb250YWN0UGFuZWxDb250cm9sbGVyXzEuQ29udGFjdFBhbmVsQ29udHJvbGxlcixcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJjcFwiLFxuICAgICAgICB9KS50aGVuKChjbGlja2VkSXRlbSkgPT4ge1xuICAgICAgICAgICAgY2xpY2tlZEl0ZW0gJiYgY29uc29sZS5sb2coY2xpY2tlZEl0ZW0ubmFtZSArICcgY2xpY2tlZCEnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZU5vdGUobm90ZSkge1xuICAgICAgICB2YXIgZm91bmRJbmRleCA9IHRoaXMuc2VsZWN0ZWQubm90ZXMuaW5kZXhPZihub3RlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5ub3Rlcy5zcGxpY2UoZm91bmRJbmRleCwgMSk7XG4gICAgICAgIHRoaXMub3BlblRvYXN0KFwiTm90ZSB3YXMgcmVtb3ZlZFwiKTtcbiAgICB9XG4gICAgb3BlblRvYXN0KG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy4kbWRUb2FzdC5zaG93KHRoaXMuJG1kVG9hc3Quc2ltcGxlKClcbiAgICAgICAgICAgIC50ZXh0Q29udGVudChtZXNzYWdlKVxuICAgICAgICAgICAgLnBvc2l0aW9uKCd0b3AgcmlnaHQnKVxuICAgICAgICAgICAgLmhpZGVEZWxheSgzMDAwKSk7XG4gICAgfVxuICAgIHRvZ2dsZVNpZGVOYXYoKSB7XG4gICAgICAgIHRoaXMuJG1kU2lkZW5hdignbGVmdCcpLnRvZ2dsZSgpO1xuICAgIH1cbiAgICBhZGRVc2VyKCRldmVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1c2VGdWxsU2NyZWVuID0gKHRoaXMuJG1kTWVkaWEoJ3NtJykgfHwgdGhpcy4kbWRNZWRpYSgneHMnKSk7XG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLnNob3coe1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlldy9uZXdVc2VyRGlhbG9nLmh0bWxcIixcbiAgICAgICAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6ICRldmVudCxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGFkZFVzZXJEaWFsb2dDb250cm9sbGVyXzEuQWRkVXNlckRpYWxvZ0NvbnRyb2xsZXIsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjdHJsJyxcbiAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB1c2VGdWxsU2NyZWVuXG4gICAgICAgIH0pLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICAgIHZhciBuZXdVc2VyID0gbW9kZWxfMS5tb2RlbC5Vc2VyLmZyb21DcmVhdGUodXNlcik7XG4gICAgICAgICAgICBzZWxmLnVzZXJzLnB1c2gobmV3VXNlcik7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdFVzZXIobmV3VXNlcik7XG4gICAgICAgICAgICBzZWxmLm9wZW5Ub2FzdChcIlVzZXIgYWRkZWRcIik7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2FuY2VsbGVkIHRoZSBkaWFsb2cuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXG4gICAgJ3VzZXJTZXJ2aWNlJyxcbiAgICAnJG1kU2lkZW5hdicsXG4gICAgXCIkbWRUb2FzdFwiLFxuICAgIFwiJG1kRGlhbG9nXCIsXG4gICAgXCIkbWRNZWRpYVwiLFxuICAgIFwiJG1kQm90dG9tU2hlZXRcIl07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBNYWluQ29udHJvbGxlcjtcbi8vIGFuZ3VsYXIubW9kdWxlKCdjb250YWN0TWFuYWdlckFwcCcpXG4vLyAgICAuY29udHJvbGxlcignbWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7IFxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluQ29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIG1vZGVsO1xuKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgIGNsYXNzIENyZWF0ZVVzZXIge1xuICAgICAgICBjb25zdHJ1Y3RvcihmaXJzdE5hbWUsIGxhc3ROYW1lLCBhdmF0YXIsIGJpbykge1xuICAgICAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWU7XG4gICAgICAgICAgICB0aGlzLmF2YXRhciA9IGF2YXRhcjtcbiAgICAgICAgICAgIHRoaXMuYmlvID0gYmlvO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vZGVsLkNyZWF0ZVVzZXIgPSBDcmVhdGVVc2VyO1xuICAgIGNsYXNzIFVzZXIge1xuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lLCBhdmF0YXIsIGJpbywgbm90ZXMpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLmF2YXRhciA9IGF2YXRhcjtcbiAgICAgICAgICAgIHRoaXMuYmlvID0gYmlvO1xuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBmcm9tQ3JlYXRlKHVzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVXNlcih1c2VyLmZpcnN0TmFtZSArICcgJyArIHVzZXIubGFzdE5hbWUsIHVzZXIuYXZhdGFyLCB1c2VyLmJpbywgW10pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vZGVsLlVzZXIgPSBVc2VyO1xuICAgIGNsYXNzIE5vdGUge1xuICAgICAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtb2RlbC5Ob3RlID0gTm90ZTtcbn0pKG1vZGVsID0gZXhwb3J0cy5tb2RlbCB8fCAoZXhwb3J0cy5tb2RlbCA9IHt9KSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZGVsLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jbGFzcyBVc2VyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoJHEpIHtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVXNlciA9IG51bGw7XG4gICAgICAgIHRoaXMudXNlcnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0FkYW4gQmx1cicsXG4gICAgICAgICAgICAgICAgYXZhdGFyOiAnc3ZnLTEnLFxuICAgICAgICAgICAgICAgIGJpbzogJ0kgbG92ZSBjaGVlc2UsIGVzcGVjaWFsbHkgYWlyZWRhbGUgcXVlc28uIENoZWVzZSBhbmQgYmlzY3VpdHMgaGFsbG91bWkgY2F1bGlmbG93ZXIgY2hlZXNlIGNvdHRhZ2UgY2hlZXNlIHN3aXNzIGJvdXJzaW4gZm9uZHVlIGNhZXJwaGlsbHkuIENvdyBwb3J0LXNhbHV0IGNhbWVtYmVydCBkZSBub3JtYW5kaWUgbWFjYXJvbmkgY2hlZXNlIGZldGEgd2hvIG1vdmVkIG15IGNoZWVzZSBiYWJ5YmVsIGJvdXJzaW4uIFJlZCBsZWljZXN0ZXIgcm9xdWVmb3J0IGJvdXJzaW4gc3F1aXJ0eSBjaGVlc2UgamFybHNiZXJnIGJsdWUgY2FzdGVsbG8gY2FlcnBoaWxseSBjaGFsayBhbmQgY2hlZXNlLiBMYW5jYXNoaXJlLicsXG4gICAgICAgICAgICAgICAgbm90ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0aXRsZTogXCJQYXkgYmFjayBkaW5uZXJcIiwgZGF0ZTogbmV3IERhdGUoXCIyMDE2LTAxLTEyXCIpIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiQnV5IGZsb3dlclwiLCBkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDEtMTlcIikgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnR2VvcmdlIER1a2UnLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogJ3N2Zy0yJyxcbiAgICAgICAgICAgICAgICBiaW86ICdab21iaWUgaXBzdW0gcmV2ZXJzdXMgYWIgdmlyYWwgaW5mZXJubywgbmFtIHJpY2sgZ3JpbWVzIG1hbHVtIGNlcmVicm8uIERlIGNhcm5lIGx1bWJlcmluZyBhbmltYXRhIGNvcnBvcmEgcXVhZXJpdGlzLiBTdW1tdXMgYnJhaW5zIHNpdOKAi+KAiywgbW9yYm8gdmVsIG1hbGVmaWNpYT8gRGUgYXBvY2FseXBzaSBnb3JnZXIgb21lcm8gdW5kZWFkIHN1cnZpdm9yIGRpY3R1bSBtYXVyaXMuJyxcbiAgICAgICAgICAgICAgICBub3RlczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdHZW5lciBEZWxvc3JleWVzJyxcbiAgICAgICAgICAgICAgICBhdmF0YXI6ICdzdmctMycsXG4gICAgICAgICAgICAgICAgYmlvOiBcIlJhdyBkZW5pbSBwb3VyLW92ZXIgcmVhZHltYWRlIEV0c3kgUGl0Y2hmb3JrLiBGb3VyIGRvbGxhciB0b2FzdCBwaWNrbGVkIGxvY2F2b3JlIGJpdHRlcnMgTWNTd2VlbmV5J3MgYmxvZy4gVHJ5LWhhcmQgYXJ0IHBhcnR5IFNob3JlZGl0Y2ggc2VsZmllcy4gT2RkIEZ1dHVyZSBidXRjaGVyIFZIUywgZGlzcnVwdCBwb3AtdXAgVGh1bmRlcmNhdHMgY2hpbGx3YXZlIHZpbnlsIGplYW4gc2hvcnRzIHRheGlkZXJteSBtYXN0ZXIgY2xlYW5zZSBsZXR0ZXJwcmVzcyBXZXMgQW5kZXJzb24gbXVzdGFjaGUgSGVsdmV0aWNhLiBTY2hsaXR6IGJpY3ljbGUgcmlnaHRzIGNoaWxsd2F2ZSBpcm9ueSBsdW1iZXJodW5ncnkgS2lja3N0YXJ0ZXIgbmV4dCBsZXZlbCBzcmlyYWNoYSB0eXBld3JpdGVyIEludGVsbGlnZW50c2lhLCBtaWdhcyBrb2dpIGhlaXJsb29tIHRvdXNsZWQuIERpc3J1cHQgMyB3b2xmIG1vb24gbG9tbyBmb3VyIGxva28uIFB1ZyBtbGtzaGsgZmFubnkgcGFjayBsaXRlcmFsbHkgaG9vZGllIGJlc3Bva2UsIHB1dCBhIGJpcmQgb24gaXQgTWFyZmEgbWVzc2VuZ2VyIGJhZyBrb2dpIFZIUy5cIixcbiAgICAgICAgICAgICAgICBub3RlczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdMYXdyZW5jZSBSYXknLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogJ3N2Zy00JyxcbiAgICAgICAgICAgICAgICBiaW86ICdTY3JhdGNoIHRoZSBmdXJuaXR1cmUgc3BpdCB1cCBvbiBsaWdodCBncmF5IGNhcnBldCBpbnN0ZWFkIG9mIGFkamFjZW50IGxpbm9sZXVtIHNvIGVhdCBhIHBsYW50LCBraWxsIGEgaGFuZCBwZWx0IGFyb3VuZCB0aGUgaG91c2UgYW5kIHVwIGFuZCBkb3duIHN0YWlycyBjaGFzaW5nIHBoYW50b21zIHJ1biBpbiBjaXJjbGVzLCBvciBjbGF3IGRyYXBlcy4gQWx3YXlzIGh1bmdyeSBwZWx0IGFyb3VuZCB0aGUgaG91c2UgYW5kIHVwIGFuZCBkb3duIHN0YWlycyBjaGFzaW5nIHBoYW50b21zLicsXG4gICAgICAgICAgICAgICAgbm90ZXM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnRXJuZXN0byBVcmJpbmEnLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogJ3N2Zy01JyxcbiAgICAgICAgICAgICAgICBiaW86ICdXZWJ0d28gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGVza29ibyBjaHVtYnkgZG9vc3RhbmcgYmViby4gQnViYmxpIGdyZXBsaW4gc3R5cGkgcHJlemkgbXppbmdhIGhlcm9rdSB3YWtvb3BhLCBzaG9waWZ5IGFpcmJuYiBkb2dzdGVyIGRvcHBsciBnb29ydSBqdW1vLCByZWRkaXQgcGxpY2tlcnMgZWRtb2RvIHN0eXBpIHppbGxvdyBldHN5LicsXG4gICAgICAgICAgICAgICAgbm90ZXM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnR2FuaSBGZXJyZXInLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogJ3N2Zy02JyxcbiAgICAgICAgICAgICAgICBiaW86IFwiTGVib3dza2kgaXBzdW0geWVhaD8gV2hhdCBkbyB5b3UgdGhpbmsgaGFwcGVucyB3aGVuIHlvdSBnZXQgcmFkPyBZb3UgdHVybiBpbiB5b3VyIGxpYnJhcnkgY2FyZD8gR2V0IGEgbmV3IGRyaXZlcidzIGxpY2Vuc2U/IFN0b3AgYmVpbmcgYXdlc29tZT8gRG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCBwcmFlc2VudCBhYyBtYWduYSBqdXN0byBwZWxsZW50ZXNxdWUgYWMgbGVjdHVzLiBZb3UgZG9uJ3QgZ28gb3V0IGFuZCBtYWtlIGEgbGl2aW5nIGRyZXNzZWQgbGlrZSB0aGF0IGluIHRoZSBtaWRkbGUgb2YgYSB3ZWVrZGF5LiBRdWlzIGVsaXQgYmxhbmRpdCBmcmluZ2lsbGEgYSB1dCB0dXJwaXMgcHJhZXNlbnQgZmVsaXMgbGlndWxhLCBtYWxlc3VhZGEgc3VzY2lwaXQgbWFsZXN1YWRhLlwiLFxuICAgICAgICAgICAgICAgIG5vdGVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuICAgIGxvYWRBbGxVc2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHEud2hlbih0aGlzLnVzZXJzKTtcbiAgICB9XG59XG5Vc2VyU2VydmljZS4kaW5qZWN0ID0gWyckcSddO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gVXNlclNlcnZpY2U7XG4vLyBhbmd1bGFyLm1vZHVsZSgnY29udGFjdE1hbmFnZXJBcHAnKVxuLy8gLnNlcnZpY2UoJ3VzZXJTZXJ2aWNlJywgVXNlclNlcnZpY2UpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyU2VydmljZS5qcy5tYXBcbiJdfQ==
