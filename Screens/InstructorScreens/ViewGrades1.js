import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addgrade, deletegrade } from '../../reducer/GradesApp'

function ViewGrades1({ navigation }) {
    // const [Grades, setGrades] = useState([])
    const Grades = useSelector(state => state)
    const dispatch = useDispatch()

    const addGrade = Grade => {
        console.log(Grade)
        dispatch(addgrade(Grade))
    }

    const deleteGrade = id =>dispatch(deleteGrade(id))

    // const addGrades = Grade => {
    //     Grade.id = Grades.length + 1
    //     setGrades([...Grades, Grade])
    // }

    return (
        <>
            <View style={styles.container}>
                {Grades.length === 0 ? (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>You do not have any Grades</Text>
                    </View>
                ) : (
                        <FlatList
                            data={Grades}
                            renderItem={({ item }) => (
                                <List.Item
                                    title={item.Grade.GradeTitle}
                                    description={item.Grade.GradeDescription}
                                    descriptionNumberOfLines={1}
                                    titleStyle={styles.listTitle}
                                    
                                />
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    )}

               
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
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20
    },

    listTitle: {
        fontSize: 20,
        backgroundColor:'grey'
    }

})

export default ViewGrades1