function FootballService() {
    //PRIVATE

    var playersData = [];
    var myTeam = [];

  
    function loadPlayersData() {
        //check if the player already has a copy of the NFL playersData
        var localData = localStorage.getItem('playersData');
        //if they do, pull from there
        if (localData) {
            playersData = JSON.parse(localData);
            console.log(playersData)
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
            return
        }
        //if not go get that data
        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')

        });

    }
    loadPlayersData(); //call the function above every time we create a new service



    //PUBLIC


    //OLD SEARCH
    // this.getPlayersByTeam = function getPlayersByTeam(teamName) {
    //     return playersData.filter(function (player) {
    //         if (player.pro_team == teamName) {
    //             return true;
    //         }
    //     }

    //     )
    // };

    // this.getPlayersByPosition = function getPlayersByPosition(positions) {
    //     return playersData.filter(function (player) {
    //         if (player.position == positions) {
    //             return true;
    //         }
    //     }

    //     )

    // };

    // this.getPlayersByName = function getPlayersByName(playerName) {
    //     return playersData.filter(function (player) {
    //         if (player.fullname == playerName) {
    //             return true;
    //         }
    //     }

    //     )
    // };
this.search = function search(query){
    var searches = query.toLowerCase()
    var filteredSearches = playersData.filter(function (player){
        return player.fullname.toLowerCase().includes(searches) || player.pro_team.toLowerCase().includes(searches) || player.position.toLowerCase().includes(searches)
    })
    return filteredSearches

}

    this.addMyTeam = function addMyTeam(newPlayerId, cb) {
       
        var newPlayer = playersData.find(function (player) {
            return player.id == newPlayerId
        })
        myTeam.push(newPlayer)
        cb(myTeam);
    };

    this.removeFromTeam = function removeFromTeam(removeId, draw) {
        
        var removeMember = playersData.find(function (player) {
            return player.id == removeId
        })

        //indexOf itterates over an array to find the element it was passed and returns the index, if it doesnt find it it will return -1
        var index = myTeam.indexOf(removeMember)
        //splice removes object from array
        myTeam.splice(index, 1)

        draw(myTeam)




    }
}
