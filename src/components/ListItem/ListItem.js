import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = props => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Text style={styles.keyNumber}>{props.placeKey}</Text>
            <View style={{ flex: 0, flexDirection: 'column' }}>
                <Text style={styles.mainContent}>{props.placeName}</Text>
                <Text style={styles.subContent}>
                    {props.placeContent.length > 20 ? props.placeContent.substring(0, 20).replace('一、', '') : props.placeContent}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 0,
        backgroundColor: "#eee",
        flex: 0, flexDirection: 'row' 
    },
    keyNumber: {
        fontSize: 17,
        width: 40,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 5
    },
    mainContent: {
        paddingTop: 3,
        fontSize: 16,
        height: 20
    },
    subContent: {
        paddingTop: 4,
        fontSize: 13,
        height: 22
    }
});

export default listItem;
