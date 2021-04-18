import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';

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
          <DropDownPicker
          items={[
            {label: 'Year 0', value: '0',},
            {label: 'Year 1', value: '1', },
            {label: 'Year 2', value: '2', },
            {label: 'Year 3', value: '3', },
            {label: 'Year 4', value: '4', },
          ]}
          defaultValue={'0'}
          onChangeItem={item => {
            this.setState({year: item.value})
          }}
          value='3'
          disabled={this.state.editable}
          style={styles.text}
          // itemStyle={styles.item}
          // dropDownStyle={styles.dropdown}
          // containerStyle={styles.box}
        />

        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Department:</Text>
          <DropDownPicker
            items={[
              {label: 'All', value: 'All',},
              {label: 'Electrical', value: 'Electrical',},
              {label: 'Mechanical', value: 'Mechanical', },
              {label: 'Architecture', value: 'Architecture', },
              {label: 'Civil', value: 'Civil', },
              
            ]}
            disabled={this.state.editable}
            defaultValue={'All'}
            onChangeItem={item => {}}
            style={styles.text}
            // itemStyle={styles.item}
            // dropDownStyle={styles.dropdown}
            // containerStyle={styles.box}
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