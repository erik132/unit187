var quests = {
	blazeOfFire: {
		completed: false,
		active: true,
		complete: function(){
			if(player.ap > 0){
				this.completed = true;
				this.active = false;
				player.forceRemoveItem("wood");
				player.ap=0;
			}else{
				player.setError("You need action points to light the furnace");
			}
		}
	},
	poweringUp: {
		completed: false,
		active: false,
		complete(){
			if(player.battery >= player.maxBattery){
				this.completed = true;
				this.active = false;
			}
		}
	}
};

var cities = [
	{
		name: "leandr",
		rechargeCapability: 20,
		buildings: {
			forge: true,
			rechargeStation: true,
		}
	}
];

function rechargeAtCity(cityId,actor){
	var city = cities[cityId];
	if(actor.ap == 0){
		actor.error = "Not enough ap to recharge";
		return;
	}
	if(city.buildings.rechargeStation){
		while(actor.battery < actor.maxBattery && actor.reduceAp(1) == true){
			actor.increaseBattery(city.rechargeCapability);
		}
	}else{
		actor.error="No building to recharge in";
	}
}

function playerRechargeAtCity(cityId){
	rechargeAtCity(cityId,player);
}

function playerRechargeAtCurrentCity(){
	playerRechargeAtCity(player.city);
}

var items = {
	wood: {
		weight: 1
	}
}