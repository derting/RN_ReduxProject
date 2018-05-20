import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";

const placeDetail = props => {
    let modalContent = null;

    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>

                <Text style={styles.placeContent}>{props.selectedPlace.content}</Text>
            </View>
        );
    }
    return (
        <Modal
            onRequestClose={props.onModalClosed}
            visible={props.selectedPlace !== null}
            animationType="slide"
        >
            <View style={styles.modalContainer}>

                <View>
                    <Button title="關閉" onPress={props.onModalClosed} />
                </View>

                {modalContent}

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28,
        paddingTop: 10
    },
    placeContent: {
        paddingTop: 20,
        fontSize: 15,
        textAlign: "center",

    }
});

export default placeDetail;
