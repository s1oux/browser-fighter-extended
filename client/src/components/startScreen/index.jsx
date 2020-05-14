import * as React from 'react';
import SignInUpPage from '../signInUpPage';
import { isSignedIn } from '../../services/authService';
import FightMenu from '../fightMenu';
import FightArena from '../fightArena';
import SignOut from '../signOut';

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isInArena: false,
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

  startFight = (fighter1, fighter2) => {
    this.setState({
      isInArena: true,
      fighter1: fighter1,
      fighter2: fighter2,
    });

    console.log(
      `render arena with fighters: ${fighter1.name} vs ${fighter2.name}`
    );
  };

  setIsLoggedIn = (isSignedIn) => {
    this.setState({ isSignedIn });
  };

  render() {
    const { isSignedIn, isInArena, fighter1, fighter2 } = this.state;
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

    return (
      <>
        <FightMenu onStartFight={this.startFight} />
        <SignOut
          isSignedIn={isSignedIn}
          onSignOut={() => this.setIsLoggedIn(false)}
        />
      </>
    );
  }
}

export default StartScreen;
