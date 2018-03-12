var eventBus = new Vue();

var player = new Vue({
	el: '#player',
	data: {
		ap: 1, //action points
		apRegen: 2,
		turn: 0,
		weight: 0,
		inventory: {
			wood: 0
		},
		integrity: 50,
		maxIntegrity: 100,
		battery: 30,
		maxBattery: 100,

		city: 0,
		error: ""
	},
	methods: {
		regenerateActionPoints(){
			if(mechanics.batteryDepletion){
				if(this.battery > (this.apRegen - this.ap)){
					this.battery = this.apRegen - this.ap;
					this.ap = this.apRegen;
				}
			}else{
				this.ap = this.apRegen;
			}
		},
		endTurn(){
			this.error = "";
			this.turn++;
			this.regenerateActionPoints();
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
				if(this.inventory[item] > 0){
					this.inventory[item]--;
					this.weight -= items[item].weight;
					this.ap--;
				}else{
					this.error = "You do not have that item.";
				}
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
		},
		increaseBattery(increase){
			this.battery += increase;
			if(this.battery > this.maxBattery){
				this.battery = this.maxBattery;
			}
		},
		reduceAp(decrease){
			if(this.ap - decrease < 0){
				return false;
			}else{
				this.ap -= decrease;
				return true;
			}
		}
	}
});

var centerView = new Vue({
	el: "#centerView",
	data: {

	}
});

Vue.component("tristatbar",{
	template: `
		<statbars>
			<statbar name="action points" :start="player.ap" :end="player.apRegen"></statbar>
			<statbar name="integrity" :start="player.integrity" :end="player.maxIntegrity"></statbar>
			<statbar name="battery" :start="player.battery" :end="player.maxBattery"></statbar>
		</statbars>
	`,
});

Vue.component("statbars",{
	template: `
		<div class="box">
			<div class="columns">
				<slot></slot>
			</div>
		</div>
	`,
});

Vue.component("statbar",{
	template: `
		<div v-if="this.getDangerLevel == 1" class="column">
			<div class="tags has-addons">
				<span class="tag is-dark">{{this.name}}</span>
				<span class="tag is-success"> {{this.start}} / {{this.end}} </span>
			</div>
			<progress class="progress is-success" :value="this.start" :max="this.end"></progress>
		</div>
		<div v-else-if="this.getDangerLevel == 2" class="column">
			<div class="tags has-addons">
				<span class="tag is-dark">{{this.name}}</span>
				<span class="tag is-warning"> {{this.start}} / {{this.end}} </span>
			</div>
			<progress class="progress is-warning" :value="this.start" :max="this.end"></progress>
		</div>
		<div v-else-if="this.getDangerLevel == 3" class="column">
			<div class="tags has-addons">
				<span class="tag is-dark">{{this.name}}</span>
				<span class="tag is-danger"> {{this.start}} / {{this.end}} </span>
			</div>
			<progress class="progress is-danger" :value="this.start" :max="this.end"></progress>
		</div>
	`,
	props: {
		start: {required: true},
		end: {required: true},
		name: {required: true}
	},
	data(){
		return {

		};
	},
	mounted(){

	},
	computed: {
		getDangerLevel(){
			var ratio =  this.start / this.end;
			if(ratio > 0.66){
				return 1;
			}else if(ratio <= 0.66 && ratio > 0.33){
				return 2;
			}else{
				return 3;
			}
			return 4;
		},
	}
})

