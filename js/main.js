var eventBus = new Vue();

var player = new Vue({
	el: '#player',
	data: {
		ap: 0, //action points
		apRegen: 1

	},
	methods: {
		endTurn(){
			this.ap = this.apRegen;
		}
	}
});


var centerView = new Vue({
	el: "#centerView",
	data: {

	}
});

var story = new Vue({
	el: "#story",
	data:{
		currentPoint: 0
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
				this.activateCurrent(0);
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
			
		}
	}
});


