
import React from 'react';
import { StyleSheet,Text, View } from 'react-native';

const AboutScreen = () => {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'skyblue',
            padding: 30
        }}>        
    
        <Text>
            SMRT-Stock Market Real-time !A simple app to display the stock information.
            SMRT  app will show stock information ,what stock markets are there ,what are the top 10 stock markets?
            will also display information about current and what are the different rules in stock market.will also
            show comparison or graph about the top 10 markets.
        </Text>

        <Text>
            Thankyou for choosing this app.We appreciate your comments always,please send the feature request or 
            request or report bugsdirectly to the developer instead od posting on the market.we will do our best to satisfy
            your request.
        </Text>
    </View>
  );
}

export default AboutScreen;

