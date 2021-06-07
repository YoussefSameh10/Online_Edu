import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';
import Colors from '../../Constants/colors';



export default class AdminViewStudentInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    studentOldCode: this.props.route.params.userCode, 
    studentName: this.props.route.params.userName,
    studentCode: this.props.route.params.userCode,
    studentYear: this.props.route.params.userYear,
    department: 'Civil',
    grade: 'Good',
    studentEmail: this.props.route.params.userEmail,
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.studentName !== this.state.studentName || 
      prevState.studentCode !== this.state.studentCode ||
      prevState.studentYear !== this.state.studentYear ||
      prevState.department !== this.state.department ||
      prevState.grade !== this.state.grade ||
      prevState.studentEmail !== this.state.studentEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.studentName.length > 0 && 
      this.state.studentCode.length > 0 && 
      this.state.grade.length > 0 && 
      this.state.studentEmail.length > 0
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

  handleStudentNameUpdate = studentName => {
    this.setState({studentName})
  }
  handleStudentCodeUpdate = studentCode => {
    this.setState({studentCode})
  }
  handleGradeUpdate = grade => {
    this.setState({grade})
  }
  handleStudentEmailUpdate = studentEmail => {
    this.setState({studentEmail})
  }

  handleSave = async() => {
    try{
      const response = await fetch(`${url}/admins/users/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          old_code: this.state.studentOldCode,
          code: this.state.studentCode,
          name: this.state.studentName,
          email: this.state.studentEmail,
          year: this.state.studentYear,
          role: 'student',
        })
      })

      if(response.status === 200){
        Toast.show('Student Updated Successfully')
        this.makeIneditable()
        this.props.route.params.refresh(this.state.studentYear)
        this.props.navigation.goBack()
      }
      else if(response.status === 404){
        Toast.show('Student Not Found')
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
              value={this.state.studentName}
              onChangeText={this.handleStudentNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Code</Text>
            <TextInput 
              value={this.state.studentCode}
              onChangeText={this.handleStudentCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Year</Text>
            <DropDownPicker
            items={[
              {label: 'Year 1', value: 'first',},
              {label: 'Year 2', value: 'second', },
              {label: 'Year 3', value: 'third', },
              {label: 'Year 4', value: 'fourth', },
              {label: 'Year 5', value: 'fifth', },
            ]}
            defaultValue={this.state.studentYear}
            value={this.state.studentYear}
            onChangeItem={item => {this.setState({studentYear: item.value})}}
            disabled={!this.state.editable}
            containerStyle={styles.dropdownBox}
          />

          </View>
          {/* <View style={styles.row}>
            <Text style={styles.title}>Department:</Text>
            <DropDownPicker
              items={[
                {label: 'None', value: 'None',},
                {label: 'Electrical', value: 'Electrical',},
                {label: 'Mechanical', value: 'Mechanical', },
                {label: 'Architecture', value: 'Architecture', },
                {label: 'Civil', value: 'Civil', },
                
              ]}
              defaultValue={this.state.studentYear === '0' ? 'None' : this.state.department}
              value={this.state.studentYear === '0' ? 'None' : this.state.department}
              onChangeItem={item => {this.setState({department: item.value})}}
              disabled={!this.state.editable || this.state.studentYear === 'first'}
              containerStyle={styles.dropdownBox}
              labelStyle={styles.dropdownLabel}
            />         
          </View> */}
          {/* <View style={styles.row}>
            <Text style={styles.title}>Grade:</Text>
            <TextInput 
              value={this.state.grade}
              editable={this.state.editable}
              onChangeText={this.handleGradeUpdate}
              style={styles.text}
            />
          </View> */}
          <View style={styles.row}>
            <Text style={styles.title}>Email</Text>
            <TextInput 
              value={this.state.studentEmail}
              editable={this.state.editable}
              onChangeText={this.handleStudentEmailUpdate}
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
  dropdownBox: {flex: 1, height: 30, width: '90%',},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  editIcon: {alignSelf: 'flex-end', marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
})