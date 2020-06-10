import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";

@inject("searchByBrandsStore")
export default class SearchByBrands extends Component {
    constructor(props) {
        super(props);
    }

    //0 4 8 
    render() {
        return (
            <View style={[styles.stripContainer, this.props.style ? this.props.style : {}]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.props.searchByBrandsStore.brands}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index}
                />

            </View>
        );
    }

    renderSeparator() {
        return (<View
            style={{ width: 15, height: 10}}
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
                        source={item.image}
                        resizeMode="contain"
                    />


                </View>
            </TouchableWithoutFeedback>

        )

    }


}


