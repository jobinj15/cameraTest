import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { Card } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';
import { ScrollView } from 'react-native-gesture-handler';

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
          selectedAddress:undefined
        }

        store = this.props.addressListStore

        const { navigation } = this.props
        this.state.total = navigation.getParam('total', null)
        this.state.userId = navigation.getParam(constants.PARAM_USER, null)
        this.onFirstAddressAdded = this.onFirstAddressAdded.bind(this)
        this.afterAddressListLoaded= this.afterAddressListLoaded.bind(this)


    }

    onFirstAddressAdded(){
        store.getAddressList(global.sendAsFormData(addressApiData))
    }

    afterAddressListLoaded(){

        console.log('afterAddressListLoaded\n ' + JSON.stringify(this.props.navigation))

        if(store.addressList.length==0)
        this.navigateTo('AddAddress',constants.MODE_FIRST_ADD)
    }



    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         header: (
    //             <ToolBar
    //                 title={constants.TXT_PROFILE}
    //                 showTitleH={true}
    //                 showBackButton={false}
    //             />
    //         ),
    //     };
    // };

    componentDidMount() {
        // this.props.navigation = this.props.navigation
        addressApiData.user_id = this.state.userId;
        store.setAfterAddressListLoaded(this.afterAddressListLoaded);
        store.getAddressList(global.sendAsFormData(addressApiData),0)
    }

    componentWillUnmount(){
        // store.addressList = [];
        store.loadingCharges = false;
        store.loadingAddress = false;
        store.setAfterAddressListLoaded(undefined);
    }

    navigateTo(route,mode) {

        console.log('navigateTo: ' + JSON.stringify(this.props.navigation))

        this.props.navigation.navigate(route, {
            [constants.PARAM_ADDRESS] : store.selectedAddress,
            [constants.PARAM_USER] : this.state.userId,
            [constants.PARAM_MODE] : mode,
            'onFirstAddressAdded' : this.onFirstAddressAdded,
            total : this.state.total
        });    
    }


    bottomView() {

        if(!store.selectedAddress.id)
        return(
            <View/>
        )

        return (
            <TouchableWithoutFeedback
            onPress={
                ()=>{
                    this.navigateTo('SelectPayment')
                }
            }
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
                    {constants.TXT_CONTINUE}
                </Text>

            </View>
            </TouchableWithoutFeedback>
        )
    }

    handleChangeAddress(){
        if(store.addressList.length==0){
          this.navigateTo('AddAddress',constants.MODE_FIRST_ADD)
        }
        else this.navigateTo('AddressList',constants.MODE_SELECT)
    }




    render() {
        return (
            <View style={[styles.styleFull]}>

                <ScrollView>
                    <View
                        style={
                            { margin: 15 }
                        }
                    >  

                        {this.drawAddressCard()}

                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.handleChangeAddress();
                            }}
                        >
                            <View
                                style={[styles.largeButton, { width: undefined, marginLeft: 0, paddingHorizontal: 40 }]}
                            >
                                <Text
                                    style={styles.buttonText}
                                >
                                    {constants.TXT_ADD_CHANGE_ADDRESS}{" "}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </ScrollView>

                {this.bottomView()}

                {
                    (store.loadingAddress || store.loadingCharges) &&
                    global.getLoader()
                }


            </View>
        );
    }

    drawAddressCard() {

        var address = store.selectedAddress;
        
        if (!address.id)
            return (<View />)

        return (
            <Card
                style={[styles.styleFull, {
                    paddingTop: 20, paddingBottom: 10,
                    paddingHorizontal: 15,
                    marginBottom:20,
                    backgroundColor: colors.WHITE
                }]}
            >

                <Text
                    style={[styles.stripLabel]}
                >
                    {address.name}

                </Text>

                <Text
                    style={[styles.labelSmallX1, { marginTop: 10 }]}
                >
                    {address.address + ' ' + address.area + ' , ' + address.city + ' , ' + address.state
                        + ' , ' + address.pin_code
                    }

                </Text>
            </Card>

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
