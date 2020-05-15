import { controls } from './controls';

import Player from './fighterPlayer';

import {
  resetCriticalHitParameters,
  updateLastCriticalHitTime,
  checkCriticalKeyCodePressing,
  checkLastCriticalHitTime,
  checkCriticalHitDelay,
} from './criticalHitLogic';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const firstPlayer = new Player(firstFighter);
    const secondPlayer = new Player(secondFighter);

    const keyDownListener = (event) => {
      checkKeyPress(event.code, firstPlayer, secondPlayer);
      if (firstPlayer.currentHealth <= 0) {
        removeKeyListeners();
        resolve(secondFighter);
      } else if (secondPlayer.currentHealth <= 0) {
        removeKeyListeners();
        resolve(firstFighter);
      }
    };
    document.addEventListener('keydown', keyDownListener);

    const keyUpListener = (event) => {
      if (event.code === controls.PlayerOneBlock && firstPlayer.blocking) {
        firstPlayer.blocking = false;
      } else if (
        event.code === controls.PlayerTwoBlock &&
        secondPlayer.blocking
      ) {
        secondPlayer.blocking = false;
      } else {
        // do nothing
      }
    };
    document.addEventListener('keyup', keyUpListener);

    const removeKeyListeners = () => {
      document.removeEventListener('keydown', keyDownListener);
      document.removeEventListener('keyup', keyUpListener);
    };
  });
}

function getCriticalHit(fighter) {
  // return critical damage
  return fighter.attack * 2;
}

function getDamage(attacker, defender) {
  // return damage
  if (attacker.blocking) {
    return 0;
  }

  if (!defender.blocking) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
  } else {
    return 0;
  }
}

function getHitPower(fighter) {
  const criticalHitChance = getRandomNumber(1, 2);
  const { attack } = fighter;
  return attack * criticalHitChance;
  // return hit power
}

function getBlockPower(fighter) {
  // return block power
  const dodgeChance = getRandomNumber(1, 2);
  const { defense } = fighter;
  return defense * dodgeChance;
}

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const checkKeyPress = (keyCode, firstFighter, secondFighter) => {
  switch (keyCode) {
    case controls.PlayerOneAttack:
      // handlePlayerAttack
      const secondPlayerDamageDealt = getDamage(firstFighter, secondFighter);
      secondFighter.currentHealth -= secondPlayerDamageDealt;

      resetCriticalHitParameters(firstFighter);

      updateHealthIndicator(secondFighter, 'right');

      break;
    case controls.PlayerTwoAttack:
      // handlePlayerAttack
      const firstPlayerDamageDealt = getDamage(secondFighter, firstFighter);
      firstFighter.currentHealth -= firstPlayerDamageDealt;

      resetCriticalHitParameters(secondFighter);

      updateHealthIndicator(firstFighter, 'left');

      break;
    case controls.PlayerOneBlock:
      if (!firstFighter.blocking) {
        firstFighter.blocking = true;
      }
      break;
    case controls.PlayerTwoBlock:
      if (!secondFighter.blocking) {
        secondFighter.blocking = true;
      }
      break;
    default:
      if (
        checkCriticalKeyCodePressing(
          keyCode,
          controls.PlayerOneCriticalHitCombination,
          firstFighter
        )
      ) {
        checkCriticalHitSequence(
          firstFighter,
          secondFighter,
          keyCode,
          controls.PlayerOneCriticalHitCombination,
          'right'
        );
      } else if (
        checkCriticalKeyCodePressing(
          keyCode,
          controls.PlayerTwoCriticalHitCombination,
          secondFighter
        )
      ) {
        checkCriticalHitSequence(
          secondFighter,
          firstFighter,
          keyCode,
          controls.PlayerTwoCriticalHitCombination,
          'left'
        );
      } else {
        // do nothing if player presses non-control keys
      }

      break;
  }
};

const updateHealthIndicator = (fighter, side) => {
  document.getElementById(
    `${side}-fighter-indicator`
  ).style.width = `${Math.round(
    (fighter.currentHealth / fighter.initialHealth) * 100
  )}%`;
};

const checkCriticalHitSequence = (
  attacker,
  defender,
  key,
  combination,
  side
) => {
  switch (attacker.criticalHitSequence.length) {
    case 0:
      if (checkLastCriticalHitTime(attacker)) {
        // do nothing if player makes crit in last 10s
      } else if (key === combination[0]) {
        attacker.criticalHitTiming = new Date();
        attacker.criticalHitSequence.push(key);
      }
      break;
    case 1:
      if (checkCriticalHitDelay(attacker)) {
        resetCriticalHitParameters(attacker);
      } else if (key === combination[1]) {
        attacker.criticalHitTiming = new Date();
        attacker.criticalHitSequence.push(key);
      } else {
        resetCriticalHitParameters(attacker);
      }
      break;
    case 2:
      if (checkCriticalHitDelay(attacker)) {
        resetCriticalHitParameters(attacker);
      } else if (key === combination[2]) {
        const defenderPlayerDamageDealt = getCriticalHit(attacker);
        defender.currentHealth -= defenderPlayerDamageDealt;

        updateHealthIndicator(defender, side);

        resetCriticalHitParameters(attacker);
        updateLastCriticalHitTime(attacker);
      } else {
        resetCriticalHitParameters(attacker);
      }
      break;
    default:
      break;
  }
};
