import React, { Component } from 'react';
import { View, Text, Animated, ImageBackground } from 'react-native';
import { StackActions,NavigationActions} from 'react-navigation';
import styles from '../../styles/style'
import global from '../../utility/global';
import SplashScreen from 'react-native-splash-screen';
import constants from '../../utility/constants';


export default class SplashTest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            animX: new Animated.Value(Math.ceil(global.DEVICE_WIDTH)),
        }
    }


    animateText() {
        Animated.timing(this.state.animX, {
            toValue: 80,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            // this.state.animY.setValue(0);
            //If you remove above line then it will stop the animation at toValue point
            this.navigateTo();
        });
    }


    componentDidMount() {
        console.log('Dev_Width: ' + Math.ceil(global.DEVICE_WIDTH))
        SplashScreen.hide()
        this.animateText()
    }


    navigateTo() {
        
        global.getItem(constants.USER).then((result) => {

            var route;

            if (result) {
                route = 'Home'
            } else {
                route = 'OnBoard'
            }

            route = 'Home'

            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({
                    routeName: route, params: {
                        navigator: this.props.navigation
                    }
                })]
            });

            this.props.navigation.dispatch(resetAction);


        });

    }

    render() {

        const transformStyle = {
            transform: [{
                translateX: this.state.animX,
            }]
        }

        return (

            <ImageBackground
                style={{
                    flex: 1
                }}
                source={require('../../assets/images/nature.jpg')}
            >

                <Animated.Text
                    style={[styles.VBigText, transformStyle, { marginTop: 160 }]}
                >
                    {"Animated Text"}
                </Animated.Text>


            </ImageBackground>

        )

    }



}
