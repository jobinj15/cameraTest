import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { FloatingTitleTextInputField } from "../../components/custom_views/floatingtext";
import { TextField } from "react-native-material-textfield";
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome5';
import ToolBar from '../../components/toolbar'
import fonts from '../../utility/fonts';

var listApiData = {
    page_no: 0,
    user_id: ''
}


var applyCouponApiData = {
    cart_id: ''
}


var cartStore, couponStore;


@inject(stores => ({
    couponStore: stores.couponStore,
    cartStore: stores.cartStore,
}))
@observer

class ApplyCoupon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            couponCode: ''
        }

        cartStore = this.props.cartStore
        couponStore = this.props.couponStore

    }


    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <ToolBar
                    title={'Apply Coupon'}
                    showTitle={true}
                    navigation={navigation}
                    showBackButton={true}
                />
            ),
        };
    };


    componentDidMount() {

        // store.onApiActionDone = this.onApiActionDone;
        global.getItem(constants.USER).then(result => {
            if (!result) return;

            // this.setUserIdToApiData(result)

            // this.callApi()
        });


    }

    setUserIdToApiData(result) {
        listApiData.user_id = result.user_id
        addApiData.user_id = result.user_id
        removeCartApiData.user_id = result.user_id
        updateApiData.user_id = result.user_id
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }



    callApi() {
        let formdata = new FormData();
        for (let key in listApiData) {
            formdata.append(key, listApiData[key]);
        }
        cartStore.getCart(formdata, listApiData.page_no)
    }

    applyCoupon() {

    }


    getHeaders() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderColor: colors.LIGHT_GRAY,
                    borderWidth: 1,
                    alignItems: "center",
                    borderRadius: 3,
                    backgroundColor: colors.WHITE,
                    padding: 15
                }}
            >


                {/* <FloatingTitleTextInputField
                            attrName={'couponCode'}
                            title={constants.TXT_COUPON_CODE}
                            style={{ flex: 1 }}
                            value={this.state.couponCode}
                            disabled={couponStore.loading}
                            updateMasterState={this._updateMasterState}
                            textInputStyles={{ // here you can add additional TextInput styles
                                fontSize: 15,
                            }}
                            otherTextInputProps={{   // here you can add other TextInput props of your choice
                                numberOfLines: 1,
                            }}
                        /> */}

                <TextField
                    label={constants.TXT_COUPON_CODE}
                    autoFocus={true}
                    labelHeight={20}
                    maxLength={10}
                    autoCapitalize={true}
                    tintColor={colors.PRIMARY}
                    containerStyle={{ flex: 1 }}
                    titleFontSize={fonts._12}
                    numberOfLines={1}
                    onChangeText={code => {
                        this.state.couponCode = code;
                    }}
                    value={this.state.couponCode}
                />


                <TouchableWithoutFeedback
                    onPress={
                        () => {
                            if (!this.state.couponCode)
                                global.showMessage(constants.ERROR_COUPON)
                            else {
                                this.applyCoupon()
                            }
                        }
                    }
                >
                    <Text
                        style={[styles.apply, { marginLeft: 20 }]}
                    >
                        {global.capitalize(constants.TXT_APPLY)}
                    </Text>

                </TouchableWithoutFeedback>



            </View>

        )
    }

    render() {
        return (
            <View style={[styles.styleFull]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={couponStore.coupons}
                    style={{ backgroundColor: colors.WHITE }}
                    ListHeaderComponent={this.getHeaders()}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {
                    couponStore.loading &&
                    global.getLoader()
                }

                {
                    (couponStore.apiLoaded && !couponStore.coupons.length)
                    && global.getNoDataView()
                }

            </View>
        );
    }


    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator2}
            />
        );
    };



    navigateTo() {
        this.props.navigation.navigate('SelectAddress', {
            // [constants.PARAM_INDEX]: index,
            total: cartStore.total,
            [constants.PARAM_USER]: listApiData.user_id
        });
    }


    renderRow({ item, index }) {

        var marginBottom = 0;

        if ((couponStore.coupons.length - 1) == index)
            marginBottom = 60;

        return (

            <View
                style={styles.couponCard}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        alignSelf: 'stretch',
                        alignItems: 'center'
                    }}
                >

                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-start'
                        }}
                    >
                        <Text
                            style={[styles.productKey, {
                                borderStyle: 'dashed', borderWidth: 1,
                                borderRadius: 1, paddingHorizontal: 5, paddingTop: 3,
                                borderColor: colors.GREY
                            }]}
                        >
                            {item.code}
                        </Text>
                    </View>

                    <Text
                        style={[styles.buttonText, {
                            color: colors.PRIMARY,
                            fontSize: fonts._12
                        }]}
                    >
                        {constants.TXT_APPLY}
                    </Text>


                </View>


                <Text
                    style={[styles.productKey, { marginTop: 10, color: colors.DARKGRAY2 }]}
                >
                    {item.title}
                </Text>

                <View
                    style={{
                        flex: 1, flexDirection: 'row'
                    }}
                >

                    <Text
                        style={[styles.labelSmall, {flex:1}]}
                    >
                        {item.description}
                    </Text>

                    <View
                        style={{ flexDirection: 'row',alignItems:'center',marginLeft:15 }}
                    >
                        <Text
                            style={[styles.labelMini2, { color: colors.BLACK,marginRight:5 }]}
                        >

                            {constants.TXT_VIEW_MORE}

                        </Text>

                        <IconF name={'plus'} size={10} color={colors.BLACK} />


                    </View>


                </View>




            </View>
        )

    }


}

export default ApplyCoupon


