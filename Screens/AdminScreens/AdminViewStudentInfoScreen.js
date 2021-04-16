import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'

export default class AdminViewStudentInfoScreen extends React.Component{
 
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.picture}>
          <ProfileAvatar size={'large'}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Full Name:</Text>
          <Text style={styles.text}>Fname Mname Lname</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Code:</Text>
          <Text style={styles.text}>{`${this.props.route.params.studentCode}`}</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>National ID:</Text>
          <Text style={styles.text}>28940542641068451</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Year:</Text>
          <Text style={styles.text}>3rd Year</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Department:</Text>
          <Text style={styles.text}>Mechanical</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Grade:</Text>
          <Text style={styles.text}>Good</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.text}>test.test@gmail.com</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Phone:</Text>
          <Text style={styles.text}>01252874628</Text>
          <TouchableOpacity
            onPress={() => {}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16,},
  picture: {marginBottom: 32},
  row: {flexDirection: 'row', marginBottom: 16, alignItems: 'center',},
  title: {flex: 0.35, fontSize: 20, fontWeight:'bold',},
  text: {flex: 0.65, fontSize: 16, }
})