export type STRING_NULL = string | null

export const userPayloadOutputFieldsOptions = {
    "Account ID": "Account ID",
    "Account Login Name": "Account Login Name",
    "Account Note": "Account Note",
    "Account Type": "Account Type",
    "Address Type": "Address Type",
    "City": "City",
    "Country": "Country",
    "DOB Day": "DOB Day",
    "DOB Month": "DOB Month",
    "DOB Year": "DOB Year",
    "Email 1": "Email 1",
    "Phone 1 Area Code": "Phone 1 Area Code",
    "Phone 1 Full Number (F)": "Phone 1 Full Number (F)",
    "Phone 1 Number": "Phone 1 Number",
    "Phone 1 Type": "Phone 1 Type",
    "First Name": "First Name",
    "Last Name": "Last Name",
    "Full Name (F)": "Full Name (F)",
    "Full Street Address (F)": "Full Street Address (F)",
    "Full Zip Code (F)": "Full Zip Code (F)",
    "Gender": "Gender",
    "Photo URL": "Photo URL",
    "State/Province": "State/Province",
    "Zip Code": "Zip Code",
    // 75: 75,
    // 77: 77,
    // 83: 83,
    // 85: 85,
    // 86: 86,
    // 87: 87,
    // 88: 88,
    // 89: 89,
    // 90: 90
    75: 75,
    77: 77,
    82: 82,
    // 83,
    // 85,
    86: 86,
    87: 87,
    // 88,
    // 89,
    // 90,
    94: 94,
    95: 95,
    96: 96,
    99: 99
}

export const userPayload = {
    "outputFields": [
        "Account ID",
        "Account Login Name",
        "Account Note",
        "Account Type",
        "Address Type",
        "City",
        "Country",
        "DOB Day",
        "DOB Month",
        "DOB Year",
        "Email 1",
        "Phone 1 Area Code",
        "Phone 1 Full Number (F)",
        "Phone 1 Number",
        "Phone 1 Type",
        "First Name",
        "Last Name",
        "Full Name (F)",
        "Full Street Address (F)",
        "Full Zip Code (F)",
        "Gender",
        "Photo URL",
        "State/Province",
        "Zip Code",
        75,
        77,
        82,
        // 83,
        // 85,
        86,
        87,
        // 88,
        // 89,
        // 90,
        94,
        95,
        96,
        99
    ],
    "pagination": {
        "currentPage": 0,
        "pageSize": 1
    }
}

export type USER_ADDRESS = {
    addressId: STRING_NULL,
    addressLine1: STRING_NULL,
    addressLine2: STRING_NULL,
    city: STRING_NULL,
    stateProvince: {
        code: STRING_NULL,
        name: STRING_NULL
    },
    county: STRING_NULL,
    zipCode: STRING_NULL,
    zipCodeSuffix: STRING_NULL,
    phone1: STRING_NULL,
    phone1Type: STRING_NULL,
    phone2Type: STRING_NULL,
    phone3Type: STRING_NULL,
    faxType: STRING_NULL,
    isPrimaryAddress: boolean,
    type: {
        id: STRING_NULL,
        name: STRING_NULL,
        status: STRING_NULL
    },
    validAddress: boolean
}

export type USER_DETAILS = {
    individualAccount: {
        accountCustomFields: STRING_NULL,
        accountId: STRING_NULL,
        individualTypes: STRING_NULL,
        noSolicitation: STRING_NULL,
        origin: {
            originDetail: STRING_NULL
        },
        primaryContact: {
            addresses: USER_ADDRESS[],
            contactId: STRING_NULL,
            deceased: boolean,
            dob: {
                day: STRING_NULL,
                month: STRING_NULL,
                year: STRING_NULL
            },
            email1: STRING_NULL,
            firstName: STRING_NULL,
            gender: any,
            lastName: STRING_NULL,
            preferredName: STRING_NULL
        },
        sendSystemEmail: boolean,
        timestamps: {
            createdBy: STRING_NULL,
            createdDateTime: STRING_NULL,
            lastModifiedBy: STRING_NULL,
            lastModifiedDateTime: STRING_NULL
        },
        url: STRING_NULL
    }
}

export type UPDATE_USER_PAYLOAD = {
    date: string,
    month: string,
    year: string,
    email: string,
    primaryAddressId: string,
    addressLine1: string,
    city: string,
    county: string,
    zipCode: string,
    phone: string
}

export type UPDATE_USER_PROFILE = {
    date: string,
    month: string,
    year: string,
    email: string,
    primaryAddressId: string,
    addressLine1: string,
    // city: string,
    // county: string,
    // zipCode: string,
    phone: string,
    // chapterId: string
    // chapterName: string
}