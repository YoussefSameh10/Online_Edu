import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, IconButton, TextInput, FAB } from 'react-native-paper'


function AddGrades({ navigation }) {
    const [GradeTitle, setGradeTitle] = useState('')
    const [GradeDescription, setGradeDescription] = useState('')

    function onSaveGrade() {
        navigation.state.params.addGrade({ GradeTitle, GradeDescription })
        navigation.goBack()
    }

    return (
        <>
            <IconButton
                icon="close"
                size={25}
                color='white'
                onPress={() => navigation.goBack()}
                style={styles.iconButton}
            />

            <View style={styles.container}>
                <TextInput
                    label="Add Student"
                    value={GradeTitle}
                    mode='outlined'
                    onChangeText={setGradeTitle}
                    style={styles.text}
                />
                <TextInput
                    label="Add Grade Description"
                    value={GradeDescription}
                    onChangeText={setGradeDescription}
                    mode="flat"
                    multiline={true}
                    style={styles.text}
                    scrollEnabled={true}
                    returnKeyLabel='done'
                    blurOnSubmit={true}
                />
                <FAB
                    style={styles.fab}
                    small
                    icon="check"
                    disabled={GradeTitle == '' ? true : false}
                    onPress={() => onSaveGrade()}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    iconButton: {
        backgroundColor: '#219653',
        position: 'absolute',
        right: 0,
        top: 40,
        margin: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text: {
        fontSize: 24,
        marginBottom: 16
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#219653'
    }

})

export default AddGrades