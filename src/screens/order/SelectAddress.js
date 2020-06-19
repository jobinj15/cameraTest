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

var addressListStore,selectAddressStore;

var addressApiData = {
    user_id: ''
}

var shippingApiData = {
    user_id: '',
    pincode: ''
}

@inject((stores) => ({
    addressListStore: stores.addressListStore,
    selectAddressStore: stores.selectAddressStore,
  }))
@observer  
export default class SelectAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAddress: undefined
        }

        addressListStore = this.props.addressListStore
        selectAddressStore = this.props.selectAddressStore

        this.resetStore()

        const { navigation } = this.props
        this.state.total = navigation.getParam('total', null)
        this.state.userId = navigation.getParam(constants.PARAM_USER, null)
        this.onFirstAddressAdded = this.onFirstAddressAdded.bind(this)
        this.afterAddressListLoaded = this.afterAddressListLoaded.bind(this)

        
    }

    resetStore(){
        selectAddressStore.loadingCharges = false;
        addressListStore.addressList = [];
        selectAddressStore.shippingData = {}
    }

    onFirstAddressAdded() {
        console.log('onFirstAddressAdded called!')
        addressListStore.getAddressList(global.sendAsFormData(addressApiData))
    }

    afterAddressListLoaded() {

        console.log('afterAddressListLoaded\n ' + JSON.stringify(addressListStore.addressList))

        if (addressListStore.addressList.length == 0)
            this.navigateTo('AddAddress', constants.MODE_FIRST_ADD)
        else {
            var selectedAddress = addressListStore.addressList[0];
            shippingApiData.pincode = selectedAddress.pin_code
            selectAddressStore.getShippingCharges(global.sendAsFormData(shippingApiData))
        }
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
        shippingApiData.user_id = this.state.userId;
        addressListStore.setAfterAddressListLoaded(this.afterAddressListLoaded);
        addressListStore.getAddressList(global.sendAsFormData(addressApiData), 0)

        // console.log('currTheme :' + window.theme)
    }

    componentWillUnmount() {
        // store.addressList = [];
        addressListStore.loadingCharges = false;
        addressListStore.loadingAddress = false;
        addressListStore.setAfterAddressListLoaded(undefined);
    }

    navigateTo(route, mode) {

        console.log('navigateTo: ' + JSON.stringify(this.props.navigation))

        this.props.navigation.navigate(route, {
            [constants.PARAM_ADDRESS]: addressListStore.selectedAddress,
            [constants.PARAM_USER]: this.state.userId,
            [constants.PARAM_MODE]: mode,
            'onFirstAddressAdded': this.onFirstAddressAdded,
            total: this.state.total
        });
    }


    bottomView() {

        if (!addressListStore.selectedAddress || !addressListStore.selectedAddress.id)
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
                style={[styles.bottomView, { bottom: 15, marginHorizontal: 10 }]}
                rippleColor={colors.RIPPLE}
            >

                <Text
                    style={[styles.stripLabel, { color: colors.WHITE, textAlign: 'center' }]}
                >
                    {global.capitalize(constants.TXT_PROCEED_PAY)}
                </Text>
            </Ripple>
        )
    }

    handleChangeAddress() {
        if (addressListStore.addressList.length == 0) {
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
                    marginTop: 5,
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.labelSmall, { flex: 1, color: colors.BLACK }]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmall, { color: colors.BLACK }]}
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
                    marginTop: 10,
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.productKey, { flex: 1, color: colors.BLACK }]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmall, { color: colors.PRIMARY }]}
                >
                    {value}

                </Text>


            </View>
        )

    }


    render() {

        var shippingData;
        if(selectAddressStore.shippingData && selectAddressStore.shippingData.data)
        shippingData = selectAddressStore.shippingData.data;

        return (
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE }]}>

                <ScrollView>
                    <View
                        style={
                            { margin: 15 }
                        }
                    >

                        {this.drawAddressCard()}

                        {
                            shippingData &&
                            <View>
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

                                {this.drawKeyValue('Subtotal', constants.SYMBOL_RUPEE + shippingData.subtotal)}
                                {this.drawKeyValue('Delivery Charges', shippingData.shipping)}
                                {/* {this.drawKeyValue('Delivery Charges', constants.TXT_FREE)} */}
                                {this.drawKeyValue('Discount', shippingData.discount)}
                                {this.drawTotal(constants.TXT_TOTAL.replace(':', ''), constants.SYMBOL_RUPEE + shippingData.total)}

                            </View>
                        }

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
                    (addressListStore.loading || selectAddressStore.loadingCharges) &&
                    global.getLoader()
                }


            </View>
        );
    }

    drawAddressCard() {

        var address = addressListStore.selectedAddress;

         console.log('drawAddressCard ' + JSON.stringify(address))

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
