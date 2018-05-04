function FootballController(){
//PRIVATE
var footballService = new FootballService();

    function drawMyTeam(players){
        var template = "";
        for (let i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
            <div class="player-card">
                <img src="${player.photo}">
                <h3>${player.fullname}</h3>
                <h3>${player.position}</h3>
                <h3>${player.pro_team}</h3>
            </div>
            <button>Add to Team</button>
            `
            
        }
        document.getElementById("player-info").innerHTML = template;
    }





//PUBLIC




}