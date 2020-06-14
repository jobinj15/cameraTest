import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { StackActions, NavigationActions } from 'react-navigation';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { RadioButton } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';
import Ripple from 'react-native-material-ripple';

var confirmApiData = {
    user_id: '',
    payment_mode: 1,
    address_id: ''
}
var store;


class SelectPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {


        }

        store = this.props.paymentsStore

        this.resetStore()

        const { navigation } = this.props
        this.state.address = navigation.getParam(constants.PARAM_ADDRESS, null)
        this.state.userId = navigation.getParam(constants.PARAM_USER, null)
        this.state.total = navigation.getParam('total', null);
        this.afterPaymentDone = this.afterPaymentDone.bind(this);


        this.setApiData()

    }


    setApiData() {
        confirmApiData.user_id = this.state.userId;
        confirmApiData.address_id = this.state.address.id
    }


    resetStore() {
        store.paymentList = []
        store.loading = false;
        store.selectedPayMode = undefined
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <ToolBar
                    title={'Select Payment'}
                    showTitle={true}
                    navigation={navigation}
                    showBackButton={true}
                />
            ),
        };
    };
    componentDidMount() {
        // this.props.navigation = this.props.navigation
        store.setAfterPayment(this.afterPaymentDone);
        store.getPaymentList()
    }


    navigateTo() {
        this.props.navigation.navigate('PayWithPayU', {
            // [constants.PARAM_INDEX]: index,
        });
    }

    afterPaymentDone(orderId) {

        this.props.navigation.navigate('OrderSuccess', {
           'orderId' : orderId
        });

        this.props.cartStore.cart = [];
        this.props.cartStore.total = 0;
        this.props.cartStore.noOfItems = 0;
    }

    handlePayNow() {
        if(!store.selectedPayMode){
         return global.showMessage(constants.ERROR_PAYMODE)
        }
        else if (store.selectedPayMode.name != 'COD')
            this.navigateTo();
        else
            store.confirmOrder(global.sendAsFormData(confirmApiData))
    }


    bottomView() {

        if (!store.paymentList.length)
            return (<View />)

        return (
            <Ripple
                onPress={() => {
                    this.handlePayNow()
                }}
                style={[styles.bottomView, { bottom: 15, marginHorizontal: 10 }]}
                rippleColor={colors.RIPPLE}
            >

                <Text
                    style={[styles.stripLabel, { color: colors.WHITE, textAlign: 'center' }]}
                >
                    {global.capitalize(constants.TXT_PAY + 'Now')}
                </Text>

            </Ripple>
        )
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
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE }]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={store.paymentList}
                    style={{ backgroundColor: colors.WHITE }}
                    ListHeaderComponent={this.getHeaders()}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {this.bottomView()}
                {/* {
                    (store.apiLoaded && !store.selectedPayMode) ? global.bottomBlockView() : <View />
                } */}

                {
                    store.loading &&
                    global.getLoader()
                }


            </View>
        );
    }

    getHeaders() {
        return (
            <View
                style={{
                    alignSelf: 'stretch', paddingHorizontal: 15
                }}
            >

                <Text
                    style={[styles.productKey, { marginTop: 5 }]}
                >
                    {constants.TXT_SUMMARY}

                </Text>

                {this.drawKeyValue('Subtotal', constants.SYMBOL_RUPEE + '150.00')}
                {this.drawKeyValue('Delivery Charges', constants.TXT_FREE)}
                {this.drawKeyValue('Discount', '-10.00')}
                {this.drawTotal(constants.TXT_TOTAL.replace(':', ''), constants.SYMBOL_RUPEE + this.state.total)}


                <Text
                    style={[styles.productKey, { marginTop: 25 }]}
                >
                    {constants.TXT_PAY_OPTIONS}

                </Text>

            </View>

        )
    }

    handleRadioClick(index) {
        store.toggleSelection(index)
    }


    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator2}
            />
        );
    };

    renderRow({ item, index }) {

        let marginBottom = 0;
        if (index == store.paymentList.length - 1)
            marginBottom = 80;

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    this.handleRadioClick(index)
                }}
            >

                <View
                    style={[styles.styleFull, {
                        paddingVertical: 8, paddingLeft: 15, alignItems: 'center',
                        backgroundColor: colors.WHITE, flexDirection: 'row',
                        marginBottom: marginBottom
                    }]}
                >
                    <Image
                        source={{ uri: item.icon }}
                        style={{ height: 25, width: 25, marginRight: 15 }}
                    />

                    <View
                        style={{ flex: 1 }}
                    >
                        <Text
                            style={[styles.labelMed, {
                                flex: 1, color: item.selected ? colors.PRIMARY :
                                    colors.BLACK
                            }]}
                            numberOfLines={1}
                        >
                            {item.name}

                        </Text>
                        <Text
                            style={[styles.labelSmall, { flex: 1, colors: colors.DISCOUNT }]}
                            numberOfLines={1}
                        >
                            {'loren ipsum description'}

                        </Text>

                    </View>

                    <RadioButton
                        color={colors.PRIMARY}
                        style={{ marginRight: 10 }}
                        selected={item.selected}
                        size={20}
                    />


                </View>
            </TouchableWithoutFeedback>

        )

    }


}

export default inject('paymentsStore', 'cartStore')(observer(SelectPayment));





