import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput, TouchableWithoutFeedback, Text } from 'react-native';
import { string, func, object, number } from 'prop-types';
import colors from '../../../styles/colors'

export class FloatingTitleTextInputField extends Component {
    static propTypes = {
        attrName: string.isRequired,
        title: string.isRequired,
        value: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        titleActiveSize: number, // to control size of title when field is active
        titleInActiveSize: number, // to control size of title when field is inactive
        titleActiveColor: string, // to control color of title when field is active
        titleInactiveColor: string, // to control color of title when field is active
        textInputStyles: object,
        otherTextInputProps: object,
    }


    static defaultProps = {
        keyboardType: 'default',
        titleActiveSize: 11.5,
        titleInActiveSize: 15,
        titleActiveColor: colors.GREEN,
        titleInactiveColor: 'dimgrey',
        textInputStyles: {},
        otherTextInputAttributes: {},
    }

    constructor(props) {
        super(props);
        const { value } = this.props;
        this.position = new Animated.Value(value ? 1 : 0);
        this.state = {
            isFieldActive: false,
            secureTextEntry: true
        }
    }

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
                useNativeDriver : false
            }).start();
        }
    }

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.props.value) {
            this.setState({ isFieldActive: false });
            Animated.timing(this.position, {
                toValue: 0,
                duration: 150,
                useNativeDriver : false
            }).start();
        }
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
            titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
        } = this.props;

        return {
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
            }),
            fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
            marginTop: isFieldActive ? 5 : 10
        }
    }

    render() {
        return (
            <View style={[Styles.container, this.props.style]}
            pointerEvents = {this.props.disabled?'none':'auto'}
            >
                <Animated.Text
                    style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                >
                    {this.props.title}
                </Animated.Text>

                <View>
                    <TextInput
                        value={this.props.value}
                        style={[Styles.textInput, this.props.textInputStyles, {
                            borderBottomWidth: this.state.isFieldActive?1.5:0.5,
                            borderBottomColor: this.state.isFieldActive?colors.GREEN_4:colors.GREY,
                        }]}
                        // editable={this.props.disabled} 
                        // selectTextOnFocus={this.props.disabled}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur}
                        secureTextEntry={this.props.securedText && this.state.secureTextEntry}
                        onChangeText={this.props.onChange || this._onChangeText}
                        keyboardType={this.props.keyboardType}
                        {...this.props.otherTextInputProps}
                    />

                    {
                        this.props.securedText &&
                        <TouchableWithoutFeedback
                            onPress={
                                () => {
                                    this.setState({
                                        secureTextEntry: !this.state.secureTextEntry
                                    })
                                }
                            }
                        >
                            <Text
                                style={{
                                    position: 'absolute',
                                    fontSize: 15,
                                    right: 12,
                                    top: 35,
                                    color: colors.ORANGE
                                }}
                            >
                                Show
                        </Text>
                        </TouchableWithoutFeedback>
                    }

                </View>



            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    textInput: {
        fontSize: 16,
        textAlignVertical: 'top',
        padding: 6,
        color:colors.BLACK,
        paddingBottom: 2,
        marginTop: 23,
    },
    titleStyles: {
        position: 'absolute',
        left: 8,
    }
})