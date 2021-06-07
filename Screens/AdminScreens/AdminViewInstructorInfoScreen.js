import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';

export default class AdminViewInstructorInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    instructorOldCode: this.props.route.params.userCode,
    instructorName: this.props.route.params.userName,
    instructorCode: this.props.route.params.userCode,
    department: 'Civil',
    instructorEmail: this.props.route.params.userEmail
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.instructorName !== this.state.instructorName || 
      prevState.instructorCode !== this.state.instructorCode ||
      prevState.department !== this.state.department ||
      prevState.instructorEmail !== this.state.instructorEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.instructorName.length > 0 && 
      this.state.instructorCode.length > 0 && 
      this.state.instructorEmail.length > 0
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  makeEditable = () => {
    this.setState({editable: true})
  }
  makeIneditable = () => {
    this.setState({editable: false})
  }

  handleInstructorNameUpdate = instructorName => {
    this.setState({instructorName})
  }
  handleInstructorCodeUpdate = instructorCode => {
    this.setState({instructorCode})
  }
  handleInstructorEmailUpdate = instructorEmail => {
    this.setState({instructorEmail})
  }

  handleSave = async() => {
    console.log('save')
    try{
      const response = await fetch(`${url}/admins/users/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          old_code: this.state.instructorOldCode,
          code: this.state.instructorCode,
          name: this.state.instructorName,
          email: this.state.instructorEmail,
          role: 'instructor',
        })
      })

      if(response.status === 200){
        Toast.show('Instructor Updated Successfully')
        this.makeIneditable()
        this.props.route.params.refresh()
        this.props.navigation.goBack()
      }
      else if(response.status === 404){
        Toast.show('Admin Not Found')
      }
      else if(response.status === 403){
        Toast.show('Unauthorized Action')
      }
      else if(response.status === 400){
        Toast.show('Invalid Updates')
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }

    } catch(e){
      console.log(e.message)
    }

    
  }

  render(){
    return(
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='padding' 
        keyboardVerticalOffset={-100}
      >
        <ScrollView>
          {/* <View style={styles.picture}>
            <ProfileAvatar size={'large'}/>
          </View> */}
          <View>
            <TouchableOpacity
              onPress={() => {this.makeEditable()}}
              style={[styles.editIcon, {backgroundColor: this.state.editable ? '#aaa' : Colors.primary_color}]}
              disabled={this.state.editable}
            >
              <Icon 
                name='edit'
                color={'#fff'}  
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Full Name</Text>
            <TextInput 
              value={this.state.instructorName}
              onChangeText={this.handleInstructorNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Code</Text>
            <TextInput 
              value={this.state.instructorCode}
              onChangeText={this.handleInstructorCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          
          {/* <View style={styles.row}>
            <Text style={styles.title}>Department</Text>
            <DropDownPicker
              items={[
                {label: 'Electrical', value: 'Electrical',},
                {label: 'Mechanical', value: 'Mechanical', },
                {label: 'Architecture', value: 'Architecture', },
                {label: 'Civil', value: 'Civil', },
                
              ]}
              defaultValue={this.state.department}
              value={this.state.department}
              onChangeItem={item => {this.setState({department: item.value})}}
              disabled={!this.state.editable}
              containerStyle={styles.dropdownBox}
              labelStyle={styles.dropdownLabel}
            />         
          </View> */}
          
          <View style={styles.row}>
            <Text style={styles.title}>Email</Text>
            <TextInput 
              value={this.state.instructorEmail}
              editable={this.state.editable}
              onChangeText={this.handleInstructorEmailUpdate}
              style={styles.text}
            />
          </View>
          <View style={styles.saveButton}>
            <Button 
              title='Save'
              onPress={this.handleSave}
              disabled={!this.state.editable || !this.state.isFormValid}
            />
          </View>
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16,},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', marginBottom: 16, alignItems: 'flex-start',},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8, marginBottom: 4},
  text: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff',height: 35, borderRadius: 20, paddingLeft: 8},
  dropdownBox: {flex: 1, height: 30, width: '100%'},
  dropdownLabel: {textAlign: 'center'},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  editIcon: {alignSelf: 'flex-end', marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
})