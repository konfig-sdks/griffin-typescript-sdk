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
import { VerificationsGetVerificationResponse } from '../models';
// @ts-ignore
import { VerificationsInitiateVerificationRequest } from '../models';
// @ts-ignore
import { VerificationsInitiateVerificationResponse } from '../models';
// @ts-ignore
import { VerificationsListForLegalPersonResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * VerificationsApi - axios parameter creator
 * @export
 */
export const VerificationsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Fetch the verification.
         * @summary Get verification
         * @param {string} verificationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getVerification: async (verificationId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'verificationId' is not null or undefined
            assertParamExists('getVerification', 'verificationId', verificationId)
            const localVarPath = `/v0/verifications/{verification-id}`
                .replace(`{${"verification-id"}}`, encodeURIComponent(String(verificationId !== undefined ? verificationId : `-verification-id-`)));
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
                pathTemplate: '/v0/verifications/{verification-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Initiates verification of the subject legal person.  The request body must include a `workflow-url` to determine checks to be performed by the verification. The workflow specified determines which claims must exist for the subject legal person, as identified in the request URL, and any associated legal persons (i.e. directors and people with significant control of a corporation).  These claims can be found in the `required-claim-types` field on a [Workflow](http://docs.griffin.com).  ---  Once a verification is created, the system will perform checks on the claim details. The status of check processing is indicated by the `verification-status` in the response body. Initially it will be `pending`, and will transition through `in-progress` to a final status of `checks-complete`.  A `verification-status` of `failed` indicates something went wrong during check processing. You can initiate another verification to retry the check processing.
         * @summary Perform verification of a legal person
         * @param {string} legalPersonId 
         * @param {VerificationsInitiateVerificationRequest} verificationsInitiateVerificationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        initiateVerification: async (legalPersonId: string, verificationsInitiateVerificationRequest: VerificationsInitiateVerificationRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('initiateVerification', 'legalPersonId', legalPersonId)
            // verify required parameter 'verificationsInitiateVerificationRequest' is not null or undefined
            assertParamExists('initiateVerification', 'verificationsInitiateVerificationRequest', verificationsInitiateVerificationRequest)
            const localVarPath = `/v0/legal-persons/{legal-person-id}/verifications`
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
                requestBody: verificationsInitiateVerificationRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/legal-persons/{legal-person-id}/verifications',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(verificationsInitiateVerificationRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List verifications for the given legal person.
         * @summary List verifications for a legal person
         * @param {string} legalPersonId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listForLegalPerson: async (legalPersonId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageAfter?: string, pageBefore?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalPersonId' is not null or undefined
            assertParamExists('listForLegalPerson', 'legalPersonId', legalPersonId)
            const localVarPath = `/v0/legal-persons/{legal-person-id}/verifications`
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
                pathTemplate: '/v0/legal-persons/{legal-person-id}/verifications',
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
 * VerificationsApi - functional programming interface
 * @export
 */
export const VerificationsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = VerificationsApiAxiosParamCreator(configuration)
    return {
        /**
         * Fetch the verification.
         * @summary Get verification
         * @param {VerificationsApiGetVerificationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getVerification(requestParameters: VerificationsApiGetVerificationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VerificationsGetVerificationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getVerification(requestParameters.verificationId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Initiates verification of the subject legal person.  The request body must include a `workflow-url` to determine checks to be performed by the verification. The workflow specified determines which claims must exist for the subject legal person, as identified in the request URL, and any associated legal persons (i.e. directors and people with significant control of a corporation).  These claims can be found in the `required-claim-types` field on a [Workflow](http://docs.griffin.com).  ---  Once a verification is created, the system will perform checks on the claim details. The status of check processing is indicated by the `verification-status` in the response body. Initially it will be `pending`, and will transition through `in-progress` to a final status of `checks-complete`.  A `verification-status` of `failed` indicates something went wrong during check processing. You can initiate another verification to retry the check processing.
         * @summary Perform verification of a legal person
         * @param {VerificationsApiInitiateVerificationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async initiateVerification(requestParameters: VerificationsApiInitiateVerificationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VerificationsInitiateVerificationResponse>> {
            const verificationsInitiateVerificationRequest: VerificationsInitiateVerificationRequest = {
                workflow-url: requestParameters.workflow-url
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.initiateVerification(requestParameters.legalPersonId, verificationsInitiateVerificationRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List verifications for the given legal person.
         * @summary List verifications for a legal person
         * @param {VerificationsApiListForLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listForLegalPerson(requestParameters: VerificationsApiListForLegalPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VerificationsListForLegalPersonResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listForLegalPerson(requestParameters.legalPersonId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageAfter, requestParameters.pageBefore, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * VerificationsApi - factory interface
 * @export
 */
export const VerificationsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = VerificationsApiFp(configuration)
    return {
        /**
         * Fetch the verification.
         * @summary Get verification
         * @param {VerificationsApiGetVerificationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getVerification(requestParameters: VerificationsApiGetVerificationRequest, options?: AxiosRequestConfig): AxiosPromise<VerificationsGetVerificationResponse> {
            return localVarFp.getVerification(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Initiates verification of the subject legal person.  The request body must include a `workflow-url` to determine checks to be performed by the verification. The workflow specified determines which claims must exist for the subject legal person, as identified in the request URL, and any associated legal persons (i.e. directors and people with significant control of a corporation).  These claims can be found in the `required-claim-types` field on a [Workflow](http://docs.griffin.com).  ---  Once a verification is created, the system will perform checks on the claim details. The status of check processing is indicated by the `verification-status` in the response body. Initially it will be `pending`, and will transition through `in-progress` to a final status of `checks-complete`.  A `verification-status` of `failed` indicates something went wrong during check processing. You can initiate another verification to retry the check processing.
         * @summary Perform verification of a legal person
         * @param {VerificationsApiInitiateVerificationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        initiateVerification(requestParameters: VerificationsApiInitiateVerificationRequest, options?: AxiosRequestConfig): AxiosPromise<VerificationsInitiateVerificationResponse> {
            return localVarFp.initiateVerification(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * List verifications for the given legal person.
         * @summary List verifications for a legal person
         * @param {VerificationsApiListForLegalPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listForLegalPerson(requestParameters: VerificationsApiListForLegalPersonRequest, options?: AxiosRequestConfig): AxiosPromise<VerificationsListForLegalPersonResponse> {
            return localVarFp.listForLegalPerson(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getVerification operation in VerificationsApi.
 * @export
 * @interface VerificationsApiGetVerificationRequest
 */
export type VerificationsApiGetVerificationRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof VerificationsApiGetVerification
    */
    readonly verificationId: string
    
}

/**
 * Request parameters for initiateVerification operation in VerificationsApi.
 * @export
 * @interface VerificationsApiInitiateVerificationRequest
 */
export type VerificationsApiInitiateVerificationRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof VerificationsApiInitiateVerification
    */
    readonly legalPersonId: string
    
} & VerificationsInitiateVerificationRequest

/**
 * Request parameters for listForLegalPerson operation in VerificationsApi.
 * @export
 * @interface VerificationsApiListForLegalPersonRequest
 */
export type VerificationsApiListForLegalPersonRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof VerificationsApiListForLegalPerson
    */
    readonly legalPersonId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof VerificationsApiListForLegalPerson
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof VerificationsApiListForLegalPerson
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof VerificationsApiListForLegalPerson
    */
    readonly pageAfter?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof VerificationsApiListForLegalPerson
    */
    readonly pageBefore?: string
    
}

/**
 * VerificationsApiGenerated - object-oriented interface
 * @export
 * @class VerificationsApiGenerated
 * @extends {BaseAPI}
 */
export class VerificationsApiGenerated extends BaseAPI {
    /**
     * Fetch the verification.
     * @summary Get verification
     * @param {VerificationsApiGetVerificationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VerificationsApiGenerated
     */
    public getVerification(requestParameters: VerificationsApiGetVerificationRequest, options?: AxiosRequestConfig) {
        return VerificationsApiFp(this.configuration).getVerification(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Initiates verification of the subject legal person.  The request body must include a `workflow-url` to determine checks to be performed by the verification. The workflow specified determines which claims must exist for the subject legal person, as identified in the request URL, and any associated legal persons (i.e. directors and people with significant control of a corporation).  These claims can be found in the `required-claim-types` field on a [Workflow](http://docs.griffin.com).  ---  Once a verification is created, the system will perform checks on the claim details. The status of check processing is indicated by the `verification-status` in the response body. Initially it will be `pending`, and will transition through `in-progress` to a final status of `checks-complete`.  A `verification-status` of `failed` indicates something went wrong during check processing. You can initiate another verification to retry the check processing.
     * @summary Perform verification of a legal person
     * @param {VerificationsApiInitiateVerificationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VerificationsApiGenerated
     */
    public initiateVerification(requestParameters: VerificationsApiInitiateVerificationRequest, options?: AxiosRequestConfig) {
        return VerificationsApiFp(this.configuration).initiateVerification(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List verifications for the given legal person.
     * @summary List verifications for a legal person
     * @param {VerificationsApiListForLegalPersonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VerificationsApiGenerated
     */
    public listForLegalPerson(requestParameters: VerificationsApiListForLegalPersonRequest, options?: AxiosRequestConfig) {
        return VerificationsApiFp(this.configuration).listForLegalPerson(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
