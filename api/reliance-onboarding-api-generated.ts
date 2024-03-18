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
import { RelatedProfile } from '../models';
// @ts-ignore
import { RelianceOnboardingCreateApplicationRequest } from '../models';
// @ts-ignore
import { RelianceOnboardingCreateApplicationResponse } from '../models';
// @ts-ignore
import { RelianceOnboardingGetApplicationResponse } from '../models';
// @ts-ignore
import { SubjectProfileProperty } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * RelianceOnboardingApi - axios parameter creator
 * @export
 */
export const RelianceOnboardingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create an onboarding application and submit it for processing.
         * @summary Create an onboarding application
         * @param {string} organizationId 
         * @param {RelianceOnboardingCreateApplicationRequest} relianceOnboardingCreateApplicationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createApplication: async (organizationId: string, relianceOnboardingCreateApplicationRequest: RelianceOnboardingCreateApplicationRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('createApplication', 'organizationId', organizationId)
            // verify required parameter 'relianceOnboardingCreateApplicationRequest' is not null or undefined
            assertParamExists('createApplication', 'relianceOnboardingCreateApplicationRequest', relianceOnboardingCreateApplicationRequest)
            const localVarPath = `/v0/organizations/{organization-id}/onboarding/applications`
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
                requestBody: relianceOnboardingCreateApplicationRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/organizations/{organization-id}/onboarding/applications',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(relianceOnboardingCreateApplicationRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Fetch an onboarding application.
         * @summary Get onboarding application
         * @param {string} onboardingApplicationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApplication: async (onboardingApplicationId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'onboardingApplicationId' is not null or undefined
            assertParamExists('getApplication', 'onboardingApplicationId', onboardingApplicationId)
            const localVarPath = `/v0/onboarding/applications/{onboarding-application-id}`
                .replace(`{${"onboarding-application-id"}}`, encodeURIComponent(String(onboardingApplicationId !== undefined ? onboardingApplicationId : `-onboarding-application-id-`)));
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
                pathTemplate: '/v0/onboarding/applications/{onboarding-application-id}',
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
 * RelianceOnboardingApi - functional programming interface
 * @export
 */
export const RelianceOnboardingApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RelianceOnboardingApiAxiosParamCreator(configuration)
    return {
        /**
         * Create an onboarding application and submit it for processing.
         * @summary Create an onboarding application
         * @param {RelianceOnboardingApiCreateApplicationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createApplication(requestParameters: RelianceOnboardingApiCreateApplicationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RelianceOnboardingCreateApplicationResponse>> {
            const relianceOnboardingCreateApplicationRequest: RelianceOnboardingCreateApplicationRequest = {
                workflow-url: requestParameters.workflow-url,
                subject-profile: requestParameters.subject-profile,
                related-profiles: requestParameters.related-profiles
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createApplication(requestParameters.organizationId, relianceOnboardingCreateApplicationRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Fetch an onboarding application.
         * @summary Get onboarding application
         * @param {RelianceOnboardingApiGetApplicationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getApplication(requestParameters: RelianceOnboardingApiGetApplicationRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RelianceOnboardingGetApplicationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getApplication(requestParameters.onboardingApplicationId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * RelianceOnboardingApi - factory interface
 * @export
 */
export const RelianceOnboardingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RelianceOnboardingApiFp(configuration)
    return {
        /**
         * Create an onboarding application and submit it for processing.
         * @summary Create an onboarding application
         * @param {RelianceOnboardingApiCreateApplicationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createApplication(requestParameters: RelianceOnboardingApiCreateApplicationRequest, options?: AxiosRequestConfig): AxiosPromise<RelianceOnboardingCreateApplicationResponse> {
            return localVarFp.createApplication(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Fetch an onboarding application.
         * @summary Get onboarding application
         * @param {RelianceOnboardingApiGetApplicationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApplication(requestParameters: RelianceOnboardingApiGetApplicationRequest, options?: AxiosRequestConfig): AxiosPromise<RelianceOnboardingGetApplicationResponse> {
            return localVarFp.getApplication(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createApplication operation in RelianceOnboardingApi.
 * @export
 * @interface RelianceOnboardingApiCreateApplicationRequest
 */
export type RelianceOnboardingApiCreateApplicationRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof RelianceOnboardingApiCreateApplication
    */
    readonly organizationId: string
    
} & RelianceOnboardingCreateApplicationRequest

/**
 * Request parameters for getApplication operation in RelianceOnboardingApi.
 * @export
 * @interface RelianceOnboardingApiGetApplicationRequest
 */
export type RelianceOnboardingApiGetApplicationRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof RelianceOnboardingApiGetApplication
    */
    readonly onboardingApplicationId: string
    
}

/**
 * RelianceOnboardingApiGenerated - object-oriented interface
 * @export
 * @class RelianceOnboardingApiGenerated
 * @extends {BaseAPI}
 */
export class RelianceOnboardingApiGenerated extends BaseAPI {
    /**
     * Create an onboarding application and submit it for processing.
     * @summary Create an onboarding application
     * @param {RelianceOnboardingApiCreateApplicationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RelianceOnboardingApiGenerated
     */
    public createApplication(requestParameters: RelianceOnboardingApiCreateApplicationRequest, options?: AxiosRequestConfig) {
        return RelianceOnboardingApiFp(this.configuration).createApplication(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Fetch an onboarding application.
     * @summary Get onboarding application
     * @param {RelianceOnboardingApiGetApplicationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RelianceOnboardingApiGenerated
     */
    public getApplication(requestParameters: RelianceOnboardingApiGetApplicationRequest, options?: AxiosRequestConfig) {
        return RelianceOnboardingApiFp(this.configuration).getApplication(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
