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
import { CreditorProperty } from '../models';
// @ts-ignore
import { PaymentAmountProperty } from '../models';
// @ts-ignore
import { PaymentsCreateRequestRequest } from '../models';
// @ts-ignore
import { PaymentsCreateRequestResponse } from '../models';
// @ts-ignore
import { PaymentsGetAdmissionResponse } from '../models';
// @ts-ignore
import { PaymentsGetBankAccountPaymentsResponse } from '../models';
// @ts-ignore
import { PaymentsGetDetailsResponse } from '../models';
// @ts-ignore
import { PaymentsGetSubmissionResponse } from '../models';
// @ts-ignore
import { PaymentsListAdmissionsResponse } from '../models';
// @ts-ignore
import { PaymentsListBankAccountAdmissionsResponse } from '../models';
// @ts-ignore
import { PaymentsListSubmissions200Response } from '../models';
// @ts-ignore
import { PaymentsListSubmissionsResponse } from '../models';
// @ts-ignore
import { PaymentsSubmitPaymentSubmissionRequest } from '../models';
// @ts-ignore
import { PaymentsSubmitPaymentSubmissionResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * PaymentsApi - axios parameter creator
 * @export
 */
export const PaymentsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Registers a new payment request for the bank account
         * @summary Create payment
         * @param {string} bankAccountId 
         * @param {PaymentsCreateRequestRequest} paymentsCreateRequestRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRequest: async (bankAccountId: string, paymentsCreateRequestRequest: PaymentsCreateRequestRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('createRequest', 'bankAccountId', bankAccountId)
            // verify required parameter 'paymentsCreateRequestRequest' is not null or undefined
            assertParamExists('createRequest', 'paymentsCreateRequestRequest', paymentsCreateRequestRequest)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}/payments`
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
                requestBody: paymentsCreateRequestRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/bank/accounts/{bank-account-id}/payments',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(paymentsCreateRequestRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Yields an admission.
         * @summary Get payment admission
         * @param {string} admissionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAdmission: async (admissionId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'admissionId' is not null or undefined
            assertParamExists('getAdmission', 'admissionId', admissionId)
            const localVarPath = `/v0/admissions/{admission-id}`
                .replace(`{${"admission-id"}}`, encodeURIComponent(String(admissionId !== undefined ? admissionId : `-admission-id-`)));
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
                pathTemplate: '/v0/admissions/{admission-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists payments made from a bank account.
         * @summary List bank account payments
         * @param {string} bankAccountId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [filterCreatedAtLte] Return only resources with a created-at less than or equal to the given timestamp.
         * @param {string} [filterCreatedAtLt] Return only resources with a created-at less than the given timestamp.
         * @param {string} [filterCreatedAtGte] Return only resources with a created-at greater than or equal to the given timestamp.
         * @param {string} [filterCreatedAtGt] Return only resources with a created-at greater than the given timestamp.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBankAccountPayments: async (bankAccountId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageBefore?: string, pageAfter?: string, filterCreatedAtLte?: string, filterCreatedAtLt?: string, filterCreatedAtGte?: string, filterCreatedAtGt?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('getBankAccountPayments', 'bankAccountId', bankAccountId)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}/payments`
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
                pathTemplate: '/v0/bank/accounts/{bank-account-id}/payments',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Yields payment details
         * @summary Get payment
         * @param {string} paymentId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDetails: async (paymentId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            assertParamExists('getDetails', 'paymentId', paymentId)
            const localVarPath = `/v0/payments/{payment-id}`
                .replace(`{${"payment-id"}}`, encodeURIComponent(String(paymentId !== undefined ? paymentId : `-payment-id-`)));
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
                pathTemplate: '/v0/payments/{payment-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Yields a submission.
         * @summary Get payment submission
         * @param {string} submissionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSubmission: async (submissionId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'submissionId' is not null or undefined
            assertParamExists('getSubmission', 'submissionId', submissionId)
            const localVarPath = `/v0/submissions/{submission-id}`
                .replace(`{${"submission-id"}}`, encodeURIComponent(String(submissionId !== undefined ? submissionId : `-submission-id-`)));
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
                pathTemplate: '/v0/submissions/{submission-id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists admissions for a payment. A payment may have at most one admission.
         * @summary List payment admissions
         * @param {string} paymentId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAdmissions: async (paymentId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            assertParamExists('listAdmissions', 'paymentId', paymentId)
            const localVarPath = `/v0/payments/{payment-id}/admissions`
                .replace(`{${"payment-id"}}`, encodeURIComponent(String(paymentId !== undefined ? paymentId : `-payment-id-`)));
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
                pathTemplate: '/v0/payments/{payment-id}/admissions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists admissions targeting a bank account
         * @summary List bank account admissions
         * @param {string} bankAccountId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [filterCreatedAtLte] Return only resources with a created-at less than or equal to the given timestamp.
         * @param {string} [filterCreatedAtLt] Return only resources with a created-at less than the given timestamp.
         * @param {string} [filterCreatedAtGte] Return only resources with a created-at greater than or equal to the given timestamp.
         * @param {string} [filterCreatedAtGt] Return only resources with a created-at greater than the given timestamp.
         * @param {Array<'processing' | 'returned' | 'delivered'>} [filterAdmissionStatusIn] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listBankAccountAdmissions: async (bankAccountId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageBefore?: string, pageAfter?: string, filterCreatedAtLte?: string, filterCreatedAtLt?: string, filterCreatedAtGte?: string, filterCreatedAtGt?: string, filterAdmissionStatusIn?: Array<'processing' | 'returned' | 'delivered'>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('listBankAccountAdmissions', 'bankAccountId', bankAccountId)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}/admissions`
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

            if (filterAdmissionStatusIn) {
                localVarQueryParameter['filter[admission-status][in]'] = filterAdmissionStatusIn.join(COLLECTION_FORMATS.csv);
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/bank/accounts/{bank-account-id}/admissions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists submissions originating from a bank account
         * @summary List bank account submissions
         * @param {string} bankAccountId 
         * @param {'-created-at' | 'created-at'} [sort] 
         * @param {number} [pageSize] 
         * @param {string} [pageBefore] A base64 encoded opaque string returned in paginated responses.
         * @param {string} [pageAfter] A base64 encoded opaque string returned in paginated responses.
         * @param {Array<'failed' | 'processing' | 'returned' | 'delivered'>} [filterSubmissionStatusIn] 
         * @param {string} [filterCreatedAtLte] Return only resources with a created-at less than or equal to the given timestamp.
         * @param {string} [filterCreatedAtLt] Return only resources with a created-at less than the given timestamp.
         * @param {string} [filterCreatedAtGte] Return only resources with a created-at greater than or equal to the given timestamp.
         * @param {string} [filterCreatedAtGt] Return only resources with a created-at greater than the given timestamp.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listSubmissions: async (bankAccountId: string, sort?: '-created-at' | 'created-at', pageSize?: number, pageBefore?: string, pageAfter?: string, filterSubmissionStatusIn?: Array<'failed' | 'processing' | 'returned' | 'delivered'>, filterCreatedAtLte?: string, filterCreatedAtLt?: string, filterCreatedAtGte?: string, filterCreatedAtGt?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bankAccountId' is not null or undefined
            assertParamExists('listSubmissions', 'bankAccountId', bankAccountId)
            const localVarPath = `/v0/bank/accounts/{bank-account-id}/submissions`
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

            if (filterSubmissionStatusIn) {
                localVarQueryParameter['filter[submission-status][in]'] = filterSubmissionStatusIn.join(COLLECTION_FORMATS.csv);
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
                pathTemplate: '/v0/bank/accounts/{bank-account-id}/submissions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists submissions for a payment. The presence of a submission means that the payment has been submitted.
         * @summary List payment submissions
         * @param {string} paymentId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listSubmissions_1: async (paymentId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            assertParamExists('listSubmissions_1', 'paymentId', paymentId)
            const localVarPath = `/v0/payments/{payment-id}/submissions`
                .replace(`{${"payment-id"}}`, encodeURIComponent(String(paymentId !== undefined ? paymentId : `-payment-id-`)));
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
                pathTemplate: '/v0/payments/{payment-id}/submissions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Submits a previously created payment for execution.
         * @summary Submit payment
         * @param {string} paymentId 
         * @param {PaymentsSubmitPaymentSubmissionRequest} paymentsSubmitPaymentSubmissionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        submitPaymentSubmission: async (paymentId: string, paymentsSubmitPaymentSubmissionRequest: PaymentsSubmitPaymentSubmissionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            assertParamExists('submitPaymentSubmission', 'paymentId', paymentId)
            // verify required parameter 'paymentsSubmitPaymentSubmissionRequest' is not null or undefined
            assertParamExists('submitPaymentSubmission', 'paymentsSubmitPaymentSubmissionRequest', paymentsSubmitPaymentSubmissionRequest)
            const localVarPath = `/v0/payments/{payment-id}/submissions`
                .replace(`{${"payment-id"}}`, encodeURIComponent(String(paymentId !== undefined ? paymentId : `-payment-id-`)));
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
                requestBody: paymentsSubmitPaymentSubmissionRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v0/payments/{payment-id}/submissions',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(paymentsSubmitPaymentSubmissionRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PaymentsApi - functional programming interface
 * @export
 */
export const PaymentsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PaymentsApiAxiosParamCreator(configuration)
    return {
        /**
         * Registers a new payment request for the bank account
         * @summary Create payment
         * @param {PaymentsApiCreateRequestRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRequest(requestParameters: PaymentsApiCreateRequestRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsCreateRequestResponse>> {
            const paymentsCreateRequestRequest: PaymentsCreateRequestRequest = {
                creditor: requestParameters.creditor,
                payment-amount: requestParameters.payment-amount,
                payment-reference: requestParameters.payment-reference
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createRequest(requestParameters.bankAccountId, paymentsCreateRequestRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Yields an admission.
         * @summary Get payment admission
         * @param {PaymentsApiGetAdmissionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAdmission(requestParameters: PaymentsApiGetAdmissionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsGetAdmissionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAdmission(requestParameters.admissionId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Lists payments made from a bank account.
         * @summary List bank account payments
         * @param {PaymentsApiGetBankAccountPaymentsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBankAccountPayments(requestParameters: PaymentsApiGetBankAccountPaymentsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsGetBankAccountPaymentsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getBankAccountPayments(requestParameters.bankAccountId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageBefore, requestParameters.pageAfter, requestParameters.filterCreatedAtLte, requestParameters.filterCreatedAtLt, requestParameters.filterCreatedAtGte, requestParameters.filterCreatedAtGt, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Yields payment details
         * @summary Get payment
         * @param {PaymentsApiGetDetailsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDetails(requestParameters: PaymentsApiGetDetailsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsGetDetailsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getDetails(requestParameters.paymentId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Yields a submission.
         * @summary Get payment submission
         * @param {PaymentsApiGetSubmissionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSubmission(requestParameters: PaymentsApiGetSubmissionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsGetSubmissionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getSubmission(requestParameters.submissionId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Lists admissions for a payment. A payment may have at most one admission.
         * @summary List payment admissions
         * @param {PaymentsApiListAdmissionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAdmissions(requestParameters: PaymentsApiListAdmissionsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsListAdmissionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listAdmissions(requestParameters.paymentId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Lists admissions targeting a bank account
         * @summary List bank account admissions
         * @param {PaymentsApiListBankAccountAdmissionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listBankAccountAdmissions(requestParameters: PaymentsApiListBankAccountAdmissionsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsListBankAccountAdmissionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listBankAccountAdmissions(requestParameters.bankAccountId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageBefore, requestParameters.pageAfter, requestParameters.filterCreatedAtLte, requestParameters.filterCreatedAtLt, requestParameters.filterCreatedAtGte, requestParameters.filterCreatedAtGt, requestParameters.filterAdmissionStatusIn, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Lists submissions originating from a bank account
         * @summary List bank account submissions
         * @param {PaymentsApiListSubmissionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listSubmissions(requestParameters: PaymentsApiListSubmissionsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsListSubmissionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listSubmissions(requestParameters.bankAccountId, requestParameters.sort, requestParameters.pageSize, requestParameters.pageBefore, requestParameters.pageAfter, requestParameters.filterSubmissionStatusIn, requestParameters.filterCreatedAtLte, requestParameters.filterCreatedAtLt, requestParameters.filterCreatedAtGte, requestParameters.filterCreatedAtGt, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Lists submissions for a payment. The presence of a submission means that the payment has been submitted.
         * @summary List payment submissions
         * @param {PaymentsApiListSubmissions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listSubmissions_1(requestParameters: PaymentsApiListSubmissions0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsListSubmissions200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listSubmissions_1(requestParameters.paymentId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Submits a previously created payment for execution.
         * @summary Submit payment
         * @param {PaymentsApiSubmitPaymentSubmissionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async submitPaymentSubmission(requestParameters: PaymentsApiSubmitPaymentSubmissionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentsSubmitPaymentSubmissionResponse>> {
            const paymentsSubmitPaymentSubmissionRequest: PaymentsSubmitPaymentSubmissionRequest = {
                payment-scheme: requestParameters.payment-scheme
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.submitPaymentSubmission(requestParameters.paymentId, paymentsSubmitPaymentSubmissionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PaymentsApi - factory interface
 * @export
 */
export const PaymentsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PaymentsApiFp(configuration)
    return {
        /**
         * Registers a new payment request for the bank account
         * @summary Create payment
         * @param {PaymentsApiCreateRequestRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRequest(requestParameters: PaymentsApiCreateRequestRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsCreateRequestResponse> {
            return localVarFp.createRequest(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Yields an admission.
         * @summary Get payment admission
         * @param {PaymentsApiGetAdmissionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAdmission(requestParameters: PaymentsApiGetAdmissionRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsGetAdmissionResponse> {
            return localVarFp.getAdmission(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists payments made from a bank account.
         * @summary List bank account payments
         * @param {PaymentsApiGetBankAccountPaymentsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBankAccountPayments(requestParameters: PaymentsApiGetBankAccountPaymentsRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsGetBankAccountPaymentsResponse> {
            return localVarFp.getBankAccountPayments(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Yields payment details
         * @summary Get payment
         * @param {PaymentsApiGetDetailsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDetails(requestParameters: PaymentsApiGetDetailsRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsGetDetailsResponse> {
            return localVarFp.getDetails(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Yields a submission.
         * @summary Get payment submission
         * @param {PaymentsApiGetSubmissionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSubmission(requestParameters: PaymentsApiGetSubmissionRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsGetSubmissionResponse> {
            return localVarFp.getSubmission(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists admissions for a payment. A payment may have at most one admission.
         * @summary List payment admissions
         * @param {PaymentsApiListAdmissionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAdmissions(requestParameters: PaymentsApiListAdmissionsRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsListAdmissionsResponse> {
            return localVarFp.listAdmissions(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists admissions targeting a bank account
         * @summary List bank account admissions
         * @param {PaymentsApiListBankAccountAdmissionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listBankAccountAdmissions(requestParameters: PaymentsApiListBankAccountAdmissionsRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsListBankAccountAdmissionsResponse> {
            return localVarFp.listBankAccountAdmissions(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists submissions originating from a bank account
         * @summary List bank account submissions
         * @param {PaymentsApiListSubmissionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listSubmissions(requestParameters: PaymentsApiListSubmissionsRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsListSubmissionsResponse> {
            return localVarFp.listSubmissions(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Lists submissions for a payment. The presence of a submission means that the payment has been submitted.
         * @summary List payment submissions
         * @param {PaymentsApiListSubmissions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listSubmissions_1(requestParameters: PaymentsApiListSubmissions0Request, options?: AxiosRequestConfig): AxiosPromise<PaymentsListSubmissions200Response> {
            return localVarFp.listSubmissions_1(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Submits a previously created payment for execution.
         * @summary Submit payment
         * @param {PaymentsApiSubmitPaymentSubmissionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        submitPaymentSubmission(requestParameters: PaymentsApiSubmitPaymentSubmissionRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentsSubmitPaymentSubmissionResponse> {
            return localVarFp.submitPaymentSubmission(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createRequest operation in PaymentsApi.
 * @export
 * @interface PaymentsApiCreateRequestRequest
 */
export type PaymentsApiCreateRequestRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiCreateRequest
    */
    readonly bankAccountId: string
    
} & PaymentsCreateRequestRequest

/**
 * Request parameters for getAdmission operation in PaymentsApi.
 * @export
 * @interface PaymentsApiGetAdmissionRequest
 */
export type PaymentsApiGetAdmissionRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiGetAdmission
    */
    readonly admissionId: string
    
}

/**
 * Request parameters for getBankAccountPayments operation in PaymentsApi.
 * @export
 * @interface PaymentsApiGetBankAccountPaymentsRequest
 */
export type PaymentsApiGetBankAccountPaymentsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly bankAccountId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly pageBefore?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly pageAfter?: string
    
    /**
    * Return only resources with a created-at less than or equal to the given timestamp.
    * @type {string}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly filterCreatedAtLte?: string
    
    /**
    * Return only resources with a created-at less than the given timestamp.
    * @type {string}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly filterCreatedAtLt?: string
    
    /**
    * Return only resources with a created-at greater than or equal to the given timestamp.
    * @type {string}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly filterCreatedAtGte?: string
    
    /**
    * Return only resources with a created-at greater than the given timestamp.
    * @type {string}
    * @memberof PaymentsApiGetBankAccountPayments
    */
    readonly filterCreatedAtGt?: string
    
}

/**
 * Request parameters for getDetails operation in PaymentsApi.
 * @export
 * @interface PaymentsApiGetDetailsRequest
 */
export type PaymentsApiGetDetailsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiGetDetails
    */
    readonly paymentId: string
    
}

/**
 * Request parameters for getSubmission operation in PaymentsApi.
 * @export
 * @interface PaymentsApiGetSubmissionRequest
 */
export type PaymentsApiGetSubmissionRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiGetSubmission
    */
    readonly submissionId: string
    
}

/**
 * Request parameters for listAdmissions operation in PaymentsApi.
 * @export
 * @interface PaymentsApiListAdmissionsRequest
 */
export type PaymentsApiListAdmissionsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiListAdmissions
    */
    readonly paymentId: string
    
}

/**
 * Request parameters for listBankAccountAdmissions operation in PaymentsApi.
 * @export
 * @interface PaymentsApiListBankAccountAdmissionsRequest
 */
export type PaymentsApiListBankAccountAdmissionsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly bankAccountId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly pageBefore?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly pageAfter?: string
    
    /**
    * Return only resources with a created-at less than or equal to the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly filterCreatedAtLte?: string
    
    /**
    * Return only resources with a created-at less than the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly filterCreatedAtLt?: string
    
    /**
    * Return only resources with a created-at greater than or equal to the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly filterCreatedAtGte?: string
    
    /**
    * Return only resources with a created-at greater than the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly filterCreatedAtGt?: string
    
    /**
    * 
    * @type {Array<'processing' | 'returned' | 'delivered'>}
    * @memberof PaymentsApiListBankAccountAdmissions
    */
    readonly filterAdmissionStatusIn?: Array<'processing' | 'returned' | 'delivered'>
    
}

/**
 * Request parameters for listSubmissions operation in PaymentsApi.
 * @export
 * @interface PaymentsApiListSubmissionsRequest
 */
export type PaymentsApiListSubmissionsRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiListSubmissions
    */
    readonly bankAccountId: string
    
    /**
    * 
    * @type {'-created-at' | 'created-at'}
    * @memberof PaymentsApiListSubmissions
    */
    readonly sort?: '-created-at' | 'created-at'
    
    /**
    * 
    * @type {number}
    * @memberof PaymentsApiListSubmissions
    */
    readonly pageSize?: number
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PaymentsApiListSubmissions
    */
    readonly pageBefore?: string
    
    /**
    * A base64 encoded opaque string returned in paginated responses.
    * @type {string}
    * @memberof PaymentsApiListSubmissions
    */
    readonly pageAfter?: string
    
    /**
    * 
    * @type {Array<'failed' | 'processing' | 'returned' | 'delivered'>}
    * @memberof PaymentsApiListSubmissions
    */
    readonly filterSubmissionStatusIn?: Array<'failed' | 'processing' | 'returned' | 'delivered'>
    
    /**
    * Return only resources with a created-at less than or equal to the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListSubmissions
    */
    readonly filterCreatedAtLte?: string
    
    /**
    * Return only resources with a created-at less than the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListSubmissions
    */
    readonly filterCreatedAtLt?: string
    
    /**
    * Return only resources with a created-at greater than or equal to the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListSubmissions
    */
    readonly filterCreatedAtGte?: string
    
    /**
    * Return only resources with a created-at greater than the given timestamp.
    * @type {string}
    * @memberof PaymentsApiListSubmissions
    */
    readonly filterCreatedAtGt?: string
    
}

/**
 * Request parameters for listSubmissions_1 operation in PaymentsApi.
 * @export
 * @interface PaymentsApiListSubmissions0Request
 */
export type PaymentsApiListSubmissions0Request = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiListSubmissions0
    */
    readonly paymentId: string
    
}

/**
 * Request parameters for submitPaymentSubmission operation in PaymentsApi.
 * @export
 * @interface PaymentsApiSubmitPaymentSubmissionRequest
 */
export type PaymentsApiSubmitPaymentSubmissionRequest = {
    
    /**
    * 
    * @type {string}
    * @memberof PaymentsApiSubmitPaymentSubmission
    */
    readonly paymentId: string
    
} & PaymentsSubmitPaymentSubmissionRequest

/**
 * PaymentsApiGenerated - object-oriented interface
 * @export
 * @class PaymentsApiGenerated
 * @extends {BaseAPI}
 */
export class PaymentsApiGenerated extends BaseAPI {
    /**
     * Registers a new payment request for the bank account
     * @summary Create payment
     * @param {PaymentsApiCreateRequestRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public createRequest(requestParameters: PaymentsApiCreateRequestRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).createRequest(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Yields an admission.
     * @summary Get payment admission
     * @param {PaymentsApiGetAdmissionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public getAdmission(requestParameters: PaymentsApiGetAdmissionRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).getAdmission(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Lists payments made from a bank account.
     * @summary List bank account payments
     * @param {PaymentsApiGetBankAccountPaymentsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public getBankAccountPayments(requestParameters: PaymentsApiGetBankAccountPaymentsRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).getBankAccountPayments(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Yields payment details
     * @summary Get payment
     * @param {PaymentsApiGetDetailsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public getDetails(requestParameters: PaymentsApiGetDetailsRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).getDetails(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Yields a submission.
     * @summary Get payment submission
     * @param {PaymentsApiGetSubmissionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public getSubmission(requestParameters: PaymentsApiGetSubmissionRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).getSubmission(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Lists admissions for a payment. A payment may have at most one admission.
     * @summary List payment admissions
     * @param {PaymentsApiListAdmissionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public listAdmissions(requestParameters: PaymentsApiListAdmissionsRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).listAdmissions(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Lists admissions targeting a bank account
     * @summary List bank account admissions
     * @param {PaymentsApiListBankAccountAdmissionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public listBankAccountAdmissions(requestParameters: PaymentsApiListBankAccountAdmissionsRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).listBankAccountAdmissions(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Lists submissions originating from a bank account
     * @summary List bank account submissions
     * @param {PaymentsApiListSubmissionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public listSubmissions(requestParameters: PaymentsApiListSubmissionsRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).listSubmissions(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Lists submissions for a payment. The presence of a submission means that the payment has been submitted.
     * @summary List payment submissions
     * @param {PaymentsApiListSubmissions0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public listSubmissions_1(requestParameters: PaymentsApiListSubmissions0Request, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).listSubmissions_1(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Submits a previously created payment for execution.
     * @summary Submit payment
     * @param {PaymentsApiSubmitPaymentSubmissionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApiGenerated
     */
    public submitPaymentSubmission(requestParameters: PaymentsApiSubmitPaymentSubmissionRequest, options?: AxiosRequestConfig) {
        return PaymentsApiFp(this.configuration).submitPaymentSubmission(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
