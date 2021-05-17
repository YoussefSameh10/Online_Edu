import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';

export default class AdminViewInstructorInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
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
              value={this.state.instructorName}
              onChangeText={this.handleInstructorNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Code:</Text>
            <TextInput 
              value={this.state.instructorCode}
              onChangeText={this.handleInstructorCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          
          <View style={styles.row}>
            <Text style={styles.title}>Department:</Text>
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
          </View>
          
          <View style={styles.row}>
            <Text style={styles.title}>Email:</Text>
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