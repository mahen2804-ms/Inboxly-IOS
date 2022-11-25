// import React, { Component } from "react";
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TextInput,
//     Alert,
//     TouchableWithoutFeedback,
//     TouchableOpacity,
//     RefreshControl,
//     FlatList,
//     BackHandler,
// } from "react-native";
// import { Container, Icon } from "native-base";
// import { connect } from "react-redux";
// import moment from "moment";
// import { LABELS } from "../../constant/LanguageConstants";
// import EventBus from "react-native-event-bus";
// import {
//     Loader,
//     MainHeader,
//     NoContentFound,
//     SnoozeModal,
// } from "../../components";
// import {
//     newsfeedListAction,
//     newsfeedSearchAction,
//     saveNewsfeedAction,
//     archiveNewsfeedAction,
//     deleteNewsfeedAction,
//     snoozSenderAction,
// } from "../../redux/actions";
// import { Fonts } from "../../utils/Fonts";
// import { GLOBLE } from "../../constant/utility.constant";
// import { Toast } from "../../helper";
// import { DATE_FORMAT, STATUS_CODES } from "../../config";
// import { WebView } from "react-native-webview";
// import AsyncStorage from "@react-native-community/async-storage";
// let typingTimeout = null;
// class Dashboard extends Component {
//     _isMounted = false;
//     constructor() {
//         super();
//         this.state = {
//             searchText: "",
//             showInfo: false,
//             isFetching: false,
//             showFilter: false,
//             showModal: false,
//             categoryData: "",
//             selectedItem: "",
//             senderId: "",
//             listItem: [],
//             isLoading: false,
//             modalVisible: false,
//             refreshItem: "",
//             refreshValue: "",
//             firstTimeLoginVar: false,
//             page: 1,
//             filter: false,
//             categoryName : '',
//             token : ''
//         };
//     }
//     componentDidMount() {
//         this.setState({ isLoading: true });
//         let requestData = { page: 1 } // this.state.page
//         this.backHandler = BackHandler.addEventListener(
//             "hardwareBackPress",
//             this.backAction
//         );
//         if (this.props && this.props.route && this.props.route.params) { 
//             const { item, key } = this.props.route.params;
//             this.setState({ isLoading: false ,categoryName : item});
//             this.handleFilterItem(item, key);
//         } else {
//             this.props.newsfeedListAction(requestData, (res) => {
//                 this.setState({ listItem: res.data.success.data })
//                 this._isMounted = true;
//                 if (this._isMounted) {
//                     this.setState({ isLoading: false });
//                 }
//                 this.setState({ isLoading: false });
//                 AsyncStorage.getItem("LoginFirstTime")
//                     .then((value) => {
//                         this.setState({ firstTimeLoginVar: value });

//                     })
//                     .done();
//             });
//         }
//         EventBus.getInstance().addListener(
//             "fromNewsFeedDetailsScreen",
//             (this.listener = (data) => {
//                 let requestData = { page: 1 }
//                 this.props.newsfeedListAction(requestData, (res) => {

//                 });
//                 this._isMounted = true;
//                 if (this._isMounted) {
//                     this.setState({ isLoading: false });
//                 }
//             })
//         );
//     }
//     backAction = () => {
//         if (!this.props.navigation.isFocused()) {
//             // The screen is not focused, so don't do anything
//             return false;
//         } else {
//             Alert.alert("", "Are you sure you want to close Inboxly?", [
//                 {
//                     text: "Cancel",
//                     onPress: () => null,
//                     style: "cancel",
//                 },
//                 { text: "YES", onPress: () => BackHandler.exitApp() },
//             ]);
//             return true;
//         }
//     };
//     setModalVisible = (visible) => {
//         this.setState({ modalVisible: visible });
//     };
//     onRefresh() {
//         let requestData = { page: 1 }
//         this.setState({ isFetching: true }, () => {
//             this.props.newsfeedListAction(requestData, (res) => {
//                 this.setState({
//                     isFetching: false,
//                     refreshItem: "",
//                     refreshValue: "",
//                     listItem: res.data.success.data
//                 });
//             });
//         });
//     }
//     handleRefresh() {
//         let requestData = { page: 1 }
//         this.props.newsfeedListAction(requestData, (res) => {
//             this.setState({
//                 isFetching: false,
//                 refreshItem: "",
//                 refreshValue: "",
//                 listItem: res.data.success.data
//             });
//         });
//     }
//     pullDownRefresh = () => {
//         const { refreshItem, refreshValue } = this.state;
//         if (refreshItem !== "" && refreshValue !== "") {
//             if (refreshItem !== "") {
//                 let obj;
//                 if (refreshValue === "senderName") {
//                     obj = {
//                         senderName: refreshItem,
//                     };
//                 } else if (refreshValue === "categoryName") {
//                     obj = {
//                         categoryName: refreshItem,
//                     };
//                 } else {
//                     obj = {
//                         filterValue: refreshItem,
//                     };
//                 }
//                 this.props.newsfeedSearchAction(obj);
//             }
//         } else {
//             this.onRefresh();
//         }
//     };
//     paginationNewsFeed = () => {
//         this.setState({isLoading : true})
//         if (this.state.filter) {
//             let requestData = { page: this.state.page };
//             var myHeaders = new Headers();
//             myHeaders.append("Authorization", "Bearer " + this.state.token);
//             var formdata = new FormData();
//             formdata.append("categoryName", this.state.categoryName);

//             var requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: formdata,
//                 redirect: 'follow'
//             };

//             fetch("https://app.myinboxly.com/api/v1/newsfeed?page=" + requestData.page, requestOptions)
//                 .then(response => response.json())
//                 .then(result => { if (result.success.data.length) {
//                     let { listItem } = this.state
//                     let moreData = [...listItem, ...result.success.data]
//                     this.setState({ listItem: moreData, isLoading: false })
//                 }else{
//                     this.setState({ isLoading: false });
//                 }
//                    })
                 
//                // this.setState({ listItem: result.success.data })
//                 .catch(error => console.log('error', error));
//         }
//         else {
//             let requestData = { page: this.state.page };
//             this.props.newsfeedListAction(requestData, (res) => {
//                 if (res.data.success.data.length > 0) {
//                     let { listItem } = this.state
//                     let moreData = [...listItem, ...res.data.success.data]
//                     this.setState({ listItem: moreData, isLoading: false })
//                     // this.setState({ listItem: [...this.state.listItem, ...res.data.success.data], isLoading: false })
//                     // let updatedList = this.state.itemList.concat(
//                     //     res.data.success.data
//                     // );
//                     // this.setState({
//                     //     itemList: updatedList,
//                     //     isFetching: false,
//                     //     refreshItem: "",
//                     //     refreshValue: "",
//                     // });
//                 }
//                 else {
//                     this.setState({ isLoading: false });
//                 }
//             });
//         }

//     };
//     componentWillUnmount() {
//         EventBus.getInstance().removeListener("fromNewsFeedDetailsScreen");
//         this.backHandler.remove();
//         this._isMounted = false;
//         //  AsyncStorage.setItem("LoginFirstTime", JSON.stringify(false));
//     }
//     componentDidUpdate() {
//         AsyncStorage.setItem("LoginFirstTime", JSON.stringify(false));
//     }
//     handleDot = (index, id) => {
//         const { selectedItem, showInfo } = this.state;
//         if (selectedItem !== id) {
//             this.setState({ selectedItem: id, showInfo: true });
//         } else {
//             this.setState({ selectedItem: id, showInfo: !showInfo });
//         }
//     };
//     handleAssignCategory = (item) => {
//         this.setState({ showInfo: false });
//         this.props.navigation.navigate("AssignCategoryList", {
//             feedId: item.id,
//             senderId: item.sender_id,
//             news_category_id: item.news_category_id,
//             refreshItem: this.state.refreshItem,
//             refreshValue: this.state.refreshValue,
//         });
//     };
//     filterlist = async (item,key) => {
//         const result = await AsyncStorage.getItem("loginToken");
//         this.setState({ token: result })
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization",
//             "Bearer " + result);

//         var formdata = new FormData();
//         formdata.append(key, item);
//         // formdata.append("senderName", item);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: formdata,
//             redirect: 'follow'
//         };

//         fetch("https://app.myinboxly.com/api/v1/newsfeed", requestOptions)
//             .then(response => response.json())
//             .then(result => this.setState({ listItem: result.success.data }))
//             .catch(error => console.log('error', error));
//     }
//     handleOptions = (item) => {
//         return (
//             <View>
//                 <View style={innerStyle.talkBubbleTriangle}>
//                     <Image
//                         source={require("../../assets/images/tringle.png")}
//                         style={[innerStyle.searchIconStyle, { bottom: 8 }]}
//                         resizeMode="contain"
//                     />
//                     <View style={innerStyle.talkBubbleSquare}>
//                         <TouchableOpacity
//                             style={innerStyle.boxTextViewStyle}
//                             onPress={() => this.handleSave(item)}
//                         >
//                             <Text style={innerStyle.talkBubbleMessage}>
//                                 {LABELS.SAVE_NEWS}
//                             </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={innerStyle.boxTextViewStyle}
//                             onPress={() => this.handleDeleteAlert(item)}
//                         >
//                             <Text style={innerStyle.talkBubbleMessage}>
//                                 {LABELS.DELETE_NEWS}
//                             </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={innerStyle.boxTextViewStyle}
//                             onPress={() => this.handleArchive(item)}
//                         >
//                             <Text style={innerStyle.talkBubbleMessage}>
//                                 {LABELS.ARCHIVE_NEWS}
//                             </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={innerStyle.boxTextViewStyle}
//                             onPress={() => this.handleSnooze(item)}
//                         >
//                             <Text style={innerStyle.talkBubbleMessage}>
//                                 {LABELS.SNOOZE_SENDER}
//                             </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[
//                                 innerStyle.boxTextViewStyle,
//                                 { marginBottom: 10 },
//                             ]}
//                             onPress={() => { this.handleAssignCategory(item) }}
//                         >
//                             <Text style={innerStyle.talkBubbleMessage}>
//                                 {LABELS.ASSIGN_CATEGORY}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         );
//     };
//     handleFilterOption = (item) => {
//         return (
//             <View>
//                 <TouchableWithoutFeedback
//                     onPress={() => this.setState({ showFilter: false })}
//                 >
//                     <View style={innerStyle.talkBubbleTriangle}>
//                         <Image
//                             source={require("../../assets/images/tringle.png")}
//                             style={[innerStyle.searchIconStyle, { bottom: 8 }]}
//                             resizeMode="contain"
//                         />
//                         <View style={innerStyle.talkBubbleSquare}>
//                             <TouchableOpacity
//                                 style={innerStyle.boxTextViewStyle}
//                                 onPress={() => this.handleFilterItem("unread")}
//                             >
//                                 <Text style={innerStyle.filterText}>
//                                     {LABELS.UNREAD_EMAILS}
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={innerStyle.boxTextViewStyle}
//                                 onPress={() =>
//                                     this.handleFilterItem("new_to_old")
//                                 }
//                             >
//                                 <Text style={innerStyle.filterText}>
//                                     {LABELS.NEW_TO_OLD_EMAILS}
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={innerStyle.boxTextViewStyle}
//                                 onPress={() => this.handleFilterItem("read")}
//                             >
//                                 <Text style={innerStyle.filterText}>
//                                     {LABELS.READ_EMAILS}
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[
//                                     innerStyle.boxTextViewStyle,
//                                     { marginBottom: 10 },
//                                 ]}
//                                 onPress={() =>
//                                     this.handleFilterItem("old_to_new")
//                                 }
//                             >
//                                 <Text style={innerStyle.filterText}>
//                                     {LABELS.OLD_TO_NEW_EMAILS}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </View>
//         );
//     };
//     handleFilterItem = (item, key) => {
//         this.setState({
//             showFilter: false,
//             refreshItem: item,
//             refreshValue: key,
//         });
//         if (item !== "") {
//             let obj;
//             if (key === "senderName") {
//                 obj = {
//                     senderName: item,
//                 };
//             } else if (key === "categoryName") {
//                 obj = {
//                     categoryName: item,
//                 };
//             } else {
//                 obj = {
//                     filterValue: item,
//                 };
//             }
//             this.filterlist(item,key)
//             this.setState({
//                 filter: true,
//             });
//             // this.props.newsfeedSearchAction(obj, (res) => {
//             //     this.setState({ listItem: res.data.success.data })
//             // });
//         }
//         else {
//             let requestData = { page: 1 }
//             this.props.newsfeedListAction(requestData, (res) => {
//                 this.setState({ refreshItem: "", refreshValue: "", listItem: res.data.success.data });
//             });
//         }
//     };


//     handleSnooze = (item) => {
//         this.setState({
//             showInfo: false,
//             showModal: true,
//             senderId: item.sender_id,
//         });
//     };
//     handleSnooozeSubmit = (val, id, value) => {
//         this.setState({ showModal: val });
//         let requestData = {
//             sender_id: this.state.senderId,
//             duration_id: id,
//         };
//         this.props.snoozSenderAction(requestData, (res) => {
//             let requestData = { page: 1 }
//             if (res.status === STATUS_CODES.CREATED) {
//                 if (
//                     res &&
//                     res.data &&
//                     res.data.success &&
//                     res.data.success.data &&
//                     res.data.success.data
//                 ) {
//                     Toast.showToast(res.data.success.data.message, "success");
//                     this.props.newsfeedListAction(requestData, (res) => { });
//                 }
//             }
//         });
//     };
//     handleSave = (item) => {
//         this.setState({ showInfo: false });
//         let requestData = {
//             newsfeed_id: item.id,
//             category_id: item.category_id ? item.category_id : "",
//         };
//         this.props.saveNewsfeedAction(requestData, (res) => {
//             if (res.status === STATUS_CODES.CREATED) {
//                 if (
//                     res &&
//                     res.data &&
//                     res.data.success &&
//                     res.data.success.data &&
//                     res.data.success.data
//                 ) {
//                     Toast.showToast(res.data.success.data.message, "success");
//                 }
//             }
//         });
//     };
//     handleDeleteAlert = (item) => {
//         Alert.alert(
//             "Alert",
//             "Are you sure you want to delete this email?",
//             [
//                 {
//                     text: "No",
//                     onPress: () => this.setState({ showInfo: false }),
//                     style: "cancel",
//                 },
//                 { text: "Yes", onPress: () => this.handleDelete(item) },
//             ],
//             { cancelable: false }
//         );
//     };
//     handleDelete = (item) => {
//         this.setState({ showInfo: false });
//         let requestData = {
//             newsfeed_id: item.id,
//             category_id: item.category_id ? item.category_id : "",
//         };
//         this.props.deleteNewsfeedAction(requestData, (res) => {
//             let requestData = { page: 1 }
//             if (
//                 res &&
//                 res.data &&
//                 res.data.success &&
//                 res.data.success.data &&
//                 res.data.success.data
//             ) {
//                 Toast.showToast(res.data.success.data.message, "success");
//                 this.props.newsfeedListAction(requestData, (res) => {
                    
//                  });
//             }
//         });
//     };
//     handleArchive = (item) => {
//         this.setState({ showInfo: false });
//         let requestData = {
//             newsfeed_id: item.id,
//             category_id: item.category_id ? item.category_id : "",
//         };
//         this.props.archiveNewsfeedAction(requestData, (res) => {
//             let requestData = { page: 1 }
//             if (res.status === STATUS_CODES.CREATED) {
//                 if (
//                     res &&
//                     res.data &&
//                     res.data.success &&
//                     res.data.success.data &&
//                     res.data.success.data
//                 ) {
//                     Toast.showToast(res.data.success.data.message, "success");
//                     this.props.newsfeedListAction(requestData, (res) => { });
//                 }
//             }
//         });
//     };
//     searchFilterFunction(text) {
//         if (text.length > 1) {
//             if (typingTimeout) {
//                 clearTimeout(typingTimeout);
//             }
//             typingTimeout = setTimeout(() => {
//                 let obj = {
//                     filterValue: text,
//                 };
//                 // this.props.newsfeedSearchAction(obj);
//                 this.props.newsfeedSearchAction((obj) => {
//                     this.setState({ listItem: res.data.success.data })
//                 });
//             }, 1000);
//         } else {
//             let requestData = { page: 1 }
//             this.props.newsfeedListAction(requestData, (res) => {
//                 this.setState({ listItem: res.data.success.data })
//             });
//         }
//     }
//     onBlur() {
//         this.searchFilterFunction(this.state.searchText);
//     }
//     ListEmptyView = () => {
//         const { firstTimeLoginVar } = this.state;
//         return (
//             <View
//                 style={{
//                     justifyContent: "center",
//                     height: "100%",
//                     width: "100%",
//                     alignItems: "center",
//                     alignContent: "center",
//                 }}
//             >
//                 <NoContentFound
//                     customHeight={150}
//                     customWidth={150}
//                     titleWelcome={
//                         firstTimeLoginVar === "true"
//                             ? LABELS.WELCOME
//                             : "No data found.."
//                     }
//                     titleWelcome1={
//                         firstTimeLoginVar === "true"
//                             ? LABELS.WELCOME_MESSAGE
//                             : ""
//                     }
//                 />
//             </View>
//         );
//     };
//     handleFilter = () => {
//         this.setState({ showFilter: !this.state.showFilter });
//     };
//     handleNavigation = (item) => {
//         this.setState({ showInfo: false, showFilter: false });
//         this.props.navigation.navigate("NewsfeedDetails", { itemData: item });
//     };
//     _renderRow = (rowData) => {
//         const { item, index } = rowData;
//         const { showInfo, selectedItem, modalVisible } = this.state;
//         return (
//             <View style={innerStyle.gridViewContainer} key={item.id}>
//                 <View style={innerStyle.innerListView}>
//                     <View style={[innerStyle.imageOuterView, { zIndex: 9999 }]}>
//                         <TouchableOpacity
//                             style={innerStyle.dotStyle}
//                             onPress={() => this.handleDot(index, item.id)}
//                         >
//                             <Image
//                                 source={require("../../assets/images/dot.png")}
//                                 style={[
//                                     innerStyle.searchIconStyle,
//                                     { bottom: 0 },
//                                 ]}
//                                 resizeMode="contain"
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View
//                         style={{
//                             zIndex: 999,
//                             position: "absolute",
//                             right: 2,
//                             top: 15,
//                         }}
//                     >
//                         {showInfo &&
//                             selectedItem === item.id &&
//                             this.handleOptions(item)}
//                     </View>
//                     <View style={innerStyle.mainImageView}>
//                         <TouchableOpacity
//                             onPress={() =>
//                                 this.handleFilterItem(
//                                     item.sender_name,
//                                     "senderName"
//                                 )
//                             }
//                         >
//                             <View
//                                 style={[innerStyle.innerView, { marginTop: 0 }]}
//                             >
//                                 <Image
//                                     source={
//                                         item.is_read
//                                             ? require("../../assets/images/email-blue-open.png")
//                                             : require("../../assets/images/emailblue.png")
//                                     }
//                                     style={[innerStyle.optionIconStyle]}
//                                     resizeMode="contain"
//                                 />
//                                 <Text
//                                     style={[
//                                         innerStyle.categoryText,
//                                         { bottom: 2, right: 4 },
//                                     ]}
//                                 >
//                                     {item.sender_name}
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                         {item.category_name &&
//                             item.category_name !== "" &&
//                             item.category_name !== null &&
//                             item.category_name !== undefined ? (
//                             <TouchableOpacity
//                                 style={[
//                                     innerStyle.innerView,
//                                     { marginTop: 0, flex: 1 },
//                                 ]}
//                                 onPress={() =>
//                                     this.handleFilterItem(
//                                         item.category_name,
//                                         "categoryName"
//                                     )
//                                 }
//                             >
//                                 {/* <Image
//                                     source={require("../../assets/images/social.png")}
//                                     style={innerStyle.optionIconStyle}
//                                     resizeMode="contain"
//                                 /> */}
//                                 <Text
//                                     style={[
//                                         innerStyle.categoryText,
//                                         { right: 3 },
//                                     ]}
//                                 >
//                                     {item.category_name
//                                         ? item.category_name
//                                         : categoryData}
//                                 </Text>
//                             </TouchableOpacity>
//                         ) : (
//                             <View
//                                 style={[
//                                     innerStyle.innerView,
//                                     { marginTop: 0, flex: 1 },
//                                 ]}
//                             ></View>
//                         )}
//                         <View
//                             style={[
//                                 innerStyle.innerView,
//                                 { marginTop: 5, marginBottom: 5 },
//                             ]}
//                         >
//                             <Icon
//                                 name="clock"
//                                 type="Feather"
//                                 style={{
//                                     fontSize: 16,
//                                     color: "#034CBB",
//                                     left: 4,
//                                 }}
//                             />
//                             <Text style={innerStyle.categoryText}>
//                                 {moment(item.date_time).format(DATE_FORMAT)}
//                             </Text>
//                         </View>
//                     </View>
//                     <TouchableOpacity
//                         onPress={() => this.handleNavigation(item)}
//                     >
//                         <View>
//                             <Image
//                                 source={{ uri: item.image }}
//                                 style={{
//                                     width: "98%",
//                                     height: 230,
//                                     marginLeft: 5,
//                                     marginRight: 10,
//                                 }}
//                                 resizeMode="contain"
//                             />
//                         </View>
//                         <Text style={innerStyle.gridViewTextLayout}>
//                             {item.title}
//                         </Text>
//                     </TouchableOpacity>
//                     <View style={innerStyle.descriptionView}>
//                         <Text
//                             style={innerStyle.descriptionTextStyle}
//                             numberOfLines={2}
//                         >
//                             {item.preview}
//                         </Text>
//                     </View>
//                     {/* <WebView
//                         javaScriptEnabled={true}
//                         domStorageEnabled={true}
//                         scalesPageToFit={true}
//                         source={{ html: item.description }}
//                         style={innerStyle.webView}
//                         startInLoadingState={true}
//                     /> */}
//                 </View>
//                 <View style={innerStyle.bottomLine} />
//             </View>
//         );
//     };
//     render() {
//         const { searchText, showModal, listItem, showFilter } = this.state;
//         return (
//             <Container>
//                 <MainHeader
//                     leftButtonType={"menu"}
//                     leftButton={true}
//                     rightButton={true}
//                     title={""}
//                     onPress={() => this.handleFilter()}
//                     onImagePress={() => this.handleRefresh()}
//                 />
//                 <Loader isLoading={this.state.isLoading} />
//                 <View
//                     style={{
//                         zIndex: 999,
//                         position: "absolute",
//                         right: 5,
//                         top: GLOBLE.DEVICE_HEIGHT > 800 ? 80 : 30,
//                     }}
//                 >
//                     {showFilter && this.handleFilterOption()}
//                 </View>
//                 <View style={innerStyle.container}>
//                     {this.props.newsfeedData &&
//                         this.props.newsfeedData.length > 0 && (
//                             <View style={innerStyle.headingView}>
//                                 <View style={innerStyle.searchView}>
//                                     <TextInput
//                                         placeholder={LABELS.SEARCH}
//                                         placeholderTextColor={"#5A6978"}
//                                         maxLength={30}
//                                         style={innerStyle.usernameStyle}
//                                         onChangeText={(val) =>
//                                             this.setState({ searchText: val })
//                                         }
//                                         value={searchText}
//                                         keyboardType={"default"}
//                                         onBlur={() => this.onBlur()}
//                                     />
//                                 </View>
//                                 <View style={innerStyle.searchIconView}>
//                                     <Image
//                                         source={require("../../assets/images/search.png")}
//                                         style={innerStyle.searchIcon}
//                                         resizeMode="contain"
//                                     />
//                                 </View>
//                             </View>
//                         )}
//                     <View style={innerStyle.mainView}>

//                         <FlatList
//                             data={listItem}
//                             // data={
//                             //     this.props.newsfeedData &&
//                             //         this.props.newsfeedData.length > 0
//                             //         ? this.props.newsfeedData
//                             //         : listItem
//                             // }
//                             keyExtractor={(item, index) => index.toString()}
//                             refreshControl={
//                                 <RefreshControl
//                                     refreshing={this.state.isFetching}
//                                     onRefresh={() => this.pullDownRefresh()}
//                                 />
//                             }
//                             style={{ marginBottom: GLOBLE.DEVICE_WIDTH / 3 }}
//                             renderItem={this._renderRow}
//                             showsVerticalScrollIndicator={false}
//                             onEndReached={() => {
//                                 this.setState({ page: this.state.page + 1 }, () => {
//                                     // this.state.listItem.length < 30 ? null :
//                                     this.paginationNewsFeed()
//                                 })
//                             }
//                             }
//                             onEndReachedThreshold={"0.05"}
//                         />
//                     </View>
//                 </View>
//                 <SnoozeModal
//                     visible={showModal}
//                     onCloseCall={(val) => this.setState({ showModal: val })}
//                     timeDuration={(val, id, value) =>
//                         this.handleSnooozeSubmit(val, id, value)
//                     }
//                 />

//             </Container>
//         );
//     }
// }
// const innerStyle = StyleSheet.create({
//     modal: {
//         justifyContent: "flex-start",
//         alignItems: "center",
//         borderRadius: 20,
//         backgroundColor: "#E4E4DD",
//         width: GLOBLE.DEVICE_WIDTH - 40,
//         shadowColor: "#000000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowRadius: 5,
//         shadowOpacity: 0.8,
//     },
//     modalView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "flex-end",
//         backgroundColor: "rgba(0,0,0,0.4)",
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 22,
//         backgroundColor: "red",
//     },
//     openButton: {
//         backgroundColor: "#F194FF",
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     textStyle1: {
//         fontSize: 15,
//         marginBottom: 5,
//     },
//     textStyle: {
//         color: "white",
//         fontWeight: "bold",
//         textAlign: "center",
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: "center",
//     },
//     boxMainView: {
//         marginTop: 10,
//         marginBottom: 10,
//     },
//     descriptionView: {
//         marginTop: 5,
//         marginLeft: 5,
//         marginRight: 5,
//     },
//     innerView: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     mainImageView: {
//         alignItems: "center",
//         flexDirection: "row",
//         flex: 1,
//         marginLeft: 5,
//         marginRight: 5,
//     },
//     imageOuterView: {
//         alignItems: "flex-end",
//         flex: 1,
//         marginTop: 2,
//         // backgroundColor:'red',
//         height: 15,
//         justifyContent: "center",
//         marginLeft: 5,
//         marginRight: 5,
//     },
//     dotStyle: {
//         alignItems: "flex-end",
//         marginRight: 0,
//         height: 15,
//         justifyContent: "center",
//         width: 50,
//         marginTop: 5,
//     },
//     bottomLine: {
//         borderBottomColor: "#8492A6",
//         borderBottomWidth: 0.8,
//         width: GLOBLE.DEVICE_WIDTH,
//         marginTop: 10,
//         // marginBottom: 5
//     },
//     dateView: {
//         alignItems: "flex-end",
//         right: 5,
//         justifyContent: "center",
//         flexDirection: "row",
//     },
//     outerView: {
//         flexDirection: "row",
//         marginTop: 5,
//         marginBottom: 5,
//     },
//     headingView: {
//         alignItems: "center",
//         flexDirection: "row",
//         height: 40,
//         marginTop: 10,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: "#8492A6",
//         marginLeft: 5,
//         marginRight: 5,
//     },
//     descriptionTextStyle: {
//         fontFamily: Fonts.RobotoRegular,
//         fontSize: 0.04 * GLOBLE.DEVICE_WIDTH,
//         color: "#171819",
//     },
//     searchIconView: {
//         alignItems: "flex-end",
//         justifyContent: "center",
//         marginRight: 10,
//         flex: 1,
//     },
//     topOptionView: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     innerListView: {
//         marginTop: 0,
//         // marginBottom: 5,
//     },
//     searchIconStyle: {
//         width: 35,
//         height: 35,
//     },
//     searchIcon: {
//         width: 22,
//         height: 22,
//     },
//     optionIconStyle: {
//         width: 18,
//         height: 18,
//     },
//     searchView: {
//         alignItems: "flex-start",
//         justifyContent: "center",
//     },
//     searchText: {
//         fontSize: 16,
//         fontFamily: Fonts.DomineBold,
//         color: "#5A6978",
//     },
//     container: {
//         // flex: 1,
//         // marginLeft: 6,
//         // marginRight: 6,
//         // justifyContent: 'center',
//     },
//     gridViewContainer: {
//         justifyContent: "center",
//         // margin: 3,
//     },
//     listView: {
//         alignItems: "flex-start",
//         margin: 3,
//     },
//     gridViewTextLayout: {
//         marginTop: 2,
//         fontSize: 0.06 * GLOBLE.DEVICE_WIDTH,
//         fontFamily: Fonts.BarlowCondensedMedium,
//         justifyContent: "center",
//         color: "#034CBB",
//         width: GLOBLE.DEVICE_WIDTH - 10,
//         marginLeft: 5,
//     },
//     categoryText: {
//         fontSize: 0.035 * GLOBLE.DEVICE_WIDTH,
//         fontWeight: "600",
//         fontFamily: Fonts.RobotoRegular,
//         justifyContent: "center",
//         color: "#171819",
//         marginLeft: 10,
//         textAlign: "center",
//     },
//     mainView: {
//         // marginTop: 5,
//         // marginBottom: 50,
//     },
//     usernameStyle: {
//         height: 45,
//         fontSize: 15,
//         marginTop: 5,
//         fontFamily: Fonts.RobotoMedium,
//         color: "#5A6978",
//         paddingLeft: 10,
//         width: GLOBLE.DEVICE_WIDTH / 1.3,
//     },
//     iconView: {
//         position: "absolute",
//         top: 7,
//     },
//     iconStyle: {
//         fontSize: 22,
//         color: "#fff",
//     },
//     talkBubble: {
//         backgroundColor: "red",
//         position: "absolute",
//         flex: 1,
//         right: -2,
//         top: 0,
//     },
//     talkBubbleSquare: {
//         width: 175,
//         backgroundColor: "#FFFFFF",
//         borderWidth: 1.5,
//         borderColor: "#034CBB",
//         justifyContent: "center",
//         borderRadius: 8,
//         bottom: 19,
//     },
//     talkBubbleTriangle: {
//         alignItems: "flex-end",
//         backgroundColor: "rgba(0,0,0,0)",
//         height: GLOBLE.DEVICE_HEIGHT,
//         width: GLOBLE.DEVICE_WIDTH,
//     },
//     talkBubbleMessage: {
//         color: "#034CBB",
//         fontWeight: "500",
//         marginLeft: 3,
//         fontSize: 0.042 * GLOBLE.DEVICE_WIDTH,
//         fontFamily: Fonts.RobotoRegular,
//     },
//     filterText: {
//         color: "#034CBB",
//         fontWeight: "700",
//         marginLeft: 3,
//         fontSize: 0.045 * GLOBLE.DEVICE_WIDTH,
//         fontFamily: Fonts.RobotoRegular,
//     },
//     boxTextViewStyle: {
//         marginLeft: 5,
//         marginRight: 5,
//         marginTop: 5,
//         marginBottom: 3,
//         alignItems: "flex-start",
//         backgroundColor: "#fff",
//     },
// });


// const mapStateToProps = ({ newsFeed }) => {
//     const { newsfeedData, feedLoader } = newsFeed;
//     return {
//         newsfeedData,
//         feedLoader,
//     };
// };

// export default connect(mapStateToProps, {
//     newsfeedListAction,
//     newsfeedSearchAction,
//     saveNewsfeedAction,
//     archiveNewsfeedAction,
//     deleteNewsfeedAction,
//     snoozSenderAction,
// })(Dashboard);







import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    BackHandler,
} from "react-native";
import { Container, Icon } from "native-base";
import { connect } from "react-redux";
import moment from "moment";
import { LABELS } from "../../constant/LanguageConstants";
import EventBus from "react-native-event-bus";
import {
    Loader,
    MainHeader,
    NoContentFound,
    SnoozeModal,
} from "../../components";
import {
    newsfeedListAction,
    newsfeedSearchAction,
    saveNewsfeedAction,
    archiveNewsfeedAction,
    deleteNewsfeedAction,
    snoozSenderAction,
} from "../../redux/actions";
import { Fonts } from "../../utils/Fonts";
import { GLOBLE } from "../../constant/utility.constant";
import { Toast } from "../../helper";
import { DATE_FORMAT, STATUS_CODES } from "../../config";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
let typingTimeout = null;
class Dashboard extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            searchText: "",
            showInfo: false,
            isFetching: false,
            showFilter: false,
            showModal: false,
            categoryData: "",
            selectedItem: "",
            senderId: "",
            listItem: [],
            isLoading: false,
            modalVisible: false,
            refreshItem: "",
            refreshValue: "",
            firstTimeLoginVar: false,
            page: 1,
            filter: false,
            categoryName : '',
            token : ''
        };
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        let requestData = { page: 1 } // this.state.page
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        if (this.props && this.props.route && this.props.route.params) { 
            const { item, key } = this.props.route.params;
            this.setState({ isLoading: false ,categoryName : item});
            this.handleFilterItem(item, key);
        } else {
            this.props.newsfeedListAction(requestData, (res) => {
                this.setState({ listItem: res.data.success.data })
                this._isMounted = true;
                if (this._isMounted) {
                    this.setState({ isLoading: false });
                }
                this.setState({ isLoading: false });
                AsyncStorage.getItem("LoginFirstTime")
                    .then((value) => {
                        this.setState({ firstTimeLoginVar: value });
                    })
                    .done();
            });
        }
        EventBus.getInstance().addListener(
            "fromNewsFeedDetailsScreen",
            (this.listener = (data) => {
                let requestData = { page: 1 }
                this.props.newsfeedListAction(requestData, (res) => {
                });
                this._isMounted = true;
                if (this._isMounted) {
                    this.setState({ isLoading: false });
                }
            })
        );
    }
    backAction = () => {
        if (!this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        } else {
            Alert.alert("", "Are you sure you want to close Inboxly?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                },
                { text: "YES", onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        }
    };
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };
    onRefresh() {
        let requestData = { page: 1 }
        this.setState({ isFetching: true }, () => {
            this.props.newsfeedListAction(requestData, (res) => {
                this.setState({
                    isFetching: false,
                    refreshItem: "",
                    refreshValue: "",
                    listItem: res.data.success.data
                });
            });
        });
    }
    handleRefresh() {
        let requestData = { page: 1 }
        this.props.newsfeedListAction(requestData, (res) => {
            this.setState({
                isFetching: false,
                refreshItem: "",
                refreshValue: "",
                listItem: res.data.success.data
            });
        });
    }
    pullDownRefresh = () => {
        const { refreshItem, refreshValue } = this.state;
        if (refreshItem !== "" && refreshValue !== "") {
            if (refreshItem !== "") {
                let obj;
                if (refreshValue === "senderName") {
                    obj = {
                        senderName: refreshItem,
                    };
                } else if (refreshValue === "categoryName") {
                    obj = {
                        categoryName: refreshItem,
                    };
                } else {
                    obj = {
                        filterValue: refreshItem,
                    };
                }
                this.props.newsfeedSearchAction(obj);
            }
        } else {
            this.onRefresh();
        }
    };
    paginationNewsFeed = () => {
        this.setState({isLoading : true})
        if (this.state.filter) {
            let requestData = { page: this.state.page };
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + this.state.token);
            var formdata = new FormData();
            formdata.append("categoryName", this.state.categoryName);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            fetch("https://app.myinboxly.com/api/v1/newsfeed?page=" + requestData.page, requestOptions)
                .then(response => response.json())
                .then(result => { if (result.success.data.length) {
                    let { listItem } = this.state
                    let moreData = [...listItem, ...result.success.data]
                    this.setState({ listItem: moreData, isLoading: false })
                }else{
                    this.setState({ isLoading: false });
                }
                   })
               // this.setState({ listItem: result.success.data })
                .catch(error => console.log('error', error));
        }
        else {
            let requestData = { page: this.state.page };
            this.props.newsfeedListAction(requestData, (res) => {
                if (res.data.success.data.length > 0) {
                    let { listItem } = this.state
                    let moreData = [...listItem, ...res.data.success.data]
                    this.setState({ listItem: moreData, isLoading: false })
                    // this.setState({ listItem: [...this.state.listItem, ...res.data.success.data], isLoading: false })
                    // let updatedList = this.state.itemList.concat(
                    //     res.data.success.data
                    // );
                    // this.setState({
                    //     itemList: updatedList,
                    //     isFetching: false,
                    //     refreshItem: "",
                    //     refreshValue: "",
                    // });
                }
                else {
                    this.setState({ isLoading: false });
                    let { listItem } = this.state
                    this.setState({ listItem: listItem, isLoading: false })
                }
            });
        }
    };
    componentWillUnmount() {
        EventBus.getInstance().removeListener("fromNewsFeedDetailsScreen");
        this.backHandler.remove();
        this._isMounted = false;
        //  AsyncStorage.setItem("LoginFirstTime", JSON.stringify(false));
    }
    componentDidUpdate() {
        AsyncStorage.setItem("LoginFirstTime", JSON.stringify(false));
    }
    handleDot = (index, id) => {
        const { selectedItem, showInfo } = this.state;
        if (selectedItem !== id) {
            this.setState({ selectedItem: id, showInfo: true });
        } else {
            this.setState({ selectedItem: id, showInfo: !showInfo });
        }
    };
    handleAssignCategory = (item) => {
        this.setState({ showInfo: false });
        this.props.navigation.navigate("AssignCategoryList", {
            feedId: item.id,
            senderId: item.sender_id,
            news_category_id: item.news_category_id,
            refreshItem: this.state.refreshItem,
            refreshValue: this.state.refreshValue,
        });
    };
    filterlist = async (item,key) => {
        const result = await AsyncStorage.getItem("loginToken");
        this.setState({ token: result })
        var myHeaders = new Headers();
        myHeaders.append("Authorization",
            "Bearer " + result);
        var formdata = new FormData();
        formdata.append(key, item);
        // formdata.append("senderName", item);
        // formdata.append("categoryName", item);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://app.myinboxly.com/api/v1/newsfeed", requestOptions)
            .then(response => response.json())
            .then(result => {this.setState({ listItem: result.success.data })
       })
            .catch(error => console.log('error', error));
    }
    handleOptions = (item) => {
        return (
            <View>
                <View style={innerStyle.talkBubbleTriangle}>
                    <Image
                        source={require("../../assets/images/tringle.png")}
                        style={[innerStyle.searchIconStyle, { bottom: 8 }]}
                        resizeMode="contain"
                    />
                    <View style={innerStyle.talkBubbleSquare}>
                        <TouchableOpacity
                            style={innerStyle.boxTextViewStyle}
                            onPress={() => this.handleSave(item)}
                        >
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.SAVE_NEWS}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={innerStyle.boxTextViewStyle}
                            onPress={() => this.handleDeleteAlert(item)}
                        >
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.DELETE_NEWS}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={innerStyle.boxTextViewStyle}
                            onPress={() => this.handleArchive(item)}
                        >
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.ARCHIVE_NEWS}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={innerStyle.boxTextViewStyle}
                            onPress={() => this.handleSnooze(item)}
                        >
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.SNOOZE_SENDER}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                innerStyle.boxTextViewStyle,
                                { marginBottom: 10 },
                            ]}
                            onPress={() => { this.handleAssignCategory(item) }}
                        >
                            <Text style={innerStyle.talkBubbleMessage}>
                                {LABELS.ASSIGN_CATEGORY}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    handleFilterOption = (item) => {
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={() => this.setState({ showFilter: false })}
                >
                    <View style={innerStyle.talkBubbleTriangle}>
                        <Image
                            source={require("../../assets/images/tringle.png")}
                            style={[innerStyle.searchIconStyle, { bottom: 8 }]}
                            resizeMode="contain"
                        />
                        <View style={innerStyle.talkBubbleSquare}>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                                onPress={() => this.handleFilterItem("unread")}
                            >
                                <Text style={innerStyle.filterText}>
                                    {LABELS.UNREAD_EMAILS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                                onPress={() =>
                                    this.handleFilterItem("new_to_old")
                                }
                            >
                                <Text style={innerStyle.filterText}>
                                    {LABELS.NEW_TO_OLD_EMAILS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={innerStyle.boxTextViewStyle}
                                onPress={() => this.handleFilterItem("read")}
                            >
                                <Text style={innerStyle.filterText}>
                                    {LABELS.READ_EMAILS}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    innerStyle.boxTextViewStyle,
                                    { marginBottom: 10 },
                                ]}
                                onPress={() =>
                                    this.handleFilterItem("old_to_new")
                                }
                            >
                                <Text style={innerStyle.filterText}>
                                    {LABELS.OLD_TO_NEW_EMAILS}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
    handleFilterItem = (item, key) => {
        this.setState({
            showFilter: false,
            refreshItem: item,
            refreshValue: key,
        });
        if (item !== "") {
            let obj;
            if (key === "senderName") {
                obj = {
                    senderName: item,
                };
            } else if (key === "categoryName") {
                obj = {
                    categoryName: item,
                };
            } else {
                obj = {
                    filterValue: item,
                };
            }
            this.filterlist(item,key)
            this.setState({
                filter: true,
            });
            // this.props.newsfeedSearchAction(obj, (res) => {
            //     this.setState({ listItem: res.data.success.data })
            // });
        }
        else {
            let requestData = { page: 1 }
            this.props.newsfeedListAction(requestData, (res) => {
                this.setState({ refreshItem: "", refreshValue: "", listItem: res.data.success.data });
            });
        }
    };
    handleSnooze = (item) => {
        this.setState({
            showInfo: false,
            showModal: true,
            senderId: item.sender_id,
        });
    };
    handleSnooozeSubmit = (val, id, value) => {
        this.setState({ showModal: val });
        let requestData = {
            sender_id: this.state.senderId,
            duration_id: id,
        };
        this.props.snoozSenderAction(requestData, (res) => {
            let requestData = { page: 1 }
            if (res.status === STATUS_CODES.CREATED) {
                if (
                    res &&
                    res.data &&
                    res.data.success &&
                    res.data.success.data &&
                    res.data.success.data
                ) {
                    Toast.showToast(res.data.success.data.message, "success");
                    this.props.newsfeedListAction(requestData, (res) => {
                     });
                }
            }
        });
    };
    handleSave = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : "",
        };
        this.props.saveNewsfeedAction(requestData, (res) => {
            if (res.status === STATUS_CODES.CREATED) {
                if (
                    res &&
                    res.data &&
                    res.data.success &&
                    res.data.success.data &&
                    res.data.success.data
                ) {
                    Toast.showToast(res.data.success.data.message, "success");
                }
            }
        });
    };
    handleDeleteAlert = (item) => {
        Alert.alert(
            "Alert",
            "Are you sure you want to delete this email?",
            [
                {
                    text: "No",
                    onPress: () => this.setState({ showInfo: false }),
                    style: "cancel",
                },
                { text: "Yes", onPress: () => this.handleDelete(item) },
            ],
            { cancelable: false }
        );
    };
    handleDelete = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : "",
        };
        this.props.deleteNewsfeedAction(requestData, (res) => {
            let requestData = { page: 1 }
            if (
                res &&
                res.data &&
                res.data.success &&
                res.data.success.data &&
                res.data.success.data
            ) {
                Toast.showToast(res.data.success.data.message, "success");
                this.props.newsfeedListAction(requestData, (res) => {
                 });
            }
        });
    };
    handleArchive = (item) => {
        this.setState({ showInfo: false });
        let requestData = {
            newsfeed_id: item.id,
            category_id: item.category_id ? item.category_id : "",
        };
        this.props.archiveNewsfeedAction(requestData, (res) => {
            let requestData = { page: 1 }
            if (res.status === STATUS_CODES.CREATED) {
                if (
                    res &&
                    res.data &&
                    res.data.success &&
                    res.data.success.data &&
                    res.data.success.data
                ) {
                    Toast.showToast(res.data.success.data.message, "success");
                    this.props.newsfeedListAction(requestData, (res) => {
                     });
                }
            }
        });
    };
    searchFilterFunction(text) {
        if (text.length >= 1) {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            typingTimeout = setTimeout(() => {
                console.log("search text",text);
                let obj = {
                    filterValue: text,
                };
                // this.props.newsfeedSearchAction(obj);
                this.props.newsfeedSearchAction(obj, (res) => {
                    this.setState({ isLoading: false });
                    this.setState({ listItem: res.data.success.data })
                });
            }, 1000);
        } else {
            let requestData = { page: 1 }
            this.props.newsfeedListAction(requestData, (res) => {
                this.setState({ isLoading: false });
                this.setState({ listItem: res.data.success.data })
            });
        }
    }
    onBlur() {
        this.setState({ isLoading: true });
        this.searchFilterFunction(this.state.searchText);
    }
    ListEmptyView = () => {
        const { firstTimeLoginVar } = this.state;
        return (
            <View
                style={{
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    alignContent: "center",
                }}
            >
                <NoContentFound
                    customHeight={150}
                    customWidth={150}
                    titleWelcome={
                        firstTimeLoginVar === "true"
                            ? LABELS.WELCOME
                            : "No data found.."
                    }
                    titleWelcome1={
                        firstTimeLoginVar === "true"
                            ? LABELS.WELCOME_MESSAGE
                            : ""
                    }
                />
            </View>
        );
    };
    handleFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    };
    handleNavigation = (item) => {
        this.setState({ showInfo: false, showFilter: false });
        this.props.navigation.navigate("NewsfeedDetails", { itemData: item });
    };
    _renderRow = (rowData) => {
        const { item, index } = rowData;
        const { showInfo, selectedItem, modalVisible } = this.state;
        return (
            <View style={innerStyle.gridViewContainer} key={item.id}>
                <View style={innerStyle.innerListView}>
                    <View style={[innerStyle.imageOuterView, { zIndex: 9999 }]}>
                        <TouchableOpacity
                            style={innerStyle.dotStyle}
                            onPress={() => this.handleDot(index, item.id)}
                        >
                            <Image
                                source={require("../../assets/images/dot.png")}
                                style={[
                                    innerStyle.searchIconStyle,
                                    { bottom: 0 },
                                ]}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            zIndex: 999,
                            position: "absolute",
                            right: 2,
                            top: 15,
                        }}
                    >
                        {showInfo &&
                            selectedItem === item.id &&
                            this.handleOptions(item)}
                    </View>
                    <View style={innerStyle.mainImageView}>
                        <TouchableOpacity
                            onPress={() =>
                                this.handleFilterItem(
                                    item.sender_name,
                                    "senderName"
                                )
                            }
                        >
                            <View
                                style={[innerStyle.innerView, { marginTop: 0 }]}
                            >
                                <Image
                                    source={
                                        item.is_read
                                            ? require("../../assets/images/email-blue-open.png")
                                            : require("../../assets/images/emailblue.png")
                                    }
                                    style={[innerStyle.optionIconStyle]}
                                    resizeMode="contain"
                                />
                                <Text
                                    style={[
                                        innerStyle.categoryText,
                                        { bottom: 2, right: 4 },
                                    ]}
                                >
                                    {item.sender_name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {item.category_name &&
                            item.category_name !== "" &&
                            item.category_name !== null &&
                            item.category_name !== undefined ? (
                            <TouchableOpacity
                                style={[
                                    innerStyle.innerView,
                                    { marginTop: 0, flex: 1 },
                                ]}
                                onPress={() =>
                                    this.handleFilterItem(
                                        item.category_name,
                                        "categoryName"
                                    )
                                }
                            >
                                {/* <Image
                                    source={require("../../assets/images/social.png")}
                                    style={innerStyle.optionIconStyle}
                                    resizeMode="contain"
                                /> */}
                                <Text
                                    style={[
                                        innerStyle.categoryText,
                                        { right: 3 },
                                    ]}
                                >
                                    {item.category_name
                                        ? item.category_name
                                        : categoryData}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <View
                                style={[
                                    innerStyle.innerView,
                                    { marginTop: 0, flex: 1 },
                                ]}
                            ></View>
                        )}
                        <View
                            style={[
                                innerStyle.innerView,
                                { marginTop: 5, marginBottom: 5 },
                            ]}
                        >
                            <Icon
                                name="clock"
                                type="Feather"
                                style={{
                                    fontSize: 16,
                                    color: "#034CBB",
                                    left: 4,
                                }}
                            />
                            <Text style={innerStyle.categoryText}>
                                {moment(item.date_time).format(DATE_FORMAT)}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.handleNavigation(item)}
                    >
                        <View>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: "98%",
                                    height: 230,
                                    marginLeft: 5,
                                    marginRight: 10,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={innerStyle.gridViewTextLayout}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                    <View style={innerStyle.descriptionView}>
                        <Text
                            style={innerStyle.descriptionTextStyle}
                            numberOfLines={2}
                        >
                            {item.preview}
                        </Text>
                    </View>
                    {/* <WebView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={true}
                        source={{ html: item.description }}
                        style={innerStyle.webView}
                        startInLoadingState={true}
                    /> */}
                </View>
                <View style={innerStyle.bottomLine} />
            </View>
        );
    };
    render() {
        const { searchText, showModal, listItem, showFilter } = this.state;
        return (
            <Container>
                <MainHeader
                    leftButtonType={"menu"}
                    leftButton={true}
                    rightButton={true}
                    title={""}
                    onPress={() => this.handleFilter()}
                    onImagePress={() => this.handleRefresh()}
                />
                <Loader isLoading={this.state.isLoading} />
                <View
                    style={{
                        zIndex: 999,
                        position: "absolute",
                        right: 5,
                        top: GLOBLE.DEVICE_HEIGHT > 800 ? 80 : 30,
                    }}
                >
                    {showFilter && this.handleFilterOption()}
                </View>
                <View style={innerStyle.container}>
                    {/* {this.props.newsfeedData &&
                        this.props.newsfeedData.length > 0 && ( */}
                            <View style={innerStyle.headingView}>
                                <View style={innerStyle.searchView}>
                                    <TextInput
                                        placeholder={LABELS.SEARCH}
                                        placeholderTextColor={"#5A6978"}
                                        maxLength={30}
                                        style={innerStyle.usernameStyle}
                                        onChangeText={(val) =>
                                            this.setState({ searchText: val })
                                        }
                                        value={searchText}
                                        keyboardType={"default"}
                                        onBlur={() => this.onBlur()}
                                    />
                                </View>
                                <View style={innerStyle.searchIconView}>
                                    <Image
                                        source={require("../../assets/images/search.png")}
                                        style={innerStyle.searchIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        {/* )} */}
                    <View style={innerStyle.mainView}>
                            <FlatList
                            data={listItem}
                            // data={
                            //     this.props.newsfeedData &&
                            //         this.props.newsfeedData.length > 0
                            //         ? this.props.newsfeedData
                            //         : listItem
                            // }
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isFetching}
                                    onRefresh={() => this.pullDownRefresh()}
                                />
                            }
                            style={{ marginBottom: GLOBLE.DEVICE_WIDTH / 3 }}
                            renderItem={this._renderRow}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => {
                                this.setState({ page: this.state.page + 1 }, () => {
                                    // this.state.listItem.length < 30 ? null :
                                    this.paginationNewsFeed()
                                })
                            }
                            }
                            onEndReachedThreshold={"0.05"}
                        />
                    </View>
                </View>
                <SnoozeModal
                    visible={showModal}
                    onCloseCall={(val) => this.setState({ showModal: val })}
                    timeDuration={(val, id, value) =>
                        this.handleSnooozeSubmit(val, id, value)
                    }
                />
            </Container>
        );
    }
}
const innerStyle = StyleSheet.create({
    modal: {
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#E4E4DD",
        width: GLOBLE.DEVICE_WIDTH - 40,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.8,
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "red",
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle1: {
        fontSize: 15,
        marginBottom: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    boxMainView: {
        marginTop: 10,
        marginBottom: 10,
    },
    descriptionView: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    innerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    mainImageView: {
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    imageOuterView: {
        alignItems: "flex-end",
        flex: 1,
        marginTop: 2,
        // backgroundColor:'red',
        height: 15,
        justifyContent: "center",
        marginLeft: 5,
        marginRight: 5,
    },
    dotStyle: {
        alignItems: "flex-end",
        marginRight: 0,
        height: 15,
        justifyContent: "center",
        width: 50,
        marginTop: 5,
    },
    bottomLine: {
        borderBottomColor: "#8492A6",
        borderBottomWidth: 0.8,
        width: GLOBLE.DEVICE_WIDTH,
        marginTop: 10,
        // marginBottom: 5
    },
    dateView: {
        alignItems: "flex-end",
        right: 5,
        justifyContent: "center",
        flexDirection: "row",
    },
    outerView: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    headingView: {
        alignItems: "center",
        flexDirection: "row",
        height: 40,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#8492A6",
        marginLeft: 5,
        marginRight: 5,
    },
    descriptionTextStyle: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: 0.04 * GLOBLE.DEVICE_WIDTH,
        color: "#171819",
    },
    searchIconView: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 10,
        flex: 1,
    },
    topOptionView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    innerListView: {
        marginTop: 0,
        // marginBottom: 5,
    },
    searchIconStyle: {
        width: 35,
        height: 35,
    },
    searchIcon: {
        width: 22,
        height: 22,
    },
    optionIconStyle: {
        width: 18,
        height: 18,
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
        // flex: 1,
        // marginLeft: 6,
        // marginRight: 6,
        // justifyContent: 'center',
    },
    gridViewContainer: {
        justifyContent: "center",
        // margin: 3,
    },
    listView: {
        alignItems: "flex-start",
        margin: 3,
    },
    gridViewTextLayout: {
        marginTop: 2,
        fontSize: 0.06 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.BarlowCondensedMedium,
        justifyContent: "center",
        color: "#034CBB",
        width: GLOBLE.DEVICE_WIDTH - 10,
        marginLeft: 5,
    },
    categoryText: {
        fontSize: 0.035 * GLOBLE.DEVICE_WIDTH,
        fontWeight: "600",
        fontFamily: Fonts.RobotoRegular,
        justifyContent: "center",
        color: "#171819",
        marginLeft: 10,
        textAlign: "center",
    },
    mainView: {
        // marginTop: 5,
        // marginBottom: 50,
    },
    usernameStyle: {
        height: 45,
        fontSize: 15,
        marginTop: 5,
        fontFamily: Fonts.RobotoMedium,
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
    talkBubble: {
        backgroundColor: "red",
        position: "absolute",
        flex: 1,
        right: -2,
        top: 0,
    },
    talkBubbleSquare: {
        width: 175,
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        borderColor: "#034CBB",
        justifyContent: "center",
        borderRadius: 8,
        bottom: 19,
    },
    talkBubbleTriangle: {
        alignItems: "flex-end",
        backgroundColor: "rgba(0,0,0,0)",
        height: GLOBLE.DEVICE_HEIGHT,
        width: GLOBLE.DEVICE_WIDTH,
    },
    talkBubbleMessage: {
        color: "#034CBB",
        fontWeight: "500",
        marginLeft: 3,
        fontSize: 0.042 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoRegular,
    },
    filterText: {
        color: "#034CBB",
        fontWeight: "700",
        marginLeft: 3,
        fontSize: 0.045 * GLOBLE.DEVICE_WIDTH,
        fontFamily: Fonts.RobotoRegular,
    },
    boxTextViewStyle: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 3,
        alignItems: "flex-start",
        backgroundColor: "#fff",
    },
});
const mapStateToProps = ({ newsFeed }) => {
    const { newsfeedData, feedLoader } = newsFeed;
    return {
        newsfeedData,
        feedLoader,
    };
};
export default connect(mapStateToProps, {
    newsfeedListAction,
    newsfeedSearchAction,
    saveNewsfeedAction,
    archiveNewsfeedAction,
    deleteNewsfeedAction,
    snoozSenderAction,
})(Dashboard);
