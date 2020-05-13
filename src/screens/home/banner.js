import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Card, Image, Text, Spacings } from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';
import styles from '../../styles/style';

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


@inject("bannerStore")
export default class HomeTab extends Component {
    constructor(props) {
        super(props);

        sliderWidth = global.DEVICE_WIDTH;
        itemWidth = global.DEVICE_WIDTH - 80

    }

    componentDidMount(){
        console.disableYellowBox = true;
    }

    
    render() {
        return (
            <View style={[styles.banner]}>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.bannerStore.banners}
                    renderItem={this.renderRow}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    loop={true}
                    autoplay={true}
                />

            </View>
        );
    }

    renderRow({ item, index }) {

        return (
            <Card style={{ flex: 1, borderRadius: 4 }} key={index}>

                <Card.Image imageSource={item.image}
                    style={{flex: 1}}
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


