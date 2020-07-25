import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import LabelStrip from './labelStrip';
import { ScrollView } from 'react-native-gesture-handler';

var store;

@inject("searchByBrandsStore")
@observer
export default class SearchByBrands extends Component {
    constructor(props) {
        super(props);

        store = this.props.searchByBrandsStore;
    }


    componentDidMount() {
        store.getBrands()
    }

    //0 4 8 


    render() {

        if(!store.brands.length){
            return<View/>
        }

        return (
            <View style={[styles.styleFull, this.props.style ? this.props.style : {}]}>

                <LabelStrip
                    style={{
                        marginTop: 30
                    }}
                    label={constants.TXT_SEARCH_BYBRAND}
                />

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    horizontal
                    style={{
                        paddingHorizontal: 10,marginTop:5
                    }}
                    showsHorizontalScrollIndicator={false}
                    data={store.brands}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index}
                />

            </View>
        );
    }

    renderSeparator() {
        return (<View
            style={{ width: 15, height: 10 }}
        />)
    }

    renderRow({ item, index }) {

        return (

            <TouchableWithoutFeedback>

                <View
                    style={[styles.searchByBrandsContainer]}
                >
                    <Image
                        style={{ width: 80, height: 40 }}
                        source={{ uri: item.img }}
                        resizeMode="contain"
                    />


                </View>
            </TouchableWithoutFeedback>

        )

    }


}


