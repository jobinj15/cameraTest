import React, { Component } from 'react';
import styles from '../../styles/style';
import { getAllThemes } from '../../styles/style';
import themeStore from '../../screens/stores/ThemeStore'
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList, BackHandler } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import { StackActions, NavigationActions } from 'react-navigation';
import { Dialog, RadioGroup, RadioButton } from 'react-native-ui-lib';
import ToolBar from '../../components/toolbar';
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'


var context;

class ProfileList extends Component {
    constructor(props) {
        super(props);

        this.showLogoutAlert = this.showLogoutAlert.bind(this)        
        this.logout = this.logout.bind(this)        

        this.state = {
            isDialogVisible: false,
            currTheme: themeStore.theme,
            data: [
                {
                    text: 'Account',
                    desc: constants.TXT_ACC_DESC,
                    icon: 'account',
                    navigate: ''
                },
                {
                    text: 'Orders',
                    desc: constants.TXT_ORDERS_DESC,
                    icon: 'dropbox',
                    navigate: 'MyOrders'
                },
                {
                    text: 'Address',
                    desc: constants.TXT_ADDR_DESC,
                    icon: 'map-marker',
                    navigate: 'Addresses'
                },
                {
                    text: 'Logout',
                    desc: '',
                    onClick : this.showLogoutAlert,
                    icon: 'logout',
                    navigate: ''
                },
                // {
                //     text: 'Theme',
                //     icon: '',
                //     onClick: this.openThemeDialog.bind(this)
                // }

            ]

        }
    }

    

    showLogoutAlert(){
        global.showAlert(constants.TITLE_DELETE, constants.DES_LOGOUT, this.logout);
    }

    openThemeDialog() {

        console.log('openThemeDialog ' + themeStore.theme)

        this.setState({
            isDialogVisible: true
        })
    }

    onDialogDismissed() {
        this.setState({
            isDialogVisible: false
        });
    }

    closeDialog() {
        this.setState({ isDialogVisible: false })
    }

    handleBack = () => {

        if (this.state.isDialogVisible) {
            this.closeDialog();
            return true
        }
        // else this.state.navigation.pop();

        return false

    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    }

    logout() {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({
                routeName: 'OnBoard', params: {
                }
            })]cd 
        });

        this.props.navigation.dispatch(resetAction);
        global.storeItem(constants.USER,null)

    }

    
    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
            header: (
                <ToolBar
                    title={constants.TXT_PROFILE}
                    showTitleH={false}
                    showDropdown={true}
                    showBackButton={false}
                />
            ),
        };
    };

    componentDidMount() {
        // this.props.navigation = this.props.navigation
        context = this;
        BackHandler.addEventListener("hardwareBackPress", this.handleBack);

        console.log('ProfileTheme : ' + themeStore.theme)
    }


    navigateTo(item) {
        if (item.navigate)
            this.props.navigation.navigate(item.navigate, {
                // [constants.PARAM_INDEX]: index,
            });
    }

    handleRadioClick(index) {
        console.log('handleRadioClick: ' + index)

        if (index != this.state.currTheme) {
            global.getItem(constants.PREFS).then((prefs) => {
                themeStore.theme = index;
                prefs.theme = index;
                global.storeItem(constants.PREFS, prefs)
                // this.logout()
            })
        }
        this.closeDialog();
    }


    getDialogContent() {
        return (
            <View
                style={{
                    backgroundColor: colors.WHITE,
                    padding: 15,
                    flex: 1
                }}
            >

                <Text
                    style={[styles.stripLabel, { flex: undefined, marginBottom: 20 }]}
                >{constants.TXT_SELECT_THEME}</Text>

                <RadioGroup
                    initialValue={this.state.currTheme}
                    onValueChange={this.handleRadioClick.bind(this)}
                >
                    {this.getRadios()}
                </RadioGroup>

            </View>
        )
    }

    getRadios() {
        const themes = getAllThemes();

        return themes.map((item, index) => {
            return (<RadioButton
                color={colors.PRIMARY}
                label={themes[index]}
                value={index}
                labelStyle={[styles.labelSmallX1, { padding: 10 }]}
            />
            )

        })
    }

    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE, paddingHorizontal: 5 }]}>


                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    style={{backgroundColor:colors.WHITE}}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    ListHeaderComponent={
                        this.getHeader()
                    }
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                <Dialog
                    bottom={true}
                    visible={this.state.isDialogVisible}
                    onDismiss={this.onDialogDismissed.bind(this)}
                    width='100%'
                    height={hp('60%')}
                >
                    {this.getDialogContent()}
                </Dialog>

            </View>
        );
    }

    getHeader() {
        return (
            <View
                style={{
                    alignSelf: 'stretch',
                    padding: 5,
                    alignItems: 'center',
                    marginBottom: 15,
                    marginTop:5,
                    flexDirection: 'row'
                }}
            >

                <View
                    style={global.getCircleViewStyle(90, { backgroundColor: colors.DISCOUNT })}
                >
                </View>

                <View
                    style={{ flex: 1, marginLeft: 15 }}
                >

                    <Text
                        style={[styles.productKey, {
                            alignSelf: 'stretch', fontSize: fonts._16,
                        }]}
                    >
                        {'Will Smith'}
                    </Text>

                    <Text
                        style={[styles.labelSmall, { color: colors.DISCOUNT, alignSelf: 'stretch' }]}
                        numberOfLines={1}
                    >
                        {'will.smith@storeinsta.com'}
                    </Text>
                </View>

            </View>

        )
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator2}
            />
        );
    };

    renderRow({ item, index }) {

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    if (item.onClick) {
                        item.onClick();
                        return;
                    }
                    this.navigateTo(item)
                }}
            >

                <View
                    style={[styles.styleFull, {
                        paddingVertical: 10, paddingHorizontal: 10,
                        flexDirection: 'row', alignItems: 'center',
                        backgroundColor: colors.WHITE
                    }]}

                >

                    <IconM name={item.icon} size={30} color={colors.DISCOUNT} />

                    <View
                        style={{ flex: 1, marginLeft: 15 }}
                    >

                        <Text
                            style={[styles.productKey]}
                        >
                            {item.text}

                        </Text>

                        {
                            item.desc ? <Text
                                style={[styles.labelSmall, { color: colors.DISCOUNT }]}
                            >
                                {item.desc}
                            </Text> : <View />
                        }


                    </View>

                    <IconI name={'ios-arrow-forward'} size={25} color={colors.BLACK} />


                </View>

            </TouchableWithoutFeedback>

        )

    }


}

export default ProfileList
