// import React, { Component } from 'react';
// import styles from '../../styles/style';
// import global from '../../utility/global';
// import { View, TouchableWithoutFeedback, Text, Image, BackHandler } from 'react-native';
// import colors from '../../styles/colors';
// import constants from '../../utility/constants';
// import ToolBar from '../../components/toolbar';
// import { StackActions, NavigationActions } from 'react-navigation';
// import PayuMoney from 'react-native-payumoney';
// import PayUConfig from '../../config/PayUConfig';
// import user_repository from '../../repos/user_repository';


// class PayWithPayU extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {

//         }

//         this.backHome = this.startPayment.bind(this)
//     }


//     static navigationOptions = ({ navigation }) => {
//         //return header with Custom View which will replace the original header 
//         return {
//             header: (
//                 <ToolBar
//                     title={constants.TITLE_ORDER_SUCCESS}
//                     showTitle={true}
//                     showBackButton={false}
//                 />
//             ),
//         };
//     };

//     componentDidMount() {
//         // this.props.navigation = this.props.navigation
//         // BackHandler.addEventListener("hardwareBackPress", this.startPayment);

//     }

//     componentWillUnmount() {
//         // BackHandler.removeEventListener("hardwareBackPress", this.startPayment);
//         console.log("componentWillUnmount called!");
//     }



//     startPayment() {

//     }

//     getPaymentHash() {

//         //use these params and send to server to generate hash

//         let amount = '99.9';
//         let txid = new Date().getTime() + "";
//         let productId = "product101";
//         let name = "asdf";
//         let email = "hello@world.com";
//         let phone = "8898123456";
//         let surl = "https://www.example.com/payu-validate.php"; //can be diffrennt for Succes
//         let furl = "https://www.example.com/payu-validate.php"; //can be diffrennt for Failed
//         let id = PayUConfig.MER_ID; //Your Merchant ID here
//         let key = PayUConfig.MER_KEY; //Your Key Here
//         let sandbox = true;

//         let options = {
//             amount: amount,
//             txid: txid,
//             name: name,
//             email: email,
//             phone: phone,
//             id: id,
//             productId: productId,
//             key: key,
//             surl: surl,
//             furl: furl,
//             sandbox: sandbox,
//             hash: ''
//         };

//         console.log('PayUParams: ' + JSON.stringify(options))

//         this.setState({ loading: true }, () => {
//             user_repository.getPayUHash(global.sendAsFormData(options), this.onHashResponse.bind(this),options)
//         })

//     }

//     onHashResponse(isError, responseData, paymentData) {

//         this.setState({ loading: false }, () => {
//             if (!isError) {
//                 // paymentData.hash = responseData.data
//                 paymentData.hash = responseData.data
//                 console.log('paymentData: ' + JSON.stringify(paymentData))

//                 PayuMoney.pay(paymentData).then((d) => {
//                     console.log(d); // WIll get a Success response with verification hash
//                 }).catch(e => {
//                     console.log(e); //In case of failture 
//                 })
//             }
//             else global.showMessage(responseData.message)

//         })
//     }

//     render() {
//         return (
//             <View style={[styles.styleFull, { backgroundColor: colors.WHITE, padding: 15 }]}>

//                 <Text
//                     style={[styles.labelSmallX1, { marginVertical: 25 }]}
//                 >
//                     {'start payment'}

//                 </Text>

//                 <TouchableWithoutFeedback
//                     onPress={() => {
//                         this.getPaymentHash();
//                     }}
//                 >
//                     <View
//                         style={[styles.largeButton, { width: undefined, marginLeft: 0, paddingHorizontal: 40 }]}
//                     >
//                         <Text
//                             style={styles.buttonText}
//                         >
//                             {constants.TXT_PAY}{" "}
//                         </Text>
//                     </View>
//                 </TouchableWithoutFeedback>

//                 {
//                     this.state.loading &&
//                     global.getLoader()
//                 }


//             </View>
//         );
//     }



// }

// export default PayWithPayU

