import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Cell, } from 'react-native-table-component';
import { Icon } from 'react-native-elements'

export default class StudentsTable extends React.Component{
  render(){
    const removeIcon = () => (
      <TouchableOpacity onPress={() => {}}>
        <Icon 
          name='trash-alt'
          type='font-awesome-5' 
          
        />
      </TouchableOpacity>
    );
    return(
      <View>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={this.props.attributes} style={styles.header} textStyle={styles.headerText}/>
        </Table>
        <ScrollView>
          <Table>
            {
              this.props.data.map((rowData, index) => (
                <TableWrapper 
                  key={index} 
                  style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell
                      onPress={() => {}}
                      width={cellIndex === 2 ? '10%': '45%'}
                      key={cellIndex} 
                      data={cellIndex === 2 ? removeIcon() : cellData} 
                      textStyle={styles.text}/>
                  ))
                }
                </TableWrapper>
              ))
            }
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: { height: 40, },
  headerText: { margin: 6, fontSize: 20, fontWeight: 'bold' },
  text: { margin: 6, },
  evenRow: { flexDirection: 'row', backgroundColor: '#fff', height: 40, },
  oddRow: {flexDirection: 'row', backgroundColor: '#ddd', height: 40, },
});
