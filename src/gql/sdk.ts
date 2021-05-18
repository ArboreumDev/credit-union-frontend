import { GraphQLClient } from "graphql-request"
import { print } from "graphql"
import gql from "graphql-tag"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  float8: any
  jsonb: any
  loan_request_status: any
  timestamptz: any
  user_t: any
  uuid: any
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars["Boolean"]>
  _gt?: Maybe<Scalars["Boolean"]>
  _gte?: Maybe<Scalars["Boolean"]>
  _in?: Maybe<Array<Scalars["Boolean"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["Boolean"]>
  _lte?: Maybe<Scalars["Boolean"]>
  _neq?: Maybe<Scalars["Boolean"]>
  _nin?: Maybe<Array<Scalars["Boolean"]>>
}

/** expression to compare columns of type Float. All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: Maybe<Scalars["Float"]>
  _gt?: Maybe<Scalars["Float"]>
  _gte?: Maybe<Scalars["Float"]>
  _in?: Maybe<Array<Scalars["Float"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["Float"]>
  _lte?: Maybe<Scalars["Float"]>
  _neq?: Maybe<Scalars["Float"]>
  _nin?: Maybe<Array<Scalars["Float"]>>
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars["Int"]>
  _gt?: Maybe<Scalars["Int"]>
  _gte?: Maybe<Scalars["Int"]>
  _in?: Maybe<Array<Scalars["Int"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["Int"]>
  _lte?: Maybe<Scalars["Int"]>
  _neq?: Maybe<Scalars["Int"]>
  _nin?: Maybe<Array<Scalars["Int"]>>
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars["String"]>
  _gt?: Maybe<Scalars["String"]>
  _gte?: Maybe<Scalars["String"]>
  _ilike?: Maybe<Scalars["String"]>
  _in?: Maybe<Array<Scalars["String"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _like?: Maybe<Scalars["String"]>
  _lt?: Maybe<Scalars["String"]>
  _lte?: Maybe<Scalars["String"]>
  _neq?: Maybe<Scalars["String"]>
  _nilike?: Maybe<Scalars["String"]>
  _nin?: Maybe<Array<Scalars["String"]>>
  _nlike?: Maybe<Scalars["String"]>
  _nsimilar?: Maybe<Scalars["String"]>
  _similar?: Maybe<Scalars["String"]>
}

/** columns and relationships of "action_type" */
export type Action_Type = {
  __typename?: "action_type"
  comment: Scalars["String"]
  value: Scalars["String"]
}

/** aggregated selection of "action_type" */
export type Action_Type_Aggregate = {
  __typename?: "action_type_aggregate"
  aggregate?: Maybe<Action_Type_Aggregate_Fields>
  nodes: Array<Action_Type>
}

/** aggregate fields of "action_type" */
export type Action_Type_Aggregate_Fields = {
  __typename?: "action_type_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Action_Type_Max_Fields>
  min?: Maybe<Action_Type_Min_Fields>
}

/** aggregate fields of "action_type" */
export type Action_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Action_Type_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "action_type" */
export type Action_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Action_Type_Max_Order_By>
  min?: Maybe<Action_Type_Min_Order_By>
}

/** input type for inserting array relation for remote table "action_type" */
export type Action_Type_Arr_Rel_Insert_Input = {
  data: Array<Action_Type_Insert_Input>
  on_conflict?: Maybe<Action_Type_On_Conflict>
}

/** Boolean expression to filter rows from the table "action_type". All fields are combined with a logical 'AND'. */
export type Action_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Action_Type_Bool_Exp>>>
  _not?: Maybe<Action_Type_Bool_Exp>
  _or?: Maybe<Array<Maybe<Action_Type_Bool_Exp>>>
  comment?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "action_type" */
export enum Action_Type_Constraint {
  /** unique or primary key constraint */
  ActionTypePkey = "action_type_pkey",
}

export enum Action_Type_Enum {
  /** Change balance for users */
  AdjustBalances = "ADJUST_BALANCES",
  /** Adds supporters, generates the loan offer, and then accepts it */
  ConfirmLoan = "CONFIRM_LOAN",
  /** Make repayment */
  RepayLoan = "REPAY_LOAN",
}

/** expression to compare columns of type action_type_enum. All fields are combined with logical 'AND'. */
export type Action_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Action_Type_Enum>
  _in?: Maybe<Array<Action_Type_Enum>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _neq?: Maybe<Action_Type_Enum>
  _nin?: Maybe<Array<Action_Type_Enum>>
}

/** input type for inserting data into table "action_type" */
export type Action_Type_Insert_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Action_Type_Max_Fields = {
  __typename?: "action_type_max_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "action_type" */
export type Action_Type_Max_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Action_Type_Min_Fields = {
  __typename?: "action_type_min_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "action_type" */
export type Action_Type_Min_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** response of any mutation on the table "action_type" */
export type Action_Type_Mutation_Response = {
  __typename?: "action_type_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Action_Type>
}

/** input type for inserting object relation for remote table "action_type" */
export type Action_Type_Obj_Rel_Insert_Input = {
  data: Action_Type_Insert_Input
  on_conflict?: Maybe<Action_Type_On_Conflict>
}

/** on conflict condition type for table "action_type" */
export type Action_Type_On_Conflict = {
  constraint: Action_Type_Constraint
  update_columns: Array<Action_Type_Update_Column>
  where?: Maybe<Action_Type_Bool_Exp>
}

/** ordering options when selecting data from "action_type" */
export type Action_Type_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: "action_type" */
export type Action_Type_Pk_Columns_Input = {
  value: Scalars["String"]
}

/** select columns of table "action_type" */
export enum Action_Type_Select_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** input type for updating data in table "action_type" */
export type Action_Type_Set_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** update columns of table "action_type" */
export enum Action_Type_Update_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** columns and relationships of "creditLine" */
export type CreditLine = {
  __typename?: "creditLine"
  borrower: Scalars["uuid"]
  investor: Scalars["uuid"]
  /** An object relationship */
  userByBorrower: User
  /** An object relationship */
  userByInvestor: User
}

/** aggregated selection of "creditLine" */
export type CreditLine_Aggregate = {
  __typename?: "creditLine_aggregate"
  aggregate?: Maybe<CreditLine_Aggregate_Fields>
  nodes: Array<CreditLine>
}

/** aggregate fields of "creditLine" */
export type CreditLine_Aggregate_Fields = {
  __typename?: "creditLine_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<CreditLine_Max_Fields>
  min?: Maybe<CreditLine_Min_Fields>
}

/** aggregate fields of "creditLine" */
export type CreditLine_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<CreditLine_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "creditLine" */
export type CreditLine_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<CreditLine_Max_Order_By>
  min?: Maybe<CreditLine_Min_Order_By>
}

/** input type for inserting array relation for remote table "creditLine" */
export type CreditLine_Arr_Rel_Insert_Input = {
  data: Array<CreditLine_Insert_Input>
  on_conflict?: Maybe<CreditLine_On_Conflict>
}

/** Boolean expression to filter rows from the table "creditLine". All fields are combined with a logical 'AND'. */
export type CreditLine_Bool_Exp = {
  _and?: Maybe<Array<Maybe<CreditLine_Bool_Exp>>>
  _not?: Maybe<CreditLine_Bool_Exp>
  _or?: Maybe<Array<Maybe<CreditLine_Bool_Exp>>>
  borrower?: Maybe<Uuid_Comparison_Exp>
  investor?: Maybe<Uuid_Comparison_Exp>
  userByBorrower?: Maybe<User_Bool_Exp>
  userByInvestor?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "creditLine" */
export enum CreditLine_Constraint {
  /** unique or primary key constraint */
  CreditLinePkey = "creditLine_pkey",
}

/** input type for inserting data into table "creditLine" */
export type CreditLine_Insert_Input = {
  borrower?: Maybe<Scalars["uuid"]>
  investor?: Maybe<Scalars["uuid"]>
  userByBorrower?: Maybe<User_Obj_Rel_Insert_Input>
  userByInvestor?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type CreditLine_Max_Fields = {
  __typename?: "creditLine_max_fields"
  borrower?: Maybe<Scalars["uuid"]>
  investor?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "creditLine" */
export type CreditLine_Max_Order_By = {
  borrower?: Maybe<Order_By>
  investor?: Maybe<Order_By>
}

/** aggregate min on columns */
export type CreditLine_Min_Fields = {
  __typename?: "creditLine_min_fields"
  borrower?: Maybe<Scalars["uuid"]>
  investor?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "creditLine" */
export type CreditLine_Min_Order_By = {
  borrower?: Maybe<Order_By>
  investor?: Maybe<Order_By>
}

/** response of any mutation on the table "creditLine" */
export type CreditLine_Mutation_Response = {
  __typename?: "creditLine_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<CreditLine>
}

/** input type for inserting object relation for remote table "creditLine" */
export type CreditLine_Obj_Rel_Insert_Input = {
  data: CreditLine_Insert_Input
  on_conflict?: Maybe<CreditLine_On_Conflict>
}

/** on conflict condition type for table "creditLine" */
export type CreditLine_On_Conflict = {
  constraint: CreditLine_Constraint
  update_columns: Array<CreditLine_Update_Column>
  where?: Maybe<CreditLine_Bool_Exp>
}

/** ordering options when selecting data from "creditLine" */
export type CreditLine_Order_By = {
  borrower?: Maybe<Order_By>
  investor?: Maybe<Order_By>
  userByBorrower?: Maybe<User_Order_By>
  userByInvestor?: Maybe<User_Order_By>
}

/** primary key columns input for table: "creditLine" */
export type CreditLine_Pk_Columns_Input = {
  borrower: Scalars["uuid"]
  investor: Scalars["uuid"]
}

/** select columns of table "creditLine" */
export enum CreditLine_Select_Column {
  /** column name */
  Borrower = "borrower",
  /** column name */
  Investor = "investor",
}

/** input type for updating data in table "creditLine" */
export type CreditLine_Set_Input = {
  borrower?: Maybe<Scalars["uuid"]>
  investor?: Maybe<Scalars["uuid"]>
}

/** update columns of table "creditLine" */
export enum CreditLine_Update_Column {
  /** column name */
  Borrower = "borrower",
  /** column name */
  Investor = "investor",
}

/** columns and relationships of "events" */
export type Events = {
  __typename?: "events"
  created_at: Scalars["timestamptz"]
  data?: Maybe<Scalars["jsonb"]>
  event_type: Scalars["String"]
  headers?: Maybe<Scalars["jsonb"]>
  id: Scalars["uuid"]
  /** An object relationship */
  user?: Maybe<User>
  user_id?: Maybe<Scalars["uuid"]>
}

/** columns and relationships of "events" */
export type EventsDataArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "events" */
export type EventsHeadersArgs = {
  path?: Maybe<Scalars["String"]>
}

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: "events_aggregate"
  aggregate?: Maybe<Events_Aggregate_Fields>
  nodes: Array<Events>
}

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: "events_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Events_Max_Fields>
  min?: Maybe<Events_Min_Fields>
}

/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "events" */
export type Events_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Events_Max_Order_By>
  min?: Maybe<Events_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Events_Append_Input = {
  data?: Maybe<Scalars["jsonb"]>
  headers?: Maybe<Scalars["jsonb"]>
}

/** input type for inserting array relation for remote table "events" */
export type Events_Arr_Rel_Insert_Input = {
  data: Array<Events_Insert_Input>
  on_conflict?: Maybe<Events_On_Conflict>
}

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Bool_Exp>>>
  _not?: Maybe<Events_Bool_Exp>
  _or?: Maybe<Array<Maybe<Events_Bool_Exp>>>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  data?: Maybe<Jsonb_Comparison_Exp>
  event_type?: Maybe<String_Comparison_Exp>
  headers?: Maybe<Jsonb_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
  user_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint */
  EventsPkey = "events_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Events_Delete_At_Path_Input = {
  data?: Maybe<Array<Maybe<Scalars["String"]>>>
  headers?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Events_Delete_Elem_Input = {
  data?: Maybe<Scalars["Int"]>
  headers?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Events_Delete_Key_Input = {
  data?: Maybe<Scalars["String"]>
  headers?: Maybe<Scalars["String"]>
}

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  created_at?: Maybe<Scalars["timestamptz"]>
  data?: Maybe<Scalars["jsonb"]>
  event_type?: Maybe<Scalars["String"]>
  headers?: Maybe<Scalars["jsonb"]>
  id?: Maybe<Scalars["uuid"]>
  user?: Maybe<User_Obj_Rel_Insert_Input>
  user_id?: Maybe<Scalars["uuid"]>
}

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: "events_max_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  event_type?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  user_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "events" */
export type Events_Max_Order_By = {
  created_at?: Maybe<Order_By>
  event_type?: Maybe<Order_By>
  id?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: "events_min_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  event_type?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  user_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "events" */
export type Events_Min_Order_By = {
  created_at?: Maybe<Order_By>
  event_type?: Maybe<Order_By>
  id?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: "events_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Events>
}

/** input type for inserting object relation for remote table "events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input
  on_conflict?: Maybe<Events_On_Conflict>
}

/** on conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint
  update_columns: Array<Events_Update_Column>
  where?: Maybe<Events_Bool_Exp>
}

/** ordering options when selecting data from "events" */
export type Events_Order_By = {
  created_at?: Maybe<Order_By>
  data?: Maybe<Order_By>
  event_type?: Maybe<Order_By>
  headers?: Maybe<Order_By>
  id?: Maybe<Order_By>
  user?: Maybe<User_Order_By>
  user_id?: Maybe<Order_By>
}

/** primary key columns input for table: "events" */
export type Events_Pk_Columns_Input = {
  id: Scalars["uuid"]
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Events_Prepend_Input = {
  data?: Maybe<Scalars["jsonb"]>
  headers?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Data = "data",
  /** column name */
  EventType = "event_type",
  /** column name */
  Headers = "headers",
  /** column name */
  Id = "id",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  created_at?: Maybe<Scalars["timestamptz"]>
  data?: Maybe<Scalars["jsonb"]>
  event_type?: Maybe<Scalars["String"]>
  headers?: Maybe<Scalars["jsonb"]>
  id?: Maybe<Scalars["uuid"]>
  user_id?: Maybe<Scalars["uuid"]>
}

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Data = "data",
  /** column name */
  EventType = "event_type",
  /** column name */
  Headers = "headers",
  /** column name */
  Id = "id",
  /** column name */
  UserId = "user_id",
}

/** expression to compare columns of type float8. All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: Maybe<Scalars["float8"]>
  _gt?: Maybe<Scalars["float8"]>
  _gte?: Maybe<Scalars["float8"]>
  _in?: Maybe<Array<Scalars["float8"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["float8"]>
  _lte?: Maybe<Scalars["float8"]>
  _neq?: Maybe<Scalars["float8"]>
  _nin?: Maybe<Array<Scalars["float8"]>>
}

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars["jsonb"]>
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars["jsonb"]>
  _eq?: Maybe<Scalars["jsonb"]>
  _gt?: Maybe<Scalars["jsonb"]>
  _gte?: Maybe<Scalars["jsonb"]>
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars["String"]>
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars["String"]>>
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars["String"]>>
  _in?: Maybe<Array<Scalars["jsonb"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["jsonb"]>
  _lte?: Maybe<Scalars["jsonb"]>
  _neq?: Maybe<Scalars["jsonb"]>
  _nin?: Maybe<Array<Scalars["jsonb"]>>
}

/** columns and relationships of "loan_participants" */
export type Loan_Participants = {
  __typename?: "loan_participants"
  lender_amount: Scalars["float8"]
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
  /** An object relationship */
  loan_request: Loan_Requests
  /** An object relationship */
  user: User
}

/** aggregated selection of "loan_participants" */
export type Loan_Participants_Aggregate = {
  __typename?: "loan_participants_aggregate"
  aggregate?: Maybe<Loan_Participants_Aggregate_Fields>
  nodes: Array<Loan_Participants>
}

/** aggregate fields of "loan_participants" */
export type Loan_Participants_Aggregate_Fields = {
  __typename?: "loan_participants_aggregate_fields"
  avg?: Maybe<Loan_Participants_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Loan_Participants_Max_Fields>
  min?: Maybe<Loan_Participants_Min_Fields>
  stddev?: Maybe<Loan_Participants_Stddev_Fields>
  stddev_pop?: Maybe<Loan_Participants_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Loan_Participants_Stddev_Samp_Fields>
  sum?: Maybe<Loan_Participants_Sum_Fields>
  var_pop?: Maybe<Loan_Participants_Var_Pop_Fields>
  var_samp?: Maybe<Loan_Participants_Var_Samp_Fields>
  variance?: Maybe<Loan_Participants_Variance_Fields>
}

/** aggregate fields of "loan_participants" */
export type Loan_Participants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Loan_Participants_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "loan_participants" */
export type Loan_Participants_Aggregate_Order_By = {
  avg?: Maybe<Loan_Participants_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Loan_Participants_Max_Order_By>
  min?: Maybe<Loan_Participants_Min_Order_By>
  stddev?: Maybe<Loan_Participants_Stddev_Order_By>
  stddev_pop?: Maybe<Loan_Participants_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Loan_Participants_Stddev_Samp_Order_By>
  sum?: Maybe<Loan_Participants_Sum_Order_By>
  var_pop?: Maybe<Loan_Participants_Var_Pop_Order_By>
  var_samp?: Maybe<Loan_Participants_Var_Samp_Order_By>
  variance?: Maybe<Loan_Participants_Variance_Order_By>
}

/** input type for inserting array relation for remote table "loan_participants" */
export type Loan_Participants_Arr_Rel_Insert_Input = {
  data: Array<Loan_Participants_Insert_Input>
  on_conflict?: Maybe<Loan_Participants_On_Conflict>
}

/** aggregate avg on columns */
export type Loan_Participants_Avg_Fields = {
  __typename?: "loan_participants_avg_fields"
  lender_amount?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "loan_participants" */
export type Loan_Participants_Avg_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "loan_participants". All fields are combined with a logical 'AND'. */
export type Loan_Participants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Participants_Bool_Exp>>>
  _not?: Maybe<Loan_Participants_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Participants_Bool_Exp>>>
  lender_amount?: Maybe<Float8_Comparison_Exp>
  lender_id?: Maybe<Uuid_Comparison_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  loan_request?: Maybe<Loan_Requests_Bool_Exp>
  user?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "loan_participants" */
export enum Loan_Participants_Constraint {
  /** unique or primary key constraint */
  LoanParticipantsPkey = "loan_participants_pkey",
}

/** input type for incrementing integer column in table "loan_participants" */
export type Loan_Participants_Inc_Input = {
  lender_amount?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "loan_participants" */
export type Loan_Participants_Insert_Input = {
  lender_amount?: Maybe<Scalars["float8"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Loan_Requests_Obj_Rel_Insert_Input>
  user?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Loan_Participants_Max_Fields = {
  __typename?: "loan_participants_max_fields"
  lender_amount?: Maybe<Scalars["float8"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "loan_participants" */
export type Loan_Participants_Max_Order_By = {
  lender_amount?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_Participants_Min_Fields = {
  __typename?: "loan_participants_min_fields"
  lender_amount?: Maybe<Scalars["float8"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "loan_participants" */
export type Loan_Participants_Min_Order_By = {
  lender_amount?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
}

/** response of any mutation on the table "loan_participants" */
export type Loan_Participants_Mutation_Response = {
  __typename?: "loan_participants_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Loan_Participants>
}

/** input type for inserting object relation for remote table "loan_participants" */
export type Loan_Participants_Obj_Rel_Insert_Input = {
  data: Loan_Participants_Insert_Input
  on_conflict?: Maybe<Loan_Participants_On_Conflict>
}

/** on conflict condition type for table "loan_participants" */
export type Loan_Participants_On_Conflict = {
  constraint: Loan_Participants_Constraint
  update_columns: Array<Loan_Participants_Update_Column>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** ordering options when selecting data from "loan_participants" */
export type Loan_Participants_Order_By = {
  lender_amount?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  loan_request?: Maybe<Loan_Requests_Order_By>
  user?: Maybe<User_Order_By>
}

/** primary key columns input for table: "loan_participants" */
export type Loan_Participants_Pk_Columns_Input = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** select columns of table "loan_participants" */
export enum Loan_Participants_Select_Column {
  /** column name */
  LenderAmount = "lender_amount",
  /** column name */
  LenderId = "lender_id",
  /** column name */
  LoanId = "loan_id",
}

/** input type for updating data in table "loan_participants" */
export type Loan_Participants_Set_Input = {
  lender_amount?: Maybe<Scalars["float8"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
}

/** aggregate stddev on columns */
export type Loan_Participants_Stddev_Fields = {
  __typename?: "loan_participants_stddev_fields"
  lender_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "loan_participants" */
export type Loan_Participants_Stddev_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Loan_Participants_Stddev_Pop_Fields = {
  __typename?: "loan_participants_stddev_pop_fields"
  lender_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "loan_participants" */
export type Loan_Participants_Stddev_Pop_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Loan_Participants_Stddev_Samp_Fields = {
  __typename?: "loan_participants_stddev_samp_fields"
  lender_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "loan_participants" */
export type Loan_Participants_Stddev_Samp_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Loan_Participants_Sum_Fields = {
  __typename?: "loan_participants_sum_fields"
  lender_amount?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "loan_participants" */
export type Loan_Participants_Sum_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** update columns of table "loan_participants" */
export enum Loan_Participants_Update_Column {
  /** column name */
  LenderAmount = "lender_amount",
  /** column name */
  LenderId = "lender_id",
  /** column name */
  LoanId = "loan_id",
}

/** aggregate var_pop on columns */
export type Loan_Participants_Var_Pop_Fields = {
  __typename?: "loan_participants_var_pop_fields"
  lender_amount?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "loan_participants" */
export type Loan_Participants_Var_Pop_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Loan_Participants_Var_Samp_Fields = {
  __typename?: "loan_participants_var_samp_fields"
  lender_amount?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "loan_participants" */
export type Loan_Participants_Var_Samp_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Loan_Participants_Variance_Fields = {
  __typename?: "loan_participants_variance_fields"
  lender_amount?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "loan_participants" */
export type Loan_Participants_Variance_Order_By = {
  lender_amount?: Maybe<Order_By>
}

/** expression to compare columns of type loan_request_status. All fields are combined with logical 'AND'. */
export type Loan_Request_Status_Comparison_Exp = {
  _eq?: Maybe<Scalars["loan_request_status"]>
  _gt?: Maybe<Scalars["loan_request_status"]>
  _gte?: Maybe<Scalars["loan_request_status"]>
  _in?: Maybe<Array<Scalars["loan_request_status"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["loan_request_status"]>
  _lte?: Maybe<Scalars["loan_request_status"]>
  _neq?: Maybe<Scalars["loan_request_status"]>
  _nin?: Maybe<Array<Scalars["loan_request_status"]>>
}

/** columns and relationships of "loan_requests" */
export type Loan_Requests = {
  __typename?: "loan_requests"
  amount: Scalars["Int"]
  balance?: Maybe<Scalars["float8"]>
  borrower_id: Scalars["uuid"]
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at: Scalars["timestamptz"]
  loan?: Maybe<Scalars["jsonb"]>
  /** An array relationship */
  loan_participants: Array<Loan_Participants>
  /** An aggregated array relationship */
  loan_participants_aggregate: Loan_Participants_Aggregate
  payback_status?: Maybe<Scalars["String"]>
  purpose?: Maybe<Scalars["String"]>
  request_id: Scalars["uuid"]
  risk_calc_result?: Maybe<Scalars["jsonb"]>
  status?: Maybe<Scalars["loan_request_status"]>
  /** An array relationship */
  supporters: Array<Supporters>
  /** An aggregated array relationship */
  supporters_aggregate: Supporters_Aggregate
  /** An object relationship */
  user: User
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsLoanArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsLoan_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsLoan_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsRisk_Calc_ResultArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsSupportersArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsSupporters_AggregateArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** aggregated selection of "loan_requests" */
export type Loan_Requests_Aggregate = {
  __typename?: "loan_requests_aggregate"
  aggregate?: Maybe<Loan_Requests_Aggregate_Fields>
  nodes: Array<Loan_Requests>
}

/** aggregate fields of "loan_requests" */
export type Loan_Requests_Aggregate_Fields = {
  __typename?: "loan_requests_aggregate_fields"
  avg?: Maybe<Loan_Requests_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Loan_Requests_Max_Fields>
  min?: Maybe<Loan_Requests_Min_Fields>
  stddev?: Maybe<Loan_Requests_Stddev_Fields>
  stddev_pop?: Maybe<Loan_Requests_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Loan_Requests_Stddev_Samp_Fields>
  sum?: Maybe<Loan_Requests_Sum_Fields>
  var_pop?: Maybe<Loan_Requests_Var_Pop_Fields>
  var_samp?: Maybe<Loan_Requests_Var_Samp_Fields>
  variance?: Maybe<Loan_Requests_Variance_Fields>
}

/** aggregate fields of "loan_requests" */
export type Loan_Requests_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Loan_Requests_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "loan_requests" */
export type Loan_Requests_Aggregate_Order_By = {
  avg?: Maybe<Loan_Requests_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Loan_Requests_Max_Order_By>
  min?: Maybe<Loan_Requests_Min_Order_By>
  stddev?: Maybe<Loan_Requests_Stddev_Order_By>
  stddev_pop?: Maybe<Loan_Requests_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Loan_Requests_Stddev_Samp_Order_By>
  sum?: Maybe<Loan_Requests_Sum_Order_By>
  var_pop?: Maybe<Loan_Requests_Var_Pop_Order_By>
  var_samp?: Maybe<Loan_Requests_Var_Samp_Order_By>
  variance?: Maybe<Loan_Requests_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Loan_Requests_Append_Input = {
  loan?: Maybe<Scalars["jsonb"]>
  risk_calc_result?: Maybe<Scalars["jsonb"]>
}

/** input type for inserting array relation for remote table "loan_requests" */
export type Loan_Requests_Arr_Rel_Insert_Input = {
  data: Array<Loan_Requests_Insert_Input>
  on_conflict?: Maybe<Loan_Requests_On_Conflict>
}

/** aggregate avg on columns */
export type Loan_Requests_Avg_Fields = {
  __typename?: "loan_requests_avg_fields"
  amount?: Maybe<Scalars["Float"]>
  balance?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "loan_requests" */
export type Loan_Requests_Avg_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "loan_requests". All fields are combined with a logical 'AND'. */
export type Loan_Requests_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Requests_Bool_Exp>>>
  _not?: Maybe<Loan_Requests_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Requests_Bool_Exp>>>
  amount?: Maybe<Int_Comparison_Exp>
  balance?: Maybe<Float8_Comparison_Exp>
  borrower_id?: Maybe<Uuid_Comparison_Exp>
  confirmation_date?: Maybe<Timestamptz_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  loan?: Maybe<Jsonb_Comparison_Exp>
  loan_participants?: Maybe<Loan_Participants_Bool_Exp>
  payback_status?: Maybe<String_Comparison_Exp>
  purpose?: Maybe<String_Comparison_Exp>
  request_id?: Maybe<Uuid_Comparison_Exp>
  risk_calc_result?: Maybe<Jsonb_Comparison_Exp>
  status?: Maybe<Loan_Request_Status_Comparison_Exp>
  supporters?: Maybe<Supporters_Bool_Exp>
  user?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "loan_requests" */
export enum Loan_Requests_Constraint {
  /** unique or primary key constraint */
  LoanRequestsPkey = "loan_requests_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Loan_Requests_Delete_At_Path_Input = {
  loan?: Maybe<Array<Maybe<Scalars["String"]>>>
  risk_calc_result?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Loan_Requests_Delete_Elem_Input = {
  loan?: Maybe<Scalars["Int"]>
  risk_calc_result?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Loan_Requests_Delete_Key_Input = {
  loan?: Maybe<Scalars["String"]>
  risk_calc_result?: Maybe<Scalars["String"]>
}

/** input type for incrementing integer column in table "loan_requests" */
export type Loan_Requests_Inc_Input = {
  amount?: Maybe<Scalars["Int"]>
  balance?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "loan_requests" */
export type Loan_Requests_Insert_Input = {
  amount?: Maybe<Scalars["Int"]>
  balance?: Maybe<Scalars["float8"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  loan?: Maybe<Scalars["jsonb"]>
  loan_participants?: Maybe<Loan_Participants_Arr_Rel_Insert_Input>
  payback_status?: Maybe<Scalars["String"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
  risk_calc_result?: Maybe<Scalars["jsonb"]>
  status?: Maybe<Scalars["loan_request_status"]>
  supporters?: Maybe<Supporters_Arr_Rel_Insert_Input>
  user?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Loan_Requests_Max_Fields = {
  __typename?: "loan_requests_max_fields"
  amount?: Maybe<Scalars["Int"]>
  balance?: Maybe<Scalars["float8"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  payback_status?: Maybe<Scalars["String"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "loan_requests" */
export type Loan_Requests_Max_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
  borrower_id?: Maybe<Order_By>
  confirmation_date?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  payback_status?: Maybe<Order_By>
  purpose?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_Requests_Min_Fields = {
  __typename?: "loan_requests_min_fields"
  amount?: Maybe<Scalars["Int"]>
  balance?: Maybe<Scalars["float8"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  payback_status?: Maybe<Scalars["String"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "loan_requests" */
export type Loan_Requests_Min_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
  borrower_id?: Maybe<Order_By>
  confirmation_date?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  payback_status?: Maybe<Order_By>
  purpose?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
}

/** response of any mutation on the table "loan_requests" */
export type Loan_Requests_Mutation_Response = {
  __typename?: "loan_requests_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Loan_Requests>
}

/** input type for inserting object relation for remote table "loan_requests" */
export type Loan_Requests_Obj_Rel_Insert_Input = {
  data: Loan_Requests_Insert_Input
  on_conflict?: Maybe<Loan_Requests_On_Conflict>
}

/** on conflict condition type for table "loan_requests" */
export type Loan_Requests_On_Conflict = {
  constraint: Loan_Requests_Constraint
  update_columns: Array<Loan_Requests_Update_Column>
  where?: Maybe<Loan_Requests_Bool_Exp>
}

/** ordering options when selecting data from "loan_requests" */
export type Loan_Requests_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
  borrower_id?: Maybe<Order_By>
  confirmation_date?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  loan?: Maybe<Order_By>
  loan_participants_aggregate?: Maybe<Loan_Participants_Aggregate_Order_By>
  payback_status?: Maybe<Order_By>
  purpose?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
  risk_calc_result?: Maybe<Order_By>
  status?: Maybe<Order_By>
  supporters_aggregate?: Maybe<Supporters_Aggregate_Order_By>
  user?: Maybe<User_Order_By>
}

/** primary key columns input for table: "loan_requests" */
export type Loan_Requests_Pk_Columns_Input = {
  request_id: Scalars["uuid"]
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Loan_Requests_Prepend_Input = {
  loan?: Maybe<Scalars["jsonb"]>
  risk_calc_result?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "loan_requests" */
export enum Loan_Requests_Select_Column {
  /** column name */
  Amount = "amount",
  /** column name */
  Balance = "balance",
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  ConfirmationDate = "confirmation_date",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Loan = "loan",
  /** column name */
  PaybackStatus = "payback_status",
  /** column name */
  Purpose = "purpose",
  /** column name */
  RequestId = "request_id",
  /** column name */
  RiskCalcResult = "risk_calc_result",
  /** column name */
  Status = "status",
}

/** input type for updating data in table "loan_requests" */
export type Loan_Requests_Set_Input = {
  amount?: Maybe<Scalars["Int"]>
  balance?: Maybe<Scalars["float8"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  loan?: Maybe<Scalars["jsonb"]>
  payback_status?: Maybe<Scalars["String"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
  risk_calc_result?: Maybe<Scalars["jsonb"]>
  status?: Maybe<Scalars["loan_request_status"]>
}

/** aggregate stddev on columns */
export type Loan_Requests_Stddev_Fields = {
  __typename?: "loan_requests_stddev_fields"
  amount?: Maybe<Scalars["Float"]>
  balance?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "loan_requests" */
export type Loan_Requests_Stddev_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Loan_Requests_Stddev_Pop_Fields = {
  __typename?: "loan_requests_stddev_pop_fields"
  amount?: Maybe<Scalars["Float"]>
  balance?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "loan_requests" */
export type Loan_Requests_Stddev_Pop_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Loan_Requests_Stddev_Samp_Fields = {
  __typename?: "loan_requests_stddev_samp_fields"
  amount?: Maybe<Scalars["Float"]>
  balance?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "loan_requests" */
export type Loan_Requests_Stddev_Samp_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Loan_Requests_Sum_Fields = {
  __typename?: "loan_requests_sum_fields"
  amount?: Maybe<Scalars["Int"]>
  balance?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "loan_requests" */
export type Loan_Requests_Sum_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** update columns of table "loan_requests" */
export enum Loan_Requests_Update_Column {
  /** column name */
  Amount = "amount",
  /** column name */
  Balance = "balance",
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  ConfirmationDate = "confirmation_date",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Loan = "loan",
  /** column name */
  PaybackStatus = "payback_status",
  /** column name */
  Purpose = "purpose",
  /** column name */
  RequestId = "request_id",
  /** column name */
  RiskCalcResult = "risk_calc_result",
  /** column name */
  Status = "status",
}

/** aggregate var_pop on columns */
export type Loan_Requests_Var_Pop_Fields = {
  __typename?: "loan_requests_var_pop_fields"
  amount?: Maybe<Scalars["Float"]>
  balance?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "loan_requests" */
export type Loan_Requests_Var_Pop_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Loan_Requests_Var_Samp_Fields = {
  __typename?: "loan_requests_var_samp_fields"
  amount?: Maybe<Scalars["Float"]>
  balance?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "loan_requests" */
export type Loan_Requests_Var_Samp_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Loan_Requests_Variance_Fields = {
  __typename?: "loan_requests_variance_fields"
  amount?: Maybe<Scalars["Float"]>
  balance?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "loan_requests" */
export type Loan_Requests_Variance_Order_By = {
  amount?: Maybe<Order_By>
  balance?: Maybe<Order_By>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root"
  /** delete data from the table: "action_type" */
  delete_action_type?: Maybe<Action_Type_Mutation_Response>
  /** delete single row from the table: "action_type" */
  delete_action_type_by_pk?: Maybe<Action_Type>
  /** delete data from the table: "creditLine" */
  delete_creditLine?: Maybe<CreditLine_Mutation_Response>
  /** delete single row from the table: "creditLine" */
  delete_creditLine_by_pk?: Maybe<CreditLine>
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>
  /** delete data from the table: "loan_participants" */
  delete_loan_participants?: Maybe<Loan_Participants_Mutation_Response>
  /** delete single row from the table: "loan_participants" */
  delete_loan_participants_by_pk?: Maybe<Loan_Participants>
  /** delete data from the table: "loan_requests" */
  delete_loan_requests?: Maybe<Loan_Requests_Mutation_Response>
  /** delete single row from the table: "loan_requests" */
  delete_loan_requests_by_pk?: Maybe<Loan_Requests>
  /** delete data from the table: "recommendation_risk" */
  delete_recommendation_risk?: Maybe<Recommendation_Risk_Mutation_Response>
  /** delete single row from the table: "recommendation_risk" */
  delete_recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
  /** delete data from the table: "scenario_actions" */
  delete_scenario_actions?: Maybe<Scenario_Actions_Mutation_Response>
  /** delete single row from the table: "scenario_actions" */
  delete_scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** delete data from the table: "supporters" */
  delete_supporters?: Maybe<Supporters_Mutation_Response>
  /** delete single row from the table: "supporters" */
  delete_supporters_by_pk?: Maybe<Supporters>
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>
  /** insert data into the table: "action_type" */
  insert_action_type?: Maybe<Action_Type_Mutation_Response>
  /** insert a single row into the table: "action_type" */
  insert_action_type_one?: Maybe<Action_Type>
  /** insert data into the table: "creditLine" */
  insert_creditLine?: Maybe<CreditLine_Mutation_Response>
  /** insert a single row into the table: "creditLine" */
  insert_creditLine_one?: Maybe<CreditLine>
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>
  /** insert data into the table: "loan_participants" */
  insert_loan_participants?: Maybe<Loan_Participants_Mutation_Response>
  /** insert a single row into the table: "loan_participants" */
  insert_loan_participants_one?: Maybe<Loan_Participants>
  /** insert data into the table: "loan_requests" */
  insert_loan_requests?: Maybe<Loan_Requests_Mutation_Response>
  /** insert a single row into the table: "loan_requests" */
  insert_loan_requests_one?: Maybe<Loan_Requests>
  /** insert data into the table: "recommendation_risk" */
  insert_recommendation_risk?: Maybe<Recommendation_Risk_Mutation_Response>
  /** insert a single row into the table: "recommendation_risk" */
  insert_recommendation_risk_one?: Maybe<Recommendation_Risk>
  /** insert data into the table: "scenario_actions" */
  insert_scenario_actions?: Maybe<Scenario_Actions_Mutation_Response>
  /** insert a single row into the table: "scenario_actions" */
  insert_scenario_actions_one?: Maybe<Scenario_Actions>
  /** insert data into the table: "supporters" */
  insert_supporters?: Maybe<Supporters_Mutation_Response>
  /** insert a single row into the table: "supporters" */
  insert_supporters_one?: Maybe<Supporters>
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>
  /** update data of the table: "action_type" */
  update_action_type?: Maybe<Action_Type_Mutation_Response>
  /** update single row of the table: "action_type" */
  update_action_type_by_pk?: Maybe<Action_Type>
  /** update data of the table: "creditLine" */
  update_creditLine?: Maybe<CreditLine_Mutation_Response>
  /** update single row of the table: "creditLine" */
  update_creditLine_by_pk?: Maybe<CreditLine>
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>
  /** update data of the table: "loan_participants" */
  update_loan_participants?: Maybe<Loan_Participants_Mutation_Response>
  /** update single row of the table: "loan_participants" */
  update_loan_participants_by_pk?: Maybe<Loan_Participants>
  /** update data of the table: "loan_requests" */
  update_loan_requests?: Maybe<Loan_Requests_Mutation_Response>
  /** update single row of the table: "loan_requests" */
  update_loan_requests_by_pk?: Maybe<Loan_Requests>
  /** update data of the table: "recommendation_risk" */
  update_recommendation_risk?: Maybe<Recommendation_Risk_Mutation_Response>
  /** update single row of the table: "recommendation_risk" */
  update_recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
  /** update data of the table: "scenario_actions" */
  update_scenario_actions?: Maybe<Scenario_Actions_Mutation_Response>
  /** update single row of the table: "scenario_actions" */
  update_scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** update data of the table: "supporters" */
  update_supporters?: Maybe<Supporters_Mutation_Response>
  /** update single row of the table: "supporters" */
  update_supporters_by_pk?: Maybe<Supporters>
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>
}

/** mutation root */
export type Mutation_RootDelete_Action_TypeArgs = {
  where: Action_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Action_Type_By_PkArgs = {
  value: Scalars["String"]
}

/** mutation root */
export type Mutation_RootDelete_CreditLineArgs = {
  where: CreditLine_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_CreditLine_By_PkArgs = {
  borrower: Scalars["uuid"]
  investor: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Loan_ParticipantsArgs = {
  where: Loan_Participants_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Loan_Participants_By_PkArgs = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Loan_RequestsArgs = {
  where: Loan_Requests_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Loan_Requests_By_PkArgs = {
  request_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Recommendation_RiskArgs = {
  where: Recommendation_Risk_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Recommendation_Risk_By_PkArgs = {
  recommender_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Scenario_ActionsArgs = {
  where: Scenario_Actions_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Scenario_Actions_By_PkArgs = {
  id: Scalars["Int"]
}

/** mutation root */
export type Mutation_RootDelete_SupportersArgs = {
  where: Supporters_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Supporters_By_PkArgs = {
  request_id: Scalars["uuid"]
  supporter_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootInsert_Action_TypeArgs = {
  objects: Array<Action_Type_Insert_Input>
  on_conflict?: Maybe<Action_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Action_Type_OneArgs = {
  object: Action_Type_Insert_Input
  on_conflict?: Maybe<Action_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_CreditLineArgs = {
  objects: Array<CreditLine_Insert_Input>
  on_conflict?: Maybe<CreditLine_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_CreditLine_OneArgs = {
  object: CreditLine_Insert_Input
  on_conflict?: Maybe<CreditLine_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>
  on_conflict?: Maybe<Events_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input
  on_conflict?: Maybe<Events_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_ParticipantsArgs = {
  objects: Array<Loan_Participants_Insert_Input>
  on_conflict?: Maybe<Loan_Participants_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_Participants_OneArgs = {
  object: Loan_Participants_Insert_Input
  on_conflict?: Maybe<Loan_Participants_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_RequestsArgs = {
  objects: Array<Loan_Requests_Insert_Input>
  on_conflict?: Maybe<Loan_Requests_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_Requests_OneArgs = {
  object: Loan_Requests_Insert_Input
  on_conflict?: Maybe<Loan_Requests_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Recommendation_RiskArgs = {
  objects: Array<Recommendation_Risk_Insert_Input>
  on_conflict?: Maybe<Recommendation_Risk_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Recommendation_Risk_OneArgs = {
  object: Recommendation_Risk_Insert_Input
  on_conflict?: Maybe<Recommendation_Risk_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Scenario_ActionsArgs = {
  objects: Array<Scenario_Actions_Insert_Input>
  on_conflict?: Maybe<Scenario_Actions_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Scenario_Actions_OneArgs = {
  object: Scenario_Actions_Insert_Input
  on_conflict?: Maybe<Scenario_Actions_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_SupportersArgs = {
  objects: Array<Supporters_Insert_Input>
  on_conflict?: Maybe<Supporters_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Supporters_OneArgs = {
  object: Supporters_Insert_Input
  on_conflict?: Maybe<Supporters_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>
  on_conflict?: Maybe<User_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input
  on_conflict?: Maybe<User_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_Action_TypeArgs = {
  _set?: Maybe<Action_Type_Set_Input>
  where: Action_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Action_Type_By_PkArgs = {
  _set?: Maybe<Action_Type_Set_Input>
  pk_columns: Action_Type_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_CreditLineArgs = {
  _set?: Maybe<CreditLine_Set_Input>
  where: CreditLine_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_CreditLine_By_PkArgs = {
  _set?: Maybe<CreditLine_Set_Input>
  pk_columns: CreditLine_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _append?: Maybe<Events_Append_Input>
  _delete_at_path?: Maybe<Events_Delete_At_Path_Input>
  _delete_elem?: Maybe<Events_Delete_Elem_Input>
  _delete_key?: Maybe<Events_Delete_Key_Input>
  _prepend?: Maybe<Events_Prepend_Input>
  _set?: Maybe<Events_Set_Input>
  where: Events_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _append?: Maybe<Events_Append_Input>
  _delete_at_path?: Maybe<Events_Delete_At_Path_Input>
  _delete_elem?: Maybe<Events_Delete_Elem_Input>
  _delete_key?: Maybe<Events_Delete_Key_Input>
  _prepend?: Maybe<Events_Prepend_Input>
  _set?: Maybe<Events_Set_Input>
  pk_columns: Events_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Loan_ParticipantsArgs = {
  _inc?: Maybe<Loan_Participants_Inc_Input>
  _set?: Maybe<Loan_Participants_Set_Input>
  where: Loan_Participants_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Loan_Participants_By_PkArgs = {
  _inc?: Maybe<Loan_Participants_Inc_Input>
  _set?: Maybe<Loan_Participants_Set_Input>
  pk_columns: Loan_Participants_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Loan_RequestsArgs = {
  _append?: Maybe<Loan_Requests_Append_Input>
  _delete_at_path?: Maybe<Loan_Requests_Delete_At_Path_Input>
  _delete_elem?: Maybe<Loan_Requests_Delete_Elem_Input>
  _delete_key?: Maybe<Loan_Requests_Delete_Key_Input>
  _inc?: Maybe<Loan_Requests_Inc_Input>
  _prepend?: Maybe<Loan_Requests_Prepend_Input>
  _set?: Maybe<Loan_Requests_Set_Input>
  where: Loan_Requests_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Loan_Requests_By_PkArgs = {
  _append?: Maybe<Loan_Requests_Append_Input>
  _delete_at_path?: Maybe<Loan_Requests_Delete_At_Path_Input>
  _delete_elem?: Maybe<Loan_Requests_Delete_Elem_Input>
  _delete_key?: Maybe<Loan_Requests_Delete_Key_Input>
  _inc?: Maybe<Loan_Requests_Inc_Input>
  _prepend?: Maybe<Loan_Requests_Prepend_Input>
  _set?: Maybe<Loan_Requests_Set_Input>
  pk_columns: Loan_Requests_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Recommendation_RiskArgs = {
  _append?: Maybe<Recommendation_Risk_Append_Input>
  _delete_at_path?: Maybe<Recommendation_Risk_Delete_At_Path_Input>
  _delete_elem?: Maybe<Recommendation_Risk_Delete_Elem_Input>
  _delete_key?: Maybe<Recommendation_Risk_Delete_Key_Input>
  _prepend?: Maybe<Recommendation_Risk_Prepend_Input>
  _set?: Maybe<Recommendation_Risk_Set_Input>
  where: Recommendation_Risk_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Recommendation_Risk_By_PkArgs = {
  _append?: Maybe<Recommendation_Risk_Append_Input>
  _delete_at_path?: Maybe<Recommendation_Risk_Delete_At_Path_Input>
  _delete_elem?: Maybe<Recommendation_Risk_Delete_Elem_Input>
  _delete_key?: Maybe<Recommendation_Risk_Delete_Key_Input>
  _prepend?: Maybe<Recommendation_Risk_Prepend_Input>
  _set?: Maybe<Recommendation_Risk_Set_Input>
  pk_columns: Recommendation_Risk_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Scenario_ActionsArgs = {
  _append?: Maybe<Scenario_Actions_Append_Input>
  _delete_at_path?: Maybe<Scenario_Actions_Delete_At_Path_Input>
  _delete_elem?: Maybe<Scenario_Actions_Delete_Elem_Input>
  _delete_key?: Maybe<Scenario_Actions_Delete_Key_Input>
  _inc?: Maybe<Scenario_Actions_Inc_Input>
  _prepend?: Maybe<Scenario_Actions_Prepend_Input>
  _set?: Maybe<Scenario_Actions_Set_Input>
  where: Scenario_Actions_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Scenario_Actions_By_PkArgs = {
  _append?: Maybe<Scenario_Actions_Append_Input>
  _delete_at_path?: Maybe<Scenario_Actions_Delete_At_Path_Input>
  _delete_elem?: Maybe<Scenario_Actions_Delete_Elem_Input>
  _delete_key?: Maybe<Scenario_Actions_Delete_Key_Input>
  _inc?: Maybe<Scenario_Actions_Inc_Input>
  _prepend?: Maybe<Scenario_Actions_Prepend_Input>
  _set?: Maybe<Scenario_Actions_Set_Input>
  pk_columns: Scenario_Actions_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_SupportersArgs = {
  _append?: Maybe<Supporters_Append_Input>
  _delete_at_path?: Maybe<Supporters_Delete_At_Path_Input>
  _delete_elem?: Maybe<Supporters_Delete_Elem_Input>
  _delete_key?: Maybe<Supporters_Delete_Key_Input>
  _inc?: Maybe<Supporters_Inc_Input>
  _prepend?: Maybe<Supporters_Prepend_Input>
  _set?: Maybe<Supporters_Set_Input>
  where: Supporters_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Supporters_By_PkArgs = {
  _append?: Maybe<Supporters_Append_Input>
  _delete_at_path?: Maybe<Supporters_Delete_At_Path_Input>
  _delete_elem?: Maybe<Supporters_Delete_Elem_Input>
  _delete_key?: Maybe<Supporters_Delete_Key_Input>
  _inc?: Maybe<Supporters_Inc_Input>
  _prepend?: Maybe<Supporters_Prepend_Input>
  _set?: Maybe<Supporters_Set_Input>
  pk_columns: Supporters_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _append?: Maybe<User_Append_Input>
  _delete_at_path?: Maybe<User_Delete_At_Path_Input>
  _delete_elem?: Maybe<User_Delete_Elem_Input>
  _delete_key?: Maybe<User_Delete_Key_Input>
  _inc?: Maybe<User_Inc_Input>
  _prepend?: Maybe<User_Prepend_Input>
  _set?: Maybe<User_Set_Input>
  where: User_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _append?: Maybe<User_Append_Input>
  _delete_at_path?: Maybe<User_Delete_At_Path_Input>
  _delete_elem?: Maybe<User_Delete_Elem_Input>
  _delete_key?: Maybe<User_Delete_Key_Input>
  _inc?: Maybe<User_Inc_Input>
  _prepend?: Maybe<User_Prepend_Input>
  _set?: Maybe<User_Set_Input>
  pk_columns: User_Pk_Columns_Input
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = "asc",
  /** in the ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in the ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in the descending order, nulls first */
  Desc = "desc",
  /** in the descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in the descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

/** query root */
export type Query_Root = {
  __typename?: "query_root"
  /** fetch data from the table: "action_type" */
  action_type: Array<Action_Type>
  /** fetch aggregated fields from the table: "action_type" */
  action_type_aggregate: Action_Type_Aggregate
  /** fetch data from the table: "action_type" using primary key columns */
  action_type_by_pk?: Maybe<Action_Type>
  /** fetch data from the table: "creditLine" */
  creditLine: Array<CreditLine>
  /** fetch aggregated fields from the table: "creditLine" */
  creditLine_aggregate: CreditLine_Aggregate
  /** fetch data from the table: "creditLine" using primary key columns */
  creditLine_by_pk?: Maybe<CreditLine>
  /** fetch data from the table: "events" */
  events: Array<Events>
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>
  /** fetch data from the table: "loan_participants" */
  loan_participants: Array<Loan_Participants>
  /** fetch aggregated fields from the table: "loan_participants" */
  loan_participants_aggregate: Loan_Participants_Aggregate
  /** fetch data from the table: "loan_participants" using primary key columns */
  loan_participants_by_pk?: Maybe<Loan_Participants>
  /** fetch data from the table: "loan_requests" */
  loan_requests: Array<Loan_Requests>
  /** fetch aggregated fields from the table: "loan_requests" */
  loan_requests_aggregate: Loan_Requests_Aggregate
  /** fetch data from the table: "loan_requests" using primary key columns */
  loan_requests_by_pk?: Maybe<Loan_Requests>
  /** fetch data from the table: "recommendation_risk" */
  recommendation_risk: Array<Recommendation_Risk>
  /** fetch aggregated fields from the table: "recommendation_risk" */
  recommendation_risk_aggregate: Recommendation_Risk_Aggregate
  /** fetch data from the table: "recommendation_risk" using primary key columns */
  recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
  /** fetch data from the table: "scenario_actions" */
  scenario_actions: Array<Scenario_Actions>
  /** fetch aggregated fields from the table: "scenario_actions" */
  scenario_actions_aggregate: Scenario_Actions_Aggregate
  /** fetch data from the table: "scenario_actions" using primary key columns */
  scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** fetch data from the table: "supporters" */
  supporters: Array<Supporters>
  /** fetch aggregated fields from the table: "supporters" */
  supporters_aggregate: Supporters_Aggregate
  /** fetch data from the table: "supporters" using primary key columns */
  supporters_by_pk?: Maybe<Supporters>
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
}

/** query root */
export type Query_RootAction_TypeArgs = {
  distinct_on?: Maybe<Array<Action_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Action_Type_Order_By>>
  where?: Maybe<Action_Type_Bool_Exp>
}

/** query root */
export type Query_RootAction_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Action_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Action_Type_Order_By>>
  where?: Maybe<Action_Type_Bool_Exp>
}

/** query root */
export type Query_RootAction_Type_By_PkArgs = {
  value: Scalars["String"]
}

/** query root */
export type Query_RootCreditLineArgs = {
  distinct_on?: Maybe<Array<CreditLine_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<CreditLine_Order_By>>
  where?: Maybe<CreditLine_Bool_Exp>
}

/** query root */
export type Query_RootCreditLine_AggregateArgs = {
  distinct_on?: Maybe<Array<CreditLine_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<CreditLine_Order_By>>
  where?: Maybe<CreditLine_Bool_Exp>
}

/** query root */
export type Query_RootCreditLine_By_PkArgs = {
  borrower: Scalars["uuid"]
  investor: Scalars["uuid"]
}

/** query root */
export type Query_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Events_Order_By>>
  where?: Maybe<Events_Bool_Exp>
}

/** query root */
export type Query_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Events_Order_By>>
  where?: Maybe<Events_Bool_Exp>
}

/** query root */
export type Query_RootEvents_By_PkArgs = {
  id: Scalars["uuid"]
}

/** query root */
export type Query_RootLoan_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Participants_By_PkArgs = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** query root */
export type Query_RootLoan_RequestsArgs = {
  distinct_on?: Maybe<Array<Loan_Requests_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Requests_Order_By>>
  where?: Maybe<Loan_Requests_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Requests_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Requests_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Requests_Order_By>>
  where?: Maybe<Loan_Requests_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Requests_By_PkArgs = {
  request_id: Scalars["uuid"]
}

/** query root */
export type Query_RootRecommendation_RiskArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** query root */
export type Query_RootRecommendation_Risk_AggregateArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** query root */
export type Query_RootRecommendation_Risk_By_PkArgs = {
  recommender_id: Scalars["uuid"]
}

/** query root */
export type Query_RootScenario_ActionsArgs = {
  distinct_on?: Maybe<Array<Scenario_Actions_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Scenario_Actions_Order_By>>
  where?: Maybe<Scenario_Actions_Bool_Exp>
}

/** query root */
export type Query_RootScenario_Actions_AggregateArgs = {
  distinct_on?: Maybe<Array<Scenario_Actions_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Scenario_Actions_Order_By>>
  where?: Maybe<Scenario_Actions_Bool_Exp>
}

/** query root */
export type Query_RootScenario_Actions_By_PkArgs = {
  id: Scalars["Int"]
}

/** query root */
export type Query_RootSupportersArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** query root */
export type Query_RootSupporters_AggregateArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** query root */
export type Query_RootSupporters_By_PkArgs = {
  request_id: Scalars["uuid"]
  supporter_id: Scalars["uuid"]
}

/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

/** query root */
export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

/** query root */
export type Query_RootUser_By_PkArgs = {
  id: Scalars["uuid"]
}

/** columns and relationships of "recommendation_risk" */
export type Recommendation_Risk = {
  __typename?: "recommendation_risk"
  agent_id?: Maybe<Scalars["uuid"]>
  recommender_id: Scalars["uuid"]
  risk_params?: Maybe<Scalars["jsonb"]>
  updated_at: Scalars["timestamptz"]
  /** An object relationship */
  user?: Maybe<User>
  /** An object relationship */
  userByNeighborId: User
}

/** columns and relationships of "recommendation_risk" */
export type Recommendation_RiskRisk_ParamsArgs = {
  path?: Maybe<Scalars["String"]>
}

/** aggregated selection of "recommendation_risk" */
export type Recommendation_Risk_Aggregate = {
  __typename?: "recommendation_risk_aggregate"
  aggregate?: Maybe<Recommendation_Risk_Aggregate_Fields>
  nodes: Array<Recommendation_Risk>
}

/** aggregate fields of "recommendation_risk" */
export type Recommendation_Risk_Aggregate_Fields = {
  __typename?: "recommendation_risk_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Recommendation_Risk_Max_Fields>
  min?: Maybe<Recommendation_Risk_Min_Fields>
}

/** aggregate fields of "recommendation_risk" */
export type Recommendation_Risk_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Recommendation_Risk_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "recommendation_risk" */
export type Recommendation_Risk_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Recommendation_Risk_Max_Order_By>
  min?: Maybe<Recommendation_Risk_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Recommendation_Risk_Append_Input = {
  risk_params?: Maybe<Scalars["jsonb"]>
}

/** input type for inserting array relation for remote table "recommendation_risk" */
export type Recommendation_Risk_Arr_Rel_Insert_Input = {
  data: Array<Recommendation_Risk_Insert_Input>
  on_conflict?: Maybe<Recommendation_Risk_On_Conflict>
}

/** Boolean expression to filter rows from the table "recommendation_risk". All fields are combined with a logical 'AND'. */
export type Recommendation_Risk_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Recommendation_Risk_Bool_Exp>>>
  _not?: Maybe<Recommendation_Risk_Bool_Exp>
  _or?: Maybe<Array<Maybe<Recommendation_Risk_Bool_Exp>>>
  agent_id?: Maybe<Uuid_Comparison_Exp>
  recommender_id?: Maybe<Uuid_Comparison_Exp>
  risk_params?: Maybe<Jsonb_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
  userByNeighborId?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "recommendation_risk" */
export enum Recommendation_Risk_Constraint {
  /** unique or primary key constraint */
  RecommendationRiskPkey = "recommendation_risk_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Recommendation_Risk_Delete_At_Path_Input = {
  risk_params?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Recommendation_Risk_Delete_Elem_Input = {
  risk_params?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Recommendation_Risk_Delete_Key_Input = {
  risk_params?: Maybe<Scalars["String"]>
}

/** input type for inserting data into table "recommendation_risk" */
export type Recommendation_Risk_Insert_Input = {
  agent_id?: Maybe<Scalars["uuid"]>
  recommender_id?: Maybe<Scalars["uuid"]>
  risk_params?: Maybe<Scalars["jsonb"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user?: Maybe<User_Obj_Rel_Insert_Input>
  userByNeighborId?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Recommendation_Risk_Max_Fields = {
  __typename?: "recommendation_risk_max_fields"
  agent_id?: Maybe<Scalars["uuid"]>
  recommender_id?: Maybe<Scalars["uuid"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by max() on columns of table "recommendation_risk" */
export type Recommendation_Risk_Max_Order_By = {
  agent_id?: Maybe<Order_By>
  recommender_id?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Recommendation_Risk_Min_Fields = {
  __typename?: "recommendation_risk_min_fields"
  agent_id?: Maybe<Scalars["uuid"]>
  recommender_id?: Maybe<Scalars["uuid"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by min() on columns of table "recommendation_risk" */
export type Recommendation_Risk_Min_Order_By = {
  agent_id?: Maybe<Order_By>
  recommender_id?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** response of any mutation on the table "recommendation_risk" */
export type Recommendation_Risk_Mutation_Response = {
  __typename?: "recommendation_risk_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Recommendation_Risk>
}

/** input type for inserting object relation for remote table "recommendation_risk" */
export type Recommendation_Risk_Obj_Rel_Insert_Input = {
  data: Recommendation_Risk_Insert_Input
  on_conflict?: Maybe<Recommendation_Risk_On_Conflict>
}

/** on conflict condition type for table "recommendation_risk" */
export type Recommendation_Risk_On_Conflict = {
  constraint: Recommendation_Risk_Constraint
  update_columns: Array<Recommendation_Risk_Update_Column>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** ordering options when selecting data from "recommendation_risk" */
export type Recommendation_Risk_Order_By = {
  agent_id?: Maybe<Order_By>
  recommender_id?: Maybe<Order_By>
  risk_params?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user?: Maybe<User_Order_By>
  userByNeighborId?: Maybe<User_Order_By>
}

/** primary key columns input for table: "recommendation_risk" */
export type Recommendation_Risk_Pk_Columns_Input = {
  recommender_id: Scalars["uuid"]
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Recommendation_Risk_Prepend_Input = {
  risk_params?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "recommendation_risk" */
export enum Recommendation_Risk_Select_Column {
  /** column name */
  AgentId = "agent_id",
  /** column name */
  RecommenderId = "recommender_id",
  /** column name */
  RiskParams = "risk_params",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "recommendation_risk" */
export type Recommendation_Risk_Set_Input = {
  agent_id?: Maybe<Scalars["uuid"]>
  recommender_id?: Maybe<Scalars["uuid"]>
  risk_params?: Maybe<Scalars["jsonb"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** update columns of table "recommendation_risk" */
export enum Recommendation_Risk_Update_Column {
  /** column name */
  AgentId = "agent_id",
  /** column name */
  RecommenderId = "recommender_id",
  /** column name */
  RiskParams = "risk_params",
  /** column name */
  UpdatedAt = "updated_at",
}

/** columns and relationships of "scenario_actions" */
export type Scenario_Actions = {
  __typename?: "scenario_actions"
  action_type: Action_Type_Enum
  id: Scalars["Int"]
  payload: Scalars["jsonb"]
}

/** columns and relationships of "scenario_actions" */
export type Scenario_ActionsPayloadArgs = {
  path?: Maybe<Scalars["String"]>
}

/** aggregated selection of "scenario_actions" */
export type Scenario_Actions_Aggregate = {
  __typename?: "scenario_actions_aggregate"
  aggregate?: Maybe<Scenario_Actions_Aggregate_Fields>
  nodes: Array<Scenario_Actions>
}

/** aggregate fields of "scenario_actions" */
export type Scenario_Actions_Aggregate_Fields = {
  __typename?: "scenario_actions_aggregate_fields"
  avg?: Maybe<Scenario_Actions_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Scenario_Actions_Max_Fields>
  min?: Maybe<Scenario_Actions_Min_Fields>
  stddev?: Maybe<Scenario_Actions_Stddev_Fields>
  stddev_pop?: Maybe<Scenario_Actions_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Scenario_Actions_Stddev_Samp_Fields>
  sum?: Maybe<Scenario_Actions_Sum_Fields>
  var_pop?: Maybe<Scenario_Actions_Var_Pop_Fields>
  var_samp?: Maybe<Scenario_Actions_Var_Samp_Fields>
  variance?: Maybe<Scenario_Actions_Variance_Fields>
}

/** aggregate fields of "scenario_actions" */
export type Scenario_Actions_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Scenario_Actions_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "scenario_actions" */
export type Scenario_Actions_Aggregate_Order_By = {
  avg?: Maybe<Scenario_Actions_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Scenario_Actions_Max_Order_By>
  min?: Maybe<Scenario_Actions_Min_Order_By>
  stddev?: Maybe<Scenario_Actions_Stddev_Order_By>
  stddev_pop?: Maybe<Scenario_Actions_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Scenario_Actions_Stddev_Samp_Order_By>
  sum?: Maybe<Scenario_Actions_Sum_Order_By>
  var_pop?: Maybe<Scenario_Actions_Var_Pop_Order_By>
  var_samp?: Maybe<Scenario_Actions_Var_Samp_Order_By>
  variance?: Maybe<Scenario_Actions_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Scenario_Actions_Append_Input = {
  payload?: Maybe<Scalars["jsonb"]>
}

/** input type for inserting array relation for remote table "scenario_actions" */
export type Scenario_Actions_Arr_Rel_Insert_Input = {
  data: Array<Scenario_Actions_Insert_Input>
  on_conflict?: Maybe<Scenario_Actions_On_Conflict>
}

/** aggregate avg on columns */
export type Scenario_Actions_Avg_Fields = {
  __typename?: "scenario_actions_avg_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "scenario_actions" */
export type Scenario_Actions_Avg_Order_By = {
  id?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "scenario_actions". All fields are combined with a logical 'AND'. */
export type Scenario_Actions_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Scenario_Actions_Bool_Exp>>>
  _not?: Maybe<Scenario_Actions_Bool_Exp>
  _or?: Maybe<Array<Maybe<Scenario_Actions_Bool_Exp>>>
  action_type?: Maybe<Action_Type_Enum_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  payload?: Maybe<Jsonb_Comparison_Exp>
}

/** unique or primary key constraints on table "scenario_actions" */
export enum Scenario_Actions_Constraint {
  /** unique or primary key constraint */
  ScenarioActionsPkey = "scenario_actions_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Scenario_Actions_Delete_At_Path_Input = {
  payload?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Scenario_Actions_Delete_Elem_Input = {
  payload?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Scenario_Actions_Delete_Key_Input = {
  payload?: Maybe<Scalars["String"]>
}

/** input type for incrementing integer column in table "scenario_actions" */
export type Scenario_Actions_Inc_Input = {
  id?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "scenario_actions" */
export type Scenario_Actions_Insert_Input = {
  action_type?: Maybe<Action_Type_Enum>
  id?: Maybe<Scalars["Int"]>
  payload?: Maybe<Scalars["jsonb"]>
}

/** aggregate max on columns */
export type Scenario_Actions_Max_Fields = {
  __typename?: "scenario_actions_max_fields"
  id?: Maybe<Scalars["Int"]>
}

/** order by max() on columns of table "scenario_actions" */
export type Scenario_Actions_Max_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Scenario_Actions_Min_Fields = {
  __typename?: "scenario_actions_min_fields"
  id?: Maybe<Scalars["Int"]>
}

/** order by min() on columns of table "scenario_actions" */
export type Scenario_Actions_Min_Order_By = {
  id?: Maybe<Order_By>
}

/** response of any mutation on the table "scenario_actions" */
export type Scenario_Actions_Mutation_Response = {
  __typename?: "scenario_actions_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Scenario_Actions>
}

/** input type for inserting object relation for remote table "scenario_actions" */
export type Scenario_Actions_Obj_Rel_Insert_Input = {
  data: Scenario_Actions_Insert_Input
  on_conflict?: Maybe<Scenario_Actions_On_Conflict>
}

/** on conflict condition type for table "scenario_actions" */
export type Scenario_Actions_On_Conflict = {
  constraint: Scenario_Actions_Constraint
  update_columns: Array<Scenario_Actions_Update_Column>
  where?: Maybe<Scenario_Actions_Bool_Exp>
}

/** ordering options when selecting data from "scenario_actions" */
export type Scenario_Actions_Order_By = {
  action_type?: Maybe<Order_By>
  id?: Maybe<Order_By>
  payload?: Maybe<Order_By>
}

/** primary key columns input for table: "scenario_actions" */
export type Scenario_Actions_Pk_Columns_Input = {
  id: Scalars["Int"]
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Scenario_Actions_Prepend_Input = {
  payload?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "scenario_actions" */
export enum Scenario_Actions_Select_Column {
  /** column name */
  ActionType = "action_type",
  /** column name */
  Id = "id",
  /** column name */
  Payload = "payload",
}

/** input type for updating data in table "scenario_actions" */
export type Scenario_Actions_Set_Input = {
  action_type?: Maybe<Action_Type_Enum>
  id?: Maybe<Scalars["Int"]>
  payload?: Maybe<Scalars["jsonb"]>
}

/** aggregate stddev on columns */
export type Scenario_Actions_Stddev_Fields = {
  __typename?: "scenario_actions_stddev_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "scenario_actions" */
export type Scenario_Actions_Stddev_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Scenario_Actions_Stddev_Pop_Fields = {
  __typename?: "scenario_actions_stddev_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "scenario_actions" */
export type Scenario_Actions_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Scenario_Actions_Stddev_Samp_Fields = {
  __typename?: "scenario_actions_stddev_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "scenario_actions" */
export type Scenario_Actions_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Scenario_Actions_Sum_Fields = {
  __typename?: "scenario_actions_sum_fields"
  id?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "scenario_actions" */
export type Scenario_Actions_Sum_Order_By = {
  id?: Maybe<Order_By>
}

/** update columns of table "scenario_actions" */
export enum Scenario_Actions_Update_Column {
  /** column name */
  ActionType = "action_type",
  /** column name */
  Id = "id",
  /** column name */
  Payload = "payload",
}

/** aggregate var_pop on columns */
export type Scenario_Actions_Var_Pop_Fields = {
  __typename?: "scenario_actions_var_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "scenario_actions" */
export type Scenario_Actions_Var_Pop_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Scenario_Actions_Var_Samp_Fields = {
  __typename?: "scenario_actions_var_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "scenario_actions" */
export type Scenario_Actions_Var_Samp_Order_By = {
  id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Scenario_Actions_Variance_Fields = {
  __typename?: "scenario_actions_variance_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "scenario_actions" */
export type Scenario_Actions_Variance_Order_By = {
  id?: Maybe<Order_By>
}

/** subscription root */
export type Subscription_Root = {
  __typename?: "subscription_root"
  /** fetch data from the table: "action_type" */
  action_type: Array<Action_Type>
  /** fetch aggregated fields from the table: "action_type" */
  action_type_aggregate: Action_Type_Aggregate
  /** fetch data from the table: "action_type" using primary key columns */
  action_type_by_pk?: Maybe<Action_Type>
  /** fetch data from the table: "creditLine" */
  creditLine: Array<CreditLine>
  /** fetch aggregated fields from the table: "creditLine" */
  creditLine_aggregate: CreditLine_Aggregate
  /** fetch data from the table: "creditLine" using primary key columns */
  creditLine_by_pk?: Maybe<CreditLine>
  /** fetch data from the table: "events" */
  events: Array<Events>
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>
  /** fetch data from the table: "loan_participants" */
  loan_participants: Array<Loan_Participants>
  /** fetch aggregated fields from the table: "loan_participants" */
  loan_participants_aggregate: Loan_Participants_Aggregate
  /** fetch data from the table: "loan_participants" using primary key columns */
  loan_participants_by_pk?: Maybe<Loan_Participants>
  /** fetch data from the table: "loan_requests" */
  loan_requests: Array<Loan_Requests>
  /** fetch aggregated fields from the table: "loan_requests" */
  loan_requests_aggregate: Loan_Requests_Aggregate
  /** fetch data from the table: "loan_requests" using primary key columns */
  loan_requests_by_pk?: Maybe<Loan_Requests>
  /** fetch data from the table: "recommendation_risk" */
  recommendation_risk: Array<Recommendation_Risk>
  /** fetch aggregated fields from the table: "recommendation_risk" */
  recommendation_risk_aggregate: Recommendation_Risk_Aggregate
  /** fetch data from the table: "recommendation_risk" using primary key columns */
  recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
  /** fetch data from the table: "scenario_actions" */
  scenario_actions: Array<Scenario_Actions>
  /** fetch aggregated fields from the table: "scenario_actions" */
  scenario_actions_aggregate: Scenario_Actions_Aggregate
  /** fetch data from the table: "scenario_actions" using primary key columns */
  scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** fetch data from the table: "supporters" */
  supporters: Array<Supporters>
  /** fetch aggregated fields from the table: "supporters" */
  supporters_aggregate: Supporters_Aggregate
  /** fetch data from the table: "supporters" using primary key columns */
  supporters_by_pk?: Maybe<Supporters>
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
}

/** subscription root */
export type Subscription_RootAction_TypeArgs = {
  distinct_on?: Maybe<Array<Action_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Action_Type_Order_By>>
  where?: Maybe<Action_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAction_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Action_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Action_Type_Order_By>>
  where?: Maybe<Action_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAction_Type_By_PkArgs = {
  value: Scalars["String"]
}

/** subscription root */
export type Subscription_RootCreditLineArgs = {
  distinct_on?: Maybe<Array<CreditLine_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<CreditLine_Order_By>>
  where?: Maybe<CreditLine_Bool_Exp>
}

/** subscription root */
export type Subscription_RootCreditLine_AggregateArgs = {
  distinct_on?: Maybe<Array<CreditLine_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<CreditLine_Order_By>>
  where?: Maybe<CreditLine_Bool_Exp>
}

/** subscription root */
export type Subscription_RootCreditLine_By_PkArgs = {
  borrower: Scalars["uuid"]
  investor: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Events_Order_By>>
  where?: Maybe<Events_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Events_Order_By>>
  where?: Maybe<Events_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootLoan_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Participants_By_PkArgs = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootLoan_RequestsArgs = {
  distinct_on?: Maybe<Array<Loan_Requests_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Requests_Order_By>>
  where?: Maybe<Loan_Requests_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Requests_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Requests_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Requests_Order_By>>
  where?: Maybe<Loan_Requests_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Requests_By_PkArgs = {
  request_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootRecommendation_RiskArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** subscription root */
export type Subscription_RootRecommendation_Risk_AggregateArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** subscription root */
export type Subscription_RootRecommendation_Risk_By_PkArgs = {
  recommender_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootScenario_ActionsArgs = {
  distinct_on?: Maybe<Array<Scenario_Actions_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Scenario_Actions_Order_By>>
  where?: Maybe<Scenario_Actions_Bool_Exp>
}

/** subscription root */
export type Subscription_RootScenario_Actions_AggregateArgs = {
  distinct_on?: Maybe<Array<Scenario_Actions_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Scenario_Actions_Order_By>>
  where?: Maybe<Scenario_Actions_Bool_Exp>
}

/** subscription root */
export type Subscription_RootScenario_Actions_By_PkArgs = {
  id: Scalars["Int"]
}

/** subscription root */
export type Subscription_RootSupportersArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSupporters_AggregateArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSupporters_By_PkArgs = {
  request_id: Scalars["uuid"]
  supporter_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  id: Scalars["uuid"]
}

/** columns and relationships of "supporters" */
export type Supporters = {
  __typename?: "supporters"
  guarantee_division?: Maybe<Scalars["jsonb"]>
  info?: Maybe<Scalars["jsonb"]>
  invest_in_corpus: Scalars["Boolean"]
  /** An object relationship */
  loan_request: Loan_Requests
  participation_request_time: Scalars["timestamptz"]
  pledge_amount: Scalars["float8"]
  request_id: Scalars["uuid"]
  status: Scalars["String"]
  supporter_id: Scalars["uuid"]
  /** An object relationship */
  user: User
}

/** columns and relationships of "supporters" */
export type SupportersGuarantee_DivisionArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "supporters" */
export type SupportersInfoArgs = {
  path?: Maybe<Scalars["String"]>
}

/** aggregated selection of "supporters" */
export type Supporters_Aggregate = {
  __typename?: "supporters_aggregate"
  aggregate?: Maybe<Supporters_Aggregate_Fields>
  nodes: Array<Supporters>
}

/** aggregate fields of "supporters" */
export type Supporters_Aggregate_Fields = {
  __typename?: "supporters_aggregate_fields"
  avg?: Maybe<Supporters_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Supporters_Max_Fields>
  min?: Maybe<Supporters_Min_Fields>
  stddev?: Maybe<Supporters_Stddev_Fields>
  stddev_pop?: Maybe<Supporters_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Supporters_Stddev_Samp_Fields>
  sum?: Maybe<Supporters_Sum_Fields>
  var_pop?: Maybe<Supporters_Var_Pop_Fields>
  var_samp?: Maybe<Supporters_Var_Samp_Fields>
  variance?: Maybe<Supporters_Variance_Fields>
}

/** aggregate fields of "supporters" */
export type Supporters_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Supporters_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "supporters" */
export type Supporters_Aggregate_Order_By = {
  avg?: Maybe<Supporters_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Supporters_Max_Order_By>
  min?: Maybe<Supporters_Min_Order_By>
  stddev?: Maybe<Supporters_Stddev_Order_By>
  stddev_pop?: Maybe<Supporters_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Supporters_Stddev_Samp_Order_By>
  sum?: Maybe<Supporters_Sum_Order_By>
  var_pop?: Maybe<Supporters_Var_Pop_Order_By>
  var_samp?: Maybe<Supporters_Var_Samp_Order_By>
  variance?: Maybe<Supporters_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Supporters_Append_Input = {
  guarantee_division?: Maybe<Scalars["jsonb"]>
  info?: Maybe<Scalars["jsonb"]>
}

/** input type for inserting array relation for remote table "supporters" */
export type Supporters_Arr_Rel_Insert_Input = {
  data: Array<Supporters_Insert_Input>
  on_conflict?: Maybe<Supporters_On_Conflict>
}

/** aggregate avg on columns */
export type Supporters_Avg_Fields = {
  __typename?: "supporters_avg_fields"
  pledge_amount?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "supporters" */
export type Supporters_Avg_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "supporters". All fields are combined with a logical 'AND'. */
export type Supporters_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Supporters_Bool_Exp>>>
  _not?: Maybe<Supporters_Bool_Exp>
  _or?: Maybe<Array<Maybe<Supporters_Bool_Exp>>>
  guarantee_division?: Maybe<Jsonb_Comparison_Exp>
  info?: Maybe<Jsonb_Comparison_Exp>
  invest_in_corpus?: Maybe<Boolean_Comparison_Exp>
  loan_request?: Maybe<Loan_Requests_Bool_Exp>
  participation_request_time?: Maybe<Timestamptz_Comparison_Exp>
  pledge_amount?: Maybe<Float8_Comparison_Exp>
  request_id?: Maybe<Uuid_Comparison_Exp>
  status?: Maybe<String_Comparison_Exp>
  supporter_id?: Maybe<Uuid_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "supporters" */
export enum Supporters_Constraint {
  /** unique or primary key constraint */
  SupportersPkey = "supporters_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Supporters_Delete_At_Path_Input = {
  guarantee_division?: Maybe<Array<Maybe<Scalars["String"]>>>
  info?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Supporters_Delete_Elem_Input = {
  guarantee_division?: Maybe<Scalars["Int"]>
  info?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Supporters_Delete_Key_Input = {
  guarantee_division?: Maybe<Scalars["String"]>
  info?: Maybe<Scalars["String"]>
}

/** input type for incrementing integer column in table "supporters" */
export type Supporters_Inc_Input = {
  pledge_amount?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "supporters" */
export type Supporters_Insert_Input = {
  guarantee_division?: Maybe<Scalars["jsonb"]>
  info?: Maybe<Scalars["jsonb"]>
  invest_in_corpus?: Maybe<Scalars["Boolean"]>
  loan_request?: Maybe<Loan_Requests_Obj_Rel_Insert_Input>
  participation_request_time?: Maybe<Scalars["timestamptz"]>
  pledge_amount?: Maybe<Scalars["float8"]>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  supporter_id?: Maybe<Scalars["uuid"]>
  user?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Supporters_Max_Fields = {
  __typename?: "supporters_max_fields"
  participation_request_time?: Maybe<Scalars["timestamptz"]>
  pledge_amount?: Maybe<Scalars["float8"]>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  supporter_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "supporters" */
export type Supporters_Max_Order_By = {
  participation_request_time?: Maybe<Order_By>
  pledge_amount?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  supporter_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Supporters_Min_Fields = {
  __typename?: "supporters_min_fields"
  participation_request_time?: Maybe<Scalars["timestamptz"]>
  pledge_amount?: Maybe<Scalars["float8"]>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  supporter_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "supporters" */
export type Supporters_Min_Order_By = {
  participation_request_time?: Maybe<Order_By>
  pledge_amount?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  supporter_id?: Maybe<Order_By>
}

/** response of any mutation on the table "supporters" */
export type Supporters_Mutation_Response = {
  __typename?: "supporters_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Supporters>
}

/** input type for inserting object relation for remote table "supporters" */
export type Supporters_Obj_Rel_Insert_Input = {
  data: Supporters_Insert_Input
  on_conflict?: Maybe<Supporters_On_Conflict>
}

/** on conflict condition type for table "supporters" */
export type Supporters_On_Conflict = {
  constraint: Supporters_Constraint
  update_columns: Array<Supporters_Update_Column>
  where?: Maybe<Supporters_Bool_Exp>
}

/** ordering options when selecting data from "supporters" */
export type Supporters_Order_By = {
  guarantee_division?: Maybe<Order_By>
  info?: Maybe<Order_By>
  invest_in_corpus?: Maybe<Order_By>
  loan_request?: Maybe<Loan_Requests_Order_By>
  participation_request_time?: Maybe<Order_By>
  pledge_amount?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  supporter_id?: Maybe<Order_By>
  user?: Maybe<User_Order_By>
}

/** primary key columns input for table: "supporters" */
export type Supporters_Pk_Columns_Input = {
  request_id: Scalars["uuid"]
  supporter_id: Scalars["uuid"]
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Supporters_Prepend_Input = {
  guarantee_division?: Maybe<Scalars["jsonb"]>
  info?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "supporters" */
export enum Supporters_Select_Column {
  /** column name */
  GuaranteeDivision = "guarantee_division",
  /** column name */
  Info = "info",
  /** column name */
  InvestInCorpus = "invest_in_corpus",
  /** column name */
  ParticipationRequestTime = "participation_request_time",
  /** column name */
  PledgeAmount = "pledge_amount",
  /** column name */
  RequestId = "request_id",
  /** column name */
  Status = "status",
  /** column name */
  SupporterId = "supporter_id",
}

/** input type for updating data in table "supporters" */
export type Supporters_Set_Input = {
  guarantee_division?: Maybe<Scalars["jsonb"]>
  info?: Maybe<Scalars["jsonb"]>
  invest_in_corpus?: Maybe<Scalars["Boolean"]>
  participation_request_time?: Maybe<Scalars["timestamptz"]>
  pledge_amount?: Maybe<Scalars["float8"]>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  supporter_id?: Maybe<Scalars["uuid"]>
}

/** aggregate stddev on columns */
export type Supporters_Stddev_Fields = {
  __typename?: "supporters_stddev_fields"
  pledge_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "supporters" */
export type Supporters_Stddev_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Supporters_Stddev_Pop_Fields = {
  __typename?: "supporters_stddev_pop_fields"
  pledge_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "supporters" */
export type Supporters_Stddev_Pop_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Supporters_Stddev_Samp_Fields = {
  __typename?: "supporters_stddev_samp_fields"
  pledge_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "supporters" */
export type Supporters_Stddev_Samp_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Supporters_Sum_Fields = {
  __typename?: "supporters_sum_fields"
  pledge_amount?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "supporters" */
export type Supporters_Sum_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** update columns of table "supporters" */
export enum Supporters_Update_Column {
  /** column name */
  GuaranteeDivision = "guarantee_division",
  /** column name */
  Info = "info",
  /** column name */
  InvestInCorpus = "invest_in_corpus",
  /** column name */
  ParticipationRequestTime = "participation_request_time",
  /** column name */
  PledgeAmount = "pledge_amount",
  /** column name */
  RequestId = "request_id",
  /** column name */
  Status = "status",
  /** column name */
  SupporterId = "supporter_id",
}

/** aggregate var_pop on columns */
export type Supporters_Var_Pop_Fields = {
  __typename?: "supporters_var_pop_fields"
  pledge_amount?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "supporters" */
export type Supporters_Var_Pop_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Supporters_Var_Samp_Fields = {
  __typename?: "supporters_var_samp_fields"
  pledge_amount?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "supporters" */
export type Supporters_Var_Samp_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Supporters_Variance_Fields = {
  __typename?: "supporters_variance_fields"
  pledge_amount?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "supporters" */
export type Supporters_Variance_Order_By = {
  pledge_amount?: Maybe<Order_By>
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars["timestamptz"]>
  _gt?: Maybe<Scalars["timestamptz"]>
  _gte?: Maybe<Scalars["timestamptz"]>
  _in?: Maybe<Array<Scalars["timestamptz"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["timestamptz"]>
  _lte?: Maybe<Scalars["timestamptz"]>
  _neq?: Maybe<Scalars["timestamptz"]>
  _nin?: Maybe<Array<Scalars["timestamptz"]>>
}

/** columns and relationships of "user" */
export type User = {
  __typename?: "user"
  account_details?: Maybe<Scalars["jsonb"]>
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  created_at: Scalars["timestamptz"]
  /** An array relationship */
  creditLines: Array<CreditLine>
  /** An aggregated array relationship */
  creditLines_aggregate: CreditLine_Aggregate
  demographic_info?: Maybe<Scalars["jsonb"]>
  email: Scalars["String"]
  /** An array relationship */
  events: Array<Events>
  /** An aggregated array relationship */
  events_aggregate: Events_Aggregate
  id: Scalars["uuid"]
  kyc_approved?: Maybe<Scalars["Boolean"]>
  /** An array relationship */
  loan_participants: Array<Loan_Participants>
  /** An aggregated array relationship */
  loan_participants_aggregate: Loan_Participants_Aggregate
  /** An array relationship */
  loan_requests: Array<Loan_Requests>
  /** An aggregated array relationship */
  loan_requests_aggregate: Loan_Requests_Aggregate
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  name: Scalars["String"]
  onboarded?: Maybe<Scalars["Boolean"]>
  phone: Scalars["String"]
  /** An array relationship */
  recommendationRisksByRecommenderId: Array<Recommendation_Risk>
  /** An aggregated array relationship */
  recommendationRisksByRecommenderId_aggregate: Recommendation_Risk_Aggregate
  /** An array relationship */
  recommendation_risks: Array<Recommendation_Risk>
  /** An aggregated array relationship */
  recommendation_risks_aggregate: Recommendation_Risk_Aggregate
  roi?: Maybe<Scalars["jsonb"]>
  /** An array relationship */
  supporters: Array<Supporters>
  /** An aggregated array relationship */
  supporters_aggregate: Supporters_Aggregate
  updated_at: Scalars["timestamptz"]
  user_number: Scalars["Int"]
  user_type: Scalars["user_t"]
}

/** columns and relationships of "user" */
export type UserAccount_DetailsArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "user" */
export type UserCreditLinesArgs = {
  distinct_on?: Maybe<Array<CreditLine_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<CreditLine_Order_By>>
  where?: Maybe<CreditLine_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserCreditLines_AggregateArgs = {
  distinct_on?: Maybe<Array<CreditLine_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<CreditLine_Order_By>>
  where?: Maybe<CreditLine_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserDemographic_InfoArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "user" */
export type UserEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Events_Order_By>>
  where?: Maybe<Events_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Events_Order_By>>
  where?: Maybe<Events_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoan_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoan_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Participants_Order_By>>
  where?: Maybe<Loan_Participants_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoan_RequestsArgs = {
  distinct_on?: Maybe<Array<Loan_Requests_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Requests_Order_By>>
  where?: Maybe<Loan_Requests_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoan_Requests_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Requests_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Requests_Order_By>>
  where?: Maybe<Loan_Requests_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserRecommendationRisksByRecommenderIdArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserRecommendationRisksByRecommenderId_AggregateArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserRecommendation_RisksArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserRecommendation_Risks_AggregateArgs = {
  distinct_on?: Maybe<Array<Recommendation_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Recommendation_Risk_Order_By>>
  where?: Maybe<Recommendation_Risk_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserRoiArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "user" */
export type UserSupportersArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserSupporters_AggregateArgs = {
  distinct_on?: Maybe<Array<Supporters_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Supporters_Order_By>>
  where?: Maybe<Supporters_Bool_Exp>
}

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: "user_aggregate"
  aggregate?: Maybe<User_Aggregate_Fields>
  nodes: Array<User>
}

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: "user_aggregate_fields"
  avg?: Maybe<User_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<User_Max_Fields>
  min?: Maybe<User_Min_Fields>
  stddev?: Maybe<User_Stddev_Fields>
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>
  sum?: Maybe<User_Sum_Fields>
  var_pop?: Maybe<User_Var_Pop_Fields>
  var_samp?: Maybe<User_Var_Samp_Fields>
  variance?: Maybe<User_Variance_Fields>
}

/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  avg?: Maybe<User_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<User_Max_Order_By>
  min?: Maybe<User_Min_Order_By>
  stddev?: Maybe<User_Stddev_Order_By>
  stddev_pop?: Maybe<User_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<User_Stddev_Samp_Order_By>
  sum?: Maybe<User_Sum_Order_By>
  var_pop?: Maybe<User_Var_Pop_Order_By>
  var_samp?: Maybe<User_Var_Samp_Order_By>
  variance?: Maybe<User_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type User_Append_Input = {
  account_details?: Maybe<Scalars["jsonb"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  roi?: Maybe<Scalars["jsonb"]>
}

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>
  on_conflict?: Maybe<User_On_Conflict>
}

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: "user_avg_fields"
  balance?: Maybe<Scalars["Float"]>
  corpus_share?: Maybe<Scalars["Float"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "user" */
export type User_Avg_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>
  _not?: Maybe<User_Bool_Exp>
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>
  account_details?: Maybe<Jsonb_Comparison_Exp>
  balance?: Maybe<Float8_Comparison_Exp>
  corpus_share?: Maybe<Float8_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  creditLines?: Maybe<CreditLine_Bool_Exp>
  demographic_info?: Maybe<Jsonb_Comparison_Exp>
  email?: Maybe<String_Comparison_Exp>
  events?: Maybe<Events_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  kyc_approved?: Maybe<Boolean_Comparison_Exp>
  loan_participants?: Maybe<Loan_Participants_Bool_Exp>
  loan_requests?: Maybe<Loan_Requests_Bool_Exp>
  max_exposure?: Maybe<Float_Comparison_Exp>
  min_interest_rate?: Maybe<Float_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  onboarded?: Maybe<Boolean_Comparison_Exp>
  phone?: Maybe<String_Comparison_Exp>
  recommendationRisksByRecommenderId?: Maybe<Recommendation_Risk_Bool_Exp>
  recommendation_risks?: Maybe<Recommendation_Risk_Bool_Exp>
  roi?: Maybe<Jsonb_Comparison_Exp>
  supporters?: Maybe<Supporters_Bool_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  user_number?: Maybe<Int_Comparison_Exp>
  user_type?: Maybe<User_T_Comparison_Exp>
}

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserEmailKey = "user_email_key",
  /** unique or primary key constraint */
  UserPkey = "user_pkey",
  /** unique or primary key constraint */
  UserUserNumberKey = "user_user_number_key",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type User_Delete_At_Path_Input = {
  account_details?: Maybe<Array<Maybe<Scalars["String"]>>>
  demographic_info?: Maybe<Array<Maybe<Scalars["String"]>>>
  roi?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type User_Delete_Elem_Input = {
  account_details?: Maybe<Scalars["Int"]>
  demographic_info?: Maybe<Scalars["Int"]>
  roi?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type User_Delete_Key_Input = {
  account_details?: Maybe<Scalars["String"]>
  demographic_info?: Maybe<Scalars["String"]>
  roi?: Maybe<Scalars["String"]>
}

/** input type for incrementing integer column in table "user" */
export type User_Inc_Input = {
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  account_details?: Maybe<Scalars["jsonb"]>
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  creditLines?: Maybe<CreditLine_Arr_Rel_Insert_Input>
  demographic_info?: Maybe<Scalars["jsonb"]>
  email?: Maybe<Scalars["String"]>
  events?: Maybe<Events_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars["uuid"]>
  kyc_approved?: Maybe<Scalars["Boolean"]>
  loan_participants?: Maybe<Loan_Participants_Arr_Rel_Insert_Input>
  loan_requests?: Maybe<Loan_Requests_Arr_Rel_Insert_Input>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  onboarded?: Maybe<Scalars["Boolean"]>
  phone?: Maybe<Scalars["String"]>
  recommendationRisksByRecommenderId?: Maybe<Recommendation_Risk_Arr_Rel_Insert_Input>
  recommendation_risks?: Maybe<Recommendation_Risk_Arr_Rel_Insert_Input>
  roi?: Maybe<Scalars["jsonb"]>
  supporters?: Maybe<Supporters_Arr_Rel_Insert_Input>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user_number?: Maybe<Scalars["Int"]>
  user_type?: Maybe<Scalars["user_t"]>
}

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: "user_max_fields"
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user_number?: Maybe<Scalars["Int"]>
}

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  id?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  name?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: "user_min_fields"
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user_number?: Maybe<Scalars["Int"]>
}

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  id?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  name?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: "user_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<User>
}

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input
  on_conflict?: Maybe<User_On_Conflict>
}

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint
  update_columns: Array<User_Update_Column>
  where?: Maybe<User_Bool_Exp>
}

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  account_details?: Maybe<Order_By>
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  creditLines_aggregate?: Maybe<CreditLine_Aggregate_Order_By>
  demographic_info?: Maybe<Order_By>
  email?: Maybe<Order_By>
  events_aggregate?: Maybe<Events_Aggregate_Order_By>
  id?: Maybe<Order_By>
  kyc_approved?: Maybe<Order_By>
  loan_participants_aggregate?: Maybe<Loan_Participants_Aggregate_Order_By>
  loan_requests_aggregate?: Maybe<Loan_Requests_Aggregate_Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  name?: Maybe<Order_By>
  onboarded?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  recommendationRisksByRecommenderId_aggregate?: Maybe<Recommendation_Risk_Aggregate_Order_By>
  recommendation_risks_aggregate?: Maybe<Recommendation_Risk_Aggregate_Order_By>
  roi?: Maybe<Order_By>
  supporters_aggregate?: Maybe<Supporters_Aggregate_Order_By>
  updated_at?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
  user_type?: Maybe<Order_By>
}

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars["uuid"]
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type User_Prepend_Input = {
  account_details?: Maybe<Scalars["jsonb"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  roi?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  AccountDetails = "account_details",
  /** column name */
  Balance = "balance",
  /** column name */
  CorpusShare = "corpus_share",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DemographicInfo = "demographic_info",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  KycApproved = "kyc_approved",
  /** column name */
  MaxExposure = "max_exposure",
  /** column name */
  MinInterestRate = "min_interest_rate",
  /** column name */
  Name = "name",
  /** column name */
  Onboarded = "onboarded",
  /** column name */
  Phone = "phone",
  /** column name */
  Roi = "roi",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserNumber = "user_number",
  /** column name */
  UserType = "user_type",
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  account_details?: Maybe<Scalars["jsonb"]>
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  kyc_approved?: Maybe<Scalars["Boolean"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  onboarded?: Maybe<Scalars["Boolean"]>
  phone?: Maybe<Scalars["String"]>
  roi?: Maybe<Scalars["jsonb"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user_number?: Maybe<Scalars["Int"]>
  user_type?: Maybe<Scalars["user_t"]>
}

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: "user_stddev_fields"
  balance?: Maybe<Scalars["Float"]>
  corpus_share?: Maybe<Scalars["Float"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "user" */
export type User_Stddev_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: "user_stddev_pop_fields"
  balance?: Maybe<Scalars["Float"]>
  corpus_share?: Maybe<Scalars["Float"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "user" */
export type User_Stddev_Pop_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: "user_stddev_samp_fields"
  balance?: Maybe<Scalars["Float"]>
  corpus_share?: Maybe<Scalars["Float"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "user" */
export type User_Stddev_Samp_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: "user_sum_fields"
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "user" */
export type User_Sum_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** expression to compare columns of type user_t. All fields are combined with logical 'AND'. */
export type User_T_Comparison_Exp = {
  _eq?: Maybe<Scalars["user_t"]>
  _gt?: Maybe<Scalars["user_t"]>
  _gte?: Maybe<Scalars["user_t"]>
  _in?: Maybe<Array<Scalars["user_t"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["user_t"]>
  _lte?: Maybe<Scalars["user_t"]>
  _neq?: Maybe<Scalars["user_t"]>
  _nin?: Maybe<Array<Scalars["user_t"]>>
}

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  AccountDetails = "account_details",
  /** column name */
  Balance = "balance",
  /** column name */
  CorpusShare = "corpus_share",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DemographicInfo = "demographic_info",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  KycApproved = "kyc_approved",
  /** column name */
  MaxExposure = "max_exposure",
  /** column name */
  MinInterestRate = "min_interest_rate",
  /** column name */
  Name = "name",
  /** column name */
  Onboarded = "onboarded",
  /** column name */
  Phone = "phone",
  /** column name */
  Roi = "roi",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserNumber = "user_number",
  /** column name */
  UserType = "user_type",
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: "user_var_pop_fields"
  balance?: Maybe<Scalars["Float"]>
  corpus_share?: Maybe<Scalars["Float"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "user" */
export type User_Var_Pop_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: "user_var_samp_fields"
  balance?: Maybe<Scalars["Float"]>
  corpus_share?: Maybe<Scalars["Float"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "user" */
export type User_Var_Samp_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: "user_variance_fields"
  balance?: Maybe<Scalars["Float"]>
  corpus_share?: Maybe<Scalars["Float"]>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  user_number?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "user" */
export type User_Variance_Order_By = {
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  user_number?: Maybe<Order_By>
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars["uuid"]>
  _gt?: Maybe<Scalars["uuid"]>
  _gte?: Maybe<Scalars["uuid"]>
  _in?: Maybe<Array<Scalars["uuid"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["uuid"]>
  _lte?: Maybe<Scalars["uuid"]>
  _neq?: Maybe<Scalars["uuid"]>
  _nin?: Maybe<Array<Scalars["uuid"]>>
}

export type ChangeUserCashBalanceMutationVariables = Exact<{
  userId: Scalars["uuid"]
  delta: Scalars["float8"]
}>

export type ChangeUserCashBalanceMutation = { __typename?: "mutation_root" } & {
  user?: Maybe<{ __typename?: "user" } & Pick<User, "balance">>
}

export type CreateUserMutationVariables = Exact<{
  user: User_Insert_Input
}>

export type CreateUserMutation = { __typename?: "mutation_root" } & {
  insert_user_one?: Maybe<
    { __typename?: "user" } & Pick<
      User,
      | "id"
      | "created_at"
      | "email"
      | "user_type"
      | "name"
      | "roi"
      | "phone"
      | "demographic_info"
      | "account_details"
      | "user_number"
    >
  >
}

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllUsersQuery = { __typename?: "query_root" } & {
  user: Array<
    { __typename?: "user" } & Pick<
      User,
      | "id"
      | "email"
      | "name"
      | "user_type"
      | "balance"
      | "roi"
      | "user_number"
      | "corpus_share"
      | "kyc_approved"
      | "demographic_info"
    >
  >
}

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars["String"]
}>

export type GetUserByEmailQuery = { __typename?: "query_root" } & {
  user: Array<
    { __typename?: "user" } & Pick<
      User,
      | "id"
      | "name"
      | "email"
      | "phone"
      | "user_type"
      | "balance"
      | "corpus_share"
      | "created_at"
      | "kyc_approved"
      | "demographic_info"
      | "onboarded"
      | "roi"
    > & {
        loan_requests: Array<
          { __typename?: "loan_requests" } & Pick<
            Loan_Requests,
            | "request_id"
            | "confirmation_date"
            | "payback_status"
            | "purpose"
            | "risk_calc_result"
            | "balance"
            | "loan"
            | "status"
            | "created_at"
            | "amount"
          > & {
              supporters: Array<
                { __typename?: "supporters" } & Pick<
                  Supporters,
                  "pledge_amount" | "status"
                > & {
                    user: { __typename?: "user" } & Pick<
                      User,
                      "id" | "name" | "email"
                    >
                  }
              >
            }
        >
        loans_to_repay: Array<
          { __typename?: "loan_requests" } & Pick<
            Loan_Requests,
            "request_id" | "status" | "loan"
          >
        >
        pledge_requests: Array<
          { __typename?: "supporters" } & PledgeFieldsFragment
        >
        pledges: Array<{ __typename?: "supporters" } & PledgeFieldsFragment>
        active_loans: Array<
          { __typename?: "loan_participants" } & Pick<
            Loan_Participants,
            "loan_id" | "lender_amount"
          > & {
              loan_request: { __typename?: "loan_requests" } & Pick<
                Loan_Requests,
                "status" | "amount" | "loan"
              >
            }
        >
      }
  >
}

export type PledgeFieldsFragment = { __typename?: "supporters" } & Pick<
  Supporters,
  "request_id" | "pledge_amount" | "participation_request_time"
> & {
    loan_request: { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "purpose" | "amount" | "status" | "risk_calc_result" | "loan"
    > & { user: { __typename?: "user" } & Pick<User, "email" | "name"> }
  }

export type ApproveKycMutationVariables = Exact<{
  userId: Scalars["uuid"]
  kycApproved: Scalars["Boolean"]
}>

export type ApproveKycMutation = { __typename?: "mutation_root" } & {
  user?: Maybe<{ __typename?: "user" } & Pick<User, "id" | "kyc_approved">>
}

export type UpdateUserRoiMutationVariables = Exact<{
  userId: Scalars["uuid"]
  newRoi: Scalars["jsonb"]
}>

export type UpdateUserRoiMutation = { __typename?: "mutation_root" } & {
  user?: Maybe<{ __typename?: "user" } & Pick<User, "id" | "roi">>
}

export type GetAllActionsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllActionsQuery = { __typename?: "query_root" } & {
  scenario_actions: Array<
    { __typename?: "scenario_actions" } & Pick<
      Scenario_Actions,
      "id" | "action_type" | "payload"
    >
  >
}

export type InsertEventMutationVariables = Exact<{
  event: Events_Insert_Input
}>

export type InsertEventMutation = { __typename?: "mutation_root" } & {
  insert_events_one?: Maybe<
    { __typename?: "events" } & Pick<
      Events,
      "id" | "event_type" | "headers" | "data"
    > & { user?: Maybe<{ __typename?: "user" } & Pick<User, "id" | "email">> }
  >
}

export type InsertScenarioActionMutationVariables = Exact<{
  action: Scenario_Actions_Insert_Input
}>

export type InsertScenarioActionMutation = { __typename?: "mutation_root" } & {
  insert_scenario_actions_one?: Maybe<
    { __typename?: "scenario_actions" } & Pick<
      Scenario_Actions,
      "id" | "action_type" | "payload"
    >
  >
}

export type AddSupporterMutationVariables = Exact<{
  supporter: Supporters_Insert_Input
}>

export type AddSupporterMutation = { __typename?: "mutation_root" } & {
  insert_supporters_one?: Maybe<
    { __typename?: "supporters" } & Pick<
      Supporters,
      "status" | "supporter_id" | "pledge_amount" | "info"
    >
  >
}

export type CreateLoanRequestMutationVariables = Exact<{
  request: Loan_Requests_Insert_Input
}>

export type CreateLoanRequestMutation = { __typename?: "mutation_root" } & {
  loanRequest?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "amount" | "purpose" | "status" | "risk_calc_result"
    >
  >
}

export type GetBorrowersQueryVariables = Exact<{ [key: string]: never }>

export type GetBorrowersQuery = { __typename?: "query_root" } & {
  borrowers: Array<
    { __typename?: "user" } & Pick<User, "name"> & {
        loan_requests: Array<
          { __typename?: "loan_requests" } & Pick<
            Loan_Requests,
            "amount" | "status" | "request_id" | "confirmation_date" | "purpose"
          >
        >
      }
  >
}

export type GetCorpusRecommendationRisksQueryVariables = Exact<{
  userIds?: Maybe<Array<Scalars["uuid"]>>
}>

export type GetCorpusRecommendationRisksQuery = {
  __typename?: "query_root"
} & {
  recommendation_risk: Array<
    { __typename?: "recommendation_risk" } & Pick<
      Recommendation_Risk,
      "recommender_id" | "risk_params"
    >
  >
}

export type GetLastLiveLoanQueryVariables = Exact<{ [key: string]: never }>

export type GetLastLiveLoanQuery = { __typename?: "query_root" } & {
  last_live_loan: Array<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "status" | "loan"
    >
  >
}

export type GetLenderAllocationInputQueryVariables = Exact<{
  [key: string]: never
}>

export type GetLenderAllocationInputQuery = { __typename?: "query_root" } & {
  lenders: Array<
    { __typename?: "user" } & Pick<
      User,
      "name" | "user_number" | "id" | "balance" | "corpus_share"
    >
  >
  corpusCash: { __typename?: "user_aggregate" } & {
    aggregate?: Maybe<
      { __typename?: "user_aggregate_fields" } & {
        sum?: Maybe<
          { __typename?: "user_sum_fields" } & Pick<User_Sum_Fields, "balance">
        >
      }
    >
  }
}

export type GetLoanOfferQueryVariables = Exact<{
  request_id: Scalars["uuid"]
}>

export type GetLoanOfferQuery = { __typename?: "query_root" } & {
  loanRequest?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "borrower_id" | "risk_calc_result" | "amount"
    >
  >
}

export type GetLoanRequestQueryVariables = Exact<{
  requestId: Scalars["uuid"]
}>

export type GetLoanRequestQuery = { __typename?: "query_root" } & {
  loanRequest?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      | "request_id"
      | "borrower_id"
      | "purpose"
      | "amount"
      | "status"
      | "risk_calc_result"
      | "loan"
      | "balance"
      | "payback_status"
    > & {
        supporters: Array<
          { __typename?: "supporters" } & Pick<
            Supporters,
            "status" | "supporter_id" | "pledge_amount"
          > & {
              user: { __typename?: "user" } & Pick<
                User,
                "id" | "email" | "corpus_share" | "balance"
              >
            }
        >
        user: { __typename?: "user" } & Pick<
          User,
          "id" | "email" | "demographic_info"
        >
      }
  >
}

export type GetLoanRequestsQueryVariables = Exact<{ [key: string]: never }>

export type GetLoanRequestsQuery = { __typename?: "query_root" } & {
  loanRequests: Array<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "amount" | "status" | "risk_calc_result" | "loan"
    > & {
        borrowerInfo: { __typename?: "user" } & Pick<
          User,
          "id" | "demographic_info"
        >
        supporters: Array<
          { __typename?: "supporters" } & Pick<
            Supporters,
            "supporter_id" | "pledge_amount"
          > & {
              demographic_info: { __typename?: "user" } & Pick<
                User,
                "demographic_info"
              >
            }
        >
      }
  >
}

export type GetLoansByBorrowerAndStatusQueryVariables = Exact<{
  borrower_id: Scalars["uuid"]
  statusList: Array<Scalars["loan_request_status"]>
}>

export type GetLoansByBorrowerAndStatusQuery = { __typename?: "query_root" } & {
  loanRequests: Array<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "amount" | "status" | "risk_calc_result"
    >
  >
}

export type StartLoanMutationVariables = Exact<{
  request_id: Scalars["uuid"]
  lenders: Array<Loan_Participants_Insert_Input>
}>

export type StartLoanMutation = { __typename?: "mutation_root" } & {
  update_loan_requests_by_pk?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "status" | "amount"
    > & {
        supporters: Array<
          { __typename?: "supporters" } & Pick<Supporters, "pledge_amount"> & {
              user: { __typename?: "user" } & Pick<User, "email">
            }
        >
      }
  >
  lenders?: Maybe<
    { __typename?: "loan_participants_mutation_response" } & {
      returning: Array<
        { __typename?: "loan_participants" } & Pick<
          Loan_Participants,
          "lender_id"
        >
      >
    }
  >
}

export type UpdateLoanBalanceMutationVariables = Exact<{
  requestId: Scalars["uuid"]
  delta?: Maybe<Scalars["float8"]>
}>

export type UpdateLoanBalanceMutation = { __typename?: "mutation_root" } & {
  request?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "balance" | "request_id"
    >
  >
}

export type UpdateLoanRequestWithLoanDataMutationVariables = Exact<{
  requestId: Scalars["uuid"]
  loanData: Scalars["jsonb"]
  status: Scalars["loan_request_status"]
}>

export type UpdateLoanRequestWithLoanDataMutation = {
  __typename?: "mutation_root"
} & {
  loanRequest?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "loan" | "balance" | "status"
    >
  >
}

export type UpdateLoanRequestWithOfferMutationVariables = Exact<{
  requestId: Scalars["uuid"]
  newData: Scalars["jsonb"]
}>

export type UpdateLoanRequestWithOfferMutation = {
  __typename?: "mutation_root"
} & {
  loanRequest?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      | "request_id"
      | "loan"
      | "purpose"
      | "amount"
      | "status"
      | "risk_calc_result"
    >
  >
}

export type UpdateSupporterMutationVariables = Exact<{
  request_id: Scalars["uuid"]
  supporter_id: Scalars["uuid"]
  status: Scalars["String"]
  pledge_amount?: Maybe<Scalars["float8"]>
}>

export type UpdateSupporterMutation = { __typename?: "mutation_root" } & {
  supporter?: Maybe<
    { __typename?: "supporters" } & Pick<
      Supporters,
      "supporter_id" | "status" | "pledge_amount"
    > & {
        supported_request: { __typename?: "loan_requests" } & Pick<
          Loan_Requests,
          "amount"
        > & {
            supporters: Array<
              { __typename?: "supporters" } & Pick<
                Supporters,
                "status" | "pledge_amount"
              >
            >
          }
      }
  >
}

export type DeleteAllUsersMutationVariables = Exact<{ [key: string]: never }>

export type DeleteAllUsersMutation = { __typename?: "mutation_root" } & {
  delete_user?: Maybe<
    { __typename?: "user_mutation_response" } & Pick<
      User_Mutation_Response,
      "affected_rows"
    >
  >
}

export type ResetDbMutationVariables = Exact<{ [key: string]: never }>

export type ResetDbMutation = { __typename?: "mutation_root" } & {
  delete_supporters?: Maybe<
    { __typename?: "supporters_mutation_response" } & Pick<
      Supporters_Mutation_Response,
      "affected_rows"
    >
  >
  delete_recommendation_risk?: Maybe<
    { __typename?: "recommendation_risk_mutation_response" } & Pick<
      Recommendation_Risk_Mutation_Response,
      "affected_rows"
    >
  >
  delete_loan_participants?: Maybe<
    { __typename?: "loan_participants_mutation_response" } & Pick<
      Loan_Participants_Mutation_Response,
      "affected_rows"
    >
  >
  delete_loan_requests?: Maybe<
    { __typename?: "loan_requests_mutation_response" } & Pick<
      Loan_Requests_Mutation_Response,
      "affected_rows"
    >
  >
  delete_events?: Maybe<
    { __typename?: "events_mutation_response" } & Pick<
      Events_Mutation_Response,
      "affected_rows"
    >
  >
  delete_user?: Maybe<
    { __typename?: "user_mutation_response" } & Pick<
      User_Mutation_Response,
      "affected_rows"
    >
  >
  delete_scenario_actions?: Maybe<
    { __typename?: "scenario_actions_mutation_response" } & Pick<
      Scenario_Actions_Mutation_Response,
      "affected_rows"
    >
  >
}

export const PledgeFieldsFragmentDoc = gql`
  fragment pledgeFields on supporters {
    request_id
    pledge_amount
    participation_request_time
    loan_request {
      purpose
      amount
      status
      user {
        email
        name
      }
      risk_calc_result
      loan
    }
  }
`
export const ChangeUserCashBalanceDocument = gql`
  mutation ChangeUserCashBalance($userId: uuid!, $delta: float8!) {
    user: update_user_by_pk(
      pk_columns: { id: $userId }
      _inc: { balance: $delta }
    ) {
      balance
    }
  }
`
export const CreateUserDocument = gql`
  mutation CreateUser($user: user_insert_input!) {
    insert_user_one(
      object: $user
      on_conflict: {
        constraint: user_email_key
        update_columns: [name, phone, onboarded]
      }
    ) {
      id
      created_at
      email
      user_type
      name
      roi
      phone
      demographic_info
      account_details
      user_number
    }
  }
`
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    user {
      id
      email
      name
      user_type
      balance
      roi
      user_number
      corpus_share
      kyc_approved
      demographic_info
    }
  }
`
export const GetUserByEmailDocument = gql`
  query GetUserByEmail($email: String!) {
    user(where: { email: { _eq: $email } }) {
      id
      name
      email
      phone
      user_type
      balance
      corpus_share
      created_at
      kyc_approved
      demographic_info
      onboarded
      roi
      loan_requests {
        request_id
        confirmation_date
        payback_status
        purpose
        risk_calc_result
        balance
        loan
        status
        created_at
        amount
        purpose
        supporters {
          pledge_amount
          status
          user {
            id
            name
            email
          }
        }
      }
      loans_to_repay: loan_requests(where: { status: { _in: ["live"] } }) {
        request_id
        status
        loan
      }
      pledge_requests: supporters(where: { status: { _eq: "unknown" } }) {
        ...pledgeFields
      }
      pledges: supporters(
        where: {
          _and: {
            status: { _eq: "confirmed" }
            loan_request: {
              status: {
                _in: [
                  "initiated"
                  "awaiting_borrower_confirmation"
                  "live"
                  "settled"
                  "defaulted"
                ]
              }
            }
          }
        }
      ) {
        ...pledgeFields
      }
      active_loans: loan_participants(
        where: {
          loan_request: { status: { _in: ["live", "settled", "defaulted"] } }
        }
      ) {
        loan_id
        lender_amount
        loan_request {
          status
          amount
          loan
        }
      }
    }
  }
  ${PledgeFieldsFragmentDoc}
`
export const ApproveKycDocument = gql`
  mutation ApproveKYC($userId: uuid!, $kycApproved: Boolean!) {
    user: update_user_by_pk(
      pk_columns: { id: $userId }
      _set: { kyc_approved: $kycApproved }
    ) {
      id
      kyc_approved
    }
  }
`
export const UpdateUserRoiDocument = gql`
  mutation UpdateUserRoi($userId: uuid!, $newRoi: jsonb!) {
    user: update_user_by_pk(
      pk_columns: { id: $userId }
      _set: { roi: $newRoi }
    ) {
      id
      roi
    }
  }
`
export const GetAllActionsDocument = gql`
  query GetAllActions {
    scenario_actions {
      id
      action_type
      payload
    }
  }
`
export const InsertEventDocument = gql`
  mutation InsertEvent($event: events_insert_input!) {
    insert_events_one(object: $event) {
      id
      event_type
      user {
        id
        email
      }
      headers
      data
    }
  }
`
export const InsertScenarioActionDocument = gql`
  mutation InsertScenarioAction($action: scenario_actions_insert_input!) {
    insert_scenario_actions_one(object: $action) {
      id
      action_type
      payload
    }
  }
`
export const AddSupporterDocument = gql`
  mutation AddSupporter($supporter: supporters_insert_input!) {
    insert_supporters_one(object: $supporter) {
      status
      supporter_id
      pledge_amount
      info
    }
  }
`
export const CreateLoanRequestDocument = gql`
  mutation CreateLoanRequest($request: loan_requests_insert_input!) {
    loanRequest: insert_loan_requests_one(object: $request) {
      request_id
      amount
      purpose
      status
      risk_calc_result
    }
  }
`
export const GetBorrowersDocument = gql`
  query GetBorrowers {
    borrowers: user(
      where: {
        _and: [
          { user_type: { _eq: "borrower" } }
          { kyc_approved: { _eq: true } }
        ]
      }
    ) {
      name
      loan_requests {
        amount
        status
        request_id
        confirmation_date
        purpose
      }
    }
  }
`
export const GetCorpusRecommendationRisksDocument = gql`
  query GetCorpusRecommendationRisks($userIds: [uuid!]) {
    recommendation_risk(
      where: { recommender_id: { _in: $userIds }, agent_id: { _is_null: true } }
    ) {
      recommender_id
      risk_params
    }
  }
`
export const GetLastLiveLoanDocument = gql`
  query GetLastLiveLoan {
    last_live_loan: loan_requests(where: { status: { _eq: "live" } }) {
      request_id
      status
      loan
    }
  }
`
export const GetLenderAllocationInputDocument = gql`
  query GetLenderAllocationInput {
    lenders: user(where: { user_type: { _eq: "lender" } }) {
      name
      user_number
      id
      balance
      corpus_share
    }
    corpusCash: user_aggregate(where: { user_type: { _eq: "lender" } }) {
      aggregate {
        sum {
          balance
        }
      }
    }
  }
`
export const GetLoanOfferDocument = gql`
  query GetLoanOffer($request_id: uuid!) {
    loanRequest: loan_requests_by_pk(request_id: $request_id) {
      request_id
      borrower_id
      risk_calc_result
      amount
    }
  }
`
export const GetLoanRequestDocument = gql`
  query GetLoanRequest($requestId: uuid!) {
    loanRequest: loan_requests_by_pk(request_id: $requestId) {
      request_id
      borrower_id
      purpose
      amount
      status
      risk_calc_result
      loan
      balance
      payback_status
      supporters {
        status
        supporter_id
        pledge_amount
        user {
          id
          email
          corpus_share
          balance
        }
      }
      user {
        id
        email
        demographic_info
      }
    }
  }
`
export const GetLoanRequestsDocument = gql`
  query GetLoanRequests {
    loanRequests: loan_requests {
      request_id
      amount
      status
      risk_calc_result
      loan
      borrowerInfo: user {
        id
        demographic_info
      }
      supporters(where: { status: { _eq: "confirmed" } }) {
        supporter_id
        pledge_amount
        demographic_info: user {
          demographic_info
        }
      }
    }
  }
`
export const GetLoansByBorrowerAndStatusDocument = gql`
  query GetLoansByBorrowerAndStatus(
    $borrower_id: uuid!
    $statusList: [loan_request_status!]!
  ) {
    loanRequests: loan_requests(
      where: {
        _and: [
          { borrower_id: { _eq: $borrower_id } }
          { status: { _in: $statusList } }
        ]
      }
    ) {
      request_id
      amount
      status
      risk_calc_result
    }
  }
`
export const StartLoanDocument = gql`
  mutation StartLoan(
    $request_id: uuid!
    $lenders: [loan_participants_insert_input!]!
  ) {
    update_loan_requests_by_pk(
      pk_columns: { request_id: $request_id }
      _set: { status: "live" }
    ) {
      request_id
      status
      amount
      supporters {
        pledge_amount
        user {
          email
        }
      }
    }
    lenders: insert_loan_participants(objects: $lenders) {
      returning {
        lender_id
      }
    }
  }
`
export const UpdateLoanBalanceDocument = gql`
  mutation UpdateLoanBalance($requestId: uuid!, $delta: float8) {
    request: update_loan_requests_by_pk(
      pk_columns: { request_id: $requestId }
      _inc: { balance: $delta }
    ) {
      balance
      request_id
    }
  }
`
export const UpdateLoanRequestWithLoanDataDocument = gql`
  mutation UpdateLoanRequestWithLoanData(
    $requestId: uuid!
    $loanData: jsonb!
    $status: loan_request_status!
  ) {
    loanRequest: update_loan_requests_by_pk(
      pk_columns: { request_id: $requestId }
      _set: { loan: $loanData, status: $status }
    ) {
      request_id
      loan
      balance
      status
    }
  }
`
export const UpdateLoanRequestWithOfferDocument = gql`
  mutation UpdateLoanRequestWithOffer($requestId: uuid!, $newData: jsonb!) {
    loanRequest: update_loan_requests_by_pk(
      pk_columns: { request_id: $requestId }
      _set: {
        status: "awaiting_borrower_confirmation"
        risk_calc_result: $newData
      }
    ) {
      request_id
      loan
      purpose
      amount
      status
      risk_calc_result
    }
  }
`
export const UpdateSupporterDocument = gql`
  mutation UpdateSupporter(
    $request_id: uuid!
    $supporter_id: uuid!
    $status: String!
    $pledge_amount: float8
  ) {
    supporter: update_supporters_by_pk(
      pk_columns: { request_id: $request_id, supporter_id: $supporter_id }
      _set: { status: $status, pledge_amount: $pledge_amount }
    ) {
      supporter_id
      status
      pledge_amount
      supported_request: loan_request {
        amount
        supporters {
          status
          pledge_amount
        }
      }
    }
  }
`
export const DeleteAllUsersDocument = gql`
  mutation DeleteAllUsers {
    delete_user(where: {}) {
      affected_rows
    }
  }
`
export const ResetDbDocument = gql`
  mutation ResetDB {
    delete_supporters(where: {}) {
      affected_rows
    }
    delete_recommendation_risk(where: {}) {
      affected_rows
    }
    delete_loan_participants(where: {}) {
      affected_rows
    }
    delete_loan_requests(where: {}) {
      affected_rows
    }
    delete_events(where: {}) {
      affected_rows
    }
    delete_user(where: {}) {
      affected_rows
    }
    delete_scenario_actions(where: {}) {
      affected_rows
    }
  }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (sdkFunction) => sdkFunction()
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    ChangeUserCashBalance(
      variables: ChangeUserCashBalanceMutationVariables
    ): Promise<ChangeUserCashBalanceMutation> {
      return withWrapper(() =>
        client.request<ChangeUserCashBalanceMutation>(
          print(ChangeUserCashBalanceDocument),
          variables
        )
      )
    },
    CreateUser(
      variables: CreateUserMutationVariables
    ): Promise<CreateUserMutation> {
      return withWrapper(() =>
        client.request<CreateUserMutation>(print(CreateUserDocument), variables)
      )
    },
    GetAllUsers(
      variables?: GetAllUsersQueryVariables
    ): Promise<GetAllUsersQuery> {
      return withWrapper(() =>
        client.request<GetAllUsersQuery>(print(GetAllUsersDocument), variables)
      )
    },
    GetUserByEmail(
      variables: GetUserByEmailQueryVariables
    ): Promise<GetUserByEmailQuery> {
      return withWrapper(() =>
        client.request<GetUserByEmailQuery>(
          print(GetUserByEmailDocument),
          variables
        )
      )
    },
    ApproveKYC(
      variables: ApproveKycMutationVariables
    ): Promise<ApproveKycMutation> {
      return withWrapper(() =>
        client.request<ApproveKycMutation>(print(ApproveKycDocument), variables)
      )
    },
    UpdateUserRoi(
      variables: UpdateUserRoiMutationVariables
    ): Promise<UpdateUserRoiMutation> {
      return withWrapper(() =>
        client.request<UpdateUserRoiMutation>(
          print(UpdateUserRoiDocument),
          variables
        )
      )
    },
    GetAllActions(
      variables?: GetAllActionsQueryVariables
    ): Promise<GetAllActionsQuery> {
      return withWrapper(() =>
        client.request<GetAllActionsQuery>(
          print(GetAllActionsDocument),
          variables
        )
      )
    },
    InsertEvent(
      variables: InsertEventMutationVariables
    ): Promise<InsertEventMutation> {
      return withWrapper(() =>
        client.request<InsertEventMutation>(
          print(InsertEventDocument),
          variables
        )
      )
    },
    InsertScenarioAction(
      variables: InsertScenarioActionMutationVariables
    ): Promise<InsertScenarioActionMutation> {
      return withWrapper(() =>
        client.request<InsertScenarioActionMutation>(
          print(InsertScenarioActionDocument),
          variables
        )
      )
    },
    AddSupporter(
      variables: AddSupporterMutationVariables
    ): Promise<AddSupporterMutation> {
      return withWrapper(() =>
        client.request<AddSupporterMutation>(
          print(AddSupporterDocument),
          variables
        )
      )
    },
    CreateLoanRequest(
      variables: CreateLoanRequestMutationVariables
    ): Promise<CreateLoanRequestMutation> {
      return withWrapper(() =>
        client.request<CreateLoanRequestMutation>(
          print(CreateLoanRequestDocument),
          variables
        )
      )
    },
    GetBorrowers(
      variables?: GetBorrowersQueryVariables
    ): Promise<GetBorrowersQuery> {
      return withWrapper(() =>
        client.request<GetBorrowersQuery>(
          print(GetBorrowersDocument),
          variables
        )
      )
    },
    GetCorpusRecommendationRisks(
      variables?: GetCorpusRecommendationRisksQueryVariables
    ): Promise<GetCorpusRecommendationRisksQuery> {
      return withWrapper(() =>
        client.request<GetCorpusRecommendationRisksQuery>(
          print(GetCorpusRecommendationRisksDocument),
          variables
        )
      )
    },
    GetLastLiveLoan(
      variables?: GetLastLiveLoanQueryVariables
    ): Promise<GetLastLiveLoanQuery> {
      return withWrapper(() =>
        client.request<GetLastLiveLoanQuery>(
          print(GetLastLiveLoanDocument),
          variables
        )
      )
    },
    GetLenderAllocationInput(
      variables?: GetLenderAllocationInputQueryVariables
    ): Promise<GetLenderAllocationInputQuery> {
      return withWrapper(() =>
        client.request<GetLenderAllocationInputQuery>(
          print(GetLenderAllocationInputDocument),
          variables
        )
      )
    },
    GetLoanOffer(
      variables: GetLoanOfferQueryVariables
    ): Promise<GetLoanOfferQuery> {
      return withWrapper(() =>
        client.request<GetLoanOfferQuery>(
          print(GetLoanOfferDocument),
          variables
        )
      )
    },
    GetLoanRequest(
      variables: GetLoanRequestQueryVariables
    ): Promise<GetLoanRequestQuery> {
      return withWrapper(() =>
        client.request<GetLoanRequestQuery>(
          print(GetLoanRequestDocument),
          variables
        )
      )
    },
    GetLoanRequests(
      variables?: GetLoanRequestsQueryVariables
    ): Promise<GetLoanRequestsQuery> {
      return withWrapper(() =>
        client.request<GetLoanRequestsQuery>(
          print(GetLoanRequestsDocument),
          variables
        )
      )
    },
    GetLoansByBorrowerAndStatus(
      variables: GetLoansByBorrowerAndStatusQueryVariables
    ): Promise<GetLoansByBorrowerAndStatusQuery> {
      return withWrapper(() =>
        client.request<GetLoansByBorrowerAndStatusQuery>(
          print(GetLoansByBorrowerAndStatusDocument),
          variables
        )
      )
    },
    StartLoan(
      variables: StartLoanMutationVariables
    ): Promise<StartLoanMutation> {
      return withWrapper(() =>
        client.request<StartLoanMutation>(print(StartLoanDocument), variables)
      )
    },
    UpdateLoanBalance(
      variables: UpdateLoanBalanceMutationVariables
    ): Promise<UpdateLoanBalanceMutation> {
      return withWrapper(() =>
        client.request<UpdateLoanBalanceMutation>(
          print(UpdateLoanBalanceDocument),
          variables
        )
      )
    },
    UpdateLoanRequestWithLoanData(
      variables: UpdateLoanRequestWithLoanDataMutationVariables
    ): Promise<UpdateLoanRequestWithLoanDataMutation> {
      return withWrapper(() =>
        client.request<UpdateLoanRequestWithLoanDataMutation>(
          print(UpdateLoanRequestWithLoanDataDocument),
          variables
        )
      )
    },
    UpdateLoanRequestWithOffer(
      variables: UpdateLoanRequestWithOfferMutationVariables
    ): Promise<UpdateLoanRequestWithOfferMutation> {
      return withWrapper(() =>
        client.request<UpdateLoanRequestWithOfferMutation>(
          print(UpdateLoanRequestWithOfferDocument),
          variables
        )
      )
    },
    UpdateSupporter(
      variables: UpdateSupporterMutationVariables
    ): Promise<UpdateSupporterMutation> {
      return withWrapper(() =>
        client.request<UpdateSupporterMutation>(
          print(UpdateSupporterDocument),
          variables
        )
      )
    },
    DeleteAllUsers(
      variables?: DeleteAllUsersMutationVariables
    ): Promise<DeleteAllUsersMutation> {
      return withWrapper(() =>
        client.request<DeleteAllUsersMutation>(
          print(DeleteAllUsersDocument),
          variables
        )
      )
    },
    ResetDB(variables?: ResetDbMutationVariables): Promise<ResetDbMutation> {
      return withWrapper(() =>
        client.request<ResetDbMutation>(print(ResetDbDocument), variables)
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
