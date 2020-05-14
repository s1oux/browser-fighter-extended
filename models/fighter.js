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
//   health: Number, // fighterHealth 100
//   power: Number, // fighterPower < 100
//   defense: Number, // fighterDefense => 1 to 10
// };

module.exports.Fighter = Fighter;
