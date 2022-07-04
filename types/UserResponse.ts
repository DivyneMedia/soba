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
    "Admission Number": STRING_NULL,
    "DOB Month": STRING_NULL,
    "First Name": STRING_NULL,
    "Gender": STRING_NULL,
    "Photo URL": STRING_NULL,
    "Mobile App Password": STRING_NULL,
    "Account Note": STRING_NULL,
    "DOB Day": STRING_NULL,
    "Email 1": STRING_NULL,
    "Phone 1 Area Code": STRING_NULL,
    "Phone 1 Full Number (F)": STRING_NULL,
    "Phone 1 Number": STRING_NULL,
    "Phone 1 Type": STRING_NULL,
    "Full Zip Code (F)": STRING_NULL,
    "Account Type": STRING_NULL,
    "Address Type": STRING_NULL,
    "Account ID": STRING_NULL,
    "Full Name (F)": STRING_NULL,
    "Year of Entry": STRING_NULL,
    "City": STRING_NULL,
    "DOB Year": STRING_NULL,
    "Account Created Date/Time": STRING_NULL,
    "Account Login Name": STRING_NULL,
    "Full Street Address (F)": STRING_NULL,
    "Mobile App Account Claimed": STRING_NULL,
    "Account Created By": STRING_NULL,
    "Mobile App Username": STRING_NULL,
    "Country": STRING_NULL,
    "Chapter Affiliate": STRING_NULL,
    "Last Name": STRING_NULL,
    "Mobile App Account Approved": STRING_NULL,
    "Mobile App Firebase UID": STRING_NULL,
    "State/Province": STRING_NULL
    "Zip Code": STRING_NULL
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