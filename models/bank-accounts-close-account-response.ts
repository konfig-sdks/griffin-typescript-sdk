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
import type * as buffer from "buffer"

import { AccountBalanceProperty2 } from './account-balance-property2';
import { AvailableBalanceProperty2 } from './available-balance-property2';
import { BankAddress2 } from './bank-address2';

/**
 * 
 * @export
 * @interface BankAccountsCloseAccountResponse
 */
export interface BankAccountsCloseAccountResponse {
    /**
     * Link to the [payment submissions](http://docs.griffin.com) debiting from this account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-submissions-url': string;
    /**
     * Specifies whether the bank account has restrictions applied by Griffin.
     * @type {boolean}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-restricted': boolean;
    /**
     * Link to the [payments](http://docs.griffin.com) associated with this account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-payments-url': string;
    /**
     * Link to the list of [pool members](http://docs.griffin.com) associated with this account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'pooled-account-memberships-url'?: string;
    /**
     * Link to the [payment admissions](http://docs.griffin.com) crediting to this account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-admissions-url': string;
    /**
     * Specifies the type of bank account. (For more detail on bank account types, see our guide for [creating a bank account](http://docs.griffin.com).)
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'bank-product-type': BankAccountsCloseAccountResponseBankProductTypeEnum;
    /**
     * The mutable display name for the bank account
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'display-name': string;
    /**
     * Link to the [legal person](http://docs.griffin.com) that represents the [controller](http://docs.griffin.com) of the account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'controller-url': string;
    /**
     * Specifies whether the bank account holds funds belonging to multiple beneficiaries.
     * @type {boolean}
     * @memberof BankAccountsCloseAccountResponse
     */
    'pooled-funds': boolean;
    /**
     * Shows the status of the account. An account can be moved between statuses during its lifecycle. The status value affects the operations that you can perform. An account must be `\"open\"` to be fully operational.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-status': BankAccountsCloseAccountResponseAccountStatusEnum;
    /**
     * Specifies the type of client money account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'client-money-type'?: BankAccountsCloseAccountResponseClientMoneyTypeEnum;
    /**
     * Link to the [legal person](http://docs.griffin.com) that represents the [owner](http://docs.griffin.com) of the account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'owner-url': string;
    /**
     * ISO 8601 formatted date-time.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'created-at': string;
    /**
     * Link to the endpoint that enables account closure for this account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'close-account-url': string;
    /**
     * 
     * @type {AvailableBalanceProperty2}
     * @memberof BankAccountsCloseAccountResponse
     */
    'available-balance': AvailableBalanceProperty2;
    /**
     * Link to manage [pooled account membership](http://docs.griffin.com).
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'pooled-account-membership-updates-url'?: string;
    /**
     * Shows a collection of public addresses which uniquely identify the account. Any one of these can be used to pay into the account.
     * @type {Array<BankAddress2>}
     * @memberof BankAccountsCloseAccountResponse
     */
    'bank-addresses'?: Array<BankAddress2>;
    /**
     * Link to the [transactions](http://docs.griffin.com) associated with this account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-transactions-url': string;
    /**
     * Link to the bank account resource.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-url': string;
    /**
     * Link to the [legal person](http://docs.griffin.com) that represents the [beneficiary](http://docs.griffin.com) of the account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'beneficiary-url'?: string;
    /**
     * 
     * @type {AccountBalanceProperty2}
     * @memberof BankAccountsCloseAccountResponse
     */
    'account-balance': AccountBalanceProperty2;
    /**
     * Specifies the type of savings account.
     * @type {string}
     * @memberof BankAccountsCloseAccountResponse
     */
    'savings-type'?: BankAccountsCloseAccountResponseSavingsTypeEnum;
}

type BankAccountsCloseAccountResponseBankProductTypeEnum = 'savings-account' | 'client-money-account' | 'safeguarding-account' | 'operational-account'
type BankAccountsCloseAccountResponseAccountStatusEnum = 'closing' | 'open' | 'closed' | 'opening'
type BankAccountsCloseAccountResponseClientMoneyTypeEnum = 'designated-client-fund' | 'designated-client-money' | 'general-client-money'
type BankAccountsCloseAccountResponseSavingsTypeEnum = 'easy-access'


