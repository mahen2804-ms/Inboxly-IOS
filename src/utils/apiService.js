import axios from 'axios';

class ApiService {
    fetchApi = (url, timeout) => {
        console.log('Fetch API-1',url);
        return new Promise((resolve, reject) => {
            console.log('Fetch API-2',timeout);
            axios.get(url, {
            }).then(response => {
                console.log('Fetch API-3',timeout);
                return resolve(response);
            }).catch(error => {
                console.log('Fetch API-4');
                return reject(error);
            });
        });
    };

    postApi = (url, requestData) => {
        return new Promise((resolve, reject) => {
            axios
                .post(url, requestData, {
                    // headers: {
                    //     'Content-Type': 'application/json',
                    // },
                })
                .then((response) => {
                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    };

   postApiWithToken = (url,requestData) => {
        return new Promise((resolve, reject) => {
            axios
                .post(url,requestData, {
                      headers: {
                        'Bearer Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MWRmNTRkNy0yZDZiLTQxZTgtYjdiNi00YmQ3MzNiOTBlMmUiLCJqdGkiOiIxNzI5ZDY5YjAxZTVkMzZjMWQ0M2UxN2U2ZmZmNWY4N2Q2NzQ0YjVhYTA0YTdiMWFhYjYzYzgyNmMzMWJjMTBmMTM1Zjg2MDFjYzM2MDhkMCIsImlhdCI6MTYzNjk3MTM5OC4xODE0OSwibmJmIjoxNjM2OTcxMzk4LjE4MTQ5NCwiZXhwIjoxNjY4NTA3Mzk4LjE3NzI0OCwic3ViIjoiNCIsInNjb3BlcyI6W119.eKnOEORaIZGYKDaJm5ICaFaQhEuDKbwBe2aLkENIPUmz4lsq3ZBYHj-Pn12kDAZg8NfWo5Th-0YRw8nfa2Ic4yYvI8xMMmpMuSz6L6Ul74TTvDf8xPV-LVRHkArOx-MjLsvIrJ3A5NUksIHm1Z6GRbZCsuf6vkEfXV5qNXYgSBukPadX_2xx37kpWpEZJe077xolldyx4pNBSsjIdbCn15WIfLrewV5By5C4dm3H_FeqFqzGYLDUV4uoDXFjJdvu_XDvfybgzuMKZv_NXpwb0RhLbUzPnw-5c7TUhZ4ZAllI-wqbOrSj91GTziWpVzVF2BhJPbC49rLcE-gQjPo26Cr6OgW6GMCyZWCP73glUQQzylxZKr7n5_G5ZxGLFGGd8Gk_YlRQP__JAUjuqa2TflukYREre_gUtODLZHG2eVf2wWdHrk5Q2rymnWj4bieup7umvnbgNul5-mblhqqgL0PmWG4iOEsVvNO8bO9UpROohhtNDwnvllvSaPYO_mQG9DtqFFC0fwfcFDk24ZhtrE01fN2pvM0v38ZDzd6sYzv4FSlmb49rryGAeilE-MYenG6q9Uzw5FAUVJoxnvWZUkW4dB-iUstufIB4eqAI3FU3oPnV8L700bpz1JvFlUZdK5R1Xw_7aTKUzXCkC-KJZs016aO4YPkRzqr9NewwU_4',
                    },
                })
                .then((response) => {
                    return resolve(response);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    };
     fetchApiWithToken = (url, timeout) => {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                timeout: timeout,
                   headers: {
                        'Bearer Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MWRmNTRkNy0yZDZiLTQxZTgtYjdiNi00YmQ3MzNiOTBlMmUiLCJqdGkiOiIxNzI5ZDY5YjAxZTVkMzZjMWQ0M2UxN2U2ZmZmNWY4N2Q2NzQ0YjVhYTA0YTdiMWFhYjYzYzgyNmMzMWJjMTBmMTM1Zjg2MDFjYzM2MDhkMCIsImlhdCI6MTYzNjk3MTM5OC4xODE0OSwibmJmIjoxNjM2OTcxMzk4LjE4MTQ5NCwiZXhwIjoxNjY4NTA3Mzk4LjE3NzI0OCwic3ViIjoiNCIsInNjb3BlcyI6W119.eKnOEORaIZGYKDaJm5ICaFaQhEuDKbwBe2aLkENIPUmz4lsq3ZBYHj-Pn12kDAZg8NfWo5Th-0YRw8nfa2Ic4yYvI8xMMmpMuSz6L6Ul74TTvDf8xPV-LVRHkArOx-MjLsvIrJ3A5NUksIHm1Z6GRbZCsuf6vkEfXV5qNXYgSBukPadX_2xx37kpWpEZJe077xolldyx4pNBSsjIdbCn15WIfLrewV5By5C4dm3H_FeqFqzGYLDUV4uoDXFjJdvu_XDvfybgzuMKZv_NXpwb0RhLbUzPnw-5c7TUhZ4ZAllI-wqbOrSj91GTziWpVzVF2BhJPbC49rLcE-gQjPo26Cr6OgW6GMCyZWCP73glUQQzylxZKr7n5_G5ZxGLFGGd8Gk_YlRQP__JAUjuqa2TflukYREre_gUtODLZHG2eVf2wWdHrk5Q2rymnWj4bieup7umvnbgNul5-mblhqqgL0PmWG4iOEsVvNO8bO9UpROohhtNDwnvllvSaPYO_mQG9DtqFFC0fwfcFDk24ZhtrE01fN2pvM0v38ZDzd6sYzv4FSlmb49rryGAeilE-MYenG6q9Uzw5FAUVJoxnvWZUkW4dB-iUstufIB4eqAI3FU3oPnV8L700bpz1JvFlUZdK5R1Xw_7aTKUzXCkC-KJZs016aO4YPkRzqr9NewwU_4',
                    },
            }).then(response => {
                return resolve(response);
            }).catch(error => {
                return reject(error);
            });
        });
    };

}

export default new ApiService();