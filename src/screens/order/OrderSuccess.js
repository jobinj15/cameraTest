import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, BackHandler, ScrollView } from 'react-native';
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';
import { StackActions, NavigationActions } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import fonts from '../../utility/fonts';


class OrderSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {

         orderId : ''
        }

        this.backHome = this.backHome.bind(this)

        const { navigation } = this.props
        this.state.orderId = navigation.getParam('orderId',null)
    }


    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
            header: (
                // <ToolBar
                //     title={constants.TITLE_ORDER_SUCCESS}
                //     showTitle={true}
                //     showBackButton={false}
                // />
                <View />
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
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE, padding: 15 }]}>

                <ScrollView>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 35,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            style={{ height: 180, width: 180 }}
                            source={require('../../assets/images/thankyou.png')}
                        />

                        <Text
                            style={[styles.bigBoldOnBoard, {
                                color: colors.PRIMARY, marginTop: 15,
                                textAlign: 'center'
                            }]}
                        >
                            {constants.TXT_THANKYOU}

                        </Text>

                        <Text
                            style={[styles.labelSmall, { flex: 1, color: colors.BLACK,marginTop:25,
                                fontSize:fonts._16}]}
                        >
                            {'Order No#'+this.state.orderId}

                        </Text>


                        <Text
                            style={[styles.stripLabel, {
                                marginVertical: 25, color: colors.GREY2,
                                textAlign: 'center', fontStyle: 'PopinsReg'
                            }]}
                        >
                            {constants.TXT_CAN_TRACK}

                        </Text>

                    </View>
                </ScrollView>


                <Ripple
                    onPress={() => {
                        this.backHome();
                    }}
                    style={[styles.bottomView, { bottom: 15, marginHorizontal: 10, width: global.DEVICE_WIDTH - 20 }]}
                    rippleColor={colors.WHITE}
                >

                    <Text
                        style={[styles.buttonText, { flex: 1 }]}
                    >
                        {global.capitalize(constants.TXT_BACK_SHOPPING)}{" "}
                    </Text>
                </Ripple>



            </View>
        );
    }



}

export default OrderSuccess
