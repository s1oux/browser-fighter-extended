import * as React from 'react';

import { isSignedIn } from '../../services/authService';
import LinkButton from '../linkButton';
import SignInUpPage from '../signInUpPage';
import Statistics from '../statistics';
import FightMenu from '../fightMenu';
import FightArena from '../fightArena';
import SignOut from '../signOut';

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isInArena: false,
      isInStats: false,
      fighter1: null,
      fighter2: null,
    };
  }

  componentDidMount() {
    this.setIsLoggedIn(isSignedIn());
  }

  completeFight = () => {
    this.setState({
      isInArena: false,
    });
  };

  openStats = () => {
    this.setState({
      isInStats: true,
    });
  };

  closeStats = () => {
    this.setState({
      isInStats: false,
    });
  };

  startFight = (fighter1, fighter2) => {
    this.setState({
      isInArena: true,
      fighter1: fighter1,
      fighter2: fighter2,
    });
  };

  setIsLoggedIn = (isSignedIn) => {
    this.setState({ isSignedIn });
  };

  render() {
    const { isSignedIn, isInStats, isInArena, fighter1, fighter2 } = this.state;
    if (!isSignedIn) {
      return <SignInUpPage setIsLoggedIn={this.setIsLoggedIn} />;
    }

    if (isInArena) {
      return (
        <FightArena
          onCompleteFight={this.completeFight}
          fighter1={fighter1}
          fighter2={fighter2}
        />
      );
    }

    if (isInStats) {
      return <Statistics onCloseStats={this.closeStats} />;
    }

    return (
      <>
        <LinkButton side="left">
          <div onClick={this.openStats}>Statistics</div>
        </LinkButton>
        <FightMenu onStartFight={this.startFight} />
        <LinkButton side="right">
          <SignOut
            isSignedIn={isSignedIn}
            onSignOut={() => this.setIsLoggedIn(false)}
          />
        </LinkButton>
      </>
    );
  }
}

export default StartScreen;
