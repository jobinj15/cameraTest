import React, { Component } from 'react';
import styles from '../../styles/style';
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import global from '../../utility/global';
import { View,TouchableWithoutFeedback,Text } from 'react-native';

export default class LabelStrip extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={[styles.stripContainer,this.props.style?this.props.style:{}]}>

                <Text
                    style={styles.stripLabel}
                >
                    {this.props.label}
                </Text>

                <TouchableWithoutFeedback 
                 onPress={()=>{
                     if(this.props.onPress)
                     this.props.onPress();
                 }}
                >
                    <Text
                        style={[styles.viewAll]}
                    >
                        {constants.TXT_VIEWALL}
                    </Text>
                </TouchableWithoutFeedback>


            </View>
        );
    }


}


