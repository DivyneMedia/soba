type NUMBER_NULL = number | null
type STRING_NULL = string | null

type PAGINATION = {
    "currentPage": NUMBER_NULL,
    "pageSize": NUMBER_NULL,
    "sortColumn": NUMBER_NULL,
    "sortDirection": NUMBER_NULL,
    "totalPages": NUMBER_NULL,
    "totalResults": NUMBER_NULL
}

export type USER = {
    "Admission Number": STRING_NULL, // 82
    "DOB Month": STRING_NULL, // NAC
    "First Name": STRING_NULL, // NAC
    "Gender": STRING_NULL,  // NAC
    "Photo URL": STRING_NULL, // NAC
    "Mobile App Password": STRING_NULL, // 87
    "Account Note": STRING_NULL, // NAC
    "DOB Day": STRING_NULL, // NAC
    "Email 1": STRING_NULL, // NAC
    "Phone 1 Area Code": STRING_NULL, // NAC
    "Phone 1 Full Number (F)": STRING_NULL, // NAC
    "Phone 1 Number": STRING_NULL, // NAC
    "Phone 1 Type": STRING_NULL, // NAC
    "Full Zip Code (F)": STRING_NULL, // NAC
    "Account Type": STRING_NULL, // NAC
    "Address Type": STRING_NULL, // NAC
    "Account ID": STRING_NULL, // NAC
    "Full Name (F)": STRING_NULL, // NAC
    "Year of Entry": STRING_NULL, // 77
    "City": STRING_NULL, // NAC
    "DOB Year": STRING_NULL, // NAC
    "Account Created Date/Time": STRING_NULL, // NAC
    "Account Login Name": STRING_NULL, // NAC
    "Full Street Address (F)": STRING_NULL, // NAC
    "Mobile App Account Claimed": STRING_NULL, // 99
    "Account Created By": STRING_NULL, // NAC
    "Mobile App Username": STRING_NULL, // 86
    "Country": STRING_NULL, // NAC
    "Chapter Affiliate": STRING_NULL, // 75
    "Last Name": STRING_NULL, // NAC
    "Mobile App Account Approved": STRING_NULL, // 96
    "Mobile App Firebase UID": STRING_NULL, // 94
    "State/Province": STRING_NULL // NAC
    "Zip Code": STRING_NULL // NAC
    "Mobile App Firebase Admin Ids": STRING_NULL // 95
}

export type UserRespose = {
    pagination: PAGINATION,
    searchResults: USER[]
}

export type OPTION_VALUES = {
    id: string,
    name: string,
    code: string,
    visibleOnPublicForms: boolean,
    visibleOnConstituentForms: boolean
}

export type BASE_CUSTOM_FIELD_RESPONSE<T> = {
    id: string,
    name: string,
    status: string,
    displayType: string,
    constituentReadOnly: false,
    component: string,
    optionValues: T[]
}