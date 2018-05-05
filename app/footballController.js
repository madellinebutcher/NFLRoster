function FootballController() {
    //PRIVATE
    var footballService = new FootballService();


    function drawMyTeam(players) {

        var template = "<h1>My Team</h1>";
        for (let i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
            <div class="player-card">
            <img class="playerImg" src="${player.photo}">
            <h3>${player.fullname}</h3>
            <h3>${player.position}</h3>
            <h3>${player.pro_team}</h3>
            </div>
            <button onclick="app.controllers.footballController.removeFromTeam(${player.id})">Trade</button>
            `
            if (i > 49) {
                i = players.length
            }

        }
        document.getElementById("myTeam").innerHTML = template;
    }


    function drawPlayers(players) {

        var template = "<h1>The Players</h1>";
        for (let i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
            <div class="card-group">
                <div class="card">
                    <img class="card-img-top" src="${player.photo}"
                    <div class="card-body">
                        <h3>${player.fullname}</h3>
                        <h3>${player.position}</h3>
                        <h3>${player.pro_team}</h3>
                    </div>
                </div>
            <div class="card-footer">
            <button class="btn btn-outline-secondary" onclick="app.controllers.footballController.addToTeam(${player.id})">Add to team</button>
            </div>
            </div>
            
            `
    
            if (i > 49) {
                i = players.length
            }

        }
        document.getElementById("player-info").innerHTML = template;
    }


    //PUBLIC


    this.addToTeam = function addToTeam(id) {
       footballService.addMyTeam(id, drawMyTeam);
      };


    this.removeFromTeam = function removeFromTeam(id) {
        footballService.removeFromTeam(id, drawMyTeam)
      };  

    //OLD SEARCH  
    // this.searchByTeam = function searchByTeam(e){
    //     e.preventDefault();
    //     var teamName = e.target.teamName.value;
    //     var filteredTeamNames = footballService.getPlayersByTeam(teamName);
    //     drawPlayers(filteredTeamNames)
   
    // };
    // this.searchByPosition = function searchByPosition(e){
    //     e.preventDefault();
    //     var positions = e.target.positions.value;
    //     var filteredPositions = footballService.getPlayersByPosition(positions);
    //     drawPlayers(filteredPositions)
    // };
    // this.searchPlayersByName = function searchPlayersByName(e){
    //     e.preventDefault();
    //     var playerName = e.target.playerName.value;
    //     var filteredPlayerName = footballService.getPlayersByName(playerName);
    //     drawPlayers(filteredPlayerName)
   
    // };

    this.search = function search(e){
        e.preventDefault();
        var query = e.target.query.value
        var results = footballService.search(query)
        drawPlayers(results)
    }




}