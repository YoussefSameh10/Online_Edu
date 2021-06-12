import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator ,TextInput} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, } from 'react-native-simple-radio-button';
import axios from 'axios';
import {FAB} from 'react-native-paper'
import { Alert } from 'react-native';

export default class Quiz extends Component {

    state = {
        loading: false,
        showQuiz: false,
        userAnswer: 0,
        asked: 0,
        quizData: [],
        currentQuestion: '',
        currentQuestionOptions: [],
        totalUserAnswers: [],
        totalTime:'',
        total_marks:'',
        notstart:'',
        title:''
    }

    componentDidMount() {
        this.fetchQuizData()
    }

    fetchQuizData() {
        const { loading } = this.state
        const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMyNmExNTY3NDJmZjNmYjg2N2FjYjgiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTJAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MjM0NjUyNjZ9.PYCP_IFM0-lPk_mgG3q0mxYDeHAYEqk89GbsLf-dmUc'
        this.setState({ loading: !loading })
        console.log(this.state.title)
        fetch(`http://192.168.1.6:3000/quizes/getQuiz/${this.state.title}/${this.props.courseCode}`,{
            method:"GET",
            headers: {
              "Content-Type" :"application/json",  
              "Authorization": `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            loading:false,  
            quizData: data.questions,
            totalTime:data.time,
            total_marks:data.total_marks
          });
      }) .catch(error => {
                this.setState({ loading: false });
            })
    }

    _renderQuestion() {
        const { quizData, asked } = this.state;
        if (!quizData || quizData.length === 0) {
            this.fetchQuizData()
        } else {
            const currentQuestion = quizData[asked].question; 
            
            let options = [quizData[asked].choices[0]]
            for(let i=1;i<quizData[asked].choices.length;i++){
                options.push(
                    quizData[asked].choices[i])
              }
        
            const currentQuestionOptions = options.map((option, index) => ({
                label: option,
                value: index,
            }))

            this.setState({ currentQuestion, currentQuestionOptions, showQuiz: true, startTime: new Date().getTime() })
        }
    }

    onPress = userAnswer => this.setState({ userAnswer});

    nextQuestion(last) {
        const { userAnswer, asked, quizData, currentQuestionOptions, totalUserAnswers } = this.state

        const currentQuestion = quizData[asked]

        const currentAnswer = {
            question: currentQuestion.question,
           // correct_answer: currentQuestion.alternatives.filter((obj)=>obj.isCorrect===true)[0].text,
            userAnswer: currentQuestionOptions[userAnswer].label,
            score: currentQuestion.answer === currentQuestionOptions[userAnswer].label,
        }
        totalUserAnswers.push(currentAnswer)
        if(last) this.setState({notstart:true})   
        this.setState({
            totalUserAnswers: totalUserAnswers,
            asked: asked + 1,
            userAnswer: 0,
        }, () => (!last ? this._renderQuestion() : this.calculateResult()))

    }
    backQuestion(last) {
        const { userAnswer, asked, quizData, currentQuestionOptions, totalUserAnswers } = this.state
        if(asked===0)return;
        else{    
        const currentQuestion = quizData[asked]

        const currentAnswer = {
            question: currentQuestion.question,
           // correct_answer: currentQuestion.alternatives.filter((obj)=>obj.isCorrect===true)[0].text,
            userAnswer: currentQuestionOptions[userAnswer].label,
            score: currentQuestion.answer === currentQuestionOptions[userAnswer].label,
        }

        totalUserAnswers.pop()
        if(last) this.setState({notstart:true})   
        this.setState({
            totalUserAnswers: totalUserAnswers,
            asked: asked - 1,
            userAnswer: 0,
        }, () => (!last ? this._renderQuestion() : this.calculateResult()))
      }
    }
    calculateResult() {
        const { navigate } = this.props.navigation;
        const { totalUserAnswers } = this.state
        let totalScore = 0;
        console.log("AAAAA"+totalUserAnswers)
        for (let i = 0; i < totalUserAnswers.length; i++) {
            if (totalUserAnswers[i].score) {
                totalScore += 10
            }
        }
        this.setState({ loading: true })
        const time=this.state.totalTime
        const total_marks=this.state.total_marks
        navigate('Result', { totalUserAnswers,totalScore,time ,total_marks })
        //console.log('you finish')
    }

    render() {
        const { loading, showQuiz, userAnswer, currentQuestion, currentQuestionOptions, quizData, asked } = this.state
        return loading ? (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        ) : (
                <View style={styles.container}>
                    {
                        !showQuiz ? (
                            <View style={styles.container}>
                                <Text style={styles.text}>Course Quiz</Text>
                                <Text style={styles.warningText}>Please click start quiz after entering the title.</Text>
                                <TextInput
                                    placeholder='Enter title of Quiz'
                                    style={{height: 50, width: 200, fontSize: 15,backgroundColor:'white',paddingLeft:10,borderRadius:10,marginLeft:50}}
                                    onChangeText={(title) => this.setState({title})}
                                    value={this.state.title}
                                    />
                                <FAB
                                        style={styles.fab}
                                        small
                                        label='Start Quiz'
                                        icon="check"
                                        disabled={this.state.notstart}
                                        onPress={() => this._renderQuestion()
                                        }
                                 />
                            </View>
                        ) : (
                                <View style={styles.quizContainer}>
                                    <Text style={styles.questionCounter}>Question {asked + 1} out of {quizData.length}</Text>
                                    <Text style={styles.question}>{currentQuestion}</Text>
                                    <RadioForm animation>
                                        {currentQuestionOptions.map((obj, i) => (
                                            <RadioButton labelHorizontal key={Math.random()}>
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={userAnswer === i}
                                                    onPress={this.onPress}
                                                    borderWidth={userAnswer === i ? 3 : 1}
                                                    buttonInnerColor="#007bff"
                                                    buttonOuterColor={userAnswer === i ? '#007bff' : '#000'}
                                                    buttonSize={15}
                                                    buttonOuterSize={25}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal
                                                    onPress={this.onPress}
                                                    labelStyle={{ fontSize: 18, }}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))}
                                    </RadioForm>
                                    <View style={{ marginTop: 10 }}>
                                        {/* quizData.length === asked + 1 */}
                                        {quizData.length === asked + 1 ? (
                                            <View>
                                            <Button
                                                onPress={() => this.nextQuestion('last')}
                                                title="Finish"
                                                color="#28a745"
                                            />
                                            <Text>{'\n'}</Text>
                                             <Button
                                                    onPress={() => this.backQuestion()}
                                                    title="Back"
                                                    color="red"
                                                    />
                                            </View>

                                        ) : (
                                            <View>
                                                <View>
                                                <Button
                                                    onPress={() => this.nextQuestion()}
                                                    title="Next"
                                                    color="#007bff"
                                                />
                                                </View>
                                                <Text>{'\n'}</Text>
                                                <View>
                                                 <Button
                                                    onPress={() => this.backQuestion()}
                                                    title="Back"
                                                    color="#007bff"
                                                />
                                                </View>
                                             </View>   
                                            )
                                        }
                                    </View>
                                </View>
                            )
                    }
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 40,
        color: 'blue',
    },
    warningText: {
        fontSize: 15,
        color: '#ffc107',
        marginBottom: 10,
        marginTop:10,
        marginLeft:10
    },
    errorText: {
        fontSize: 20,
        color: '#dc3545',
    },
    quizContainer: {
        width: "100%",
        padding: 20
    },
    question: {
        fontSize: 20,
        color: '#343a40',
        marginBottom: 10,
    },
    questionCounter: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 10,
    },
    fab: {
        backgroundColor: 'blue',
        position: 'relative',
        margin: 20,

    }
});