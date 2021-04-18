import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'

export default class AdminViewStudentInfoScreen extends React.Component{
 
  state = {
    editable: false
  }
  makeEditable = () => {
    this.setState({editable: true})
  }
  makeIneditable = () => {
    this.setState({editable: false})
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.picture}>
          <ProfileAvatar size={'large'}/>
        </View>
        <TouchableOpacity
            onPress={() => {this.makeEditable()}}
          >
            <Icon name='edit'/>
          </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.title}>Full Name:</Text>
          <TextInput 
            value='Fname Mname Lname'
            editable={this.state.editable}
            style={styles.text}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Code:</Text>
          <TextInput 
            value={`${this.props.route.params.studentCode}`}
            editable={this.state.editable}
            style={styles.text}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Year:</Text>
          <TextInput 
            value='3rd Year'
            editable={this.state.editable}
            style={styles.text}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Department:</Text>
          <TextInput 
            value='Civil'
            editable={this.state.editable}
            style={styles.text}
          />          
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Grade:</Text>
          <TextInput 
            value='Good'
            editable={this.state.editable}
            style={styles.text}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Email:</Text>
          <TextInput 
            value='test.test@gmail.com'
            editable={this.state.editable}
            style={styles.text}
          />
        </View>
        <Button 
          title='Save'
          onPress={() => {this.makeIneditable()}}  
        />
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