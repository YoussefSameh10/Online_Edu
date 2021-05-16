import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import UsersTable from '../../Components/UsersTable';
import Toast from 'react-native-simple-toast'

export default class AdminManageStudentsAccountsScreen extends React.Component{
  
  state={
    year: '0',
    attributes: ['NAME', 'CODE', ],
    studentsBasicData: [],
    studentsShownData: [],
    students: [],
  }

  init = () => {
    const arr = []
    let obj = {}
    this.state.students.map((item) => {
      Object.keys(item).map((key) => {
        key === 'name' || key === 'code' || key === 'year' ? obj[key] = item[key]
        : null
      })
      arr.push(obj)
      obj={}
    })
    this.setState({
      studentsShownData: [...arr.sort(this.compare)], 
      studentsBasicData: [...arr.sort(this.compare)]
    })
  }

  compare = (i, j) => {
    if(i.name < j.name){
      return -1
    }
    else if(i.name > j.name){
      return 1
    }
    return 0
  }

  getStudents = async (year) => {
    try{
      const response = await fetch(
        `http://192.168.1.8:3000/admins/getStudentsOfCertainYear/?year=${year}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })
      
      const results = await response.json()
      if(response.status === 200){
        this.setState({students: results}, this.init)
      }
      else if(response.status === 404){
        this.setState({students: []}, this.init)
        Toast.show(results)
      }
      else if(response.status === 403){
        this.setState({students: []}, this.init)
        Toast.show('Unauthorithed')
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      

    } catch (err){
      console.log(err.message)
    }
  }

  handleSearch = input => {
    if(input === null){
      this.setState({
        studentsShownData: this.state.studentsBasicData
      })
    } else{
      this.setState({
        studentsShownData: this.state.studentsBasicData
          .filter(function(item) {return !item.name.indexOf(input)})
      })
    }
  }

  handleYearChange = (year) => {
    this.setState({year: year})
    this.getStudents(year)
  }

  render(){

    return(
      <View style={styles.container}>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            onChangeText={this.handleSearch}
            style={styles.searchBox}
          />
          <View flexDirection='row' style = {styles.dropDownContainer}>
            <DropDownPicker
              items={[
                {label: 'Year 1', value: 'first',},
                {label: 'Year 2', value: 'second', },
                {label: 'Year 3', value: 'third', },
                {label: 'Year 4', value: 'fourth', },
                {label: 'Year 5', value: 'fifth', },
              ]}
              onChangeItem={item => {
                this.handleYearChange(item.value)
              }}
              placeholder={'Year'}
              style={styles.menu}
              itemStyle={styles.item}
              dropDownStyle={styles.dropdown}
              containerStyle={styles.box}
            />
          </View>
          
          <Text style={styles.counter}>
            {`Number Of Shown Students: ${this.state.students.length}`}
          </Text>
        </View>
        
        <UsersTable 
          userType={'Student'}
          attributes={this.state.attributes} 
          usersShownData={this.state.studentsShownData} 
          navigation={this.props.navigation} 
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  fixedView: {marginBottom: 10},
  searchBox: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '90%', paddingLeft: 8},
  dropDownContainer: {justifyContent: 'space-around'},
  menu: {backgroundColor: '#fafafa',},
  item: {justifyContent: 'flex-start'},
  dropdown: {backgroundColor: '#fafafa',},
  box: { width: '90%', height: 40},
  counter: { fontSize: 16, marginTop: 20 }
});
