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
import { temCtrl } from './temCtrl.redux'

const AppReducer = combineReducers({
    app, 
    model, 
    lights, 
    air, 
    service, 
    curtain, 
    tv, 
    lock, 
    temCtrl,
    hotelList})

export default AppReducer