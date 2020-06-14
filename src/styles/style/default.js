'use strict';

import {
    StyleSheet,
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

import { Typography, Colors } from 'react-native-ui-lib';
import colors from '../colors';
import fonts from '../../utility/fonts';

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
        backgroundColor: colors.WHITE
    },
    toolbarIos: {
        flexDirection: 'row',
        height: 56,
        marginLeft: -8,
        width: DEVICE_WIDTH
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    touchable: {
        alignSelf: 'center',
        height: 45,
        width: 45,
        padding: 5,
        marginLeft: -6,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    tabBarOptions: {
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: colors.TAB_INACTIVE,
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: colors.WHITE,
            height: 48
        }
    },
    viewAll: {
        fontSize: fonts._10,
        fontFamily: 'PopinsBold',
        color: colors.PRIMARY
    },
    labelMini: {
        color: colors.WHITE,
        fontFamily: 'PopinsBold',
        marginTop: 3,
        fontSize: fonts.FONT_SIZE_SMALL
    },
    stripLabel: {
        fontSize: fonts._16,
        flex: 1,
        fontFamily: 'PopinsMed',
        color: colors.BLACK
    },
    labelKey: {
        fontSize: fonts._16,
        flex: 1,
        fontFamily: 'PopinsMed',    
        color: colors.BLACK
    },
    labelBorder: {
        fontSize: fonts._14,
        fontFamily: 'PopinsMed',
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
        fontFamily: 'PopinsBold',
        fontSize: fonts._20,
        color: 'black'
    },
    topLeft:{
      position:'absolute',
      top:10,
      left:10
    },
    productKey:{
        fontSize: fonts._14,
        fontFamily: 'PopinsBold',        
        color: colors.BLACK
    },
    bigBoldOnBoard: {
        fontFamily: 'PopinsBold',
        fontSize: fonts._24,
        color: colors.PRIMARY
    },
    VBigText: {
        fontFamily: 'PopinsBold',
        fontSize: fonts._28,
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
        color: colors.GREY2,
        fontFamily: 'PopinsReg',
        fontSize: fonts._14
    },
    labelMed: {
        color: colors.BLACK,
        fontFamily: 'PopinsMed',
        fontSize: fonts._13
    },
    amount: {
        fontFamily: 'PopinsBold',
        color: colors.PRIMARY,
        fontSize: fonts._18
    },
    variant: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: fonts._14,
        fontFamily: 'PopinsMed',
        borderRadius: 5,
        marginTop:2,
        borderWidth:1
    },
    filterItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: fonts._14,
        fontFamily: 'PopinsMed',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.WHITE,
        color: colors.WHITE
    },
    filterItem2: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: fonts._14,
        fontFamily: 'PopinsMed',
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: colors.WHITE,
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
        fontFamily: 'PopinsReg',
        fontSize: fonts._12
    },
    labelMini2: {
        color: colors.GREY,
        fontFamily: 'PopinsReg',
        fontSize: fonts.FONT_SIZE_SMALLER
    },
    orderStatus:{
      width:100,
      borderRadius:5,
      alignItems:'center',
      justifyContent:'center'
    },
    addressListCard: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20, paddingBottom: 10,
        alignItems:'center',
        paddingHorizontal: 15,
        backgroundColor: colors.WHITE
    },
    labelProfile: {
        color: colors.GREY,
        fontSize: fonts._18,
        fontFamily: 'PopinsMed',
    },
    // plusContainer: {
    //     width: 138, height: 40,
    //     borderColor: colors.ListViewBG,
    //     borderWidth: 1, borderRadius: 3,
    //     flexDirection: 'row'
    // },
    plusContainer: {
        height: 40,
        width:120,
        flexDirection: 'row',
        alignItems:'center'
    },
    offer:{
     height:18,
     paddingHorizontal:8,
     paddingVertical:5,
     borderRadius:5,
     alignItems:'center',
     justifyContent:'center',
     position:'absolute',
     top:5,
     left:5,
     backgroundColor:colors.GRAD_RED2
    },
    offerText:{
     color : colors.WHITE,
     fontSize : fonts._8,
     fontFamily:'PopinsBold'
    },
    bottomView: {
        backgroundColor: colors.GREEN_4,
        position: 'absolute',
        alignSelf: 'stretch',
        bottom: 0,
        borderRadius:5,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    // plusBox: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 40, height: 40, fontSize: fonts._26, fontFamily: 'PopinsBold',
    //     color: colors.DARKGRAY,
    //     backgroundColor: colors.ListViewBG
    // },
    plusBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40, height: 40, fontSize: fonts._26, fontFamily: 'PopinsReg',
        color: colors.DARKGRAY,
    },
    plusText: {
        fontFamily: 'PopinsBold',
        marginTop: 3,
        color: colors.DARKGRAY,
    },
    addContainer: {
        height: 40,
        marginBottom:5,
        borderColor: colors.GREEN,
    },
    bannerSeperator: {
        width: 10,
    },
    productSeperator: {
        height: 3,
        backgroundColor: colors.LIGHT_GRAY
    },
    productSeperator2: {
        height: 0.5,
        marginHorizontal:25,
        backgroundColor: colors.SEPARATOR
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
        fontSize: fonts._14,
        textAlign: "center",
        justifyContent: "center",
        fontFamily: 'PopinsMed',
        color: "white"
    },
    buttonText2: {
        fontSize: fonts._14,
        textAlign: "center",
        justifyContent: "center",
        fontFamily: 'PopinsMed',
        color: colors.WHITE
    },
    largeButton: {
        width: '100%',
        paddingVertical: 10,
        justifyContent: "center",
        alignSelf: "center",
        rippleColor: colors.PINK_4,
        alignItems: "center",
        paddingHorizontal: 30,
        borderRadius: 5,
        backgroundColor: colors.GREEN,
    },
    largeButton2: {
        width: '100%',
        paddingVertical: 10,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 5,        
        paddingHorizontal: 15,
        backgroundColor: colors.TAB_INACTIVE,
    },
    saveButton: {
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
    },
    searchByBrandsContainer: {
        alignItems: 'center',
        width: 120,
        height: 70,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.BORDER,
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
        fontFamily: 'PopinsBold',
        fontSize: fonts._14,
    },
    row_subtitle: {
        color: colors.SECONDARY_TEXTCOLOR,
        fontFamily: 'PopinsReg',
        marginTop: 3,
        fontSize: fonts._13,
    },
    todo: {
        marginTop: 100,
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    weight: {
        fontSize: fonts._12,
        fontFamily: 'PopinsReg',
        color: colors.GREY2,
    },
    address: {
        fontSize: fonts._16,
        fontFamily: 'PopinsReg',
        color: colors.GREY2,
    },
    productImage: {
        height: 110, width: 110, marginRight: 25, padding: 20,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 15, backgroundColor: colors.PRODUCT_BG
    },

    productThumbnail:{
        resizeMode: 'contain',
        height: 110, 
        width: 110,
    },

    productImageSmall: {
        height: 78, width: 78, marginRight: 25, padding: 20,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 8, backgroundColor: colors.PRODUCT_BG
    },

    productThumbnailSmall:{
        resizeMode: 'contain',
        height: 78, 
        width: 78,
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
        fontFamily: 'PopinsReg',
    },
    subheadertext: {
        fontSize: fonts._14,
        fontFamily: 'PopinsReg',
    },
    auto_grow_text: {
        fontSize: fonts._14,
        fontFamily: 'PopinsReg',
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
        fontFamily: 'PopinsReg',
    },
    row_settings_title:
    {
        color: colors.BLACK,
        fontSize: fonts._14,
        fontFamily: 'PopinsReg',
    },
    row_settings_subtitle:
    {
        color: colors.SECONDARY_TEXTCOLOR,
        fontSize: fonts._13,
        fontFamily: 'PopinsReg',
    },
    title: {
        color: colors.BLACK,
        fontSize: fonts._22,
        flex: 1,
        fontFamily: 'PopinsMed'
    },
    titleSmall: {
        color: colors.BLACK,
        fontSize: fonts._18,
        flex: 1,
        marginLeft: 25,
        marginTop: 2,
        fontFamily: 'PopinsMed'
    },
    themeDialog: {
        backgroundColor: colors.WHITE,
        padding: 15,
        flex: 1
    },
    couponCard: {
        padding: 15, flex: 1,
        backgroundColor: colors.WHITE
    },
    apply: {
        fontSize: fonts._12,
        color: colors.PRIMARY,
        fontFamily: 'PopinsMed',
    }

};

// Typography.loadTypographies({
//     h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
//     h2: {fontSize: 46, fontWeight: '3z00', lineHeight: 64},
//   });

Typography.loadTypographies(styles);
{/* <Text h1 pink>Hello World</Text> */ }


module.exports = styles;
