var eventBus = new Vue();

var player = new Vue({
	el: '#player',
	data: {
		ap: 0, //action points
		apRegen: 1,
		turn: 0,
		weight: 0,
		inventory: {
			wood: 0
		},
		error: ""
	},
	methods: {
		endTurn(){
			this.error = "";
			this.ap = this.apRegen;
			this.turn++;
		},
		addItem(item){
			if(this.ap > 0){
				this.inventory[item]++;
				this.weight += items[item].weight;
				this.ap--;
			}else{
				this.error = "You do not have enough action points.";
			}
		},
		removeItem(item){
			if(this.ap > 0){
				this.inventory[item]--;
				this.weight -= items[item].weight;
				this.ap--;
			}else{
				this.error = "You do not have enough action points.";
			}
		},
		forceRemoveItem(item){
			this.inventory[item]--;
			this.weight -= items[item].weight;
		},
		setError(error){
			this.error = error;
		}
	}
});

var centerView = new Vue({
	el: "#centerView",
	data: {

	}
});




