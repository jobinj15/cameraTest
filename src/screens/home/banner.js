import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Card, Image, Text, Spacings } from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';
import styles from '../../styles/style';

var store;

import {
    Assets,
    Constants,
    Button,
    Colors,
    Typography,
} from 'react-native-ui-lib'; //eslint-disable-line

var sliderWidth;
var itemWidth;

import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import global from '../../utility/global';
import constants from '../../utility/constants';


@inject("bannerStore")
export default class HomeTab extends Component {
    constructor(props) {
        super(props);

        sliderWidth = global.DEVICE_WIDTH;
        itemWidth = global.DEVICE_WIDTH - 80

        store = this.props.bannerStore;
    }

    componentDidMount() {
        console.disableYellowBox = true;

        global.getItem(constants.USER).then(result => {
            if (!result) return;
            store.getBanners(result.user_id)
        });

    }




    render() {
        return (
            <View style={[styles.banner,{marginTop:10}]}>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={store.banners}
                    renderItem={this.renderRow}
                    sliderWidth={sliderWidth}
                    sliderHeight={5}
                    itemWidth={itemWidth}
                    loop={true}
                    autoplay={true}
                />

            </View>
        );
    }

    renderRow({ item, index }) {

        console.log('Banners renderRow ' + JSON.stringify(item))


        return (
            <Card style={{ flex: 1, borderRadius: 4 }} key={index}>

                <Card.Image imageSource={{ uri: item.media }}
                    style={{ flex: 1 }}
                    cover={true}
                />

            </Card>

        )

        // {

        //     <Card style={{ flex: 1 }}>
        //         <View padding-15>
        //             <Text text30 dark30>
        //                 {"Sample Text"}
        //             </Text>
        //         </View>
        //     </Card>

        // }

    }

    renderSeparator = () => {
        return (
            <View
                style={styles.bannerSeperator}
            />
        );
    };
}


