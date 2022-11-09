import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { LABELS } from '../../constant/LanguageConstants';
import { Loader, MainHeader, NoContentFound } from '../../components';
import { Fonts } from '../../utils/Fonts';
import { archivedEmailListAction, deleteArchivedEmailAction, archivedSearchAction } from '../../redux/actions'
import { GLOBLE } from '../../constant/utility.constant';
import { Toast } from '../../helper';
import { DATE_FORMAT } from '../../config';

class ArchivedNews extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            showInfo: false,
            categoryData: 'N/A', // uncategorized
            selectedItem: '',
            isLoading: true,
            refreshItem: '',
            listItem: [],
        };
    }

    componentDidMount() {
        this.props.archivedEmailListAction(res => {
        });
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ isLoading: false })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleRefresh = () => {
        this.props.archivedEmailListAction(res => { });
    }

    handleDot = (index, id) => {
        const { selectedItem, showInfo } = this.state;
        if (selectedItem !== id) {
            this.setState({ selectedItem: id, showInfo: true })
        } else {
            this.setState({ selectedItem: id, showInfo: !this.state.showInfo });
        }
    }

    handleDeleteAlert = (item) => {
        Alert.alert(
            "Alert",
            "Are you sure you want to delete this email?",
            [
                {
                    text: "No",
                    onPress: () => this.setState({ showInfo: false }),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => this.handleDelete(item) }
            ],
            { cancelable: false }
        );
    }

    handleDelete = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : ''
        };
        this.props.deleteArchivedEmailAction(requestData, res => {
            if (res && res.data && res.data.success && res.data.success.data && res.data.success.data) {
                Toast.showToast(res.data.success.data.message, 'success');
                this.props.archivedEmailListAction(res => { });
            }
        });
    }

    handleOptions = (item) => {
        return (
            <View>
                <View style={innerStyle.talkBubbleTriangle}>
                    <Image
                        source={require('../../assets/images/tringle.png')}
                        style={[innerStyle.searchIconStyle, { bottom: 5 }]}
                        resizeMode='contain'
                    />
                    <View style={innerStyle.talkBubbleSquare}>
                        <TouchableOpacity style={innerStyle.boxTextViewStyle} onPress={() => this.handleDeleteAlert(item)}>
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.DELETE_NEWS}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    handleFilterItem = (item, key) => {
        this.setState({ refreshItem: item }, () => {
            if (item !== '') {
                let obj;
                if (key === 'senderName') {
                    obj = {
                        senderName: item
                    };
                } else if (key === 'categoryName') {
                    obj = {
                        categoryName: item
                    };
                }
                this.props.archivedSearchAction(obj);
            } else {
                this.props.archivedEmailListAction(res => {
                });
            }
        })
    }

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
        const { categoryData, showInfo, selectedItem, listItem } = this.state;
        return (
            <Container>
                <Loader isLoading={this.props.archivedEmailLoader} />
                <MainHeader leftButtonType={'menu'} leftButton={true} rightButtonType={'refresh'} rightButton={true} title={LABELS.ARCHIVE_EMAIL} onPress={() => this.handleRefresh()}/>
                <Content>
                    <View style={innerStyle.container}>
                        <View style={innerStyle.mainView}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={ this.props.archivedEmailData && this.props.archivedEmailData.length > 0 ? this.props.archivedEmailData : listItem}
                                ListEmptyComponent={this.ListEmptyView}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View style={innerStyle.gridViewContainer} key={index}>
                                        <View style={innerStyle.mainListView}>
                                            <TouchableOpacity style={innerStyle.dotView} onPress={() => this.handleDot(index, item.id)}>
                                                <Image
                                                    source={require('../../assets/images/dot.png')}
                                                    style={[innerStyle.searchIconStyle, { bottom: 0 }]}
                                                    resizeMode='contain'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ zIndex: 999, position: 'absolute', right: 0, top: 10 }}>
                                            {showInfo && selectedItem === item.id &&
                                                this.handleOptions(item)
                                            }
                                        </View>
                                        <View style={{ marginLeft: 3, zIndex: -999, }}>
                                            <View style={{ marginTop: 0, marginBottom: 0, alignItems: 'flex-start', flexDirection: 'row', flex: 1 }}>
                                                <TouchableOpacity
                                                    style={innerStyle.innerView}
                                                    onPress={() => this.handleFilterItem(item.sender_name, 'senderName')}>
                                                    <Image
                                                        source={ item.is_read ? require('../../assets/images/email-blue-open.png') : require('../../assets/images/emailblue.png')}
                                                        style={innerStyle.optionIconStyle}
                                                        resizeMode='contain'
                                                    />
                                                    <Text style={[innerStyle.categoryText, { bottom: 2, right: 4 }]}>
                                                        {item.sender_name}
                                                    </Text>
                                                </TouchableOpacity>
                                                {item.category_name && item.category_name !== '' && item.category_name !== null && item.category_name !== undefined ?
                                                    <TouchableOpacity
                                                        style={[innerStyle.innerView, { marginTop: 0, flex: 1, right: 2 }]}
                                                        onPress={() => this.handleFilterItem(item.category_name, 'categoryName')}>
                                                        <Image
                                                            source={require('../../assets/images/social.png')}
                                                            style={innerStyle.optionIconStyle}
                                                            resizeMode='contain'
                                                        />
                                                        <Text style={[innerStyle.categoryText, { right: 3 }]}>
                                                            {item.category_name ? item.category_name : categoryData}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <View style={[innerStyle.innerView, { marginTop: 0, flex: 1 }]}>
                                                    </View>
                                                }
                                                <View style={[innerStyle.innerView, { marginTop: 0 }]}>
                                                    <Icon
                                                        name='clock'
                                                        type="Feather"
                                                        style={{ fontSize: 16, color: '#034CBB', left: 4 }}
                                                    />
                                                    <Text style={innerStyle.categoryText}>
                                                        {moment(item.date_time).format(DATE_FORMAT)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ArchiveDetails', { itemData: item })}>
                                            <View style={{ marginTop: 0, marginBottom: 0, flexDirection: 'row' }}>
                                                <View style={{ marginTop: 5, flex: 0.4 }}>
                                                    <Image
                                                        source={{ uri: item.image }}
                                                        style={{ width: GLOBLE.DEVICE_WIDTH / 3, height: 130, borderRadius: 15 }}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                                <View style={{ flex: 0.68, marginTop: 5 }}>
                                                    <View>
                                                        <Text style={[innerStyle.gridViewTextLayout, { width: GLOBLE.DEVICE_WIDTH / 1.65 }]} >
                                                            {item.title}
                                                        </Text>
                                                    </View>
                                                    <View style={{ marginTop: 5 }}>
                                                        <Text style={innerStyle.descriptionTextStyle} numberOfLines={4}>
                                                            {item.preview}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ borderBottomColor: '#8492A6', borderBottomWidth: 0.8, width: GLOBLE.DEVICE_WIDTH, marginTop: 10, marginBottom: 5 }} />
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const innerStyle = StyleSheet.create({
    innerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    descriptionTextStyle: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: 0.04 * GLOBLE.DEVICE_WIDTH,
        color: '#171819',
    },
    dotView: {
        alignItems: 'flex-end',
        marginRight: 0,
        height: 15,
        justifyContent: 'center',
        width: 50
    },
    mainListView: {
        alignItems: 'flex-end',
        flex: 1,
        zIndex: 9999,
    },
    searchIconStyle: {
        width: 35,
        height: 35,
    },
    optionIconStyle: {
        width: 18,
        height: 18,
    },
    container: {
        flex: 1,
        marginLeft: 6,
        marginRight: 6,
        justifyContent: 'center',
    },
    gridViewContainer: {
        justifyContent: 'center',
        margin: 3,
    },
    listView: {
        alignItems: 'flex-start',
        margin: 3,
    },
    gridViewTextLayout: {
        fontSize: 0.057 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.BarlowCondensedMedium,
        justifyContent: 'center',
        color: '#034CBB',
        width: GLOBLE.DEVICE_WIDTH,
    },
    categoryText: {
        fontSize: 0.035 * GLOBLE.DEVICE_WIDTH,
        fontWeight: '600',
        fontFamily: Fonts.RobotoRegular,
        justifyContent: 'center',
        color: '#171819',
        marginLeft: 10,
        textAlign: 'center',
    },
    mainView: {
        marginTop: 5,
        marginBottom: 30
    },
    iconView: {
        position: 'absolute',
        top: 7,
    },
    talkBubbleSquare: {
        width: 175,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#034CBB',
        justifyContent: 'center',
        borderRadius: 8,
        bottom: 15
    },
    talkBubbleTriangle: {
        alignItems: 'flex-end',
        right: 5
    },
    talkBubbleMessage: {
        color: '#034CBB',
        marginLeft: 8,
        fontFamily: Fonts.RobotoMedium,
        fontSize: 18
    },
    boxTextViewStyle: {
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 4,
        alignItems: 'flex-start',
        flex: 1,
    },
});

const mapStateToProps = ({ archiveEmail }) => {
    const { archivedEmailLoader, archivedEmailData } = archiveEmail;
    return {
        archivedEmailData,
        archivedEmailLoader,
    };
};

export default connect(mapStateToProps, { archivedEmailListAction, deleteArchivedEmailAction, archivedSearchAction })(ArchivedNews);
