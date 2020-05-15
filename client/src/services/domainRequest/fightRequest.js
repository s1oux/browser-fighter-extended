// TODO: add server requests for fight info

import { get, post } from '../requestHelper';

const entity = 'fights';

export const getFightsForUser = async (userId) => {
  return await get(entity, userId);
};

export const createFight = async (body) => {
  return await post(entity, body);
};
