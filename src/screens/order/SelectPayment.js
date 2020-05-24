import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { StackActions,NavigationActions} from 'react-navigation';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';

var confirmApiData = {
    user_id : '',
    payment_mode : 1,
    address_id : ''
}
var store;


class SelectPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {


        }

        store = this.props.paymentsStore

        const { navigation } = this.props
        this.state.address = navigation.getParam(constants.PARAM_ADDRESS, null)
        this.state.userId = navigation.getParam(constants.PARAM_USER, null)
        this.state.total = navigation.getParam('total', null);
        this.afterPaymentDone = this.afterPaymentDone.bind(this);

        this.setApiData()

    }


    setApiData(){
      confirmApiData.user_id = this.state.userId;
      confirmApiData.address_id = this.state.address.id
    }


    componentWillUnmount(){
        store.paymentList = []
        store.loading = false;
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

    afterPaymentDone(){
        this.props.navigation.navigate('OrderSuccess',{

        });

        this.props.cartStore.cart = [];
        this.props.cartStore.total = 0;
        this.props.cartStore.noOfItems = 0;
    }

    
    bottomView() {

        if(!store.paymentList.length)
        return(<View/>)

        return (
            <TouchableWithoutFeedback
            onPress={()=>{
                store.confirmOrder(global.sendAsFormData(confirmApiData))
            }}
            >
            <View
                style={styles.bottomView}
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

            </View>
            </TouchableWithoutFeedback>
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
                    store.loading &&
                    global.getLoader()
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

    renderRow({ item, index }) {

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    // this.navigateTo()
                }}
            >

                <View
                    style={[styles.styleFull, { paddingVertical: 10, paddingHorizontal: 15, 
                        backgroundColor: colors.WHITE , flexDirection:'row' }]}
                >

                    <Image
                    source={{uri:item.icon}}
                    style={{height:25,width:25,marginRight:25}}
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

export default inject('paymentsStore','cartStore')(observer(SelectPayment));
