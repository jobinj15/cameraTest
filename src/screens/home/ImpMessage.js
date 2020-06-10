import React, { Component } from 'react';
import { Card } from 'react-native-ui-lib';
import styles from '../../styles/style';
import global from '../../utility/global';
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import { View, Text } from 'react-native';
import user_repository from '../../repos/user_repository';


export default class ImpMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: '',
            textColor: '',
            actionColor: '',
            text:'',
            message:''
        }
    }

    componentDidMount() {
       this.getImpMessage()
    }


    getImpMessage() {

        global.isOnline().then(isNetworkAvailable => {
            if (isNetworkAvailable) {

                user_repository.getImpmessage(
                    this.onImpMessage.bind(this)
                );

            }
        });

    }


    onImpMessage(isError, responseData) {

        if (!isError) {
           const data = responseData.data;
           if(data && data.length){
               const item = data[0];
               this.setState({
                   backgroundColor : item.background_colour,
                   actionColor : item.action_color,
                   textColor : item.text_color,
                   text : item.title,
                   message : item.message
               })
           }
        }

    }



    render() {

        if (!this.state.backgroundColor)
            return (
                <View />
            )

        return (
            <View style={[styles.styleFull, { marginBottom: 8, padding: 15,flex:undefined}]}>

                <Card style={{ flex: 1 }}
                    containerStyle={{
                        backgroundColor: colors.DARKYELLOW, borderRadius: 5, padding: 8,
                        borderColor: colors.DARKYELLOW
                    }}
                    enableShadow={false}
                >
                    <Text
                        style={[styles.labelSmallX1,{color:this.state.textColor}]}
                    >
                        {this.state.text}
                    </Text>

                    <Text
                    style={{
                        fontSize:14,
                        marginTop:5,
                        color: this.state.actionColor
                    }}
                    >
                      {this.state.message}
                    </Text>
                </Card>
            </View>
        );
    }

}


