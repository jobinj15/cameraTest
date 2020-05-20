import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";

@inject("catHomeStore")
@observer
export default class Categories extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const store = this.props.catHomeStore;
        store.getCategories()
    }

    //0 4 8 
    render() {
        return (
            <View style={[styles.stripContainer, this.props.style ? this.props.style : {}]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}
                    data={this.props.catHomeStore.categories}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index}
                    numColumns={4}
                />

            </View>
        );
    }

    navigateTo() {
        this.props.navigation.navigate('Products', {
            itemId: 86,
            otherParam: 'anything you want here',
        });
    }

    renderRow({ item, index }) {

        console.log('onCategories renderRow ' + JSON.stringify(item))


        var rowStyles = {
            marginTop: index > 3 ? 20 : 0,
            marginLeft: index % 4 == 0 ? 0 : 15
        }

        if(item.blank){
            return(
                <View
                style={[{
                    height:80,
                    width : 80
                },rowStyles]}
                />
            )
        }
        


        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    this.navigateTo()
                }}
            >

                <View
                    style={[{
                        alignItems: 'center',
                    }, rowStyles]}
                >
                    <View
                        style={global.getCircleViewStyle(80)}
                    >

                        {/* <Image
                            style={styles.styleFull}
                            source={item.image}
                            resizeMode="contain"
                        /> */}

                        <Image
                            style={styles.styleFull}
                            source={index%2==0?require('../../assets/images/pic1.jpg'):require('../../assets/images/pic2.jpg')}
                            resizeMode="contain"
                        />

                    </View>

                    <Text
                        style={[styles.labelSmall, { marginTop: 8,width:80,textAlign:'center'}]}
                        numberOfLines = {1}
                    >

                        {item.name}

                    </Text>

                </View>
            </TouchableWithoutFeedback>

        )

    }


}


