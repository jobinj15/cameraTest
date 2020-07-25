
import React, { Component } from 'react'
import global from '../../../utility/global';
import colors from './colors_chk';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native'

export default class CheckBox extends Component {

    static propTypes = {
        onCheckChanged: PropTypes.func
    }

    static defaultProps = {
        isChecked: false
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }


    render() {

        return (

            <Ripple
                onPress={() => {
                    if (this.props.onCheckChanged)
                        this.props.onCheckChanged(this.props.isChecked)
                }}

            >
                <View
                    style={[{
                        borderWidth: 2,
                        height: 20,
                        width: 20,
                        backgroundColor: this.props.isChecked ? colors.PRIMARY : colors.WHITE,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: colors.BLACK
                    }, this.props.style]}
                >
                    
                    <Icon name="check" size={14} color={colors.WHITE}
                    />


                </View>

            </Ripple>
        )
    }

}