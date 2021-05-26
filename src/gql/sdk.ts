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
  date: any
  float8: any
  jsonb: any
  numeric: any
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

/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars["date"]>
  _gt?: Maybe<Scalars["date"]>
  _gte?: Maybe<Scalars["date"]>
  _in?: Maybe<Array<Scalars["date"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["date"]>
  _lte?: Maybe<Scalars["date"]>
  _neq?: Maybe<Scalars["date"]>
  _nin?: Maybe<Array<Scalars["date"]>>
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

/** columns and relationships of "lender_amount" */
export type Lender_Amount = {
  __typename?: "lender_amount"
  amount_lent: Scalars["float8"]
  /** An object relationship */
  lenderInfo: User
  lender_id: Scalars["uuid"]
  /** An object relationship */
  loan: Loan
  loan_id: Scalars["uuid"]
}

/** aggregated selection of "lender_amount" */
export type Lender_Amount_Aggregate = {
  __typename?: "lender_amount_aggregate"
  aggregate?: Maybe<Lender_Amount_Aggregate_Fields>
  nodes: Array<Lender_Amount>
}

/** aggregate fields of "lender_amount" */
export type Lender_Amount_Aggregate_Fields = {
  __typename?: "lender_amount_aggregate_fields"
  avg?: Maybe<Lender_Amount_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Lender_Amount_Max_Fields>
  min?: Maybe<Lender_Amount_Min_Fields>
  stddev?: Maybe<Lender_Amount_Stddev_Fields>
  stddev_pop?: Maybe<Lender_Amount_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Lender_Amount_Stddev_Samp_Fields>
  sum?: Maybe<Lender_Amount_Sum_Fields>
  var_pop?: Maybe<Lender_Amount_Var_Pop_Fields>
  var_samp?: Maybe<Lender_Amount_Var_Samp_Fields>
  variance?: Maybe<Lender_Amount_Variance_Fields>
}

/** aggregate fields of "lender_amount" */
export type Lender_Amount_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Lender_Amount_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "lender_amount" */
export type Lender_Amount_Aggregate_Order_By = {
  avg?: Maybe<Lender_Amount_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Lender_Amount_Max_Order_By>
  min?: Maybe<Lender_Amount_Min_Order_By>
  stddev?: Maybe<Lender_Amount_Stddev_Order_By>
  stddev_pop?: Maybe<Lender_Amount_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Lender_Amount_Stddev_Samp_Order_By>
  sum?: Maybe<Lender_Amount_Sum_Order_By>
  var_pop?: Maybe<Lender_Amount_Var_Pop_Order_By>
  var_samp?: Maybe<Lender_Amount_Var_Samp_Order_By>
  variance?: Maybe<Lender_Amount_Variance_Order_By>
}

/** input type for inserting array relation for remote table "lender_amount" */
export type Lender_Amount_Arr_Rel_Insert_Input = {
  data: Array<Lender_Amount_Insert_Input>
  on_conflict?: Maybe<Lender_Amount_On_Conflict>
}

/** aggregate avg on columns */
export type Lender_Amount_Avg_Fields = {
  __typename?: "lender_amount_avg_fields"
  amount_lent?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "lender_amount" */
export type Lender_Amount_Avg_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "lender_amount". All fields are combined with a logical 'AND'. */
export type Lender_Amount_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Lender_Amount_Bool_Exp>>>
  _not?: Maybe<Lender_Amount_Bool_Exp>
  _or?: Maybe<Array<Maybe<Lender_Amount_Bool_Exp>>>
  amount_lent?: Maybe<Float8_Comparison_Exp>
  lenderInfo?: Maybe<User_Bool_Exp>
  lender_id?: Maybe<Uuid_Comparison_Exp>
  loan?: Maybe<Loan_Bool_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "lender_amount" */
export enum Lender_Amount_Constraint {
  /** unique or primary key constraint */
  LenderAmountPkey = "lender_amount_pkey",
}

/** input type for incrementing integer column in table "lender_amount" */
export type Lender_Amount_Inc_Input = {
  amount_lent?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "lender_amount" */
export type Lender_Amount_Insert_Input = {
  amount_lent?: Maybe<Scalars["float8"]>
  lenderInfo?: Maybe<User_Obj_Rel_Insert_Input>
  lender_id?: Maybe<Scalars["uuid"]>
  loan?: Maybe<Loan_Obj_Rel_Insert_Input>
  loan_id?: Maybe<Scalars["uuid"]>
}

/** aggregate max on columns */
export type Lender_Amount_Max_Fields = {
  __typename?: "lender_amount_max_fields"
  amount_lent?: Maybe<Scalars["float8"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "lender_amount" */
export type Lender_Amount_Max_Order_By = {
  amount_lent?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Lender_Amount_Min_Fields = {
  __typename?: "lender_amount_min_fields"
  amount_lent?: Maybe<Scalars["float8"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "lender_amount" */
export type Lender_Amount_Min_Order_By = {
  amount_lent?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
}

/** response of any mutation on the table "lender_amount" */
export type Lender_Amount_Mutation_Response = {
  __typename?: "lender_amount_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Lender_Amount>
}

/** input type for inserting object relation for remote table "lender_amount" */
export type Lender_Amount_Obj_Rel_Insert_Input = {
  data: Lender_Amount_Insert_Input
  on_conflict?: Maybe<Lender_Amount_On_Conflict>
}

/** on conflict condition type for table "lender_amount" */
export type Lender_Amount_On_Conflict = {
  constraint: Lender_Amount_Constraint
  update_columns: Array<Lender_Amount_Update_Column>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** ordering options when selecting data from "lender_amount" */
export type Lender_Amount_Order_By = {
  amount_lent?: Maybe<Order_By>
  lenderInfo?: Maybe<User_Order_By>
  lender_id?: Maybe<Order_By>
  loan?: Maybe<Loan_Order_By>
  loan_id?: Maybe<Order_By>
}

/** primary key columns input for table: "lender_amount" */
export type Lender_Amount_Pk_Columns_Input = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** select columns of table "lender_amount" */
export enum Lender_Amount_Select_Column {
  /** column name */
  AmountLent = "amount_lent",
  /** column name */
  LenderId = "lender_id",
  /** column name */
  LoanId = "loan_id",
}

/** input type for updating data in table "lender_amount" */
export type Lender_Amount_Set_Input = {
  amount_lent?: Maybe<Scalars["float8"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
}

/** aggregate stddev on columns */
export type Lender_Amount_Stddev_Fields = {
  __typename?: "lender_amount_stddev_fields"
  amount_lent?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "lender_amount" */
export type Lender_Amount_Stddev_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Lender_Amount_Stddev_Pop_Fields = {
  __typename?: "lender_amount_stddev_pop_fields"
  amount_lent?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "lender_amount" */
export type Lender_Amount_Stddev_Pop_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Lender_Amount_Stddev_Samp_Fields = {
  __typename?: "lender_amount_stddev_samp_fields"
  amount_lent?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "lender_amount" */
export type Lender_Amount_Stddev_Samp_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Lender_Amount_Sum_Fields = {
  __typename?: "lender_amount_sum_fields"
  amount_lent?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "lender_amount" */
export type Lender_Amount_Sum_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** update columns of table "lender_amount" */
export enum Lender_Amount_Update_Column {
  /** column name */
  AmountLent = "amount_lent",
  /** column name */
  LenderId = "lender_id",
  /** column name */
  LoanId = "loan_id",
}

/** aggregate var_pop on columns */
export type Lender_Amount_Var_Pop_Fields = {
  __typename?: "lender_amount_var_pop_fields"
  amount_lent?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "lender_amount" */
export type Lender_Amount_Var_Pop_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Lender_Amount_Var_Samp_Fields = {
  __typename?: "lender_amount_var_samp_fields"
  amount_lent?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "lender_amount" */
export type Lender_Amount_Var_Samp_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Lender_Amount_Variance_Fields = {
  __typename?: "lender_amount_variance_fields"
  amount_lent?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "lender_amount" */
export type Lender_Amount_Variance_Order_By = {
  amount_lent?: Maybe<Order_By>
}

/** columns and relationships of "loan" */
export type Loan = {
  __typename?: "loan"
  apr: Scalars["float8"]
  borrower: Scalars["uuid"]
  /** An object relationship */
  borrowerInfo: User
  compounding_frequency: Scalars["numeric"]
  interest_accrued: Scalars["float8"]
  interest_paid: Scalars["float8"]
  /** An array relationship */
  lender_amounts: Array<Lender_Amount>
  /** An aggregated array relationship */
  lender_amounts_aggregate: Lender_Amount_Aggregate
  /** An object relationship */
  loanRequest: Loan_Request
  loan_id: Scalars["uuid"]
  loan_request: Scalars["uuid"]
  next_payment_amount?: Maybe<Scalars["float8"]>
  next_payment_due_date?: Maybe<Scalars["timestamptz"]>
  penalty_apr: Scalars["float8"]
  principal: Scalars["float8"]
  principal_remaining: Scalars["float8"]
  /** An array relationship */
  repayments: Array<Repayment>
  /** An aggregated array relationship */
  repayments_aggregate: Repayment_Aggregate
  state: Loan_State_Enum
  tenor: Scalars["numeric"]
  /** An array relationship */
  update_logs: Array<Update_Log>
  /** An aggregated array relationship */
  update_logs_aggregate: Update_Log_Aggregate
}

/** columns and relationships of "loan" */
export type LoanLender_AmountsArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** columns and relationships of "loan" */
export type LoanLender_Amounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** columns and relationships of "loan" */
export type LoanRepaymentsArgs = {
  distinct_on?: Maybe<Array<Repayment_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Repayment_Order_By>>
  where?: Maybe<Repayment_Bool_Exp>
}

/** columns and relationships of "loan" */
export type LoanRepayments_AggregateArgs = {
  distinct_on?: Maybe<Array<Repayment_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Repayment_Order_By>>
  where?: Maybe<Repayment_Bool_Exp>
}

/** columns and relationships of "loan" */
export type LoanUpdate_LogsArgs = {
  distinct_on?: Maybe<Array<Update_Log_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Log_Order_By>>
  where?: Maybe<Update_Log_Bool_Exp>
}

/** columns and relationships of "loan" */
export type LoanUpdate_Logs_AggregateArgs = {
  distinct_on?: Maybe<Array<Update_Log_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Log_Order_By>>
  where?: Maybe<Update_Log_Bool_Exp>
}

/** aggregated selection of "loan" */
export type Loan_Aggregate = {
  __typename?: "loan_aggregate"
  aggregate?: Maybe<Loan_Aggregate_Fields>
  nodes: Array<Loan>
}

/** aggregate fields of "loan" */
export type Loan_Aggregate_Fields = {
  __typename?: "loan_aggregate_fields"
  avg?: Maybe<Loan_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Loan_Max_Fields>
  min?: Maybe<Loan_Min_Fields>
  stddev?: Maybe<Loan_Stddev_Fields>
  stddev_pop?: Maybe<Loan_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Loan_Stddev_Samp_Fields>
  sum?: Maybe<Loan_Sum_Fields>
  var_pop?: Maybe<Loan_Var_Pop_Fields>
  var_samp?: Maybe<Loan_Var_Samp_Fields>
  variance?: Maybe<Loan_Variance_Fields>
}

/** aggregate fields of "loan" */
export type Loan_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Loan_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "loan" */
export type Loan_Aggregate_Order_By = {
  avg?: Maybe<Loan_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Loan_Max_Order_By>
  min?: Maybe<Loan_Min_Order_By>
  stddev?: Maybe<Loan_Stddev_Order_By>
  stddev_pop?: Maybe<Loan_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Loan_Stddev_Samp_Order_By>
  sum?: Maybe<Loan_Sum_Order_By>
  var_pop?: Maybe<Loan_Var_Pop_Order_By>
  var_samp?: Maybe<Loan_Var_Samp_Order_By>
  variance?: Maybe<Loan_Variance_Order_By>
}

/** input type for inserting array relation for remote table "loan" */
export type Loan_Arr_Rel_Insert_Input = {
  data: Array<Loan_Insert_Input>
  on_conflict?: Maybe<Loan_On_Conflict>
}

/** aggregate avg on columns */
export type Loan_Avg_Fields = {
  __typename?: "loan_avg_fields"
  apr?: Maybe<Scalars["Float"]>
  compounding_frequency?: Maybe<Scalars["Float"]>
  interest_accrued?: Maybe<Scalars["Float"]>
  interest_paid?: Maybe<Scalars["Float"]>
  next_payment_amount?: Maybe<Scalars["Float"]>
  penalty_apr?: Maybe<Scalars["Float"]>
  principal?: Maybe<Scalars["Float"]>
  principal_remaining?: Maybe<Scalars["Float"]>
  tenor?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "loan" */
export type Loan_Avg_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "loan". All fields are combined with a logical 'AND'. */
export type Loan_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Bool_Exp>>>
  _not?: Maybe<Loan_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Bool_Exp>>>
  apr?: Maybe<Float8_Comparison_Exp>
  borrower?: Maybe<Uuid_Comparison_Exp>
  borrowerInfo?: Maybe<User_Bool_Exp>
  compounding_frequency?: Maybe<Numeric_Comparison_Exp>
  interest_accrued?: Maybe<Float8_Comparison_Exp>
  interest_paid?: Maybe<Float8_Comparison_Exp>
  lender_amounts?: Maybe<Lender_Amount_Bool_Exp>
  loanRequest?: Maybe<Loan_Request_Bool_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  loan_request?: Maybe<Uuid_Comparison_Exp>
  next_payment_amount?: Maybe<Float8_Comparison_Exp>
  next_payment_due_date?: Maybe<Timestamptz_Comparison_Exp>
  penalty_apr?: Maybe<Float8_Comparison_Exp>
  principal?: Maybe<Float8_Comparison_Exp>
  principal_remaining?: Maybe<Float8_Comparison_Exp>
  repayments?: Maybe<Repayment_Bool_Exp>
  state?: Maybe<Loan_State_Enum_Comparison_Exp>
  tenor?: Maybe<Numeric_Comparison_Exp>
  update_logs?: Maybe<Update_Log_Bool_Exp>
}

/** unique or primary key constraints on table "loan" */
export enum Loan_Constraint {
  /** unique or primary key constraint */
  LoanPkey = "loan_pkey",
}

/** input type for incrementing integer column in table "loan" */
export type Loan_Inc_Input = {
  apr?: Maybe<Scalars["float8"]>
  compounding_frequency?: Maybe<Scalars["numeric"]>
  interest_accrued?: Maybe<Scalars["float8"]>
  interest_paid?: Maybe<Scalars["float8"]>
  next_payment_amount?: Maybe<Scalars["float8"]>
  penalty_apr?: Maybe<Scalars["float8"]>
  principal?: Maybe<Scalars["float8"]>
  principal_remaining?: Maybe<Scalars["float8"]>
  tenor?: Maybe<Scalars["numeric"]>
}

/** input type for inserting data into table "loan" */
export type Loan_Insert_Input = {
  apr?: Maybe<Scalars["float8"]>
  borrower?: Maybe<Scalars["uuid"]>
  borrowerInfo?: Maybe<User_Obj_Rel_Insert_Input>
  compounding_frequency?: Maybe<Scalars["numeric"]>
  interest_accrued?: Maybe<Scalars["float8"]>
  interest_paid?: Maybe<Scalars["float8"]>
  lender_amounts?: Maybe<Lender_Amount_Arr_Rel_Insert_Input>
  loanRequest?: Maybe<Loan_Request_Obj_Rel_Insert_Input>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Scalars["uuid"]>
  next_payment_amount?: Maybe<Scalars["float8"]>
  next_payment_due_date?: Maybe<Scalars["timestamptz"]>
  penalty_apr?: Maybe<Scalars["float8"]>
  principal?: Maybe<Scalars["float8"]>
  principal_remaining?: Maybe<Scalars["float8"]>
  repayments?: Maybe<Repayment_Arr_Rel_Insert_Input>
  state?: Maybe<Loan_State_Enum>
  tenor?: Maybe<Scalars["numeric"]>
  update_logs?: Maybe<Update_Log_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Loan_Max_Fields = {
  __typename?: "loan_max_fields"
  apr?: Maybe<Scalars["float8"]>
  borrower?: Maybe<Scalars["uuid"]>
  compounding_frequency?: Maybe<Scalars["numeric"]>
  interest_accrued?: Maybe<Scalars["float8"]>
  interest_paid?: Maybe<Scalars["float8"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Scalars["uuid"]>
  next_payment_amount?: Maybe<Scalars["float8"]>
  next_payment_due_date?: Maybe<Scalars["timestamptz"]>
  penalty_apr?: Maybe<Scalars["float8"]>
  principal?: Maybe<Scalars["float8"]>
  principal_remaining?: Maybe<Scalars["float8"]>
  tenor?: Maybe<Scalars["numeric"]>
}

/** order by max() on columns of table "loan" */
export type Loan_Max_Order_By = {
  apr?: Maybe<Order_By>
  borrower?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  loan_request?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  next_payment_due_date?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_Min_Fields = {
  __typename?: "loan_min_fields"
  apr?: Maybe<Scalars["float8"]>
  borrower?: Maybe<Scalars["uuid"]>
  compounding_frequency?: Maybe<Scalars["numeric"]>
  interest_accrued?: Maybe<Scalars["float8"]>
  interest_paid?: Maybe<Scalars["float8"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Scalars["uuid"]>
  next_payment_amount?: Maybe<Scalars["float8"]>
  next_payment_due_date?: Maybe<Scalars["timestamptz"]>
  penalty_apr?: Maybe<Scalars["float8"]>
  principal?: Maybe<Scalars["float8"]>
  principal_remaining?: Maybe<Scalars["float8"]>
  tenor?: Maybe<Scalars["numeric"]>
}

/** order by min() on columns of table "loan" */
export type Loan_Min_Order_By = {
  apr?: Maybe<Order_By>
  borrower?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  loan_request?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  next_payment_due_date?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** response of any mutation on the table "loan" */
export type Loan_Mutation_Response = {
  __typename?: "loan_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Loan>
}

/** input type for inserting object relation for remote table "loan" */
export type Loan_Obj_Rel_Insert_Input = {
  data: Loan_Insert_Input
  on_conflict?: Maybe<Loan_On_Conflict>
}

/** on conflict condition type for table "loan" */
export type Loan_On_Conflict = {
  constraint: Loan_Constraint
  update_columns: Array<Loan_Update_Column>
  where?: Maybe<Loan_Bool_Exp>
}

/** ordering options when selecting data from "loan" */
export type Loan_Order_By = {
  apr?: Maybe<Order_By>
  borrower?: Maybe<Order_By>
  borrowerInfo?: Maybe<User_Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  lender_amounts_aggregate?: Maybe<Lender_Amount_Aggregate_Order_By>
  loanRequest?: Maybe<Loan_Request_Order_By>
  loan_id?: Maybe<Order_By>
  loan_request?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  next_payment_due_date?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  repayments_aggregate?: Maybe<Repayment_Aggregate_Order_By>
  state?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
  update_logs_aggregate?: Maybe<Update_Log_Aggregate_Order_By>
}

/** primary key columns input for table: "loan" */
export type Loan_Pk_Columns_Input = {
  loan_id: Scalars["uuid"]
}

/** columns and relationships of "loan_request" */
export type Loan_Request = {
  __typename?: "loan_request"
  amount: Scalars["float8"]
  /** An object relationship */
  borrowerInfo: User
  borrower_id: Scalars["uuid"]
  created_at?: Maybe<Scalars["timestamptz"]>
  purpose?: Maybe<Scalars["String"]>
  request_id: Scalars["uuid"]
  state: Loan_Request_State_Enum
}

/** aggregated selection of "loan_request" */
export type Loan_Request_Aggregate = {
  __typename?: "loan_request_aggregate"
  aggregate?: Maybe<Loan_Request_Aggregate_Fields>
  nodes: Array<Loan_Request>
}

/** aggregate fields of "loan_request" */
export type Loan_Request_Aggregate_Fields = {
  __typename?: "loan_request_aggregate_fields"
  avg?: Maybe<Loan_Request_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Loan_Request_Max_Fields>
  min?: Maybe<Loan_Request_Min_Fields>
  stddev?: Maybe<Loan_Request_Stddev_Fields>
  stddev_pop?: Maybe<Loan_Request_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Loan_Request_Stddev_Samp_Fields>
  sum?: Maybe<Loan_Request_Sum_Fields>
  var_pop?: Maybe<Loan_Request_Var_Pop_Fields>
  var_samp?: Maybe<Loan_Request_Var_Samp_Fields>
  variance?: Maybe<Loan_Request_Variance_Fields>
}

/** aggregate fields of "loan_request" */
export type Loan_Request_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Loan_Request_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "loan_request" */
export type Loan_Request_Aggregate_Order_By = {
  avg?: Maybe<Loan_Request_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Loan_Request_Max_Order_By>
  min?: Maybe<Loan_Request_Min_Order_By>
  stddev?: Maybe<Loan_Request_Stddev_Order_By>
  stddev_pop?: Maybe<Loan_Request_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Loan_Request_Stddev_Samp_Order_By>
  sum?: Maybe<Loan_Request_Sum_Order_By>
  var_pop?: Maybe<Loan_Request_Var_Pop_Order_By>
  var_samp?: Maybe<Loan_Request_Var_Samp_Order_By>
  variance?: Maybe<Loan_Request_Variance_Order_By>
}

/** input type for inserting array relation for remote table "loan_request" */
export type Loan_Request_Arr_Rel_Insert_Input = {
  data: Array<Loan_Request_Insert_Input>
  on_conflict?: Maybe<Loan_Request_On_Conflict>
}

/** aggregate avg on columns */
export type Loan_Request_Avg_Fields = {
  __typename?: "loan_request_avg_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "loan_request" */
export type Loan_Request_Avg_Order_By = {
  amount?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "loan_request". All fields are combined with a logical 'AND'. */
export type Loan_Request_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Request_Bool_Exp>>>
  _not?: Maybe<Loan_Request_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Request_Bool_Exp>>>
  amount?: Maybe<Float8_Comparison_Exp>
  borrowerInfo?: Maybe<User_Bool_Exp>
  borrower_id?: Maybe<Uuid_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  purpose?: Maybe<String_Comparison_Exp>
  request_id?: Maybe<Uuid_Comparison_Exp>
  state?: Maybe<Loan_Request_State_Enum_Comparison_Exp>
}

/** unique or primary key constraints on table "loan_request" */
export enum Loan_Request_Constraint {
  /** unique or primary key constraint */
  LoanRequestPkey = "loan_request_pkey",
}

/** input type for incrementing integer column in table "loan_request" */
export type Loan_Request_Inc_Input = {
  amount?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "loan_request" */
export type Loan_Request_Insert_Input = {
  amount?: Maybe<Scalars["float8"]>
  borrowerInfo?: Maybe<User_Obj_Rel_Insert_Input>
  borrower_id?: Maybe<Scalars["uuid"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
  state?: Maybe<Loan_Request_State_Enum>
}

/** aggregate max on columns */
export type Loan_Request_Max_Fields = {
  __typename?: "loan_request_max_fields"
  amount?: Maybe<Scalars["float8"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "loan_request" */
export type Loan_Request_Max_Order_By = {
  amount?: Maybe<Order_By>
  borrower_id?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  purpose?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_Request_Min_Fields = {
  __typename?: "loan_request_min_fields"
  amount?: Maybe<Scalars["float8"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "loan_request" */
export type Loan_Request_Min_Order_By = {
  amount?: Maybe<Order_By>
  borrower_id?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  purpose?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
}

/** response of any mutation on the table "loan_request" */
export type Loan_Request_Mutation_Response = {
  __typename?: "loan_request_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Loan_Request>
}

/** input type for inserting object relation for remote table "loan_request" */
export type Loan_Request_Obj_Rel_Insert_Input = {
  data: Loan_Request_Insert_Input
  on_conflict?: Maybe<Loan_Request_On_Conflict>
}

/** on conflict condition type for table "loan_request" */
export type Loan_Request_On_Conflict = {
  constraint: Loan_Request_Constraint
  update_columns: Array<Loan_Request_Update_Column>
  where?: Maybe<Loan_Request_Bool_Exp>
}

/** ordering options when selecting data from "loan_request" */
export type Loan_Request_Order_By = {
  amount?: Maybe<Order_By>
  borrowerInfo?: Maybe<User_Order_By>
  borrower_id?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  purpose?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
  state?: Maybe<Order_By>
}

/** primary key columns input for table: "loan_request" */
export type Loan_Request_Pk_Columns_Input = {
  request_id: Scalars["uuid"]
}

/** select columns of table "loan_request" */
export enum Loan_Request_Select_Column {
  /** column name */
  Amount = "amount",
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Purpose = "purpose",
  /** column name */
  RequestId = "request_id",
  /** column name */
  State = "state",
}

/** input type for updating data in table "loan_request" */
export type Loan_Request_Set_Input = {
  amount?: Maybe<Scalars["float8"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  purpose?: Maybe<Scalars["String"]>
  request_id?: Maybe<Scalars["uuid"]>
  state?: Maybe<Loan_Request_State_Enum>
}

/** columns and relationships of "loan_request_state" */
export type Loan_Request_State = {
  __typename?: "loan_request_state"
  comment: Scalars["String"]
  value: Scalars["String"]
}

/** aggregated selection of "loan_request_state" */
export type Loan_Request_State_Aggregate = {
  __typename?: "loan_request_state_aggregate"
  aggregate?: Maybe<Loan_Request_State_Aggregate_Fields>
  nodes: Array<Loan_Request_State>
}

/** aggregate fields of "loan_request_state" */
export type Loan_Request_State_Aggregate_Fields = {
  __typename?: "loan_request_state_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Loan_Request_State_Max_Fields>
  min?: Maybe<Loan_Request_State_Min_Fields>
}

/** aggregate fields of "loan_request_state" */
export type Loan_Request_State_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Loan_Request_State_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "loan_request_state" */
export type Loan_Request_State_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Loan_Request_State_Max_Order_By>
  min?: Maybe<Loan_Request_State_Min_Order_By>
}

/** input type for inserting array relation for remote table "loan_request_state" */
export type Loan_Request_State_Arr_Rel_Insert_Input = {
  data: Array<Loan_Request_State_Insert_Input>
  on_conflict?: Maybe<Loan_Request_State_On_Conflict>
}

/** Boolean expression to filter rows from the table "loan_request_state". All fields are combined with a logical 'AND'. */
export type Loan_Request_State_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Request_State_Bool_Exp>>>
  _not?: Maybe<Loan_Request_State_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Request_State_Bool_Exp>>>
  comment?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "loan_request_state" */
export enum Loan_Request_State_Constraint {
  /** unique or primary key constraint */
  LoanRequestStatePkey = "loan_request_state_pkey",
}

export enum Loan_Request_State_Enum {
  /** is waiting for lender/s to be funded */
  Active = "ACTIVE",
  /** final state: no longer waiting for lender/s to be funded */
  Expired = "EXPIRED",
  /** final state: has been accepted and money was given to borrower */
  Fulfilled = "FULFILLED",
  /** final state: will not be funded */
  Rejected = "REJECTED",
  /** inactive */
  Withdrawn = "WITHDRAWN",
}

/** expression to compare columns of type loan_request_state_enum. All fields are combined with logical 'AND'. */
export type Loan_Request_State_Enum_Comparison_Exp = {
  _eq?: Maybe<Loan_Request_State_Enum>
  _in?: Maybe<Array<Loan_Request_State_Enum>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _neq?: Maybe<Loan_Request_State_Enum>
  _nin?: Maybe<Array<Loan_Request_State_Enum>>
}

/** input type for inserting data into table "loan_request_state" */
export type Loan_Request_State_Insert_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Loan_Request_State_Max_Fields = {
  __typename?: "loan_request_state_max_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "loan_request_state" */
export type Loan_Request_State_Max_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_Request_State_Min_Fields = {
  __typename?: "loan_request_state_min_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "loan_request_state" */
export type Loan_Request_State_Min_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** response of any mutation on the table "loan_request_state" */
export type Loan_Request_State_Mutation_Response = {
  __typename?: "loan_request_state_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Loan_Request_State>
}

/** input type for inserting object relation for remote table "loan_request_state" */
export type Loan_Request_State_Obj_Rel_Insert_Input = {
  data: Loan_Request_State_Insert_Input
  on_conflict?: Maybe<Loan_Request_State_On_Conflict>
}

/** on conflict condition type for table "loan_request_state" */
export type Loan_Request_State_On_Conflict = {
  constraint: Loan_Request_State_Constraint
  update_columns: Array<Loan_Request_State_Update_Column>
  where?: Maybe<Loan_Request_State_Bool_Exp>
}

/** ordering options when selecting data from "loan_request_state" */
export type Loan_Request_State_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: "loan_request_state" */
export type Loan_Request_State_Pk_Columns_Input = {
  value: Scalars["String"]
}

/** select columns of table "loan_request_state" */
export enum Loan_Request_State_Select_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** input type for updating data in table "loan_request_state" */
export type Loan_Request_State_Set_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** update columns of table "loan_request_state" */
export enum Loan_Request_State_Update_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** aggregate stddev on columns */
export type Loan_Request_Stddev_Fields = {
  __typename?: "loan_request_stddev_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "loan_request" */
export type Loan_Request_Stddev_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Loan_Request_Stddev_Pop_Fields = {
  __typename?: "loan_request_stddev_pop_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "loan_request" */
export type Loan_Request_Stddev_Pop_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Loan_Request_Stddev_Samp_Fields = {
  __typename?: "loan_request_stddev_samp_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "loan_request" */
export type Loan_Request_Stddev_Samp_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Loan_Request_Sum_Fields = {
  __typename?: "loan_request_sum_fields"
  amount?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "loan_request" */
export type Loan_Request_Sum_Order_By = {
  amount?: Maybe<Order_By>
}

/** update columns of table "loan_request" */
export enum Loan_Request_Update_Column {
  /** column name */
  Amount = "amount",
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Purpose = "purpose",
  /** column name */
  RequestId = "request_id",
  /** column name */
  State = "state",
}

/** aggregate var_pop on columns */
export type Loan_Request_Var_Pop_Fields = {
  __typename?: "loan_request_var_pop_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "loan_request" */
export type Loan_Request_Var_Pop_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Loan_Request_Var_Samp_Fields = {
  __typename?: "loan_request_var_samp_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "loan_request" */
export type Loan_Request_Var_Samp_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Loan_Request_Variance_Fields = {
  __typename?: "loan_request_variance_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "loan_request" */
export type Loan_Request_Variance_Order_By = {
  amount?: Maybe<Order_By>
}

/** select columns of table "loan" */
export enum Loan_Select_Column {
  /** column name */
  Apr = "apr",
  /** column name */
  Borrower = "borrower",
  /** column name */
  CompoundingFrequency = "compounding_frequency",
  /** column name */
  InterestAccrued = "interest_accrued",
  /** column name */
  InterestPaid = "interest_paid",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  LoanRequest = "loan_request",
  /** column name */
  NextPaymentAmount = "next_payment_amount",
  /** column name */
  NextPaymentDueDate = "next_payment_due_date",
  /** column name */
  PenaltyApr = "penalty_apr",
  /** column name */
  Principal = "principal",
  /** column name */
  PrincipalRemaining = "principal_remaining",
  /** column name */
  State = "state",
  /** column name */
  Tenor = "tenor",
}

/** input type for updating data in table "loan" */
export type Loan_Set_Input = {
  apr?: Maybe<Scalars["float8"]>
  borrower?: Maybe<Scalars["uuid"]>
  compounding_frequency?: Maybe<Scalars["numeric"]>
  interest_accrued?: Maybe<Scalars["float8"]>
  interest_paid?: Maybe<Scalars["float8"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Scalars["uuid"]>
  next_payment_amount?: Maybe<Scalars["float8"]>
  next_payment_due_date?: Maybe<Scalars["timestamptz"]>
  penalty_apr?: Maybe<Scalars["float8"]>
  principal?: Maybe<Scalars["float8"]>
  principal_remaining?: Maybe<Scalars["float8"]>
  state?: Maybe<Loan_State_Enum>
  tenor?: Maybe<Scalars["numeric"]>
}

/** columns and relationships of "loan_state" */
export type Loan_State = {
  __typename?: "loan_state"
  comment: Scalars["String"]
  value: Scalars["String"]
}

/** aggregated selection of "loan_state" */
export type Loan_State_Aggregate = {
  __typename?: "loan_state_aggregate"
  aggregate?: Maybe<Loan_State_Aggregate_Fields>
  nodes: Array<Loan_State>
}

/** aggregate fields of "loan_state" */
export type Loan_State_Aggregate_Fields = {
  __typename?: "loan_state_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Loan_State_Max_Fields>
  min?: Maybe<Loan_State_Min_Fields>
}

/** aggregate fields of "loan_state" */
export type Loan_State_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Loan_State_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "loan_state" */
export type Loan_State_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Loan_State_Max_Order_By>
  min?: Maybe<Loan_State_Min_Order_By>
}

/** input type for inserting array relation for remote table "loan_state" */
export type Loan_State_Arr_Rel_Insert_Input = {
  data: Array<Loan_State_Insert_Input>
  on_conflict?: Maybe<Loan_State_On_Conflict>
}

/** Boolean expression to filter rows from the table "loan_state". All fields are combined with a logical 'AND'. */
export type Loan_State_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_State_Bool_Exp>>>
  _not?: Maybe<Loan_State_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_State_Bool_Exp>>>
  comment?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "loan_state" */
export enum Loan_State_Constraint {
  /** unique or primary key constraint */
  LoanStatePkey = "loan_state_pkey",
}

export enum Loan_State_Enum {
  /** final state: will not be repaid */
  Default = "DEFAULT",
  /** is currently being repaid */
  Live = "LIVE",
  /** final state: fully repaid */
  Repaid = "REPAID",
}

/** expression to compare columns of type loan_state_enum. All fields are combined with logical 'AND'. */
export type Loan_State_Enum_Comparison_Exp = {
  _eq?: Maybe<Loan_State_Enum>
  _in?: Maybe<Array<Loan_State_Enum>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _neq?: Maybe<Loan_State_Enum>
  _nin?: Maybe<Array<Loan_State_Enum>>
}

/** input type for inserting data into table "loan_state" */
export type Loan_State_Insert_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Loan_State_Max_Fields = {
  __typename?: "loan_state_max_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "loan_state" */
export type Loan_State_Max_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_State_Min_Fields = {
  __typename?: "loan_state_min_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "loan_state" */
export type Loan_State_Min_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** response of any mutation on the table "loan_state" */
export type Loan_State_Mutation_Response = {
  __typename?: "loan_state_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Loan_State>
}

/** input type for inserting object relation for remote table "loan_state" */
export type Loan_State_Obj_Rel_Insert_Input = {
  data: Loan_State_Insert_Input
  on_conflict?: Maybe<Loan_State_On_Conflict>
}

/** on conflict condition type for table "loan_state" */
export type Loan_State_On_Conflict = {
  constraint: Loan_State_Constraint
  update_columns: Array<Loan_State_Update_Column>
  where?: Maybe<Loan_State_Bool_Exp>
}

/** ordering options when selecting data from "loan_state" */
export type Loan_State_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: "loan_state" */
export type Loan_State_Pk_Columns_Input = {
  value: Scalars["String"]
}

/** select columns of table "loan_state" */
export enum Loan_State_Select_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** input type for updating data in table "loan_state" */
export type Loan_State_Set_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** update columns of table "loan_state" */
export enum Loan_State_Update_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** aggregate stddev on columns */
export type Loan_Stddev_Fields = {
  __typename?: "loan_stddev_fields"
  apr?: Maybe<Scalars["Float"]>
  compounding_frequency?: Maybe<Scalars["Float"]>
  interest_accrued?: Maybe<Scalars["Float"]>
  interest_paid?: Maybe<Scalars["Float"]>
  next_payment_amount?: Maybe<Scalars["Float"]>
  penalty_apr?: Maybe<Scalars["Float"]>
  principal?: Maybe<Scalars["Float"]>
  principal_remaining?: Maybe<Scalars["Float"]>
  tenor?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "loan" */
export type Loan_Stddev_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Loan_Stddev_Pop_Fields = {
  __typename?: "loan_stddev_pop_fields"
  apr?: Maybe<Scalars["Float"]>
  compounding_frequency?: Maybe<Scalars["Float"]>
  interest_accrued?: Maybe<Scalars["Float"]>
  interest_paid?: Maybe<Scalars["Float"]>
  next_payment_amount?: Maybe<Scalars["Float"]>
  penalty_apr?: Maybe<Scalars["Float"]>
  principal?: Maybe<Scalars["Float"]>
  principal_remaining?: Maybe<Scalars["Float"]>
  tenor?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "loan" */
export type Loan_Stddev_Pop_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Loan_Stddev_Samp_Fields = {
  __typename?: "loan_stddev_samp_fields"
  apr?: Maybe<Scalars["Float"]>
  compounding_frequency?: Maybe<Scalars["Float"]>
  interest_accrued?: Maybe<Scalars["Float"]>
  interest_paid?: Maybe<Scalars["Float"]>
  next_payment_amount?: Maybe<Scalars["Float"]>
  penalty_apr?: Maybe<Scalars["Float"]>
  principal?: Maybe<Scalars["Float"]>
  principal_remaining?: Maybe<Scalars["Float"]>
  tenor?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "loan" */
export type Loan_Stddev_Samp_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Loan_Sum_Fields = {
  __typename?: "loan_sum_fields"
  apr?: Maybe<Scalars["float8"]>
  compounding_frequency?: Maybe<Scalars["numeric"]>
  interest_accrued?: Maybe<Scalars["float8"]>
  interest_paid?: Maybe<Scalars["float8"]>
  next_payment_amount?: Maybe<Scalars["float8"]>
  penalty_apr?: Maybe<Scalars["float8"]>
  principal?: Maybe<Scalars["float8"]>
  principal_remaining?: Maybe<Scalars["float8"]>
  tenor?: Maybe<Scalars["numeric"]>
}

/** order by sum() on columns of table "loan" */
export type Loan_Sum_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** update columns of table "loan" */
export enum Loan_Update_Column {
  /** column name */
  Apr = "apr",
  /** column name */
  Borrower = "borrower",
  /** column name */
  CompoundingFrequency = "compounding_frequency",
  /** column name */
  InterestAccrued = "interest_accrued",
  /** column name */
  InterestPaid = "interest_paid",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  LoanRequest = "loan_request",
  /** column name */
  NextPaymentAmount = "next_payment_amount",
  /** column name */
  NextPaymentDueDate = "next_payment_due_date",
  /** column name */
  PenaltyApr = "penalty_apr",
  /** column name */
  Principal = "principal",
  /** column name */
  PrincipalRemaining = "principal_remaining",
  /** column name */
  State = "state",
  /** column name */
  Tenor = "tenor",
}

/** aggregate var_pop on columns */
export type Loan_Var_Pop_Fields = {
  __typename?: "loan_var_pop_fields"
  apr?: Maybe<Scalars["Float"]>
  compounding_frequency?: Maybe<Scalars["Float"]>
  interest_accrued?: Maybe<Scalars["Float"]>
  interest_paid?: Maybe<Scalars["Float"]>
  next_payment_amount?: Maybe<Scalars["Float"]>
  penalty_apr?: Maybe<Scalars["Float"]>
  principal?: Maybe<Scalars["Float"]>
  principal_remaining?: Maybe<Scalars["Float"]>
  tenor?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "loan" */
export type Loan_Var_Pop_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Loan_Var_Samp_Fields = {
  __typename?: "loan_var_samp_fields"
  apr?: Maybe<Scalars["Float"]>
  compounding_frequency?: Maybe<Scalars["Float"]>
  interest_accrued?: Maybe<Scalars["Float"]>
  interest_paid?: Maybe<Scalars["Float"]>
  next_payment_amount?: Maybe<Scalars["Float"]>
  penalty_apr?: Maybe<Scalars["Float"]>
  principal?: Maybe<Scalars["Float"]>
  principal_remaining?: Maybe<Scalars["Float"]>
  tenor?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "loan" */
export type Loan_Var_Samp_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Loan_Variance_Fields = {
  __typename?: "loan_variance_fields"
  apr?: Maybe<Scalars["Float"]>
  compounding_frequency?: Maybe<Scalars["Float"]>
  interest_accrued?: Maybe<Scalars["Float"]>
  interest_paid?: Maybe<Scalars["Float"]>
  next_payment_amount?: Maybe<Scalars["Float"]>
  penalty_apr?: Maybe<Scalars["Float"]>
  principal?: Maybe<Scalars["Float"]>
  principal_remaining?: Maybe<Scalars["Float"]>
  tenor?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "loan" */
export type Loan_Variance_Order_By = {
  apr?: Maybe<Order_By>
  compounding_frequency?: Maybe<Order_By>
  interest_accrued?: Maybe<Order_By>
  interest_paid?: Maybe<Order_By>
  next_payment_amount?: Maybe<Order_By>
  penalty_apr?: Maybe<Order_By>
  principal?: Maybe<Order_By>
  principal_remaining?: Maybe<Order_By>
  tenor?: Maybe<Order_By>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root"
  /** delete data from the table: "action_type" */
  delete_action_type?: Maybe<Action_Type_Mutation_Response>
  /** delete single row from the table: "action_type" */
  delete_action_type_by_pk?: Maybe<Action_Type>
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>
  /** delete data from the table: "lender_amount" */
  delete_lender_amount?: Maybe<Lender_Amount_Mutation_Response>
  /** delete single row from the table: "lender_amount" */
  delete_lender_amount_by_pk?: Maybe<Lender_Amount>
  /** delete data from the table: "loan" */
  delete_loan?: Maybe<Loan_Mutation_Response>
  /** delete single row from the table: "loan" */
  delete_loan_by_pk?: Maybe<Loan>
  /** delete data from the table: "loan_request" */
  delete_loan_request?: Maybe<Loan_Request_Mutation_Response>
  /** delete single row from the table: "loan_request" */
  delete_loan_request_by_pk?: Maybe<Loan_Request>
  /** delete data from the table: "loan_request_state" */
  delete_loan_request_state?: Maybe<Loan_Request_State_Mutation_Response>
  /** delete single row from the table: "loan_request_state" */
  delete_loan_request_state_by_pk?: Maybe<Loan_Request_State>
  /** delete data from the table: "loan_state" */
  delete_loan_state?: Maybe<Loan_State_Mutation_Response>
  /** delete single row from the table: "loan_state" */
  delete_loan_state_by_pk?: Maybe<Loan_State>
  /** delete data from the table: "repayment" */
  delete_repayment?: Maybe<Repayment_Mutation_Response>
  /** delete single row from the table: "repayment" */
  delete_repayment_by_pk?: Maybe<Repayment>
  /** delete data from the table: "scenario_actions" */
  delete_scenario_actions?: Maybe<Scenario_Actions_Mutation_Response>
  /** delete single row from the table: "scenario_actions" */
  delete_scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** delete data from the table: "update_log" */
  delete_update_log?: Maybe<Update_Log_Mutation_Response>
  /** delete single row from the table: "update_log" */
  delete_update_log_by_pk?: Maybe<Update_Log>
  /** delete data from the table: "update_type" */
  delete_update_type?: Maybe<Update_Type_Mutation_Response>
  /** delete single row from the table: "update_type" */
  delete_update_type_by_pk?: Maybe<Update_Type>
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>
  /** delete data from the table: "user_type" */
  delete_user_type?: Maybe<User_Type_Mutation_Response>
  /** delete single row from the table: "user_type" */
  delete_user_type_by_pk?: Maybe<User_Type>
  /** insert data into the table: "action_type" */
  insert_action_type?: Maybe<Action_Type_Mutation_Response>
  /** insert a single row into the table: "action_type" */
  insert_action_type_one?: Maybe<Action_Type>
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>
  /** insert data into the table: "lender_amount" */
  insert_lender_amount?: Maybe<Lender_Amount_Mutation_Response>
  /** insert a single row into the table: "lender_amount" */
  insert_lender_amount_one?: Maybe<Lender_Amount>
  /** insert data into the table: "loan" */
  insert_loan?: Maybe<Loan_Mutation_Response>
  /** insert a single row into the table: "loan" */
  insert_loan_one?: Maybe<Loan>
  /** insert data into the table: "loan_request" */
  insert_loan_request?: Maybe<Loan_Request_Mutation_Response>
  /** insert a single row into the table: "loan_request" */
  insert_loan_request_one?: Maybe<Loan_Request>
  /** insert data into the table: "loan_request_state" */
  insert_loan_request_state?: Maybe<Loan_Request_State_Mutation_Response>
  /** insert a single row into the table: "loan_request_state" */
  insert_loan_request_state_one?: Maybe<Loan_Request_State>
  /** insert data into the table: "loan_state" */
  insert_loan_state?: Maybe<Loan_State_Mutation_Response>
  /** insert a single row into the table: "loan_state" */
  insert_loan_state_one?: Maybe<Loan_State>
  /** insert data into the table: "repayment" */
  insert_repayment?: Maybe<Repayment_Mutation_Response>
  /** insert a single row into the table: "repayment" */
  insert_repayment_one?: Maybe<Repayment>
  /** insert data into the table: "scenario_actions" */
  insert_scenario_actions?: Maybe<Scenario_Actions_Mutation_Response>
  /** insert a single row into the table: "scenario_actions" */
  insert_scenario_actions_one?: Maybe<Scenario_Actions>
  /** insert data into the table: "update_log" */
  insert_update_log?: Maybe<Update_Log_Mutation_Response>
  /** insert a single row into the table: "update_log" */
  insert_update_log_one?: Maybe<Update_Log>
  /** insert data into the table: "update_type" */
  insert_update_type?: Maybe<Update_Type_Mutation_Response>
  /** insert a single row into the table: "update_type" */
  insert_update_type_one?: Maybe<Update_Type>
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>
  /** insert data into the table: "user_type" */
  insert_user_type?: Maybe<User_Type_Mutation_Response>
  /** insert a single row into the table: "user_type" */
  insert_user_type_one?: Maybe<User_Type>
  /** update data of the table: "action_type" */
  update_action_type?: Maybe<Action_Type_Mutation_Response>
  /** update single row of the table: "action_type" */
  update_action_type_by_pk?: Maybe<Action_Type>
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>
  /** update data of the table: "lender_amount" */
  update_lender_amount?: Maybe<Lender_Amount_Mutation_Response>
  /** update single row of the table: "lender_amount" */
  update_lender_amount_by_pk?: Maybe<Lender_Amount>
  /** update data of the table: "loan" */
  update_loan?: Maybe<Loan_Mutation_Response>
  /** update single row of the table: "loan" */
  update_loan_by_pk?: Maybe<Loan>
  /** update data of the table: "loan_request" */
  update_loan_request?: Maybe<Loan_Request_Mutation_Response>
  /** update single row of the table: "loan_request" */
  update_loan_request_by_pk?: Maybe<Loan_Request>
  /** update data of the table: "loan_request_state" */
  update_loan_request_state?: Maybe<Loan_Request_State_Mutation_Response>
  /** update single row of the table: "loan_request_state" */
  update_loan_request_state_by_pk?: Maybe<Loan_Request_State>
  /** update data of the table: "loan_state" */
  update_loan_state?: Maybe<Loan_State_Mutation_Response>
  /** update single row of the table: "loan_state" */
  update_loan_state_by_pk?: Maybe<Loan_State>
  /** update data of the table: "repayment" */
  update_repayment?: Maybe<Repayment_Mutation_Response>
  /** update single row of the table: "repayment" */
  update_repayment_by_pk?: Maybe<Repayment>
  /** update data of the table: "scenario_actions" */
  update_scenario_actions?: Maybe<Scenario_Actions_Mutation_Response>
  /** update single row of the table: "scenario_actions" */
  update_scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** update data of the table: "update_log" */
  update_update_log?: Maybe<Update_Log_Mutation_Response>
  /** update single row of the table: "update_log" */
  update_update_log_by_pk?: Maybe<Update_Log>
  /** update data of the table: "update_type" */
  update_update_type?: Maybe<Update_Type_Mutation_Response>
  /** update single row of the table: "update_type" */
  update_update_type_by_pk?: Maybe<Update_Type>
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>
  /** update data of the table: "user_type" */
  update_user_type?: Maybe<User_Type_Mutation_Response>
  /** update single row of the table: "user_type" */
  update_user_type_by_pk?: Maybe<User_Type>
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
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Lender_AmountArgs = {
  where: Lender_Amount_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Lender_Amount_By_PkArgs = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_LoanArgs = {
  where: Loan_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Loan_By_PkArgs = {
  loan_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Loan_RequestArgs = {
  where: Loan_Request_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Loan_Request_By_PkArgs = {
  request_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Loan_Request_StateArgs = {
  where: Loan_Request_State_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Loan_Request_State_By_PkArgs = {
  value: Scalars["String"]
}

/** mutation root */
export type Mutation_RootDelete_Loan_StateArgs = {
  where: Loan_State_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Loan_State_By_PkArgs = {
  value: Scalars["String"]
}

/** mutation root */
export type Mutation_RootDelete_RepaymentArgs = {
  where: Repayment_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Repayment_By_PkArgs = {
  repayment_id: Scalars["uuid"]
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
export type Mutation_RootDelete_Update_LogArgs = {
  where: Update_Log_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Update_Log_By_PkArgs = {
  update_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Update_TypeArgs = {
  where: Update_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Update_Type_By_PkArgs = {
  value: Scalars["String"]
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
export type Mutation_RootDelete_User_TypeArgs = {
  where: User_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_User_Type_By_PkArgs = {
  value: Scalars["String"]
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
export type Mutation_RootInsert_Lender_AmountArgs = {
  objects: Array<Lender_Amount_Insert_Input>
  on_conflict?: Maybe<Lender_Amount_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Lender_Amount_OneArgs = {
  object: Lender_Amount_Insert_Input
  on_conflict?: Maybe<Lender_Amount_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_LoanArgs = {
  objects: Array<Loan_Insert_Input>
  on_conflict?: Maybe<Loan_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_OneArgs = {
  object: Loan_Insert_Input
  on_conflict?: Maybe<Loan_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_RequestArgs = {
  objects: Array<Loan_Request_Insert_Input>
  on_conflict?: Maybe<Loan_Request_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_Request_OneArgs = {
  object: Loan_Request_Insert_Input
  on_conflict?: Maybe<Loan_Request_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_Request_StateArgs = {
  objects: Array<Loan_Request_State_Insert_Input>
  on_conflict?: Maybe<Loan_Request_State_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_Request_State_OneArgs = {
  object: Loan_Request_State_Insert_Input
  on_conflict?: Maybe<Loan_Request_State_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_StateArgs = {
  objects: Array<Loan_State_Insert_Input>
  on_conflict?: Maybe<Loan_State_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_State_OneArgs = {
  object: Loan_State_Insert_Input
  on_conflict?: Maybe<Loan_State_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_RepaymentArgs = {
  objects: Array<Repayment_Insert_Input>
  on_conflict?: Maybe<Repayment_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Repayment_OneArgs = {
  object: Repayment_Insert_Input
  on_conflict?: Maybe<Repayment_On_Conflict>
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
export type Mutation_RootInsert_Update_LogArgs = {
  objects: Array<Update_Log_Insert_Input>
  on_conflict?: Maybe<Update_Log_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Update_Log_OneArgs = {
  object: Update_Log_Insert_Input
  on_conflict?: Maybe<Update_Log_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Update_TypeArgs = {
  objects: Array<Update_Type_Insert_Input>
  on_conflict?: Maybe<Update_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Update_Type_OneArgs = {
  object: Update_Type_Insert_Input
  on_conflict?: Maybe<Update_Type_On_Conflict>
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
export type Mutation_RootInsert_User_TypeArgs = {
  objects: Array<User_Type_Insert_Input>
  on_conflict?: Maybe<User_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_User_Type_OneArgs = {
  object: User_Type_Insert_Input
  on_conflict?: Maybe<User_Type_On_Conflict>
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
export type Mutation_RootUpdate_Lender_AmountArgs = {
  _inc?: Maybe<Lender_Amount_Inc_Input>
  _set?: Maybe<Lender_Amount_Set_Input>
  where: Lender_Amount_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Lender_Amount_By_PkArgs = {
  _inc?: Maybe<Lender_Amount_Inc_Input>
  _set?: Maybe<Lender_Amount_Set_Input>
  pk_columns: Lender_Amount_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_LoanArgs = {
  _inc?: Maybe<Loan_Inc_Input>
  _set?: Maybe<Loan_Set_Input>
  where: Loan_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Loan_By_PkArgs = {
  _inc?: Maybe<Loan_Inc_Input>
  _set?: Maybe<Loan_Set_Input>
  pk_columns: Loan_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Loan_RequestArgs = {
  _inc?: Maybe<Loan_Request_Inc_Input>
  _set?: Maybe<Loan_Request_Set_Input>
  where: Loan_Request_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Loan_Request_By_PkArgs = {
  _inc?: Maybe<Loan_Request_Inc_Input>
  _set?: Maybe<Loan_Request_Set_Input>
  pk_columns: Loan_Request_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Loan_Request_StateArgs = {
  _set?: Maybe<Loan_Request_State_Set_Input>
  where: Loan_Request_State_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Loan_Request_State_By_PkArgs = {
  _set?: Maybe<Loan_Request_State_Set_Input>
  pk_columns: Loan_Request_State_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Loan_StateArgs = {
  _set?: Maybe<Loan_State_Set_Input>
  where: Loan_State_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Loan_State_By_PkArgs = {
  _set?: Maybe<Loan_State_Set_Input>
  pk_columns: Loan_State_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_RepaymentArgs = {
  _inc?: Maybe<Repayment_Inc_Input>
  _set?: Maybe<Repayment_Set_Input>
  where: Repayment_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Repayment_By_PkArgs = {
  _inc?: Maybe<Repayment_Inc_Input>
  _set?: Maybe<Repayment_Set_Input>
  pk_columns: Repayment_Pk_Columns_Input
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
export type Mutation_RootUpdate_Update_LogArgs = {
  _inc?: Maybe<Update_Log_Inc_Input>
  _set?: Maybe<Update_Log_Set_Input>
  where: Update_Log_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Update_Log_By_PkArgs = {
  _inc?: Maybe<Update_Log_Inc_Input>
  _set?: Maybe<Update_Log_Set_Input>
  pk_columns: Update_Log_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Update_TypeArgs = {
  _set?: Maybe<Update_Type_Set_Input>
  where: Update_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Update_Type_By_PkArgs = {
  _set?: Maybe<Update_Type_Set_Input>
  pk_columns: Update_Type_Pk_Columns_Input
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

/** mutation root */
export type Mutation_RootUpdate_User_TypeArgs = {
  _set?: Maybe<User_Type_Set_Input>
  where: User_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_User_Type_By_PkArgs = {
  _set?: Maybe<User_Type_Set_Input>
  pk_columns: User_Type_Pk_Columns_Input
}

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars["numeric"]>
  _gt?: Maybe<Scalars["numeric"]>
  _gte?: Maybe<Scalars["numeric"]>
  _in?: Maybe<Array<Scalars["numeric"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["numeric"]>
  _lte?: Maybe<Scalars["numeric"]>
  _neq?: Maybe<Scalars["numeric"]>
  _nin?: Maybe<Array<Scalars["numeric"]>>
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
  /** fetch data from the table: "events" */
  events: Array<Events>
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>
  /** fetch data from the table: "lender_amount" */
  lender_amount: Array<Lender_Amount>
  /** fetch aggregated fields from the table: "lender_amount" */
  lender_amount_aggregate: Lender_Amount_Aggregate
  /** fetch data from the table: "lender_amount" using primary key columns */
  lender_amount_by_pk?: Maybe<Lender_Amount>
  /** fetch data from the table: "loan" */
  loan: Array<Loan>
  /** fetch aggregated fields from the table: "loan" */
  loan_aggregate: Loan_Aggregate
  /** fetch data from the table: "loan" using primary key columns */
  loan_by_pk?: Maybe<Loan>
  /** fetch data from the table: "loan_request" */
  loan_request: Array<Loan_Request>
  /** fetch aggregated fields from the table: "loan_request" */
  loan_request_aggregate: Loan_Request_Aggregate
  /** fetch data from the table: "loan_request" using primary key columns */
  loan_request_by_pk?: Maybe<Loan_Request>
  /** fetch data from the table: "loan_request_state" */
  loan_request_state: Array<Loan_Request_State>
  /** fetch aggregated fields from the table: "loan_request_state" */
  loan_request_state_aggregate: Loan_Request_State_Aggregate
  /** fetch data from the table: "loan_request_state" using primary key columns */
  loan_request_state_by_pk?: Maybe<Loan_Request_State>
  /** fetch data from the table: "loan_state" */
  loan_state: Array<Loan_State>
  /** fetch aggregated fields from the table: "loan_state" */
  loan_state_aggregate: Loan_State_Aggregate
  /** fetch data from the table: "loan_state" using primary key columns */
  loan_state_by_pk?: Maybe<Loan_State>
  /** fetch data from the table: "repayment" */
  repayment: Array<Repayment>
  /** fetch aggregated fields from the table: "repayment" */
  repayment_aggregate: Repayment_Aggregate
  /** fetch data from the table: "repayment" using primary key columns */
  repayment_by_pk?: Maybe<Repayment>
  /** fetch data from the table: "scenario_actions" */
  scenario_actions: Array<Scenario_Actions>
  /** fetch aggregated fields from the table: "scenario_actions" */
  scenario_actions_aggregate: Scenario_Actions_Aggregate
  /** fetch data from the table: "scenario_actions" using primary key columns */
  scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** fetch data from the table: "update_log" */
  update_log: Array<Update_Log>
  /** fetch aggregated fields from the table: "update_log" */
  update_log_aggregate: Update_Log_Aggregate
  /** fetch data from the table: "update_log" using primary key columns */
  update_log_by_pk?: Maybe<Update_Log>
  /** fetch data from the table: "update_type" */
  update_type: Array<Update_Type>
  /** fetch aggregated fields from the table: "update_type" */
  update_type_aggregate: Update_Type_Aggregate
  /** fetch data from the table: "update_type" using primary key columns */
  update_type_by_pk?: Maybe<Update_Type>
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
  /** fetch data from the table: "user_type" */
  user_type: Array<User_Type>
  /** fetch aggregated fields from the table: "user_type" */
  user_type_aggregate: User_Type_Aggregate
  /** fetch data from the table: "user_type" using primary key columns */
  user_type_by_pk?: Maybe<User_Type>
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
export type Query_RootLender_AmountArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** query root */
export type Query_RootLender_Amount_AggregateArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** query root */
export type Query_RootLender_Amount_By_PkArgs = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** query root */
export type Query_RootLoanArgs = {
  distinct_on?: Maybe<Array<Loan_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Order_By>>
  where?: Maybe<Loan_Bool_Exp>
}

/** query root */
export type Query_RootLoan_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Order_By>>
  where?: Maybe<Loan_Bool_Exp>
}

/** query root */
export type Query_RootLoan_By_PkArgs = {
  loan_id: Scalars["uuid"]
}

/** query root */
export type Query_RootLoan_RequestArgs = {
  distinct_on?: Maybe<Array<Loan_Request_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_Order_By>>
  where?: Maybe<Loan_Request_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Request_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Request_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_Order_By>>
  where?: Maybe<Loan_Request_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Request_By_PkArgs = {
  request_id: Scalars["uuid"]
}

/** query root */
export type Query_RootLoan_Request_StateArgs = {
  distinct_on?: Maybe<Array<Loan_Request_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_State_Order_By>>
  where?: Maybe<Loan_Request_State_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Request_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Request_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_State_Order_By>>
  where?: Maybe<Loan_Request_State_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Request_State_By_PkArgs = {
  value: Scalars["String"]
}

/** query root */
export type Query_RootLoan_StateArgs = {
  distinct_on?: Maybe<Array<Loan_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_State_Order_By>>
  where?: Maybe<Loan_State_Bool_Exp>
}

/** query root */
export type Query_RootLoan_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_State_Order_By>>
  where?: Maybe<Loan_State_Bool_Exp>
}

/** query root */
export type Query_RootLoan_State_By_PkArgs = {
  value: Scalars["String"]
}

/** query root */
export type Query_RootRepaymentArgs = {
  distinct_on?: Maybe<Array<Repayment_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Repayment_Order_By>>
  where?: Maybe<Repayment_Bool_Exp>
}

/** query root */
export type Query_RootRepayment_AggregateArgs = {
  distinct_on?: Maybe<Array<Repayment_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Repayment_Order_By>>
  where?: Maybe<Repayment_Bool_Exp>
}

/** query root */
export type Query_RootRepayment_By_PkArgs = {
  repayment_id: Scalars["uuid"]
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
export type Query_RootUpdate_LogArgs = {
  distinct_on?: Maybe<Array<Update_Log_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Log_Order_By>>
  where?: Maybe<Update_Log_Bool_Exp>
}

/** query root */
export type Query_RootUpdate_Log_AggregateArgs = {
  distinct_on?: Maybe<Array<Update_Log_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Log_Order_By>>
  where?: Maybe<Update_Log_Bool_Exp>
}

/** query root */
export type Query_RootUpdate_Log_By_PkArgs = {
  update_id: Scalars["uuid"]
}

/** query root */
export type Query_RootUpdate_TypeArgs = {
  distinct_on?: Maybe<Array<Update_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Type_Order_By>>
  where?: Maybe<Update_Type_Bool_Exp>
}

/** query root */
export type Query_RootUpdate_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Update_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Type_Order_By>>
  where?: Maybe<Update_Type_Bool_Exp>
}

/** query root */
export type Query_RootUpdate_Type_By_PkArgs = {
  value: Scalars["String"]
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

/** query root */
export type Query_RootUser_TypeArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Type_Order_By>>
  where?: Maybe<User_Type_Bool_Exp>
}

/** query root */
export type Query_RootUser_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Type_Order_By>>
  where?: Maybe<User_Type_Bool_Exp>
}

/** query root */
export type Query_RootUser_Type_By_PkArgs = {
  value: Scalars["String"]
}

/** columns and relationships of "repayment" */
export type Repayment = {
  __typename?: "repayment"
  date: Scalars["date"]
  /** An object relationship */
  loan: Loan
  loan_id: Scalars["uuid"]
  repaid_interest: Scalars["float8"]
  repaid_principal: Scalars["float8"]
  repayment_id: Scalars["uuid"]
}

/** aggregated selection of "repayment" */
export type Repayment_Aggregate = {
  __typename?: "repayment_aggregate"
  aggregate?: Maybe<Repayment_Aggregate_Fields>
  nodes: Array<Repayment>
}

/** aggregate fields of "repayment" */
export type Repayment_Aggregate_Fields = {
  __typename?: "repayment_aggregate_fields"
  avg?: Maybe<Repayment_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Repayment_Max_Fields>
  min?: Maybe<Repayment_Min_Fields>
  stddev?: Maybe<Repayment_Stddev_Fields>
  stddev_pop?: Maybe<Repayment_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Repayment_Stddev_Samp_Fields>
  sum?: Maybe<Repayment_Sum_Fields>
  var_pop?: Maybe<Repayment_Var_Pop_Fields>
  var_samp?: Maybe<Repayment_Var_Samp_Fields>
  variance?: Maybe<Repayment_Variance_Fields>
}

/** aggregate fields of "repayment" */
export type Repayment_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Repayment_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "repayment" */
export type Repayment_Aggregate_Order_By = {
  avg?: Maybe<Repayment_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Repayment_Max_Order_By>
  min?: Maybe<Repayment_Min_Order_By>
  stddev?: Maybe<Repayment_Stddev_Order_By>
  stddev_pop?: Maybe<Repayment_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Repayment_Stddev_Samp_Order_By>
  sum?: Maybe<Repayment_Sum_Order_By>
  var_pop?: Maybe<Repayment_Var_Pop_Order_By>
  var_samp?: Maybe<Repayment_Var_Samp_Order_By>
  variance?: Maybe<Repayment_Variance_Order_By>
}

/** input type for inserting array relation for remote table "repayment" */
export type Repayment_Arr_Rel_Insert_Input = {
  data: Array<Repayment_Insert_Input>
  on_conflict?: Maybe<Repayment_On_Conflict>
}

/** aggregate avg on columns */
export type Repayment_Avg_Fields = {
  __typename?: "repayment_avg_fields"
  repaid_interest?: Maybe<Scalars["Float"]>
  repaid_principal?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "repayment" */
export type Repayment_Avg_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "repayment". All fields are combined with a logical 'AND'. */
export type Repayment_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Repayment_Bool_Exp>>>
  _not?: Maybe<Repayment_Bool_Exp>
  _or?: Maybe<Array<Maybe<Repayment_Bool_Exp>>>
  date?: Maybe<Date_Comparison_Exp>
  loan?: Maybe<Loan_Bool_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  repaid_interest?: Maybe<Float8_Comparison_Exp>
  repaid_principal?: Maybe<Float8_Comparison_Exp>
  repayment_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "repayment" */
export enum Repayment_Constraint {
  /** unique or primary key constraint */
  RepaymentPkey = "repayment_pkey",
}

/** input type for incrementing integer column in table "repayment" */
export type Repayment_Inc_Input = {
  repaid_interest?: Maybe<Scalars["float8"]>
  repaid_principal?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "repayment" */
export type Repayment_Insert_Input = {
  date?: Maybe<Scalars["date"]>
  loan?: Maybe<Loan_Obj_Rel_Insert_Input>
  loan_id?: Maybe<Scalars["uuid"]>
  repaid_interest?: Maybe<Scalars["float8"]>
  repaid_principal?: Maybe<Scalars["float8"]>
  repayment_id?: Maybe<Scalars["uuid"]>
}

/** aggregate max on columns */
export type Repayment_Max_Fields = {
  __typename?: "repayment_max_fields"
  date?: Maybe<Scalars["date"]>
  loan_id?: Maybe<Scalars["uuid"]>
  repaid_interest?: Maybe<Scalars["float8"]>
  repaid_principal?: Maybe<Scalars["float8"]>
  repayment_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "repayment" */
export type Repayment_Max_Order_By = {
  date?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
  repayment_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Repayment_Min_Fields = {
  __typename?: "repayment_min_fields"
  date?: Maybe<Scalars["date"]>
  loan_id?: Maybe<Scalars["uuid"]>
  repaid_interest?: Maybe<Scalars["float8"]>
  repaid_principal?: Maybe<Scalars["float8"]>
  repayment_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "repayment" */
export type Repayment_Min_Order_By = {
  date?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
  repayment_id?: Maybe<Order_By>
}

/** response of any mutation on the table "repayment" */
export type Repayment_Mutation_Response = {
  __typename?: "repayment_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Repayment>
}

/** input type for inserting object relation for remote table "repayment" */
export type Repayment_Obj_Rel_Insert_Input = {
  data: Repayment_Insert_Input
  on_conflict?: Maybe<Repayment_On_Conflict>
}

/** on conflict condition type for table "repayment" */
export type Repayment_On_Conflict = {
  constraint: Repayment_Constraint
  update_columns: Array<Repayment_Update_Column>
  where?: Maybe<Repayment_Bool_Exp>
}

/** ordering options when selecting data from "repayment" */
export type Repayment_Order_By = {
  date?: Maybe<Order_By>
  loan?: Maybe<Loan_Order_By>
  loan_id?: Maybe<Order_By>
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
  repayment_id?: Maybe<Order_By>
}

/** primary key columns input for table: "repayment" */
export type Repayment_Pk_Columns_Input = {
  repayment_id: Scalars["uuid"]
}

/** select columns of table "repayment" */
export enum Repayment_Select_Column {
  /** column name */
  Date = "date",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  RepaidInterest = "repaid_interest",
  /** column name */
  RepaidPrincipal = "repaid_principal",
  /** column name */
  RepaymentId = "repayment_id",
}

/** input type for updating data in table "repayment" */
export type Repayment_Set_Input = {
  date?: Maybe<Scalars["date"]>
  loan_id?: Maybe<Scalars["uuid"]>
  repaid_interest?: Maybe<Scalars["float8"]>
  repaid_principal?: Maybe<Scalars["float8"]>
  repayment_id?: Maybe<Scalars["uuid"]>
}

/** aggregate stddev on columns */
export type Repayment_Stddev_Fields = {
  __typename?: "repayment_stddev_fields"
  repaid_interest?: Maybe<Scalars["Float"]>
  repaid_principal?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "repayment" */
export type Repayment_Stddev_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Repayment_Stddev_Pop_Fields = {
  __typename?: "repayment_stddev_pop_fields"
  repaid_interest?: Maybe<Scalars["Float"]>
  repaid_principal?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "repayment" */
export type Repayment_Stddev_Pop_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Repayment_Stddev_Samp_Fields = {
  __typename?: "repayment_stddev_samp_fields"
  repaid_interest?: Maybe<Scalars["Float"]>
  repaid_principal?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "repayment" */
export type Repayment_Stddev_Samp_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Repayment_Sum_Fields = {
  __typename?: "repayment_sum_fields"
  repaid_interest?: Maybe<Scalars["float8"]>
  repaid_principal?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "repayment" */
export type Repayment_Sum_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
}

/** update columns of table "repayment" */
export enum Repayment_Update_Column {
  /** column name */
  Date = "date",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  RepaidInterest = "repaid_interest",
  /** column name */
  RepaidPrincipal = "repaid_principal",
  /** column name */
  RepaymentId = "repayment_id",
}

/** aggregate var_pop on columns */
export type Repayment_Var_Pop_Fields = {
  __typename?: "repayment_var_pop_fields"
  repaid_interest?: Maybe<Scalars["Float"]>
  repaid_principal?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "repayment" */
export type Repayment_Var_Pop_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Repayment_Var_Samp_Fields = {
  __typename?: "repayment_var_samp_fields"
  repaid_interest?: Maybe<Scalars["Float"]>
  repaid_principal?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "repayment" */
export type Repayment_Var_Samp_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Repayment_Variance_Fields = {
  __typename?: "repayment_variance_fields"
  repaid_interest?: Maybe<Scalars["Float"]>
  repaid_principal?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "repayment" */
export type Repayment_Variance_Order_By = {
  repaid_interest?: Maybe<Order_By>
  repaid_principal?: Maybe<Order_By>
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
  /** fetch data from the table: "events" */
  events: Array<Events>
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>
  /** fetch data from the table: "lender_amount" */
  lender_amount: Array<Lender_Amount>
  /** fetch aggregated fields from the table: "lender_amount" */
  lender_amount_aggregate: Lender_Amount_Aggregate
  /** fetch data from the table: "lender_amount" using primary key columns */
  lender_amount_by_pk?: Maybe<Lender_Amount>
  /** fetch data from the table: "loan" */
  loan: Array<Loan>
  /** fetch aggregated fields from the table: "loan" */
  loan_aggregate: Loan_Aggregate
  /** fetch data from the table: "loan" using primary key columns */
  loan_by_pk?: Maybe<Loan>
  /** fetch data from the table: "loan_request" */
  loan_request: Array<Loan_Request>
  /** fetch aggregated fields from the table: "loan_request" */
  loan_request_aggregate: Loan_Request_Aggregate
  /** fetch data from the table: "loan_request" using primary key columns */
  loan_request_by_pk?: Maybe<Loan_Request>
  /** fetch data from the table: "loan_request_state" */
  loan_request_state: Array<Loan_Request_State>
  /** fetch aggregated fields from the table: "loan_request_state" */
  loan_request_state_aggregate: Loan_Request_State_Aggregate
  /** fetch data from the table: "loan_request_state" using primary key columns */
  loan_request_state_by_pk?: Maybe<Loan_Request_State>
  /** fetch data from the table: "loan_state" */
  loan_state: Array<Loan_State>
  /** fetch aggregated fields from the table: "loan_state" */
  loan_state_aggregate: Loan_State_Aggregate
  /** fetch data from the table: "loan_state" using primary key columns */
  loan_state_by_pk?: Maybe<Loan_State>
  /** fetch data from the table: "repayment" */
  repayment: Array<Repayment>
  /** fetch aggregated fields from the table: "repayment" */
  repayment_aggregate: Repayment_Aggregate
  /** fetch data from the table: "repayment" using primary key columns */
  repayment_by_pk?: Maybe<Repayment>
  /** fetch data from the table: "scenario_actions" */
  scenario_actions: Array<Scenario_Actions>
  /** fetch aggregated fields from the table: "scenario_actions" */
  scenario_actions_aggregate: Scenario_Actions_Aggregate
  /** fetch data from the table: "scenario_actions" using primary key columns */
  scenario_actions_by_pk?: Maybe<Scenario_Actions>
  /** fetch data from the table: "update_log" */
  update_log: Array<Update_Log>
  /** fetch aggregated fields from the table: "update_log" */
  update_log_aggregate: Update_Log_Aggregate
  /** fetch data from the table: "update_log" using primary key columns */
  update_log_by_pk?: Maybe<Update_Log>
  /** fetch data from the table: "update_type" */
  update_type: Array<Update_Type>
  /** fetch aggregated fields from the table: "update_type" */
  update_type_aggregate: Update_Type_Aggregate
  /** fetch data from the table: "update_type" using primary key columns */
  update_type_by_pk?: Maybe<Update_Type>
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
  /** fetch data from the table: "user_type" */
  user_type: Array<User_Type>
  /** fetch aggregated fields from the table: "user_type" */
  user_type_aggregate: User_Type_Aggregate
  /** fetch data from the table: "user_type" using primary key columns */
  user_type_by_pk?: Maybe<User_Type>
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
export type Subscription_RootLender_AmountArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLender_Amount_AggregateArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLender_Amount_By_PkArgs = {
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootLoanArgs = {
  distinct_on?: Maybe<Array<Loan_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Order_By>>
  where?: Maybe<Loan_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Order_By>>
  where?: Maybe<Loan_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_By_PkArgs = {
  loan_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootLoan_RequestArgs = {
  distinct_on?: Maybe<Array<Loan_Request_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_Order_By>>
  where?: Maybe<Loan_Request_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Request_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Request_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_Order_By>>
  where?: Maybe<Loan_Request_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Request_By_PkArgs = {
  request_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootLoan_Request_StateArgs = {
  distinct_on?: Maybe<Array<Loan_Request_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_State_Order_By>>
  where?: Maybe<Loan_Request_State_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Request_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Request_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_State_Order_By>>
  where?: Maybe<Loan_Request_State_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Request_State_By_PkArgs = {
  value: Scalars["String"]
}

/** subscription root */
export type Subscription_RootLoan_StateArgs = {
  distinct_on?: Maybe<Array<Loan_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_State_Order_By>>
  where?: Maybe<Loan_State_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_State_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_State_Order_By>>
  where?: Maybe<Loan_State_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_State_By_PkArgs = {
  value: Scalars["String"]
}

/** subscription root */
export type Subscription_RootRepaymentArgs = {
  distinct_on?: Maybe<Array<Repayment_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Repayment_Order_By>>
  where?: Maybe<Repayment_Bool_Exp>
}

/** subscription root */
export type Subscription_RootRepayment_AggregateArgs = {
  distinct_on?: Maybe<Array<Repayment_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Repayment_Order_By>>
  where?: Maybe<Repayment_Bool_Exp>
}

/** subscription root */
export type Subscription_RootRepayment_By_PkArgs = {
  repayment_id: Scalars["uuid"]
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
export type Subscription_RootUpdate_LogArgs = {
  distinct_on?: Maybe<Array<Update_Log_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Log_Order_By>>
  where?: Maybe<Update_Log_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUpdate_Log_AggregateArgs = {
  distinct_on?: Maybe<Array<Update_Log_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Log_Order_By>>
  where?: Maybe<Update_Log_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUpdate_Log_By_PkArgs = {
  update_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootUpdate_TypeArgs = {
  distinct_on?: Maybe<Array<Update_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Type_Order_By>>
  where?: Maybe<Update_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUpdate_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Update_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Update_Type_Order_By>>
  where?: Maybe<Update_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUpdate_Type_By_PkArgs = {
  value: Scalars["String"]
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

/** subscription root */
export type Subscription_RootUser_TypeArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Type_Order_By>>
  where?: Maybe<User_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUser_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<User_Type_Order_By>>
  where?: Maybe<User_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUser_Type_By_PkArgs = {
  value: Scalars["String"]
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

/** columns and relationships of "update_log" */
export type Update_Log = {
  __typename?: "update_log"
  date: Scalars["timestamptz"]
  loan_id: Scalars["uuid"]
  new_interest_accrued: Scalars["float8"]
  new_next_payment_amount: Scalars["float8"]
  new_next_payment_due_date: Scalars["date"]
  new_penalty_accrued: Scalars["float8"]
  new_principal_remain: Scalars["float8"]
  new_state: Scalars["String"]
  repayment_id: Scalars["uuid"]
  type: Update_Type_Enum
  update_id: Scalars["uuid"]
}

/** aggregated selection of "update_log" */
export type Update_Log_Aggregate = {
  __typename?: "update_log_aggregate"
  aggregate?: Maybe<Update_Log_Aggregate_Fields>
  nodes: Array<Update_Log>
}

/** aggregate fields of "update_log" */
export type Update_Log_Aggregate_Fields = {
  __typename?: "update_log_aggregate_fields"
  avg?: Maybe<Update_Log_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Update_Log_Max_Fields>
  min?: Maybe<Update_Log_Min_Fields>
  stddev?: Maybe<Update_Log_Stddev_Fields>
  stddev_pop?: Maybe<Update_Log_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Update_Log_Stddev_Samp_Fields>
  sum?: Maybe<Update_Log_Sum_Fields>
  var_pop?: Maybe<Update_Log_Var_Pop_Fields>
  var_samp?: Maybe<Update_Log_Var_Samp_Fields>
  variance?: Maybe<Update_Log_Variance_Fields>
}

/** aggregate fields of "update_log" */
export type Update_Log_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Update_Log_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "update_log" */
export type Update_Log_Aggregate_Order_By = {
  avg?: Maybe<Update_Log_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Update_Log_Max_Order_By>
  min?: Maybe<Update_Log_Min_Order_By>
  stddev?: Maybe<Update_Log_Stddev_Order_By>
  stddev_pop?: Maybe<Update_Log_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Update_Log_Stddev_Samp_Order_By>
  sum?: Maybe<Update_Log_Sum_Order_By>
  var_pop?: Maybe<Update_Log_Var_Pop_Order_By>
  var_samp?: Maybe<Update_Log_Var_Samp_Order_By>
  variance?: Maybe<Update_Log_Variance_Order_By>
}

/** input type for inserting array relation for remote table "update_log" */
export type Update_Log_Arr_Rel_Insert_Input = {
  data: Array<Update_Log_Insert_Input>
  on_conflict?: Maybe<Update_Log_On_Conflict>
}

/** aggregate avg on columns */
export type Update_Log_Avg_Fields = {
  __typename?: "update_log_avg_fields"
  new_interest_accrued?: Maybe<Scalars["Float"]>
  new_next_payment_amount?: Maybe<Scalars["Float"]>
  new_penalty_accrued?: Maybe<Scalars["Float"]>
  new_principal_remain?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "update_log" */
export type Update_Log_Avg_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "update_log". All fields are combined with a logical 'AND'. */
export type Update_Log_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Update_Log_Bool_Exp>>>
  _not?: Maybe<Update_Log_Bool_Exp>
  _or?: Maybe<Array<Maybe<Update_Log_Bool_Exp>>>
  date?: Maybe<Timestamptz_Comparison_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  new_interest_accrued?: Maybe<Float8_Comparison_Exp>
  new_next_payment_amount?: Maybe<Float8_Comparison_Exp>
  new_next_payment_due_date?: Maybe<Date_Comparison_Exp>
  new_penalty_accrued?: Maybe<Float8_Comparison_Exp>
  new_principal_remain?: Maybe<Float8_Comparison_Exp>
  new_state?: Maybe<String_Comparison_Exp>
  repayment_id?: Maybe<Uuid_Comparison_Exp>
  type?: Maybe<Update_Type_Enum_Comparison_Exp>
  update_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "update_log" */
export enum Update_Log_Constraint {
  /** unique or primary key constraint */
  UpdateLogPkey = "update_log_pkey",
}

/** input type for incrementing integer column in table "update_log" */
export type Update_Log_Inc_Input = {
  new_interest_accrued?: Maybe<Scalars["float8"]>
  new_next_payment_amount?: Maybe<Scalars["float8"]>
  new_penalty_accrued?: Maybe<Scalars["float8"]>
  new_principal_remain?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "update_log" */
export type Update_Log_Insert_Input = {
  date?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  new_interest_accrued?: Maybe<Scalars["float8"]>
  new_next_payment_amount?: Maybe<Scalars["float8"]>
  new_next_payment_due_date?: Maybe<Scalars["date"]>
  new_penalty_accrued?: Maybe<Scalars["float8"]>
  new_principal_remain?: Maybe<Scalars["float8"]>
  new_state?: Maybe<Scalars["String"]>
  repayment_id?: Maybe<Scalars["uuid"]>
  type?: Maybe<Update_Type_Enum>
  update_id?: Maybe<Scalars["uuid"]>
}

/** aggregate max on columns */
export type Update_Log_Max_Fields = {
  __typename?: "update_log_max_fields"
  date?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  new_interest_accrued?: Maybe<Scalars["float8"]>
  new_next_payment_amount?: Maybe<Scalars["float8"]>
  new_next_payment_due_date?: Maybe<Scalars["date"]>
  new_penalty_accrued?: Maybe<Scalars["float8"]>
  new_principal_remain?: Maybe<Scalars["float8"]>
  new_state?: Maybe<Scalars["String"]>
  repayment_id?: Maybe<Scalars["uuid"]>
  update_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "update_log" */
export type Update_Log_Max_Order_By = {
  date?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_next_payment_due_date?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
  new_state?: Maybe<Order_By>
  repayment_id?: Maybe<Order_By>
  update_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Update_Log_Min_Fields = {
  __typename?: "update_log_min_fields"
  date?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  new_interest_accrued?: Maybe<Scalars["float8"]>
  new_next_payment_amount?: Maybe<Scalars["float8"]>
  new_next_payment_due_date?: Maybe<Scalars["date"]>
  new_penalty_accrued?: Maybe<Scalars["float8"]>
  new_principal_remain?: Maybe<Scalars["float8"]>
  new_state?: Maybe<Scalars["String"]>
  repayment_id?: Maybe<Scalars["uuid"]>
  update_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "update_log" */
export type Update_Log_Min_Order_By = {
  date?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_next_payment_due_date?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
  new_state?: Maybe<Order_By>
  repayment_id?: Maybe<Order_By>
  update_id?: Maybe<Order_By>
}

/** response of any mutation on the table "update_log" */
export type Update_Log_Mutation_Response = {
  __typename?: "update_log_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Update_Log>
}

/** input type for inserting object relation for remote table "update_log" */
export type Update_Log_Obj_Rel_Insert_Input = {
  data: Update_Log_Insert_Input
  on_conflict?: Maybe<Update_Log_On_Conflict>
}

/** on conflict condition type for table "update_log" */
export type Update_Log_On_Conflict = {
  constraint: Update_Log_Constraint
  update_columns: Array<Update_Log_Update_Column>
  where?: Maybe<Update_Log_Bool_Exp>
}

/** ordering options when selecting data from "update_log" */
export type Update_Log_Order_By = {
  date?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_next_payment_due_date?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
  new_state?: Maybe<Order_By>
  repayment_id?: Maybe<Order_By>
  type?: Maybe<Order_By>
  update_id?: Maybe<Order_By>
}

/** primary key columns input for table: "update_log" */
export type Update_Log_Pk_Columns_Input = {
  update_id: Scalars["uuid"]
}

/** select columns of table "update_log" */
export enum Update_Log_Select_Column {
  /** column name */
  Date = "date",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  NewInterestAccrued = "new_interest_accrued",
  /** column name */
  NewNextPaymentAmount = "new_next_payment_amount",
  /** column name */
  NewNextPaymentDueDate = "new_next_payment_due_date",
  /** column name */
  NewPenaltyAccrued = "new_penalty_accrued",
  /** column name */
  NewPrincipalRemain = "new_principal_remain",
  /** column name */
  NewState = "new_state",
  /** column name */
  RepaymentId = "repayment_id",
  /** column name */
  Type = "type",
  /** column name */
  UpdateId = "update_id",
}

/** input type for updating data in table "update_log" */
export type Update_Log_Set_Input = {
  date?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  new_interest_accrued?: Maybe<Scalars["float8"]>
  new_next_payment_amount?: Maybe<Scalars["float8"]>
  new_next_payment_due_date?: Maybe<Scalars["date"]>
  new_penalty_accrued?: Maybe<Scalars["float8"]>
  new_principal_remain?: Maybe<Scalars["float8"]>
  new_state?: Maybe<Scalars["String"]>
  repayment_id?: Maybe<Scalars["uuid"]>
  type?: Maybe<Update_Type_Enum>
  update_id?: Maybe<Scalars["uuid"]>
}

/** aggregate stddev on columns */
export type Update_Log_Stddev_Fields = {
  __typename?: "update_log_stddev_fields"
  new_interest_accrued?: Maybe<Scalars["Float"]>
  new_next_payment_amount?: Maybe<Scalars["Float"]>
  new_penalty_accrued?: Maybe<Scalars["Float"]>
  new_principal_remain?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "update_log" */
export type Update_Log_Stddev_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Update_Log_Stddev_Pop_Fields = {
  __typename?: "update_log_stddev_pop_fields"
  new_interest_accrued?: Maybe<Scalars["Float"]>
  new_next_payment_amount?: Maybe<Scalars["Float"]>
  new_penalty_accrued?: Maybe<Scalars["Float"]>
  new_principal_remain?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "update_log" */
export type Update_Log_Stddev_Pop_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Update_Log_Stddev_Samp_Fields = {
  __typename?: "update_log_stddev_samp_fields"
  new_interest_accrued?: Maybe<Scalars["Float"]>
  new_next_payment_amount?: Maybe<Scalars["Float"]>
  new_penalty_accrued?: Maybe<Scalars["Float"]>
  new_principal_remain?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "update_log" */
export type Update_Log_Stddev_Samp_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Update_Log_Sum_Fields = {
  __typename?: "update_log_sum_fields"
  new_interest_accrued?: Maybe<Scalars["float8"]>
  new_next_payment_amount?: Maybe<Scalars["float8"]>
  new_penalty_accrued?: Maybe<Scalars["float8"]>
  new_principal_remain?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "update_log" */
export type Update_Log_Sum_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** update columns of table "update_log" */
export enum Update_Log_Update_Column {
  /** column name */
  Date = "date",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  NewInterestAccrued = "new_interest_accrued",
  /** column name */
  NewNextPaymentAmount = "new_next_payment_amount",
  /** column name */
  NewNextPaymentDueDate = "new_next_payment_due_date",
  /** column name */
  NewPenaltyAccrued = "new_penalty_accrued",
  /** column name */
  NewPrincipalRemain = "new_principal_remain",
  /** column name */
  NewState = "new_state",
  /** column name */
  RepaymentId = "repayment_id",
  /** column name */
  Type = "type",
  /** column name */
  UpdateId = "update_id",
}

/** aggregate var_pop on columns */
export type Update_Log_Var_Pop_Fields = {
  __typename?: "update_log_var_pop_fields"
  new_interest_accrued?: Maybe<Scalars["Float"]>
  new_next_payment_amount?: Maybe<Scalars["Float"]>
  new_penalty_accrued?: Maybe<Scalars["Float"]>
  new_principal_remain?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "update_log" */
export type Update_Log_Var_Pop_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Update_Log_Var_Samp_Fields = {
  __typename?: "update_log_var_samp_fields"
  new_interest_accrued?: Maybe<Scalars["Float"]>
  new_next_payment_amount?: Maybe<Scalars["Float"]>
  new_penalty_accrued?: Maybe<Scalars["Float"]>
  new_principal_remain?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "update_log" */
export type Update_Log_Var_Samp_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Update_Log_Variance_Fields = {
  __typename?: "update_log_variance_fields"
  new_interest_accrued?: Maybe<Scalars["Float"]>
  new_next_payment_amount?: Maybe<Scalars["Float"]>
  new_penalty_accrued?: Maybe<Scalars["Float"]>
  new_principal_remain?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "update_log" */
export type Update_Log_Variance_Order_By = {
  new_interest_accrued?: Maybe<Order_By>
  new_next_payment_amount?: Maybe<Order_By>
  new_penalty_accrued?: Maybe<Order_By>
  new_principal_remain?: Maybe<Order_By>
}

/** columns and relationships of "update_type" */
export type Update_Type = {
  __typename?: "update_type"
  comment: Scalars["String"]
  value: Scalars["String"]
}

/** aggregated selection of "update_type" */
export type Update_Type_Aggregate = {
  __typename?: "update_type_aggregate"
  aggregate?: Maybe<Update_Type_Aggregate_Fields>
  nodes: Array<Update_Type>
}

/** aggregate fields of "update_type" */
export type Update_Type_Aggregate_Fields = {
  __typename?: "update_type_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Update_Type_Max_Fields>
  min?: Maybe<Update_Type_Min_Fields>
}

/** aggregate fields of "update_type" */
export type Update_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Update_Type_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "update_type" */
export type Update_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Update_Type_Max_Order_By>
  min?: Maybe<Update_Type_Min_Order_By>
}

/** input type for inserting array relation for remote table "update_type" */
export type Update_Type_Arr_Rel_Insert_Input = {
  data: Array<Update_Type_Insert_Input>
  on_conflict?: Maybe<Update_Type_On_Conflict>
}

/** Boolean expression to filter rows from the table "update_type". All fields are combined with a logical 'AND'. */
export type Update_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Update_Type_Bool_Exp>>>
  _not?: Maybe<Update_Type_Bool_Exp>
  _or?: Maybe<Array<Maybe<Update_Type_Bool_Exp>>>
  comment?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "update_type" */
export enum Update_Type_Constraint {
  /** unique or primary key constraint */
  UpdateTypePkey = "update_type_pkey",
}

export enum Update_Type_Enum {
  /** whenever the compoungind period ends */
  Compound = "COMPOUND",
  /** when the loan is set to default */
  Default = "DEFAULT",
  /** when a penalty condition was true */
  Penalty = "PENALTY",
  /** when a repayment is made */
  Repayment = "REPAYMENT",
}

/** expression to compare columns of type update_type_enum. All fields are combined with logical 'AND'. */
export type Update_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Update_Type_Enum>
  _in?: Maybe<Array<Update_Type_Enum>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _neq?: Maybe<Update_Type_Enum>
  _nin?: Maybe<Array<Update_Type_Enum>>
}

/** input type for inserting data into table "update_type" */
export type Update_Type_Insert_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Update_Type_Max_Fields = {
  __typename?: "update_type_max_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "update_type" */
export type Update_Type_Max_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Update_Type_Min_Fields = {
  __typename?: "update_type_min_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "update_type" */
export type Update_Type_Min_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** response of any mutation on the table "update_type" */
export type Update_Type_Mutation_Response = {
  __typename?: "update_type_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Update_Type>
}

/** input type for inserting object relation for remote table "update_type" */
export type Update_Type_Obj_Rel_Insert_Input = {
  data: Update_Type_Insert_Input
  on_conflict?: Maybe<Update_Type_On_Conflict>
}

/** on conflict condition type for table "update_type" */
export type Update_Type_On_Conflict = {
  constraint: Update_Type_Constraint
  update_columns: Array<Update_Type_Update_Column>
  where?: Maybe<Update_Type_Bool_Exp>
}

/** ordering options when selecting data from "update_type" */
export type Update_Type_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: "update_type" */
export type Update_Type_Pk_Columns_Input = {
  value: Scalars["String"]
}

/** select columns of table "update_type" */
export enum Update_Type_Select_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** input type for updating data in table "update_type" */
export type Update_Type_Set_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** update columns of table "update_type" */
export enum Update_Type_Update_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** columns and relationships of "user" */
export type User = {
  __typename?: "user"
  account_details?: Maybe<Scalars["jsonb"]>
  balance?: Maybe<Scalars["float8"]>
  created_at: Scalars["timestamptz"]
  demographic_info?: Maybe<Scalars["jsonb"]>
  email: Scalars["String"]
  first_name: Scalars["String"]
  id: Scalars["uuid"]
  kyc_approved?: Maybe<Scalars["Boolean"]>
  last_name?: Maybe<Scalars["String"]>
  /** An array relationship */
  lender_amounts: Array<Lender_Amount>
  /** An aggregated array relationship */
  lender_amounts_aggregate: Lender_Amount_Aggregate
  /** An array relationship */
  loan_requests: Array<Loan_Request>
  /** An aggregated array relationship */
  loan_requests_aggregate: Loan_Request_Aggregate
  /** An array relationship */
  loans: Array<Loan>
  /** An aggregated array relationship */
  loans_aggregate: Loan_Aggregate
  onboarded?: Maybe<Scalars["Boolean"]>
  phone: Scalars["String"]
  updated_at: Scalars["timestamptz"]
  user_type: Scalars["user_t"]
}

/** columns and relationships of "user" */
export type UserAccount_DetailsArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "user" */
export type UserDemographic_InfoArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "user" */
export type UserLender_AmountsArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLender_Amounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Lender_Amount_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Lender_Amount_Order_By>>
  where?: Maybe<Lender_Amount_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoan_RequestsArgs = {
  distinct_on?: Maybe<Array<Loan_Request_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_Order_By>>
  where?: Maybe<Loan_Request_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoan_Requests_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Request_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Request_Order_By>>
  where?: Maybe<Loan_Request_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoansArgs = {
  distinct_on?: Maybe<Array<Loan_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Order_By>>
  where?: Maybe<Loan_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoans_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Order_By>>
  where?: Maybe<Loan_Bool_Exp>
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
}

/** order by avg() on columns of table "user" */
export type User_Avg_Order_By = {
  balance?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>
  _not?: Maybe<User_Bool_Exp>
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>
  account_details?: Maybe<Jsonb_Comparison_Exp>
  balance?: Maybe<Float8_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  demographic_info?: Maybe<Jsonb_Comparison_Exp>
  email?: Maybe<String_Comparison_Exp>
  first_name?: Maybe<String_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  kyc_approved?: Maybe<Boolean_Comparison_Exp>
  last_name?: Maybe<String_Comparison_Exp>
  lender_amounts?: Maybe<Lender_Amount_Bool_Exp>
  loan_requests?: Maybe<Loan_Request_Bool_Exp>
  loans?: Maybe<Loan_Bool_Exp>
  onboarded?: Maybe<Boolean_Comparison_Exp>
  phone?: Maybe<String_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  user_type?: Maybe<User_T_Comparison_Exp>
}

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserEmailKey = "user_email_key",
  /** unique or primary key constraint */
  UserPkey = "user_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type User_Delete_At_Path_Input = {
  account_details?: Maybe<Array<Maybe<Scalars["String"]>>>
  demographic_info?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type User_Delete_Elem_Input = {
  account_details?: Maybe<Scalars["Int"]>
  demographic_info?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type User_Delete_Key_Input = {
  account_details?: Maybe<Scalars["String"]>
  demographic_info?: Maybe<Scalars["String"]>
}

/** input type for incrementing integer column in table "user" */
export type User_Inc_Input = {
  balance?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  account_details?: Maybe<Scalars["jsonb"]>
  balance?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  email?: Maybe<Scalars["String"]>
  first_name?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  kyc_approved?: Maybe<Scalars["Boolean"]>
  last_name?: Maybe<Scalars["String"]>
  lender_amounts?: Maybe<Lender_Amount_Arr_Rel_Insert_Input>
  loan_requests?: Maybe<Loan_Request_Arr_Rel_Insert_Input>
  loans?: Maybe<Loan_Arr_Rel_Insert_Input>
  onboarded?: Maybe<Scalars["Boolean"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user_type?: Maybe<Scalars["user_t"]>
}

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: "user_max_fields"
  balance?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  email?: Maybe<Scalars["String"]>
  first_name?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  last_name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  balance?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  first_name?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_name?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: "user_min_fields"
  balance?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  email?: Maybe<Scalars["String"]>
  first_name?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  last_name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  balance?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  first_name?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_name?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
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
  created_at?: Maybe<Order_By>
  demographic_info?: Maybe<Order_By>
  email?: Maybe<Order_By>
  first_name?: Maybe<Order_By>
  id?: Maybe<Order_By>
  kyc_approved?: Maybe<Order_By>
  last_name?: Maybe<Order_By>
  lender_amounts_aggregate?: Maybe<Lender_Amount_Aggregate_Order_By>
  loan_requests_aggregate?: Maybe<Loan_Request_Aggregate_Order_By>
  loans_aggregate?: Maybe<Loan_Aggregate_Order_By>
  onboarded?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
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
}

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  AccountDetails = "account_details",
  /** column name */
  Balance = "balance",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DemographicInfo = "demographic_info",
  /** column name */
  Email = "email",
  /** column name */
  FirstName = "first_name",
  /** column name */
  Id = "id",
  /** column name */
  KycApproved = "kyc_approved",
  /** column name */
  LastName = "last_name",
  /** column name */
  Onboarded = "onboarded",
  /** column name */
  Phone = "phone",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserType = "user_type",
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  account_details?: Maybe<Scalars["jsonb"]>
  balance?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  email?: Maybe<Scalars["String"]>
  first_name?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  kyc_approved?: Maybe<Scalars["Boolean"]>
  last_name?: Maybe<Scalars["String"]>
  onboarded?: Maybe<Scalars["Boolean"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user_type?: Maybe<Scalars["user_t"]>
}

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: "user_stddev_fields"
  balance?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "user" */
export type User_Stddev_Order_By = {
  balance?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: "user_stddev_pop_fields"
  balance?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "user" */
export type User_Stddev_Pop_Order_By = {
  balance?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: "user_stddev_samp_fields"
  balance?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "user" */
export type User_Stddev_Samp_Order_By = {
  balance?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: "user_sum_fields"
  balance?: Maybe<Scalars["float8"]>
}

/** order by sum() on columns of table "user" */
export type User_Sum_Order_By = {
  balance?: Maybe<Order_By>
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

/** columns and relationships of "user_type" */
export type User_Type = {
  __typename?: "user_type"
  comment: Scalars["String"]
  value: Scalars["String"]
}

/** aggregated selection of "user_type" */
export type User_Type_Aggregate = {
  __typename?: "user_type_aggregate"
  aggregate?: Maybe<User_Type_Aggregate_Fields>
  nodes: Array<User_Type>
}

/** aggregate fields of "user_type" */
export type User_Type_Aggregate_Fields = {
  __typename?: "user_type_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<User_Type_Max_Fields>
  min?: Maybe<User_Type_Min_Fields>
}

/** aggregate fields of "user_type" */
export type User_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Type_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "user_type" */
export type User_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<User_Type_Max_Order_By>
  min?: Maybe<User_Type_Min_Order_By>
}

/** input type for inserting array relation for remote table "user_type" */
export type User_Type_Arr_Rel_Insert_Input = {
  data: Array<User_Type_Insert_Input>
  on_conflict?: Maybe<User_Type_On_Conflict>
}

/** Boolean expression to filter rows from the table "user_type". All fields are combined with a logical 'AND'. */
export type User_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Type_Bool_Exp>>>
  _not?: Maybe<User_Type_Bool_Exp>
  _or?: Maybe<Array<Maybe<User_Type_Bool_Exp>>>
  comment?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "user_type" */
export enum User_Type_Constraint {
  /** unique or primary key constraint */
  UserTypePkey = "user_type_pkey",
}

/** input type for inserting data into table "user_type" */
export type User_Type_Insert_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** aggregate max on columns */
export type User_Type_Max_Fields = {
  __typename?: "user_type_max_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "user_type" */
export type User_Type_Max_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** aggregate min on columns */
export type User_Type_Min_Fields = {
  __typename?: "user_type_min_fields"
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "user_type" */
export type User_Type_Min_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** response of any mutation on the table "user_type" */
export type User_Type_Mutation_Response = {
  __typename?: "user_type_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<User_Type>
}

/** input type for inserting object relation for remote table "user_type" */
export type User_Type_Obj_Rel_Insert_Input = {
  data: User_Type_Insert_Input
  on_conflict?: Maybe<User_Type_On_Conflict>
}

/** on conflict condition type for table "user_type" */
export type User_Type_On_Conflict = {
  constraint: User_Type_Constraint
  update_columns: Array<User_Type_Update_Column>
  where?: Maybe<User_Type_Bool_Exp>
}

/** ordering options when selecting data from "user_type" */
export type User_Type_Order_By = {
  comment?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: "user_type" */
export type User_Type_Pk_Columns_Input = {
  value: Scalars["String"]
}

/** select columns of table "user_type" */
export enum User_Type_Select_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** input type for updating data in table "user_type" */
export type User_Type_Set_Input = {
  comment?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

/** update columns of table "user_type" */
export enum User_Type_Update_Column {
  /** column name */
  Comment = "comment",
  /** column name */
  Value = "value",
}

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  AccountDetails = "account_details",
  /** column name */
  Balance = "balance",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DemographicInfo = "demographic_info",
  /** column name */
  Email = "email",
  /** column name */
  FirstName = "first_name",
  /** column name */
  Id = "id",
  /** column name */
  KycApproved = "kyc_approved",
  /** column name */
  LastName = "last_name",
  /** column name */
  Onboarded = "onboarded",
  /** column name */
  Phone = "phone",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserType = "user_type",
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: "user_var_pop_fields"
  balance?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "user" */
export type User_Var_Pop_Order_By = {
  balance?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: "user_var_samp_fields"
  balance?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "user" */
export type User_Var_Samp_Order_By = {
  balance?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: "user_variance_fields"
  balance?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "user" */
export type User_Variance_Order_By = {
  balance?: Maybe<Order_By>
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

export type CreateUserMutationVariables = Exact<{
  user: User_Insert_Input
}>

export type CreateUserMutation = { __typename?: "mutation_root" } & {
  insert_user_one?: Maybe<
    { __typename?: "user" } & Pick<
      User,
      | "id"
      | "user_type"
      | "last_name"
      | "created_at"
      | "email"
      | "first_name"
      | "phone"
      | "demographic_info"
      | "account_details"
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
      | "first_name"
      | "last_name"
      | "user_type"
      | "balance"
      | "kyc_approved"
      | "onboarded"
      | "demographic_info"
    > & {
        loan_requests: Array<
          { __typename?: "loan_request" } & Pick<
            Loan_Request,
            "amount" | "purpose" | "state"
          >
        >
        loans: Array<
          { __typename?: "loan" } & Pick<Loan, "state" | "principal">
        >
      }
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
      | "email"
      | "first_name"
      | "last_name"
      | "demographic_info"
      | "kyc_approved"
      | "onboarded"
      | "phone"
      | "user_type"
      | "balance"
      | "created_at"
    >
  >
}

export type ApproveKycMutationVariables = Exact<{
  userId: Scalars["uuid"]
  kycApproved: Scalars["Boolean"]
}>

export type ApproveKycMutation = { __typename?: "mutation_root" } & {
  user?: Maybe<{ __typename?: "user" } & Pick<User, "id" | "kyc_approved">>
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

export type CreateLoanRequestMutationVariables = Exact<{
  request: Loan_Request_Insert_Input
}>

export type CreateLoanRequestMutation = { __typename?: "mutation_root" } & {
  loanRequest?: Maybe<
    { __typename?: "loan_request" } & Pick<
      Loan_Request,
      "request_id" | "amount" | "purpose" | "state"
    >
  >
}

export type FundLoanRequestMutationVariables = Exact<{
  requestId: Scalars["uuid"]
  loan: Loan_Insert_Input
  lenderAmounts: Array<Lender_Amount_Insert_Input>
}>

export type FundLoanRequestMutation = { __typename?: "mutation_root" } & {
  loanRequest?: Maybe<
    { __typename?: "loan_request" } & Pick<Loan_Request, "state" | "amount">
  >
  newLoan?: Maybe<
    { __typename?: "loan" } & Pick<
      Loan,
      | "loan_id"
      | "next_payment_amount"
      | "next_payment_due_date"
      | "tenor"
      | "apr"
      | "penalty_apr"
      | "state"
    >
  >
  amountsLent?: Maybe<
    { __typename?: "lender_amount_mutation_response" } & {
      returning: Array<
        { __typename?: "lender_amount" } & Pick<
          Lender_Amount,
          "lender_id" | "amount_lent"
        >
      >
    }
  >
}

export type GetLoanRequestQueryVariables = Exact<{
  requestId: Scalars["uuid"]
}>

export type GetLoanRequestQuery = { __typename?: "query_root" } & {
  loanRequest?: Maybe<
    { __typename?: "loan_request" } & Pick<
      Loan_Request,
      "request_id" | "purpose" | "amount" | "state"
    > & {
        borrowerInfo: { __typename?: "user" } & Pick<
          User,
          "id" | "email" | "demographic_info"
        >
      }
  >
}

export type GetLoanRequestsQueryVariables = Exact<{ [key: string]: never }>

export type GetLoanRequestsQuery = { __typename?: "query_root" } & {
  loanRequests: Array<
    { __typename?: "loan_request" } & Pick<
      Loan_Request,
      "request_id" | "amount" | "state"
    > & {
        borrowerInfo: { __typename?: "user" } & Pick<
          User,
          "id" | "demographic_info"
        >
      }
  >
}

export type GetLoanQueryVariables = Exact<{
  loanId: Scalars["uuid"]
}>

export type GetLoanQuery = { __typename?: "query_root" } & {
  loan?: Maybe<
    { __typename?: "loan" } & Pick<
      Loan,
      "loan_id" | "state" | "principal_remaining"
    > & {
        repayments: Array<
          { __typename?: "repayment" } & Pick<
            Repayment,
            "date" | "repaid_principal" | "repaid_interest"
          >
        >
      }
  >
}

export type RegisterRepaymentMutationVariables = Exact<{
  loanId: Scalars["uuid"]
  repayment: Repayment_Insert_Input
  newLoanState?: Maybe<Loan_State_Enum>
  newPrincipalRemaining?: Maybe<Scalars["float8"]>
  updateLog: Update_Log_Insert_Input
}>

export type RegisterRepaymentMutation = { __typename?: "mutation_root" } & {
  loan?: Maybe<
    { __typename?: "loan" } & Pick<Loan, "state" | "principal_remaining">
  >
  repayment?: Maybe<
    { __typename?: "repayment" } & Pick<Repayment, "repayment_id">
  >
  updateLogEntry?: Maybe<
    { __typename?: "update_log" } & Pick<Update_Log, "update_id">
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
  delete_update_log?: Maybe<
    { __typename?: "update_log_mutation_response" } & Pick<
      Update_Log_Mutation_Response,
      "affected_rows"
    >
  >
  delete_loan?: Maybe<
    { __typename?: "loan_mutation_response" } & Pick<
      Loan_Mutation_Response,
      "affected_rows"
    >
  >
  delete_repayment?: Maybe<
    { __typename?: "repayment_mutation_response" } & Pick<
      Repayment_Mutation_Response,
      "affected_rows"
    >
  >
  delete_lender_amount?: Maybe<
    { __typename?: "lender_amount_mutation_response" } & Pick<
      Lender_Amount_Mutation_Response,
      "affected_rows"
    >
  >
  delete_loan_request?: Maybe<
    { __typename?: "loan_request_mutation_response" } & Pick<
      Loan_Request_Mutation_Response,
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

export const CreateUserDocument = gql`
  mutation CreateUser($user: user_insert_input!) {
    insert_user_one(
      object: $user
      on_conflict: {
        constraint: user_email_key
        update_columns: [first_name, phone, onboarded]
      }
    ) {
      id
      user_type
      last_name
      created_at
      email
      first_name
      phone
      demographic_info
      account_details
    }
  }
`
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    user {
      id
      email
      first_name
      last_name
      user_type
      balance
      kyc_approved
      onboarded
      demographic_info
      loan_requests {
        amount
        purpose
        state
      }
      loans {
        state
        principal
      }
    }
  }
`
export const GetUserByEmailDocument = gql`
  query GetUserByEmail($email: String!) {
    user(where: { email: { _eq: $email } }) {
      id
      email
      first_name
      last_name
      demographic_info
      kyc_approved
      onboarded
      phone
      user_type
      balance
      created_at
    }
  }
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
export const CreateLoanRequestDocument = gql`
  mutation CreateLoanRequest($request: loan_request_insert_input!) {
    loanRequest: insert_loan_request_one(object: $request) {
      request_id
      amount
      purpose
      state
    }
  }
`
export const FundLoanRequestDocument = gql`
  mutation FundLoanRequest(
    $requestId: uuid!
    $loan: loan_insert_input!
    $lenderAmounts: [lender_amount_insert_input!]!
  ) {
    loanRequest: update_loan_request_by_pk(
      pk_columns: { request_id: $requestId }
      _set: { state: FULFILLED }
    ) {
      state
      amount
    }
    newLoan: insert_loan_one(object: $loan) {
      loan_id
      next_payment_amount
      next_payment_due_date
      tenor
      apr
      penalty_apr
      state
    }
    amountsLent: insert_lender_amount(objects: $lenderAmounts) {
      returning {
        lender_id
        amount_lent
      }
    }
  }
`
export const GetLoanRequestDocument = gql`
  query GetLoanRequest($requestId: uuid!) {
    loanRequest: loan_request_by_pk(request_id: $requestId) {
      request_id
      purpose
      amount
      state
      borrowerInfo {
        id
        email
        demographic_info
      }
    }
  }
`
export const GetLoanRequestsDocument = gql`
  query GetLoanRequests {
    loanRequests: loan_request {
      request_id
      amount
      state
      borrowerInfo {
        id
        demographic_info
      }
    }
  }
`
export const GetLoanDocument = gql`
  query GetLoan($loanId: uuid!) {
    loan: loan_by_pk(loan_id: $loanId) {
      loan_id
      state
      principal_remaining
      repayments {
        date
        repaid_principal
        repaid_interest
      }
    }
  }
`
export const RegisterRepaymentDocument = gql`
  mutation RegisterRepayment(
    $loanId: uuid!
    $repayment: repayment_insert_input!
    $newLoanState: loan_state_enum
    $newPrincipalRemaining: float8
    $updateLog: update_log_insert_input!
  ) {
    loan: update_loan_by_pk(
      pk_columns: { loan_id: $loanId }
      _set: {
        state: $newLoanState
        principal_remaining: $newPrincipalRemaining
      }
    ) {
      state
      principal_remaining
    }
    repayment: insert_repayment_one(object: $repayment) {
      repayment_id
    }
    updateLogEntry: insert_update_log_one(object: $updateLog) {
      update_id
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
    delete_update_log(where: {}) {
      affected_rows
    }
    delete_loan(where: {}) {
      affected_rows
    }
    delete_repayment(where: {}) {
      affected_rows
    }
    delete_lender_amount(where: {}) {
      affected_rows
    }
    delete_loan_request(where: {}) {
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
    FundLoanRequest(
      variables: FundLoanRequestMutationVariables
    ): Promise<FundLoanRequestMutation> {
      return withWrapper(() =>
        client.request<FundLoanRequestMutation>(
          print(FundLoanRequestDocument),
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
    GetLoan(variables: GetLoanQueryVariables): Promise<GetLoanQuery> {
      return withWrapper(() =>
        client.request<GetLoanQuery>(print(GetLoanDocument), variables)
      )
    },
    RegisterRepayment(
      variables: RegisterRepaymentMutationVariables
    ): Promise<RegisterRepaymentMutation> {
      return withWrapper(() =>
        client.request<RegisterRepaymentMutation>(
          print(RegisterRepaymentDocument),
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
