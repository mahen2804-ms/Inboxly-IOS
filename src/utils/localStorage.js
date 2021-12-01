import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage {
    setItem = (key, data) => {
        let returnValue;
        AsyncStorage.setItem(key.toString(), JSON.stringify(data), (err, d) => {
            if (err) {
                returnValue = err;
            }
            returnValue = true;
        });
        return returnValue;
    };
    getItem = async key => {
        try {
            const data = await AsyncStorage.getItem(key.toString());
            return JSON.parse(data);
        } catch (err) {
            return err;
        }
    };
    removeItem = async key => {
        try {
            return await AsyncStorage.removeItem(key.toString());
        } catch (err) {
            return err;
        }
    };
}

export default new LocalStorage();
