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

     //0 4 8 
    render() {
        return (
            <View style={[styles.stripContainer, this.props.style ? this.props.style : {}]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    contentContainerStyle={{alignItems:'center' }}
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

    navigateTo(){
        this.props.navigation.navigate('Products', {
          itemId: 86,
          otherParam: 'anything you want here',
        });
      }

    renderRow({ item, index }) {

        var rowStyles = {
            marginTop : index > 3 ? 20 : 0,
            marginLeft : index%4==0?0:10
        }


        return (

            <TouchableWithoutFeedback
            onPress={()=>{
              this.navigateTo()         
            }}
            >

                <View
                    style={[{
                        alignItems: 'center'
                    },rowStyles]}
                >
                    <View
                        style={global.getCircleViewStyle(80)}
                    >

                        <Image
                            style={styles.styleFull}
                            source={item.image}
                            resizeMode="contain"
                        />

                    </View>

                    <Text
                        style={[styles.labelSmall, { marginTop: 8 }]}
                    >

                        {item.text}

                    </Text>

                </View>
            </TouchableWithoutFeedback>

        )

    }


}


