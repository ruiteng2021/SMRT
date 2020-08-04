import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite';

import Login from './components/pages/LoginScreen';
import Stocks from './components/pages/StocksScreen';
import Charts from './components/pages/ChartsScreen';
import About from './components/pages/AboutScreen';


const Tabs = createBottomTabNavigator();
import { Ionicons } from '@expo/vector-icons';


// this creates a DB file and a variable through which appeal to database
const db = SQLite.openDatabase("SMRT_DB.db");

//  Create profile table
db.transaction(tx => 
    { 
      //tx.executeSql('drop table if exists profile;'),
      tx.executeSql('drop table if exists stocks;'),
      tx.executeSql('create table if not exists profile (id integer primary key not null, profileName, password, status);'),
      tx.executeSql('create table if not exists stocks (id integer primary key not null, company, code, cost, exchange, qty, profileID);');
    },
    error => {console.log(error)}
);

// insert test date for the stock screen to display
db.transaction(tx => 
  { 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('IBM','IBM', '100', 'NYSE','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Apple Inc.','AAPL', '500', 'NYSE','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Tesla Inc','TSLA', '1500', 'NASDAQ','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Microsoft','MSFT', '200', 'NASDAQ','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Facebook Inc.','FB', '300', 'NASDAQ','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Twitter Inc','TWTR', '200', 'NYSE','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Uber Inc','UBER', '10', 'NYSE','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Coca-Cola','KO', '20', 'NYSE','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Boeing Co','BA', '150', 'NYSE','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Walmart Inc','WMT', '100', 'NYSE','15', '1')"); 
      tx.executeSql("insert into stocks (company, code, cost, exchange, qty, profileID) values ('Walmart Inc','WMT', '100', 'NYSE','15', '2')"); 
      tx.executeSql("select * from stocks", [], (_, { rows }) => console.log(JSON.stringify(rows)));
      
  }, 
  error => {console.log(error)} 
);


// Entry
db.transaction(tx => 
    { 
      tx.executeSql("insert into profile (id, profileName, password, status) values ('1','test','test', 'A')");
      tx.executeSql("select * from profile", [], (_, { rows }) => console.log(JSON.stringify(rows))); 
    }, 
    error => {console.log(error)} 
);

/*
// Reading
db.transaction(tx => 
    {
        tx.executeSql("select id, profileName, password, status from test");
        //tx.executeSql("select * from profile", [], (_, { rows }) => console.log(JSON.stringify(rows)));
        //this works as well
        //tx.executeSql("select done, colum1, colum2 from test",  
        //[],    
        //(_,{ rows }) => console.log( JSON.stringify(rows) ) ); 
    }, 
    error => {console.log(error)}
)


// Deleting
db.transaction(tx => 
    {
      tx.executeSql("delete from test where id = ?;", [100]);
    },
    error => {console.log(error)}
)

// Updating
db.transaction(tx => 
    {
      tx.executeSql("update test set done = 100 where id = ?;", [28]);
      tx.executeSql("select * from test", [], (_, { rows }) => console.log(JSON.stringify(rows)));
    },
    error => {console.log(error)}
)
*/

export default function App() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

function AppTabs() {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ }) => {
        let iconName;

        if (route.name === 'Login') {
          iconName = 'ios-person';
        } else if(route.name === 'Stocks') {
          iconName = 'ios-list';
        } else if(route.name === 'Charts') {
          iconName = 'ios-analytics';
        }else {
          iconName = 'ios-star';
        }

        return <Ionicons name={ iconName } size={ 26 } color={ '#000000' }/>
      },
    })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
    }} >
        <Tabs.Screen name="Login" component={ Login } />
        <Tabs.Screen name="Stocks" component={ Stocks } />
        <Tabs.Screen name="Charts" component={ Charts } />
        <Tabs.Screen name="About" component={ About } />
      </Tabs.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});