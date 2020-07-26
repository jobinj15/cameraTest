import {Dimensions, PixelRatio, Platform} from 'react-native';

const base_unit = 16;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const ratioX = DEVICE_WIDTH < 375 ? (DEVICE_WIDTH < 320 ? 0.75 : 0.875) : 1;
const ratioY = DEVICE_HEIGHT < 568 ? (DEVICE_HEIGHT < 480 ? 0.75 : 0.875) : 1;
const unit = base_unit * ratioX;

// git remote set-url origin https://github.com/USERNAME/REPOSITORY.git

export default fonts = {
  _6: normalize(6),
  _7: normalize(7),
  _8: normalize(8),
  _9: normalize(9),
  _10: normalize(10),
  _11: normalize(11),
  _12: normalize(12),
  _13: normalize(13),
  _14: normalize(14),
  _15: normalize(15),
  _16: normalize(16),
  _17: normalize(17),
  _18: normalize(18),
  _19: normalize(19),
  _20: normalize(20),
  _21: normalize(21),
  _22: normalize(22),
  _23: normalize(23),
  _24: normalize(24),
  _25: normalize(25),
  _26: normalize(26),
  _27: normalize(27),
  _28: normalize(28),
  _30: normalize(30),
  _32: normalize(32),
  _34: normalize(34),
  _36: normalize(36),
  FONT_SIZE: em(1),
  APPBAR_HEIGHT: 56,
  FONT_SIZE_SMALLER: em(0.75),
  FONT_SIZE_SMALL: em(0.875),
  FONT_SIZE_TITLE: em(1.25),
  FONT_FAMILY: {
    PopinsBold: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'PopinsBold',
    PopinsReg: Platform.OS === 'ios' ? 'Avenir-Black' : 'PopinsReg',
    PopinsMed: Platform.OS === 'ios' ? 'Avenir-Medium' : 'PopinsMed',
  },
};

function em(value) {
  return unit * value;
}

function normalize(value) {
  console.log('normalize called');
  if (PixelRatio.get() === 2) {
    console.log(' 4s,5s, till 6s ,7,8');
    return value;
  } else if (PixelRatio.get() === 3) {
    console.log(' 6splus,7plus,8plus,x ');
    return value + 2;
  } else {
    console.log(' ipad ');
    return value + 3;
  }
}
