import React
,{useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Container } from 'native-base';
import { connect } from 'react-redux';
import { LABELS } from '../../constant/LanguageConstants';
import { Loader, TouchableButton } from '../../components';
import { GLOBLE } from '../../constant/utility.constant';
import RadioForm, { RadioButton, RadioButtonInput } from '../../components/CustomRadio/SimpleRadioButton';
import { MainHeader } from '../../components';
import { autoDeleteAction } from '../../redux/actions';
import { STATUS_CODES } from '../../config';
import { Toast } from '../../helper';
import AsyncStorage from '@react-native-community/async-storage';

function AutoDeleteNews(props) {
    const [selectedOption, setSelectedOption] = React.useState();
    const[index, setindex] = React.useState(0);

    const [selectedOptionValue, setSelectedOptionValue] = React.useState();
const [durationOptions,setDurationOption]= React.useState([
    {
        lable: '24 hours',
        isSelected: false,
        value: 1
    },
    {
        lable: '48 hours',
        isSelected: false,
        value: 2
    },
    {
        lable: '72 hours',
        isSelected: false,
        value: 3
    },
    {
        lable: 'After one week',
        isSelected: false,
        value: 4
    },
    {
        lable: 'After one month',
        isSelected: false,
        value: 5
    },
    {
        lable: 'Never',
        isSelected: false,
        value: 6
    }
]
)
    const onPressUpdateOption = async() => {
        let requestData = {
            duration: selectedOptionValue,
        };
      //  alert("ii"+index)
     await AsyncStorage.setItem('index',JSON.stringify(index))
        props.autoDeleteAction(requestData, res => {
            if (res.status === STATUS_CODES.OK) {
                if (res && res.data && res.data.success) {
                    Toast.showToast(res.data.success.message, 'success');

                    props.navigation.navigate('AccountSettings')
                }
            }
        });
    };
{/*
    const durationOptions = [
        {
            lable: '24 hours',
            isSelected: false,
            value: 1
        },
        {
            lable: '48 hours',
            isSelected: false,
            value: 2
        },
        {
            lable: '72 hours',
            isSelected: false,
            value: 3
        },
        {
            lable: 'After one week',
            isSelected: false,
            value: 4
        },
        {
            lable: 'After one month',
            isSelected: false,
            value: 5
        },
        {
            lable: 'Never',
            isSelected: false,
            value: 6
        }
    ]
*/}

    useEffect(() => {
     {/*   (async ()=>{
        
        })
    */}
    retriveData();
    },[])
    const retriveData = async () => {
        const i = await AsyncStorage.getItem('index');
       // alert("hiiii"+i)
                   durationOptions[i].isSelected = true
         //    alert(JSON.stringify(durationOptions))
        
        //durationOptions[1] = {...durationOptions[1],isSelected:true}
        setDurationOption([... durationOptions])
    }

    const onSelectTime = (id, value,i) => {
                setindex(i);
        setSelectedOption(id);
        setSelectedOptionValue(value);
    }
    const renderDeleteOptions = () => {
        return (
            durationOptions.map((val, i) => {
                return (
                    <View style={{ flexDirection: 'row' }} key={`${i}_optionlist`}>
                        <RadioButton labelHorizontal={false} >
                            <RadioButtonInput
                                obj={''}
                                //index={i}
                                borderWidth={3}
                                buttonInnerColor={'#034CBB'}
                                buttonOuterColor={'#034CBB'}
                                buttonSize={12}
                                buttonOuterSize={25}
                                buttonStyle={{}}
                                buttonWrapStyle={{ marginLeft: 10, marginTop: 8 }}
                                isSelected={selectedOption ? selectedOption === val.value : val.isSelected}
                                onPress={() => onSelectTime(val.value, val.lable,i)}
                            />
                        </RadioButton>
                        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: selectedOption === val.value ? '#034CBB' : '#171819', fontSize: 0.04*GLOBLE.DEVICE_WIDTH, top: 1 }}>{val.lable}</Text>
                        </View>
                    </View>
                )
            })
        )
    }

    return (
        <Container>
            <Loader isLoading={props.profileLoader} />
            <MainHeader leftButton={true} rightButton={false} title={LABELS.AUTO_DELETE} />
            <View style={innerStyle.mainView}>
                <View style={innerStyle.headerTextView}>
                    <Text style={innerStyle.headerTextStyle}>
                        {LABELS.AUTO_DELETE_NEWS_HEAD}
                    </Text>
                </View>
                <View style={innerStyle.topView}>
                    <RadioForm
                        formHorizontal={false}
                        labelHorizontal={false}
                        animation={true}>
                        <View style={innerStyle.deleteView}>
                            {renderDeleteOptions()}
                        </View>
                    </RadioForm>
                </View>
                <View style={innerStyle.bottomView}>
                    <TouchableButton
                        buttonText={LABELS.AUTO_DELETE_NEWS_UPDATE_BUTTON}
                        buttonAction={onPressUpdateOption}
                        buttonContainer={innerStyle.buttonContainer}
                        buttonTextStyle={innerStyle.buttonTextStyle}
                    />
                </View>
            </View>
        </Container>
    )
}

const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: '#034CBB',
        height: 36,
        width: GLOBLE.DEVICE_WIDTH / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 2,
    },
    deleteView: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5,
    },
    headerTextStyle: {
        color: '#171819',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    headerTextView: {
        alignItems: 'center',
        marginTop: 20
    },
    mainView: {
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
    },
    bottomView: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 40,
        justifyContent: 'center',
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 0.04*GLOBLE.DEVICE_WIDTH,
        fontWeight: 'bold',
    },
    topView: {
        marginTop: 20,
    },
});

const mapStateToProps = ({ accountSetting, auth }) => {
    const { profileLoader } = accountSetting;
    const { loggedUserData } = auth;
    return { profileLoader, loggedUserData };
};

export default connect(mapStateToProps, {autoDeleteAction})(AutoDeleteNews);