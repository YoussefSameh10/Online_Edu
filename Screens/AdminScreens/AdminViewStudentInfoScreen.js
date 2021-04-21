import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';

export default class AdminViewStudentInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    fullName: 'Fname Mname Lname',
    code: '1234567890',
    year: '3',
    department: 'Civil',
    grade: 'Good',
    email: 'test.test@gmail.com'
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.fullName !== this.state.fullName || 
      prevState.code !== this.state.code ||
      prevState.year !== this.state.year ||
      prevState.department !== this.state.department ||
      prevState.grade !== this.state.grade ||
      prevState.email !== this.state.email
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.fullName.length > 0 && 
      this.state.code.length > 0 && 
      this.state.grade.length > 0 && 
      this.state.email.length > 0
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

  handlefullNameUpdate = fullName => {
    this.setState({fullName})
  }
  handleCodeUpdate = code => {
    this.setState({code})
  }
  handleGradeUpdate = grade => {
    this.setState({grade})
  }
  handleEmailUpdate = email => {
    this.setState({email})
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
              value={this.state.fullName}
              onChangeText={this.handlefullNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Code:</Text>
            <TextInput 
              value={this.state.code}
              onChangeText={this.handleCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Year:</Text>
            <DropDownPicker
            items={[
              {label: 'Year 0', value: '0', },
              {label: 'Year 1', value: '1', },
              {label: 'Year 2', value: '2', },
              {label: 'Year 3', value: '3', },
              {label: 'Year 4', value: '4', },
            ]}
            defaultValue={this.state.year}
            value={this.state.year}
            onChangeItem={item => {this.setState({year: item.value})}}
            disabled={!this.state.editable}
            containerStyle={styles.dropdownBox}
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
              defaultValue={this.state.year === '0' ? 'None' : this.state.department}
              value={this.state.year === '0' ? 'None' : this.state.department}
              onChangeItem={item => {this.setState({department: item.value})}}
              disabled={!this.state.editable || this.state.year === '0'}
              containerStyle={styles.dropdownBox}
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
            <Text style={styles.title}>Email:</Text>
            <TextInput 
              value={this.state.email}
              editable={this.state.editable}
              onChangeText={this.handleEmailUpdate}
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
  text: {flex: 0.65, fontSize: 16, backgroundColor: '#fff'},
  dropdownBox: {flex: 0.65, height: 30,},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  editIcon: {margin: 20,}
})