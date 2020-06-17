import React, {Component} from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import {Card, Button} from 'react-native-ui-lib';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import Ripple from 'react-native-material-ripple';
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import ToolBar from '../../components/toolbar';
import PlusView from '../../components/custom_views/plusView';
import fonts from '../../utility/fonts';

var listApiData = {
  page_no: 0,
  per_page: 10,
  cat_id: '',
  value_id: '',
  user_id: '',
};

var addApiData = {
  user_id: '',
  catalogue_id: '',
  quantity: '',
};

var updateApiData = {
  user_id: '',
  catalogue_id: '',
  quantity: '',
  cart_id: '',
};

var removeCartApiData = {
  cart_id: '',
};

var prodStore, cartStore, currObj;

const TAG = 'Products ';

@inject((stores) => ({
  productsStore: stores.productsStore,
  cartStore: stores.cartStore,
}))
@observer
export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilters: [],
    };

    this.onPlusClicked = this.onPlusClicked.bind(this);
    this.onMinusClicked = this.onMinusClicked.bind(this);
    this.onApiActionDone = this.onApiActionDone.bind(this);
    this.onApplyFilter = this.onApplyFilter.bind(this);

    prodStore = this.props.productsStore;
    cartStore = this.props.cartStore;

    this.resetStore();
    currObj = this;

    const {navigation} = this.props;
    const item = navigation.getParam([constants.PARAM_ITEM], null);
    listApiData.cat_id = item.id;
    prodStore.cat_id = item.id;

    this.updateToolbarTitle(item.name);

    console.log(TAG, 'Item: ' + JSON.stringify(item));
  }

  componentDidMount() {
    prodStore.onApiActionDone = this.onApiActionDone;

    global.getItem(constants.USER).then((result) => {
      if (!result) return;

      this.setUserIdToApiData(result);

      this.callApi();
    });

    console.log('setTheme Prod' + window.theme);
  }

  static navigationOptions = ({navigation}) => {
    console.log(
      'Navigation ProdList: ' + JSON.stringify(navigation.state.params),
    );
    // constants.TXT_PRODUCTS
    return {
      header: (
        <ToolBar
          title={navigation.state.params.Title}
          showTitle={true}
          showEndButton={true}
          endIcon={'settings'}
          iconType={constants.IC_OCT}
          showEndButton2={true}
          endIcon2={'ios-search'}
          onEndIconClicked={onEndIcon2Clicked}
          iconType2={constants.IC_IONIC}
          navigation={navigation}
          showBackButton={true}
        />
      ),
    };
  };

  drawOfferView(item) {
    return (
      <View style={styles.offer}>
        <Text style={styles.offerText}>{'20% OFF'}</Text>
      </View>
    );
  }

  setUserIdToApiData(result) {
    listApiData.user_id = result.user_id;
    addApiData.user_id = result.user_id;
    removeCartApiData.user_id = result.user_id;
    updateApiData.user_id = result.user_id;
  }

  callApi() {
    let formdata = new FormData();
    for (let key in listApiData) {
      formdata.append(key, listApiData[key]);
    }
    prodStore.getProducts(formdata, listApiData.page_no);
  }

  handleRefresh(isFilter) {
    listApiData.page_no = 0;
    isFilter ? (prodStore.loading = true) : (prodStore.refreshing = true);
    this.callApi();
  }

  handleLoadMore() {
    console.log('handleLoadMore called!');
    listApiData.page_no = listApiData.page_no + 1;
    this.callApi();
  }

  render() {
    return (
      <View style={[styles.styleFull, {backgroundColor: colors.WHITE}]}>
        <FlatList
          navigation={this.props.navigation}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          data={prodStore.products}
          style={{backgroundColor: colors.WHITE}}
          renderItem={this.renderRow.bind(this)}
          onRefresh={this.handleRefresh.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={2}
          refreshing={prodStore.refreshing}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index.toString()}
        />

        {prodStore.loading && global.getLoader()}

        {prodStore.apiLoaded &&
          !prodStore.products.length &&
          global.getNoDataView(
            constants.TXT_EMP_PRODUCTS,
            constants.FRM_PRODUCTS,
          )}

        {prodStore.message ? (
          global.getNoDataView(
            constants.NO_INTERNET_REF,
            constants.NO_INTERNET_REF,
          )
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderSeparator = () => {
    return <View style={styles.productSeperator2} />;
  };

  navigateTo(screen, index) {
    var item;

    if (!isNaN(index)) item = prodStore.products[index];

    console.log('SelectedFilters sent: ' + currObj.state.selectedFilters);

    this.props.navigation.navigate(screen, {
      [constants.PARAM_PRODUCT]: item,
      filters: currObj.state.selectedFilters,
      po: 'PoTest',
      onApplyFilter: this.onApplyFilter,
    });
  }

  onPlusClicked(index) {
    if (prodStore.cartUpdating) return;

    var item = prodStore.products[index];
    updateApiData.catalogue_id = item.id;
    updateApiData.quantity = item.cart_quantity + 1;
    updateApiData.cart_id = item.cart_id;

    prodStore.updateCart(
      global.sendAsFormData(updateApiData),
      index,
      null,
      constants.TYPE_PLUS,
    );
    // this.props.cartStore.plusCart(null, item.id)
  }

  onMinusClicked(index) {
    if (prodStore.cartUpdating) return;

    var item = prodStore.products[index];
    updateApiData.catalogue_id = item.id;
    updateApiData.quantity = item.cart_quantity - 1;
    updateApiData.cart_id = item.cart_id;

    if (item.cart_quantity == 1)
      prodStore.deleteItem(global.sendAsFormData(updateApiData), index);
    else
      prodStore.updateCart(
        global.sendAsFormData(updateApiData),
        index,
        null,
        constants.TYPE_MINUS,
      );
  }

  onAddToCart(index) {
    if (prodStore.cartUpdating) return;

    var item = prodStore.products[index];
    addApiData.catalogue_id = item.id;
    addApiData.quantity = 1;

    prodStore.addToCart(global.sendAsFormData(addApiData), index);
    // this.props.cartStore.addToCart(null, item)
  }

  onApplyFilter(filters) {
    console.log(TAG + 'onApplyFilter ' + filters);
    this.state.selectedFilters = filters;
    this.resetStore();
    listApiData.value_id = filters.toString();
    this.handleRefresh(true);
  }

  onApiActionDone(item, type) {
    console.log('onApiActionDone: ' + type + ' ' + JSON.stringify(item));

    // if (type == constants.TYPE_ADDCART)
    //     cartStore.afterAddCart(null, item,false,true)
    // else if (type == constants.TYPE_PLUS)
    //     cartStore.afterPlusCart(null, item.cart_id,false,true)
    // else cartStore.afterMinusCart(null, item.cart_id,false,true)

    var cartListApiData = {
      page_no: 0,
      user_id: listApiData.user_id,
    };

    cartStore.getCart(global.sendAsFormData(cartListApiData), 0);
  }

  drawButtonView(item, index) {
    if (item.loading)
      return (
        <View style={[styles.plusContainer, {justifyContent: 'center'}]}>
          <ActivityIndicator size="small" color={colors.DARKGRAY} />
        </View>
      );

    if (!item.cart_quantity)
      return (
        <Button
          style={[styles.addContainer]}
          onPress={() => {
            this.onAddToCart(index);
          }}
          backgroundColor={colors.GREEN_4}
          label={constants.TXT_ADDTOCART}
          labelStyle={{
            fontFamily: global.FONT_FAMILY.PopinsBold,
            fontSize: fonts._10,
          }}
          borderRadius={3}
          enableShadow
        />
      );

    return (
      <View style={[styles.plusContainer, {}]}>
        <PlusView
          index={index}
          type={constants.TYPE_MINUS}
          onPress={this.onMinusClicked}
        />
        <Text
          style={[
            styles.stripLabel,
            {
              textAlign: 'center',
              fontFamily: global.FONT_FAMILY.PopinsBold,
              flex: undefined,
              color: colors.BLACK,
              fontSize: fonts._18,
              paddingHorizontal: 15,
            },
          ]}>
          {item.cart_quantity}
        </Text>

        <PlusView
          index={index}
          type={constants.TYPE_PLUS}
          onPress={this.onPlusClicked}
        />
      </View>
    );
  }

  resetStore() {
    console.log(TAG + 'resetStore called!');

    prodStore.products = [];
    prodStore.apiLoaded = false;
    prodStore.loading = false;
    prodStore.refreshing = false;
    prodStore.page = 0;
    prodStore.message = '';
  }

  updateToolbarTitle = (titleText) => {
    console.log('updateToolbarTitle: ' + titleText);
    this.props.navigation.setParams({
      Title: titleText,
    });
  };

  renderRow({item, index}) {
    let image = require('../../assets/images/placeholder.jpeg');
    // let image = '';
    let variant = '';

    if (Array.isArray(item.variants) && item.variants.length)
      variant = item.variants[0].value;

    if (Array.isArray(item.images) && item.images.length) {
      image = {uri: item.images[0]};
    }

    // console.log(image);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.navigateTo('ProductDetail', index);
        }}>
        <Card
          style={{flex: 1, borderRadius: 0}}
          key={index}
          elevation={0}
          enableShadow={false}>
          <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={styles.productImage}>
                <Image source={image} style={styles.productThumbnail} />
                {index == 0 && this.drawOfferView(item)}
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={[
                    styles.stripLabel,
                    {
                      flex: undefined,
                    },
                  ]}
                  numberOfLines={2}>
                  {item.name}
                </Text>

                {/* <Text
                                    style={[styles.labelSmall]}
                                    numberOfLines={2}
                                >
                                    {item.description}
                                </Text> */}

                <Text style={[styles.weight]}>{variant}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.amount]}>
                    {constants.SYMBOL_RUPEE + item.price}
                  </Text>

                  <Text
                    style={[
                      styles.amount,
                      {
                        marginLeft: 10,
                        fontSize: fonts._15,
                        flex: 1,
                        textDecorationLine: 'line-through',
                        color: colors.DISCOUNT,
                      },
                    ]}>
                    {constants.SYMBOL_RUPEE + item.discount}
                  </Text>

                  {this.drawButtonView(item, index)}
                </View>
              </View>
            </View>

            {/* <View
                            style={{ flexDirection: 'row', flex: 1 }}
                        >
                            <View
                                style={{
                                    flex: 1
                                }}
                            />
                            {this.drawButtonView(item, index)}


                        </View> */}
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

function onEndIcon2Clicked() {
  console.log('onEndIcon2Clicked!');
  this.navigateTo('Filter');
  if (!currObj) {
    
  }
}
