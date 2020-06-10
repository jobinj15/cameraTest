import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { StackActions, NavigationActions } from 'react-navigation';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import fonts from '../../utility/fonts';

var store, currObj;

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFilters: []
        }

        store = this.props.filterStore
        currObj = this;

        this.resetStore()

        const { navigation } = this.props
        this.state.onApplyFilter = navigation.getParam('onApplyFilter', null)
        this.state.selectedFilters = navigation.getParam('filters', null)
        const po = navigation.getParam('po', null)
        // this.state.userId = navigation.getParam(constants.PARAM_USER, null)
        // this.state.total = navigation.getParam('total', null);
        // this.afterPaymentDone = this.afterPaymentDone.bind(this);

        console.log('SelectedFilters: ' + this.state.selectedFilters + ' ' + po)

        // this.setApiData()

    }


    resetStore() {
        store.filters = [],
            store.apiLoaded = false;
        store.loading = false;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <ToolBar
                    title={'Filters'}
                    showTitleH={false}
                    showDropdown={true}
                    showEndButton={true}
                    endIcon={'close-a'}
                    onEndIconClicked={onEndIconClicked}
                    navigation={navigation}
                    iconType={constants.IC_FONTISCO}
                    showBackButton={false}
                />
            ),
        };
    };

    componentDidMount() {
        // this.props.navigation = this.props.navigation
        store.onFiltersLoaded = this.setAppliedFilters;
        store.getFilters()
    }


    navigateTo() {
        this.props.navigation.navigate('SelectPayment', {
            // [constants.PARAM_INDEX]: index,
        });
    }

    setAppliedFilters(){

        let data;
        var filters = [...store.filters];
        var selFilters = currObj.state.selectedFilters;
        console.log('setAppliedFilters: ' + selFilters)

        for (let item of filters) {
            data = item.data
            console.log('setAppliedFilters: data' + JSON.stringify(data))
            for (let subItem of data) {
               for(let selFil of selFilters){
                   if(subItem.value_id == selFil)
                   subItem.selected = true;
               }
            }
        }

    }


    modifyfilterselection(reset, index, subIndex) {

        var filters = [...store.filters];

        if (reset) {
            let data;
            for (let item of filters) {
                data = item.data
                // console.log('SubItem: ' + JSON.stringify(data))
                for (let subItem of data) {
                    subItem.selected = false;
                }
            }

        }
        else {
            let toModifiedFilter = filters[index].data;

            var size = toModifiedFilter.length;
            var item;
            for (var i = 0; i < size; i++) {
                item = toModifiedFilter[i];

                if (i == subIndex)
                    item.selected = true;
                else item.selected = false;
            }
        }


        var newSelections = [];

        if (!reset) {
            for (let nItem of filters) {

                for (let nSubItem of nItem.data) {

                    if (nSubItem.selected)
                        newSelections.push(nSubItem.value_id)
                }
            }
        }

        this.filters = filters;
        this.state.selectedFilters = newSelections
    }



    drawfilters(filters) {

        if (!filters || !filters.length)
            return (
                <View />
            )

        console.log('drawfilters ' + JSON.stringify(filters))

        var filtersList = [];
        var mainItem;
        var outerSize = filters.length;

        for (let i = 0; i < outerSize; i++) {

            mainItem = filters[i];

            filtersList.push(

                <View
                    style={{
                        marginTop: i == 0 ? 0 : 60, width: global.DEVICE_WIDTH - 30,
                        height: 70
                    }} key={i.toString()}

                >
                    <View
                        style={{
                            flexDirection: 'row', alignItems: 'center',
                            flex: 1, marginBottom: 20,
                        }}
                    >
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/images/list.png')}
                        />
                        <Text
                            style={[styles.labelKey, {
                                marginLeft: 15, marginTop: 3,
                                color: colors.GREY2
                            }]}
                        >
                            {mainItem.optionmastername}
                        </Text>

                    </View>
                    <View
                        style={[styles.wrap]}
                    >
                        {
                            mainItem.data.map((subItem, subIndex) => {

                                let borderColor, backgroundColor, textColor;
                                if (mainItem.type == constants.TYPE_ADD) {
                                    borderColor = colors.PRIMARY;
                                    backgroundColor = colors.PRIMARY;
                                    textColor = colors.WHITE
                                } else {
                                    if (subItem.selected) {
                                        borderColor = colors.PRIMARY;
                                        backgroundColor = colors.PRIMARY;
                                        textColor = colors.WHITE
                                    }
                                    else {
                                        borderColor = colors.GREY;
                                        backgroundColor = colors.WHITE;
                                        textColor = colors.BLACK
                                    }
                                }


                                return (
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.modifyfilterselection(false, i, subIndex)
                                        }}
                                        key={(i + subIndex).toString()}
                                    >
                                        <View
                                            style={[mainItem.type == constants.TYPE_ADD ? styles.filterItem2 : styles.filterItem,
                                            {
                                                backgroundColor: backgroundColor,
                                                borderColor: borderColor,
                                                marginLeft: 8, alignItems: 'center',
                                                flexDirection: 'row'
                                            }]}
                                        >
                                            <Text
                                                style={{
                                                    color: textColor,
                                                    fontFamily: 'PopinsMed',
                                                    fontSize: fonts._14
                                                }}
                                            >
                                                {subItem.name}
                                            </Text>

                                            {
                                                mainItem.type == constants.TYPE_ADD &&
                                                <Icon name={'ios-close'} size={25} color={colors.WHITE}
                                                    style={{
                                                        marginLeft: 15
                                                    }}
                                                />

                                            }


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


    bottomView() {

        if (!store.filters.length)
            return (<View />)

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    if (cartStore.total)
                        this.navigateTo('SelectAddress')
                }}
            >
                <View
                    style={styles.bottomView}
                >

                    <Text
                        style={[styles.stripLabel, { color: colors.WHITE }]}
                    >
                        {constants.TXT_TOTAL + constants.SYMBOL_RUPEE + cartStore.total}
                    </Text>

                    <Text
                        style={[styles.stripLabel, { color: colors.WHITE, flex: undefined }]}
                    >
                        {constants.TXT_CHECKOUT}
                    </Text>


                </View>
            </TouchableWithoutFeedback>
        )
    }

    applyFilters() {
        // if (!this.state.selectedFilters.length)
        //     global.showMessage(constants.ERROR_FILTER)
        // else {
        //     this.props.navigation.pop()
        // }
        this.state.onApplyFilter(this.state.selectedFilters)
        this.props.navigation.pop()
    }


    drawBottomViews() {
        return (
            <View
                style={[styles.bottomView, { backgroundColor: 'transparent', justifyContent: 'center' }]}
            >

                <TouchableWithoutFeedback
                    onPress={() => {
                        this.modifyfilterselection(true, 0, 0);
                    }}
                >
                    <View
                        style={[styles.largeButton2, { width: undefined, paddingHorizontal: 30 }]}
                    >
                        <Text
                            style={styles.buttonText2}
                        >
                            {global.capitalize(constants.TXT_RESET)}{" "}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback
                    onPress={() => {
                        this.applyFilters();
                    }}
                >
                    <View
                        style={[styles.largeButton, { marginLeft: 30, paddingHorizontal: 30, width: undefined }]}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            {global.capitalize(constants.TXT_APPLY + ' Filters')}{" "}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>


            </View>
        )
    }


    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE, padding: 15 }]}>

                {this.drawfilters(store.filters)}
                {this.drawBottomViews()}

                {
                    store.loading &&
                    global.getLoader()
                }

                {
                    (store.apiLoaded && !store.products.length)
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

}

function onEndIconClicked() {
    // console.log('onEndIconClicked: ' + currObj + '  ' + currObj.navigation)
    currObj.props.navigation.pop();
}


export default inject('filterStore')(observer(Filter));



