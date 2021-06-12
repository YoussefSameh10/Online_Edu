import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

// a presentational component to render a single item of event
export default EventComponent = ({startTime, endTime, title, description}) => {
    return (
        <View style={styles.event}>
            <View style={styles.eventTimeWr}>
                <Text style={styles.eventTime}>{startTime}</Text>
                <Text style={styles.eventTime}>{endTime}</Text>
            </View>
            <View style={styles.eventText}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventDescription}>{description}</Text>
            </View>
        </View>
    );
}