import { combineReducers } from 'redux';

import { app } from './app.redux'
import { model } from './model.redux'
import { lights } from './lights.redux'

const AppReducer = combineReducers({app, model, lights})

export default AppReducer