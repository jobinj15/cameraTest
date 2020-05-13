import React, { Component } from 'react';
import { View } from 'react-native';
import ImageMapper from 'react-native-image-mapper';
import { RECTANGLE_MAP, CIRCLE_MAP } from './Maps';

const HumanImg = require('./human.png');

class BodyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAreaId: []
    };
  }

  mainImgWasPressed(item, idx, event) {
    console.log('Main');
    const { selectedAreaId } = this.state;
    if (Array.isArray(selectedAreaId)) {
      const indexInState = selectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id)
        this.setState({
          selectedAreaId: [
            ...selectedAreaId.slice(0, indexInState),
            ...selectedAreaId.slice(indexInState + 1)
          ]
        });
      } else {
        console.log('Setting Id', item.id)
        this.setState({ selectedAreaId: [...selectedAreaId, item.id] });
      }
    } else {
      if (item.id === selectedAreaId) {
        this.setState({ selectedAreaId: null });
      } else {
        this.setState({ selectedAreaId: item.id });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:'gray' }}>
        <ImageMapper
          style={{backgroundColor:'yellow'}}
          imgHeight={551}
          imgWidth={244}
          imgSource={HumanImg}
          imgMap={CIRCLE_MAP}
          onPress={(item, idx, event) => this.mainImgWasPressed(item, idx, event)}
          containerStyle={{ top: 10 }}
          selectedAreaId={this.state.selectedAreaId}
          multiselect
        />
      </View>
    );
  }
}

export default BodyChart;