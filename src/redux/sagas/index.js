import { all } from 'redux-saga/effects';

import authSaga from '../../authentication/authSaga';
import categorySaga from '../../categories/categorySaga';
import newsfeedSaga from '../../dashboard/newsfeedSaga';
import saveNewsSaga from '../../saved-news/saveNewsSaga';
import archiveEmailSaga from '../../archived-news/archiveEmailSaga';
import settiingSaga from '../../account-settings/settiingSaga';
import senderSaga from '../../news-senders/senderSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        categorySaga(),
        newsfeedSaga(),
        saveNewsSaga(),
        archiveEmailSaga(),
        settiingSaga(),
        senderSaga(),
    ]);
}
