import React from 'react';
import ReactDOM from 'react-dom';

function randInt(lowerLimit, upperLimit) {
	return Math.floor(Math.random() * ((upperLimit + 1) - lowerLimit) + lowerLimit);
}

var NinjaGold = function(props) {
	return (
		<p className="gold-counter">Your Gold: <span>{props.totalGold}</span></p>
	)
};

var MoneyMakers = function(props) {
	{
		var winStatus = true;
		var goldAmt = 0;
		var luck = randInt(0, 10);

		if (props.building == "Farm") {
			goldAmt = randInt(10, 20);
		}
		else if (props.building == "Cave") {
			goldAmt = randInt(5, 10);
		}
		else if (props.building == "House") {
			goldAmt = randInt(2, 5);
		}
		else if (props.building == "Casino") {
			if (luck > 7) {
				goldAmt = randInt(0, 50);
			} else {
				goldAmt = -Math.abs(randInt(0, 50));
				winStatus = false;
			}
		}
	}
	return (
		<section className="money-makers">
			<h1>{props.building}</h1>
			<p>{props.description}</p>
			<button type="submit" onClick={props.addGold.bind(null, goldAmt, props.building, winStatus)}>Find Gold</button>
		</section>
	)
};

var ActivityLog = function(props) {
	{
		var loggedActivities = [];
		for (var i = 0; i < props.activities.outcomes.length; i++) {
			loggedActivities.push(<p className={props.activities.winLoss[i]} key={i}>{props.activities.outcomes[i] + " " + new Date()}</p>)
		}
	}
	return (
		<div>
			<h2 className="activity-header">Activities:</h2>
			<section className="activity-log">
				{loggedActivities}
			</section>
		</div>
	)
};

const App = React.createClass({
	getInitialState() {
		return {
			gold: 0,
			activities: {
				outcomes: [],
				winLoss: []
			}
		}
	},
	addGold(goldAmt, theBuilding, winStatus) {
		if (winStatus === true) {
			this.setState({
				gold: this.state.gold + goldAmt
			});
			this.state.activities.outcomes.push('Went to a ' + theBuilding + ' and made ' + goldAmt + ' gold!');
			this.state.activities.winLoss.push('win');
		}
		else {
			this.setState({
				gold: this.state.gold + goldAmt
			});
			this.state.activities.outcomes.push('Went to a ' + theBuilding + ' and lost ' + Math.abs(goldAmt) + ' gold!');
			this.state.activities.winLoss.push('loss');
		}
		
	},
	render() {
		return (
			<div className="container">
				<NinjaGold totalGold={this.state.gold} />
				<MoneyMakers building="Farm" description="(Makes 10 - 20 gold)" addGold={this.addGold} />
				<MoneyMakers building="Cave" description="(Makes 5 - 10 gold)" addGold={this.addGold} />
				<MoneyMakers building="House" description="(Makes 2 - 5 gold)" addGold={this.addGold} />
				<MoneyMakers building="Casino" description="(Makes 0 - 50 gold)" addGold={this.addGold} />
				<ActivityLog activities={this.state.activities} />
			</div>
		)
	}
});

ReactDOM.render(<App />, document.querySelector('#app'));