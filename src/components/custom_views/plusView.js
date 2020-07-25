import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import Ripple from 'react-native-material-ripple';


export default class PlusView extends Component {

    constructor(props) {
        super(props);
    }

    // marginTop: 10

    render() {

        const type = this.props.type;

        return (

            <Ripple
                onPress={() => {
                    if (this.props.onPress)
                        this.props.onPress(this.props.index)
                }}
                style={[styles.plusBox, type == constants.TYPE_MINUS ? {
                    borderTopLeftRadius: 3,
                    borderBottomLeftRadius: 3
                } : {
                        borderTopRightRadius: 3,
                        borderBottomRightRadius: 3
                    }
                ]}
            >
                    <Icon name={type == constants.TYPE_MINUS ? 'minus' : 'plus'} 
                    size={type == constants.TYPE_MINUS?25:20} color={colors.GREY} />

            </Ripple>


        )
    }
}
