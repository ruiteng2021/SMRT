
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
            SMRT-Stock Market Real-time! A simple app to display your stock information.
            SMRT app will show your stock information, what stocks you have.  It will also display 
            information about prices, and they are presented with candle stick graph.
        </Text>

        <Text>
            Thankyou for choosing this app. We appreciate your comments always, please send the feature request or 
            request or report bugs directly to the developer. we will do our best to satisfy your request.
        </Text>
    </View>
  );
}

export default AboutScreen;

