import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import YearDropdownMenu from '../../Components/YearDropDownMenu';
import DepartmentDropdownMenu from '../../Components/DepartmentDropdownMenu'
import StudentsTable from '../../Components/StudentsTable';

export default class AdminManageStudentsAccountsScreen extends React.Component{
  
  state={
    attributes: ['NAME', 'CODE', ],
    data: [
      
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],

    ]
  }
  render(){

    return(
      <View style={styles.container}>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            style={styles.searchBox}
          />
          <View flexDirection='row' style = {styles.menus}>
            <YearDropdownMenu />
            <DepartmentDropdownMenu />
          </View>
        </View>
        <StudentsTable attributes={this.state.attributes} data={this.state.data} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  menus: {justifyContent: 'space-around'},
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '90%', paddingLeft: 8},
});
