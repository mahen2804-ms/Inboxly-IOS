import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Platform,
} from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Separator } from '../../components/SwipableListItem';
import { LABELS } from '../../constant/LanguageConstants';
import { Loader, MainHeader, NoContentFound, SnoozeModal, SnoozeSwipeList } from '../../components';
import { Fonts } from '../../utils/Fonts';
import { getSenderListAction, snoozSenderAction, getSnoozeListAction, unsnoozedSenderAction } from '../../redux/actions';
import { GLOBLE } from '../../constant/utility.constant';
import RenderSenderList from './RenderSenderList';
import { STATUS_CODES } from '../../config';
import { Toast } from '../../helper';

class NewsSenders extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            showFilter: false,
            onCheck: false,
            listItem: [],
            itemList: [],
            snoozeList: [],
            selectedCatId: '',
            selectedSenderId: '',
            selectedSenderName: '',
            selectedCategories: '',
            snoozeValue: false,
            timerValue: ''
        };
    }

    componentDidMount() {
        this.props.getSenderListAction(res => { });
    }

    /**
     * @method renderListTile
     * @description called for list component
    */
    renderListTile = rowData => {
        return (
            <RenderSenderList
                isSelected={this.state.selectedSenderId}
                onCheckData={this.state.onCheck}
                data={rowData}
                itemSelected={value => this.handleCheck(value)}
                selectedSender={(item) => this.handleSelection(item)}
                setSelected={(selected, senderName, categories, selectedCatId, snoozeValue, timerValue) =>
                    this.setState({
                        selectedSenderId: selected,
                        selectedSenderName: senderName,
                        selectedCategories: categories,
                        selectedCatId: selectedCatId,
                        onCheck: true,
                        snoozeValue: snoozeValue,
                        timerValue: timerValue,
                    })
                }
            />
        );
    };

    /**
     * @method renderList
     * @description called for showing list
     */
    renderList = () => {
        return (
            <FlatList
                data={this.props.senderData && this.props.senderData.length > 0 ? this.props.senderData : this.state.itemList}
                renderItem={this.renderListTile}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={this.ListEmptyView}
                style={{margin:5}}
            />
        );
    };

    handleEditCategory = () => {
        const { selectedSenderId, selectedCategories, selectedCatId } = this.state;
        this.props.navigation.navigate('EditCategoryList', { feedId: selectedSenderId, categoryData: selectedCategories, selectedSender: selectedCatId })
    }

    handleFilter = () => {
        this.setState({ onCheck: false, selectedSenderId: '' });
        let requestData = {
            filterValue: 'snooze'
        }
        this.setState({ showFilter: !this.state.showFilter }, () => {
            if (this.state.showFilter) {
                this.props.getSnoozeListAction(requestData, res => {
                    if (res && res.data && res.data.success && res.data.success.data && res.data.success.data.length > 0) {
                        this.setState({ snoozeList: res.data.success.data });
                    } else {
                        this.setState({ snoozeList: [] });
                    }
                });
            }
        });
    }

    handleSnooze = () => {
        this.setState({ showModal: true });
    }

    handleCheck = (val) => {
        this.setState({ onCheck: val });
    }

    handleSelection = (item) => {
        this.props.navigation.reset({
            index: 0,
            routes: [{
                name: 'Dashboard',
                params: { item: item, key: 'senderName' }
            }],
        })
    }

    handleSnooozeSubmit = (val, id, value) => {
        this.setState({ showModal: val });
        let requestData = {
            sender_id: this.state.selectedSenderId,
            duration_id: id
        }
        this.props.snoozSenderAction(requestData, res => {
            if (res.status === STATUS_CODES.CREATED) {
                if (res && res.data && res.data.success && res.data.success.data && res.data.success.data) {
                    Toast.showToast(res.data.success.data.message, 'success');
                    this.props.getSenderListAction(res => { });
                    this.handleCheck(false);
                }
            }
        });
    }

    handleSnoozeStatus = (item) => {
        console.log('called the method', item)
        let requestData = {
            timer_id: item.timer_id
        }
        this.props.unsnoozedSenderAction(requestData, res => {
            if (res.status === STATUS_CODES.OK) {
                if (res && res.data && res.data.success && res.data.success.data && res.data.success.data) {
                    Toast.showToast(res.data.success.data.message, 'success');
                    this.setState({ showFilter: false }, () => {
                        this.props.getSenderListAction(res => { });
                        this.handleCheck(false);
                    });
                }
            }
        });
    }

    /**
     * @method defineModelBehaviour
     * @description used for open model
    */
    defineModelBehaviour = (modalSelector, item) => {
        console.log('called data', item)
        if (modalSelector === 'disableCategory') {
            this.setState({ showFilter: !this.state.showFilter }, () => {
                this.handleSnoozeStatus(item);
            })
        } else {
            this.props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'Dashboard',
                    params: { item: item.name, key: 'senderName' }
                }],
            })
        }
    };

    renderListSection = () => {
        if (this.state.snoozeList && this.state.snoozeList.length > 0) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.snoozeList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <SnoozeSwipeList
                            {...item}
                            defineModelBehaviour={(id, item) =>
                                this.defineModelBehaviour(id, item)
                            }
                            navigation={this.props.navigation}
                        />
                    )}
                    ListEmptyComponent={this.ListEmptyView}
                    ItemSeparatorComponent={() => <Separator />}
                />
            );
        }
        else {
            return (
                this.ListEmptyView()
            )
        }
    };

    ListEmptyView = () => {
        return (
            <View style={{ justifyContent: 'center', flex: 1, marginTop: GLOBLE.DEVICE_WIDTH / 2 }}>
                <NoContentFound
                    customHeight={150}
                    customWidth={150}
                    title={LABELS.NO_DATA}
                />
            </View>
        );
    }

    render() {
        const { selectedSenderId, onCheck, showModal, showFilter, snoozeValue, timerValue } = this.state;
        let objValue = {
            timer_id: timerValue
        };
        return (
            <Container>
                <Loader isLoading={this.props.senderLoader} />
                <MainHeader leftButtonType={'menu'} leftButton={true} rightButtonType={'snooze'} rightButton={true} title={showFilter ? LABELS.SNOOZED_SENDER : LABELS.MANAGE_SENDER} onPress={() => this.handleFilter()} />
                <Content>
                    <View style={innerStyle.container}>
                        {onCheck && selectedSenderId !== '' && selectedSenderId !== null && selectedSenderId !== undefined &&
                            <View style={innerStyle.outerView}>
                                <TouchableOpacity onPress={() => this.handleEditCategory()}>
                                    <View style={[innerStyle.optionView, { marginRight: 10 }]}>
                                        <Image
                                            source={require('../../assets/images/social.png')}
                                            style={innerStyle.bottomOptionStyle}
                                            resizeMode='contain'
                                        />
                                        <Text style={innerStyle.textStyle}>
                                            {LABELS.CHANGE_CATEGORY}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => snoozeValue && onCheck ? this.handleSnoozeStatus(objValue) : this.handleSnooze()}>
                                    <View style={[innerStyle.optionView, { marginLeft: 10 }]}>
                                        <Image
                                            source={require('../../assets/images/snooz_blue.png')}
                                            style={innerStyle.snoozStyle}
                                            resizeMode='contain'
                                        />
                                        <Text style={innerStyle.textStyle}>
                                            {snoozeValue && onCheck ? LABELS.UNSNOOZED_SENDER : LABELS.SNOOZE_SENDER}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {showFilter ?
                            <View style={innerStyle.mainView}>
                                {this.renderListSection()}
                            </View>
                            :
                            <View style={innerStyle.mainView}>
                                {this.renderList()}
                            </View>
                        }
                    </View>
                    <SnoozeModal
                        visible={showModal}
                        onCloseCall={(val) => this.setState({ showModal: val })}
                        timeDuration={(val, id, value) => this.handleSnooozeSubmit(val, id, value)}
                    />
                </Content>
            </Container>
        );
    }
}

const innerStyle = StyleSheet.create({
    optionView: {
        flexDirection: 'row',
        width: GLOBLE.DEVICE_WIDTH / 2.3,
        height: 40,
        marginLeft: 2.5,
        borderColor: '#034CBB',
        borderWidth: 1.2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    outerView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
        justifyContent: 'center'
    },
    bottomOptionStyle: {
        width: 20,
        height: 20,
        marginLeft: 0
    },
    snoozStyle: {
        width: 25,
        height: 25,
        marginLeft: 0
    },
    textStyle: {
        color: '#034CBB',
        fontSize: 0.04 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoMedium,
        marginLeft: 5,
        marginRight: 5
    },
    container: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2,
        justifyContent: 'center',
    },
    mainView: {
        marginTop: 5,
        marginBottom: 30
    },
});

const mapStateToProps = ({ manageSender }) => {
    const { senderData, senderLoader } = manageSender;
    return { senderData, senderLoader };
};

export default connect(mapStateToProps, { getSenderListAction, snoozSenderAction, getSnoozeListAction, unsnoozedSenderAction })(NewsSenders);