import React, { Component } from 'react';
import { View, ImageBackground, Image, TextInput, Text, ToastAndroid,
    Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';

// killer resource for icons:
// https://oblador.github.io/react-native-vector-icons/


import bgImage from '../../assets/background.jpg';
import logo from '../../assets/logoT.png';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH } = Dimensions.get('window');
const db = SQLite.openDatabase("SMRT_DB.db");

export default class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            showPass: true,
            press: false,
            userName: '',
            passWord: ''
        }
    }

    showPass = () => {
        if(this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    login = () => {    

        console.log("XXX login XXX!");
        // Reading from database
        db.transaction(tx => 
            {
                let userFound = false;
                let user_name = this.state.userName;
                let pass_word = this.state.passWord;
                let stocks = this.props.navigation;
                tx.executeSql("select * from profile", [], 
                    function(tx,results){
                        var dataset = results.rows.length;
                        if(dataset>0){
                            for(let i=0;i<dataset;i++){
                                if(results.rows.item(i).profileName == user_name && 
                                    results.rows.item(i).password == pass_word){
                                    
                                   //go StockItem of this user;
                                   console.log(user_name);
                                   console.log(pass_word);
                                   userFound = true;
                                   continue;
                                }
                            }

                            if(!userFound) {
                                // create new user
                                db.transaction(tx => 
                                    { 
                                        tx.executeSql("insert into profile (profileName, password, status) values (?,?, 'A')", [user_name, pass_word]); 
                                        tx.executeSql("select * from profile", [], (_, { rows }) => 
                                        console.log(JSON.stringify(rows)) );
                                    }, 
                                    error => {console.log(error)} 
                                );
                            }
                            else {
                                stocks.navigate('Stocks');
                                console.log("Show stock items!");
                            }                          
                        }
                    }
                ); 
            }, 
            error => {console.log(error)}
        )        
    }

    render() {
        return (
            <ImageBackground source={ bgImage } style={ styles.backgroundContainer }>
                <View style={ styles.logoContainer }>
                    <Image source={ logo } style={ styles.logo } />
                </View>
                <View style={ styles.inputContainer }>
                    <Icon name={ 'ios-person' } size={ 28 } 
                        color={ 'rgba(255, 255, 255, 0.7)' } style={ styles.inputIcon }/>
                    <TextInput
                        style={ styles.input }
                        placeholder={ 'Username' }
                        onChangeText={(text) => this.setState({userName:text})}
                        placeholderTextColor={ 'rgba(255, 255, 255, 0.67)' }
                        underlineColorAndroid='transparent' />
                </View>
                <View style={ styles.inputContainer }>
                    <Icon name={ 'ios-lock' } size={ 28 } 
                        color={ 'rgba(255, 255, 255, 0.7)' } style={ styles.inputIcon }/>
                    <TextInput
                        style={ styles.input }
                        placeholder={ 'Password' }
                        onChangeText={(text) => {this.setState({passWord:text})}}
                        secureTextEntry={ this.state.showPass }
                        placeholderTextColor={ 'rgba(255, 255, 255, 0.67)' }
                        underlineColorAndroid='transparent' />

                    <TouchableOpacity style={ styles.btnEye }
                        onPress={ this.showPass.bind(this) } >
                        <Icon name={ this.state.press == false ? 'ios-eye' : 'ios-eye-off' } size={ 26 } color={ 'rgba(255, 255, 255, 0.67)' } />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={ styles.btnLogin }
                    onPress={() => this.login()}>
                    <Text style={ styles.text }>Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    } // render()
} // class

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1%',
        marginTop: '5%'
    },
    logo: {
        width: 180,
        height: 180
    },
    inputContainer: {
        marginTop: 10
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
    },
    inputIcon: {
        position: 'absolute',
        top: 7,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 7,
        right: 37
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        backgroundColor: '#22B8F1',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});