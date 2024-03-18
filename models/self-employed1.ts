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
 * @interface SelfEmployed1
 */
export interface SelfEmployed1 {
    /**
     * Must be selected according to industry of occupation:  | industry of occupation | occupation | | ---------------------- | ---------- | | `marketing-advertising-and-pr` | `marketer` | |  | `fundraising-and-research` | |  | `sales-manager` | |  | `pr` | | `sales` | `sales` | |  | `customer-service` | |  | `exporter` | |  | `market-researcher` | |  | `importer` | |  | `buyer` | | `law` | `advocate` | |  | `solicitor` | |  | `judge` | |  | `clerk` | |  | `conveyancer` | |  | `barrister` | |  | `paralegal` | | `hospitality-and-events-management` | `butcher` | |  | `bar-manager` | |  | `caterer` | |  | `events-manager-or-organiser` | |  | `barista` | |  | `bartender` | |  | `restaurant-worker` | |  | `restaurant-owner` | |  | `chef` | |  | `fishmonger` | |  | `hotel-worker` | |  | `take-away-shop` | | `personal-care-and-lifestyle` | `nail-technician` | |  | `hairdresser` | |  | `salon-owner` | |  | `nutritionist` | |  | `aesthetician` | |  | `salon-manager` | |  | `sex-worker` | | `creative-arts-and-design` | `disc-jockey` | |  | `creative-director` | |  | `dancer` | |  | `illustrator` | |  | `graphic-designer` | |  | `interpreter-or-translator` | |  | `jewellery-designer` | |  | `tattoo-artist-or-piercer` | |  | `sound-engineer` | |  | `design-engineer` | |  | `set-and-production-designer` | |  | `fashion-stylist` | |  | `artist` | |  | `costumer` | |  | `musician` | |  | `adult-film-actor` | |  | `product-designer` | |  | `writer` | |  | `editor` | |  | `photographer` | |  | `choreographer` | |  | `copywriter` | |  | `clothing-designer` | |  | `film-director-or-producer-or-editor` | |  | `theatre-manager` | |  | `media-and-broadcasting` | |  | `actor` | | `information-technology` | `web-designer` | |  | `software-engineer` | |  | `hardware-engineer` | |  | `software-tester` | | `environment-and-agriculture` | `street-cleaner` | |  | `racehorse-trainer` | |  | `scrap-metal-dealer` | |  | `farmer` | |  | `public-health-inspection` | |  | `environmental-health-officer` | |  | `forest-manager` | |  | `conservation-worker` | |  | `food-inspector` | |  | `florist` | |  | `refuse-disposal` | | `media-and-internet` | `social-media-influencer` | |  | `printer` | |  | `journalist` | |  | `blogger` | |  | `publisher` | |  | `adult-content-creator` | |  | `editor` | | `healthcare` | `optician` | |  | `chief-medical-officer` | |  | `doctor-or-surgeon` | |  | `veterinary-nurse` | |  | `massage-therapist` | |  | `health-manager` | |  | `psychiatrist-or-therapist-or-psychologist` | |  | `veterinarian` | |  | `dietician` | |  | `physiotherapist` | |  | `nurse` | |  | `paramedic` | |  | `sports-therapist` | |  | `dentist` | |  | `speech-and-language-therapist` | |  | `alternative-and-complementary-medicine-practitioner` | | `property-and-construction` | `handyperson` | |  | `construction-worker` | |  | `architect` | |  | `landlord` | |  | `electrician` | |  | `builder` | |  | `carpenter` | |  | `plasterer` | |  | `building-services-manager` | |  | `joiner` | |  | `landscaper-or-groundsperson` | |  | `structural-engineer` | |  | `bricklayer` | |  | `plumber` | |  | `painter` | |  | `facilities-manager` | |  | `property-manager` | |  | `letting-agent` | |  | `construction-manager` | |  | `roofer` | |  | `surveyor` | |  | `estate-agent` | |  | `site-engineer` | | `public-services-and-administration` | `civil-servant` | |  | `policy-adviser` | |  | `politician` | | `law-enforcement-and-security` | `customs-officer` | |  | `police-officer` | |  | `probation-office` | |  | `forensic-psychologist` | |  | `firefighter` | |  | `security-guard` | |  | `prison-services-professional` | |  | `crime-analyst` | | `engineering-and-manufacturing` | `apparel-and-fashion-professional` | |  | `avionics` | |  | `civil-engineer` | |  | `mechanical-engineer` | |  | `aviation-and-mechanical-technician` | |  | `metal-worker` | |  | `electrical-engineer` | |  | `industrial-engineer` | |  | `metal-and-steel-worker` | |  | `glass-and-glazing-professional` | |  | `precision-instrument-worker` | |  | `manufacturing-operations` | |  | `quality-professional` | |  | `chemical-engineer` | | `energy-and-utilities` | `boilerman` | |  | `sewage-works-plant-operator` | |  | `quarry-manager` | |  | `water-and-energy-engineer` | |  | `electricity-supplier-plant-operator` | |  | `electricity-supplier-installation-engineer` | |  | `miner` | |  | `drilling-engineer` | |  | `water-treatment-controller` | | `recruitment-and-hr` | `careers-adviser` | |  | `talent-manager` | |  | `recruiter` | |  | `people-operations` | | `teacher-training-and-education` | `lecturer-or-professor` | |  | `teacher` | |  | `dance-teacher` | |  | `librarian` | |  | `teaching-assistant` | |  | `school-inspector` | |  | `curator` | |  | `conservator` | |  | `special-needs-coordinator` | |  | `education-officer` | |  | `archivist` | |  | `educational-establishment-administrator` | |  | `driving-instructor` | |  | `nanny-or-au-pair-or-child-minder` | | `leisure-sport-and-tourism` | `airport-worker` | |  | `pilot-or-flight-attendant` | |  | `professional-athlete` | |  | `travel-agency-owner` | |  | `personal-trainer` | | `business-consulting-and-management` | `entrepreneur` | |  | `compliance-manager` | |  | `management-consultant` | |  | `project-manager` | |  | `office-manager` | |  | `product-manager` | |  | `personal-assistant-or-secretary` | | `charity-and-not-for-profit-organizations` | `fundraiser-or-development-officer` | |  | `senior-management` | |  | `advocacy-officer-or-policy-analyst-or-campaign-manager` | | `transport-and-logistics` | `warehouse-worker` | |  | `taxi-driver` | |  | `transport-manager` | |  | `supply-chain-manager` | |  | `long-haul-trucker` | |  | `warehouse-manager` | |  | `bus-driver` | |  | `delivery-person` | | `science-and-pharmaceuticals` | `scientist` | |  | `researcher` | |  | `technician` | |  | `chemist` | |  | `pharmacy-manager` | |  | `pharmacist` | |  | `pharmaceutical-manufacturer` | | `social-care` | `drugs-and-alcohol-counsellor` | |  | `psychiatric-social-worker` | |  | `social-services-manager` | |  | `care-manager` | |  | `day-centre-manager` | |  | `childrens-guardian` | |  | `social-worker` | |  | `youth-worker` | |  | `foster-carer` | |  | `rehabilitation-officer` | |  | `nursing-home-owner` | |  | `welfare-services-counsellor` | | `accountancy-banking-and-finance` | `stockbroker` | |  | `finance-director` | |  | `stock-trader` | |  | `debt-advisor` | |  | `book-keeper` | |  | `chief-financial-officer` | |  | `tax-advisor` | |  | `investment-advisor` | |  | `accountant` | |  | `mortgage-advisor` | |  | `auditor` | |  | `hedge-fund-manager` | |  | `foreign-exchange-dealer` | |  | `banker` | |  | `financial-advisor` | |  | `relationship-manager` | |  | `insurance-manager` | | `retail-and-wholesale` | `wholesale-manager` | |  | `shop-owner` | |  | `retail-trade-manager` | |  | `betting-shop-manager` | |  | `newsagent` | |  | `shopkeeper` | |  | `antiques-dealer` | |  | `betting-shop-owner` | |  | `fashion-retailer` | |  | `purchaser` | |  | `car-dealer` | | `social-and-humanities-scientists` | `geographer` | |  | `epidemiologist` | |  | `archaeologist` | |  | `criminologist` | |  | `social-scientist` | |  | `political-scientist` | |  | `historian` | |  | `anthropologist` | 
     * @type {string}
     * @memberof SelfEmployed1
     */
    'occupation': string;
    /**
     * 
     * @type {string}
     * @memberof SelfEmployed1
     */
    'industry-of-occupation': SelfEmployed1IndustryOfOccupationEnum;
    /**
     * 
     * @type {string}
     * @memberof SelfEmployed1
     */
    'employment-status': SelfEmployed1EmploymentStatusEnum;
}

type SelfEmployed1IndustryOfOccupationEnum = 'property-and-construction' | 'recruitment-and-hr' | 'creative-arts-and-design' | 'healthcare' | 'teacher-training-and-education' | 'engineering-and-manufacturing' | 'business-consulting-and-management' | 'leisure-sport-and-tourism' | 'transport-and-logistics' | 'charity-and-not-for-profit-organizations' | 'social-and-humanities-scientists' | 'science-and-pharmaceuticals' | 'retail-and-wholesale' | 'social-care' | 'accountancy-banking-and-finance' | 'marketing-advertising-and-pr' | 'law' | 'hospitality-and-events-management' | 'sales' | 'environment-and-agriculture' | 'media-and-internet' | 'personal-care-and-lifestyle' | 'information-technology' | 'law-enforcement-and-security' | 'public-services-and-administration' | 'energy-and-utilities'
type SelfEmployed1EmploymentStatusEnum = 'self-employed'


