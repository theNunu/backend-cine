export interface BaseEntityI<TKey> {
    id: TKey
    auditCreateUser: number
    auditCreateDate: Date
    auditUpdateUser: number | null
    auditUpdateDate: Date | null
    auditDeleteUser: number | null
    auditDeleteDate:  Date | null
    state: number
}