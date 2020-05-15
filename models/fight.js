// exports.fight = {
//   id: Number, // fightID
//   fighter1: Number, // 1st fighterID
//   fighter2: Number, // 2nd fighterID
//   log: Array,
// {
//     "fighter1Shot": 0,
//     "fighter2Shot": 0,
//     "fighter1Health": 0,
//     "fighter2Health": 0
// }
// };

class Fight {
  constructor({ userId, winner, loser }) {
    this.userId = userId;
    this.winner = winner;
    this.loser = loser;
    this.date = new Date();
  }
}

module.exports.Fight = Fight;
