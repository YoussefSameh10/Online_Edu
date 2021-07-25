import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Toast from 'react-native-simple-toast'
import { Icon } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers'
import Colors from '../../Constants/colors'
import { Modal } from 'react-native'
import { compareByName } from '../../Constants/Functions'



export default class AdminCreateCoursesScreen extends React.Component{

  state = {
    isFormValid: false,
    courseName: '',
    courseCode: '',
    courseYear: '',
    courseScore: '',
    instructorCode: '',
    instructors: [],
    shownInstructors: [],
    chosenInstructorName: '',
    searchInput: '',
    validInstructorCode: false,
    validCourseScore: false,
    visibleModal: false,
    loading: false,
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.courseName !== this.state.courseName || 
      prevState.courseCode !== this.state.courseCode ||
      prevState.courseYear !== this.state.courseYear ||
      prevState.courseScore !== this.state.courseScore ||
      prevState.instructorCode !== this.state.instructorCode
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.courseName.length > 0 && 
      this.state.courseCode.length > 0 && 
      this.state.validCourseScore && 
      this.state.courseYear !== '' && 
      this.state.validInstructorCode
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }

  handleCourseNameUpdate = courseName => {
    this.setState({courseName})
  }
  handleCourseCodeUpdate = courseCode => {
    this.setState({courseCode})
  }
  handleCourseYearUpdate = courseYear => {
    this.setState({courseYear})
  }
  handleCourseScoreUpdate = courseScore => {
    if(+courseScore>100 || Number.isNaN(+courseScore)){
      this.setState({courseScore: courseScore, validCourseScore: false})
    }
    else{
      this.setState({courseScore: courseScore, validCourseScore: true})
    }
  }
  
  init = () => {
    this.setState({
      instructors: [...this.state.instructors.sort(compareByName)],
      shownInstructors:  [...this.state.shownInstructors.sort(compareByName)]
    })
  }

  handleSearch = input => {
    this.setState({searchInput: input})
    if(input === ''){
      this.setState({
        shownInstructors: this.state.instructors
      })
    } else{
      this.setState({
        shownInstructors: this.state.instructors
          .filter(function(item) {
            return !(item.name.indexOf(input) && item.code.indexOf(input))
          })
      })
    }
  }

  getInstructors = async() => {
    this.setState({visibleModal: true})
    try{
      this.setState({loading: true})
      const response = await fetch(
        `${url}/admins/getAllInstructors`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })

      const results = await response.json()
      console.log(results)
      if(response.status === 200){
        this.setState({instructors: results, shownInstructors: results}, this.init)
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      else{
        this.setState({instructors: [], shownInstructors: []}, this.init)
        Toast.show(results)
      }
      this.setState({loading: false})

    } catch (err){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }
  }

  handleCreate = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/admins/addCourse`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          code: this.state.courseCode,
          name: this.state.courseName,
          year: this.state.courseYear,
          score: +this.state.courseScore,
          instructor_code: this.state.instructorCode,
        })
      })
      const result = await response.json()
      if(response.status === 201){
        this.props.getCourses()
        this.enrollCourseToYear()
      }
      else if(response.status === 500){
        if(result.search('code')!==-1){
          Toast.show('This code is taken  by another course')
        }
        else if(result.search('score')!==-1){
          Toast.show('Course score must be less than or equal to 100')
          this.setState({loading: false})
        }
        else{
          Toast.show('Server Error')
          this.setState({loading: false})
        }
      }
      else{//403 and 404
        Toast.show(result)
        this.setState({loading: false})
      }
    } catch(e){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }  
  }

  enrollCourseToYear = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/admins/enrollMultiple`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          course_code: this.state.courseCode,
          year: this.state.courseYear,
        })
      })
      const result = await response.json()
      if(response.status === 201){
        Toast.show(`Course added to year ${this.state.courseYear}`)
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false})
    } catch(e){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }
  }


  renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        this.setState({
          instructorCode: item.code,
          validInstructorCode: true,
          visibleModal: false,
          chosenInstructorName: item.name
        })
      }}
    >
      <View style={index%2 === 0 ? styles.evenRow : styles.oddRow}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.code}>{item.code}</Text>
      </View>
    </TouchableOpacity>
  )


  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <Spinner visible={this.state.loading} />
        <ScrollView keyboardShouldPersistTaps='always'>
          <Text style={styles.title}>
            Create New Course
          </Text>
          <TextInput 
              value={this.state.courseName}
              placeholder='Course Name'
              onChangeText={this.handleCourseNameUpdate}
              style={styles.nameTextInput}
          />
          <TextInput 
            value={this.state.courseCode}
            placeholder='Course Code'
            onChangeText={this.handleCourseCodeUpdate}
            style={styles.nameTextInput}
          />
          
          <TextInput 
            value={this.state.courseScore}
            placeholder='Course Score'
            keyboardType='numeric'
            onChangeText={this.handleCourseScoreUpdate}
            style={styles.textInput}
          />

          <Text style={[
            styles.alert,
            (this.state.validCourseScore || this.state.courseScore.length===0) ? 
            {color: '#fff'} : 
            {color: 'red'}
          ]}>
            Score must be number with maximum value 100
          </Text>

          <View style={styles.chooseInstructorButton}>
            <TouchableOpacity
              onPress={this.getInstructors}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon 
                  name='list'
                />
                <Text style={{marginLeft: 4}}>
                  {!this.state.instructorCode ? 
                    'Choose Instructor' : 
                    this.state.chosenInstructorName
                  }
                </Text>
              </View>
            </TouchableOpacity>
          </View>


          <DropDownPicker
            items={[
              {label: 'Year 1', value: '1', },
              {label: 'Year 2', value: '2', },
              {label: 'Year 3', value: '3', },
              {label: 'Year 4', value: '4', },
              {label: 'Year 5', value: '5', },
            ]}
            placeholder='Year'
            value={this.state.courseYear}
            onChangeItem={item => this.handleCourseYearUpdate(item.value)}
            containerStyle={styles.dropdownBox}
            placeholderStyle={styles.dropdownBoxPlaceholder}
          />
          <View style={styles.createButton}>
            <Button 
              title='Create'
              onPress={this.handleCreate}
              disabled={!this.state.isFormValid}
            />
          </View>   
          <View style={styles.empty}></View>
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
              <TextInput 
                placeholder={'Search'}
                value={this.state.searchInput}
                onChangeText={this.handleSearch}
                style={styles.searchBox}
              />
                <FlatList
                  data={this.state.shownInstructors}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                  style={styles.list}
                  keyboardShouldPersistTaps='handled'
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
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  nameTextInput: {width: '100%', marginBottom: 32, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  textInput: {width: '100%', paddingLeft: 8, fontSize: 16, backgroundColor: '#fff', borderBottomWidth: 1,},
  chooseInstructorButton: {width: '100%', height: 40, paddingLeft: 8, fontSize: 16, marginBottom: 32, backgroundColor: '#ddd', borderRadius: 30, justifyContent: 'center'},
  alert: {width: '100%', marginBottom: 20,},
  dropdownBox: {width: '100%', height: 40, marginBottom: 32,},
  dropdownBoxPlaceholder: {color: '#777'},
  createButton: {marginTop: 20, width: '25%', alignSelf: 'center', zIndex: 1},  
  empty: {height: 45, backgroundColor: '#fff'},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22,},
  innerModal: {height: '100%', width: '100%', margin: 20, backgroundColor: "#fff", borderRadius: 20, padding: 15, alignItems: "center",shadowColor: "#000",},
  searchBox: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '100%', paddingLeft: 8},
  evenRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, backgroundColor: Colors.grey},
  oddRow: {flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', minHeight: 40, backgroundColor: '#fff'},
  list: {width: '100%', marginBottom: 16},
  name: {fontSize: 18, flex: 1, padding: 4, minWidth: '33%',},
  code: {fontSize: 18, flex: 0.5, padding: 4, minWidth: '33%',},

})