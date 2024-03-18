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
import { PooledAccountMembershipListLegalPersonsResponse } from '../models';
// @ts-ignore
import { PooledAccountMembershipManageLegalPersonsRequest } from '../models';
// @ts-ignore
import { PooledAccountMembershipManageLegalPersonsResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * PooledAccountMembershipApi - axios parameter creator
 * @export
 */
export const PooledAccountMembershipApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * List legal persons in a pooled account membership
         * @summary List legal person in a pooled account membership
         * @param {string} bankAccountId 
         * @param {Array<'latest-risk-rating' | 'legal-person' | 'latest-verification'>} [include] For each member returned, include its legal person details, latest verification (if one exists), and/or latest risk rating (if one exists) in the response under the &#x60;included&#x60; attribute.
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listLegalPersons: async (bankAccountId: string, include?: Array<'latest-risk-rating' | 'legal-person' | 'latest-verification'>, pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('listLegalPersons', 'bankAccountId', bankAccountId)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}/membership`
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
            if (include) {
                localVarQueryParameter['include'] = include.join(COLLECTION_FORMATS.csv);
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
                pathTemplate: '/v0/bank/accounts/{bank-account-id}/membership',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Add and update the legal persons in a pooled account membership. Limited to 2000 legal persons per operation.
         * @summary Manage pooled account members
         * @param {string} bankAccountId 
         * @param {PooledAccountMembershipManageLegalPersonsRequest} pooledAccountMembershipManageLegalPersonsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        manageLegalPersons: async (bankAccountId: string, pooledAccountMembershipManageLegalPersonsRequest: PooledAccountMembershipManageLegalPersonsRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('manageLegalPersons', 'bankAccountId', bankAccountId)
            // verify required parameter 'pooledAccountMembershipManageLegalPersonsRequest' is not null or undefined
            assertParamExists('manageLegalPersons', 'pooledAccountMembershipManageLegalPersonsRequest', pooledAccountMembershipManageLegalPersonsRequest)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}/membership-updates`
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

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: pooledAccountMembershipManageLegalPersonsRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/bank/accounts/{bank-account-id}/membership-updates',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(pooledAccountMembershipManageLegalPersonsRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PooledAccountMembershipApi - functional programming interface
 * @export
 */
export const PooledAccountMembershipApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PooledAccountMembershipApiAxiosParamCreator(configuration)
    return {
        /**
         * List legal persons in a pooled account membership
         * @summary List legal person in a pooled account membership
         * @param {PooledAccountMembershipApiListLegalPersonsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listLegalPersons(requestParameters: PooledAccountMembershipApiListLegalPersonsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PooledAccountMembershipListLegalPersonsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listLegalPersons(requestParameters.bankAccountId, requestParameters.include, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Add and update the legal persons in a pooled account membership. Limited to 2000 legal persons per operation.
         * @summary Manage pooled account members
         * @param {PooledAccountMembershipApiManageLegalPersonsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async manageLegalPersons(requestParameters: PooledAccountMembershipApiManageLegalPersonsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PooledAccountMembershipManageLegalPersonsResponse>> {
            const pooledAccountMembershipManageLegalPersonsRequest: PooledAccountMembershipManageLegalPersonsRequest = {
                additions: requestParameters.additions,
                deletions: requestParameters.deletions
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.manageLegalPersons(requestParameters.bankAccountId, pooledAccountMembershipManageLegalPersonsRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PooledAccountMembershipApi - factory interface
 * @export
 */
export const PooledAccountMembershipApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PooledAccountMembershipApiFp(configuration)
    return {
        /**
         * List legal persons in a pooled account membership
         * @summary List legal person in a pooled account membership
         * @param {PooledAccountMembershipApiListLegalPersonsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listLegalPersons(requestParameters: PooledAccountMembershipApiListLegalPersonsRequest, options?: AxiosRequestConfig): AxiosPromise<PooledAccountMembershipListLegalPersonsResponse> {
            return localVarFp.listLegalPersons(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Add and update the legal persons in a pooled account membership. Limited to 2000 legal persons per operation.
         * @summary Manage pooled account members
         * @param {PooledAccountMembershipApiManageLegalPersonsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        manageLegalPersons(requestParameters: PooledAccountMembershipApiManageLegalPersonsRequest, options?: AxiosRequestConfig): AxiosPromise<PooledAccountMembershipManageLegalPersonsResponse> {
            return localVarFp.manageLegalPersons(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for listLegalPersons operation in PooledAccountMembershipApi.
 * @export
 * @interface PooledAccountMembershipApiListLegalPersonsRequest
 */
export type PooledAccountMembershipApiListLegalPersonsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PooledAccountMembershipApiListLegalPersons
    */
    readonly bankAccountId: string
    
    /**
    * For each member returned, include its legal person details, latest verification (if one exists), and/or latest risk rating (if one exists) in the response under the `included` attribute.
    * @type {Array<'latest-risk-rating' | 'legal-person' | 'latest-verification'>}
    * @memberof PooledAccountMembershipApiListLegalPersons
    */
    readonly include?: Array<'latest-risk-rating' | 'legal-person' | 'latest-verification'>
    
    /**
    * 
    * @type {number}
    * @memberof PooledAccountMembershipApiListLegalPersons
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PooledAccountMembershipApiListLegalPersons
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PooledAccountMembershipApiListLegalPersons
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for manageLegalPersons operation in PooledAccountMembershipApi.
 * @export
 * @interface PooledAccountMembershipApiManageLegalPersonsRequest
 */
export type PooledAccountMembershipApiManageLegalPersonsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PooledAccountMembershipApiManageLegalPersons
    */
    readonly bankAccountId: string
    
} & PooledAccountMembershipManageLegalPersonsRequest

/**
 * PooledAccountMembershipApiGenerated - object-oriented interface
 * @export
 * @class PooledAccountMembershipApiGenerated
 * @extends {BaseAPI}
 */
export class PooledAccountMembershipApiGenerated extends BaseAPI {
    /**
     * List legal persons in a pooled account membership
     * @summary List legal person in a pooled account membership
     * @param {PooledAccountMembershipApiListLegalPersonsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PooledAccountMembershipApiGenerated
     */
    public listLegalPersons(requestParameters: PooledAccountMembershipApiListLegalPersonsRequest, options?: AxiosRequestConfig) {
        return PooledAccountMembershipApiFp(this.configuration).listLegalPersons(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Add and update the legal persons in a pooled account membership. Limited to 2000 legal persons per operation.
     * @summary Manage pooled account members
     * @param {PooledAccountMembershipApiManageLegalPersonsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PooledAccountMembershipApiGenerated
     */
    public manageLegalPersons(requestParameters: PooledAccountMembershipApiManageLegalPersonsRequest, options?: AxiosRequestConfig) {
        return PooledAccountMembershipApiFp(this.configuration).manageLegalPersons(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
