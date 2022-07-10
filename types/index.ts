export interface FIRESTORE_USER {
    createdAt: string
    crmAccId: string
    fcmToken: string
    firstName: string
    fullname: string
    isAccountApproved: string
    isDeleted: string
    lastName: string
    phoneNumber: string
    uid: string
    updatedAt: string
    username: string
}

export type POSSIBLE_FIRESTORE_USER_SEARCH = 'all' | 'approved' | 'unapproved'