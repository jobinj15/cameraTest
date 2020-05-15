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
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                    data={this.props.searchByBrandsStore.brands}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index}
                />

            </View>
        );
    }

    renderRow({ item, index }) {

        return (

            <TouchableWithoutFeedback>

                <View
                    style={[styles.searchByBrandsContainer]}
                >
                    <Image
                        style={styles.styleFull}
                        source={item.image}
                        resizeMode="contain"
                    />


                </View>
            </TouchableWithoutFeedback>

        )

    }


}


