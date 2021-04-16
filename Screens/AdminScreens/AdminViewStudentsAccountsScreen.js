import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropdownMenus from '../../Components/DropdownMenus';
import StudentsTable from '../../Components/StudentsTable';

export default class AdminViewStudentsAccountsScreen extends React.Component{
  
  state={
    attributes: ['NAME', 'CODE', ],
    studentsBasicData: [
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Joe', '123490', ''],
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
          <DropdownMenus />
        </View>
        <StudentsTable attributes={this.state.attributes} studentsBasicData={this.state.studentsBasicData} navigation={this.props.navigation} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '90%', paddingLeft: 8},
});
