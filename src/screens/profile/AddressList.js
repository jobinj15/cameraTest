import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import Icon from 'react-native-vector-icons/MaterialIcons'

var listApiData = {
    page_no: 0,
    user_id: ''
}

var deleteApiData = {
    address_id: undefined
}

var store;

@inject("addressListStore")
@observer
export default class AdressList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteIndex: undefined
        }

        store = this.props.addressListStore
        this.onDeleteYes = this.onDeleteYes.bind(this)
    }


    componentDidMount() {

        // store.onApiActionDone = this.onApiActionDone;

        global.getItem(constants.USER).then(result => {
            if (!result) return;

            this.setUserIdToApiData(result)

            this.callApi()
        });


    }

    callApi() {
        store.getAddressList(global.sendAsFormData(listApiData), listApiData.page_no)
    }

    onDeleteYes() {
        deleteApiData.address_id = store.addressList[this.state.deleteIndex].id
        store.deleteAddress(global.sendAsFormData(deleteApiData, this.state.deleteIndex))
    }




    setUserIdToApiData(result) {
        // listApiData.user_id = 1
        listApiData.user_id = result.user_id
    }


    navigateTo(to, mode, item) {
        if (to)
            this.props.navigation.navigate(to, {
                [constants.PARAM_USER]: listApiData.user_id,
                [constants.PARAM_MODE]: mode,
                [constants.PARAM_ITEM]: item
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
                    data={store.addressList}
                    onRefresh={this.handleRefresh.bind(this)}
                    refreshing={store.refreshing}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {
                    store.loading &&
                    global.getLoader()
                }

                {
                    (store.apiLoaded && !store.addressList.length)
                    && global.getNoDataView()
                }


                {this.bottomView()}

            </View>
        );
    }


    bottomView() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.navigateTo('AddAddress')
                }}
            >
                <View
                    style={styles.bottomView}
                >

                    <Text
                        style={[styles.stripLabel, { color: colors.WHITE, textAlign: 'center' }]}
                    >
                        {constants.TXT_ADD_ADDRESS}
                    </Text>

                </View>

            </TouchableWithoutFeedback>
        )
    }


    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator}
            />
        );
    };

    renderRow({ item, index }) {

        console.log('renderRow addressList: ' + JSON.stringify(item))

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    // this.navigateTo(item)
                }}
            >

                <View
                    style={[styles.styleFull, {
                        paddingTop: 20, paddingBottom: 10,
                        paddingHorizontal: 15,
                        backgroundColor: colors.WHITE
                    }]}
                >

                    <Text
                        style={[styles.stripLabel]}
                    >
                        {item.name}

                    </Text>

                    <Text
                        style={[styles.labelSmallX1, { marginTop: 10 }]}
                    >
                        {item.address + ' ' + item.area + ' , ' + item.city + ' , ' + item.state
                            + ' , ' + item.pin_code
                        }

                    </Text>

                    <View
                        style={[styles.topRight]}
                    >

                        <TouchableWithoutFeedback
                            onPress={() => {
                               this.navigateTo('AddAddress',constants.MODE_EDIT,item)
                            }}
                        >
                            <Icon name="edit" size={20} color={colors.GREY} />
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.state.deleteIndex = index;
                                global.showAlert(constants.TITLE_DELETE, constants.DES_DEL, this.onDeleteYes)
                            }}
                        >
                            <Icon name="delete" size={20} color={colors.GREY} style={{ marginLeft: 10 }} />
                        </TouchableWithoutFeedback>



                    </View>



                </View>



            </TouchableWithoutFeedback>

        )

    }


}


