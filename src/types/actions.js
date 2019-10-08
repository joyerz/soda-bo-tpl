export default {}

export type ActionListT = (page?: number | null, limit?: number | null, params?: {}) => void
export type ActionModifyT = (data: any) => void
export type VoidFuncT = () => void

export type FormOnChangeT = (name: string, value: string | number, data: {}) => void