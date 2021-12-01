import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Navigation from './src/navigation';



class App extends Component {
render() {
return (
<View style={styles.mainContainer}>
<Navigation />
</View>
);
}
}



const styles = StyleSheet.create({
mainContainer: {
flex: 1
}
});



export default App;