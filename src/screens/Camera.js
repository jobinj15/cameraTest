import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet } from 'react-native';
import colors from '../styles/colors/default';
import Ripple from 'react-native-material-ripple';
import fonts from '../utility/fonts';
import ImagePicker from 'react-native-image-crop-picker';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/Feather'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import IconI from 'react-native-vector-icons/Ionicons'

const SEARCH_VEHICAL = "SEARCH VEHICAL"

export default class Camera extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filters: [
                SEARCH_VEHICAL, 'Select Manufacturer', 'Select Body Type', 'By Location'
            ],
            buyingActivities: [
                {
                    name: 'Watchlist',
                    text: 0
                },
                {
                    name: 'Current Bid',
                    text: 2
                },
                {
                    name: 'Vechicle Won',
                    text: 1
                }
            ]
        }
    }

    openCamera() {

        Orientation.lockToLandscape();
        ImagePicker.openCamera({
            width: 600,
            height: 400,
            cropping: false,
        }).then(image => {
            console.log(image);
            Orientation.lockToPortrait();
        })
            .catch(err => {
                console.log("capture error :: " + err);
                Orientation.lockToPortrait();
            })
            ;
    }

    drawBubble(icon, count) {
        return (
            <View
                style={{
                    height: 30,
                    alignItems: 'flex-end',
                    width: 70
                }}
            >

                <Icon name={icon} size={28} color={colors.DARKGRAY2} />
                <View
                    style={styles.bubble}
                >

                    <Text
                        style={styles.bubbleText}
                    >
                        {count}
                    </Text>

                </View>

            </View>
        )
    }

    drawFilters() {
        const size = this.state.filters.length - 1;
        return this.state.filters.map((item, index) => {

            const isFirstItem = item == SEARCH_VEHICAL;
            const isLastItem = index == size

            return (
                <View
                    style={{
                        alignSelf: 'stretch',
                    }}
                >

                    <View
                        style={{
                            alignSelf: 'stretch',
                            paddingHorizontal: 5,
                            alignItems: 'center',
                            paddingVertical: 20,
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={isFirstItem ? styles.h2 : styles.h3}
                        >
                            {item}
                        </Text>

                        {
                            !isFirstItem && <IconM name={'greater-than'} size={20} color={colors.BLACK}
                                style={{ marginRight: 15 }}
                            />
                        }

                        {
                            isFirstItem && <Icon name={'search'} size={20} color={colors.BLACK}
                                style={{ marginRight: 15 }}
                            />
                        }


                    </View>

                    {
                        !isLastItem && <View
                            style={styles.separator}
                        />
                    }
                </View>
            )

        })
    }


    render() {
        return (
            <View
                style={{
                    flex: 1, alignItems: 'center', padding: 20, backgroundColor: colors.BG_COLOR
                }}
            >
                <View
                    style={{
                        alignSelf: 'stretch',
                        height: 55,
                        marginBottom:10,
                        paddingHorizontal: 5,
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={
                            styles.toolbarTitle
                        }
                    >
                        Dashboard
                    </Text>

                    {this.drawBubble('bell', 68)}
                    {this.drawBubble('shopping-cart', 2)}

                </View>
                <ScrollView
                    style={{
                        alignSelf: 'stretch'
                    }}
                    showsVerticalScrollIndicator = {false}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >

                        <View
                            style={styles.card}
                        >
                            {this.drawFilters()}

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignSelf: 'stretch',
                                    marginLeft: 20,
                                    marginTop: 20,
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={[styles.h3, { fontSize: fonts._14 }]}
                                >
                                    ADVANCED SEARCH
                                </Text>

                                <Ripple
                                    onPress={() => {
                                    }}
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={[styles.button,{width:undefined,
                                        paddingHorizontal:15
                                        }]}
                                    >
                                        SHOW ALL
                                     </Text>
                                </Ripple>

                            </View>

                        </View>

                        <Ripple
                            onPress={() => {
                                this.openCamera()
                            }}
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={[styles.button, { marginTop: 25 }]}
                            >
                                CAPTURE
                           </Text>
                        </Ripple>

                    </View>
                </ScrollView>


            </View>
        )
    }

}


const styles = StyleSheet.create({
    toolbarTitle: {
        color: colors.DARKGRAY2,
        fontSize: fonts._22,
        flex: 1
    },
    h3: {
        color: colors.DARKGRAY2,
        fontSize: fonts._16,
        flex: 1
    },
    h2: {
        color: colors.DARKGRAY2,
        fontSize: fonts._18,
        flex: 1
    },
    button: {
        backgroundColor: colors.GREEN,
        color: colors.WHITE,
        fontSize: fonts._16,
        paddingTop: 10,
        width: 180,
        paddingBottom: 13,
        borderRadius: 25,
        textAlign: 'center'
    },
    bubbleText: {
        color: colors.WHITE,
        fontWeight: '500',
        fontSize: fonts._12
    },
    card: {
        backgroundColor: colors.WHITE,
        borderRadius: 25,
        overflow: 'hidden',
        flex: 1,
        alignSelf: 'stretch',
        paddingBottom: 40,
        paddingTop: 15,
        elevation: 2,
        paddingHorizontal: 15
    },
    separator: {
        backgroundColor: colors.DARKGRAY2,
        height: 0.5,
        flex: 1
    },
    bubble: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        overflow: "hidden",
        position: 'absolute',
        right: -10,
        top: -8,
        alignItems: 'center',
        backgroundColor: colors.GREEN,
        justifyContent: "center"
    }
})