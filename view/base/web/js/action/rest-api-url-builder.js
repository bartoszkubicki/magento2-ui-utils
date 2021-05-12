/**
 * File: rest-api-url-builder.js
 *
 * @author Bartosz Kubicki b.w.kubicki@gmail.com>
 * Github: https://github.com/bartoszkubicki
 */

'use strict';

define([], function () {
    return {
        method: 'rest',
        version: 'V1',
        serviceUrl: ':method/:storeCode/:version',

        /**
         * @param {String} url
         * @param {String} storeCode
         * @param {Object} params
         * @return {String}
         */
        createUrl: function (url, storeCode, params) {
            let completeUrl = this.serviceUrl + url;
            return this.bindParams(completeUrl, storeCode, params);
        },

        /**
         * @param {String} url
         * @param {String} storeCode
         * @param {Object} params
         * @return {String}
         */
        bindParams: function (url, storeCode, params) {
            let urlParts;

            params.method = String(this.method);
            params.storeCode = String(storeCode);
            params.version = String(this.version);

            urlParts = url.split('/');
            urlParts = urlParts.filter(Boolean);

            urlParts.forEach(function (part, key) {
                part = part.replace(':', '');

                if (params[part] !== undefined) { //eslint-disable-line eqeqeq
                    urlParts[key] = params[part];
                }
            });

            return urlParts.join('/');
        }
    };
});
