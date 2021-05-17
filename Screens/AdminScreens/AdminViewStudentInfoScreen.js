import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';



export default class AdminViewStudentInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    studentName: this.props.route.params.userName,
    studentCode: this.props.route.params.userCode,
    studentYear: this.props.route.params.userYear,
    department: 'Civil',
    grade: 'Good',
    studentEmail: this.props.route.params.userEmail
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
  render(){

    return(
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='padding' 
        keyboardVerticalOffset={-100}
      >
        <ScrollView>
          <View style={styles.picture}>
            <ProfileAvatar size={'large'}/>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {this.makeEditable()}}
              style={styles.editIcon}
              disabled={this.state.editable}
            >
              <Icon 
                name='edit'
                color={this.state.editable ? '#ccc' : '#000'}  
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Full Name:</Text>
            <TextInput 
              value={this.state.studentName}
              onChangeText={this.handleStudentNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>studentCode:</Text>
            <TextInput 
              value={this.state.studentCode}
              onChangeText={this.handleStudentCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>studentYear:</Text>
            <DropDownPicker
            items={[
              {label: 'Year 0', value: 'first', },
              {label: 'Year 1', value: 'second', },
              {label: 'Year 2', value: 'third', },
              {label: 'Year 3', value: 'fourth', },
              {label: 'Year 4', value: 'fifth', },
            ]}
            defaultValue={this.state.studentYear}
            value={this.state.studentYear}
            onChangeItem={item => {this.setState({studentYear: item.value})}}
            disabled={!this.state.editable}
            containerStyle={styles.dropdownBox}
            labelStyle={styles.dropdownLabel}
          />

          </View>
          <View style={styles.row}>
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
              disabled={!this.state.editable || this.state.studentYear === '0'}
              containerStyle={styles.dropdownBox}
              labelStyle={styles.dropdownLabel}
            />         
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Grade:</Text>
            <TextInput 
              value={this.state.grade}
              editable={this.state.editable}
              onChangeText={this.handleGradeUpdate}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>studentEmail:</Text>
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
              onPress={() => {this.makeIneditable()}}
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
  row: {flexDirection: 'row', marginBottom: 16, alignItems: 'center',},
  title: {flex: 0.35, fontSize: 20, fontWeight:'bold',},
  text: {flex: 0.65, fontSize: 16, backgroundColor: '#fff', textAlign: 'center'},
  dropdownBox: {flex: 0.65, height: 30,},
  dropdownLabel: {textAlign: 'center'},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  editIcon: {margin: 20,}
})