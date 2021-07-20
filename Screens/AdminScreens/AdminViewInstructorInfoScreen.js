import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import Dialog from "react-native-dialog";
import { Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay'
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
    enableConfirm: false,
    visibleModal: false,
    loading: false,
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
    try{
      this.setState({loading: true})
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
      this.setState({loading: false})

    } catch(e){
      console.log(e.message)
    }

    
  }

  getCourses = async() => {
    try{
      this.setState({loading: true})
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
      this.setState({loading: false})
      
    } catch(e){
      console.log(e.message)
    }
  }

  // handleCancel = () => {
  //   this.setState({dialogVisibility: false})
  // }

  // handleDelete = () => {
  //   //Waiting for the delete route.
  //   this.setState({dialogVisibility: false})
  // }

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
      loading: true,
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
      this.setState({loading: false})

    } catch(e){
      console.log(e.message)
    }
  }

  renderItem = ({item, index}) => (
    <View style={index%2 === 0 ? styles.evenCourseRow : styles.oddCourseRow}>
      <Text style={styles.courseName}>{item.name}</Text>
      <Text style={styles.courseCode}>{item.code}</Text>
      {/* <TouchableOpacity 
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
    </TouchableOpacity> */}
    </View>
  )

  render(){
    return(
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='height' 
        keyboardVerticalOffset={-100}
      >
        <Spinner visible={this.state.loading} />
        <ScrollView>
        <View style={styles.upperSection}>
        <TouchableOpacity
              onPress={() => {this.setState({passwordDialogVisibility: true})}}
              style={styles.changePasswordButton}
            >
              <Icon 
                name='key'
                type='font-awesome'
                color={'#fff'}  
              />
              <Text style={styles.buttonLabel}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {this.makeEditable()}}
              style={[styles.editButton, {backgroundColor: this.state.editable ? '#aaa' : Colors.primary_color}]}
              disabled={this.state.editable}
            >
              <Icon 
                name='edit'
                type='font-awesome'
                color={'#fff'}  
              />
              <Text style={styles.buttonLabel}>Edit</Text>
            </TouchableOpacity>
          </View>
            <Text style={styles.title}>Full Name</Text>
            <TextInput 
              value={this.state.instructorName}
              onChangeText={this.handleInstructorNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
            <Text style={styles.title}>Code</Text>
            <TextInput 
              value={this.state.instructorCode}
              onChangeText={this.handleInstructorCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
                    
            <Text style={styles.title}>Email</Text>
            <TextInput 
              value={this.state.instructorEmail}
              editable={this.state.editable}
              onChangeText={this.handleInstructorEmailUpdate}
              style={styles.text}
            />
          <View style={styles.saveButton}>
            <Button 
              title='Save'
              onPress={this.handleSave}
              disabled={!this.state.editable || !this.state.isFormValid}
            />
          </View>
          <TouchableOpacity 
            style={styles.coursesButton}
            onPress={() => {this.setState({visibleModal: true})}}  
          >
            <Icon 
              name='list'
              type='font-awesome'
              color='#fff'
            />
            <Text style={styles.buttonLabel}>View Courses</Text>
          </TouchableOpacity>
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
        {/*<Dialog.Container 
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
        </Dialog.Container> */}

        <View style={styles.modal}>
          <Modal
            visible={this.state.visibleModal}
            onRequestClose={() => {this.setState({visibleModal: false})}}
            onMagicTap={() => {this.setState({visibleModal: false})}}            
            animationType='slide'
            transparent={false}
          >
            <View style={styles.modal}>
              <View style={styles.innerModal}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>Courses</Text>
                <FlatList
                  data={this.state.instructorCourses}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                  style={styles.coursesList}
                />
                <Button 
                  title='Ok'
                  onPress={() => {this.setState({visibleModal: false})}}
                  color={Colors.primary_color}
                />
              </View>
            </View>
          </Modal>
        </View>
        
        </ScrollView>
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
  text: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff',height: 35, borderRadius: 20, paddingLeft: 8, marginBottom: 16},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', marginBottom: 80},
  upperSection: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8},
  changePasswordButton: {marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 30, width: 50, height: 50, justifyContent: 'center', marginRight: 8},
  editButton: {marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 30, width: 50, height: 50, justifyContent: 'center'},
  coursesList: {paddingLeft: 8, width: 300, marginBottom: 16},
  evenCourseRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, backgroundColor: '#eef'},
  oddCourseRow: {flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', minHeight: 40, backgroundColor: '#fff'},
  courseName: {fontSize: 18, flex: 1, padding: 4, minWidth: '33%',},
  courseCode: {fontSize: 18, flex: 0.5, padding: 4, minWidth: '33%',},
  dialogDeleteButton: {color: 'red'},
  dialogCancelButton: {color: Colors.primary_color},
  coursesButton: {width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', backgroundColor: Colors.primary_color, justifyContent: 'center'},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22,},
  innerModal: {height: '100%', margin: 20, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center",shadowColor: "#000",},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})