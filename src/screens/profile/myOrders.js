import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { Card, Button } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';

var listApiData = {
    page_no: 0,
    user_id: ''
}

var store;


@inject("myOrdersStore")
@observer
export default class MyOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        store = this.props.myOrdersStore
        this.resetStore();
    }

    resetStore() {
        store.apiLoaded = false;
        store.orders = []
    }

    componentDidMount() {

        // store.onApiActionDone = this.onApiActionDone;

        global.getItem(constants.USER).then(result => {
            if (!result) return;

            this.setUserIdToApiData(result)

            this.callApi();
        });


    }

    callApi() {
        store.getOrders(global.sendAsFormData(listApiData), listApiData.page_no)
    }


    setUserIdToApiData(result) {
        // listApiData.user_id = 1
        listApiData.user_id = result.user_id
    }



    navigateTo(item) {
        this.props.navigation.navigate('OrderDetails', {
            [constants.PARAM_USER]: listApiData.user_id,
            [constants.PARAM_ORDER]: item,
        });
    }

    handleRefresh() {
        listApiData.page_no = 0
        store.refreshing = true
        this.callApi()
    }


    //0 4 8 
    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.props.myOrdersStore.orders}
                    renderItem={this.renderRow.bind(this)}
                    onRefresh={this.handleRefresh.bind(this)}
                    refreshing={store.refreshing}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {
                    store.loading &&
                    global.getLoader()
                }

                {
                    (store.apiLoaded && !store.orders.length)
                    && global.getNoDataView()
                }

                {
                    store.message ?
                        global.getNoDataView(constants.NO_INTERNET_REF, constants.NO_INTERNET_REF) : <View />
                }


            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator}
            />
        );
    };

    drawKeyValue(key, value, moreStyles = {}) {

        return (

            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.stripLabel, { flex: undefined }]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmallX1, { marginLeft: 15 }]}
                >
                    {value}

                </Text>


            </View>
        )

    }

    renderRow({ item, index }) {

        // console.log('Orders row ' + JSON.stringify(item))

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    this.navigateTo(item)
                }}
            >
                <Card style={{ flex: 1, borderRadius: 0 }} key={index}>

                    <View
                        style={{ padding: 15 }}
                    >

                        <View
                            style={{
                                flex: 1, flexDirection: 'row'
                            }}
                        >
                            {this.drawKeyValue(constants.TXT_ORDERNO, item.order_id)}

                            <Text
                                style={[styles.stripLabel, { color: colors.GREEN_4, flex: undefined }]}
                            >
                                {item.order_date}

                            </Text>

                        </View>

                        {this.drawKeyValue(constants.TXT_TOTAL, item.total, { marginTop: 5 })}
                        {this.drawKeyValue(constants.TXT_ITEMS, item.total_quantity, { marginTop: 5 })}

                        <Text
                            style={[
                                styles.labelSmall
                            ], {
                                marginTop: 10,
                                textAlign: 'right',
                                flex: 1
                            }}
                        >
                            {item.order_status_name}

                        </Text>

                    </View>

                </Card>

            </TouchableWithoutFeedback>

        )

    }


}








