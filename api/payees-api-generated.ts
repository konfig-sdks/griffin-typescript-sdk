/* tslint:disable */
/* eslint-disable */
/*
The Griffin API

## Introduction

The Griffin API is based on [REST](https://en.wikipedia.org/wiki/Representational_state_transfer).
It has resource-oriented URLs, accepts [JSON](https://www.json.org/json-en.html)-encoded request bodies, returns [JSON](https://www.json.org/json-en.html)-encoded responses, and uses standard HTTP response verbs and response codes.

Our API deviates from strict RESTful principles if it makes sense to do so, such as when we enforce tighter access controls around certain operations.
For example, when closing a bank account: rather than send a PATCH request to the [bank account](http://docs.griffin.com) resource to update it's status to `\"closed\"`, we provide a dedicated account closure resource.

Anyone can [create an account](https://app.griffin.com/register) with Griffin and try out out API in [sandbox mode](http://docs.griffin.com).

New to Griffin? Check out our [getting started guide](http://docs.griffin.com).

## Navigation

Our API is designed to be navigated programmatically. When you request any resource, you will find the URLs for related resources in the response body.

The API is structured as a tree with your [organization](http://docs.griffin.com) at the top. Everything that you own will be a sub-resource of your organization.

To bootstrap the navigation process, request the [index](http://docs.griffin.com) endpoint: the response will contain your `organization-url`.

For a walkthrough, see our [getting started guide](http://docs.griffin.com).

## Pagination

Our list APIs support pagination (e.g. [list bank accounts](http://docs.griffin.com) and [list payments](http://docs.griffin.com)).
By default, a list API returns up to 25 results. If there are more results available, the response payload will include links to the previous/next pages.

### Change page size

You can request a different number of results (between 1 and 200, inclusive) by using the `page[size]` query parameter:

```
GET /v0/organizations/:id/bank/accounts?page[size]=100
```

### Navigating between pages

List responses will include a `links` object with `prev` and `next` attributes, as shown below.
Perform a GET request to the value of the attribute to fetch the previous/next page of results.

```
{
  \"accounts\": [
    // ...
  ],
  \"links\": {
    \"prev\": \"/v0/organizations/og.IG9yZ2FuaXphdGlvbi1pZA/bank/accounts?page[before]=djE6WxSPxfYUTnCU9XtWzj9gGA\",
    \"next\": \"/v0/organizations/og.IG9yZ2FuaXphdGlvbi1pZA/bank/accounts?page[after]=djE6aw79PXZySUOL16LD8HRJ3A\"
  }
}

```
If there is no previous or next page available, the value of the attribute will be  null.

Any other query parameters included in the initial request will also be included in the response payload's links.
If you want to change parameters (see [filtering and sorting](http://docs.griffin.com)), request the first page and follow the links from there.

## Filtering and sorting

### Sort results

By default, resources will be listed in descending order, usually based on the `created-at` attribute.
You can change the sorting behaviour of a list of results by using the `sort` query parameter.

For example, to list bank accounts in ascending order (oldest first):

```
GET /v0/organizations/:id/bank/accounts?sort=created-at
```

To _explicitly_ sort in descending order (newest first), prefix the sort attribute with `-`:

```
GET /v0/organizations/:id/bank/accounts?sort=-created-at
```

### Filter results

Some list APIs allow you to filter the results.
Filters are expressed as nested data structures encoded into query parameters.
For example, you can list bank accounts that are in either the `opening` or `open` state with:

```
GET /v0/organizations/:id/bank/accounts?filter[account-status][in][]=opening&filter[account-status][in][]=open
```

Similarly, you can list legal persons with a specific `application-status`:

```
GET /v0/organizations/:id/legal-persons?filter[application-status][eq]=accepted
```

### Include resources

Some list APIs allow you to include associated resources in the response, reducing the number of requests needed to fetch related data.
For instance, when listing bank accounts, you can include each bank account's beneficiary legal person by using the `include` query parameter:

```
GET /v0/organizations/:id/bank/accounts?include=beneficiary
```

The response returns the usual list of bank accounts, but it will also have an `included` object with a `legal-persons` attribute:

```
{
  \"accounts\": [
    // ...
  ],
  \"links\": {
    // ...
  }
  \"included\": {
    \"legal-persons\": [
      // ...
    ]
  }
}
```

Check the documentation for each list API to see all options for sorting and filtering

## Versioning

The Griffin API is versioned via a prefix in the URL.
The current version is v0.
An example endpoint is: https://api.griffin.com/v0/index.

We will not break your integration with a particular version for as long as we support that version.
If we release a new version, you will have 12 months to upgrade to it.

The version of the OpenAPI document: 


NOTE: This file is auto generated by Konfig (https://konfigthis.com).
*/

import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction, isBrowser } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { PayeesGetDetailsResponse } from '../models';
// @ts-ignore
import { PayeesListLegalPersonPayeesResponse } from '../models';
// @ts-ignore
import { PayeesRegisterNewPayeeRequest } from '../models';
// @ts-ignore
import { PayeesRegisterNewPayeeResponse } from '../models';
// @ts-ignore
import { PayeesUpdatePayeeRequest } from '../models';
// @ts-ignore
import { PayeesUpdatePayeeResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * PayeesApi - axios parameter creator
 * @export
 */
export const PayeesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Yields payee details
         * @summary Get payee
         * @param {string} payeeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDetails: async (payeeId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'payeeId' is not null or undefined
            assertParamExists('getDetails', 'payeeId', payeeId)
            const localVarPath = `/v0/payees/{payee-id}`
                .replace(`{${"payee-id"}}`, encodeURIComponent(String(payeeId !== undefined ? payeeId : `-payee-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key-auth required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "apiKeyAuth", configuration })

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/payees/{payee-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists payees belonging to the legal person.
         * @summary List legal person payees
         * @param {string} legalPersonId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listLegalPersonPayees: async (legalPersonId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('listLegalPersonPayees', 'legalPersonId', legalPersonId)
            const localVarPath = `/v0/legal-persons/{legal-person-id}/bank/payees`
                .replace(`{${"legal-person-id"}}`, encodeURIComponent(String(legalPersonId !== undefined ? legalPersonId : `-legal-person-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key-auth required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "apiKeyAuth", configuration })
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page[size]'] = pageSize;
            }

            if (pageAfter !== undefined) {
                localVarQueryParameter['page[after]'] = pageAfter;
            }

            if (pageBefore !== undefined) {
                localVarQueryParameter['page[before]'] = pageBefore;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/legal-persons/{legal-person-id}/bank/payees',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Registers a new payee for the customer
         * @summary Create payee
         * @param {string} legalPersonId 
         * @param {PayeesRegisterNewPayeeRequest} payeesRegisterNewPayeeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerNewPayee: async (legalPersonId: string, payeesRegisterNewPayeeRequest: PayeesRegisterNewPayeeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('registerNewPayee', 'legalPersonId', legalPersonId)
            // verify required parameter 'payeesRegisterNewPayeeRequest' is not null or undefined
            assertParamExists('registerNewPayee', 'payeesRegisterNewPayeeRequest', payeesRegisterNewPayeeRequest)
            const localVarPath = `/v0/legal-persons/{legal-person-id}/bank/payees`
                .replace(`{${"legal-person-id"}}`, encodeURIComponent(String(legalPersonId !== undefined ? legalPersonId : `-legal-person-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key-auth required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "apiKeyAuth", configuration })

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: payeesRegisterNewPayeeRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/legal-persons/{legal-person-id}/bank/payees',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(payeesRegisterNewPayeeRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates an existing payee.  A payee can be deactivated by updating the `payee-status` of an active payee to `deactivated`. Any attempt to create or submit a payment to a deactivated payee will fail.  A 422 is served when attempting to deactivate an already-deactivated payee.
         * @summary Update payee
         * @param {string} payeeId 
         * @param {PayeesUpdatePayeeRequest} payeesUpdatePayeeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePayee: async (payeeId: string, payeesUpdatePayeeRequest: PayeesUpdatePayeeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'payeeId' is not null or undefined
            assertParamExists('updatePayee', 'payeeId', payeeId)
            // verify required parameter 'payeesUpdatePayeeRequest' is not null or undefined
            assertParamExists('updatePayee', 'payeesUpdatePayeeRequest', payeesUpdatePayeeRequest)
            const localVarPath = `/v0/payees/{payee-id}`
                .replace(`{${"payee-id"}}`, encodeURIComponent(String(payeeId !== undefined ? payeeId : `-payee-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key-auth required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "apiKeyAuth", configuration })

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: payeesUpdatePayeeRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/payees/{payee-id}',
                httpMethod: 'PATCH'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(payeesUpdatePayeeRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PayeesApi - functional programming interface
 * @export
 */
export const PayeesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PayeesApiAxiosParamCreator(configuration)
    return {
        /**
         * Yields payee details
         * @summary Get payee
         * @param {PayeesApiGetDetailsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDetails(requestParameters: PayeesApiGetDetailsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PayeesGetDetailsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getDetails(requestParameters.payeeId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Lists payees belonging to the legal person.
         * @summary List legal person payees
         * @param {PayeesApiListLegalPersonPayeesRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listLegalPersonPayees(requestParameters: PayeesApiListLegalPersonPayeesRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PayeesListLegalPersonPayeesResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listLegalPersonPayees(requestParameters.legalPersonId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Registers a new payee for the customer
         * @summary Create payee
         * @param {PayeesApiRegisterNewPayeeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async registerNewPayee(requestParameters: PayeesApiRegisterNewPayeeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PayeesRegisterNewPayeeResponse>> {
            const payeesRegisterNewPayeeRequest: PayeesRegisterNewPayeeRequest = {
                account-holder: requestParameters.account-holder,
                account-number: requestParameters.account-number,
                bank-id: requestParameters.bank-id
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.registerNewPayee(requestParameters.legalPersonId, payeesRegisterNewPayeeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates an existing payee.  A payee can be deactivated by updating the `payee-status` of an active payee to `deactivated`. Any attempt to create or submit a payment to a deactivated payee will fail.  A 422 is served when attempting to deactivate an already-deactivated payee.
         * @summary Update payee
         * @param {PayeesApiUpdatePayeeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePayee(requestParameters: PayeesApiUpdatePayeeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PayeesUpdatePayeeResponse>> {
            const payeesUpdatePayeeRequest: PayeesUpdatePayeeRequest = {
                payee-status: requestParameters.payee-status
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePayee(requestParameters.payeeId, payeesUpdatePayeeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PayeesApi - factory interface
 * @export
 */
export const PayeesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PayeesApiFp(configuration)
    return {
        /**
         * Yields payee details
         * @summary Get payee
         * @param {PayeesApiGetDetailsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDetails(requestParameters: PayeesApiGetDetailsRequest, options?: AxiosRequestConfig): AxiosPromise<PayeesGetDetailsResponse> {
            return localVarFp.getDetails(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists payees belonging to the legal person.
         * @summary List legal person payees
         * @param {PayeesApiListLegalPersonPayeesRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listLegalPersonPayees(requestParameters: PayeesApiListLegalPersonPayeesRequest, options?: AxiosRequestConfig): AxiosPromise<PayeesListLegalPersonPayeesResponse> {
            return localVarFp.listLegalPersonPayees(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Registers a new payee for the customer
         * @summary Create payee
         * @param {PayeesApiRegisterNewPayeeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerNewPayee(requestParameters: PayeesApiRegisterNewPayeeRequest, options?: AxiosRequestConfig): AxiosPromise<PayeesRegisterNewPayeeResponse> {
            return localVarFp.registerNewPayee(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates an existing payee.  A payee can be deactivated by updating the `payee-status` of an active payee to `deactivated`. Any attempt to create or submit a payment to a deactivated payee will fail.  A 422 is served when attempting to deactivate an already-deactivated payee.
         * @summary Update payee
         * @param {PayeesApiUpdatePayeeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePayee(requestParameters: PayeesApiUpdatePayeeRequest, options?: AxiosRequestConfig): AxiosPromise<PayeesUpdatePayeeResponse> {
            return localVarFp.updatePayee(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getDetails operation in PayeesApi.
 * @export
 * @interface PayeesApiGetDetailsRequest
 */
export type PayeesApiGetDetailsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PayeesApiGetDetails
    */
    readonly payeeId: string
    
}

/**
 * Request parameters for listLegalPersonPayees operation in PayeesApi.
 * @export
 * @interface PayeesApiListLegalPersonPayeesRequest
 */
export type PayeesApiListLegalPersonPayeesRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PayeesApiListLegalPersonPayees
    */
    readonly legalPersonId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof PayeesApiListLegalPersonPayees
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof PayeesApiListLegalPersonPayees
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PayeesApiListLegalPersonPayees
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PayeesApiListLegalPersonPayees
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for registerNewPayee operation in PayeesApi.
 * @export
 * @interface PayeesApiRegisterNewPayeeRequest
 */
export type PayeesApiRegisterNewPayeeRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PayeesApiRegisterNewPayee
    */
    readonly legalPersonId: string
    
} & PayeesRegisterNewPayeeRequest

/**
 * Request parameters for updatePayee operation in PayeesApi.
 * @export
 * @interface PayeesApiUpdatePayeeRequest
 */
export type PayeesApiUpdatePayeeRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PayeesApiUpdatePayee
    */
    readonly payeeId: string
    
} & PayeesUpdatePayeeRequest

/**
 * PayeesApiGenerated - object-oriented interface
 * @export
 * @class PayeesApiGenerated
 * @extends {BaseAPI}
 */
export class PayeesApiGenerated extends BaseAPI {
    /**
     * Yields payee details
     * @summary Get payee
     * @param {PayeesApiGetDetailsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayeesApiGenerated
     */
    public getDetails(requestParameters: PayeesApiGetDetailsRequest, options?: AxiosRequestConfig) {
        return PayeesApiFp(this.configuration).getDetails(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Lists payees belonging to the legal person.
     * @summary List legal person payees
     * @param {PayeesApiListLegalPersonPayeesRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayeesApiGenerated
     */
    public listLegalPersonPayees(requestParameters: PayeesApiListLegalPersonPayeesRequest, options?: AxiosRequestConfig) {
        return PayeesApiFp(this.configuration).listLegalPersonPayees(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Registers a new payee for the customer
     * @summary Create payee
     * @param {PayeesApiRegisterNewPayeeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayeesApiGenerated
     */
    public registerNewPayee(requestParameters: PayeesApiRegisterNewPayeeRequest, options?: AxiosRequestConfig) {
        return PayeesApiFp(this.configuration).registerNewPayee(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates an existing payee.  A payee can be deactivated by updating the `payee-status` of an active payee to `deactivated`. Any attempt to create or submit a payment to a deactivated payee will fail.  A 422 is served when attempting to deactivate an already-deactivated payee.
     * @summary Update payee
     * @param {PayeesApiUpdatePayeeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayeesApiGenerated
     */
    public updatePayee(requestParameters: PayeesApiUpdatePayeeRequest, options?: AxiosRequestConfig) {
        return PayeesApiFp(this.configuration).updatePayee(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
