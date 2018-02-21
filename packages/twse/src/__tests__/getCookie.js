import getCookie from '../getCookie';
import moxios from 'moxios';

describe('[TWSE]', () => {
    describe('#getCookie', () => {
        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        test('should get correct cookie from headers', done => {
            const MOCK_COOKIE = 'JSESSIONID=B6C49FCAA515D51BC159CB96965C9886';

            moxios.stubRequest('http://mis.twse.com.tw/stock', {
                status: 200,
                headers: {
                    'Set-Cookie': [`${MOCK_COOKIE}; Path=/stock`]
                }
            });

            getCookie().then(cookie => {
                expect(cookie).toBe(MOCK_COOKIE);
                done();
            });
        });

        test('should return null for irrelevant cookies', done => {
            moxios.stubRequest('http://mis.twse.com.tw/stock', {
                status: 200,
                headers: {
                    'Set-Cookie': ['IRRELEVANT_COOKIE; Path=/stock']
                }
            });

            getCookie().then(cookie => {
                expect(cookie).toBeNull();
                done();
            });
        });

        test('should return null for empty headers', done => {
            moxios.stubRequest('http://mis.twse.com.tw/stock', {
                status: 200,
                headers: {}
            });

            getCookie().then(cookie => {
                expect(cookie).toBeNull();
                done();
            });
        });

        test('should handle status other than 200', done => {
            moxios.stubRequest('http://mis.twse.com.tw/stock', {
                status: 404
            });

            getCookie().then(cookie => {
                expect(cookie).toBeNull();
                done();
            });
        });
    });
});
