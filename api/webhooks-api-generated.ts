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
import { WebhooksActivateActionResponse } from '../models';
// @ts-ignore
import { WebhooksCreateWebhookRequest } from '../models';
// @ts-ignore
import { WebhooksCreateWebhookResponse } from '../models';
// @ts-ignore
import { WebhooksDeactivateActionResponse } from '../models';
// @ts-ignore
import { WebhooksGetAllResponse } from '../models';
// @ts-ignore
import { WebhooksGetLatestTestStatusResponse } from '../models';
// @ts-ignore
import { WebhooksGetWebhookResponse } from '../models';
// @ts-ignore
import { WebhooksSendTestEventResponse } from '../models';
// @ts-ignore
import { WebhooksUpdateWebhookRequest } from '../models';
// @ts-ignore
import { WebhooksUpdateWebhookResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * WebhooksApi - axios parameter creator
 * @export
 */
export const WebhooksApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Activate a webhook
         * @param {string} webhookId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        activateAction: async (webhookId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'webhookId' is not null or undefined
            assertParamExists('activateAction', 'webhookId', webhookId)
            const localVarPath = `/v0/webhooks/{webhook-id}/actions/activate`
                .replace(`{${"webhook-id"}}`, encodeURIComponent(String(webhookId !== undefined ? webhookId : `-webhook-id-`)));
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
                pathTemplate: '/v0/webhooks/{webhook-id}/actions/activate',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Create a webhook
         * @param {string} organizationId 
         * @param {WebhooksCreateWebhookRequest} webhooksCreateWebhookRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createWebhook: async (organizationId: string, webhooksCreateWebhookRequest: WebhooksCreateWebhookRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('createWebhook', 'organizationId', organizationId)
            // verify required parameter 'webhooksCreateWebhookRequest' is not null or undefined
            assertParamExists('createWebhook', 'webhooksCreateWebhookRequest', webhooksCreateWebhookRequest)
            const localVarPath = `/v0/organizations/{organization-id}/webhooks`
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
                requestBody: webhooksCreateWebhookRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/organizations/{organization-id}/webhooks',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(webhooksCreateWebhookRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deactivate a webhook
         * @param {string} webhookId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deactivateAction: async (webhookId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'webhookId' is not null or undefined
            assertParamExists('deactivateAction', 'webhookId', webhookId)
            const localVarPath = `/v0/webhooks/{webhook-id}/actions/deactivate`
                .replace(`{${"webhook-id"}}`, encodeURIComponent(String(webhookId !== undefined ? webhookId : `-webhook-id-`)));
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
                pathTemplate: '/v0/webhooks/{webhook-id}/actions/deactivate',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a webhook
         * @param {string} webhookId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteWebhook: async (webhookId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'webhookId' is not null or undefined
            assertParamExists('deleteWebhook', 'webhookId', webhookId)
            const localVarPath = `/v0/webhooks/{webhook-id}`
                .replace(`{${"webhook-id"}}`, encodeURIComponent(String(webhookId !== undefined ? webhookId : `-webhook-id-`)));
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
                pathTemplate: '/v0/webhooks/{webhook-id}',
                httpMethod: 'DELETE'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get all webhooks for the organization
         * @param {string} organizationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll: async (organizationId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'organizationId' is not null or undefined
            assertParamExists('getAll', 'organizationId', organizationId)
            const localVarPath = `/v0/organizations/{organization-id}/webhooks`
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

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/organizations/{organization-id}/webhooks',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get the status of the latest test event
         * @param {string} webhookId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLatestTestStatus: async (webhookId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'webhookId' is not null or undefined
            assertParamExists('getLatestTestStatus', 'webhookId', webhookId)
            const localVarPath = `/v0/webhooks/{webhook-id}/actions/test`
                .replace(`{${"webhook-id"}}`, encodeURIComponent(String(webhookId !== undefined ? webhookId : `-webhook-id-`)));
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
                pathTemplate: '/v0/webhooks/{webhook-id}/actions/test',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Fetch a webhook
         * @param {string} webhookId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhook: async (webhookId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'webhookId' is not null or undefined
            assertParamExists('getWebhook', 'webhookId', webhookId)
            const localVarPath = `/v0/webhooks/{webhook-id}`
                .replace(`{${"webhook-id"}}`, encodeURIComponent(String(webhookId !== undefined ? webhookId : `-webhook-id-`)));
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
                pathTemplate: '/v0/webhooks/{webhook-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Send a test event to the webhook
         * @param {string} webhookId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendTestEvent: async (webhookId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'webhookId' is not null or undefined
            assertParamExists('sendTestEvent', 'webhookId', webhookId)
            const localVarPath = `/v0/webhooks/{webhook-id}/actions/test`
                .replace(`{${"webhook-id"}}`, encodeURIComponent(String(webhookId !== undefined ? webhookId : `-webhook-id-`)));
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
                pathTemplate: '/v0/webhooks/{webhook-id}/actions/test',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update a webhook
         * @param {string} webhookId 
         * @param {WebhooksUpdateWebhookRequest} webhooksUpdateWebhookRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateWebhook: async (webhookId: string, webhooksUpdateWebhookRequest: WebhooksUpdateWebhookRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'webhookId' is not null or undefined
            assertParamExists('updateWebhook', 'webhookId', webhookId)
            // verify required parameter 'webhooksUpdateWebhookRequest' is not null or undefined
            assertParamExists('updateWebhook', 'webhooksUpdateWebhookRequest', webhooksUpdateWebhookRequest)
            const localVarPath = `/v0/webhooks/{webhook-id}`
                .replace(`{${"webhook-id"}}`, encodeURIComponent(String(webhookId !== undefined ? webhookId : `-webhook-id-`)));
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
                requestBody: webhooksUpdateWebhookRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/webhooks/{webhook-id}',
                httpMethod: 'PATCH'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(webhooksUpdateWebhookRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * WebhooksApi - functional programming interface
 * @export
 */
export const WebhooksApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = WebhooksApiAxiosParamCreator(configuration)
    return {
        /**
         * Activate a webhook
         * @param {WebhooksApiActivateActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async activateAction(requestParameters: WebhooksApiActivateActionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksActivateActionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.activateAction(requestParameters.webhookId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Create a webhook
         * @param {WebhooksApiCreateWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createWebhook(requestParameters: WebhooksApiCreateWebhookRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksCreateWebhookResponse>> {
            const webhooksCreateWebhookRequest: WebhooksCreateWebhookRequest = {
                webhook-destination-url: requestParameters.webhook-destination-url,
                webhook-description: requestParameters.webhook-description
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createWebhook(requestParameters.organizationId, webhooksCreateWebhookRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Deactivate a webhook
         * @param {WebhooksApiDeactivateActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deactivateAction(requestParameters: WebhooksApiDeactivateActionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksDeactivateActionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deactivateAction(requestParameters.webhookId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Delete a webhook
         * @param {WebhooksApiDeleteWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteWebhook(requestParameters: WebhooksApiDeleteWebhookRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteWebhook(requestParameters.webhookId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get all webhooks for the organization
         * @param {WebhooksApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(requestParameters: WebhooksApiGetAllRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksGetAllResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAll(requestParameters.organizationId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get the status of the latest test event
         * @param {WebhooksApiGetLatestTestStatusRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLatestTestStatus(requestParameters: WebhooksApiGetLatestTestStatusRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksGetLatestTestStatusResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLatestTestStatus(requestParameters.webhookId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Fetch a webhook
         * @param {WebhooksApiGetWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getWebhook(requestParameters: WebhooksApiGetWebhookRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksGetWebhookResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getWebhook(requestParameters.webhookId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Send a test event to the webhook
         * @param {WebhooksApiSendTestEventRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sendTestEvent(requestParameters: WebhooksApiSendTestEventRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksSendTestEventResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sendTestEvent(requestParameters.webhookId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Update a webhook
         * @param {WebhooksApiUpdateWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateWebhook(requestParameters: WebhooksApiUpdateWebhookRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WebhooksUpdateWebhookResponse>> {
            const webhooksUpdateWebhookRequest: WebhooksUpdateWebhookRequest = {
                webhook-description: requestParameters.webhook-description
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateWebhook(requestParameters.webhookId, webhooksUpdateWebhookRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * WebhooksApi - factory interface
 * @export
 */
export const WebhooksApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = WebhooksApiFp(configuration)
    return {
        /**
         * Activate a webhook
         * @param {WebhooksApiActivateActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        activateAction(requestParameters: WebhooksApiActivateActionRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksActivateActionResponse> {
            return localVarFp.activateAction(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a webhook
         * @param {WebhooksApiCreateWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createWebhook(requestParameters: WebhooksApiCreateWebhookRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksCreateWebhookResponse> {
            return localVarFp.createWebhook(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Deactivate a webhook
         * @param {WebhooksApiDeactivateActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deactivateAction(requestParameters: WebhooksApiDeactivateActionRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksDeactivateActionResponse> {
            return localVarFp.deactivateAction(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a webhook
         * @param {WebhooksApiDeleteWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteWebhook(requestParameters: WebhooksApiDeleteWebhookRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.deleteWebhook(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Get all webhooks for the organization
         * @param {WebhooksApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll(requestParameters: WebhooksApiGetAllRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksGetAllResponse> {
            return localVarFp.getAll(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the status of the latest test event
         * @param {WebhooksApiGetLatestTestStatusRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLatestTestStatus(requestParameters: WebhooksApiGetLatestTestStatusRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksGetLatestTestStatusResponse> {
            return localVarFp.getLatestTestStatus(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Fetch a webhook
         * @param {WebhooksApiGetWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhook(requestParameters: WebhooksApiGetWebhookRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksGetWebhookResponse> {
            return localVarFp.getWebhook(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Send a test event to the webhook
         * @param {WebhooksApiSendTestEventRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendTestEvent(requestParameters: WebhooksApiSendTestEventRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksSendTestEventResponse> {
            return localVarFp.sendTestEvent(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a webhook
         * @param {WebhooksApiUpdateWebhookRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateWebhook(requestParameters: WebhooksApiUpdateWebhookRequest, options?: AxiosRequestConfig): AxiosPromise<WebhooksUpdateWebhookResponse> {
            return localVarFp.updateWebhook(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for activateAction operation in WebhooksApi.
 * @export
 * @interface WebhooksApiActivateActionRequest
 */
export type WebhooksApiActivateActionRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiActivateAction
    */
    readonly webhookId: string
    
}

/**
 * Request parameters for createWebhook operation in WebhooksApi.
 * @export
 * @interface WebhooksApiCreateWebhookRequest
 */
export type WebhooksApiCreateWebhookRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiCreateWebhook
    */
    readonly organizationId: string
    
} & WebhooksCreateWebhookRequest

/**
 * Request parameters for deactivateAction operation in WebhooksApi.
 * @export
 * @interface WebhooksApiDeactivateActionRequest
 */
export type WebhooksApiDeactivateActionRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiDeactivateAction
    */
    readonly webhookId: string
    
}

/**
 * Request parameters for deleteWebhook operation in WebhooksApi.
 * @export
 * @interface WebhooksApiDeleteWebhookRequest
 */
export type WebhooksApiDeleteWebhookRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiDeleteWebhook
    */
    readonly webhookId: string
    
}

/**
 * Request parameters for getAll operation in WebhooksApi.
 * @export
 * @interface WebhooksApiGetAllRequest
 */
export type WebhooksApiGetAllRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiGetAll
    */
    readonly organizationId: string
    
}

/**
 * Request parameters for getLatestTestStatus operation in WebhooksApi.
 * @export
 * @interface WebhooksApiGetLatestTestStatusRequest
 */
export type WebhooksApiGetLatestTestStatusRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiGetLatestTestStatus
    */
    readonly webhookId: string
    
}

/**
 * Request parameters for getWebhook operation in WebhooksApi.
 * @export
 * @interface WebhooksApiGetWebhookRequest
 */
export type WebhooksApiGetWebhookRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiGetWebhook
    */
    readonly webhookId: string
    
}

/**
 * Request parameters for sendTestEvent operation in WebhooksApi.
 * @export
 * @interface WebhooksApiSendTestEventRequest
 */
export type WebhooksApiSendTestEventRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiSendTestEvent
    */
    readonly webhookId: string
    
}

/**
 * Request parameters for updateWebhook operation in WebhooksApi.
 * @export
 * @interface WebhooksApiUpdateWebhookRequest
 */
export type WebhooksApiUpdateWebhookRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof WebhooksApiUpdateWebhook
    */
    readonly webhookId: string
    
} & WebhooksUpdateWebhookRequest

/**
 * WebhooksApiGenerated - object-oriented interface
 * @export
 * @class WebhooksApiGenerated
 * @extends {BaseAPI}
 */
export class WebhooksApiGenerated extends BaseAPI {
    /**
     * Activate a webhook
     * @param {WebhooksApiActivateActionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public activateAction(requestParameters: WebhooksApiActivateActionRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).activateAction(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Create a webhook
     * @param {WebhooksApiCreateWebhookRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public createWebhook(requestParameters: WebhooksApiCreateWebhookRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).createWebhook(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deactivate a webhook
     * @param {WebhooksApiDeactivateActionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public deactivateAction(requestParameters: WebhooksApiDeactivateActionRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).deactivateAction(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete a webhook
     * @param {WebhooksApiDeleteWebhookRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public deleteWebhook(requestParameters: WebhooksApiDeleteWebhookRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).deleteWebhook(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all webhooks for the organization
     * @param {WebhooksApiGetAllRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public getAll(requestParameters: WebhooksApiGetAllRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).getAll(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get the status of the latest test event
     * @param {WebhooksApiGetLatestTestStatusRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public getLatestTestStatus(requestParameters: WebhooksApiGetLatestTestStatusRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).getLatestTestStatus(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Fetch a webhook
     * @param {WebhooksApiGetWebhookRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public getWebhook(requestParameters: WebhooksApiGetWebhookRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).getWebhook(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Send a test event to the webhook
     * @param {WebhooksApiSendTestEventRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public sendTestEvent(requestParameters: WebhooksApiSendTestEventRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).sendTestEvent(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update a webhook
     * @param {WebhooksApiUpdateWebhookRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiGenerated
     */
    public updateWebhook(requestParameters: WebhooksApiUpdateWebhookRequest, options?: AxiosRequestConfig) {
        return WebhooksApiFp(this.configuration).updateWebhook(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
