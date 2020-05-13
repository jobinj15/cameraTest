'use strict';

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

import { Typography, Colors } from 'react-native-ui-lib';
import COLORS from './colors'
import GLOBAL from '../utility/global'
import colors from './colors';


const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 5;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CARD_WIDTH = DEVICE_WIDTH - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 7.5;
const colorBg = '#263459';
const colorPrimary = '#c11744';
const GRIDROW_HEIGHT = (DEVICE_HEIGHT - 150) / 2;
const GRIDROW_WIDTH = DEVICE_WIDTH / 2;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

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
    viewAll: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.PRIMARY
    },
    stripLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        flex:1,
        color: colors.BLACK
    },
    stripContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems:'center',
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
    labelSmall:{
     color : colors.GREY,
     fontSize : 16   
    },
    bannerSeperator: {
        width: 10,
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
        fontSize: GLOBAL.FONT.APPBAR_HEIGHT,
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
    recommContainer:{
        alignItems: 'center',
        width : 120,
        height : 80,
        paddingHorizontal:15,
        paddingVertical:10,
        justifyContent : 'center'
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
        fontSize: GLOBAL.FONT._14,
    },
    row_subtitle: {
        color: colors.SECONDARY_TEXTCOLOR,
        fontFamily: 'FiraSans-Regular',
        marginTop: 3,
        fontSize: GLOBAL.FONT._13,
    },
    todo: {
        marginTop: 100,
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    txt: {
        fontSize: GLOBAL.FONT._18,
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
        width: GLOBAL.DEVICE_DIMENSION.DEVICE_WIDTH
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
        fontSize: GLOBAL.FONT._18,
        fontFamily: 'FiraSans-Regular',
    },
    subheadertext: {
        fontSize: GLOBAL.FONT._14,
        fontFamily: 'FiraSans-Regular',
    },
    auto_grow_text: {
        fontSize: GLOBAL.FONT._14,
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
        fontSize: GLOBAL.FONT._14,
        fontFamily: 'FiraSans-Regular',
    },
    row_settings_title:
    {
        color: colors.BLACK,
        fontSize: GLOBAL.FONT._14,
        fontFamily: 'FiraSans-Regular',
    },
    row_settings_subtitle:
    {
        color: colors.SECONDARY_TEXTCOLOR,
        fontSize: GLOBAL.FONT._13,
        fontFamily: 'FiraSans-Regular',
    },
    title: {
        fontFamily: 'FiraSans-Regular',
    }

};

// Typography.loadTypographies({
//     h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
//     h2: {fontSize: 46, fontWeight: '3z00', lineHeight: 64},
//   });

Typography.loadTypographies(styles);
{/* <Text h1 pink>Hello World</Text> */ }


module.exports = styles;
