import React from 'react'
import { StyleSheet, View, Button, Text, ScrollView, modal, FlatList, } from 'react-native';
import TreeView from 'react-native-final-tree-view';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from 'react-native-elements'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Constants/colors';
import {url} from '../../Constants/numbers'
import { studentAssignmentsToTree} from '../../Constants/Functions';
import * as Linking from 'expo-linking';
import { Modal } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import DropDownPicker from 'react-native-dropdown-picker';
import PDFReader from 'rn-pdf-reader-js'
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset'


/////////////////////////////Needs to be modified to the path of the uploads folder unless the server is deployed
let absolute_path = Asset.fromModule(require('../../instructor1626925715548.pdf')).uri

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

export default class StudentCourseAssignmentsScreen extends React.Component{
  
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
    downloadFileName: ','
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
          if(this.state.assignmentsDescription[i].title === this.state.assignmentsSubmission[j].title){
            flag = true
            arr = [...arr, {description: this.state.assignmentsDescription[i], submission: this.state.assignmentsSubmission[j]}]
          }
        }
        if(flag===false){
          arr = [...arr, {description: this.state.assignmentsDescription[i], submission: null}]
        }
      }
    }
    this.setState({assignments: arr}, () => {
      this.setState({assignments: this.state.assignments.map(studentAssignmentsToTree)}, ()=>{
        this.setState({loading: false})
      })
    })
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
      console.log(result)
      if(response.status===200){
        this.setState({assignmentsDescription: [...result]}, this.getSubmissionTitles)
      }
      else if(response.status===500){
        Toast.show('Server error') 
        this.setState({loading: false})
      }
      else{
        Toast.show(result)
        this.setState({loading: false})
      }
    } catch(e){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
    }
  }

  getSubmissionTitles = async() => {
    try{
      const response = await fetch(`${url}/courses/course/assignments/${this.props.course._id}`,{
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        }
      })
      const result = await response.json()
      console.log(result)
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

  uploadSubmission = async() => {
    this.setState({loading: true})
    var formData = new FormData()
    const file = this.state.fileToSend
    formData.append('upload', file)
    formData.append('title', this.state.assignmentTitle)
    formData.append('course_code', this.props.course.code) 
    try{ 
      const response = await fetch(`${url}/courses/course/assignmentUpload`,{
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

  downloadSubmission = async(title) => {
    this.setState({loading: true})
    try{ 
      const response = await fetch(`${url}/courses/course/assignments/myAssignment/${this.props.course._id}/${title}`,{
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        },
      })
      const result = await response.json()
      if(response.status===200){
        this.setState({downloadFileName: result})
        const { uri: localUri } = await FileSystem.downloadAsync('https://arxiv.org/pdf/quant-ph/0410100', FileSystem.documentDirectory + 'name.ext')
        console.log(localUri)
        this.saveFile(localUri)
        WebBrowser.openBrowserAsync(localUri)
        Toast.show('Downloaded Successfully')
      }
      else if(response.status===500){
        Toast.show('Server error')
      }
      else{
        Toast.show(result)
      }
      this.setState({loading: false})
    }
    catch(e){
      this.setState({loading: false})
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
    else if(level===1 && node.name==='Submission' && node.fileName){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
          <Icon 
            name={'minus'}
            type='font-awesome'
            color='#000'
            size={16}
          /> 
          <Text style={{fontSize: 20, marginLeft: 8}}>View Submission</Text>
        </View>
      )
    }
    else if(level===1 && node.name==='Submission' && !node.fileName){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
          <Icon 
            name={'minus'}
            type='font-awesome'
            color='#000'
            size={16}
          /> 
          <Text style={{fontSize: 20, marginLeft: 8}}>Add Submission</Text>
          <Icon 
            name={'add'}
            color='#000'
            size={30}
          /> 
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
    else if(level===1 && node.name==='Submission' && node.fileName){
      //Download
      this.setState({pdfSrc: node.fileName}, () => {
        this.setState({visiblePdf: true, loadingPdf: true})
      })
      //this.downloadSubmission(node.title)
    }
    else if(level===1 && node.name==='Submission' && !node.fileName){
      //Upload
      this.setState({visibleAddAssignmentModal: true, assignmentTitle: node.title})
    }
  }

  render(){
    return(this.state.visiblePdf ?(
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Spinner visible={this.state.loadingPdf} />
        <PDFReader
          source={{
            uri: absolute_path,
          }}
          onLoad={() => {this.setState({loadingPdf: false})}}
        />
        <TouchableOpacity 
          style={{height: 50, justifyContent: 'center', backgroundColor: '#555'}}
          onPress={() => {this.setState({visiblePdf: false})}}
        >
          <Icon name='close' color='#fff' size={24}/>
        </TouchableOpacity>
      </View>
    ) :
      <View style={styles.container}>
        <Spinner visible={this.state.loading}/>
        <ScrollView>
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
                      disabled={!this.state.validFile}
                      onPress={this.uploadSubmission}
                      color={Colors.primary_color}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {height: '100%', padding: 16, backgroundColor: '#fff'},
  item: {justifyContent: 'flex-start'},
  box: { width: '100%', height: 40, marginBottom: 16},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22,},
  innerModal: {height: '100%', width: '80%', margin: 20, paddingBottom: 80, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center", justifyContent: 'center'},
  formButton: {marginVertical: 8},
});