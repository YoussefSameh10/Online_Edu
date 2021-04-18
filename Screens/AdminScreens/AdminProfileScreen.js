import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Colors from '../../Constants/colors';
import Dialog from "react-native-dialog";
import { StackActions } from '@react-navigation/routers'

export default class AdminManageStudentInfoScreen extends React.Component{
 
  state = {
    dialogVisibility: false
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.picture}>
          <ProfileAvatar size={'large'}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.text}>Admin</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Code:</Text>
          <Text style={styles.text}>212579621656</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.text}>test.test@gmail.com</Text>
        </View>
        <Dialog.Container visible={this.state.dialogVisibility}>
          <Dialog.Title>Change Password</Dialog.Title>
          
          <Dialog.Input 
            style={{borderWidth: 1}}
            placeholder='Enter your current password'  
          />
          
          <Dialog.Input 
            style={{borderWidth: 1}}
            placeholder='Enter the new password'
            
          />
          <Dialog.Button 
            label="Confirm" 
            onPress={() => {this.setState({dialogVisibility: false})}} 
          />
          
        </Dialog.Container>
        <View style={styles.buttonsGroup}>
          <View style={styles.button}>
            <Button 
              onPress={() => {this.setState({dialogVisibility: true})}}
              title='Change Password'
            />
          </View>
          <View style={styles.button}>
            <Button 
              onPress={() => {this.props.navigation.dispatch(StackActions.replace('loginNav'))}}
              title='Logout'
              //color={Colors.primary_color}  
            />
          </View>
          
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
  text: {flex: 0.65, fontSize: 16, },
  buttonsGroup: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  button: {marginBottom: 16}
})