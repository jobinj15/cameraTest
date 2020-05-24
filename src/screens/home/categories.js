import React, {Component} from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
@inject('catHomeStore')
@observer
export default class Categories extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const store = this.props.catHomeStore;
    store.getCategories();
  }

  //0 4 8
  render() {
    return (
      <View style={[{}, this.props.style ? this.props.style : {}]}>
        <FlatList
          navigation={this.props.navigation}
          extraData={this.state}
          style={{width: Dimensions.get('window').width}}
          contentContainerStyle={{alignItems: 'flex-start'}}
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


 getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderRow({item, index}) {
    // console.log('onCategories renderRow ' + JSON.stringify(item))

    var rowStyles = {
      marginTop: index > 3 ? 20 : 0,
      marginLeft: index % 4 == 0 ? 0 : 15,
    };

    // if(item.blank){
    //     return(
    //         <View
    //         style={[{
    //             height:80,
    //             width : 80
    //         },rowStyles]}
    //         />
    //     )
    // }

    var image = require('../../assets/images/pic1.jpg');
    if (item.img) image = {uri: item.img};

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.navigateTo();
        }}>
        <View
          style={{
            padding: 10,
            width: wp('25%'),
          }}>
          {/* <View style={[global.getCircleViewStyle(80),{backgroundColor:item.color}]}> */}
          <View
            style={{
              borderRadius: wp('22%') / 2,
              overflow: 'hidden',
              width: wp('21%'),
              height: wp('21%'),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: item.color,
            }}>
            {/* <Image
                            style={styles.styleFull}
                            source={item.image}
                            resizeMode="contain"
                        /> */}

            <Image
              style={{height: 50, width: 50}}
              source={image}
              resizeMode="contain"
            />
          </View>

          <Text
            style={[
              styles.labelSmall,
              {marginTop: 8, textAlign: 'center'},
            ]}
            numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
