/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import ListFilter from "./src/components/ListFilter/ListFilter"
import hymnary from "./src/components/hymnary.json"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor() {
    super();

    var all = hymnary.hymnary.map(function (obj) {
      var newObj = { key: obj.index, name: obj.title, content: obj.content, image: { url: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg" } }
      return newObj
    });

    this.state = {
      displayList: all,
      places: all,
      selectedPlace: null
    };
  }

  //Filter
  placeFilterHandler = val => {
    if (val.trim().length == 0) {
      this.setState(prevState => {
        return {
          displayList: prevState.places
        };
      });

    } else {

      var filterResult = this.state.places.filter(function (item) {
        return item.name.toString().indexOf(val) != -1
      });

      if (filterResult.length > 0)
        this.setState(prevState => {
          return {
            displayList: filterResult
          };
        });
    }
  };
  //Select
  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    });
  };

  //Select-Close
  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onModalClosed={this.modalClosedHandler}
        />


        <Text style={styles.welcome}>
          聖徒詩歌 Hymnary
        </Text>

        <TextInput
          placeholder="Seacher here..."
          onChangeText={this.placeFilterHandler}
          style={styles.keywordfilter} />

        <PlaceList
          places={this.state.displayList}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 20,

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  keywordfilter: {
    width: "100%"
  },
});
