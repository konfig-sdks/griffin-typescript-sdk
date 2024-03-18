type Parameter = {
    name: string
}
type Entry = {
    parameters: Parameter[]
}
export const operationParameterMap: Record<string, Entry> = {
    '/v0/organizations/{organization-id}/api-keys-POST': {
        parameters: [
            {
                name: 'api-key-name'
            },
            {
                name: 'organization-id'
            },
        ]
    },
    '/v0/api-keys/{api-key-id}-GET': {
        parameters: [
            {
                name: 'api-key-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/api-keys-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/users/{user-id}/api-keys-GET': {
        parameters: [
            {
                name: 'user-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/api-keys/{api-key-id}-DELETE': {
        parameters: [
            {
                name: 'api-key-id'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/actions/close-POST': {
        parameters: [
            {
                name: 'bank-account-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/bank/accounts-POST': {
        parameters: [
            {
                name: 'bank-product-type'
            },
            {
                name: 'organization-id'
            },
            {
                name: 'owner-url'
            },
            {
                name: 'savings-type'
            },
            {
                name: 'display-name'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}-GET': {
        parameters: [
            {
                name: 'bank-account-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/bank/accounts-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
            {
                name: 'filter[beneficiary][eq]'
            },
            {
                name: 'filter[owner][eq]'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'include'
            },
            {
                name: 'filter[account-status][in][]'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'filter[account-restricted][in][]'
            },
            {
                name: 'filter[pooled-funds][eq]'
            },
            {
                name: 'filter[bank-product-type][in][]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}-PATCH': {
        parameters: [
            {
                name: 'display-name'
            },
            {
                name: 'bank-account-id'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/claims-POST': {
        parameters: [
            {
                name: 'claim-type'
            },
            {
                name: 'legal-person-id'
            },
            {
                name: 'mobile-number'
            },
            {
                name: 'date-of-birth'
            },
            {
                name: 'given-name'
            },
            {
                name: 'surname'
            },
            {
                name: 'middle-name'
            },
            {
                name: 'trading-name'
            },
            {
                name: 'trading-address'
            },
            {
                name: 'email-address'
            },
            {
                name: 'city'
            },
            {
                name: 'building-name'
            },
            {
                name: 'street-name'
            },
            {
                name: 'entity-name'
            },
            {
                name: 'postal-code'
            },
            {
                name: 'corporation-type'
            },
            {
                name: 'telephone-number'
            },
            {
                name: 'building-number'
            },
            {
                name: 'country-code'
            },
            {
                name: 'date-of-incorporation'
            },
            {
                name: 'entity-registration-number'
            },
            {
                name: 'income'
            },
            {
                name: 'initial-deposit'
            },
            {
                name: 'international-payments-countries'
            },
            {
                name: 'legal-person-url'
            },
            {
                name: 'ownership-percent'
            },
            {
                name: 'companies-house-url'
            },
            {
                name: 'senior-manager?'
            },
            {
                name: 'tax-residency'
            },
            {
                name: 'uk-regulatory-permissions'
            },
            {
                name: 'business-description'
            },
            {
                name: 'individual-sources-of-funds'
            },
            {
                name: 'business-address'
            },
            {
                name: 'annual-turnover'
            },
            {
                name: 'purposes-of-account'
            },
            {
                name: 'sic-codes'
            },
            {
                name: 'international-operations-countries'
            },
            {
                name: 'sources-of-funds'
            },
            {
                name: 'reliance-verification-methods'
            },
            {
                name: 'reliance-verification-standard'
            },
            {
                name: 'business-name'
            },
            {
                name: 'individual-purposes-of-account'
            },
            {
                name: 'nationality'
            },
            {
                name: 'social-media'
            },
            {
                name: 'website-url'
            },
            {
                name: 'tax-identification-number'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/claims-GET': {
        parameters: [
            {
                name: 'legal-person-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/companies-house/companies/{company-number}-GET': {
        parameters: [
            {
                name: 'company-number'
            },
        ]
    },
    '/v0/ping-GET': {
        parameters: [
        ]
    },
    '/v0/legal-persons/{legal-person-id}/decisions-POST': {
        parameters: [
            {
                name: 'verification-url'
            },
            {
                name: 'decision-outcome'
            },
            {
                name: 'decision-notes'
            },
            {
                name: 'legal-person-id'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/decisions-GET': {
        parameters: [
            {
                name: 'legal-person-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/organizations/{organization-id}/events-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[before]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'filter[event-type][eq]'
            },
            {
                name: 'filter[created-at][lte]'
            },
            {
                name: 'filter[created-at][lt]'
            },
            {
                name: 'filter[created-at][gte]'
            },
            {
                name: 'filter[created-at][gt]'
            },
        ]
    },
    '/v0/events/{event-id}-GET': {
        parameters: [
            {
                name: 'event-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/invitations-POST': {
        parameters: [
            {
                name: 'email-address'
            },
            {
                name: 'organization-id'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/history-GET': {
        parameters: [
            {
                name: 'legal-person-id'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/organizations/{organization-id}/legal-persons-POST': {
        parameters: [
            {
                name: 'display-name'
            },
            {
                name: 'legal-person-type'
            },
            {
                name: 'organization-id'
            },
            {
                name: 'claims'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}-GET': {
        parameters: [
            {
                name: 'legal-person-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/legal-persons-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'include'
            },
            {
                name: 'filter[application-status][eq]'
            },
            {
                name: 'filter[has][]'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}-PUT': {
        parameters: [
            {
                name: 'display-name'
            },
            {
                name: 'legal-person-id'
            },
        ]
    },
    '/v0/memberships/{membership-id}-GET': {
        parameters: [
            {
                name: 'membership-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/memberships-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/users/{user-id}/memberships-GET': {
        parameters: [
            {
                name: 'user-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/memberships/{membership-id}-DELETE': {
        parameters: [
            {
                name: 'membership-id'
            },
        ]
    },
    '/v0/index-GET': {
        parameters: [
        ]
    },
    '/v0/organizations/{organization-id}-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
        ]
    },
    '/v0/payees/{payee-id}-GET': {
        parameters: [
            {
                name: 'payee-id'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/bank/payees-GET': {
        parameters: [
            {
                name: 'legal-person-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/bank/payees-POST': {
        parameters: [
            {
                name: 'account-holder'
            },
            {
                name: 'account-number'
            },
            {
                name: 'bank-id'
            },
            {
                name: 'legal-person-id'
            },
        ]
    },
    '/v0/payees/{payee-id}-PATCH': {
        parameters: [
            {
                name: 'payee-status'
            },
            {
                name: 'payee-id'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/payments-POST': {
        parameters: [
            {
                name: 'creditor'
            },
            {
                name: 'payment-amount'
            },
            {
                name: 'bank-account-id'
            },
            {
                name: 'payment-reference'
            },
        ]
    },
    '/v0/admissions/{admission-id}-GET': {
        parameters: [
            {
                name: 'admission-id'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/payments-GET': {
        parameters: [
            {
                name: 'bank-account-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[before]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'filter[created-at][lte]'
            },
            {
                name: 'filter[created-at][lt]'
            },
            {
                name: 'filter[created-at][gte]'
            },
            {
                name: 'filter[created-at][gt]'
            },
        ]
    },
    '/v0/payments/{payment-id}-GET': {
        parameters: [
            {
                name: 'payment-id'
            },
        ]
    },
    '/v0/submissions/{submission-id}-GET': {
        parameters: [
            {
                name: 'submission-id'
            },
        ]
    },
    '/v0/payments/{payment-id}/admissions-GET': {
        parameters: [
            {
                name: 'payment-id'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/admissions-GET': {
        parameters: [
            {
                name: 'bank-account-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[before]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'filter[created-at][lte]'
            },
            {
                name: 'filter[created-at][lt]'
            },
            {
                name: 'filter[created-at][gte]'
            },
            {
                name: 'filter[created-at][gt]'
            },
            {
                name: 'filter[admission-status][in]'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/submissions-GET': {
        parameters: [
            {
                name: 'bank-account-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[before]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'filter[submission-status][in]'
            },
            {
                name: 'filter[created-at][lte]'
            },
            {
                name: 'filter[created-at][lt]'
            },
            {
                name: 'filter[created-at][gte]'
            },
            {
                name: 'filter[created-at][gt]'
            },
        ]
    },
    '/v0/payments/{payment-id}/submissions-GET': {
        parameters: [
            {
                name: 'payment-id'
            },
        ]
    },
    '/v0/payments/{payment-id}/submissions-POST': {
        parameters: [
            {
                name: 'payment-id'
            },
            {
                name: 'payment-scheme'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/membership-GET': {
        parameters: [
            {
                name: 'bank-account-id'
            },
            {
                name: 'include'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/membership-updates-POST': {
        parameters: [
            {
                name: 'additions'
            },
            {
                name: 'deletions'
            },
            {
                name: 'bank-account-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/onboarding/applications-POST': {
        parameters: [
            {
                name: 'workflow-url'
            },
            {
                name: 'subject-profile'
            },
            {
                name: 'organization-id'
            },
            {
                name: 'related-profiles'
            },
        ]
    },
    '/v0/onboarding/applications/{onboarding-application-id}-GET': {
        parameters: [
            {
                name: 'onboarding-application-id'
            },
        ]
    },
    '/v0/memberships/{membership-id}/roles-PUT': {
        parameters: [
            {
                name: 'role-urls'
            },
            {
                name: 'membership-id'
            },
        ]
    },
    '/v0/memberships/{membership-id}/roles-GET': {
        parameters: [
            {
                name: 'membership-id'
            },
        ]
    },
    '/v0/roles/{role-id}-GET': {
        parameters: [
            {
                name: 'role-id'
            },
        ]
    },
    '/v0/roles-GET': {
        parameters: [
        ]
    },
    '/v0/bank/transactions/{transaction-id}-GET': {
        parameters: [
            {
                name: 'transaction-id'
            },
        ]
    },
    '/v0/bank/accounts/{bank-account-id}/transactions-GET': {
        parameters: [
            {
                name: 'bank-account-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[before]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'include'
            },
            {
                name: 'filter[post-datetime][lte]'
            },
            {
                name: 'filter[post-datetime][lt]'
            },
            {
                name: 'filter[post-datetime][gte]'
            },
            {
                name: 'filter[post-datetime][gt]'
            },
        ]
    },
    '/v0/users/{user-id}-GET': {
        parameters: [
            {
                name: 'user-id'
            },
        ]
    },
    '/v0/verifications/{verification-id}-GET': {
        parameters: [
            {
                name: 'verification-id'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/verifications-POST': {
        parameters: [
            {
                name: 'workflow-url'
            },
            {
                name: 'legal-person-id'
            },
        ]
    },
    '/v0/legal-persons/{legal-person-id}/verifications-GET': {
        parameters: [
            {
                name: 'legal-person-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
    '/v0/webhooks/{webhook-id}/actions/activate-POST': {
        parameters: [
            {
                name: 'webhook-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/webhooks-POST': {
        parameters: [
            {
                name: 'webhook-destination-url'
            },
            {
                name: 'organization-id'
            },
            {
                name: 'webhook-description'
            },
        ]
    },
    '/v0/webhooks/{webhook-id}/actions/deactivate-POST': {
        parameters: [
            {
                name: 'webhook-id'
            },
        ]
    },
    '/v0/webhooks/{webhook-id}-DELETE': {
        parameters: [
            {
                name: 'webhook-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/webhooks-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
        ]
    },
    '/v0/webhooks/{webhook-id}/actions/test-GET': {
        parameters: [
            {
                name: 'webhook-id'
            },
        ]
    },
    '/v0/webhooks/{webhook-id}-GET': {
        parameters: [
            {
                name: 'webhook-id'
            },
        ]
    },
    '/v0/webhooks/{webhook-id}/actions/test-POST': {
        parameters: [
            {
                name: 'webhook-id'
            },
        ]
    },
    '/v0/webhooks/{webhook-id}-PATCH': {
        parameters: [
            {
                name: 'webhook-id'
            },
            {
                name: 'webhook-description'
            },
        ]
    },
    '/v0/workflows/{workflow-id}-GET': {
        parameters: [
            {
                name: 'workflow-id'
            },
        ]
    },
    '/v0/organizations/{organization-id}/workflows-GET': {
        parameters: [
            {
                name: 'organization-id'
            },
            {
                name: 'sort'
            },
            {
                name: 'page[size]'
            },
            {
                name: 'page[after]'
            },
            {
                name: 'page[before]'
            },
        ]
    },
}