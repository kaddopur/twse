import '@babel/polyfill';
import axios from 'axios';

// // http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_t00.tw|otc_o00.tw|tse_FRMSA.tw&json=1&delay=0&_=1518367550137
// axios({
//     method: 'get',
//     url: 'http://mis.twse.com.tw/stock/'
// }).then(response => {
//     const setCookie = response.headers['set-cookie'];
//     const cookie = setCookie[0].split(';')[0];

//     console.log(response.headers);
//     console.log(cookie);

//     axios({
//         method: 'get',
//         url:
//             'http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_0061.tw&json=1&delay=0&_=' +
//             new Date().getTime(),
//         withCredentials: true,
//         headers: {
//             Accept: 'application/json, text/javascript, */*; q=0.01',
//             'Accept-Encoding': 'gzip, deflate',
//             'User-Agent':
//                 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36',
//             Cookie: cookie
//         },
//         responseType: 'text'
//     }).then(response => {
//         console.log(response.data);
//     });
// });

const getStockCookie = async () => {
    try {
        const { headers = {} } = await axios({
            method: 'get',
            url: 'http://mis.twse.com.tw/stock/'
        });
        const REGEX_COOKIE = /(JSESSIONID=[^;]*)/;
        const [cookie] = (headers['set-cookie'] || [])
            .find(header => REGEX_COOKIE.test(header))
            .match(REGEX_COOKIE);
        return cookie;
    } catch (e) {
        return null;
    }
};

export default () => {
    return 'async';
};
