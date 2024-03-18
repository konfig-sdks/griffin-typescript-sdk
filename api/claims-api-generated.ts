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
import { AnnualTurnover } from '../models';
// @ts-ignore
import { ClaimsCreateNewClaimRequest } from '../models';
// @ts-ignore
import { ClaimsCreateNewClaimResponse } from '../models';
// @ts-ignore
import { ClaimsGetAllClaimsResponse } from '../models';
// @ts-ignore
import { Income } from '../models';
// @ts-ignore
import { InitialDeposit } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * ClaimsApi - axios parameter creator
 * @export
 */
export const ClaimsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a new claim about a Legal Person.
         * @summary Create claim
         * @param {string} legalPersonId 
         * @param {ClaimsCreateNewClaimRequest} claimsCreateNewClaimRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewClaim: async (legalPersonId: string, claimsCreateNewClaimRequest: ClaimsCreateNewClaimRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('createNewClaim', 'legalPersonId', legalPersonId)
            // verify required parameter 'claimsCreateNewClaimRequest' is not null or undefined
            assertParamExists('createNewClaim', 'claimsCreateNewClaimRequest', claimsCreateNewClaimRequest)
            const localVarPath = `/v0/legal-persons/{legal-person-id}/claims`
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
                requestBody: claimsCreateNewClaimRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/legal-persons/{legal-person-id}/claims',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(claimsCreateNewClaimRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Yields a list of all current claims about this Legal Person.
         * @summary List claims
         * @param {string} legalPersonId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllClaims: async (legalPersonId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('getAllClaims', 'legalPersonId', legalPersonId)
            const localVarPath = `/v0/legal-persons/{legal-person-id}/claims`
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
                pathTemplate: '/v0/legal-persons/{legal-person-id}/claims',
                httpMethod: 'GET'
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
 * ClaimsApi - functional programming interface
 * @export
 */
export const ClaimsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ClaimsApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a new claim about a Legal Person.
         * @summary Create claim
         * @param {ClaimsApiCreateNewClaimRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createNewClaim(requestParameters: ClaimsApiCreateNewClaimRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ClaimsCreateNewClaimResponse>> {
            const claimsCreateNewClaimRequest: ClaimsCreateNewClaimRequest = {
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNewClaim(requestParameters.legalPersonId, claimsCreateNewClaimRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Yields a list of all current claims about this Legal Person.
         * @summary List claims
         * @param {ClaimsApiGetAllClaimsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllClaims(requestParameters: ClaimsApiGetAllClaimsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ClaimsGetAllClaimsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllClaims(requestParameters.legalPersonId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ClaimsApi - factory interface
 * @export
 */
export const ClaimsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ClaimsApiFp(configuration)
    return {
        /**
         * Creates a new claim about a Legal Person.
         * @summary Create claim
         * @param {ClaimsApiCreateNewClaimRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewClaim(requestParameters: ClaimsApiCreateNewClaimRequest, options?: AxiosRequestConfig): AxiosPromise<ClaimsCreateNewClaimResponse> {
            return localVarFp.createNewClaim(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Yields a list of all current claims about this Legal Person.
         * @summary List claims
         * @param {ClaimsApiGetAllClaimsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllClaims(requestParameters: ClaimsApiGetAllClaimsRequest, options?: AxiosRequestConfig): AxiosPromise<ClaimsGetAllClaimsResponse> {
            return localVarFp.getAllClaims(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createNewClaim operation in ClaimsApi.
 * @export
 * @interface ClaimsApiCreateNewClaimRequest
 */
export type ClaimsApiCreateNewClaimRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof ClaimsApiCreateNewClaim
    */
    readonly legalPersonId: string
    
} & ClaimsCreateNewClaimRequest

/**
 * Request parameters for getAllClaims operation in ClaimsApi.
 * @export
 * @interface ClaimsApiGetAllClaimsRequest
 */
export type ClaimsApiGetAllClaimsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof ClaimsApiGetAllClaims
    */
    readonly legalPersonId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof ClaimsApiGetAllClaims
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof ClaimsApiGetAllClaims
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof ClaimsApiGetAllClaims
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof ClaimsApiGetAllClaims
    */
    readonly pageBefore?: string
    
}

/**
 * ClaimsApiGenerated - object-oriented interface
 * @export
 * @class ClaimsApiGenerated
 * @extends {BaseAPI}
 */
export class ClaimsApiGenerated extends BaseAPI {
    /**
     * Creates a new claim about a Legal Person.
     * @summary Create claim
     * @param {ClaimsApiCreateNewClaimRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClaimsApiGenerated
     */
    public createNewClaim(requestParameters: ClaimsApiCreateNewClaimRequest, options?: AxiosRequestConfig) {
        return ClaimsApiFp(this.configuration).createNewClaim(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Yields a list of all current claims about this Legal Person.
     * @summary List claims
     * @param {ClaimsApiGetAllClaimsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ClaimsApiGenerated
     */
    public getAllClaims(requestParameters: ClaimsApiGetAllClaimsRequest, options?: AxiosRequestConfig) {
        return ClaimsApiFp(this.configuration).getAllClaims(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
