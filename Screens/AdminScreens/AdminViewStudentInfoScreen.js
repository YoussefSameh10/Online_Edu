import React from 'react'
import { View, Text, Button, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import Dialog from "react-native-dialog";
import { Modal } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';
import Colors from '../../Constants/colors';
import { compareByCourseName } from '../../Constants/Functions';



export default class AdminViewStudentInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    studentOldCode: this.props.route.params.userCode, 
    studentName: this.props.route.params.userName,
    studentCode: this.props.route.params.userCode,
    studentYear: this.props.route.params.userYear,
    studentEmail: this.props.route.params.userEmail,
    studentID: this.props.route.params.userID,
    studentCourses: [],
    deleteDialogVisibility: false,
    codeToBeDeleted: -1,
    courseNameToBeDeleted: '',
    courseIdToBeDeleted: -1,
    passwordDialogVisibility: false,
    studentPassword: '',
    studentConfirmPassword: '',
    enableConfirm: false,
    visibleModal: false,
    loading: false,
  }


  componentDidMount(){
    this.getCourses()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.studentName !== this.state.studentName || 
      prevState.studentCode !== this.state.studentCode ||
      prevState.studentYear !== this.state.studentYear ||
      prevState.studentEmail !== this.state.studentEmail
    ){
      this.validateUpdateForm()
    }
  }

  validateUpdateForm = () => {
    if(this.state.studentName.length > 0 && 
      this.state.studentCode.length > 6 && 
      this.state.studentEmail.length > 0
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }

  validateChangePasswordForm = () => {
    if(this.state.studentPassword.length > 6 && 
      this.state.studentConfirmPassword.length > 6
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
      this.setState({loading: true})
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
        })
      })
      const result = await response.json()
      console.log(result)
      if(response.status === 200){
        Toast.show('Student updated successfully')
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
      const response = await fetch(`${url}/users/getEnrolledCourses/${this.state.studentCode}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
      })
      const result = await response.json()
      if(response.status === 200){
        this.setState({studentCourses: [...result.sort(compareByCourseName)]})
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

  handleCancel = () => {
    this.setState({deleteDialogVisibility: false})
  }

  handleDelete = async() => {
    this.setState({
      deleteDialogVisibility: false,
      loading: true,
    })
    try{
      const response = await fetch(`${url}/admins/students/deleteEnroll`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          course_id: this.state.courseIdToBeDeleted,
          user_id: this.state.studentID
        })
      })
      const result = await response.json()
      if(response.status === 200){
        this.setState({studentCourses: [...this.state.studentCourses.filter(course => course.course_code !== this.state.codeToBeDeleted)]})
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

  handleStudentPasswordUpdate = studentPassword => {
    this.setState({studentPassword}, this.validateChangePasswordForm)
  }

  handleStudentConfirmPasswordUpdate = studentConfirmPassword => {
    this.setState({studentConfirmPassword}, this.validateChangePasswordForm)
  }

  handleChangePasswordConfirm = async() => {
    this.setState({
      passwordDialogVisibility: false,
      enableConfirm: false,
      loading: true,
    })
    console.log('Change')
    try{
      const response = await fetch(`${url}/admins/users/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          old_code: this.state.studentOldCode,
          password: this.state.studentPassword,
          confirmPassword: this.state.studentConfirmPassword,
        })
      })

      const result = await response.json()
      this.setState({
        studentPassword: '',
        studentConfirmPassword: '',
      })
      if(response.status === 200){
        Toast.show(`Password changed successfully`)
        this.props.route.params.refresh(this.state.studentYear)
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
      <Text style={styles.courseName}>{item.course_name}</Text>
      <Text style={styles.courseCode}>{item.course_code}</Text>
      <Text style={styles.instructorName}>{item.instructor_name}</Text>
      <TouchableOpacity 
        onPress={() => {
          this.setState({
            deleteDialogVisibility: true, 
            codeToBeDeleted: item.course_code,
            courseNameToBeDeleted: item.course_name,
            courseIdToBeDeleted: item.course_id,
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
        <Spinner visible={this.state.loading} />
        <ScrollView>
        {/* <View style={styles.info}> */}
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
              value={this.state.studentName}
              onChangeText={this.handleStudentNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            /> 
          
            <Text style={styles.title}>Code</Text>
            <TextInput 
              value={this.state.studentCode}
              onChangeText={this.handleStudentCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          
            <Text style={styles.title}>Year</Text>
            <DropDownPicker
            items={[
              {label: 'Year 1', value: '1',},
              {label: 'Year 2', value: '2', },
              {label: 'Year 3', value: '3', },
              {label: 'Year 4', value: '4', },
              {label: 'Year 5', value: '5', },
            ]}
            defaultValue={this.state.studentYear}
            value={this.state.studentYear}
            onChangeItem={item => {this.setState({studentYear: item.value})}}
            disabled={!this.state.editable}
            containerStyle={styles.dropdownBox}
          />

          <Text style={styles.title}>Email</Text>
          <TextInput 
            value={this.state.studentEmail}
            editable={this.state.editable}
            onChangeText={this.handleStudentEmailUpdate}
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
        {/* </View> */}
        <Dialog.Container 
          visible={this.state.passwordDialogVisibility}
          onBackdropPress={() => {this.setState({passwordDialogVisibility: false})}}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentPassword}
            onChangeText={this.handleStudentPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter the new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentConfirmPassword}
            onChangeText={this.handleStudentConfirmPasswordUpdate}
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
                  data={this.state.studentCourses}
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
  info: {height: '85%', marginBottom: 16},
  picture: {marginBottom: 32},
  row: {flex: 1, maxHeight: 74, minHeight: 74, marginBottom: 16, alignItems: 'flex-start',},
  course: {height: 30, alignItems: 'flex-start'},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8, maxHeight: 35, marginBottom: 4,},
  text: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff',height: 35, borderRadius: 20, paddingLeft: 8, marginBottom: 16},
  dropdownBox: {flex: 1, height: 30, width: '90%', marginBottom: 16},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', marginBottom: 8},
  upperSection: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8},
  changePasswordButton: {marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 30, width: 50, height: 50, justifyContent: 'center', marginRight: 8},
  editButton: {marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 30, width: 50, height: 50, justifyContent: 'center'},
  coursesList: {paddingLeft: 8, width: 300, marginBottom: 16},
  evenCourseRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, backgroundColor: '#eef'},
  oddCourseRow: {flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', minHeight: 40, backgroundColor: '#fff'},
  courseName: {fontSize: 18, flex: 1, padding: 4, minWidth: '25%',},
  courseCode: {fontSize: 18, flex: 0.5, padding: 4, minWidth: '25%',},
  instructorName: {fontSize: 18, flex: 1, padding: 4, minWidth: '25%',},
  dialogDeleteButton: {color: 'red'},
  dialogCancelButton: {color: Colors.primary_color},
  coursesButton: {width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', backgroundColor: Colors.primary_color, justifyContent: 'center'},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22,},
  innerModal: {height: '100%', margin: 20, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center",shadowColor: "#000",},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})