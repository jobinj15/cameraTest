import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, BackHandler } from 'react-native';
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';
import { StackActions, NavigationActions } from 'react-navigation';
import Ripple from 'react-native-material-ripple';


class OrderSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            

        }

        this.backHome = this.backHome.bind(this)         
    }
    

    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
            header: (
                <ToolBar
                    title={constants.TITLE_ORDER_SUCCESS}
                    showTitle={true}
                    showBackButton={false}
                />
            ),
        };
    };

    componentDidMount() {
        // this.props.navigation = this.props.navigation
        BackHandler.addEventListener("hardwareBackPress", this.backHome);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backHome);
        console.log("componentWillUnmount called!");
      }
    


    backHome() {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({
                routeName: 'Home', params: {
                    // navigator: this.props.navigation
                }
            })]
        });

        this.props.navigation.dispatch(resetAction);

    }

    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE,padding:15 }]}>

                <Text
                    style={[styles.labelSmallX1, { marginVertical: 25 }]}
                >
                    {constants.TXT_ORDER_SUCCESS}

                </Text>

                <Ripple
                    onPress={() => {
                        this.backHome();
                    }}
                    style={[styles.largeButton, { width: undefined, marginLeft: 0, paddingHorizontal: 40 }]}
                    rippleColor={colors.WHITE}
                >
                    
                        <Text
                            style={styles.buttonText}
                        >
                            {constants.TXT_DONE}{" "}
                        </Text>
                </Ripple>


            </View>
        );
    }



}

export default OrderSuccess
