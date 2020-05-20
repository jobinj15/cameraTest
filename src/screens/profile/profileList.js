import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import ToolBar from '../../components/toolbar';

class ProfileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    text: 'Account',
                    icon: '',
                    navigate: ''
                },
                {
                    text: 'Address',
                    icon: '',
                    navigate: 'Addresses'
                },
                {
                    text: 'Orders',
                    icon: '',
                    navigate: 'MyOrders'
                },

            ]

        }
    }

    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
            header: (
                <ToolBar
                    title={constants.TXT_PROFILE}
                    showTitleH={true}
                    showBackButton={false}
                />
            ),
        };
    };

    componentDidMount() {
        // this.props.navigation = this.props.navigation
    }


    navigateTo(item) {
        if (item.navigate)
            this.props.navigation.navigate(item.navigate, {
                // [constants.PARAM_INDEX]: index,
            });
    }

    //0 4 8 
    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        );
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

export default ProfileList
