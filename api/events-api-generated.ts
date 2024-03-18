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
import { EventsGetAllOrganizationEventsResponse } from '../models';
// @ts-ignore
import { EventsGetEventResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * EventsApi - axios parameter creator
 * @export
 */
export const EventsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * List all events for an organization
         * @param {string} organizationId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {'decision-created' | 'payment-created' | 'transaction-created' | 'verification-updated' | 'admission-updated' | 'verification-created' | 'account-status-updated' | 'submission-created' | 'test-event' | 'admission-created' | 'account-status-created' | 'submission-updated'} [filterEventTypeEq] The type of webhook event. Usually has the form {resource}-{operation}, e.g. payment-updated
         * @param {string} [filterCreatedAtLte] Return only events with a created-at less than or equal to the given timestamp.
         * @param {string} [filterCreatedAtLt] Return only events with a created-at less than the given timestamp.
         * @param {string} [filterCreatedAtGte] Return only events with a created-at greater than or equal to the given timestamp.
         * @param {string} [filterCreatedAtGt] Return only events with a created-at greater than the given timestamp.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllOrganizationEvents: async (organizationId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageBefore?: string, pageAfter?: string, filterEventTypeEq?: 'decision-created' | 'payment-created' | 'transaction-created' | 'verification-updated' | 'admission-updated' | 'verification-created' | 'account-status-updated' | 'submission-created' | 'test-event' | 'admission-created' | 'account-status-created' | 'submission-updated', filterCreatedAtLte?: string, filterCreatedAtLt?: string, filterCreatedAtGte?: string, filterCreatedAtGt?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('getAllOrganizationEvents', 'organizationId', organizationId)
            const localVarPath = `/v0/organizations/{organization-id}/events`
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

            if (pageBefore !== undefined) {
                localVarQueryParameter['page[before]'] = pageBefore;
            }

            if (pageAfter !== undefined) {
                localVarQueryParameter['page[after]'] = pageAfter;
            }

            if (filterEventTypeEq !== undefined) {
                localVarQueryParameter['filter[event-type][eq]'] = filterEventTypeEq;
            }

            if (filterCreatedAtLte !== undefined) {
                localVarQueryParameter['filter[created-at][lte]'] = (filterCreatedAtLte as any instanceof Date) ?
                    (filterCreatedAtLte as any).toISOString() :
                    filterCreatedAtLte;
            }

            if (filterCreatedAtLt !== undefined) {
                localVarQueryParameter['filter[created-at][lt]'] = (filterCreatedAtLt as any instanceof Date) ?
                    (filterCreatedAtLt as any).toISOString() :
                    filterCreatedAtLt;
            }

            if (filterCreatedAtGte !== undefined) {
                localVarQueryParameter['filter[created-at][gte]'] = (filterCreatedAtGte as any instanceof Date) ?
                    (filterCreatedAtGte as any).toISOString() :
                    filterCreatedAtGte;
            }

            if (filterCreatedAtGt !== undefined) {
                localVarQueryParameter['filter[created-at][gt]'] = (filterCreatedAtGt as any instanceof Date) ?
                    (filterCreatedAtGt as any).toISOString() :
                    filterCreatedAtGt;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/organizations/{organization-id}/events',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get an event
         * @param {string} eventId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvent: async (eventId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'eventId' is not null or undefined
            assertParamExists('getEvent', 'eventId', eventId)
            const localVarPath = `/v0/events/{event-id}`
                .replace(`{${"event-id"}}`, encodeURIComponent(String(eventId !== undefined ? eventId : `-event-id-`)));
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
                pathTemplate: '/v0/events/{event-id}',
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
 * EventsApi - functional programming interface
 * @export
 */
export const EventsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EventsApiAxiosParamCreator(configuration)
    return {
        /**
         * List all events for an organization
         * @param {EventsApiGetAllOrganizationEventsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllOrganizationEvents(requestParameters: EventsApiGetAllOrganizationEventsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EventsGetAllOrganizationEventsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllOrganizationEvents(requestParameters.organizationId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageBefore, requestParameters.pageAfter, requestParameters.filterEventTypeEq, requestParameters.filterCreatedAtLte, requestParameters.filterCreatedAtLt, requestParameters.filterCreatedAtGte, requestParameters.filterCreatedAtGt, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get an event
         * @param {EventsApiGetEventRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getEvent(requestParameters: EventsApiGetEventRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EventsGetEventResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getEvent(requestParameters.eventId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * EventsApi - factory interface
 * @export
 */
export const EventsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EventsApiFp(configuration)
    return {
        /**
         * List all events for an organization
         * @param {EventsApiGetAllOrganizationEventsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllOrganizationEvents(requestParameters: EventsApiGetAllOrganizationEventsRequest, options?: AxiosRequestConfig): AxiosPromise<EventsGetAllOrganizationEventsResponse> {
            return localVarFp.getAllOrganizationEvents(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Get an event
         * @param {EventsApiGetEventRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvent(requestParameters: EventsApiGetEventRequest, options?: AxiosRequestConfig): AxiosPromise<EventsGetEventResponse> {
            return localVarFp.getEvent(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getAllOrganizationEvents operation in EventsApi.
 * @export
 * @interface EventsApiGetAllOrganizationEventsRequest
 */
export type EventsApiGetAllOrganizationEventsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly organizationId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly pageBefore?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly pageAfter?: string
    
    /**
    * The type of webhook event. Usually has the form {resource}-{operation}, e.g. payment-updated
    * @type {'decision-created' | 'payment-created' | 'transaction-created' | 'verification-updated' | 'admission-updated' | 'verification-created' | 'account-status-updated' | 'submission-created' | 'test-event' | 'admission-created' | 'account-status-created' | 'submission-updated'}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly filterEventTypeEq?: 'decision-created' | 'payment-created' | 'transaction-created' | 'verification-updated' | 'admission-updated' | 'verification-created' | 'account-status-updated' | 'submission-created' | 'test-event' | 'admission-created' | 'account-status-created' | 'submission-updated'
    
    /**
    * Return only events with a created-at less than or equal to the given timestamp.
    * @type {string}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly filterCreatedAtLte?: string
    
    /**
    * Return only events with a created-at less than the given timestamp.
    * @type {string}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly filterCreatedAtLt?: string
    
    /**
    * Return only events with a created-at greater than or equal to the given timestamp.
    * @type {string}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly filterCreatedAtGte?: string
    
    /**
    * Return only events with a created-at greater than the given timestamp.
    * @type {string}
    * @memberof EventsApiGetAllOrganizationEvents
    */
    readonly filterCreatedAtGt?: string
    
}

/**
 * Request parameters for getEvent operation in EventsApi.
 * @export
 * @interface EventsApiGetEventRequest
 */
export type EventsApiGetEventRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof EventsApiGetEvent
    */
    readonly eventId: string
    
}

/**
 * EventsApiGenerated - object-oriented interface
 * @export
 * @class EventsApiGenerated
 * @extends {BaseAPI}
 */
export class EventsApiGenerated extends BaseAPI {
    /**
     * List all events for an organization
     * @param {EventsApiGetAllOrganizationEventsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApiGenerated
     */
    public getAllOrganizationEvents(requestParameters: EventsApiGetAllOrganizationEventsRequest, options?: AxiosRequestConfig) {
        return EventsApiFp(this.configuration).getAllOrganizationEvents(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get an event
     * @param {EventsApiGetEventRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApiGenerated
     */
    public getEvent(requestParameters: EventsApiGetEventRequest, options?: AxiosRequestConfig) {
        return EventsApiFp(this.configuration).getEvent(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
