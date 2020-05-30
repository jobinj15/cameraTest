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



var context;

class ProfileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogVisible: false,
            currTheme: themeStore.theme,
            data: [
                {
                    text: 'Account',
                    icon: '',
                    navigate: ''
                },
                {
                    text: 'Address',
                    icon: '',
                    navigate: 'Addresses'
                },
                {
                    text: 'Orders',
                    icon: '',
                    navigate: 'MyOrders'
                },
                {
                    text: 'Theme',
                    icon: '',
                    onClick: this.openThemeDialog.bind(this)
                }

            ]

        }
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

    backHome() {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({
                routeName: 'Home', params: {
                    // navigator: this.props.navigation
                }
            })]
        });

        this.props.navigation.dispatch(resetAction);

    }


    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
            header: (
                <ToolBar
                    title={constants.TXT_PROFILE}
                    showTitleH={true}
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
                this.backHome()
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
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
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
                    if (item.onClick) {
                        item.onClick();
                        return;
                    }
                    this.navigateTo(item)
                }}
            >

                <View
                    style={[styles.styleFull, { paddingVertical: 10, paddingHorizontal: 15, backgroundColor: colors.WHITE }]}
                >

                    <Text
                        style={[styles.labelProfile]}
                    >
                        {item.text}

                    </Text>


                </View>
            </TouchableWithoutFeedback>

        )

    }


}

export default ProfileList
