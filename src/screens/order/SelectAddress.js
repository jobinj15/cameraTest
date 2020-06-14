import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';

var store;

var addressApiData = {
    user_id: ''
}

@inject("addressListStore")
@observer
export default class SelectAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAddress: undefined
        }

        store = this.props.addressListStore

        const { navigation } = this.props
        this.state.total = navigation.getParam('total', null)
        this.state.userId = navigation.getParam(constants.PARAM_USER, null)
        this.onFirstAddressAdded = this.onFirstAddressAdded.bind(this)
        this.afterAddressListLoaded = this.afterAddressListLoaded.bind(this)


    }

    onFirstAddressAdded() {
        console.log('onFirstAddressAdded called!')
        store.getAddressList(global.sendAsFormData(addressApiData))
    }

    afterAddressListLoaded() {

        console.log('afterAddressListLoaded\n ' + JSON.stringify(this.props.navigation))

        if (store.addressList.length == 0)
            this.navigateTo('AddAddress', constants.MODE_FIRST_ADD)
    }



    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <ToolBar
                    title={'Select Address'}
                    showTitle={true}
                    navigation={navigation}
                    showBackButton={true}
                />
            ),
        };
    };
    componentDidMount() {
        // this.props.navigation = this.props.navigation
        addressApiData.user_id = this.state.userId;
        store.setAfterAddressListLoaded(this.afterAddressListLoaded);
        store.getAddressList(global.sendAsFormData(addressApiData), 0)

        // console.log('currTheme :' + window.theme)
    }

    componentWillUnmount() {
        // store.addressList = [];
        store.loadingCharges = false;
        store.loadingAddress = false;
        store.setAfterAddressListLoaded(undefined);
    }

    navigateTo(route, mode) {

        console.log('navigateTo: ' + JSON.stringify(this.props.navigation))

        this.props.navigation.navigate(route, {
            [constants.PARAM_ADDRESS]: store.selectedAddress,
            [constants.PARAM_USER]: this.state.userId,
            [constants.PARAM_MODE]: mode,
            'onFirstAddressAdded': this.onFirstAddressAdded,
            total: this.state.total
        });
    }


    bottomView() {

        if (!store.selectedAddress || !store.selectedAddress.id)
            return (
                <View />
            )

        return (
            <Ripple
                onPress={
                    () => {
                        this.navigateTo('SelectPayment')
                    }
                }
                style={[styles.bottomView,{bottom:15,marginHorizontal:10}]}
                rippleColor={colors.RIPPLE}
            >

                <Text
                    style={[styles.stripLabel, { color: colors.WHITE,textAlign:'center'}]}
                >
                    {global.capitalize(constants.TXT_PROCEED_PAY)}
                </Text>
            </Ripple>
        )
    }

    handleChangeAddress() {
        if (store.addressList.length == 0) {
            this.navigateTo('AddAddress', constants.MODE_FIRST_ADD)
        }
        else this.navigateTo('AddressList', constants.MODE_SELECT)
    }



    drawKeyValue(key, value, moreStyles = {}) {

        return (
            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop:5,
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.labelSmall, { flex: 1,color:colors.BLACK}]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmall, {color:colors.BLACK}]}
                    >
                    {value}

                </Text>


            </View>
        )

    }


    drawTotal(key, value, moreStyles = {}) {

        return (
            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop:10,
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.productKey, { flex: 1,color:colors.BLACK}]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmall, {color:colors.PRIMARY}]}
                    >
                    {value}

                </Text>


            </View>
        )

    }


    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE }]}>

                <ScrollView>
                    <View
                        style={
                            { margin: 15 }
                        }
                    >

                        {this.drawAddressCard()}

                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelft: 'stretch',
                                marginTop: 25
                            }}
                        >
                            <Text
                                style={[styles.labelSmall, { color: colors.BLACK, flex: 1 }]}
                            >
                                {constants.TXT_APPLY_COUPON.replace('Apply', 'Applied')}
                            </Text>


                            <Text
                                style={[styles.labelSmall, { color: colors.PRIMARY }]}
                            >
                                {'New20'}
                            </Text>


                        </View>

                        <Text
                            style={[styles.productKey, { marginTop: 25 }]}
                        >
                            {constants.TXT_SUMMARY}

                        </Text>

                        {this.drawKeyValue('Subtotal', constants.SYMBOL_RUPEE+'150.00')}
                        {this.drawKeyValue('Delivery Charges', constants.TXT_FREE)}
                        {this.drawKeyValue('Discount','-10.00')}
                        {this.drawTotal(constants.TXT_TOTAL.replace(':',''),constants.SYMBOL_RUPEE+ this.state.total)}


                        {/* <Ripple
                            onPress={() => {
                                this.handleChangeAddress();
                            }}
                            rippleColor={colors.RIPPLE}
                            style={[styles.largeButton, { width: undefined, marginLeft: 0, paddingHorizontal: 40 }]}
                        >
                            <Text
                                style={styles.buttonText}
                            >
                                {constants.TXT_ADD_CHANGE_ADDRESS}{" "}
                            </Text>
                        </Ripple> */}
                    </View>

                </ScrollView>

                {this.bottomView()}

                {
                    (store.loading || store.loadingCharges) &&
                    global.getLoader()
                }


            </View>
        );
    }

    drawAddressCard() {

        var address = store.selectedAddress;

        if (!address || !address.id)
            return (<View />)

        return (
            <View
                style={[styles.styleFull, {
                }]}
            >
                <Text
                    style={[styles.productKey]}
                >
                    {constants.TXT_DEL_ADDRESS}

                </Text>


                <View
                    style={{
                        flexDirection: 'row', alignSelf: 'stretch',
                        alignItems: 'center'
                    }}
                >

                    <Text
                        style={[styles.labelSmall, { flex: 1 }]}
                    >
                        {address.address + ' ' + address.area + ' , ' + address.city + ' , ' + address.state
                            + ' , ' + address.pin_code
                        }

                    </Text>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.handleChangeAddress();

                        }}
                    >
                        <Text
                            style={[styles.labelSmall, { color: colors.PRIMARY }]}
                        >
                            {constants.TXT_CHANGE}
                        </Text>

                    </TouchableWithoutFeedback>
                </View>
            </View>

        )
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator}
            />
        );
    };

}
