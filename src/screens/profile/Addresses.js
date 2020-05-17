import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import colors from '../../styles/colors';
import constants from '../../utility/constants';

export default class Adresses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [

            ]
        }
    }


    navigateTo(to) {
        if (to)
            constants.NAVIGATION.navigate(to, {
                // [constants.PARAM_INDEX]: index,
            });
    }

    //0 4 8 
    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                {/* <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                /> */}

                {this.bottomView()}

            </View>
        );
    }


    bottomView() {
        return (
            <TouchableWithoutFeedback
             onPress={()=>{
                this.navigateTo('AddAddress')
             }}
             >
                <View
                    style={styles.bottomView}
                >

                    <Text
                        style={[styles.stripLabel, { color: colors.WHITE, textAlign: 'center' }]}
                    >
                        {constants.TXT_ADD_ADDRESS}
                    </Text>

                </View>

            </TouchableWithoutFeedback>
        )
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


