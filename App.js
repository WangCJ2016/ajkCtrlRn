import React from 'react';
// import App from './App';
import { Provider } from 'react-redux';
//import codePush from "react-native-code-push";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; 
import AppNavigator from './src/navigators'
import AppReducer from './src/reducers/index';

class App extends React.Component {
  constructor() {
    super()
    this.store = createStore(AppReducer, compose(applyMiddleware(thunk)))
    
  }
  componentDidMount(){
    // codePush.sync({
    //   updateDialog: {
    //     appendReleaseDescription: true,
    //     descriptionPrefix:'\n\n更新内容：\n',
    //     title:'更新',
    //     mandatoryUpdateMessage:'',
    //     mandatoryContinueButtonLabel:'更新',
    //   },
    //   mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
    // })
  }
  render() {
    return (
      <Provider store={this.store}>
        <AppNavigator></AppNavigator>
      </Provider>
    )
  }
}

export default App