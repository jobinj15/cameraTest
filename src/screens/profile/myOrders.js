import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { Card, Button } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';
import fonts from '../../utility/fonts';

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
                    style={{ backgroundColor: colors.WHITE }}
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
                    && global.getNoDataView(constants.TXT_EMP_ORDERS,constants.FRM_ORDERS)
                }

                {
                    store.message ?
                        global.getNoDataView(constants.NO_INTERNET_REF, constants.NO_INTERNET_REF) : <View />
                }


            </View>
        );
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <ToolBar
                    title={constants.TITLE_ORDERLIST}
                    showTitle={true}
                    navigation={navigation}
                    showBackButton={true}
                />
            ),
        };
    };

    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator2}
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
                }]}
            >

                <Text
                    style={[styles.labelSmall, { flex: 1, color: colors.BLACK }]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelMed, moreStyles]}
                >
                    {value}

                </Text>


            </View>
        )

    }

    getOrderStatus(status, text, payMode) {

        let fontStyle = [styles.labelSmall2]
        let viewStyle = [styles.orderStatus]

        switch (status) {

            default: {
                fontStyle = [...fontStyle, { color: colors.FT_DELIVERED }];
                viewStyle = [...viewStyle, { backgroundColor: colors.BG_DELIVERED }]
                break;
            }

        }



        return (

            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                }]}
            >

                <View
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={viewStyle}
                    >
                        <Text
                            style={fontStyle}
                        >
                            {text}
                        </Text>

                    </View>

                </View>

                <Text
                    style={[styles.labelSmall, { color: colors.BLACK }]}
                >
                    {payMode}

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
                <Card style={{ flex: 1, borderRadius: 0 }} key={index} elevation={0} enableShadow={false}>

                    <View
                        style={{ padding: 15 }}
                    >

                        {this.drawKeyValue(constants.TXT_ORDERNO + item.order_id, item.order_date)}
                        {this.drawKeyValue(item.total_quantity + ' items ordered', constants.SYMBOL_RUPEE +
                            item.total,
                            { color: colors.PRIMARY, fontSize: fonts._16 })}
                        {this.getOrderStatus(item.order_status, item.order_status_name, 'COD')}

                        {/* <Text
                            style={[
                                styles.labelSmall
                            ], {
                                marginTop: 10,
                                textAlign: 'right',
                                flex: 1
                            }}
                        >
                            {item.order_status_name}

                        </Text> */}

                    </View>

                </Card>

            </TouchableWithoutFeedback>

        )

    }


}








