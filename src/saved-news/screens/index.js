import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { LABELS } from '../../constant/LanguageConstants';
import { Loader, MainHeader, NoContentFound } from '../../components';
import { Fonts } from '../../utils/Fonts';
import { saveNewsListAction, deleteSaveNewsAction, savedSearchAction, archiveNewsfeedAction } from '../../redux/actions';
import { GLOBLE } from '../../constant/utility.constant';
import { Toast } from '../../helper';
import { DATE_FORMAT, STATUS_CODES } from '../../config';

class SavedNews extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            showInfo: false,
            selectedItem: '',
            listItem: [],
            isLoading: true,
            loading: false,
            refreshItem: '',
        };
    }

    componentDidMount() {
        this.props.saveNewsListAction(res => { });
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ isLoading: false })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleRefresh = () => {
        this.props.saveNewsListAction(res => { });
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
                this.props.savedSearchAction(obj);
            } else {
                this.props.saveNewsListAction(res => {
                });
            }
        })
    }

    handleDot = (index, id) => {
        const { selectedItem, showInfo } = this.state;
        if (selectedItem !== id) {
            this.setState({ selectedItem: id, showInfo: true })
        } else {
            this.setState({ selectedItem: id, showInfo: !showInfo });
        }
    }

    handleDelete = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : ''
        };
        this.props.deleteSaveNewsAction(requestData, res => {
            if (res && res.data && res.data.success && res.data.success.data && res.data.success.data) {
                Toast.showToast(res.data.success.data.message, 'success');
                this.props.saveNewsListAction(res => { });
            }
        });
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

    handleArchive = (item) => {
        this.setState({ showInfo: false, loading: true });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : ''
        };
        this.props.archiveNewsfeedAction(requestData, res => {
            if (res.status === STATUS_CODES.CREATED) {
                this.setState({ loading: false });
                if (res && res.data && res.data.success && res.data.success.data && res.data.success.data) {
                    Toast.showToast('Saved email archived successfully', 'success');
                }
            }
        });
    }

    handleOptions = (item) => {
        return (
            <View>
                <View style={innerStyle.talkBubbleTriangle}>
                    <Image
                        source={require('../../assets/images/tringle.png')}
                        style={[innerStyle.searchIconStyle, { bottom: 8 }]}
                        resizeMode='contain'
                    />
                    <View style={innerStyle.talkBubbleSquare}>
                        <TouchableOpacity style={innerStyle.boxTextViewStyle} onPress={() => this.handleDeleteAlert(item)}>
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.DELETE_NEWS}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[innerStyle.boxTextViewStyle, { marginBottom: 5 }]} onPress={() => this.handleArchive(item)}>
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.ARCHIVE_NEWS}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={innerStyle.boxTextViewStyle} onPress={() => this.handleDeleteAlert(item)}>
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.UNSAVE}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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

    _renderRow = (rowData) => {
        const { item, index } = rowData;
        const { categoryData, showInfo, selectedItem } = this.state;
        return (
            <View style={innerStyle.gridViewContainer} key={index}>
                <View style={innerStyle.mainListView}>
                    <TouchableOpacity
                        style={innerStyle.dotView}
                        onPress={() => this.handleDot(index, item.id)}>
                        <Image
                            source={require('../../assets/images/dot.png')}
                            style={[innerStyle.searchIconStyle, { bottom: 0 }]}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ zIndex: 999, position: 'absolute', right: 0, top: 15 }}>
                    {showInfo && selectedItem === item.id &&
                        this.handleOptions(item)
                    }
                </View>
                <View style={innerStyle.headView}>
                    <View style={innerStyle.outerView}>
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
                            <View style={[innerStyle.innerView, { marginTop: 0, flex: 1, right: 2 }]}>
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EmailDetails', { itemData: item })}>
                    <View style={{ marginTop: 2, marginBottom: 2, flexDirection: 'row' }}>
                        <View style={{ marginTop: 5, flex: 0.4 }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: GLOBLE.DEVICE_WIDTH / 3, height: 130, borderRadius: 15 }}
                                resizeMode='cover'
                            />
                        </View>
                        <View style={{ flex: 0.68, marginTop: 5, marginLeft: 6, marginRight: 10}}>
                            <View>
                                <Text style={[innerStyle.gridViewTextLayout, { width: GLOBLE.DEVICE_WIDTH / 1.65 }]} >
                                    {item.title}
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', flex: 1, marginTop: 8}}>
                                <Text style={innerStyle.descriptionTextStyle} numberOfLines={4}>
                                    {item.preview}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={innerStyle.bottomLine} />
            </View>
        )
    }

    render() {
        return (
            <Container>
                <Loader isLoading={this.props.saveNewsLoader || this.state.loading} />
                <MainHeader leftButtonType={'menu'} leftButton={true} rightButtonType={'refresh'} rightButton={true} title={LABELS.SAVED_EMAIL} onPress={() => this.handleRefresh()} />
                <Content>
                    <View style={innerStyle.container}>
                        <View style={innerStyle.mainView}>
                            <FlatList
                                data={this.props.saveNewsData && this.props.saveNewsData.length > 0 ? this.props.saveNewsData : this.state.listItem}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this._renderRow}
                                extraData={this.state}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={this.ListEmptyView}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const innerStyle = StyleSheet.create({
    descriptionView: {
        marginTop: 5
    },
    image: {
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1 // Your aspect ratio
    },
    flexView: {
        marginTop: 0,
        flex: 0.4
    },
    mainListView: {
        alignItems: 'flex-end',
        flex: 1,
        zIndex: 9999,
    },
    optionMainView: {
        marginRight: 14,
        left: 15
    },
    dotView: {
        alignItems: 'flex-end',
        marginRight: 0,
        height: 15,
        justifyContent: 'center',
        width: 50,
        bottom: 2
    },
    imageView: {
        width: GLOBLE.DEVICE_WIDTH / 2.9,
        height: 175,
        borderRadius: 15
    },
    optionView: {
        marginTop: 10,
        marginBottom: 10
    },
    halfView: {
        flex: 0.65
    },
    innerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomLine: {
        borderBottomColor: '#8492A6',
        borderBottomWidth: 0.8,
        width: GLOBLE.DEVICE_WIDTH,
        marginTop: 10,
        marginBottom: 5
    },
    titleMainView: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row'
    },
    outerView: {
        // marginTop: 5,
        // marginBottom: 5,
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1,
    },
    descriptionTextStyle: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: 0.042 * GLOBLE.DEVICE_WIDTH,
        color: '#171819',
        textAlign: 'auto'
    },
    headView: {
        marginLeft: 3,
        zIndex: -999,
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
        fontSize: 0.054 * GLOBLE.DEVICE_WIDTH,
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
    iconStyle: {
        fontSize: 22,
        color: '#fff',
    },
    talkBubbleSquare: {
        width: 165,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#034CBB',
        justifyContent: 'center',
        borderRadius: 8,
        bottom: 18
    },
    talkBubbleTriangle: {
        alignItems: 'flex-end',
    },
    talkBubbleMessage: {
        color: '#034CBB',
        marginLeft: 8,
        fontFamily: Fonts.RobotoMedium,
        fontSize: 16
    },
    boxTextViewStyle: {
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 2,
        marginBottom: 2,
        alignItems: 'flex-start',
        flex: 1,
    },
});

const mapStateToProps = ({ saveNews }) => {
    const { saveNewsData, saveNewsLoader } = saveNews;
    return {
        saveNewsData,
        saveNewsLoader,
    };
};

export default connect(mapStateToProps, { deleteSaveNewsAction, saveNewsListAction, savedSearchAction, archiveNewsfeedAction })(SavedNews);