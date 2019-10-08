// @flow
import { ListT, ListItemT } from 'src/types/base.list'

export default {}

export type CompanyT = {
  ...ListT,
  data: {
    ...ListItemT,
    entries: CompanyItemT
  }
}

export type CompanyItemT = {
  assign_number?: number,
  assign_time?: number,
  company_address?: string,
  company_fax?: string,
  company_introduce: string,
  company_telephone: string,
  company_website?: string,
  contact_email: string,
  contact_employee_id?: number,
  contact_name: string,
  contact_telephone: string,
  created_at: number,
  customer_code?: string,
  customer_level: string,
  id: string | number,
  in_active: boolean,
  in_deleted: boolean,
  industry: string,
  logo_url: string,
  manager_account: string,
  manager_name: string,
  manager_telephone: string,
  name: string,
  region?: string,
  seller?: string,
}
