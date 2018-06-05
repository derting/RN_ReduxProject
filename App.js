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
  TextInput,
  Alert
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

const AppVersion = "V1.0.0";

export default class App extends Component {

  constructor() {

    super();
    var all = hymnary.hymnary.map(function (obj) {
      var newObj = { key: obj.index, name: obj.title, content: obj.content, image: { url: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg" } }
      return newObj
    });

    this.state = {
      version: AppVersion,
      displayList: all,
      places: all,
      selectedPlace: null
    };

    //Fetch from API
    var req = new Request('http://wired-glider-206113.appspot.com/api/muxi/version', {
      method: 'GET',
      cache: 'reload'
    });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      //this.setState({ version: json.version });
      if(AppVersion != json.version)
      {
        AlertMessage("Please Upgrade APP.", 
        "We have a newest version on App store. Please upgrade it to take advantage of the new features and performance improvement.\n\n Next version: " + json.version)
      }
    }.bind(this));

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

        <View style={styles.navBar}>
          <Text style={styles.navBarButton}></Text>
          <Text style={styles.navBarHeader}>聖徒詩歌 Hymnary</Text>
          <Text style={styles.navBarButton}>{this.state.version}</Text>
        </View>

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


function AlertMessage(Title, Msg) {
  Alert.alert(Title, Msg,
    [
      { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false }
  )
}

const styles = StyleSheet.create({

  navBar: {
    flexDirection: 'row',
    paddingTop: 30,
    height: 70,
    backgroundColor: '#FFF'
  },
  navBarButton: {
    color: '#000',
    textAlign:'center',
    width: 64,
    paddingTop: 7,
  },
  navBarHeader: {
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22
  },


  container: {
    flex: 1,
    justifyContent: 'center', justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    
    textAlign: 'center',
    margin: 20,

  },
  version: {
    justifyContent: 'flex-end',
    marginTop: 20
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
