class Fighter {
  constructor({ name, health, power, defense }) {
    this.name = name;
    this.health = Number(health);
    this.power = Number(power);
    this.defense = Number(defense);
  }
}

// exports.fighter = {
//   id: Number, // fighterID
//   name: String, // fighterName
//   health: Number, // fighterHealth
//   power: Number, // fighterPower
//   defense: Number, // add defense ??
// };

module.exports.Fighter = Fighter;
