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

var confirmApiData = {
    user_id: '',
    payment_mode: 1,
    address_id: ''
}
var store;


class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {


        }

        store = this.props.paymentsStore

        // this.resetStore()

        const { navigation } = this.props
        this.state.address = navigation.getParam(constants.PARAM_ADDRESS, null)
        this.state.userId = navigation.getParam(constants.PARAM_USER, null)
        this.state.total = navigation.getParam('total', null);
        this.afterPaymentDone = this.afterPaymentDone.bind(this);


        // this.setApiData()

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

    // static navigationOptions = ({ navigation }) => {
    //     //return header with Custom View which will replace the original header 
    //     return {
    //         header: (
    //             <ToolBar
    //                 title={'Select Payment'}
    //                 showTitle={true}
    //                 showBackButton={true}
    //             />
    //         ),
    //     };
    // };

    componentDidMount() {
        // this.props.navigation = this.props.navigation
        store.setAfterPayment(this.afterPaymentDone);
        store.getPaymentList()
    }


    navigateTo() {
        this.props.navigation.navigate('SelectPayment', {
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

    drawfilters(data) {

        if (!data.filters || !data.filters.length)
            return (
                <View />
            )

        console.log('drawfilters ' + JSON.stringify(data.filters))

        var filtersList = [];
        var filters = data.filters;
        var mainItem;
        var outerSize = filters.length;

        for (let i = 0; i < outerSize; i++) {

            mainItem = filters[i];

            filtersList.push(

                <View
                    style={{
                        flexDirection: 'row', marginTop: 10, width: global.DEVICE_WIDTH - 40,
                        height: 50
                    }} key={i.toString()}

                >
                    <Text
                        style={[styles.labelSmallX1, { marginRight: 20}]}
                    >
                        {mainItem.name}
                    </Text>

                    <View
                        style={[styles.wrap]}
                    >
                        {
                            mainItem.items.map((subItem, subIndex) => {
                                return (
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.modifyfilterselection(i, subIndex)
                                        }}
                                        key={(i + subIndex).toString()}
                                    >
                                        <View
                                            style={{
                                                marginLeft: 3
                                            }}
                                        >
                                            <Text
                                                style={[styles.variant,
                                                { backgroundColor: subItem.selected ? colors.PRIMARY : colors.GREY }]}
                                            >
                                                {subItem.name}
                                            </Text>     
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>

                </View>
            )
        }

        console.log("filtersList : " + filtersList)
        return filtersList;

    }



    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

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



