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
import { BankAccountsCloseAccountResponse } from '../models';
// @ts-ignore
import { BankAccountsCreateNewAccountRequest } from '../models';
// @ts-ignore
import { BankAccountsCreateNewAccountResponse } from '../models';
// @ts-ignore
import { BankAccountsGetAccountResponse } from '../models';
// @ts-ignore
import { BankAccountsListResponse } from '../models';
// @ts-ignore
import { BankAccountsUpdateBankAccountRequest } from '../models';
// @ts-ignore
import { BankAccountsUpdateBankAccountResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * BankAccountsApi - axios parameter creator
 * @export
 */
export const BankAccountsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Close a bank account
         * @param {string} bankAccountId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        closeAccount: async (bankAccountId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('closeAccount', 'bankAccountId', bankAccountId)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}/actions/close`
                .replace(`{${"bank-account-id"}}`, encodeURIComponent(String(bankAccountId !== undefined ? bankAccountId : `-bank-account-id-`)));
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

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/bank/accounts/{bank-account-id}/actions/close',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Open a new bank account
         * @summary Open bank account
         * @param {string} organizationId 
         * @param {BankAccountsCreateNewAccountRequest} bankAccountsCreateNewAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewAccount: async (organizationId: string, bankAccountsCreateNewAccountRequest: BankAccountsCreateNewAccountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('createNewAccount', 'organizationId', organizationId)
            // verify required parameter 'bankAccountsCreateNewAccountRequest' is not null or undefined
            assertParamExists('createNewAccount', 'bankAccountsCreateNewAccountRequest', bankAccountsCreateNewAccountRequest)
            const localVarPath = `/v0/organizations/{organization-id}/bank/accounts`
                .replace(`{${"organization-id"}}`, encodeURIComponent(String(organizationId !== undefined ? organizationId : `-organization-id-`)));
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
                requestBody: bankAccountsCreateNewAccountRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/organizations/{organization-id}/bank/accounts',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(bankAccountsCreateNewAccountRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Fetch a bank account
         * @summary Get bank account
         * @param {string} bankAccountId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAccount: async (bankAccountId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('getAccount', 'bankAccountId', bankAccountId)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}`
                .replace(`{${"bank-account-id"}}`, encodeURIComponent(String(bankAccountId !== undefined ? bankAccountId : `-bank-account-id-`)));
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
                pathTemplate: '/v0/bank/accounts/{bank-account-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Yields a list of all bank accounts under the control of this Organization.
         * @summary List bank accounts
         * @param {string} organizationId 
         * @param {string} [filterBeneficiaryEq] Link to the [legal person](http://docs.griffin.com) that represents the [beneficiary](http://docs.griffin.com) of the account.
         * @param {string} [filterOwnerEq] Link to the [legal person](http://docs.griffin.com) that represents the [owner](http://docs.griffin.com) of the account.
         * @param {number} [pageSize] 
         * @param {Array<'beneficiary' | 'owner'>} [include] For each bank account returned, include its owner and/or beneficiary in the response under the &#x60;included.legal-persons&#x60; attribute.
         * @param {Array<'closing' | 'open' | 'closed' | 'opening'>} [filterAccountStatusIn] 
         * @param {'-created-at' | 'display-name' | 'created-at' | '-display-name'} [sort] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {boolean} [filterAccountRestrictedIn] Specifies whether the bank account has restrictions applied by Griffin.
         * @param {boolean} [filterPooledFundsEq] Specifies whether the bank account holds funds belonging to multiple beneficiaries.
         * @param {Array<'savings-account' | 'client-money-account' | 'safeguarding-account' | 'operational-account'>} [filterBankProductTypeIn] 
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        list: async (organizationId: string, filterBeneficiaryEq?: string, filterOwnerEq?: string, pageSize?: number, include?: Array<'beneficiary' | 'owner'>, filterAccountStatusIn?: Array<'closing' | 'open' | 'closed' | 'opening'>, sort?: '-created-at' | 'display-name' | 'created-at' | '-display-name', pageAfter?: string, filterAccountRestrictedIn?: boolean, filterPooledFundsEq?: boolean, filterBankProductTypeIn?: Array<'savings-account' | 'client-money-account' | 'safeguarding-account' | 'operational-account'>, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('list', 'organizationId', organizationId)
            const localVarPath = `/v0/organizations/{organization-id}/bank/accounts`
                .replace(`{${"organization-id"}}`, encodeURIComponent(String(organizationId !== undefined ? organizationId : `-organization-id-`)));
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
            if (filterBeneficiaryEq !== undefined) {
                localVarQueryParameter['filter[beneficiary][eq]'] = filterBeneficiaryEq;
            }

            if (filterOwnerEq !== undefined) {
                localVarQueryParameter['filter[owner][eq]'] = filterOwnerEq;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page[size]'] = pageSize;
            }

            if (include) {
                localVarQueryParameter['include'] = include.join(COLLECTION_FORMATS.csv);
            }

            if (filterAccountStatusIn) {
                localVarQueryParameter['filter[account-status][in][]'] = filterAccountStatusIn.join(COLLECTION_FORMATS.csv);
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }

            if (pageAfter !== undefined) {
                localVarQueryParameter['page[after]'] = pageAfter;
            }

            if (filterAccountRestrictedIn !== undefined) {
                localVarQueryParameter['filter[account-restricted][in][]'] = filterAccountRestrictedIn;
            }

            if (filterPooledFundsEq !== undefined) {
                localVarQueryParameter['filter[pooled-funds][eq]'] = filterPooledFundsEq;
            }

            if (filterBankProductTypeIn) {
                localVarQueryParameter['filter[bank-product-type][in][]'] = filterBankProductTypeIn.join(COLLECTION_FORMATS.csv);
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
                pathTemplate: '/v0/organizations/{organization-id}/bank/accounts',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update a bank account
         * @param {string} bankAccountId 
         * @param {BankAccountsUpdateBankAccountRequest} bankAccountsUpdateBankAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateBankAccount: async (bankAccountId: string, bankAccountsUpdateBankAccountRequest: BankAccountsUpdateBankAccountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('updateBankAccount', 'bankAccountId', bankAccountId)
            // verify required parameter 'bankAccountsUpdateBankAccountRequest' is not null or undefined
            assertParamExists('updateBankAccount', 'bankAccountsUpdateBankAccountRequest', bankAccountsUpdateBankAccountRequest)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}`
                .replace(`{${"bank-account-id"}}`, encodeURIComponent(String(bankAccountId !== undefined ? bankAccountId : `-bank-account-id-`)));
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
                requestBody: bankAccountsUpdateBankAccountRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/bank/accounts/{bank-account-id}',
                httpMethod: 'PATCH'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(bankAccountsUpdateBankAccountRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BankAccountsApi - functional programming interface
 * @export
 */
export const BankAccountsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BankAccountsApiAxiosParamCreator(configuration)
    return {
        /**
         * Close a bank account
         * @param {BankAccountsApiCloseAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async closeAccount(requestParameters: BankAccountsApiCloseAccountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BankAccountsCloseAccountResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.closeAccount(requestParameters.bankAccountId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Open a new bank account
         * @summary Open bank account
         * @param {BankAccountsApiCreateNewAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createNewAccount(requestParameters: BankAccountsApiCreateNewAccountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BankAccountsCreateNewAccountResponse>> {
            const bankAccountsCreateNewAccountRequest: BankAccountsCreateNewAccountRequest = {
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNewAccount(requestParameters.organizationId, bankAccountsCreateNewAccountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Fetch a bank account
         * @summary Get bank account
         * @param {BankAccountsApiGetAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAccount(requestParameters: BankAccountsApiGetAccountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BankAccountsGetAccountResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAccount(requestParameters.bankAccountId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Yields a list of all bank accounts under the control of this Organization.
         * @summary List bank accounts
         * @param {BankAccountsApiListRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async list(requestParameters: BankAccountsApiListRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BankAccountsListResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.list(requestParameters.organizationId, requestParameters.filterBeneficiaryEq, requestParameters.filterOwnerEq, requestParameters.pageSize, requestParameters.include, requestParameters.filterAccountStatusIn, requestParameters.sort, requestParameters.pageAfter, requestParameters.filterAccountRestrictedIn, requestParameters.filterPooledFundsEq, requestParameters.filterBankProductTypeIn, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Update a bank account
         * @param {BankAccountsApiUpdateBankAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateBankAccount(requestParameters: BankAccountsApiUpdateBankAccountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BankAccountsUpdateBankAccountResponse>> {
            const bankAccountsUpdateBankAccountRequest: BankAccountsUpdateBankAccountRequest = {
                display-name: requestParameters.display-name
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateBankAccount(requestParameters.bankAccountId, bankAccountsUpdateBankAccountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * BankAccountsApi - factory interface
 * @export
 */
export const BankAccountsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BankAccountsApiFp(configuration)
    return {
        /**
         * Close a bank account
         * @param {BankAccountsApiCloseAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        closeAccount(requestParameters: BankAccountsApiCloseAccountRequest, options?: AxiosRequestConfig): AxiosPromise<BankAccountsCloseAccountResponse> {
            return localVarFp.closeAccount(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Open a new bank account
         * @summary Open bank account
         * @param {BankAccountsApiCreateNewAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewAccount(requestParameters: BankAccountsApiCreateNewAccountRequest, options?: AxiosRequestConfig): AxiosPromise<BankAccountsCreateNewAccountResponse> {
            return localVarFp.createNewAccount(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Fetch a bank account
         * @summary Get bank account
         * @param {BankAccountsApiGetAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAccount(requestParameters: BankAccountsApiGetAccountRequest, options?: AxiosRequestConfig): AxiosPromise<BankAccountsGetAccountResponse> {
            return localVarFp.getAccount(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Yields a list of all bank accounts under the control of this Organization.
         * @summary List bank accounts
         * @param {BankAccountsApiListRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        list(requestParameters: BankAccountsApiListRequest, options?: AxiosRequestConfig): AxiosPromise<BankAccountsListResponse> {
            return localVarFp.list(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a bank account
         * @param {BankAccountsApiUpdateBankAccountRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateBankAccount(requestParameters: BankAccountsApiUpdateBankAccountRequest, options?: AxiosRequestConfig): AxiosPromise<BankAccountsUpdateBankAccountResponse> {
            return localVarFp.updateBankAccount(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for closeAccount operation in BankAccountsApi.
 * @export
 * @interface BankAccountsApiCloseAccountRequest
 */
export type BankAccountsApiCloseAccountRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof BankAccountsApiCloseAccount
    */
    readonly bankAccountId: string
    
}

/**
 * Request parameters for createNewAccount operation in BankAccountsApi.
 * @export
 * @interface BankAccountsApiCreateNewAccountRequest
 */
export type BankAccountsApiCreateNewAccountRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof BankAccountsApiCreateNewAccount
    */
    readonly organizationId: string
    
} & BankAccountsCreateNewAccountRequest

/**
 * Request parameters for getAccount operation in BankAccountsApi.
 * @export
 * @interface BankAccountsApiGetAccountRequest
 */
export type BankAccountsApiGetAccountRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof BankAccountsApiGetAccount
    */
    readonly bankAccountId: string
    
}

/**
 * Request parameters for list operation in BankAccountsApi.
 * @export
 * @interface BankAccountsApiListRequest
 */
export type BankAccountsApiListRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof BankAccountsApiList
    */
    readonly organizationId: string
    
    /**
    * Link to the [legal person](http://docs.griffin.com) that represents the [beneficiary](http://docs.griffin.com) of the account.
    * @type {string}
    * @memberof BankAccountsApiList
    */
    readonly filterBeneficiaryEq?: string
    
    /**
    * Link to the [legal person](http://docs.griffin.com) that represents the [owner](http://docs.griffin.com) of the account.
    * @type {string}
    * @memberof BankAccountsApiList
    */
    readonly filterOwnerEq?: string
    
    /**
    * 
    * @type {number}
    * @memberof BankAccountsApiList
    */
    readonly pageSize?: number
    
    /**
    * For each bank account returned, include its owner and/or beneficiary in the response under the `included.legal-persons` attribute.
    * @type {Array<'beneficiary' | 'owner'>}
    * @memberof BankAccountsApiList
    */
    readonly include?: Array<'beneficiary' | 'owner'>
    
    /**
    * 
    * @type {Array<'closing' | 'open' | 'closed' | 'opening'>}
    * @memberof BankAccountsApiList
    */
    readonly filterAccountStatusIn?: Array<'closing' | 'open' | 'closed' | 'opening'>
    
    /**
    * 
    * @type {'-created-at' | 'display-name' | 'created-at' | '-display-name'}
    * @memberof BankAccountsApiList
    */
    readonly sort?: '-created-at' | 'display-name' | 'created-at' | '-display-name'
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof BankAccountsApiList
    */
    readonly pageAfter?: string
    
    /**
    * Specifies whether the bank account has restrictions applied by Griffin.
    * @type {boolean}
    * @memberof BankAccountsApiList
    */
    readonly filterAccountRestrictedIn?: boolean
    
    /**
    * Specifies whether the bank account holds funds belonging to multiple beneficiaries.
    * @type {boolean}
    * @memberof BankAccountsApiList
    */
    readonly filterPooledFundsEq?: boolean
    
    /**
    * 
    * @type {Array<'savings-account' | 'client-money-account' | 'safeguarding-account' | 'operational-account'>}
    * @memberof BankAccountsApiList
    */
    readonly filterBankProductTypeIn?: Array<'savings-account' | 'client-money-account' | 'safeguarding-account' | 'operational-account'>
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof BankAccountsApiList
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for updateBankAccount operation in BankAccountsApi.
 * @export
 * @interface BankAccountsApiUpdateBankAccountRequest
 */
export type BankAccountsApiUpdateBankAccountRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof BankAccountsApiUpdateBankAccount
    */
    readonly bankAccountId: string
    
} & BankAccountsUpdateBankAccountRequest

/**
 * BankAccountsApiGenerated - object-oriented interface
 * @export
 * @class BankAccountsApiGenerated
 * @extends {BaseAPI}
 */
export class BankAccountsApiGenerated extends BaseAPI {
    /**
     * Close a bank account
     * @param {BankAccountsApiCloseAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankAccountsApiGenerated
     */
    public closeAccount(requestParameters: BankAccountsApiCloseAccountRequest, options?: AxiosRequestConfig) {
        return BankAccountsApiFp(this.configuration).closeAccount(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Open a new bank account
     * @summary Open bank account
     * @param {BankAccountsApiCreateNewAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankAccountsApiGenerated
     */
    public createNewAccount(requestParameters: BankAccountsApiCreateNewAccountRequest, options?: AxiosRequestConfig) {
        return BankAccountsApiFp(this.configuration).createNewAccount(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Fetch a bank account
     * @summary Get bank account
     * @param {BankAccountsApiGetAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankAccountsApiGenerated
     */
    public getAccount(requestParameters: BankAccountsApiGetAccountRequest, options?: AxiosRequestConfig) {
        return BankAccountsApiFp(this.configuration).getAccount(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Yields a list of all bank accounts under the control of this Organization.
     * @summary List bank accounts
     * @param {BankAccountsApiListRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankAccountsApiGenerated
     */
    public list(requestParameters: BankAccountsApiListRequest, options?: AxiosRequestConfig) {
        return BankAccountsApiFp(this.configuration).list(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update a bank account
     * @param {BankAccountsApiUpdateBankAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankAccountsApiGenerated
     */
    public updateBankAccount(requestParameters: BankAccountsApiUpdateBankAccountRequest, options?: AxiosRequestConfig) {
        return BankAccountsApiFp(this.configuration).updateBankAccount(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
