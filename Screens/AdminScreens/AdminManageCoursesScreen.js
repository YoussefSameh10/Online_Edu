import React from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import UsersTable from '../../Components/UsersTable';
import Toast from 'react-native-simple-toast'
import { compareByName } from '../../Constants/Functions';
import { url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';

export default class AdminManageCoursesScreen extends React.Component{
  
  state={
    searchInput: '',
    year: '0',
    attributes: ['NAME', 'CODE', ],
    coursesBasicData: [],
    coursesShownData: [],
    courses: [],
  }

  init = () => {
    const arr = []
    let obj = {}
    this.state.courses.map((item) => {
      Object.keys(item).map((key) => {
        key === 'name' || key === 'code' || key === 'createdAt' ? obj[key] = item[key]
        : null
      })
      arr.push(obj)
      obj={}
    })
    this.setState({
      coursesShownData: [...arr.sort(compareByName)], 
      coursesBasicData: [...arr.sort(compareByName)],
      courses: [...this.state.courses.sort(compareByName)],
    })
  }

  getCourses = async (year) => {
    try{
      const response = await fetch(
        `${url}/admins/courses/year/${year}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })
      
      const results = await response.json()
      if(response.status === 200){
        this.setState({courses: results}, this.init)
      }
      else if(response.status === 404){
        this.setState({courses: []}, this.init)
        Toast.show(results)
      }
      else if(response.status === 403){
        this.setState({courses: []}, this.init)
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
    this.setState({searchInput: input})
    if(input === null){
      this.setState({
        coursesShownData: this.state.coursesBasicData
      })
    } else{
      this.setState({
        coursesShownData: this.state.coursesBasicData
          .filter(function(item) {
            return !(item.name.indexOf(input) && item.code.indexOf(input))
          })
      })
    }
  }

  handleYearChange = (year) => {
    this.setState({year: year, searchInput: ''}, () => this.getCourses(year))
  }

  deleteCourse = (code) => {
    this.setState({
        courses: [...this.state.courses.filter(course => course.code !== code)]
      },
      this.init
    )
  }

  render(){

    return(
      <View style={styles.container}>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            value={this.state.searchInput}
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
          
          <View style={styles.row}>
            <Text style={styles.counter}>
              {`Number Of Shown Courses: ${this.state.courses.length}`}
            </Text>
            <TouchableOpacity
              onPress={() => this.getCourses(this.state.year)}
              style={styles.refreshIcon}
            >
              <Icon 
                name='refresh'
                color={'#fff'}  
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <UsersTable 
          userType={'Course'}
          attributes={this.state.attributes} 
          usersShownData={this.state.coursesShownData} 
          users={this.state.courses}
          userToken={this.props.userToken}
          navigation={this.props.navigation} 
          deleteUser={this.deleteCourse}
          refresh={this.handleYearChange}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16,},
  fixedView: {marginBottom: 10},
  searchBox: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '100%', paddingLeft: 8},
  dropDownContainer: {justifyContent: 'space-around'},
  menu: {backgroundColor: '#fafafa',},
  item: {justifyContent: 'flex-start'},
  dropdown: {backgroundColor: '#fafafa',},
  box: { width: '100%', height: 40},
  row: {flexDirection: 'row', marginTop: 20, alignItems: 'center' ,justifyContent: 'space-between'},
  counter: {fontSize: 16, color: '#000'},
  refreshIcon: {backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
});
