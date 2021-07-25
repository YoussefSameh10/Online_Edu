import React from 'react'
import { StyleSheet, View, Button, Text, ScrollView, modal, FlatList } from 'react-native';
import TreeView from 'react-native-final-tree-view';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from 'react-native-elements'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Constants/colors';
import {url} from '../../Constants/numbers'
import { instructorAssignmentsToTree} from '../../Constants/Functions';
import * as Linking from 'expo-linking';
import { Modal } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import DropDownPicker from 'react-native-dropdown-picker';
import PDFReader from 'rn-pdf-reader-js'

async function upload() {
  try{
    const file = await DocumentPicker.getDocumentAsync({type: 'application/pdf'})
    if(file.type === 'success'){
      return file
    }
    else{
      return {}
    }
  } catch(e){
    return
  }
}



// state={
//   title:'',
//   course_code:'',
//   token:'',
//   Data: [],
//   downloadProgress:0,
//   document:''
// }

// AssingmentsShow(){
//   this.setState({course_code:'cseii2',token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJjZjgzMjI2ZTJhZjI2Yzg2NDU4NzEiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiczlAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjMxMDMxNTh9.8smFMDHrhuukCBxTGIMTAIFP8kTjXy-eTGF8HYODLkE'})
//   var url = `http://192.168.1.4:3000/courses/course/assignments/${this.state.course_code}/${this.state.title}`;
//   const AuthStr = 'Bearer '.concat(this.state.token); 
//   axios.get(url, { headers: { Authorization: AuthStr } })
//    .then(response => {
//        // If request is good...
//        this.setState({Data:response.data});
//        console.log(this.state.Data)
//     })
//    .catch((error) => {
//        console.log('error ' + error);
//     });

//   }
// download =()=>{

//     fetch(`http://192.168.1.4:3000/courses/course/assignments/assignment/${this.state.course_code}/${this.state.title}`, {
 
//       method: "GET",
//       headers: {
     
//         "Authorization": `Bearer ${this.state.token}`,
//       },
//     })
//     .then(response => response.blob())
//      .then(blob => {
//       var a = FileSystem.createDownloadResumable(
//         `http://192.168.1.4:3000/courses/course/assignments/assignment/${this.state.course_code}/${this.state.title}`,
//         FileSystem.documentDirectory + this.state.Data[0].fileName,
//         {},
        
//       ); try {
//         const { uri } =  a.downloadAsync();
//         console.log('Finished downloading to ', uri);
//         //setDocument(uri);
//       } catch (e) {
//         console.error(e);
//       }       
//   })
//       .catch((error) => console.log(error));
//   }


export default class InstructorCourseAssignmentsScreen extends React.Component{
  
  state={
    assignmentsDescription: [],
    assignmentsSubmission: [],
    assignments: [],
    assignmentTitle: '',
    visibleAddAssignmentModal: false,
    enableAdd: false,
    validFile: false,
    loading: true,
    loadingPdf: true,
    file: {},
    fileToSend: {},
    visiblePdf: false,
    pdfSrc: null,
  }
  componentDidMount(){
    this.getDescriptionTitles()
  }

  formatAssignments = () => {
    let arr = []
    if(this.state.assignmentsDescription.length === 0){
      console.log('!')
    }
    else if(this.state.assignmentsSubmission.length === 0){
      for(let i = 0; i < this.state.assignmentsDescription.length; i++){
        arr = [...arr, {description: this.state.assignmentsDescription[i], submission: null}]
      }
      console.log('why')
    }
    else{
      for(let i = 0; i < this.state.assignmentsDescription.length; i++){
        let flag = false
        for(let j = 0; j < this.state.assignmentsSubmission.length; j++){
          if(this.state.assignmentsDescription[i].title === this.state.assignmentsSubmission[j]){
            flag=true
            arr = [...arr, {description: this.state.assignmentsDescription[i], submission: this.state.assignmentsSubmission[j]}]
          }
        }
        if(flag === false){
          arr = [...arr, {description: this.state.assignmentsDescription[i], submission: null}]
        }
      }
    }
    this.setState({assignments: arr}, () => {
      this.setState({assignments: this.state.assignments.map(instructorAssignmentsToTree)}, ()=>{
        this.setState({loading: false})
      })
    })
  }

  validateForm = () => {
    if(this.state.assignmentTitle!=='' && Object.keys(this.state.file).length !== 0){
      this.setState({enableAdd: true})
    }
    else{
      this.setState({enableAdd: false})
    }
  }

  handleAssignmentTitleUpdate = assignmentTitle => {
    this.setState({assignmentTitle}, this.validateForm)
  }

  getDescriptionTitles = async() => {
    try{
      const response = await fetch(`${url}/courses/course/getAssignments/${this.props.course._id}`,{
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        }
      })
      const result = await response.json()
      if(response.status===200){
        this.setState({assignmentsDescription: [...result]}, this.getSubmissionTitles)
      }
      else if(response.status===500){
        this.setState({loading: false})
        Toast.show('Server error') 
      }
      else{
        this.setState({loading: false})
        Toast.show(result)
      }
    } catch(e){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }
  }

  getSubmissionTitles = async() => {
    try{
      const response = await fetch(`${url}/courses/assignments/get_titles/${this.props.course.code}`,{
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        }
      })
      const result = await response.json()
      if(response.status===200){
        this.setState({assignmentsSubmission: [...result]}, this.formatAssignments)
      }
      else if(response.status===500){
        this.formatAssignments()
        Toast.show('Server error') 
      }
      else{
        this.formatAssignments()
        Toast.show(result)
      }
    } catch(e){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }
  }

  uploadDescription = async() => {
    this.setState({loading: true})
    var formData = new FormData()
    const file = this.state.fileToSend
    formData.append('upload', file)
    formData.append('title', this.state.assignmentTitle)
    formData.append('course_code', this.props.course.code) 
    try{ 
      const response = await fetch(`${url}/courses/course/instructorUploadAssignment`,{
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        },
        body: formData
      })
      const result = await response.json()
      if(response.status===200){
        this.getDescriptionTitles()
      }
      else if(response.status===500){
        Toast.show('Server error')
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false, visibleAddAssignmentModal: false, assignmentTitle: '', enableAdd: false,  file: {}})

    }
    catch(e){
      this.setState({loading: false, visibleAddAssignmentModal: false, assignmentTitle: '', enableAdd: false,  file: {}})
      Toast.show('An error occured. Please try again later')

    }
  }
  
  handleUpload = async() => {
    this.setState({file: await upload()}, () => {
      if(Object.keys(this.state.file).length !== 0){
        this.setState({validFile: true, loading: true})
      }
      else{
        this.setState({validFile: false, loading: false})
      }
      const { name, uri } = this.state.file
      
      const file = {
        uri: uri,
        name: name,
        type: 'file/pdf',
      }
      this.setState({fileToSend: file, loading: false})
      this.validateForm()
    })
  }
  
  renderNode = ({node, level, isExpanded, hasChildrenNodes}) => {
    if(level===1 && node.name==='Description'){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
          <Icon 
            name={'minus'}
            type='font-awesome'
            color='#000'
            size={16}
          /> 
          <Text style={{fontSize: 20, marginLeft: 8}}>{node.name}</Text>
        </View>
      )
    }
    else if(level===1 && node.name==='Submission'){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
          <Icon 
            name={'minus'}
            type='font-awesome'
            color='#000'
            size={16}
          /> 
          <Text style={{fontSize: 20, marginLeft: 8}}>Submission</Text>
        </View>
      )
    }
    else{
      
      return (
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
          <Icon 
            name={isExpanded ? 'chevron-down' : 'chevron-right'}
            type='font-awesome'
            color='#000'
            size={16}
          /> 
          <Text style={{fontSize: 20, marginLeft: 8}}>
            {node.name}
          </Text>
        </View>
      )
    }
    
  }

  onNodePress = ({node, level}) => {
    if(level===1 && node.name==='Description'){
      //Download
      this.setState({pdfSrc: node.fileName}, () => {
        this.setState({visiblePdf: true, loadingPdf: true})
      })
    }
    else if(level===1 && node.name==='Submission'){
      //Download
      Linking.openURL('https://asu-lms.s3.amazonaws.com/uploads/1627167777303_ann.pdf')
    }   
  }

  render(){
    return(this.state.visiblePdf ?(
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Spinner visible={this.state.loadingPdf} />
        <PDFReader
          source={{
            uri: 'https://asu-lms.s3.amazonaws.com/uploads/1627167777303_ann.pdf',
          }}
          onLoad={() => {this.setState({loadingPdf: false})}}
        />
      <TouchableOpacity 
        style={{height: 50, justifyContent: 'center', backgroundColor: '#555',}}
        onPress={() => {this.setState({visiblePdf: false})}}
      >
        <Icon name='close' color='#fff' size={24}/>
      </TouchableOpacity>
    </View>
    ) :
      <View style={styles.container}>
        <Spinner visible={this.state.loading} />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <TreeView 
            data={this.state.assignments}
            renderNode={this.renderNode}
            onNodePress={this.onNodePress}
            getCollapsedNodeHeight={({level}) => {}}
            
          />
          <View style={styles.modal}>
            <Modal
              visible={this.state.visibleAddAssignmentModal}
              onRequestClose={() => {this.setState({visibleAddAssignmentModal: false})}}
              onMagicTap={() => {this.setState({visibleAddAssignmentModal: false})}}            
              animationType='slide'
              transparent={false}
            >
              <View style={styles.modal}>
                <View style={styles.innerModal}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 24}}>Add Assignment</Text>
                  <DropDownPicker
                    items={[
                      {label: 'Assignment 1', value: '1',},
                      {label: 'Assignment 2', value: '2', },
                      {label: 'Assignment 3', value: '3', },
                      {label: 'Assignment 4', value: '4', },
                      {label: 'Assignment 5', value: '5', },
                      {label: 'Assignment 6', value: '6',},
                      {label: 'Assignment 7', value: '7', },
                      {label: 'Assignment 8', value: '8', },
                      {label: 'Assignment 9', value: '9', },
                      {label: 'Assignment 10', value: '10', },
                    ]}
                    onChangeItem={item => {
                      this.handleAssignmentTitleUpdate(item.value)
                    }}
                    placeholder={'Assignment'}
                    defaultValue={''}
                    itemStyle={styles.item}
                    containerStyle={styles.box}
                  />
                  
                  <View style={styles.formButton}>
                    <Button 
                      title='Choose File'
                      onPress={this.handleUpload}
                      color={Colors.primary_color}
                    />
                  </View>

                  <View style={styles.formButton}>
                    <Button 
                      title='Create'
                      disabled={!this.state.enableAdd}
                      onPress={this.uploadDescription}
                      color={Colors.primary_color}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
        <View style={styles.addButton}>
          <TouchableOpacity 
            onPress={() => {this.setState({visibleAddAssignmentModal: true})}}  
            >
            <Icon 
              name='add'
              size={36}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </View>
         
    );
    
  }
}


const styles = StyleSheet.create({
  container: {height: '100%', padding: 16, backgroundColor: '#fff'},
  addButton: {width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', backgroundColor: Colors.primary_color, justifyContent: 'center',marginBottom: 8},
  item: {justifyContent: 'flex-start'},
  box: { width: '100%', height: 40, marginBottom: 16},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22,},
  innerModal: {height: '100%', width: '80%', margin: 20, paddingBottom: 80, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center", justifyContent: 'center'},
  formButton: {marginVertical: 8, zIndex: -5},
});
