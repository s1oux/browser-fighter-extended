export default class Player {
  constructor(fighter) {
    this.name = fighter.name;
    this.attack = fighter.power;
    this.defense = fighter.defense;
    this.initialHealth = fighter.health;
    this.currentHealth = fighter.health;
    this.blocking = false;
    this.criticalHitSequence = [];
    this.criticalHitTiming = 0;
    this.lastCriticalHit = 0;
  }
}
