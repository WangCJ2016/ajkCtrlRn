import { combineReducers } from 'redux';

import { app } from './app.redux'
import { model } from './model.redux'
import { lights } from './lights.redux'
import { air } from './air.redux'
import { service } from './service.redux'
import { curtain } from './curtain.redux'
import { tv } from './tv.redux'
import { lock } from './lock.redux'
import { hotelList } from './hotelList.redux'

const AppReducer = combineReducers({app, model, lights, air, service, curtain, tv, lock, hotelList})

export default AppReducer