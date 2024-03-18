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
import { MembershipsGetMembershipInfoResponse } from '../models';
// @ts-ignore
import { MembershipsListOrganizationMembershipsResponse } from '../models';
// @ts-ignore
import { MembershipsListUserMembershipsResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * MembershipsApi - axios parameter creator
 * @export
 */
export const MembershipsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns the [user\'s](http://docs.griffin.com) [membership](http://docs.griffin.com) information.
         * @summary Get membership
         * @param {string} membershipId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMembershipInfo: async (membershipId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'membershipId' is not null or undefined
            assertParamExists('getMembershipInfo', 'membershipId', membershipId)
            const localVarPath = `/v0/memberships/{membership-id}`
                .replace(`{${"membership-id"}}`, encodeURIComponent(String(membershipId !== undefined ? membershipId : `-membership-id-`)));
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
                pathTemplate: '/v0/memberships/{membership-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns this [organization\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
         * @summary List organization memberships
         * @param {string} organizationId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listOrganizationMemberships: async (organizationId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('listOrganizationMemberships', 'organizationId', organizationId)
            const localVarPath = `/v0/organizations/{organization-id}/memberships`
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
                pathTemplate: '/v0/organizations/{organization-id}/memberships',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns this [user\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
         * @summary List user memberships
         * @param {string} userId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserMemberships: async (userId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('listUserMemberships', 'userId', userId)
            const localVarPath = `/v0/users/{user-id}/memberships`
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
                pathTemplate: '/v0/users/{user-id}/memberships',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Removes a [user](http://docs.griffin.com) from an [organization](http://docs.griffin.com).
         * @summary Delete membership
         * @param {string} membershipId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeMember: async (membershipId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'membershipId' is not null or undefined
            assertParamExists('removeMember', 'membershipId', membershipId)
            const localVarPath = `/v0/memberships/{membership-id}`
                .replace(`{${"membership-id"}}`, encodeURIComponent(String(membershipId !== undefined ? membershipId : `-membership-id-`)));
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
                pathTemplate: '/v0/memberships/{membership-id}',
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
 * MembershipsApi - functional programming interface
 * @export
 */
export const MembershipsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MembershipsApiAxiosParamCreator(configuration)
    return {
        /**
         * Returns the [user\'s](http://docs.griffin.com) [membership](http://docs.griffin.com) information.
         * @summary Get membership
         * @param {MembershipsApiGetMembershipInfoRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMembershipInfo(requestParameters: MembershipsApiGetMembershipInfoRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MembershipsGetMembershipInfoResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMembershipInfo(requestParameters.membershipId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns this [organization\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
         * @summary List organization memberships
         * @param {MembershipsApiListOrganizationMembershipsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listOrganizationMemberships(requestParameters: MembershipsApiListOrganizationMembershipsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MembershipsListOrganizationMembershipsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listOrganizationMemberships(requestParameters.organizationId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns this [user\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
         * @summary List user memberships
         * @param {MembershipsApiListUserMembershipsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUserMemberships(requestParameters: MembershipsApiListUserMembershipsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MembershipsListUserMembershipsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listUserMemberships(requestParameters.userId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Removes a [user](http://docs.griffin.com) from an [organization](http://docs.griffin.com).
         * @summary Delete membership
         * @param {MembershipsApiRemoveMemberRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeMember(requestParameters: MembershipsApiRemoveMemberRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeMember(requestParameters.membershipId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MembershipsApi - factory interface
 * @export
 */
export const MembershipsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MembershipsApiFp(configuration)
    return {
        /**
         * Returns the [user\'s](http://docs.griffin.com) [membership](http://docs.griffin.com) information.
         * @summary Get membership
         * @param {MembershipsApiGetMembershipInfoRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMembershipInfo(requestParameters: MembershipsApiGetMembershipInfoRequest, options?: AxiosRequestConfig): AxiosPromise<MembershipsGetMembershipInfoResponse> {
            return localVarFp.getMembershipInfo(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns this [organization\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
         * @summary List organization memberships
         * @param {MembershipsApiListOrganizationMembershipsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listOrganizationMemberships(requestParameters: MembershipsApiListOrganizationMembershipsRequest, options?: AxiosRequestConfig): AxiosPromise<MembershipsListOrganizationMembershipsResponse> {
            return localVarFp.listOrganizationMemberships(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns this [user\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
         * @summary List user memberships
         * @param {MembershipsApiListUserMembershipsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserMemberships(requestParameters: MembershipsApiListUserMembershipsRequest, options?: AxiosRequestConfig): AxiosPromise<MembershipsListUserMembershipsResponse> {
            return localVarFp.listUserMemberships(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Removes a [user](http://docs.griffin.com) from an [organization](http://docs.griffin.com).
         * @summary Delete membership
         * @param {MembershipsApiRemoveMemberRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeMember(requestParameters: MembershipsApiRemoveMemberRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.removeMember(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getMembershipInfo operation in MembershipsApi.
 * @export
 * @interface MembershipsApiGetMembershipInfoRequest
 */
export type MembershipsApiGetMembershipInfoRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof MembershipsApiGetMembershipInfo
    */
    readonly membershipId: string
    
}

/**
 * Request parameters for listOrganizationMemberships operation in MembershipsApi.
 * @export
 * @interface MembershipsApiListOrganizationMembershipsRequest
 */
export type MembershipsApiListOrganizationMembershipsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof MembershipsApiListOrganizationMemberships
    */
    readonly organizationId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof MembershipsApiListOrganizationMemberships
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof MembershipsApiListOrganizationMemberships
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof MembershipsApiListOrganizationMemberships
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof MembershipsApiListOrganizationMemberships
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for listUserMemberships operation in MembershipsApi.
 * @export
 * @interface MembershipsApiListUserMembershipsRequest
 */
export type MembershipsApiListUserMembershipsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof MembershipsApiListUserMemberships
    */
    readonly userId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof MembershipsApiListUserMemberships
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof MembershipsApiListUserMemberships
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof MembershipsApiListUserMemberships
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof MembershipsApiListUserMemberships
    */
    readonly pageBefore?: string
    
}

/**
 * Request parameters for removeMember operation in MembershipsApi.
 * @export
 * @interface MembershipsApiRemoveMemberRequest
 */
export type MembershipsApiRemoveMemberRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof MembershipsApiRemoveMember
    */
    readonly membershipId: string
    
}

/**
 * MembershipsApiGenerated - object-oriented interface
 * @export
 * @class MembershipsApiGenerated
 * @extends {BaseAPI}
 */
export class MembershipsApiGenerated extends BaseAPI {
    /**
     * Returns the [user\'s](http://docs.griffin.com) [membership](http://docs.griffin.com) information.
     * @summary Get membership
     * @param {MembershipsApiGetMembershipInfoRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApiGenerated
     */
    public getMembershipInfo(requestParameters: MembershipsApiGetMembershipInfoRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).getMembershipInfo(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns this [organization\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
     * @summary List organization memberships
     * @param {MembershipsApiListOrganizationMembershipsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApiGenerated
     */
    public listOrganizationMemberships(requestParameters: MembershipsApiListOrganizationMembershipsRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).listOrganizationMemberships(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns this [user\'s](http://docs.griffin.com) [memberships](http://docs.griffin.com).
     * @summary List user memberships
     * @param {MembershipsApiListUserMembershipsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApiGenerated
     */
    public listUserMemberships(requestParameters: MembershipsApiListUserMembershipsRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).listUserMemberships(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Removes a [user](http://docs.griffin.com) from an [organization](http://docs.griffin.com).
     * @summary Delete membership
     * @param {MembershipsApiRemoveMemberRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApiGenerated
     */
    public removeMember(requestParameters: MembershipsApiRemoveMemberRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).removeMember(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
