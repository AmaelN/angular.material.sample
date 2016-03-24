/// <reference path="../boot.ts" />

module ContactManagerApp{   
    
    export interface IUserService{
        loadAllUsers(): ng.IPromise<User[]>;
        selectedUser: User;
    }

    export class UserService implements IUserService {
        
        static $inject = ['$q'];        
        constructor(private $q: ng.IQService) {       
        }
        
        selectedUser: User =null;
        
        
        loadAllUsers(): ng.IPromise<User[]>{
            return this.$q.when(this.users);
        }
        
        private users: User[] =[
             {
                name: 'Adan Blur',
                avatar: 'svg-1',
                bio: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.',
                notes: [
                    { title: "Pay back dinner", date: new Date("2016-01-12")},
                    { title: "Buy flower", date: new Date("2016-01-19")},
                ],
            },
            {
                name: 'George Duke',
                avatar: 'svg-2',
                bio: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.',
                notes: [],
            },
            {
                name: 'Gener Delosreyes',
                avatar: 'svg-3',
                bio: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS.",
                notes: [],
            },
            {
                name: 'Lawrence Ray',
                avatar: 'svg-4',
                bio: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.',
                notes: [],
            },
            {
                name: 'Ernesto Urbina',
                avatar: 'svg-5',
                bio: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.',
                notes: [],
            },
            {
                name: 'Gani Ferrer',
                avatar: 'svg-6',
                bio: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada.",
                notes: [],
            },            
        ];        
    }
}
 