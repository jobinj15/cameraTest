import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import constants from '../../utility/constants';
import colors from '../../styles/colors';

export default class PlusView extends Component {

    constructor(props) {
        super(props);
    }

    // marginTop: 10

    render() {

        const type = this.props.type;

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    if (this.props.onPress)
                        this.props.onPress(this.props.index)
                }}
            >
                <View
                    style={[styles.plusBox, type == constants.TYPE_MINUS ? {
                        borderTopLeftRadius: 3,
                        borderBottomLeftRadius: 3
                    } : {
                            borderTopRightRadius: 3,
                            borderBottomRightRadius: 3
                        }
                    ]}
                >

                    {/* <Text
                            style={[styles.plusText,type==constants.TYPE_MINUS?{fontSize: 40}:{fontSize: 28}]}
                        >
                            {type == constants.TYPE_MINUS ? constants.MINUS_SYMBOL : constants.PLUS_SYMBOL}
                        </Text> */}

                    <Icon name={type == constants.TYPE_MINUS ? 'minus' : 'plus'} size={25} color={colors.GREY} />


                </View>

            </TouchableWithoutFeedback>


        )
    }
}
