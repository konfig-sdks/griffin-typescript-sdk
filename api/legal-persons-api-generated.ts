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
import { Claim } from '../models';
// @ts-ignore
import { LegalPersonsCreateNewLegalPersonRequest } from '../models';
// @ts-ignore
import { LegalPersonsCreateNewLegalPersonResponse } from '../models';
// @ts-ignore
import { LegalPersonsGetLegalPersonResponse } from '../models';
// @ts-ignore
import { LegalPersonsListLegalPersonsResponse } from '../models';
// @ts-ignore
import { LegalPersonsUpdateLegalPersonRequest } from '../models';
// @ts-ignore
import { LegalPersonsUpdateLegalPersonResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * LegalPersonsApi - axios parameter creator
 * @export
 */
export const LegalPersonsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a new Legal Person. A collection of [Claims](http://docs.griffin.com) may be provided.
         * @summary Create legal person
         * @param {string} organizationId 
         * @param {LegalPersonsCreateNewLegalPersonRequest} legalPersonsCreateNewLegalPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewLegalPerson: async (organizationId: string, legalPersonsCreateNewLegalPersonRequest: LegalPersonsCreateNewLegalPersonRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('createNewLegalPerson', 'organizationId', organizationId)
            // verify required parameter 'legalPersonsCreateNewLegalPersonRequest' is not null or undefined
            assertParamExists('createNewLegalPerson', 'legalPersonsCreateNewLegalPersonRequest', legalPersonsCreateNewLegalPersonRequest)
            const localVarPath = `/v0/organizations/{organization-id}/legal-persons`
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
                requestBody: legalPersonsCreateNewLegalPersonRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/organizations/{organization-id}/legal-persons',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(legalPersonsCreateNewLegalPersonRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Yields the legal-person.
         * @summary Get legal person
         * @param {string} legalPersonId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLegalPerson: async (legalPersonId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('getLegalPerson', 'legalPersonId', legalPersonId)
            const localVarPath = `/v0/legal-persons/{legal-person-id}`
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

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/legal-persons/{legal-person-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a paginated list of all legal persons for the given organization.  By default, results are sorted descending by `created-at` (newest first). To sort ascending by `created-at`, provide a `?sort=created-at` query parameter. 
         * @summary List legal persons
         * @param {string} organizationId 
         * @param {'-status-changed-at' | 'status-changed-at' | '-created-at' | 'created-at'} [sort] 
         * @param {Array<'latest-risk-rating' | 'latest-verification'>} [include] For each legal person returned, include its latest verification (if one exists), and/or its latest risk rating (if one exists) in the response under the &#x60;included&#x60; attribute.
         * @param {'referred' | 'errored' | 'declined' | 'submitted' | 'accepted'} [filterApplicationStatusEq] Return only legal persons with the given application-status.
         * @param {Array<'application-status'>} [filterHas] Return only legal persons with the given attributes.
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listLegalPersons: async (organizationId: string, sort?: '-status-changed-at' | 'status-changed-at' | '-created-at' | 'created-at', include?: Array<'latest-risk-rating' | 'latest-verification'>, filterApplicationStatusEq?: 'referred' | 'errored' | 'declined' | 'submitted' | 'accepted', filterHas?: Array<'application-status'>, pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('listLegalPersons', 'organizationId', organizationId)
            const localVarPath = `/v0/organizations/{organization-id}/legal-persons`
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

            if (include) {
                localVarQueryParameter['include'] = include.join(COLLECTION_FORMATS.csv);
            }

            if (filterApplicationStatusEq !== undefined) {
                localVarQueryParameter['filter[application-status][eq]'] = filterApplicationStatusEq;
            }

            if (filterHas) {
                localVarQueryParameter['filter[has][]'] = filterHas.join(COLLECTION_FORMATS.csv);
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
                pathTemplate: '/v0/organizations/{organization-id}/legal-persons',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates the legal-person.
         * @summary Update legal person
         * @param {string} legalPersonId 
         * @param {LegalPersonsUpdateLegalPersonRequest} legalPersonsUpdateLegalPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLegalPerson: async (legalPersonId: string, legalPersonsUpdateLegalPersonRequest: LegalPersonsUpdateLegalPersonRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('updateLegalPerson', 'legalPersonId', legalPersonId)
            // verify required parameter 'legalPersonsUpdateLegalPersonRequest' is not null or undefined
            assertParamExists('updateLegalPerson', 'legalPersonsUpdateLegalPersonRequest', legalPersonsUpdateLegalPersonRequest)
            const localVarPath = `/v0/legal-persons/{legal-person-id}`
                .replace(`{${"legal-person-id"}}`, encodeURIComponent(String(legalPersonId !== undefined ? legalPersonId : `-legal-person-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key-auth required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "apiKeyAuth", configuration })

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: legalPersonsUpdateLegalPersonRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/legal-persons/{legal-person-id}',
                httpMethod: 'PUT'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(legalPersonsUpdateLegalPersonRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LegalPersonsApi - functional programming interface
 * @export
 */
export const LegalPersonsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LegalPersonsApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a new Legal Person. A collection of [Claims](http://docs.griffin.com) may be provided.
         * @summary Create legal person
         * @param {LegalPersonsApiCreateNewLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createNewLegalPerson(requestParameters: LegalPersonsApiCreateNewLegalPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LegalPersonsCreateNewLegalPersonResponse>> {
            const legalPersonsCreateNewLegalPersonRequest: LegalPersonsCreateNewLegalPersonRequest = {
                display-name: requestParameters.display-name,
                legal-person-type: requestParameters.legal-person-type,
                claims: requestParameters.claims
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNewLegalPerson(requestParameters.organizationId, legalPersonsCreateNewLegalPersonRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Yields the legal-person.
         * @summary Get legal person
         * @param {LegalPersonsApiGetLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLegalPerson(requestParameters: LegalPersonsApiGetLegalPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LegalPersonsGetLegalPersonResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLegalPerson(requestParameters.legalPersonId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a paginated list of all legal persons for the given organization.  By default, results are sorted descending by `created-at` (newest first). To sort ascending by `created-at`, provide a `?sort=created-at` query parameter. 
         * @summary List legal persons
         * @param {LegalPersonsApiListLegalPersonsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listLegalPersons(requestParameters: LegalPersonsApiListLegalPersonsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LegalPersonsListLegalPersonsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listLegalPersons(requestParameters.organizationId, requestParameters.sort, requestParameters.include, requestParameters.filterApplicationStatusEq, requestParameters.filterHas, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates the legal-person.
         * @summary Update legal person
         * @param {LegalPersonsApiUpdateLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLegalPerson(requestParameters: LegalPersonsApiUpdateLegalPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LegalPersonsUpdateLegalPersonResponse>> {
            const legalPersonsUpdateLegalPersonRequest: LegalPersonsUpdateLegalPersonRequest = {
                display-name: requestParameters.display-name
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateLegalPerson(requestParameters.legalPersonId, legalPersonsUpdateLegalPersonRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LegalPersonsApi - factory interface
 * @export
 */
export const LegalPersonsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LegalPersonsApiFp(configuration)
    return {
        /**
         * Creates a new Legal Person. A collection of [Claims](http://docs.griffin.com) may be provided.
         * @summary Create legal person
         * @param {LegalPersonsApiCreateNewLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewLegalPerson(requestParameters: LegalPersonsApiCreateNewLegalPersonRequest, options?: AxiosRequestConfig): AxiosPromise<LegalPersonsCreateNewLegalPersonResponse> {
            return localVarFp.createNewLegalPerson(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Yields the legal-person.
         * @summary Get legal person
         * @param {LegalPersonsApiGetLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLegalPerson(requestParameters: LegalPersonsApiGetLegalPersonRequest, options?: AxiosRequestConfig): AxiosPromise<LegalPersonsGetLegalPersonResponse> {
            return localVarFp.getLegalPerson(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a paginated list of all legal persons for the given organization.  By default, results are sorted descending by `created-at` (newest first). To sort ascending by `created-at`, provide a `?sort=created-at` query parameter. 
         * @summary List legal persons
         * @param {LegalPersonsApiListLegalPersonsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listLegalPersons(requestParameters: LegalPersonsApiListLegalPersonsRequest, options?: AxiosRequestConfig): AxiosPromise<LegalPersonsListLegalPersonsResponse> {
            return localVarFp.listLegalPersons(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates the legal-person.
         * @summary Update legal person
         * @param {LegalPersonsApiUpdateLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLegalPerson(requestParameters: LegalPersonsApiUpdateLegalPersonRequest, options?: AxiosRequestConfig): AxiosPromise<LegalPersonsUpdateLegalPersonResponse> {
            return localVarFp.updateLegalPerson(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createNewLegalPerson operation in LegalPersonsApi.
 * @export
 * @interface LegalPersonsApiCreateNewLegalPersonRequest
 */
export type LegalPersonsApiCreateNewLegalPersonRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof LegalPersonsApiCreateNewLegalPerson
    */
    readonly organizationId: string
    
} & LegalPersonsCreateNewLegalPersonRequest

/**
 * Request parameters for getLegalPerson operation in LegalPersonsApi.
 * @export
 * @interface LegalPersonsApiGetLegalPersonRequest
 */
export type LegalPersonsApiGetLegalPersonRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof LegalPersonsApiGetLegalPerson
    */
    readonly legalPersonId: string
    
}

/**
 * Request parameters for listLegalPersons operation in LegalPersonsApi.
 * @export
 * @interface LegalPersonsApiListLegalPersonsRequest
 */
export type LegalPersonsApiListLegalPersonsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly organizationId: string
    
    /**
    * 
    * @type {'-status-changed-at' | 'status-changed-at' | '-created-at' | 'created-at'}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly sort?: '-status-changed-at' | 'status-changed-at' | '-created-at' | 'created-at'
    
    /**
    * For each legal person returned, include its latest verification (if one exists), and/or its latest risk rating (if one exists) in the response under the `included` attribute.
    * @type {Array<'latest-risk-rating' | 'latest-verification'>}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly include?: Array<'latest-risk-rating' | 'latest-verification'>
    
    /**
    * Return only legal persons with the given application-status.
    * @type {'referred' | 'errored' | 'declined' | 'submitted' | 'accepted'}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly filterApplicationStatusEq?: 'referred' | 'errored' | 'declined' | 'submitted' | 'accepted'
    
    /**
    * Return only legal persons with the given attributes.
    * @type {Array<'application-status'>}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly filterHas?: Array<'application-status'>
    
    /**
    * 
    * @type {number}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof LegalPersonsApiListLegalPersons
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for updateLegalPerson operation in LegalPersonsApi.
 * @export
 * @interface LegalPersonsApiUpdateLegalPersonRequest
 */
export type LegalPersonsApiUpdateLegalPersonRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof LegalPersonsApiUpdateLegalPerson
    */
    readonly legalPersonId: string
    
} & LegalPersonsUpdateLegalPersonRequest

/**
 * LegalPersonsApiGenerated - object-oriented interface
 * @export
 * @class LegalPersonsApiGenerated
 * @extends {BaseAPI}
 */
export class LegalPersonsApiGenerated extends BaseAPI {
    /**
     * Creates a new Legal Person. A collection of [Claims](http://docs.griffin.com) may be provided.
     * @summary Create legal person
     * @param {LegalPersonsApiCreateNewLegalPersonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalPersonsApiGenerated
     */
    public createNewLegalPerson(requestParameters: LegalPersonsApiCreateNewLegalPersonRequest, options?: AxiosRequestConfig) {
        return LegalPersonsApiFp(this.configuration).createNewLegalPerson(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Yields the legal-person.
     * @summary Get legal person
     * @param {LegalPersonsApiGetLegalPersonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalPersonsApiGenerated
     */
    public getLegalPerson(requestParameters: LegalPersonsApiGetLegalPersonRequest, options?: AxiosRequestConfig) {
        return LegalPersonsApiFp(this.configuration).getLegalPerson(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a paginated list of all legal persons for the given organization.  By default, results are sorted descending by `created-at` (newest first). To sort ascending by `created-at`, provide a `?sort=created-at` query parameter. 
     * @summary List legal persons
     * @param {LegalPersonsApiListLegalPersonsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalPersonsApiGenerated
     */
    public listLegalPersons(requestParameters: LegalPersonsApiListLegalPersonsRequest, options?: AxiosRequestConfig) {
        return LegalPersonsApiFp(this.configuration).listLegalPersons(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates the legal-person.
     * @summary Update legal person
     * @param {LegalPersonsApiUpdateLegalPersonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalPersonsApiGenerated
     */
    public updateLegalPerson(requestParameters: LegalPersonsApiUpdateLegalPersonRequest, options?: AxiosRequestConfig) {
        return LegalPersonsApiFp(this.configuration).updateLegalPerson(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
