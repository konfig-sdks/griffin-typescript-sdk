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


/**
 * 
 * @export
 * @interface PersonWithSignificantControl4
 */
export interface PersonWithSignificantControl4 {
    /**
     * A human readable label for an entity
     * @type {string}
     * @memberof PersonWithSignificantControl4
     */
    'display-name': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof PersonWithSignificantControl4
     */
    'natures-of-control': Array<PersonWithSignificantControl4NaturesOfControlEnum>;
    /**
     * The URL of the entity in Companies House
     * @type {string}
     * @memberof PersonWithSignificantControl4
     */
    'companies-house-url': string;
    /**
     * 
     * @type {string}
     * @memberof PersonWithSignificantControl4
     */
    'given-name'?: string;
    /**
     * 
     * @type {string}
     * @memberof PersonWithSignificantControl4
     */
    'surname'?: string;
    /**
     * 
     * @type {number}
     * @memberof PersonWithSignificantControl4
     */
    'day-of-birth'?: number;
    /**
     * 
     * @type {number}
     * @memberof PersonWithSignificantControl4
     */
    'month-of-birth'?: number;
    /**
     * 
     * @type {number}
     * @memberof PersonWithSignificantControl4
     */
    'year-of-birth'?: number;
}

type PersonWithSignificantControl4NaturesOfControlEnum = 'voting-rights-25-to-50-percent-limited-liability-partnership' | 'right-to-appoint-and-remove-members-limited-liability-partnership' | 'part-right-to-share-surplus-assets-75-to-100-percent-as-trust' | 'ownership-of-shares-more-than-25-percent-registered-overseas-entity' | 'part-right-to-share-surplus-assets-50-to-75-percent-as-trust' | 'significant-influence-or-control-as-firm-limited-liability-partnership' | 'part-right-to-share-surplus-assets-25-to-50-percent-as-firm' | 'ownership-of-shares-25-to-50-percent-as-trust' | 'ownership-of-shares-more-than-25-percent-as-firm-registered-overseas-entity' | 'voting-rights-25-to-50-percent' | 'voting-rights-25-to-50-percent-as-firm' | 'ownership-of-shares-more-than-25-percent-as-trust-registered-overseas-entity' | 'significant-influence-or-control' | 'significant-influence-or-control-registered-overseas-entity' | 'part-right-to-share-surplus-assets-50-to-75-percent-as-firm' | 'voting-rights-50-to-75-percent' | 'part-right-to-share-surplus-assets-25-to-50-percent' | 'voting-rights-50-to-75-percent-as-trust' | 'right-to-share-surplus-assets-75-to-100-percent-as-firm-limited-liability-partnership' | 'right-to-appoint-and-remove-person-as-trust' | 'ownership-of-shares-50-to-75-percent-as-firm' | 'voting-rights-50-to-75-percent-as-firm-limited-liability-partnership' | 'voting-rights-25-to-50-percent-as-trust' | 'voting-rights-50-to-75-percent-as-trust-limited-liability-partnership' | 'voting-rights-75-to-100-percent' | 'part-right-to-share-surplus-assets-75-to-100-percent-as-firm' | 'significant-influence-or-control-limited-liability-partnership' | 'right-to-share-surplus-assets-75-to-100-percent-limited-liability-partnership' | 'right-to-appoint-and-remove-directors-as-firm' | 'voting-rights-75-to-100-percent-as-trust' | 'voting-rights-25-to-50-percent-as-firm-limited-liability-partnership' | 'right-to-appoint-and-remove-directors-as-firm-registered-overseas-entity' | 'right-to-share-surplus-assets-25-to-50-percent-as-firm-limited-liability-partnership' | 'ownership-of-shares-25-to-50-percent' | 'ownership-of-shares-75-to-100-percent-as-firm' | 'significant-influence-or-control-as-firm' | 'right-to-appoint-and-remove-directors-as-trust' | 'right-to-appoint-and-remove-person' | 'significant-influence-or-control-as-trust-registered-overseas-entity' | 'voting-rights-more-than-25-percent-as-trust-registered-overseas-entity' | 'right-to-appoint-and-remove-directors-as-trust-registered-overseas-entity' | 'right-to-appoint-and-remove-members-as-firm-limited-liability-partnership' | 'part-right-to-share-surplus-assets-75-to-100-percent' | 'ownership-of-shares-25-to-50-percent-as-firm' | 'right-to-share-surplus-assets-25-to-50-percent-as-trust-limited-liability-partnership' | 'right-to-share-surplus-assets-50-to-75-percent-limited-liability-partnership' | 'voting-rights-50-to-75-percent-as-firm' | 'part-right-to-share-surplus-assets-50-to-75-percent' | 'right-to-appoint-and-remove-directors-registered-overseas-entity' | 'significant-influence-or-control-as-trust' | 'right-to-share-surplus-assets-75-to-100-percent-as-trust-limited-liability-partnership' | 'ownership-of-shares-50-to-75-percent-as-trust' | 'right-to-share-surplus-assets-50-to-75-percent-as-firm-limited-liability-partnership' | 'voting-rights-more-than-25-percent-as-firm-registered-overseas-entity' | 'significant-influence-or-control-as-firm-registered-overseas-entity' | 'ownership-of-shares-75-to-100-percent-as-trust' | 'ownership-of-shares-50-to-75-percent' | 'right-to-share-surplus-assets-50-to-75-percent-as-trust-limited-liability-partnership' | 'voting-rights-75-to-100-percent-limited-liability-partnership' | 'voting-rights-more-than-25-percent-registered-overseas-entity' | 'right-to-appoint-and-remove-members-as-trust-limited-liability-partnership' | 'ownership-of-shares-75-to-100-percent' | 'part-right-to-share-surplus-assets-25-to-50-percent-as-trust' | 'voting-rights-75-to-100-percent-as-trust-limited-liability-partnership' | 'voting-rights-50-to-75-percent-limited-liability-partnership' | 'significant-influence-or-control-as-trust-limited-liability-partnership' | 'voting-rights-75-to-100-percent-as-firm-limited-liability-partnership' | 'right-to-appoint-and-remove-person-as-firm' | 'right-to-appoint-and-remove-directors' | 'voting-rights-25-to-50-percent-as-trust-limited-liability-partnership' | 'voting-rights-75-to-100-percent-as-firm' | 'right-to-share-surplus-assets-25-to-50-percent-limited-liability-partnership'


