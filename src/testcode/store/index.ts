import { Module } from 'vuex';
import { IRootState } from '../index';
import state, { ExampleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const exampleModule: Module<ExampleStateInterface, IRootState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default exampleModule;
