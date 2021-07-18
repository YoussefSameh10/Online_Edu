import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import Dialog from "react-native-dialog";
import DropDownPicker from 'react-native-dropdown-picker';
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';
import Colors from '../../Constants/colors';

export default class AdminViewInstructorInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    instructorOldCode: this.props.route.params.userCode,
    instructorName: this.props.route.params.userName,
    instructorCode: this.props.route.params.userCode,
    instructorEmail: this.props.route.params.userEmail,
    instructorCourses: [],
    deleteDialogVisibility: false,
    codeToBeDeleted: -1,
    courseNameToBeDeleted: '',
    passwordDialogVisibility: false,
    instructorPassword: '',
    instructorConfirmPassword: '',
    enableConfirm: false
  }

  componentDidMount(){
    this.getCourses()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.instructorName !== this.state.instructorName || 
      prevState.instructorCode !== this.state.instructorCode ||
      prevState.instructorEmail !== this.state.instructorEmail
    ){
      this.validateUpdateForm()
    }
  }

  validateUpdateForm = () => {
    if(this.state.instructorName.length > 0 && 
      this.state.instructorCode.length > 6 && 
      this.state.instructorEmail.length > 0
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }

  validateChangePasswordForm = () => {
    if(this.state.instructorPassword.length > 6 && 
      this.state.instructorConfirmPassword.length > 6
    ){
      this.setState({enableConfirm: true})
    } else{
      this.setState({enableConfirm: false})
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
        })
      })
      const result = await response.json()
      console.log(result)
      if(response.status === 200){
        Toast.show('Instructor updated successfully')
        this.makeIneditable()
        this.props.route.params.refresh()
        this.props.navigation.goBack()
      }
      else if(response.status === 400){
        if(result.search('code')!==-1){
          Toast.show('This code is taken by another user')
        }
        else if(result.search('duplicate')!==-1 && result.search('email')!==-1){
          Toast.show('This email is taken by another user')
        }
        else if(result.search('duplicate')===-1 && result.search('email')!==-1){
          Toast.show('Please enter the email in the correct format')
        }
        else{
          Toast.show(result)
        }
      }
      else{
        Toast.show(result)
      }

    } catch(e){
      console.log(e.message)
    }

    
  }

  getCourses = async() => {
    try{
      const response = await fetch(`${url}/admins/InstructorCourses/${this.state.instructorCode}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
      })
      const result = await response.json()
      if(response.status === 200){
        this.setState({instructorCourses: [...result]})
      }
      else if(response.status === 500){
        Toast.show(result)
      }
      else{
        Toast.show(result)
      }      
    } catch(e){
      console.log(e.message)
    }
  }

  handleCancel = () => {
    this.setState({dialogVisibility: false})
  }

  handleDelete = () => {
    //Waiting for the delete route.
    this.setState({dialogVisibility: false})
  }

  handleInstructorPasswordUpdate = instructorPassword => {
    this.setState({instructorPassword}, this.validateChangePasswordForm)
  }

  handleInstructorConfirmPasswordUpdate = instructorConfirmPassword => {
    this.setState({instructorConfirmPassword}, this.validateChangePasswordForm)
  }

  handleChangePasswordConfirm = async() => {
    this.setState({
      passwordDialogVisibility: false,
      enableConfirm: false,
    })

    try{
      const response = await fetch(`${url}/admins/users/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          old_code: this.state.instructorOldCode,
          password: this.state.instructorPassword,
          confirmPassword: this.state.instructorConfirmPassword,
        })
      })
      const result = await response.json()
      console.log(response)
      this.setState({
        instructorPassword: '',
        instructorConfirmPassword: '',
      })
      if(response.status === 200){
        Toast.show(`Password changed successfully`)
        this.props.route.params.refresh()
      }
      else if(response.status === 400){
        Toast.show(result)
      }
      else{
        Toast.show(result)
      }

    } catch(e){
      console.log(e.message)
    }
  }

  renderItem = ({item, index}) => (
    <View style={index%2 === 0 ? styles.evenCourseRow : styles.oddCourseRow}>
      <Text style={styles.courseName}>{item.name}</Text>
      <Text style={styles.courseCode}>{item.code}</Text>
      <TouchableOpacity 
        onPress={() => {
          this.setState({
            dialogVisibility: true, 
            codeToBeDeleted: item.course_code,
            courseNameToBeDeleted: item.course_name,
          })
        }}
      >
        <Icon 
          name='trash-alt'
          type='font-awesome-5' 
        />
    </TouchableOpacity>
    </View>
  )

  render(){
    return(
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='height' 
        keyboardVerticalOffset={-100}
      >
        <View style={styles.info}>
        <View style={styles.upperSection}>
            <Button
              title='Change Password'
              onPress={() => {this.setState({passwordDialogVisibility: true})}}
            />
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
        </View>
        <Dialog.Container 
          visible={this.state.passwordDialogVisibility}
          onBackdropPress={() => {this.setState({passwordDialogVisibility: false})}}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorPassword}
            onChangeText={this.handleInstructorPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter the new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorConfirmPassword}
            onChangeText={this.handleInstructorConfirmPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter the new password again'
          />
          <Dialog.Button 
            label="Cancel" 
            onPress={() => {this.setState({passwordDialogVisibility: false})}}
          />

          <Dialog.Button 
            label="Confirm" 
            onPress={this.handleChangePasswordConfirm}
            disabled={!this.state.enableConfirm} 
          />
          
        </Dialog.Container>
        <Dialog.Container 
          visible={this.state.deleteDialogVisibility}
          onBackdropPress={() => {this.setState({deleteDialogVisibility: false})}}
        >
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Description>
            {`Are you sure you want to remove ${this.state.studentName} from the course ${this.state.courseNameToBeDeleted}? You cannot undo this action.`}
          </Dialog.Description>
          <Dialog.Button 
            label="Cancel" 
            onPress={this.handleCancel} 
            style={styles.dialogCancelButton}
          />
          <Dialog.Button 
            label="Delete" 
            onPress={this.handleDelete} 
            style={styles.dialogDeleteButton}
          />
        </Dialog.Container>

        <View style={styles.course}>
          <Text style={styles.title}>Courses</Text>
        </View>

        <FlatList
          data={this.state.instructorCourses}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          style={styles.coursesList}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16,},
  info: {height: '65%', marginBottom: 16, justifyContent: 'flex-start'},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', maxHeight: 74, marginBottom: 16, alignItems: 'flex-start',},
  course: {height: 30, alignItems: 'flex-start'},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8, maxHeight: 35, marginBottom: 4,},
  text: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff', maxHeight: 35, borderRadius: 20, paddingLeft: 8},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  upperSection: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
  editIcon: {alignSelf: 'flex-end', marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'},
  coursesList: {paddingLeft: 8},
  evenCourseRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, backgroundColor: '#eef'},
  oddCourseRow: {flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', minHeight: 40, backgroundColor: '#fff'},
  courseName: {fontSize: 18, flex: 1, padding: 4, minWidth: '33%',},
  courseCode: {fontSize: 18, flex: 0.5, padding: 4, minWidth: '33%',},
  dialogDeleteButton: {color: 'red'},
  dialogCancelButton: {color: Colors.primary_color},
})