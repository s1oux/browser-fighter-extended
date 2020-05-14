import React from 'react';

import { fight } from './fightingLogic/fightLogic';
import Modal from '../modal';
import HealthIndicator from '../healthIndicator';
import Fighter from '../fighter';

import './fightArena.css';

class FightArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
    };
  }

  componentDidMount() {
    fight(this.props.fighter1, this.props.fighter2).then((fighter) => {
      this.setState({
        winner: fighter,
      });
    });
  }

  render() {
    const { fighter1, fighter2, onCompleteFight } = this.props;

    const { winner } = this.state;

    const content = winner ? (
      <Modal fighter={winner} onClose={onCompleteFight} />
    ) : (
      <div>
        <div className="arena___fight-status">
          <HealthIndicator fighter={fighter1} position="left" />
          <div className="arena___versus-sign">
            <img
              src="https://github.com/s1oux/browser-fighter/blob/develop/resources/versus.png?raw=true"
              alt="vs-sign"
            />
          </div>
          <HealthIndicator fighter={fighter2} position="right" />
        </div>
        <div className="arena___battlefield">
          <Fighter fighter={fighter1} position="left" />
          <Fighter fighter={fighter2} position="right" />
        </div>
      </div>
    );

    return <div className="arena___root">{content}</div>;
  }
}

export default FightArena;
