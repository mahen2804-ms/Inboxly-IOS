import { combineReducers } from 'redux';
import settingReducer from '../../account-settings/reducer';
import archiveEmailReducer from '../../archived-news/reducer';
import authReducer from '../../authentication/reducer';
import categoryReducer from '../../categories/reducer';
import newsfeedReducer from '../../dashboard/reducer';
import saveNewsReducer from '../../saved-news/reducer';
import senderReducer from '../../news-senders/reducer';

const reducers = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    newsFeed: newsfeedReducer,
    saveNews: saveNewsReducer,
    archiveEmail: archiveEmailReducer,
    accountSetting: settingReducer,
    manageSender: senderReducer, 
});

export default reducers;