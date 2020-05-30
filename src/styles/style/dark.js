'use strict';

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

import { Typography, Colors } from 'react-native-ui-lib';
import colors from '../colors';

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 5;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CARD_WIDTH = DEVICE_WIDTH - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 7.5;
const colorBg = '#263459';
const colorPrimary = '#c11744';
const GRIDROW_HEIGHT = (DEVICE_HEIGHT - 150) / 2;
const GRIDROW_WIDTH = DEVICE_WIDTH / 2;
const base_unit = 16;
const ratioX = DEVICE_WIDTH < 375 ? (DEVICE_WIDTH < 320 ? 0.75 : 0.875) : 1;
const ratioY = DEVICE_HEIGHT < 568 ? (DEVICE_HEIGHT < 480 ? 0.75 : 0.875) : 1;
const unit = base_unit * ratioX;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const fonts = {
    _10: normalize(10),
    _11: normalize(11),
    _12: normalize(12),
    _13: normalize(13),
    _14: normalize(14),
    _15: normalize(15),
    _16: normalize(16),
    _17: normalize(17),
    _18: normalize(18),
    _19: normalize(19),
    _20: normalize(20),
    FONT_SIZE: em(1),
    APPBAR_HEIGHT: 56,
    FONT_SIZE_SMALLER: em(0.75),
    FONT_SIZE_SMALL: em(0.875),
    FONT_SIZE_TITLE: em(1.25)
}

var styles = {

    navigator: {
        flex: 1,
    },

    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    toolbar: {
        flexDirection: 'row',
        height: 56,
        width: DEVICE_WIDTH,
        elevation: 5,
        backgroundColor: colors.LIGHT_GRAY
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    touchable: {
        alignSelf: 'center',
        height: 45,
        width: 45,
        padding: 8,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    tabBarOptions: {
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: colors.PURPLE_4,
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: colors.BLACK,
            height: 48
        }
    },
    viewAll: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.PRIMARY
    },
    labelMini: {
        color: colors.WHITE,
        fontWeight: 'bold',
        fontSize: 9
    },
    stripLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        color: colors.BLACK
    },
    labelBorder: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        paddingBottom: 10,
        paddingHorizontal: 6,
        paddingTop: 10,
        borderBottomWidth: 0.5,
        borderColor: colors.GREY,
        color: colors.DARKGRAY
    },
    topRight: {
        position: 'absolute',
        top: 8,
        right: 12,
        flexDirection: 'row'
    },
    stripContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    bigBold: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black'
    },
    VBigText: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },
    styleFull: {
        flex: 1,
    },
    fullCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderCenter: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelSmallX1: {
        color: colors.GREY,
        fontSize: 16
    },
    variant: {
        padding: 8,
        fontSize: 16,
        backgroundColor: colors.GREY,
        color: colors.WHITE
    },
    wrap: {
        flex: 1,
        flexDirection: 'row',
        // borderColor : colors.GREY,
        // borderWidth : 1,
        // borderRadius:3,
        flexWrap: 'wrap'
    },
    labelSmall: {
        color: colors.GREY,
        fontSize: 12
    },
    addressListCard: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20, paddingBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.WHITE
    },
    labelProfile: {
        color: colors.GREY,
        fontSize: 20,
        fontWeight: '500'
    },
    plusContainer: {
        width: 138, height: 40,
        borderColor: colors.ListViewBG,
        borderWidth: 1, borderRadius: 3,
        flexDirection: 'row'
    },
    bottomView: {
        backgroundColor: colors.GREEN_4,
        position: 'absolute',
        width: DEVICE_WIDTH,
        bottom: 0,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    largeButton: {
        backgroundColor: colors.GREEN_4,
        width: DEVICE_WIDTH,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    plusBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40, height: 40, fontSize: 30, fontWeight: 'bold',
        color: colors.DARKGRAY,
        backgroundColor: colors.ListViewBG
    },
    plusText: {
        fontWeight: 'bold',
        marginTop: -5,
        color: colors.DARKGRAY,
    },
    addContainer: {
        width: 140, height: 40,
        borderColor: colors.GREEN,
    },
    bannerSeperator: {
        width: 10,
    },
    productSeperator: {
        height: 3,
        backgroundColor: colors.LIGHT_GRAY
    },
    banner: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: fonts.APPBAR_HEIGHT,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'FiraSans-Regular',
    },
    button: {
        height: 44,
        backgroundColor: colors.VELVET,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10
    },
    bottomlayout: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        textAlign: "center",
        justifyContent: "center",
        fontWeight: "500",
        color: "white"
    },
    largeButton: {
        width: '100%',
        paddingVertical: 13,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        borderRadius: 5,
        backgroundColor: colors.GREEN,
    },
    saveButton: {
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
    },
    searchByBrandsContainer: {
        alignItems: 'center',
        width: 120,
        height: 80,
        borderWidth: 1,
        borderColor: colors.GREY,
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'center'
    },
    recommContainer: {
        alignItems: 'center',
        width: 120,
        height: 80,
        borderWidth: 1,
        borderColor: colors.GREY,
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'center'
    },
    newButton: {
        marginBottom: 0,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
    },
    row_title: {
        color: colors.PRIMARY_TEXTCOLOR,
        fontFamily: 'FiraSans-Regular',
        fontWeight: 'bold',
        fontSize: fonts._14,
    },
    row_subtitle: {
        color: colors.SECONDARY_TEXTCOLOR,
        fontFamily: 'FiraSans-Regular',
        marginTop: 3,
        fontSize: fonts._13,
    },
    todo: {
        marginTop: 100,
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    txt: {
        fontSize: fonts._18,
        fontFamily: 'FiraSans-Regular',
        marginLeft: 5,
        marginTop: 2,
        color: '#222222',
    },
    completed: {
        color: '#cccccc'
    },
    hr: {
        backgroundColor: 'lightgrey',
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: 1,
        marginLeft: 0,
        marginRight: 0,
    },
    imageButton: {

        height: 20,
        width: 20,

    },
    bottomBg: {
        backgroundColor: colors.LIGHT_GRAY,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: DEVICE_WIDTH
    },
    separator: {
        height: StyleSheet.hairlineWidth,

    },
    listView: {

        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: DEVICE_WIDTH,

    },
    listView1: {
        position: 'absolute'

    },
    header: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 10,
        backgroundColor: colors.LIGHT_GRAY,
        width: DEVICE_WIDTH,
        height: 72
    },
    headertext: {
        fontSize: fonts._18,
        fontFamily: 'FiraSans-Regular',
    },
    subheadertext: {
        fontSize: fonts._14,
        fontFamily: 'FiraSans-Regular',
    },
    auto_grow_text: {
        fontSize: fonts._14,
        fontFamily: 'FiraSans-Regular',
    },
    taginput: {
        backgroundColor: colors.TRANSPARENT,

    },
    row_settings_title1:
    {
        color: colors.BLACK,
        alignSelf: 'center',
        marginRight: 10,
        fontSize: fonts._14,
        fontFamily: 'FiraSans-Regular',
    },
    row_settings_title:
    {
        color: colors.BLACK,
        fontSize: fonts._14,
        fontFamily: 'FiraSans-Regular',
    },
    row_settings_subtitle:
    {
        color: colors.SECONDARY_TEXTCOLOR,
        fontSize: fonts._13,
        fontFamily: 'FiraSans-Regular',
    },
    title: {
        color: colors.BLACK,
        fontSize: 26,
        flex: 1,
        fontWeight: 'bold'
    },
    themeDialog: {
        backgroundColor: colors.WHITE,
        padding: 15,
        flex: 1
    }

};

// Typography.loadTypographies({
//     h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
//     h2: {fontSize: 46, fontWeight: '3z00', lineHeight: 64},
//   });

Typography.loadTypographies(styles);
{/* <Text h1 pink>Hello World</Text> */ }

function em(value) {
    return unit * value;
}


function normalize(value) {

    console.log('normalize called');
    if (PixelRatio.get() === 2) {
        console.log(" 4s,5s, till 6s ,7,8");
        return value;
    } else if (PixelRatio.get() === 3) {
        console.log(" 6splus,7plus,8plus,x ");
        return (value + 2);
    } else {
        console.log(" ipad ");
        return (value + 3);
    }

}


module.exports = styles;
