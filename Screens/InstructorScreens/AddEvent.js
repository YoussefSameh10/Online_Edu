import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, IconButton, TextInput, FAB } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'

function AddEvents({ navigation }) {
    const [EventTitle, setEventTitle] = useState(' ')
    const [EventDate, setEventDate] = useState(' ')
    

    function EventPost(){
		fetch('http://192.168.1.9:3004/events', {
		  method:"post",
		  headers:{
			  'Content-Type':'application/json'
		  },
		  body:JSON.stringify({
              date:EventDate,
              Events:[EventTitle]
		  })
		})
		.catch(function (error) {
		  console.log(error);
		});
        navigation.goBack()
	  };
      
     
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
                    label="Add Event Title"
                    value={EventTitle}
                    mode='outlined'
                    onChangeText={setEventTitle}
                    style={styles.text}
                />
                 <TextInput
                    placeholder='yyyy-mm-dd'
                    label="Add Event Date"
                    value={EventDate}
                    mode='outlined'
                    onChangeText={setEventDate}
                    style={styles.text}
                />
                <FAB
                    style={styles.fab}
                    small
                    icon="check"
                    disabled={EventTitle == '' ? true : false}
                    onPress={() => EventPost()}
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

export default AddEvents