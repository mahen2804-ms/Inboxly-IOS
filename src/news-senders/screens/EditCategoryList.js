
import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import RenderCategory from '../../dashboard/screens/RenderCategory';
import { LABELS } from '../../constant/LanguageConstants';
import { categoryListAction, editCategoryAction, createCategoryAction } from '../../redux/actions';
import { Loader, MainHeader, ModalComponent } from '../../components';
import { STATUS_CODES } from '../../config';
import { Toast } from '../../helper';
import { GLOBLE } from '../../constant/utility.constant';
import { Icon } from 'native-base';
import { TOASTER_LABEL } from '../../constant/ApiConstants';

class EditCategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCatId: '',
            selectedCategory: '',
            listItem: [],
            feedId: '',
            senderId: '',
            senderCatId: '',
            showModal: false,
            searchText: '',
            categoryId: '',
        };
    }

    componentDidMount() {
        const item = this.props.route.params.feedId;
        const selectedCatId = this.props.route.params.categoryData;
        const selectedSender = this.props.route.params.selectedSender;
        if (item) {
            this.setState({ senderId: item, selectedCatId: selectedCatId, senderCatId: selectedSender });
        }
        this.props.categoryListAction(res => {
            if (res && res.data && res.data.success && res.data.success.data && res.data.success.data.length > 0) {
                this.setState({ listItem: res.data.success.data });
            }
        });
    }

    handleNavigation = () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'NewsSenders' }],
        })
    };

    handleSearchField = (val) => {
        this.setState({ showModal: val, searchText: '', categoryId: '' })
    }

    onChnageText = (val) => {
        val = val.replace(/[^ A-Za-z0-9]/g, "");
        this.setState({ searchText: val });
    }

    handleCreateCategory = () => {
        this.setState({ showModal: true });
    }

    handleSubmit = (value) => {
        const { searchText, categoryId } = this.state;
        this.setState({ showModal: false }, () => {
            if (categoryId == '') {
                let requestData = {
                    category: searchText,
                };
                this.props.createCategoryAction(requestData, res => {
                    if (res.status === STATUS_CODES.CREATED) {
                        Toast.showToast(TOASTER_LABEL.ADD_CATEGORY, 'success');
                        this.setState({ searchText: '', categoryId: '' }, () => {
                            this.props.categoryListAction(res => {
                                if (res && res.data && res.data.success && res.data.success.data && res.data.success.data.length > 0) {
                                    this.setState({ listItem: res.data.success.data });
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    /**
     * @method renderData
     * @description to pass the category to previous page
     */
    renderData = () => {
        let requestData = {
            sender_id: this.state.senderId,
            category_id: this.state.selectedCatId,
            sender_category_id: this.state.senderCatId
        };
        this.props.editCategoryAction(requestData, res => {
            if (res.status === STATUS_CODES.CREATED) {
                if (res && res.data && res.data.success && res.data.success.data && res.data.success.data) {
                    Toast.showToast(res.data.success.data.message, 'success');
                    this.handleNavigation();
                }
            }
        });
    };

    /**
     * @method renderListTile
     * @description called for list component
    */
    renderListTile = rowData => {
        return (
            <RenderCategory
                isSelected={this.state.selectedCatId}
                data={rowData}
                setSelected={(selected, categoryName) =>
                    this.setState({
                        selectedCatId: selected,
                        selectedCategory: categoryName,
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
                data={this.state.listItem}
                renderItem={this.renderListTile}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
            />
        );
    };
    /**
     * @method render
     * @description to render component
    */
    render() {
        const { selectedCatId, selectedCategory, showModal, searchText, categoryId  } = this.state;
        let obj = {
            searchText: searchText ? searchText : '',
            catId: categoryId
        };
        return (
            <View style={[innerStyle.mainViewStyle]}>
                <Loader isLoading={this.props.categoryLoader} />
                {/* <MainHeader leftButtonType={'back'} rightButtonType={'check-circle-outline'} leftButton={true} rightButton={true} title={LABELS.ASSIGN_CATEGORY} onPress={() => this.renderData(selectedCategory, selectedCatId)} /> */}
                <MainHeader leftButtonType={'back'} leftButton={true} rightButtonType={'check-circle-outline'} rightButton={true} title={LABELS.CHANGE_CATEGORY} onPress={() => this.renderData(selectedCategory, selectedCatId)} />
                <View style={innerStyle.listStyle}>
                    <View style={innerStyle.mainPWwrap}>
                        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 7, marginBottom: 2 }} onPress={() => this.handleCreateCategory()}>
                            <Icon
                                type="MaterialIcons"
                                name="add-circle"
                                style={{ fontSize: 26, color: '#034CBB' }}
                            />
                            <View style={innerStyle.categoryText}>
                                <Text style={{ fontSize: 0.045 * GLOBLE.DEVICE_WIDTH }}>{'Create Category'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.renderList()}
                </View>
                <ModalComponent
                    transparent={true}
                    modalStyle={innerStyle.modalStyle}
                    searchValue={obj}
                    visible={showModal}
                    modalHeaderText={LABELS.ADD_CATEGORY}
                    modalContent={LABELS.ADD_CATEGORY_MSG}
                    modalContentStyle={innerStyle.modalContentStyle}
                    onNoCall={val => this.handleSearchField(val)}
                    onYesCall={val => this.handleSubmit(val)}
                    onChange={val => this.onChnageText(val)}
                    // onChange={(e)=> {this.onChnageText(e), "searchText"}}
                    buttonCount={2}
                />
            </View>
        );
    }
}

const innerStyle = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
    },
    listStyle: {
        flex: 1,
        marginTop: 20,
    },
    modalStyle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        width: GLOBLE.DEVICE_WIDTH - 40,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.8,
    },
    modalContentStyle: {
        fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
        color: '#47525E',
        textAlign: 'left',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
        fontWeight: '600'
    },
    mainPWwrap: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    categoryText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
    },
});

const mapStateToProps = ({ category }) => {
    const { categoryData, categoryLoader } = category;
    return { categoryData, categoryLoader };
};

export default connect(mapStateToProps, { categoryListAction, editCategoryAction, createCategoryAction })(EditCategoryList);