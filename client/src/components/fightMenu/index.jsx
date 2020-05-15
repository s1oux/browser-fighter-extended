import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import FighterCreation from '../fighterCreation';
import FighterSelector from '../fighterSelector';
import { Button } from '@material-ui/core';

import './fightMenu.css';

class FightMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fighters: [],
      fighter1: null,
      fighter2: null,
    };
  }

  async componentDidMount() {
    const fighters = await getFighters();
    if (fighters && !fighters.error) {
      this.setState({ fighters });
    }
  }

  onFightStart = () => {
    const { fighter1, fighter2 } = this.state;
    this.props.onStartFight(fighter1, fighter2);
  };

  onCreate = (fighter) => {
    this.setState({ fighters: [...this.state.fighters, fighter] });
  };

  onFighter1Select = (fighter1) => {
    this.setState({
      fighter1: fighter1,
    });
  };

  onFighter2Select = (fighter2) => {
    this.setState({ fighter2: fighter2 });
  };

  getFighter1List = () => {
    const { fighter2, fighters } = this.state;
    if (!fighter2) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter2.id);
  };

  getFighter2List = () => {
    const { fighter1, fighters } = this.state;
    if (!fighter1) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter1.id);
  };

  render() {
    const { fighter1, fighter2 } = this.state;
    const fighter1Img =
      'https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif';
    const fighter2Img = 'https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif';
    return (
      <div>
        <FighterCreation onCreated={this.onCreate} />
        <div id="fight-wrapper">
          <div className="wrapper left">
            <FighterSelector
              selectedFighter={fighter1}
              onFighterSelect={this.onFighter1Select}
              fightersList={this.getFighter1List() || []}
              fighterImg={fighter1Img}
            />
          </div>
          <div className="wrapper">
            <Button
              onClick={this.onFightStart}
              variant="contained"
              color="primary"
              disabled={!(fighter1 && fighter2)}
            >
              Start Menu
            </Button>
          </div>
          <div className="wrapper right">
            <FighterSelector
              selectedFighter={fighter2}
              onFighterSelect={this.onFighter2Select}
              fightersList={this.getFighter2List() || []}
              fighterImg={fighter2Img}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FightMenu;
