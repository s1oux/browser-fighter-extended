const { FightRepository } = require('../repositories/fightRepository');

class FightService {
  create(fight) {
    return FightRepository.create(fight);
  }

  getFights() {
    const fights = FightRepository.getAll();
    if (!fights) {
      return null;
    }
    return fights;
  }

  getFightsForUser(search) {
    const fights = FightRepository.getMany(search);
    if (!fights) {
      return null;
    }
    return fights;
  }

  update(id, data) {
    const updatedFight = FightRepository.update(id, data);
    if (!updatedFight) {
      return null;
    }
    return updatedFight;
  }

  remove(id) {
    const removedFight = FightRepository.delete(id);
    if (!removedFight) {
      return null;
    }
    return removedFight;
  }

  search(search) {
    const item = FightRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new FightService();
