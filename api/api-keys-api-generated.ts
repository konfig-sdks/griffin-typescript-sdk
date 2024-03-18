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
import { ApiKeysCreateKeyRequest } from '../models';
// @ts-ignore
import { ApiKeysCreateKeyResponse } from '../models';
// @ts-ignore
import { ApiKeysGetKeyDetailsResponse } from '../models';
// @ts-ignore
import { ApiKeysListActiveKeys200Response } from '../models';
// @ts-ignore
import { ApiKeysListActiveKeysResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * ApiKeysApi - axios parameter creator
 * @export
 */
export const ApiKeysApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new API key. This is the only time `api-key-secret` is shown.
         * @summary Create API Key
         * @param {string} organizationId 
         * @param {ApiKeysCreateKeyRequest} apiKeysCreateKeyRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createKey: async (organizationId: string, apiKeysCreateKeyRequest: ApiKeysCreateKeyRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('createKey', 'organizationId', organizationId)
            // verify required parameter 'apiKeysCreateKeyRequest' is not null or undefined
            assertParamExists('createKey', 'apiKeysCreateKeyRequest', apiKeysCreateKeyRequest)
            const localVarPath = `/v0/organizations/{organization-id}/api-keys`
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
                requestBody: apiKeysCreateKeyRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/organizations/{organization-id}/api-keys',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(apiKeysCreateKeyRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns the API key without `api-key-secret`.
         * @summary Get API key
         * @param {string} apiKeyId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKeyDetails: async (apiKeyId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiKeyId' is not null or undefined
            assertParamExists('getKeyDetails', 'apiKeyId', apiKeyId)
            const localVarPath = `/v0/api-keys/{api-key-id}`
                .replace(`{${"api-key-id"}}`, encodeURIComponent(String(apiKeyId !== undefined ? apiKeyId : `-api-key-id-`)));
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
                pathTemplate: '/v0/api-keys/{api-key-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List all active API keys in your organization.
         * @summary List API keys
         * @param {string} organizationId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listActiveKeys: async (organizationId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('listActiveKeys', 'organizationId', organizationId)
            const localVarPath = `/v0/organizations/{organization-id}/api-keys`
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
                pathTemplate: '/v0/organizations/{organization-id}/api-keys',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List all your active API keys.
         * @summary List API keys
         * @param {string} userId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listActiveKeys_1: async (userId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('listActiveKeys_1', 'userId', userId)
            const localVarPath = `/v0/users/{user-id}/api-keys`
                .replace(`{${"user-id"}}`, encodeURIComponent(String(userId !== undefined ? userId : `-user-id-`)));
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
                pathTemplate: '/v0/users/{user-id}/api-keys',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes the API Key. This operation cannot be undone.
         * @summary Delete API key
         * @param {string} apiKeyId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeApiKey: async (apiKeyId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiKeyId' is not null or undefined
            assertParamExists('removeApiKey', 'apiKeyId', apiKeyId)
            const localVarPath = `/v0/api-keys/{api-key-id}`
                .replace(`{${"api-key-id"}}`, encodeURIComponent(String(apiKeyId !== undefined ? apiKeyId : `-api-key-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
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
                pathTemplate: '/v0/api-keys/{api-key-id}',
                httpMethod: 'DELETE'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ApiKeysApi - functional programming interface
 * @export
 */
export const ApiKeysApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ApiKeysApiAxiosParamCreator(configuration)
    return {
        /**
         * Create a new API key. This is the only time `api-key-secret` is shown.
         * @summary Create API Key
         * @param {ApiKeysApiCreateKeyRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createKey(requestParameters: ApiKeysApiCreateKeyRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiKeysCreateKeyResponse>> {
            const apiKeysCreateKeyRequest: ApiKeysCreateKeyRequest = {
                api-key-name: requestParameters.api-key-name
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createKey(requestParameters.organizationId, apiKeysCreateKeyRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns the API key without `api-key-secret`.
         * @summary Get API key
         * @param {ApiKeysApiGetKeyDetailsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getKeyDetails(requestParameters: ApiKeysApiGetKeyDetailsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiKeysGetKeyDetailsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getKeyDetails(requestParameters.apiKeyId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List all active API keys in your organization.
         * @summary List API keys
         * @param {ApiKeysApiListActiveKeysRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listActiveKeys(requestParameters: ApiKeysApiListActiveKeysRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiKeysListActiveKeysResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listActiveKeys(requestParameters.organizationId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List all your active API keys.
         * @summary List API keys
         * @param {ApiKeysApiListActiveKeys0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listActiveKeys_1(requestParameters: ApiKeysApiListActiveKeys0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiKeysListActiveKeys200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listActiveKeys_1(requestParameters.userId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Deletes the API Key. This operation cannot be undone.
         * @summary Delete API key
         * @param {ApiKeysApiRemoveApiKeyRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeApiKey(requestParameters: ApiKeysApiRemoveApiKeyRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeApiKey(requestParameters.apiKeyId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ApiKeysApi - factory interface
 * @export
 */
export const ApiKeysApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ApiKeysApiFp(configuration)
    return {
        /**
         * Create a new API key. This is the only time `api-key-secret` is shown.
         * @summary Create API Key
         * @param {ApiKeysApiCreateKeyRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createKey(requestParameters: ApiKeysApiCreateKeyRequest, options?: AxiosRequestConfig): AxiosPromise<ApiKeysCreateKeyResponse> {
            return localVarFp.createKey(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns the API key without `api-key-secret`.
         * @summary Get API key
         * @param {ApiKeysApiGetKeyDetailsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKeyDetails(requestParameters: ApiKeysApiGetKeyDetailsRequest, options?: AxiosRequestConfig): AxiosPromise<ApiKeysGetKeyDetailsResponse> {
            return localVarFp.getKeyDetails(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * List all active API keys in your organization.
         * @summary List API keys
         * @param {ApiKeysApiListActiveKeysRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listActiveKeys(requestParameters: ApiKeysApiListActiveKeysRequest, options?: AxiosRequestConfig): AxiosPromise<ApiKeysListActiveKeysResponse> {
            return localVarFp.listActiveKeys(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * List all your active API keys.
         * @summary List API keys
         * @param {ApiKeysApiListActiveKeys0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listActiveKeys_1(requestParameters: ApiKeysApiListActiveKeys0Request, options?: AxiosRequestConfig): AxiosPromise<ApiKeysListActiveKeys200Response> {
            return localVarFp.listActiveKeys_1(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes the API Key. This operation cannot be undone.
         * @summary Delete API key
         * @param {ApiKeysApiRemoveApiKeyRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeApiKey(requestParameters: ApiKeysApiRemoveApiKeyRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.removeApiKey(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createKey operation in ApiKeysApi.
 * @export
 * @interface ApiKeysApiCreateKeyRequest
 */
export type ApiKeysApiCreateKeyRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof ApiKeysApiCreateKey
    */
    readonly organizationId: string
    
} & ApiKeysCreateKeyRequest

/**
 * Request parameters for getKeyDetails operation in ApiKeysApi.
 * @export
 * @interface ApiKeysApiGetKeyDetailsRequest
 */
export type ApiKeysApiGetKeyDetailsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof ApiKeysApiGetKeyDetails
    */
    readonly apiKeyId: string
    
}

/**
 * Request parameters for listActiveKeys operation in ApiKeysApi.
 * @export
 * @interface ApiKeysApiListActiveKeysRequest
 */
export type ApiKeysApiListActiveKeysRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof ApiKeysApiListActiveKeys
    */
    readonly organizationId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof ApiKeysApiListActiveKeys
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof ApiKeysApiListActiveKeys
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof ApiKeysApiListActiveKeys
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof ApiKeysApiListActiveKeys
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for listActiveKeys_1 operation in ApiKeysApi.
 * @export
 * @interface ApiKeysApiListActiveKeys0Request
 */
export type ApiKeysApiListActiveKeys0Request = {
    
    /**
    * 
    * @type {string}
    * @memberof ApiKeysApiListActiveKeys0
    */
    readonly userId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof ApiKeysApiListActiveKeys0
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof ApiKeysApiListActiveKeys0
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof ApiKeysApiListActiveKeys0
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof ApiKeysApiListActiveKeys0
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for removeApiKey operation in ApiKeysApi.
 * @export
 * @interface ApiKeysApiRemoveApiKeyRequest
 */
export type ApiKeysApiRemoveApiKeyRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof ApiKeysApiRemoveApiKey
    */
    readonly apiKeyId: string
    
}

/**
 * ApiKeysApiGenerated - object-oriented interface
 * @export
 * @class ApiKeysApiGenerated
 * @extends {BaseAPI}
 */
export class ApiKeysApiGenerated extends BaseAPI {
    /**
     * Create a new API key. This is the only time `api-key-secret` is shown.
     * @summary Create API Key
     * @param {ApiKeysApiCreateKeyRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiKeysApiGenerated
     */
    public createKey(requestParameters: ApiKeysApiCreateKeyRequest, options?: AxiosRequestConfig) {
        return ApiKeysApiFp(this.configuration).createKey(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns the API key without `api-key-secret`.
     * @summary Get API key
     * @param {ApiKeysApiGetKeyDetailsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiKeysApiGenerated
     */
    public getKeyDetails(requestParameters: ApiKeysApiGetKeyDetailsRequest, options?: AxiosRequestConfig) {
        return ApiKeysApiFp(this.configuration).getKeyDetails(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all active API keys in your organization.
     * @summary List API keys
     * @param {ApiKeysApiListActiveKeysRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiKeysApiGenerated
     */
    public listActiveKeys(requestParameters: ApiKeysApiListActiveKeysRequest, options?: AxiosRequestConfig) {
        return ApiKeysApiFp(this.configuration).listActiveKeys(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all your active API keys.
     * @summary List API keys
     * @param {ApiKeysApiListActiveKeys0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiKeysApiGenerated
     */
    public listActiveKeys_1(requestParameters: ApiKeysApiListActiveKeys0Request, options?: AxiosRequestConfig) {
        return ApiKeysApiFp(this.configuration).listActiveKeys_1(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deletes the API Key. This operation cannot be undone.
     * @summary Delete API key
     * @param {ApiKeysApiRemoveApiKeyRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApiKeysApiGenerated
     */
    public removeApiKey(requestParameters: ApiKeysApiRemoveApiKeyRequest, options?: AxiosRequestConfig) {
        return ApiKeysApiFp(this.configuration).removeApiKey(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
