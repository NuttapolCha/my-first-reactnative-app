import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ScreenManager from './src/screens/ScreenManager';
import contactReducer from './src/store/reducers/contactReducer';

const rootReducer = combineReducers({
  contactStore: contactReducer
});

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
          <ScreenManager />
        </Provider>
      );
    }