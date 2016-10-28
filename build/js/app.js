(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var mainController_1 = require('./controller/mainController');
var userService_1 = require('./services/userService');
angular.module('contactManagerApp', ['ngMaterial', 'ngMdIcons', 'ngMessages']).service('userService', userService_1.default).controller('mainController', mainController_1.default).config(["$mdIconProvider", "$mdThemingProvider", function ($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider.defaultIconSet('./assets/svg/avatars.svg', 128).icon("google_plus", "./assets/svg/google_plus.svg", 512).icon("hangouts", "./assets/svg/hangouts.svg", 512).icon("twitter", "./assets/svg/twitter.svg", 512).icon("phone", "./assets/svg/phone.svg", 512);
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('red');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wXFxqc1xcYm9vdC5qcyIsIi50bXBcXGpzXFxjb250cm9sbGVyXFxhZGRVc2VyRGlhbG9nQ29udHJvbGxlci5qcyIsIi50bXBcXGpzXFxjb250cm9sbGVyXFxjb250YWN0UGFuZWxDb250cm9sbGVyLmpzIiwiLnRtcFxcanNcXGNvbnRyb2xsZXJcXG1haW5Db250cm9sbGVyLmpzIiwiLnRtcFxcanNcXG1vZGVsLmpzIiwiLnRtcFxcanNcXHNlcnZpY2VzXFx1c2VyU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUNBLElBQU0sbUJBQW1CLFFBQVEsNkJBQVIsQ0FBekI7QUFDQSxJQUFNLGdCQUFnQixRQUFRLHdCQUFSLENBQXRCO0FBQ0EsUUFBUSxNQUFSLENBQWUsbUJBQWYsRUFBb0MsQ0FDaEMsWUFEZ0MsRUFFaEMsV0FGZ0MsRUFHaEMsWUFIZ0MsQ0FBcEMsRUFLSyxPQUxMLENBS2EsYUFMYixFQUs0QixjQUFjLE9BTDFDLEVBTUssVUFOTCxDQU1nQixnQkFOaEIsRUFNa0MsaUJBQWlCLE9BTm5ELEVBT0ssTUFQTCxDQU9ZLFVBQUMsZUFBRCxFQUFrQixrQkFBbEIsRUFBeUM7QUFDakQsb0JBQ0ssY0FETCxDQUNvQiwwQkFEcEIsRUFDZ0QsR0FEaEQsRUFFSyxJQUZMLENBRVUsYUFGVixFQUV5Qiw4QkFGekIsRUFFeUQsR0FGekQsRUFHSyxJQUhMLENBR1UsVUFIVixFQUdzQiwyQkFIdEIsRUFHbUQsR0FIbkQsRUFJSyxJQUpMLENBSVUsU0FKVixFQUlxQiwwQkFKckIsRUFJaUQsR0FKakQsRUFLSyxJQUxMLENBS1UsT0FMVixFQUttQix3QkFMbkIsRUFLNkMsR0FMN0M7QUFNQSx1QkFBbUIsS0FBbkIsQ0FBeUIsU0FBekIsRUFDSyxjQURMLENBQ29CLE1BRHBCLEVBRUssYUFGTCxDQUVtQixLQUZuQjtBQUdILENBakJELEVBa0JLLEdB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QkFBTSxnQkFEVjtBQUVJLG9CQUFRLE9BRlo7QUFHSSxpQkFBSyxpTUFIVDtBQUlJLG1CQUFPO0FBSlgsU0E1QlMsRUFrQ1Q7QUFDSSxrQkFBTSxhQURWO0FBRUksb0JBQVEsT0FGWjtBQUdJLGlCQUFLLDJaQUhUO0FBSUksbUJBQU87QUFKWCxTQWxDUyxDQUFiO0FBeUNIOzs7O3VDQUNjO0FBQ1gsbUJBQU8sS0FBSyxFQUFMLENBQVEsSUFBUixDQUFhLEtBQUssS0FBbEIsQ0FBUDtBQUNIOzs7Ozs7QUFFTCxZQUFZLE9BQVosR0FBc0IsQ0FBQyxJQUFELENBQXRCO0FBQ0EsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEVBQUUsT0FBTyxJQUFULEVBQTdDO0FBQ0EsUUFBUSxPQUFSLEdBQWtCLFdBQWxCO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IG1haW5Db250cm9sbGVyXzEgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvbWFpbkNvbnRyb2xsZXInKTtcbmNvbnN0IHVzZXJTZXJ2aWNlXzEgPSByZXF1aXJlKCcuL3NlcnZpY2VzL3VzZXJTZXJ2aWNlJyk7XG5hbmd1bGFyLm1vZHVsZSgnY29udGFjdE1hbmFnZXJBcHAnLCBbXG4gICAgJ25nTWF0ZXJpYWwnLFxuICAgICduZ01kSWNvbnMnLFxuICAgICduZ01lc3NhZ2VzJ1xuXSlcbiAgICAuc2VydmljZSgndXNlclNlcnZpY2UnLCB1c2VyU2VydmljZV8xLmRlZmF1bHQpXG4gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgbWFpbkNvbnRyb2xsZXJfMS5kZWZhdWx0KVxuICAgIC5jb25maWcoKCRtZEljb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyKSA9PiB7XG4gICAgJG1kSWNvblByb3ZpZGVyXG4gICAgICAgIC5kZWZhdWx0SWNvblNldCgnLi9hc3NldHMvc3ZnL2F2YXRhcnMuc3ZnJywgMTI4KVxuICAgICAgICAuaWNvbihcImdvb2dsZV9wbHVzXCIsIFwiLi9hc3NldHMvc3ZnL2dvb2dsZV9wbHVzLnN2Z1wiLCA1MTIpXG4gICAgICAgIC5pY29uKFwiaGFuZ291dHNcIiwgXCIuL2Fzc2V0cy9zdmcvaGFuZ291dHMuc3ZnXCIsIDUxMilcbiAgICAgICAgLmljb24oXCJ0d2l0dGVyXCIsIFwiLi9hc3NldHMvc3ZnL3R3aXR0ZXIuc3ZnXCIsIDUxMilcbiAgICAgICAgLmljb24oXCJwaG9uZVwiLCBcIi4vYXNzZXRzL3N2Zy9waG9uZS5zdmdcIiwgNTEyKTtcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxuICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxuICAgICAgICAuYWNjZW50UGFsZXR0ZSgncmVkJyk7XG59KVxuICAgIC5ydW4oZnVuY3Rpb24gKCRsb2cpIHtcbiAgICAkbG9nLmRlYnVnKFwic3RhcnRBcHAgcnVubmluZyBcIik7XG59KTtcbi8vIGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ2NvbnRhY3RNYW5hZ2VyQXBwJ10pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jbGFzcyBBZGRVc2VyRGlhbG9nQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoJG1kRGlhbG9nKSB7XG4gICAgICAgIHRoaXMuJG1kRGlhbG9nID0gJG1kRGlhbG9nO1xuICAgICAgICB0aGlzLmF2YXRhcnMgPSBbXG4gICAgICAgICAgICAnc3ZnLTEnLCAnc3ZnLTInLCAnc3ZnLTMnLCAnc3ZnLTQnXG4gICAgICAgIF07XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy4kbWREaWFsb2cuY2FuY2VsKCk7XG4gICAgfVxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLmhpZGUodGhpcy51c2VyKTtcbiAgICB9XG59XG5BZGRVc2VyRGlhbG9nQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbWREaWFsb2cnXTtcbmV4cG9ydHMuQWRkVXNlckRpYWxvZ0NvbnRyb2xsZXIgPSBBZGRVc2VyRGlhbG9nQ29udHJvbGxlcjtcbi8vIGFuZ3VsYXIubW9kdWxlKCdjb250YWN0TWFuYWdlckFwcCcpXG4vLyAgICAgLmNvbnRyb2xsZXIoJ2FkZFVzZXJEaWFsb2dDb250cm9sbGVyJywgQWRkVXNlckRpYWxvZ0NvbnRyb2xsZXIpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGRVc2VyRGlhbG9nQ29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuY2xhc3MgQ29udGFjdFBhbmVsQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IodXNlclNlcnZpY2UsICRtZEJvdHRvbVNoZWV0KSB7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgdGhpcy4kbWRCb3R0b21TaGVldCA9ICRtZEJvdHRvbVNoZWV0O1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdQaG9uZScsIGljb246ICdwaG9uZScgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ1R3aXR0ZXInLCBpY29uOiAndHdpdHRlcicgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ0dvb2dsZSsnLCBpY29uOiAnZ29vZ2xlX3BsdXMnIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdIYW5nb3V0JywgaWNvbjogJ2hhbmdvdXRzJyB9LFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyU2VydmljZS5zZWxlY3RlZFVzZXI7XG4gICAgfVxuICAgIHN1Ym1pdENvbnRhY3QoYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuJG1kQm90dG9tU2hlZXQuaGlkZShhY3Rpb24pO1xuICAgIH1cbn1cbkNvbnRhY3RQYW5lbENvbnRyb2xsZXIuJGluamVjdCA9IFsndXNlclNlcnZpY2UnLCAnJG1kQm90dG9tU2hlZXQnXTtcbmV4cG9ydHMuQ29udGFjdFBhbmVsQ29udHJvbGxlciA9IENvbnRhY3RQYW5lbENvbnRyb2xsZXI7XG4vLyBhbmd1bGFyLm1vZHVsZSgnY29udGFjdE1hbmFnZXJBcHAnKVxuLy8gICAgIC5jb250cm9sbGVyKCdjb250YWN0UGFuZWxDb250cm9sbGVyJywgQ29udGFjdFBhbmVsQ29udHJvbGxlcik7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRhY3RQYW5lbENvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IG1vZGVsXzEgPSByZXF1aXJlKCcuLi9tb2RlbCcpO1xuY29uc3QgY29udGFjdFBhbmVsQ29udHJvbGxlcl8xID0gcmVxdWlyZSgnLi4vY29udHJvbGxlci9jb250YWN0UGFuZWxDb250cm9sbGVyJyk7XG5jb25zdCBhZGRVc2VyRGlhbG9nQ29udHJvbGxlcl8xID0gcmVxdWlyZSgnLi4vY29udHJvbGxlci9hZGRVc2VyRGlhbG9nQ29udHJvbGxlcicpO1xuY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHVzZXJTZXJ2aWNlLCAkbWRTaWRlbmF2LCAkbWRUb2FzdCwgJG1kRGlhbG9nLCAkbWRNZWRpYSwgJG1kQm90dG9tU2hlZXQpIHtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICB0aGlzLiRtZFNpZGVuYXYgPSAkbWRTaWRlbmF2O1xuICAgICAgICB0aGlzLiRtZFRvYXN0ID0gJG1kVG9hc3Q7XG4gICAgICAgIHRoaXMuJG1kRGlhbG9nID0gJG1kRGlhbG9nO1xuICAgICAgICB0aGlzLiRtZE1lZGlhID0gJG1kTWVkaWE7XG4gICAgICAgIHRoaXMuJG1kQm90dG9tU2hlZXQgPSAkbWRCb3R0b21TaGVldDtcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IFwiXCI7XG4gICAgICAgIHRoaXMudXNlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgIHRoaXMubmV3Tm90ZSA9IG5ldyBtb2RlbF8xLm1vZGVsLk5vdGUoJycsIG51bGwpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2VcbiAgICAgICAgICAgIC5sb2FkQWxsVXNlcnMoKVxuICAgICAgICAgICAgLnRoZW4oKHgpID0+IHtcbiAgICAgICAgICAgIHNlbGYudXNlcnMgPSB4O1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZCA9IHhbMF07XG4gICAgICAgICAgICBzZWxmLnVzZXJTZXJ2aWNlLnNlbGVjdGVkVXNlciA9IHNlbGYuc2VsZWN0ZWQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnVzZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNlbGVjdFVzZXIodXNlcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdXNlcjtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5zZWxlY3RlZFVzZXIgPSB1c2VyO1xuICAgICAgICB2YXIgc2lkZW5hdiA9IHRoaXMuJG1kU2lkZW5hdignbGVmdCcpO1xuICAgICAgICBpZiAoc2lkZW5hdi5pc09wZW4oKSkge1xuICAgICAgICAgICAgc2lkZW5hdi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFiSW5kZXggPSAwO1xuICAgIH1cbiAgICBzZXRGb3JtU2NvcGUoc2NvcGUpIHtcbiAgICAgICAgdGhpcy5mb3JtU2NvcGUgPSBzY29wZTtcbiAgICB9XG4gICAgYWRkTm90ZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5ub3Rlcy5wdXNoKHRoaXMubmV3Tm90ZSk7XG4gICAgICAgIC8vIHJlc2V0IHRoZSBmb3JtXG4gICAgICAgIHRoaXMuZm9ybVNjb3BlLm5vdGVGb3JtLiRzZXRVbnRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5mb3JtU2NvcGUubm90ZUZvcm0uJHNldFByaXN0aW5lKCk7XG4gICAgICAgIHRoaXMubmV3Tm90ZSA9IG5ldyBtb2RlbF8xLm1vZGVsLk5vdGUoJycsIG51bGwpO1xuICAgICAgICB0aGlzLm9wZW5Ub2FzdChcIk5vdGUgYWRkZWRcIik7XG4gICAgfVxuICAgIGNsZWFyTm90ZXMoJGV2ZW50KSB7XG4gICAgICAgIHZhciBjb25maXJtID0gdGhpcy4kbWREaWFsb2cuY29uZmlybSgpXG4gICAgICAgICAgICAudGl0bGUoXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGFsbCBub3Rlcz9cIilcbiAgICAgICAgICAgIC50ZXh0Q29udGVudCgnQWxsIG5vdGVzIHdpbGwgYmUgZGVsZXRlZCwgeW91IGNhblxcJ3QgdW5kbyB0aGlzIGFjdGlvbi4nKVxuICAgICAgICAgICAgLnRhcmdldEV2ZW50KCRldmVudClcbiAgICAgICAgICAgIC5vayhcIlllc1wiKVxuICAgICAgICAgICAgLmNhbmNlbChcIk5vXCIpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJG1kRGlhbG9nLnNob3coY29uZmlybSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkLm5vdGVzID0gW107XG4gICAgICAgICAgICBzZWxmLm9wZW5Ub2FzdCgnQ2xlYXJlZCBub3RlcycpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2hvd0NvbnRhY3RPcHRpb25zKCRldmVudCkge1xuICAgICAgICB0aGlzLiRtZEJvdHRvbVNoZWV0LnNob3coe1xuICAgICAgICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dyYXBwZXInKSksXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXcvY29udGFjdFNoZWV0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogY29udGFjdFBhbmVsQ29udHJvbGxlcl8xLkNvbnRhY3RQYW5lbENvbnRyb2xsZXIsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6IFwiY3BcIixcbiAgICAgICAgfSkudGhlbigoY2xpY2tlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNsaWNrZWRJdGVtICYmIGNvbnNvbGUubG9nKGNsaWNrZWRJdGVtLm5hbWUgKyAnIGNsaWNrZWQhJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVOb3RlKG5vdGUpIHtcbiAgICAgICAgdmFyIGZvdW5kSW5kZXggPSB0aGlzLnNlbGVjdGVkLm5vdGVzLmluZGV4T2Yobm90ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQubm90ZXMuc3BsaWNlKGZvdW5kSW5kZXgsIDEpO1xuICAgICAgICB0aGlzLm9wZW5Ub2FzdChcIk5vdGUgd2FzIHJlbW92ZWRcIik7XG4gICAgfVxuICAgIG9wZW5Ub2FzdChtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuJG1kVG9hc3Quc2hvdyh0aGlzLiRtZFRvYXN0LnNpbXBsZSgpXG4gICAgICAgICAgICAudGV4dENvbnRlbnQobWVzc2FnZSlcbiAgICAgICAgICAgIC5wb3NpdGlvbigndG9wIHJpZ2h0JylcbiAgICAgICAgICAgIC5oaWRlRGVsYXkoMzAwMCkpO1xuICAgIH1cbiAgICB0b2dnbGVTaWRlTmF2KCkge1xuICAgICAgICB0aGlzLiRtZFNpZGVuYXYoJ2xlZnQnKS50b2dnbGUoKTtcbiAgICB9XG4gICAgYWRkVXNlcigkZXZlbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdXNlRnVsbFNjcmVlbiA9ICh0aGlzLiRtZE1lZGlhKCdzbScpIHx8IHRoaXMuJG1kTWVkaWEoJ3hzJykpO1xuICAgICAgICB0aGlzLiRtZERpYWxvZy5zaG93KHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInZpZXcvbmV3VXNlckRpYWxvZy5odG1sXCIsXG4gICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICAgIHRhcmdldEV2ZW50OiAkZXZlbnQsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBhZGRVc2VyRGlhbG9nQ29udHJvbGxlcl8xLkFkZFVzZXJEaWFsb2dDb250cm9sbGVyLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCcsXG4gICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogdXNlRnVsbFNjcmVlblxuICAgICAgICB9KS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VXNlciA9IG1vZGVsXzEubW9kZWwuVXNlci5mcm9tQ3JlYXRlKHVzZXIpO1xuICAgICAgICAgICAgc2VsZi51c2Vycy5wdXNoKG5ld1VzZXIpO1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RVc2VyKG5ld1VzZXIpO1xuICAgICAgICAgICAgc2VsZi5vcGVuVG9hc3QoXCJVc2VyIGFkZGVkXCIpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbmNlbGxlZCB0aGUgZGlhbG9nLicpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAgICd1c2VyU2VydmljZScsXG4gICAgJyRtZFNpZGVuYXYnLFxuICAgIFwiJG1kVG9hc3RcIixcbiAgICBcIiRtZERpYWxvZ1wiLFxuICAgIFwiJG1kTWVkaWFcIixcbiAgICBcIiRtZEJvdHRvbVNoZWV0XCJdO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gTWFpbkNvbnRyb2xsZXI7XG4vLyBhbmd1bGFyLm1vZHVsZSgnY29udGFjdE1hbmFnZXJBcHAnKVxuLy8gICAgLmNvbnRyb2xsZXIoJ21haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpOyBcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbkNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBtb2RlbDtcbihmdW5jdGlvbiAobW9kZWwpIHtcbiAgICBjbGFzcyBDcmVhdGVVc2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZmlyc3ROYW1lLCBsYXN0TmFtZSwgYXZhdGFyLCBiaW8pIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5hdmF0YXIgPSBhdmF0YXI7XG4gICAgICAgICAgICB0aGlzLmJpbyA9IGJpbztcbiAgICAgICAgfVxuICAgIH1cbiAgICBtb2RlbC5DcmVhdGVVc2VyID0gQ3JlYXRlVXNlcjtcbiAgICBjbGFzcyBVc2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSwgYXZhdGFyLCBiaW8sIG5vdGVzKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5hdmF0YXIgPSBhdmF0YXI7XG4gICAgICAgICAgICB0aGlzLmJpbyA9IGJpbztcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZnJvbUNyZWF0ZSh1c2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVzZXIodXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lLCB1c2VyLmF2YXRhciwgdXNlci5iaW8sIFtdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtb2RlbC5Vc2VyID0gVXNlcjtcbiAgICBjbGFzcyBOb3RlIHtcbiAgICAgICAgY29uc3RydWN0b3IodGl0bGUsIGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW9kZWwuTm90ZSA9IE5vdGU7XG59KShtb2RlbCA9IGV4cG9ydHMubW9kZWwgfHwgKGV4cG9ydHMubW9kZWwgPSB7fSkpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RlbC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuY2xhc3MgVXNlclNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCRxKSB7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFVzZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnVzZXJzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdBZGFuIEJsdXInLFxuICAgICAgICAgICAgICAgIGF2YXRhcjogJ3N2Zy0xJyxcbiAgICAgICAgICAgICAgICBiaW86ICdJIGxvdmUgY2hlZXNlLCBlc3BlY2lhbGx5IGFpcmVkYWxlIHF1ZXNvLiBDaGVlc2UgYW5kIGJpc2N1aXRzIGhhbGxvdW1pIGNhdWxpZmxvd2VyIGNoZWVzZSBjb3R0YWdlIGNoZWVzZSBzd2lzcyBib3Vyc2luIGZvbmR1ZSBjYWVycGhpbGx5LiBDb3cgcG9ydC1zYWx1dCBjYW1lbWJlcnQgZGUgbm9ybWFuZGllIG1hY2Fyb25pIGNoZWVzZSBmZXRhIHdobyBtb3ZlZCBteSBjaGVlc2UgYmFieWJlbCBib3Vyc2luLiBSZWQgbGVpY2VzdGVyIHJvcXVlZm9ydCBib3Vyc2luIHNxdWlydHkgY2hlZXNlIGphcmxzYmVyZyBibHVlIGNhc3RlbGxvIGNhZXJwaGlsbHkgY2hhbGsgYW5kIGNoZWVzZS4gTGFuY2FzaGlyZS4nLFxuICAgICAgICAgICAgICAgIG5vdGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiUGF5IGJhY2sgZGlubmVyXCIsIGRhdGU6IG5ldyBEYXRlKFwiMjAxNi0wMS0xMlwiKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkJ1eSBmbG93ZXJcIiwgZGF0ZTogbmV3IERhdGUoXCIyMDE2LTAxLTE5XCIpIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0dlb3JnZSBEdWtlJyxcbiAgICAgICAgICAgICAgICBhdmF0YXI6ICdzdmctMicsXG4gICAgICAgICAgICAgICAgYmlvOiAnWm9tYmllIGlwc3VtIHJldmVyc3VzIGFiIHZpcmFsIGluZmVybm8sIG5hbSByaWNrIGdyaW1lcyBtYWx1bSBjZXJlYnJvLiBEZSBjYXJuZSBsdW1iZXJpbmcgYW5pbWF0YSBjb3Jwb3JhIHF1YWVyaXRpcy4gU3VtbXVzIGJyYWlucyBzaXTigIvigIssIG1vcmJvIHZlbCBtYWxlZmljaWE/IERlIGFwb2NhbHlwc2kgZ29yZ2VyIG9tZXJvIHVuZGVhZCBzdXJ2aXZvciBkaWN0dW0gbWF1cmlzLicsXG4gICAgICAgICAgICAgICAgbm90ZXM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnR2VuZXIgRGVsb3NyZXllcycsXG4gICAgICAgICAgICAgICAgYXZhdGFyOiAnc3ZnLTMnLFxuICAgICAgICAgICAgICAgIGJpbzogXCJSYXcgZGVuaW0gcG91ci1vdmVyIHJlYWR5bWFkZSBFdHN5IFBpdGNoZm9yay4gRm91ciBkb2xsYXIgdG9hc3QgcGlja2xlZCBsb2Nhdm9yZSBiaXR0ZXJzIE1jU3dlZW5leSdzIGJsb2cuIFRyeS1oYXJkIGFydCBwYXJ0eSBTaG9yZWRpdGNoIHNlbGZpZXMuIE9kZCBGdXR1cmUgYnV0Y2hlciBWSFMsIGRpc3J1cHQgcG9wLXVwIFRodW5kZXJjYXRzIGNoaWxsd2F2ZSB2aW55bCBqZWFuIHNob3J0cyB0YXhpZGVybXkgbWFzdGVyIGNsZWFuc2UgbGV0dGVycHJlc3MgV2VzIEFuZGVyc29uIG11c3RhY2hlIEhlbHZldGljYS4gU2NobGl0eiBiaWN5Y2xlIHJpZ2h0cyBjaGlsbHdhdmUgaXJvbnkgbHVtYmVyaHVuZ3J5IEtpY2tzdGFydGVyIG5leHQgbGV2ZWwgc3JpcmFjaGEgdHlwZXdyaXRlciBJbnRlbGxpZ2VudHNpYSwgbWlnYXMga29naSBoZWlybG9vbSB0b3VzbGVkLiBEaXNydXB0IDMgd29sZiBtb29uIGxvbW8gZm91ciBsb2tvLiBQdWcgbWxrc2hrIGZhbm55IHBhY2sgbGl0ZXJhbGx5IGhvb2RpZSBiZXNwb2tlLCBwdXQgYSBiaXJkIG9uIGl0IE1hcmZhIG1lc3NlbmdlciBiYWcga29naSBWSFMuXCIsXG4gICAgICAgICAgICAgICAgbm90ZXM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnTGF3cmVuY2UgUmF5JyxcbiAgICAgICAgICAgICAgICBhdmF0YXI6ICdzdmctNCcsXG4gICAgICAgICAgICAgICAgYmlvOiAnU2NyYXRjaCB0aGUgZnVybml0dXJlIHNwaXQgdXAgb24gbGlnaHQgZ3JheSBjYXJwZXQgaW5zdGVhZCBvZiBhZGphY2VudCBsaW5vbGV1bSBzbyBlYXQgYSBwbGFudCwga2lsbCBhIGhhbmQgcGVsdCBhcm91bmQgdGhlIGhvdXNlIGFuZCB1cCBhbmQgZG93biBzdGFpcnMgY2hhc2luZyBwaGFudG9tcyBydW4gaW4gY2lyY2xlcywgb3IgY2xhdyBkcmFwZXMuIEFsd2F5cyBodW5ncnkgcGVsdCBhcm91bmQgdGhlIGhvdXNlIGFuZCB1cCBhbmQgZG93biBzdGFpcnMgY2hhc2luZyBwaGFudG9tcy4nLFxuICAgICAgICAgICAgICAgIG5vdGVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0VybmVzdG8gVXJiaW5hJyxcbiAgICAgICAgICAgICAgICBhdmF0YXI6ICdzdmctNScsXG4gICAgICAgICAgICAgICAgYmlvOiAnV2VidHdvIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBlc2tvYm8gY2h1bWJ5IGRvb3N0YW5nIGJlYm8uIEJ1YmJsaSBncmVwbGluIHN0eXBpIHByZXppIG16aW5nYSBoZXJva3Ugd2Frb29wYSwgc2hvcGlmeSBhaXJibmIgZG9nc3RlciBkb3BwbHIgZ29vcnUganVtbywgcmVkZGl0IHBsaWNrZXJzIGVkbW9kbyBzdHlwaSB6aWxsb3cgZXRzeS4nLFxuICAgICAgICAgICAgICAgIG5vdGVzOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0dhbmkgRmVycmVyJyxcbiAgICAgICAgICAgICAgICBhdmF0YXI6ICdzdmctNicsXG4gICAgICAgICAgICAgICAgYmlvOiBcIkxlYm93c2tpIGlwc3VtIHllYWg/IFdoYXQgZG8geW91IHRoaW5rIGhhcHBlbnMgd2hlbiB5b3UgZ2V0IHJhZD8gWW91IHR1cm4gaW4geW91ciBsaWJyYXJ5IGNhcmQ/IEdldCBhIG5ldyBkcml2ZXIncyBsaWNlbnNlPyBTdG9wIGJlaW5nIGF3ZXNvbWU/IERvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQgcHJhZXNlbnQgYWMgbWFnbmEganVzdG8gcGVsbGVudGVzcXVlIGFjIGxlY3R1cy4gWW91IGRvbid0IGdvIG91dCBhbmQgbWFrZSBhIGxpdmluZyBkcmVzc2VkIGxpa2UgdGhhdCBpbiB0aGUgbWlkZGxlIG9mIGEgd2Vla2RheS4gUXVpcyBlbGl0IGJsYW5kaXQgZnJpbmdpbGxhIGEgdXQgdHVycGlzIHByYWVzZW50IGZlbGlzIGxpZ3VsYSwgbWFsZXN1YWRhIHN1c2NpcGl0IG1hbGVzdWFkYS5cIixcbiAgICAgICAgICAgICAgICBub3RlczogW10sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cbiAgICBsb2FkQWxsVXNlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRxLndoZW4odGhpcy51c2Vycyk7XG4gICAgfVxufVxuVXNlclNlcnZpY2UuJGluamVjdCA9IFsnJHEnXTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFVzZXJTZXJ2aWNlO1xuLy8gYW5ndWxhci5tb2R1bGUoJ2NvbnRhY3RNYW5hZ2VyQXBwJylcbi8vIC5zZXJ2aWNlKCd1c2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlclNlcnZpY2UuanMubWFwXG4iXX0=
