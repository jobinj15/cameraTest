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

    afterPaymentDone() {
        this.props.navigation.navigate('OrderSuccess', {

        });

        this.props.cartStore.cart = [];
        this.props.cartStore.total = 0;
        this.props.cartStore.noOfItems = 0;
    }


    bottomView() {

        if (!store.paymentList.length)
            return (<View />)

        return (
            <Ripple
                onPress={() => {
                    if (store.selectedPayMode.name != 'COD')
                        this.navigateTo();
                    else
                        store.confirmOrder(global.sendAsFormData(confirmApiData))
                }}
                style={[styles.bottomView, { height: 45 }]}
                rippleColor={colors.RIPPLE}
            >

                <Text
                    style={[styles.stripLabel, { color: colors.WHITE }]}
                >
                    {constants.TXT_TOTAL + constants.SYMBOL_RUPEE + this.state.total}
                </Text>

                <Text
                    style={[styles.stripLabel, { color: colors.WHITE, flex: undefined }]}
                >
                    {constants.TXT_CONFIRM_ORDER}
                </Text>

            </Ripple>
        )
    }



    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={store.paymentList}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {this.bottomView()}
                {
                    (store.apiLoaded && !store.selectedPayMode) ? global.bottomBlockView() : <View />
                }

                {
                    store.loading &&
                    global.getLoader()
                }


            </View>
        );
    }

    handleRadioClick(index) {
        store.toggleSelection(index)
    }


    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator}
            />
        );
    };

    renderRow({ item, index }) {

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    this.handleRadioClick(index)
                }}
            >

                <View
                    style={[styles.styleFull, {
                        paddingVertical: 10, paddingHorizontal: 15,
                        backgroundColor: colors.WHITE, flexDirection: 'row'
                    }]}
                >

                    <RadioButton
                        color={colors.PRIMARY}
                        style={{ marginRight: 10 }}
                        selected={item.selected}
                        size={20}
                    />

                    <Image
                        source={{ uri: item.icon }}
                        style={{ height: 25, width: 25, marginRight: 25 }}
                    />

                    <Text
                        style={[styles.labelSmallX1]}
                    >
                        {item.name}

                    </Text>


                </View>
            </TouchableWithoutFeedback>

        )

    }


}

export default inject('paymentsStore', 'cartStore')(observer(SelectPayment));





