import React, { Component } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { Container, Content, Icon } from "native-base";
import { connect } from "react-redux";
import { LABELS } from "../../constant/LanguageConstants";
import {
    MainHeader,
    SwipableListItem,
    ModalComponent,
    Loader,
    NoContentFound,
} from "../../components";
import { Fonts } from "../../utils/Fonts";
import {
    createCategoryAction,
    categoryListAction,
    updateCategoryAction,
    categoryStatusAction,
} from "../action";
import { GLOBLE } from "../../constant/utility.constant";
import { Separator } from "../../components/SwipableListItem";
import { STATUS_CODES } from "../../config";
import { TOASTER_LABEL } from "../../constant/ApiConstants";
import { Toast } from "../../helper";

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
            showModal: false,
            error: false,
            refresh: false,
            categoryId: "",
            categoryStatus: true,
            listItem: [],
        };
    }

    componentDidMount() {
        this.props.categoryListAction((res) => {
        });
    }

    /**
     * @method defineModelBehaviour
     * @description used for open model
     */
    defineModelBehaviour = (modalSelector, item) => {
        if (modalSelector === "disableCategory") {
            this.setState(
                { categoryStatus: !this.state.categoryStatus },
                () => {
                    this.handleCategoryStatus(item);
                }
            );
        } else if (modalSelector === "editCategory") {
            this.setState({ showModal: true }, () => {
                this.handleEditCategory(item);
            });
        } else {
            this.props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "Dashboard",
                        params: { item: item.name, key: "categoryName" },
                    },
                ],
            });
        }
    };

    handleCategoryStatus = (item) => {
        let requestData = {
            category_id: item.id,
        };
        this.props.categoryStatusAction(requestData, (res) => {
            if (res.status === STATUS_CODES.OK) {
                Toast.showToast(res.data.success.data.message, "success");
                this.props.categoryListAction((res) => {
                    if (res.status === STATUS_CODES.OK) {
                        this.setState({ refresh: true });
                    }
                });
            }
        });
    };

    handleEditCategory = (item) => {
        this.setState({ searchText: item.name, categoryId: item.id });
    };

    handleSubmit = (value) => {
        const { searchText, categoryId } = this.state;
        this.setState({ showModal: false }, () => {
            if (categoryId == "") {
                let requestData = {
                    category: searchText,
                };
                this.props.createCategoryAction(requestData, (res) => {
                    if (res.status === STATUS_CODES.CREATED) {
                        Toast.showToast(TOASTER_LABEL.ADD_CATEGORY, "success");
                        this.props.categoryListAction((res) => {
                            if (res.status === STATUS_CODES.OK) {
                                this.setState({ refresh: true });
                            }
                        });
                    }
                });
            } else {
                let requestData = {
                    category: searchText,
                    category_id: categoryId,
                };
                this.props.updateCategoryAction(requestData, (res) => {
                    if (res.status === STATUS_CODES.OK) {
                        Toast.showToast(
                            TOASTER_LABEL.UPDATE_CATEGORY,
                            "success"
                        );
                        this.props.categoryListAction((res) => {
                            if (res.status === STATUS_CODES.OK) {
                                this.setState({
                                    refresh: true,
                                    searchText: "",
                                    categoryId: "",
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    handleSearchField = (val) => {
        this.setState({ showModal: val, searchText: "", categoryId: "" });
    };

    onChnageText = (val) => {
        val = val.replace(/[^ A-Za-z0-9]/g, "");
        this.setState({ searchText: val });
    };

    ListEmptyView = () => {
        return (
            <View
                style={{
                    justifyContent: "center",
                    flex: 1,
                    marginTop: GLOBLE.DEVICE_WIDTH / 2,
                }}
            >
                <NoContentFound
                    customHeight={150}
                    customWidth={150}
                    title={LABELS.NO_DATA}
                />
            </View>
        );
    };

    renderListSection = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={
                    this.props.categoryData &&
                    this.props.categoryData.length > 0
                        ? this.props.categoryData
                        : this.state.listItem
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <SwipableListItem
                        {...item}
                        defineModelBehaviour={(id, item) =>
                            {this.defineModelBehaviour(id, item)
                        }
                        }
                        navigation={this.props.navigation}
                    />
                )}
                ListEmptyComponent={this.ListEmptyView}
                ItemSeparatorComponent={() => <Separator />}
            />
        );
    };

    render() {
        const { showModal, searchText, categoryId } = this.state;
        let obj = {
            searchText: searchText ? searchText : "",
            catId: categoryId,
        };
        return (
            <Container>
                <Loader isLoading={this.props.categoryLoader} />
                <MainHeader
                    leftButtonType={"menu"}
                    leftButton={true}
                    rightButton={true}
                    title={LABELS.MANAGE_CATEGORY}
                    onPress={() => this.setState({ showModal: true })}
                />
                <Content>
                    <View style={innerStyle.container}>
                        {}
                        <View style={innerStyle.mainView}>
                            {this.renderListSection()}                        
                        </View>
                    </View>
                </Content>
                <ModalComponent
                    transparent={true}
                    modalStyle={innerStyle.modalStyle}
                    searchValue={obj}
                    visible={showModal}
                    modalHeaderText={LABELS.ADD_CATEGORY}
                    modalContent={LABELS.ADD_CATEGORY_MSG}
                    modalContentStyle={innerStyle.modalContentStyle}
                    onNoCall={(val) => this.handleSearchField(val)}
                    onYesCall={(val) => this.handleSubmit(val)}
                    onChange={(val) => this.onChnageText(val)}
                    // onChange={(e)=> {this.onChnageText(e), "searchText"}}
                    buttonCount={2}
                />
            </Container>
        );
    }
}

const innerStyle = StyleSheet.create({
    noDataIconStyle: {
        height: 100,
        width: 100,
    },
    noDataTextStyle: {
        fontSize: 15,
        marginTop: 10,
    },
    modalStyle: {
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 2,
        backgroundColor: "#FFFFFF",
        width: GLOBLE.DEVICE_WIDTH - 40,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.8,
    },
    modalContentStyle: {
        fontSize: 0.05 * GLOBLE.DEVICE_WIDTH,
        color: "#47525E",
        textAlign: "left",
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
        fontWeight: "600",
    },
    headingView: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        marginTop: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#8492A6",
    },
    descriptionTextStyle: {
        fontFamily: Fonts.DomineBold,
        fontSize: 16,
        color: "#171819",
    },
    searchIconView: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 10,
        flex: 1,
    },
    iconViewStyle: {
        width: 20,
        height: 20,
    },
    searchIconStyle: {
        width: 35,
        height: 35,
    },
    optionIconStyle: {
        width: 25,
        height: 25,
        bottom: 2.5,
    },
    searchView: {
        alignItems: "flex-start",
        justifyContent: "center",
    },
    searchText: {
        fontSize: 16,
        fontFamily: Fonts.DomineBold,
        color: "#5A6978",
    },
    container: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2,
        justifyContent: "center",
    },
    gridViewContainer: {
        justifyContent: "center",
        borderBottomColor: "#8492A6",
        borderBottomWidth: 1,
        height: 80,
        flex: 1,
        marginTop: 10,
    },
    listView: {
        alignItems: "flex-start",
        margin: 3,
    },
    gridViewTextLayout: {
        fontSize: 12,
        fontFamily: Fonts.DomineBold,
        justifyContent: "center",
        color: "#171819",
    },
    categoryText: {
        fontSize: 17.5,
        fontFamily: Fonts.DomineBold,
        justifyContent: "center",
        color: "#47525E",
        marginLeft: 20,
    },
    headingTextStyle: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
    },
    mainView: {
        marginTop: 5,
        marginBottom: 30,
    },
    usernameStyle: {
        height: 49,
        fontSize: 15,
        fontFamily: Fonts.DomineBold,
        color: "#5A6978",
        paddingLeft: 10,
        width: GLOBLE.DEVICE_WIDTH / 1.3,
    },
    iconView: {
        position: "absolute",
        top: 7,
    },
    iconStyle: {
        fontSize: 22,
        color: "#fff",
    },
    textFiledStyle: {
        marginTop: 30,
    },
    bottomView: {
        width: "100%",
        alignItems: "center",
        marginVertical: 50,
        justifyContent: "center",
    },
    buttonStyle: {
        width: GLOBLE.DEVICE_WIDTH - 60,
        height: 45,
        backgroundColor: "#207feb",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 50,
    },
    buttonTextStyle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    forgotPasswordStyle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 40,
    },
    topView: {
        marginTop: 30,
    },
    errorStyle: {
        color: "yellow",
        fontWeight: "bold",
    },
    errorView: {
        borderWidth: 1,
        borderColor: "yellow",
        padding: 10,
        marginTop: 20,
        backgroundColor: "rgba(255,255,0,0.2)",
    },
    talkBubble: {
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 2, // <- zIndex here
        flex: 1,
        right: -6,
        position: "absolute",
        top: 0,
    },
    talkBubbleSquare: {
        width: 180,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#034CBB",
        justifyContent: "center",
        borderRadius: 8,
    },
    talkBubbleTriangle: {
        position: "absolute",
        right: 0,
        bottom: -17,
    },
    talkBubbleMessage: {
        color: "#171819",
        marginTop: 2,
        marginLeft: 8,
        fontFamily: Fonts.DomineBold,
    },
    boxTextViewStyle: {
        flexDirection: "row",
        marginLeft: 8,
        marginTop: 7,
        marginBottom: 7,
        alignItems: "flex-start",
        flex: 1,
    },
});

const mapStateToProps = ({ category }) => {
    const { categoryData, categoryLoader } = category;
    return { categoryData, categoryLoader };
};

export default connect(mapStateToProps, {
    createCategoryAction,
    categoryListAction,
    updateCategoryAction,
    categoryStatusAction,
})(Categories);
