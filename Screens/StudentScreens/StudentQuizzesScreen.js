import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import {AccordionList} from "accordion-collapse-react-native"
import Colors from '../../Constants/colors';

export default class StudentQuizzesScreen extends React.Component{

  state={
    list:[
      {
        id:1,
        title: 'Compilers',
        quizNumber: '1',
        quizGrade: '7'
      },
      {
        id:2,
        title: 'Networks',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
        quizNumber: '1',
        quizGrade: '9'
      }
    ],
  }
  
  head(item){
    return(
      <View style={{flex: 1, marginTop: 10, paddingLeft: 20, height:40, justifyContent: 'center', backgroundColor: '#fff'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.primary_color}}>{item.title}</Text>
      </View>
    );
  }
  
  body(item){
    
    return (
      <View>
        <View style={{flex: 1, padding:10, flexDirection: 'row', justifyContent: 'space-evenly'}}>  
          <Text>Quiz No.</Text>
          <Text>Grade</Text>
        </View>
        <View style={{flex: 1, padding:10, flexDirection: 'row', justifyContent: 'space-evenly'}}>  
          <Text>{`Quiz ${item.quizNumber}`}</Text>
          <Text>{`${item.quizGrade}/10`}</Text>
        </View>
      </View>
    );
  }
  
  render() {
    return (
      <ScrollView>
        <AccordionList
          list={this.state.list}
          header={this.head}
          body={this.body}
          keyExtractor={item => `${item.id}`}
        />
      </ScrollView>
    );
  }
}