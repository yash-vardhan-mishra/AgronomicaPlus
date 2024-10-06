import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Home.styles';
import Header from '../../components/molecules/Header';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Home" rightIcon='calendar-outline' />
        </SafeAreaView>
    );
};

export default Home