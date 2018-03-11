var alwaysIncreaseStory = function(){
	if(player.turn > 0){
		story.increaseStory();
	}
}

var storypoint0 = alwaysIncreaseStory;
var storypoint1 = alwaysIncreaseStory;
var storypoint2 = alwaysIncreaseStory;

var storypoint3 = function(){
	if(quests.blazeOfFire.completed == true){
		story.increaseStory();
	}
}

var storypoint4 = function(){
	console.log("we at storypoint4");
}

var story = new Vue({
	el: "#story",
	data:{
		currentPoint: -1,
		storyFunction: storypoint0
	},
	components: {
		"storypoints": {
			template: `
				<div>
					<slot></slot>
				</div>
			`,
			props: {

			},
			data(){
				return {
					storyPoints: []
				};
			},
			mounted(){
				this.storyPoints = this.$children;
				//this.activateCurrent(0);
				eventBus.$on('increaseStory', currentPoint =>{this.activateCurrent(currentPoint)});
			},
			/*events: {
				increaseStoryPoint(currentPoint){
					console.log("event point nr" + currentPoint);
					this.activateCurrent(currentPoint);
				}
			},*/
			methods: {
				activateCurrent(currentPoint){
					console.log("activating point nr " + currentPoint);
					this.storyPoints.forEach(point =>{
						point.isActive = (currentPoint == point.pointnr);
					});
				}
			}

		},
		"storypoint": {
			template: `
				<div v-show='isActive'><slot></slot></div>
			`,
			props: {
				pointnr: {required: true}
			},

			data(){
				return { 
					isActive: false
				};
			},

			mounted(){
				this.isActive = true;
			}
		}
	},

	methods: {
		increaseStory(){
			this.currentPoint++;
			eventBus.$emit('increaseStory',this.currentPoint);
			this.storyFunction = window["storypoint" + this.currentPoint];
			
		},
		endTurn(){
			this.storyFunction();
		}
	},
	mounted(){
		this.increaseStory();
	}
});