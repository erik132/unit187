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
	}
};

var items = {
	wood: {
		weight: 1
	}
}