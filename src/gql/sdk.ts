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
  edge_status: any
  float8: any
  jsonb: any
  loan_request_status: any
  numeric: any
  timestamptz: any
  timetz: any
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

/** expression to compare columns of type edge_status. All fields are combined with logical 'AND'. */
export type Edge_Status_Comparison_Exp = {
  _eq?: Maybe<Scalars["edge_status"]>
  _gt?: Maybe<Scalars["edge_status"]>
  _gte?: Maybe<Scalars["edge_status"]>
  _in?: Maybe<Array<Scalars["edge_status"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["edge_status"]>
  _lte?: Maybe<Scalars["edge_status"]>
  _neq?: Maybe<Scalars["edge_status"]>
  _nin?: Maybe<Array<Scalars["edge_status"]>>
}

/** columns and relationships of "edges" */
export type Edges = {
  __typename?: "edges"
  borrower_id?: Maybe<Scalars["uuid"]>
  edge_id: Scalars["uuid"]
  /** An object relationship */
  from_user?: Maybe<User>
  lender_id?: Maybe<Scalars["uuid"]>
  other_user_email?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["edge_status"]>
  /** An object relationship */
  to_user?: Maybe<User>
  trust_amount?: Maybe<Scalars["Int"]>
  /** An object relationship */
  userByBorrowerId?: Maybe<User>
  /** An object relationship */
  userByLenderId?: Maybe<User>
}

/** aggregated selection of "edges" */
export type Edges_Aggregate = {
  __typename?: "edges_aggregate"
  aggregate?: Maybe<Edges_Aggregate_Fields>
  nodes: Array<Edges>
}

/** aggregate fields of "edges" */
export type Edges_Aggregate_Fields = {
  __typename?: "edges_aggregate_fields"
  avg?: Maybe<Edges_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Edges_Max_Fields>
  min?: Maybe<Edges_Min_Fields>
  stddev?: Maybe<Edges_Stddev_Fields>
  stddev_pop?: Maybe<Edges_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Edges_Stddev_Samp_Fields>
  sum?: Maybe<Edges_Sum_Fields>
  var_pop?: Maybe<Edges_Var_Pop_Fields>
  var_samp?: Maybe<Edges_Var_Samp_Fields>
  variance?: Maybe<Edges_Variance_Fields>
}

/** aggregate fields of "edges" */
export type Edges_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Edges_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "edges" */
export type Edges_Aggregate_Order_By = {
  avg?: Maybe<Edges_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Edges_Max_Order_By>
  min?: Maybe<Edges_Min_Order_By>
  stddev?: Maybe<Edges_Stddev_Order_By>
  stddev_pop?: Maybe<Edges_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Edges_Stddev_Samp_Order_By>
  sum?: Maybe<Edges_Sum_Order_By>
  var_pop?: Maybe<Edges_Var_Pop_Order_By>
  var_samp?: Maybe<Edges_Var_Samp_Order_By>
  variance?: Maybe<Edges_Variance_Order_By>
}

/** input type for inserting array relation for remote table "edges" */
export type Edges_Arr_Rel_Insert_Input = {
  data: Array<Edges_Insert_Input>
  on_conflict?: Maybe<Edges_On_Conflict>
}

/** aggregate avg on columns */
export type Edges_Avg_Fields = {
  __typename?: "edges_avg_fields"
  trust_amount?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "edges" */
export type Edges_Avg_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "edges". All fields are combined with a logical 'AND'. */
export type Edges_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Edges_Bool_Exp>>>
  _not?: Maybe<Edges_Bool_Exp>
  _or?: Maybe<Array<Maybe<Edges_Bool_Exp>>>
  borrower_id?: Maybe<Uuid_Comparison_Exp>
  edge_id?: Maybe<Uuid_Comparison_Exp>
  from_user?: Maybe<User_Bool_Exp>
  lender_id?: Maybe<Uuid_Comparison_Exp>
  other_user_email?: Maybe<String_Comparison_Exp>
  status?: Maybe<Edge_Status_Comparison_Exp>
  to_user?: Maybe<User_Bool_Exp>
  trust_amount?: Maybe<Int_Comparison_Exp>
  userByBorrowerId?: Maybe<User_Bool_Exp>
  userByLenderId?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "edges" */
export enum Edges_Constraint {
  /** unique or primary key constraint */
  EdgesPkey = "edges_pkey",
}

/** input type for incrementing integer column in table "edges" */
export type Edges_Inc_Input = {
  trust_amount?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "edges" */
export type Edges_Insert_Input = {
  borrower_id?: Maybe<Scalars["uuid"]>
  edge_id?: Maybe<Scalars["uuid"]>
  from_user?: Maybe<User_Obj_Rel_Insert_Input>
  lender_id?: Maybe<Scalars["uuid"]>
  other_user_email?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["edge_status"]>
  to_user?: Maybe<User_Obj_Rel_Insert_Input>
  trust_amount?: Maybe<Scalars["Int"]>
  userByBorrowerId?: Maybe<User_Obj_Rel_Insert_Input>
  userByLenderId?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Edges_Max_Fields = {
  __typename?: "edges_max_fields"
  borrower_id?: Maybe<Scalars["uuid"]>
  edge_id?: Maybe<Scalars["uuid"]>
  lender_id?: Maybe<Scalars["uuid"]>
  other_user_email?: Maybe<Scalars["String"]>
  trust_amount?: Maybe<Scalars["Int"]>
}

/** order by max() on columns of table "edges" */
export type Edges_Max_Order_By = {
  borrower_id?: Maybe<Order_By>
  edge_id?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  other_user_email?: Maybe<Order_By>
  trust_amount?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Edges_Min_Fields = {
  __typename?: "edges_min_fields"
  borrower_id?: Maybe<Scalars["uuid"]>
  edge_id?: Maybe<Scalars["uuid"]>
  lender_id?: Maybe<Scalars["uuid"]>
  other_user_email?: Maybe<Scalars["String"]>
  trust_amount?: Maybe<Scalars["Int"]>
}

/** order by min() on columns of table "edges" */
export type Edges_Min_Order_By = {
  borrower_id?: Maybe<Order_By>
  edge_id?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  other_user_email?: Maybe<Order_By>
  trust_amount?: Maybe<Order_By>
}

/** response of any mutation on the table "edges" */
export type Edges_Mutation_Response = {
  __typename?: "edges_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Edges>
}

/** input type for inserting object relation for remote table "edges" */
export type Edges_Obj_Rel_Insert_Input = {
  data: Edges_Insert_Input
  on_conflict?: Maybe<Edges_On_Conflict>
}

/** on conflict condition type for table "edges" */
export type Edges_On_Conflict = {
  constraint: Edges_Constraint
  update_columns: Array<Edges_Update_Column>
  where?: Maybe<Edges_Bool_Exp>
}

/** ordering options when selecting data from "edges" */
export type Edges_Order_By = {
  borrower_id?: Maybe<Order_By>
  edge_id?: Maybe<Order_By>
  from_user?: Maybe<User_Order_By>
  lender_id?: Maybe<Order_By>
  other_user_email?: Maybe<Order_By>
  status?: Maybe<Order_By>
  to_user?: Maybe<User_Order_By>
  trust_amount?: Maybe<Order_By>
  userByBorrowerId?: Maybe<User_Order_By>
  userByLenderId?: Maybe<User_Order_By>
}

/** primary key columns input for table: "edges" */
export type Edges_Pk_Columns_Input = {
  edge_id: Scalars["uuid"]
}

/** select columns of table "edges" */
export enum Edges_Select_Column {
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  EdgeId = "edge_id",
  /** column name */
  LenderId = "lender_id",
  /** column name */
  OtherUserEmail = "other_user_email",
  /** column name */
  Status = "status",
  /** column name */
  TrustAmount = "trust_amount",
}

/** input type for updating data in table "edges" */
export type Edges_Set_Input = {
  borrower_id?: Maybe<Scalars["uuid"]>
  edge_id?: Maybe<Scalars["uuid"]>
  lender_id?: Maybe<Scalars["uuid"]>
  other_user_email?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["edge_status"]>
  trust_amount?: Maybe<Scalars["Int"]>
}

/** aggregate stddev on columns */
export type Edges_Stddev_Fields = {
  __typename?: "edges_stddev_fields"
  trust_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "edges" */
export type Edges_Stddev_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Edges_Stddev_Pop_Fields = {
  __typename?: "edges_stddev_pop_fields"
  trust_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "edges" */
export type Edges_Stddev_Pop_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Edges_Stddev_Samp_Fields = {
  __typename?: "edges_stddev_samp_fields"
  trust_amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "edges" */
export type Edges_Stddev_Samp_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Edges_Sum_Fields = {
  __typename?: "edges_sum_fields"
  trust_amount?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "edges" */
export type Edges_Sum_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** update columns of table "edges" */
export enum Edges_Update_Column {
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  EdgeId = "edge_id",
  /** column name */
  LenderId = "lender_id",
  /** column name */
  OtherUserEmail = "other_user_email",
  /** column name */
  Status = "status",
  /** column name */
  TrustAmount = "trust_amount",
}

/** aggregate var_pop on columns */
export type Edges_Var_Pop_Fields = {
  __typename?: "edges_var_pop_fields"
  trust_amount?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "edges" */
export type Edges_Var_Pop_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Edges_Var_Samp_Fields = {
  __typename?: "edges_var_samp_fields"
  trust_amount?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "edges" */
export type Edges_Var_Samp_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Edges_Variance_Fields = {
  __typename?: "edges_variance_fields"
  trust_amount?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "edges" */
export type Edges_Variance_Order_By = {
  trust_amount?: Maybe<Order_By>
}

/** columns and relationships of "encumbrance_participants" */
export type Encumbrance_Participants = {
  __typename?: "encumbrance_participants"
  /** An object relationship */
  encumbrance: Encumbrances
  encumbrance_id: Scalars["uuid"]
  percentage: Scalars["numeric"]
  recipient_id: Scalars["uuid"]
}

/** aggregated selection of "encumbrance_participants" */
export type Encumbrance_Participants_Aggregate = {
  __typename?: "encumbrance_participants_aggregate"
  aggregate?: Maybe<Encumbrance_Participants_Aggregate_Fields>
  nodes: Array<Encumbrance_Participants>
}

/** aggregate fields of "encumbrance_participants" */
export type Encumbrance_Participants_Aggregate_Fields = {
  __typename?: "encumbrance_participants_aggregate_fields"
  avg?: Maybe<Encumbrance_Participants_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Encumbrance_Participants_Max_Fields>
  min?: Maybe<Encumbrance_Participants_Min_Fields>
  stddev?: Maybe<Encumbrance_Participants_Stddev_Fields>
  stddev_pop?: Maybe<Encumbrance_Participants_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Encumbrance_Participants_Stddev_Samp_Fields>
  sum?: Maybe<Encumbrance_Participants_Sum_Fields>
  var_pop?: Maybe<Encumbrance_Participants_Var_Pop_Fields>
  var_samp?: Maybe<Encumbrance_Participants_Var_Samp_Fields>
  variance?: Maybe<Encumbrance_Participants_Variance_Fields>
}

/** aggregate fields of "encumbrance_participants" */
export type Encumbrance_Participants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Encumbrance_Participants_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "encumbrance_participants" */
export type Encumbrance_Participants_Aggregate_Order_By = {
  avg?: Maybe<Encumbrance_Participants_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Encumbrance_Participants_Max_Order_By>
  min?: Maybe<Encumbrance_Participants_Min_Order_By>
  stddev?: Maybe<Encumbrance_Participants_Stddev_Order_By>
  stddev_pop?: Maybe<Encumbrance_Participants_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Encumbrance_Participants_Stddev_Samp_Order_By>
  sum?: Maybe<Encumbrance_Participants_Sum_Order_By>
  var_pop?: Maybe<Encumbrance_Participants_Var_Pop_Order_By>
  var_samp?: Maybe<Encumbrance_Participants_Var_Samp_Order_By>
  variance?: Maybe<Encumbrance_Participants_Variance_Order_By>
}

/** input type for inserting array relation for remote table "encumbrance_participants" */
export type Encumbrance_Participants_Arr_Rel_Insert_Input = {
  data: Array<Encumbrance_Participants_Insert_Input>
  on_conflict?: Maybe<Encumbrance_Participants_On_Conflict>
}

/** aggregate avg on columns */
export type Encumbrance_Participants_Avg_Fields = {
  __typename?: "encumbrance_participants_avg_fields"
  percentage?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Avg_Order_By = {
  percentage?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "encumbrance_participants". All fields are combined with a logical 'AND'. */
export type Encumbrance_Participants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Encumbrance_Participants_Bool_Exp>>>
  _not?: Maybe<Encumbrance_Participants_Bool_Exp>
  _or?: Maybe<Array<Maybe<Encumbrance_Participants_Bool_Exp>>>
  encumbrance?: Maybe<Encumbrances_Bool_Exp>
  encumbrance_id?: Maybe<Uuid_Comparison_Exp>
  percentage?: Maybe<Numeric_Comparison_Exp>
  recipient_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "encumbrance_participants" */
export enum Encumbrance_Participants_Constraint {
  /** unique or primary key constraint */
  GuaranteeParticipantsPkey = "guarantee_participants_pkey",
}

/** input type for incrementing integer column in table "encumbrance_participants" */
export type Encumbrance_Participants_Inc_Input = {
  percentage?: Maybe<Scalars["numeric"]>
}

/** input type for inserting data into table "encumbrance_participants" */
export type Encumbrance_Participants_Insert_Input = {
  encumbrance?: Maybe<Encumbrances_Obj_Rel_Insert_Input>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  percentage?: Maybe<Scalars["numeric"]>
  recipient_id?: Maybe<Scalars["uuid"]>
}

/** aggregate max on columns */
export type Encumbrance_Participants_Max_Fields = {
  __typename?: "encumbrance_participants_max_fields"
  encumbrance_id?: Maybe<Scalars["uuid"]>
  percentage?: Maybe<Scalars["numeric"]>
  recipient_id?: Maybe<Scalars["uuid"]>
}

/** order by max() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Max_Order_By = {
  encumbrance_id?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
  recipient_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Encumbrance_Participants_Min_Fields = {
  __typename?: "encumbrance_participants_min_fields"
  encumbrance_id?: Maybe<Scalars["uuid"]>
  percentage?: Maybe<Scalars["numeric"]>
  recipient_id?: Maybe<Scalars["uuid"]>
}

/** order by min() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Min_Order_By = {
  encumbrance_id?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
  recipient_id?: Maybe<Order_By>
}

/** response of any mutation on the table "encumbrance_participants" */
export type Encumbrance_Participants_Mutation_Response = {
  __typename?: "encumbrance_participants_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Encumbrance_Participants>
}

/** input type for inserting object relation for remote table "encumbrance_participants" */
export type Encumbrance_Participants_Obj_Rel_Insert_Input = {
  data: Encumbrance_Participants_Insert_Input
  on_conflict?: Maybe<Encumbrance_Participants_On_Conflict>
}

/** on conflict condition type for table "encumbrance_participants" */
export type Encumbrance_Participants_On_Conflict = {
  constraint: Encumbrance_Participants_Constraint
  update_columns: Array<Encumbrance_Participants_Update_Column>
  where?: Maybe<Encumbrance_Participants_Bool_Exp>
}

/** ordering options when selecting data from "encumbrance_participants" */
export type Encumbrance_Participants_Order_By = {
  encumbrance?: Maybe<Encumbrances_Order_By>
  encumbrance_id?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
  recipient_id?: Maybe<Order_By>
}

/** primary key columns input for table: "encumbrance_participants" */
export type Encumbrance_Participants_Pk_Columns_Input = {
  encumbrance_id: Scalars["uuid"]
  recipient_id: Scalars["uuid"]
}

/** select columns of table "encumbrance_participants" */
export enum Encumbrance_Participants_Select_Column {
  /** column name */
  EncumbranceId = "encumbrance_id",
  /** column name */
  Percentage = "percentage",
  /** column name */
  RecipientId = "recipient_id",
}

/** input type for updating data in table "encumbrance_participants" */
export type Encumbrance_Participants_Set_Input = {
  encumbrance_id?: Maybe<Scalars["uuid"]>
  percentage?: Maybe<Scalars["numeric"]>
  recipient_id?: Maybe<Scalars["uuid"]>
}

/** aggregate stddev on columns */
export type Encumbrance_Participants_Stddev_Fields = {
  __typename?: "encumbrance_participants_stddev_fields"
  percentage?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Stddev_Order_By = {
  percentage?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Encumbrance_Participants_Stddev_Pop_Fields = {
  __typename?: "encumbrance_participants_stddev_pop_fields"
  percentage?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Stddev_Pop_Order_By = {
  percentage?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Encumbrance_Participants_Stddev_Samp_Fields = {
  __typename?: "encumbrance_participants_stddev_samp_fields"
  percentage?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Stddev_Samp_Order_By = {
  percentage?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Encumbrance_Participants_Sum_Fields = {
  __typename?: "encumbrance_participants_sum_fields"
  percentage?: Maybe<Scalars["numeric"]>
}

/** order by sum() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Sum_Order_By = {
  percentage?: Maybe<Order_By>
}

/** update columns of table "encumbrance_participants" */
export enum Encumbrance_Participants_Update_Column {
  /** column name */
  EncumbranceId = "encumbrance_id",
  /** column name */
  Percentage = "percentage",
  /** column name */
  RecipientId = "recipient_id",
}

/** aggregate var_pop on columns */
export type Encumbrance_Participants_Var_Pop_Fields = {
  __typename?: "encumbrance_participants_var_pop_fields"
  percentage?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Var_Pop_Order_By = {
  percentage?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Encumbrance_Participants_Var_Samp_Fields = {
  __typename?: "encumbrance_participants_var_samp_fields"
  percentage?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Var_Samp_Order_By = {
  percentage?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Encumbrance_Participants_Variance_Fields = {
  __typename?: "encumbrance_participants_variance_fields"
  percentage?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "encumbrance_participants" */
export type Encumbrance_Participants_Variance_Order_By = {
  percentage?: Maybe<Order_By>
}

/** columns and relationships of "encumbrances" */
export type Encumbrances = {
  __typename?: "encumbrances"
  amount_paid: Scalars["numeric"]
  amount_remain: Scalars["numeric"]
  amount_total: Scalars["numeric"]
  created_at: Scalars["timestamptz"]
  due_date: Scalars["date"]
  encumbered_asset_type: Scalars["String"]
  encumbrance_id: Scalars["uuid"]
  /** An array relationship */
  encumbrance_participants: Array<Encumbrance_Participants>
  /** An aggregated array relationship */
  encumbrance_participants_aggregate: Encumbrance_Participants_Aggregate
  expected_dissolve_amount: Scalars["numeric"]
  guarantor_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
  /** An object relationship */
  loan_request: Loan_Requests
  pay_frequency: Scalars["Int"]
  status: Scalars["String"]
  updated_at: Scalars["timestamptz"]
  /** An object relationship */
  user: User
}

/** columns and relationships of "encumbrances" */
export type EncumbrancesEncumbrance_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Encumbrance_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrance_Participants_Order_By>>
  where?: Maybe<Encumbrance_Participants_Bool_Exp>
}

/** columns and relationships of "encumbrances" */
export type EncumbrancesEncumbrance_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Encumbrance_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrance_Participants_Order_By>>
  where?: Maybe<Encumbrance_Participants_Bool_Exp>
}

/** aggregated selection of "encumbrances" */
export type Encumbrances_Aggregate = {
  __typename?: "encumbrances_aggregate"
  aggregate?: Maybe<Encumbrances_Aggregate_Fields>
  nodes: Array<Encumbrances>
}

/** aggregate fields of "encumbrances" */
export type Encumbrances_Aggregate_Fields = {
  __typename?: "encumbrances_aggregate_fields"
  avg?: Maybe<Encumbrances_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Encumbrances_Max_Fields>
  min?: Maybe<Encumbrances_Min_Fields>
  stddev?: Maybe<Encumbrances_Stddev_Fields>
  stddev_pop?: Maybe<Encumbrances_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Encumbrances_Stddev_Samp_Fields>
  sum?: Maybe<Encumbrances_Sum_Fields>
  var_pop?: Maybe<Encumbrances_Var_Pop_Fields>
  var_samp?: Maybe<Encumbrances_Var_Samp_Fields>
  variance?: Maybe<Encumbrances_Variance_Fields>
}

/** aggregate fields of "encumbrances" */
export type Encumbrances_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Encumbrances_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "encumbrances" */
export type Encumbrances_Aggregate_Order_By = {
  avg?: Maybe<Encumbrances_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Encumbrances_Max_Order_By>
  min?: Maybe<Encumbrances_Min_Order_By>
  stddev?: Maybe<Encumbrances_Stddev_Order_By>
  stddev_pop?: Maybe<Encumbrances_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Encumbrances_Stddev_Samp_Order_By>
  sum?: Maybe<Encumbrances_Sum_Order_By>
  var_pop?: Maybe<Encumbrances_Var_Pop_Order_By>
  var_samp?: Maybe<Encumbrances_Var_Samp_Order_By>
  variance?: Maybe<Encumbrances_Variance_Order_By>
}

/** input type for inserting array relation for remote table "encumbrances" */
export type Encumbrances_Arr_Rel_Insert_Input = {
  data: Array<Encumbrances_Insert_Input>
  on_conflict?: Maybe<Encumbrances_On_Conflict>
}

/** aggregate avg on columns */
export type Encumbrances_Avg_Fields = {
  __typename?: "encumbrances_avg_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  expected_dissolve_amount?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "encumbrances" */
export type Encumbrances_Avg_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "encumbrances". All fields are combined with a logical 'AND'. */
export type Encumbrances_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Encumbrances_Bool_Exp>>>
  _not?: Maybe<Encumbrances_Bool_Exp>
  _or?: Maybe<Array<Maybe<Encumbrances_Bool_Exp>>>
  amount_paid?: Maybe<Numeric_Comparison_Exp>
  amount_remain?: Maybe<Numeric_Comparison_Exp>
  amount_total?: Maybe<Numeric_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  due_date?: Maybe<Date_Comparison_Exp>
  encumbered_asset_type?: Maybe<String_Comparison_Exp>
  encumbrance_id?: Maybe<Uuid_Comparison_Exp>
  encumbrance_participants?: Maybe<Encumbrance_Participants_Bool_Exp>
  expected_dissolve_amount?: Maybe<Numeric_Comparison_Exp>
  guarantor_id?: Maybe<Uuid_Comparison_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  loan_request?: Maybe<Loan_Requests_Bool_Exp>
  pay_frequency?: Maybe<Int_Comparison_Exp>
  status?: Maybe<String_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "encumbrances" */
export enum Encumbrances_Constraint {
  /** unique or primary key constraint */
  EncumbrancesPkey = "encumbrances_pkey",
}

/** input type for incrementing integer column in table "encumbrances" */
export type Encumbrances_Inc_Input = {
  amount_paid?: Maybe<Scalars["numeric"]>
  amount_remain?: Maybe<Scalars["numeric"]>
  amount_total?: Maybe<Scalars["numeric"]>
  expected_dissolve_amount?: Maybe<Scalars["numeric"]>
  pay_frequency?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "encumbrances" */
export type Encumbrances_Insert_Input = {
  amount_paid?: Maybe<Scalars["numeric"]>
  amount_remain?: Maybe<Scalars["numeric"]>
  amount_total?: Maybe<Scalars["numeric"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbered_asset_type?: Maybe<Scalars["String"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  encumbrance_participants?: Maybe<
    Encumbrance_Participants_Arr_Rel_Insert_Input
  >
  expected_dissolve_amount?: Maybe<Scalars["numeric"]>
  guarantor_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Loan_Requests_Obj_Rel_Insert_Input>
  pay_frequency?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Encumbrances_Max_Fields = {
  __typename?: "encumbrances_max_fields"
  amount_paid?: Maybe<Scalars["numeric"]>
  amount_remain?: Maybe<Scalars["numeric"]>
  amount_total?: Maybe<Scalars["numeric"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbered_asset_type?: Maybe<Scalars["String"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  expected_dissolve_amount?: Maybe<Scalars["numeric"]>
  guarantor_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by max() on columns of table "encumbrances" */
export type Encumbrances_Max_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  encumbered_asset_type?: Maybe<Order_By>
  encumbrance_id?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  guarantor_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Encumbrances_Min_Fields = {
  __typename?: "encumbrances_min_fields"
  amount_paid?: Maybe<Scalars["numeric"]>
  amount_remain?: Maybe<Scalars["numeric"]>
  amount_total?: Maybe<Scalars["numeric"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbered_asset_type?: Maybe<Scalars["String"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  expected_dissolve_amount?: Maybe<Scalars["numeric"]>
  guarantor_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by min() on columns of table "encumbrances" */
export type Encumbrances_Min_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  encumbered_asset_type?: Maybe<Order_By>
  encumbrance_id?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  guarantor_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** response of any mutation on the table "encumbrances" */
export type Encumbrances_Mutation_Response = {
  __typename?: "encumbrances_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Encumbrances>
}

/** input type for inserting object relation for remote table "encumbrances" */
export type Encumbrances_Obj_Rel_Insert_Input = {
  data: Encumbrances_Insert_Input
  on_conflict?: Maybe<Encumbrances_On_Conflict>
}

/** on conflict condition type for table "encumbrances" */
export type Encumbrances_On_Conflict = {
  constraint: Encumbrances_Constraint
  update_columns: Array<Encumbrances_Update_Column>
  where?: Maybe<Encumbrances_Bool_Exp>
}

/** ordering options when selecting data from "encumbrances" */
export type Encumbrances_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  encumbered_asset_type?: Maybe<Order_By>
  encumbrance_id?: Maybe<Order_By>
  encumbrance_participants_aggregate?: Maybe<
    Encumbrance_Participants_Aggregate_Order_By
  >
  expected_dissolve_amount?: Maybe<Order_By>
  guarantor_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  loan_request?: Maybe<Loan_Requests_Order_By>
  pay_frequency?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user?: Maybe<User_Order_By>
}

/** primary key columns input for table: "encumbrances" */
export type Encumbrances_Pk_Columns_Input = {
  encumbrance_id: Scalars["uuid"]
}

/** select columns of table "encumbrances" */
export enum Encumbrances_Select_Column {
  /** column name */
  AmountPaid = "amount_paid",
  /** column name */
  AmountRemain = "amount_remain",
  /** column name */
  AmountTotal = "amount_total",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DueDate = "due_date",
  /** column name */
  EncumberedAssetType = "encumbered_asset_type",
  /** column name */
  EncumbranceId = "encumbrance_id",
  /** column name */
  ExpectedDissolveAmount = "expected_dissolve_amount",
  /** column name */
  GuarantorId = "guarantor_id",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  PayFrequency = "pay_frequency",
  /** column name */
  Status = "status",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "encumbrances" */
export type Encumbrances_Set_Input = {
  amount_paid?: Maybe<Scalars["numeric"]>
  amount_remain?: Maybe<Scalars["numeric"]>
  amount_total?: Maybe<Scalars["numeric"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbered_asset_type?: Maybe<Scalars["String"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  expected_dissolve_amount?: Maybe<Scalars["numeric"]>
  guarantor_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** aggregate stddev on columns */
export type Encumbrances_Stddev_Fields = {
  __typename?: "encumbrances_stddev_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  expected_dissolve_amount?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "encumbrances" */
export type Encumbrances_Stddev_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Encumbrances_Stddev_Pop_Fields = {
  __typename?: "encumbrances_stddev_pop_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  expected_dissolve_amount?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "encumbrances" */
export type Encumbrances_Stddev_Pop_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Encumbrances_Stddev_Samp_Fields = {
  __typename?: "encumbrances_stddev_samp_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  expected_dissolve_amount?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "encumbrances" */
export type Encumbrances_Stddev_Samp_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Encumbrances_Sum_Fields = {
  __typename?: "encumbrances_sum_fields"
  amount_paid?: Maybe<Scalars["numeric"]>
  amount_remain?: Maybe<Scalars["numeric"]>
  amount_total?: Maybe<Scalars["numeric"]>
  expected_dissolve_amount?: Maybe<Scalars["numeric"]>
  pay_frequency?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "encumbrances" */
export type Encumbrances_Sum_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
}

/** update columns of table "encumbrances" */
export enum Encumbrances_Update_Column {
  /** column name */
  AmountPaid = "amount_paid",
  /** column name */
  AmountRemain = "amount_remain",
  /** column name */
  AmountTotal = "amount_total",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DueDate = "due_date",
  /** column name */
  EncumberedAssetType = "encumbered_asset_type",
  /** column name */
  EncumbranceId = "encumbrance_id",
  /** column name */
  ExpectedDissolveAmount = "expected_dissolve_amount",
  /** column name */
  GuarantorId = "guarantor_id",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  PayFrequency = "pay_frequency",
  /** column name */
  Status = "status",
  /** column name */
  UpdatedAt = "updated_at",
}

/** aggregate var_pop on columns */
export type Encumbrances_Var_Pop_Fields = {
  __typename?: "encumbrances_var_pop_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  expected_dissolve_amount?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "encumbrances" */
export type Encumbrances_Var_Pop_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Encumbrances_Var_Samp_Fields = {
  __typename?: "encumbrances_var_samp_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  expected_dissolve_amount?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "encumbrances" */
export type Encumbrances_Var_Samp_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Encumbrances_Variance_Fields = {
  __typename?: "encumbrances_variance_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  expected_dissolve_amount?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "encumbrances" */
export type Encumbrances_Variance_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  expected_dissolve_amount?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
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
  lender_amount: Scalars["Int"]
  lender_id: Scalars["uuid"]
  loan_id: Scalars["uuid"]
  /** An object relationship */
  loan_request: Loan_Requests
  percentage?: Maybe<Scalars["Int"]>
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
  percentage?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "loan_participants" */
export type Loan_Participants_Avg_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "loan_participants". All fields are combined with a logical 'AND'. */
export type Loan_Participants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Participants_Bool_Exp>>>
  _not?: Maybe<Loan_Participants_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Participants_Bool_Exp>>>
  lender_amount?: Maybe<Int_Comparison_Exp>
  lender_id?: Maybe<Uuid_Comparison_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  loan_request?: Maybe<Loan_Requests_Bool_Exp>
  percentage?: Maybe<Int_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "loan_participants" */
export enum Loan_Participants_Constraint {
  /** unique or primary key constraint */
  LoanParticipantsPkey = "loan_participants_pkey",
}

/** input type for incrementing integer column in table "loan_participants" */
export type Loan_Participants_Inc_Input = {
  lender_amount?: Maybe<Scalars["Int"]>
  percentage?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "loan_participants" */
export type Loan_Participants_Insert_Input = {
  lender_amount?: Maybe<Scalars["Int"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Loan_Requests_Obj_Rel_Insert_Input>
  percentage?: Maybe<Scalars["Int"]>
  user?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Loan_Participants_Max_Fields = {
  __typename?: "loan_participants_max_fields"
  lender_amount?: Maybe<Scalars["Int"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  percentage?: Maybe<Scalars["Int"]>
}

/** order by max() on columns of table "loan_participants" */
export type Loan_Participants_Max_Order_By = {
  lender_amount?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_Participants_Min_Fields = {
  __typename?: "loan_participants_min_fields"
  lender_amount?: Maybe<Scalars["Int"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  percentage?: Maybe<Scalars["Int"]>
}

/** order by min() on columns of table "loan_participants" */
export type Loan_Participants_Min_Order_By = {
  lender_amount?: Maybe<Order_By>
  lender_id?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
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
  percentage?: Maybe<Order_By>
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
  /** column name */
  Percentage = "percentage",
}

/** input type for updating data in table "loan_participants" */
export type Loan_Participants_Set_Input = {
  lender_amount?: Maybe<Scalars["Int"]>
  lender_id?: Maybe<Scalars["uuid"]>
  loan_id?: Maybe<Scalars["uuid"]>
  percentage?: Maybe<Scalars["Int"]>
}

/** aggregate stddev on columns */
export type Loan_Participants_Stddev_Fields = {
  __typename?: "loan_participants_stddev_fields"
  lender_amount?: Maybe<Scalars["Float"]>
  percentage?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "loan_participants" */
export type Loan_Participants_Stddev_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Loan_Participants_Stddev_Pop_Fields = {
  __typename?: "loan_participants_stddev_pop_fields"
  lender_amount?: Maybe<Scalars["Float"]>
  percentage?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "loan_participants" */
export type Loan_Participants_Stddev_Pop_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Loan_Participants_Stddev_Samp_Fields = {
  __typename?: "loan_participants_stddev_samp_fields"
  lender_amount?: Maybe<Scalars["Float"]>
  percentage?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "loan_participants" */
export type Loan_Participants_Stddev_Samp_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Loan_Participants_Sum_Fields = {
  __typename?: "loan_participants_sum_fields"
  lender_amount?: Maybe<Scalars["Int"]>
  percentage?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "loan_participants" */
export type Loan_Participants_Sum_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** update columns of table "loan_participants" */
export enum Loan_Participants_Update_Column {
  /** column name */
  LenderAmount = "lender_amount",
  /** column name */
  LenderId = "lender_id",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  Percentage = "percentage",
}

/** aggregate var_pop on columns */
export type Loan_Participants_Var_Pop_Fields = {
  __typename?: "loan_participants_var_pop_fields"
  lender_amount?: Maybe<Scalars["Float"]>
  percentage?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "loan_participants" */
export type Loan_Participants_Var_Pop_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Loan_Participants_Var_Samp_Fields = {
  __typename?: "loan_participants_var_samp_fields"
  lender_amount?: Maybe<Scalars["Float"]>
  percentage?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "loan_participants" */
export type Loan_Participants_Var_Samp_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Loan_Participants_Variance_Fields = {
  __typename?: "loan_participants_variance_fields"
  lender_amount?: Maybe<Scalars["Float"]>
  percentage?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "loan_participants" */
export type Loan_Participants_Variance_Order_By = {
  lender_amount?: Maybe<Order_By>
  percentage?: Maybe<Order_By>
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
  borrower_id: Scalars["uuid"]
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at: Scalars["timestamptz"]
  /** An array relationship */
  encumbrances: Array<Encumbrances>
  /** An aggregated array relationship */
  encumbrances_aggregate: Encumbrances_Aggregate
  /** An array relationship */
  loan_participants: Array<Loan_Participants>
  /** An aggregated array relationship */
  loan_participants_aggregate: Loan_Participants_Aggregate
  /** An array relationship */
  loan_risks: Array<Loan_Risk>
  /** An aggregated array relationship */
  loan_risks_aggregate: Loan_Risk_Aggregate
  /** An array relationship */
  payables: Array<Payables>
  /** An aggregated array relationship */
  payables_aggregate: Payables_Aggregate
  payback_status?: Maybe<Scalars["String"]>
  purpose?: Maybe<Scalars["String"]>
  /** An array relationship */
  receivables: Array<Receivables>
  /** An aggregated array relationship */
  receivables_aggregate: Receivables_Aggregate
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
export type Loan_RequestsEncumbrancesArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsEncumbrances_AggregateArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
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
export type Loan_RequestsLoan_RisksArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsLoan_Risks_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsPayablesArgs = {
  distinct_on?: Maybe<Array<Payables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Payables_Order_By>>
  where?: Maybe<Payables_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsPayables_AggregateArgs = {
  distinct_on?: Maybe<Array<Payables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Payables_Order_By>>
  where?: Maybe<Payables_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsReceivablesArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
}

/** columns and relationships of "loan_requests" */
export type Loan_RequestsReceivables_AggregateArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
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
}

/** order by avg() on columns of table "loan_requests" */
export type Loan_Requests_Avg_Order_By = {
  amount?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "loan_requests". All fields are combined with a logical 'AND'. */
export type Loan_Requests_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Requests_Bool_Exp>>>
  _not?: Maybe<Loan_Requests_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Requests_Bool_Exp>>>
  amount?: Maybe<Int_Comparison_Exp>
  borrower_id?: Maybe<Uuid_Comparison_Exp>
  confirmation_date?: Maybe<Timestamptz_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  encumbrances?: Maybe<Encumbrances_Bool_Exp>
  loan_participants?: Maybe<Loan_Participants_Bool_Exp>
  loan_risks?: Maybe<Loan_Risk_Bool_Exp>
  payables?: Maybe<Payables_Bool_Exp>
  payback_status?: Maybe<String_Comparison_Exp>
  purpose?: Maybe<String_Comparison_Exp>
  receivables?: Maybe<Receivables_Bool_Exp>
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
  risk_calc_result?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Loan_Requests_Delete_Elem_Input = {
  risk_calc_result?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Loan_Requests_Delete_Key_Input = {
  risk_calc_result?: Maybe<Scalars["String"]>
}

/** input type for incrementing integer column in table "loan_requests" */
export type Loan_Requests_Inc_Input = {
  amount?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "loan_requests" */
export type Loan_Requests_Insert_Input = {
  amount?: Maybe<Scalars["Int"]>
  borrower_id?: Maybe<Scalars["uuid"]>
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  encumbrances?: Maybe<Encumbrances_Arr_Rel_Insert_Input>
  loan_participants?: Maybe<Loan_Participants_Arr_Rel_Insert_Input>
  loan_risks?: Maybe<Loan_Risk_Arr_Rel_Insert_Input>
  payables?: Maybe<Payables_Arr_Rel_Insert_Input>
  payback_status?: Maybe<Scalars["String"]>
  purpose?: Maybe<Scalars["String"]>
  receivables?: Maybe<Receivables_Arr_Rel_Insert_Input>
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
  borrower_id?: Maybe<Order_By>
  confirmation_date?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  encumbrances_aggregate?: Maybe<Encumbrances_Aggregate_Order_By>
  loan_participants_aggregate?: Maybe<Loan_Participants_Aggregate_Order_By>
  loan_risks_aggregate?: Maybe<Loan_Risk_Aggregate_Order_By>
  payables_aggregate?: Maybe<Payables_Aggregate_Order_By>
  payback_status?: Maybe<Order_By>
  purpose?: Maybe<Order_By>
  receivables_aggregate?: Maybe<Receivables_Aggregate_Order_By>
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
  risk_calc_result?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "loan_requests" */
export enum Loan_Requests_Select_Column {
  /** column name */
  Amount = "amount",
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  ConfirmationDate = "confirmation_date",
  /** column name */
  CreatedAt = "created_at",
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
  borrower_id?: Maybe<Scalars["uuid"]>
  confirmation_date?: Maybe<Scalars["timestamptz"]>
  created_at?: Maybe<Scalars["timestamptz"]>
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
}

/** order by stddev() on columns of table "loan_requests" */
export type Loan_Requests_Stddev_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Loan_Requests_Stddev_Pop_Fields = {
  __typename?: "loan_requests_stddev_pop_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "loan_requests" */
export type Loan_Requests_Stddev_Pop_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Loan_Requests_Stddev_Samp_Fields = {
  __typename?: "loan_requests_stddev_samp_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "loan_requests" */
export type Loan_Requests_Stddev_Samp_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Loan_Requests_Sum_Fields = {
  __typename?: "loan_requests_sum_fields"
  amount?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "loan_requests" */
export type Loan_Requests_Sum_Order_By = {
  amount?: Maybe<Order_By>
}

/** update columns of table "loan_requests" */
export enum Loan_Requests_Update_Column {
  /** column name */
  Amount = "amount",
  /** column name */
  BorrowerId = "borrower_id",
  /** column name */
  ConfirmationDate = "confirmation_date",
  /** column name */
  CreatedAt = "created_at",
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
}

/** order by var_pop() on columns of table "loan_requests" */
export type Loan_Requests_Var_Pop_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Loan_Requests_Var_Samp_Fields = {
  __typename?: "loan_requests_var_samp_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "loan_requests" */
export type Loan_Requests_Var_Samp_Order_By = {
  amount?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Loan_Requests_Variance_Fields = {
  __typename?: "loan_requests_variance_fields"
  amount?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "loan_requests" */
export type Loan_Requests_Variance_Order_By = {
  amount?: Maybe<Order_By>
}

/** columns and relationships of "loan_risk" */
export type Loan_Risk = {
  __typename?: "loan_risk"
  agent_id: Scalars["uuid"]
  demand_function: Scalars["jsonb"]
  /** An object relationship */
  loan_request: Loan_Requests
  request_id: Scalars["uuid"]
  status: Scalars["String"]
  subjective_borrower_risk: Scalars["jsonb"]
  updated_at: Scalars["timestamptz"]
  /** An object relationship */
  user: User
}

/** columns and relationships of "loan_risk" */
export type Loan_RiskDemand_FunctionArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "loan_risk" */
export type Loan_RiskSubjective_Borrower_RiskArgs = {
  path?: Maybe<Scalars["String"]>
}

/** aggregated selection of "loan_risk" */
export type Loan_Risk_Aggregate = {
  __typename?: "loan_risk_aggregate"
  aggregate?: Maybe<Loan_Risk_Aggregate_Fields>
  nodes: Array<Loan_Risk>
}

/** aggregate fields of "loan_risk" */
export type Loan_Risk_Aggregate_Fields = {
  __typename?: "loan_risk_aggregate_fields"
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Loan_Risk_Max_Fields>
  min?: Maybe<Loan_Risk_Min_Fields>
}

/** aggregate fields of "loan_risk" */
export type Loan_Risk_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Loan_Risk_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "loan_risk" */
export type Loan_Risk_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Loan_Risk_Max_Order_By>
  min?: Maybe<Loan_Risk_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Loan_Risk_Append_Input = {
  demand_function?: Maybe<Scalars["jsonb"]>
  subjective_borrower_risk?: Maybe<Scalars["jsonb"]>
}

/** input type for inserting array relation for remote table "loan_risk" */
export type Loan_Risk_Arr_Rel_Insert_Input = {
  data: Array<Loan_Risk_Insert_Input>
  on_conflict?: Maybe<Loan_Risk_On_Conflict>
}

/** Boolean expression to filter rows from the table "loan_risk". All fields are combined with a logical 'AND'. */
export type Loan_Risk_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Loan_Risk_Bool_Exp>>>
  _not?: Maybe<Loan_Risk_Bool_Exp>
  _or?: Maybe<Array<Maybe<Loan_Risk_Bool_Exp>>>
  agent_id?: Maybe<Uuid_Comparison_Exp>
  demand_function?: Maybe<Jsonb_Comparison_Exp>
  loan_request?: Maybe<Loan_Requests_Bool_Exp>
  request_id?: Maybe<Uuid_Comparison_Exp>
  status?: Maybe<String_Comparison_Exp>
  subjective_borrower_risk?: Maybe<Jsonb_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "loan_risk" */
export enum Loan_Risk_Constraint {
  /** unique or primary key constraint */
  LoanRiskPkey = "loan_risk_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Loan_Risk_Delete_At_Path_Input = {
  demand_function?: Maybe<Array<Maybe<Scalars["String"]>>>
  subjective_borrower_risk?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Loan_Risk_Delete_Elem_Input = {
  demand_function?: Maybe<Scalars["Int"]>
  subjective_borrower_risk?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Loan_Risk_Delete_Key_Input = {
  demand_function?: Maybe<Scalars["String"]>
  subjective_borrower_risk?: Maybe<Scalars["String"]>
}

/** input type for inserting data into table "loan_risk" */
export type Loan_Risk_Insert_Input = {
  agent_id?: Maybe<Scalars["uuid"]>
  demand_function?: Maybe<Scalars["jsonb"]>
  loan_request?: Maybe<Loan_Requests_Obj_Rel_Insert_Input>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  subjective_borrower_risk?: Maybe<Scalars["jsonb"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Loan_Risk_Max_Fields = {
  __typename?: "loan_risk_max_fields"
  agent_id?: Maybe<Scalars["uuid"]>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by max() on columns of table "loan_risk" */
export type Loan_Risk_Max_Order_By = {
  agent_id?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Loan_Risk_Min_Fields = {
  __typename?: "loan_risk_min_fields"
  agent_id?: Maybe<Scalars["uuid"]>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by min() on columns of table "loan_risk" */
export type Loan_Risk_Min_Order_By = {
  agent_id?: Maybe<Order_By>
  request_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** response of any mutation on the table "loan_risk" */
export type Loan_Risk_Mutation_Response = {
  __typename?: "loan_risk_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Loan_Risk>
}

/** input type for inserting object relation for remote table "loan_risk" */
export type Loan_Risk_Obj_Rel_Insert_Input = {
  data: Loan_Risk_Insert_Input
  on_conflict?: Maybe<Loan_Risk_On_Conflict>
}

/** on conflict condition type for table "loan_risk" */
export type Loan_Risk_On_Conflict = {
  constraint: Loan_Risk_Constraint
  update_columns: Array<Loan_Risk_Update_Column>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** ordering options when selecting data from "loan_risk" */
export type Loan_Risk_Order_By = {
  agent_id?: Maybe<Order_By>
  demand_function?: Maybe<Order_By>
  loan_request?: Maybe<Loan_Requests_Order_By>
  request_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  subjective_borrower_risk?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user?: Maybe<User_Order_By>
}

/** primary key columns input for table: "loan_risk" */
export type Loan_Risk_Pk_Columns_Input = {
  agent_id: Scalars["uuid"]
  request_id: Scalars["uuid"]
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Loan_Risk_Prepend_Input = {
  demand_function?: Maybe<Scalars["jsonb"]>
  subjective_borrower_risk?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "loan_risk" */
export enum Loan_Risk_Select_Column {
  /** column name */
  AgentId = "agent_id",
  /** column name */
  DemandFunction = "demand_function",
  /** column name */
  RequestId = "request_id",
  /** column name */
  Status = "status",
  /** column name */
  SubjectiveBorrowerRisk = "subjective_borrower_risk",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "loan_risk" */
export type Loan_Risk_Set_Input = {
  agent_id?: Maybe<Scalars["uuid"]>
  demand_function?: Maybe<Scalars["jsonb"]>
  request_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  subjective_borrower_risk?: Maybe<Scalars["jsonb"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** update columns of table "loan_risk" */
export enum Loan_Risk_Update_Column {
  /** column name */
  AgentId = "agent_id",
  /** column name */
  DemandFunction = "demand_function",
  /** column name */
  RequestId = "request_id",
  /** column name */
  Status = "status",
  /** column name */
  SubjectiveBorrowerRisk = "subjective_borrower_risk",
  /** column name */
  UpdatedAt = "updated_at",
}

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root"
  /** delete data from the table: "edges" */
  delete_edges?: Maybe<Edges_Mutation_Response>
  /** delete single row from the table: "edges" */
  delete_edges_by_pk?: Maybe<Edges>
  /** delete data from the table: "encumbrance_participants" */
  delete_encumbrance_participants?: Maybe<
    Encumbrance_Participants_Mutation_Response
  >
  /** delete single row from the table: "encumbrance_participants" */
  delete_encumbrance_participants_by_pk?: Maybe<Encumbrance_Participants>
  /** delete data from the table: "encumbrances" */
  delete_encumbrances?: Maybe<Encumbrances_Mutation_Response>
  /** delete single row from the table: "encumbrances" */
  delete_encumbrances_by_pk?: Maybe<Encumbrances>
  /** delete data from the table: "loan_participants" */
  delete_loan_participants?: Maybe<Loan_Participants_Mutation_Response>
  /** delete single row from the table: "loan_participants" */
  delete_loan_participants_by_pk?: Maybe<Loan_Participants>
  /** delete data from the table: "loan_requests" */
  delete_loan_requests?: Maybe<Loan_Requests_Mutation_Response>
  /** delete single row from the table: "loan_requests" */
  delete_loan_requests_by_pk?: Maybe<Loan_Requests>
  /** delete data from the table: "loan_risk" */
  delete_loan_risk?: Maybe<Loan_Risk_Mutation_Response>
  /** delete single row from the table: "loan_risk" */
  delete_loan_risk_by_pk?: Maybe<Loan_Risk>
  /** delete data from the table: "payables" */
  delete_payables?: Maybe<Payables_Mutation_Response>
  /** delete single row from the table: "payables" */
  delete_payables_by_pk?: Maybe<Payables>
  /** delete data from the table: "receivables" */
  delete_receivables?: Maybe<Receivables_Mutation_Response>
  /** delete single row from the table: "receivables" */
  delete_receivables_by_pk?: Maybe<Receivables>
  /** delete data from the table: "recommendation_risk" */
  delete_recommendation_risk?: Maybe<Recommendation_Risk_Mutation_Response>
  /** delete single row from the table: "recommendation_risk" */
  delete_recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
  /** delete data from the table: "supporters" */
  delete_supporters?: Maybe<Supporters_Mutation_Response>
  /** delete single row from the table: "supporters" */
  delete_supporters_by_pk?: Maybe<Supporters>
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>
  /** insert data into the table: "edges" */
  insert_edges?: Maybe<Edges_Mutation_Response>
  /** insert a single row into the table: "edges" */
  insert_edges_one?: Maybe<Edges>
  /** insert data into the table: "encumbrance_participants" */
  insert_encumbrance_participants?: Maybe<
    Encumbrance_Participants_Mutation_Response
  >
  /** insert a single row into the table: "encumbrance_participants" */
  insert_encumbrance_participants_one?: Maybe<Encumbrance_Participants>
  /** insert data into the table: "encumbrances" */
  insert_encumbrances?: Maybe<Encumbrances_Mutation_Response>
  /** insert a single row into the table: "encumbrances" */
  insert_encumbrances_one?: Maybe<Encumbrances>
  /** insert data into the table: "loan_participants" */
  insert_loan_participants?: Maybe<Loan_Participants_Mutation_Response>
  /** insert a single row into the table: "loan_participants" */
  insert_loan_participants_one?: Maybe<Loan_Participants>
  /** insert data into the table: "loan_requests" */
  insert_loan_requests?: Maybe<Loan_Requests_Mutation_Response>
  /** insert a single row into the table: "loan_requests" */
  insert_loan_requests_one?: Maybe<Loan_Requests>
  /** insert data into the table: "loan_risk" */
  insert_loan_risk?: Maybe<Loan_Risk_Mutation_Response>
  /** insert a single row into the table: "loan_risk" */
  insert_loan_risk_one?: Maybe<Loan_Risk>
  /** insert data into the table: "payables" */
  insert_payables?: Maybe<Payables_Mutation_Response>
  /** insert a single row into the table: "payables" */
  insert_payables_one?: Maybe<Payables>
  /** insert data into the table: "receivables" */
  insert_receivables?: Maybe<Receivables_Mutation_Response>
  /** insert a single row into the table: "receivables" */
  insert_receivables_one?: Maybe<Receivables>
  /** insert data into the table: "recommendation_risk" */
  insert_recommendation_risk?: Maybe<Recommendation_Risk_Mutation_Response>
  /** insert a single row into the table: "recommendation_risk" */
  insert_recommendation_risk_one?: Maybe<Recommendation_Risk>
  /** insert data into the table: "supporters" */
  insert_supporters?: Maybe<Supporters_Mutation_Response>
  /** insert a single row into the table: "supporters" */
  insert_supporters_one?: Maybe<Supporters>
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>
  /** update data of the table: "edges" */
  update_edges?: Maybe<Edges_Mutation_Response>
  /** update single row of the table: "edges" */
  update_edges_by_pk?: Maybe<Edges>
  /** update data of the table: "encumbrance_participants" */
  update_encumbrance_participants?: Maybe<
    Encumbrance_Participants_Mutation_Response
  >
  /** update single row of the table: "encumbrance_participants" */
  update_encumbrance_participants_by_pk?: Maybe<Encumbrance_Participants>
  /** update data of the table: "encumbrances" */
  update_encumbrances?: Maybe<Encumbrances_Mutation_Response>
  /** update single row of the table: "encumbrances" */
  update_encumbrances_by_pk?: Maybe<Encumbrances>
  /** update data of the table: "loan_participants" */
  update_loan_participants?: Maybe<Loan_Participants_Mutation_Response>
  /** update single row of the table: "loan_participants" */
  update_loan_participants_by_pk?: Maybe<Loan_Participants>
  /** update data of the table: "loan_requests" */
  update_loan_requests?: Maybe<Loan_Requests_Mutation_Response>
  /** update single row of the table: "loan_requests" */
  update_loan_requests_by_pk?: Maybe<Loan_Requests>
  /** update data of the table: "loan_risk" */
  update_loan_risk?: Maybe<Loan_Risk_Mutation_Response>
  /** update single row of the table: "loan_risk" */
  update_loan_risk_by_pk?: Maybe<Loan_Risk>
  /** update data of the table: "payables" */
  update_payables?: Maybe<Payables_Mutation_Response>
  /** update single row of the table: "payables" */
  update_payables_by_pk?: Maybe<Payables>
  /** update data of the table: "receivables" */
  update_receivables?: Maybe<Receivables_Mutation_Response>
  /** update single row of the table: "receivables" */
  update_receivables_by_pk?: Maybe<Receivables>
  /** update data of the table: "recommendation_risk" */
  update_recommendation_risk?: Maybe<Recommendation_Risk_Mutation_Response>
  /** update single row of the table: "recommendation_risk" */
  update_recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
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
export type Mutation_RootDelete_EdgesArgs = {
  where: Edges_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Edges_By_PkArgs = {
  edge_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_Encumbrance_ParticipantsArgs = {
  where: Encumbrance_Participants_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Encumbrance_Participants_By_PkArgs = {
  encumbrance_id: Scalars["uuid"]
  recipient_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_EncumbrancesArgs = {
  where: Encumbrances_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Encumbrances_By_PkArgs = {
  encumbrance_id: Scalars["uuid"]
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
export type Mutation_RootDelete_Loan_RiskArgs = {
  where: Loan_Risk_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Loan_Risk_By_PkArgs = {
  agent_id: Scalars["uuid"]
  request_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_PayablesArgs = {
  where: Payables_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Payables_By_PkArgs = {
  loan_id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_ReceivablesArgs = {
  where: Receivables_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Receivables_By_PkArgs = {
  loan_id: Scalars["uuid"]
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
export type Mutation_RootInsert_EdgesArgs = {
  objects: Array<Edges_Insert_Input>
  on_conflict?: Maybe<Edges_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Edges_OneArgs = {
  object: Edges_Insert_Input
  on_conflict?: Maybe<Edges_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Encumbrance_ParticipantsArgs = {
  objects: Array<Encumbrance_Participants_Insert_Input>
  on_conflict?: Maybe<Encumbrance_Participants_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Encumbrance_Participants_OneArgs = {
  object: Encumbrance_Participants_Insert_Input
  on_conflict?: Maybe<Encumbrance_Participants_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_EncumbrancesArgs = {
  objects: Array<Encumbrances_Insert_Input>
  on_conflict?: Maybe<Encumbrances_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Encumbrances_OneArgs = {
  object: Encumbrances_Insert_Input
  on_conflict?: Maybe<Encumbrances_On_Conflict>
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
export type Mutation_RootInsert_Loan_RiskArgs = {
  objects: Array<Loan_Risk_Insert_Input>
  on_conflict?: Maybe<Loan_Risk_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Loan_Risk_OneArgs = {
  object: Loan_Risk_Insert_Input
  on_conflict?: Maybe<Loan_Risk_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_PayablesArgs = {
  objects: Array<Payables_Insert_Input>
  on_conflict?: Maybe<Payables_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Payables_OneArgs = {
  object: Payables_Insert_Input
  on_conflict?: Maybe<Payables_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_ReceivablesArgs = {
  objects: Array<Receivables_Insert_Input>
  on_conflict?: Maybe<Receivables_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Receivables_OneArgs = {
  object: Receivables_Insert_Input
  on_conflict?: Maybe<Receivables_On_Conflict>
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
export type Mutation_RootUpdate_EdgesArgs = {
  _inc?: Maybe<Edges_Inc_Input>
  _set?: Maybe<Edges_Set_Input>
  where: Edges_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Edges_By_PkArgs = {
  _inc?: Maybe<Edges_Inc_Input>
  _set?: Maybe<Edges_Set_Input>
  pk_columns: Edges_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Encumbrance_ParticipantsArgs = {
  _inc?: Maybe<Encumbrance_Participants_Inc_Input>
  _set?: Maybe<Encumbrance_Participants_Set_Input>
  where: Encumbrance_Participants_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Encumbrance_Participants_By_PkArgs = {
  _inc?: Maybe<Encumbrance_Participants_Inc_Input>
  _set?: Maybe<Encumbrance_Participants_Set_Input>
  pk_columns: Encumbrance_Participants_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_EncumbrancesArgs = {
  _inc?: Maybe<Encumbrances_Inc_Input>
  _set?: Maybe<Encumbrances_Set_Input>
  where: Encumbrances_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Encumbrances_By_PkArgs = {
  _inc?: Maybe<Encumbrances_Inc_Input>
  _set?: Maybe<Encumbrances_Set_Input>
  pk_columns: Encumbrances_Pk_Columns_Input
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
export type Mutation_RootUpdate_Loan_RiskArgs = {
  _append?: Maybe<Loan_Risk_Append_Input>
  _delete_at_path?: Maybe<Loan_Risk_Delete_At_Path_Input>
  _delete_elem?: Maybe<Loan_Risk_Delete_Elem_Input>
  _delete_key?: Maybe<Loan_Risk_Delete_Key_Input>
  _prepend?: Maybe<Loan_Risk_Prepend_Input>
  _set?: Maybe<Loan_Risk_Set_Input>
  where: Loan_Risk_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Loan_Risk_By_PkArgs = {
  _append?: Maybe<Loan_Risk_Append_Input>
  _delete_at_path?: Maybe<Loan_Risk_Delete_At_Path_Input>
  _delete_elem?: Maybe<Loan_Risk_Delete_Elem_Input>
  _delete_key?: Maybe<Loan_Risk_Delete_Key_Input>
  _prepend?: Maybe<Loan_Risk_Prepend_Input>
  _set?: Maybe<Loan_Risk_Set_Input>
  pk_columns: Loan_Risk_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_PayablesArgs = {
  _inc?: Maybe<Payables_Inc_Input>
  _set?: Maybe<Payables_Set_Input>
  where: Payables_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Payables_By_PkArgs = {
  _inc?: Maybe<Payables_Inc_Input>
  _set?: Maybe<Payables_Set_Input>
  pk_columns: Payables_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_ReceivablesArgs = {
  _inc?: Maybe<Receivables_Inc_Input>
  _set?: Maybe<Receivables_Set_Input>
  where: Receivables_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Receivables_By_PkArgs = {
  _inc?: Maybe<Receivables_Inc_Input>
  _set?: Maybe<Receivables_Set_Input>
  pk_columns: Receivables_Pk_Columns_Input
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

/** columns and relationships of "payables" */
export type Payables = {
  __typename?: "payables"
  amount_paid: Scalars["float8"]
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total: Scalars["float8"]
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["timetz"]>
  last_paid?: Maybe<Scalars["timetz"]>
  loan_id: Scalars["uuid"]
  /** An object relationship */
  loan_request: Loan_Requests
  pay_frequency?: Maybe<Scalars["Int"]>
  pay_priority: Scalars["Int"]
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** aggregated selection of "payables" */
export type Payables_Aggregate = {
  __typename?: "payables_aggregate"
  aggregate?: Maybe<Payables_Aggregate_Fields>
  nodes: Array<Payables>
}

/** aggregate fields of "payables" */
export type Payables_Aggregate_Fields = {
  __typename?: "payables_aggregate_fields"
  avg?: Maybe<Payables_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Payables_Max_Fields>
  min?: Maybe<Payables_Min_Fields>
  stddev?: Maybe<Payables_Stddev_Fields>
  stddev_pop?: Maybe<Payables_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Payables_Stddev_Samp_Fields>
  sum?: Maybe<Payables_Sum_Fields>
  var_pop?: Maybe<Payables_Var_Pop_Fields>
  var_samp?: Maybe<Payables_Var_Samp_Fields>
  variance?: Maybe<Payables_Variance_Fields>
}

/** aggregate fields of "payables" */
export type Payables_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Payables_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "payables" */
export type Payables_Aggregate_Order_By = {
  avg?: Maybe<Payables_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Payables_Max_Order_By>
  min?: Maybe<Payables_Min_Order_By>
  stddev?: Maybe<Payables_Stddev_Order_By>
  stddev_pop?: Maybe<Payables_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Payables_Stddev_Samp_Order_By>
  sum?: Maybe<Payables_Sum_Order_By>
  var_pop?: Maybe<Payables_Var_Pop_Order_By>
  var_samp?: Maybe<Payables_Var_Samp_Order_By>
  variance?: Maybe<Payables_Variance_Order_By>
}

/** input type for inserting array relation for remote table "payables" */
export type Payables_Arr_Rel_Insert_Input = {
  data: Array<Payables_Insert_Input>
  on_conflict?: Maybe<Payables_On_Conflict>
}

/** aggregate avg on columns */
export type Payables_Avg_Fields = {
  __typename?: "payables_avg_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
  pay_priority?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "payables" */
export type Payables_Avg_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "payables". All fields are combined with a logical 'AND'. */
export type Payables_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Payables_Bool_Exp>>>
  _not?: Maybe<Payables_Bool_Exp>
  _or?: Maybe<Array<Maybe<Payables_Bool_Exp>>>
  amount_paid?: Maybe<Float8_Comparison_Exp>
  amount_remain?: Maybe<Float8_Comparison_Exp>
  amount_total?: Maybe<Float8_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  due_date?: Maybe<Timetz_Comparison_Exp>
  last_paid?: Maybe<Timetz_Comparison_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  loan_request?: Maybe<Loan_Requests_Bool_Exp>
  pay_frequency?: Maybe<Int_Comparison_Exp>
  pay_priority?: Maybe<Int_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "payables" */
export enum Payables_Constraint {
  /** unique or primary key constraint */
  PayablesPkey = "payables_pkey",
}

/** input type for incrementing integer column in table "payables" */
export type Payables_Inc_Input = {
  amount_paid?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  pay_priority?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "payables" */
export type Payables_Insert_Input = {
  amount_paid?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["timetz"]>
  last_paid?: Maybe<Scalars["timetz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Loan_Requests_Obj_Rel_Insert_Input>
  pay_frequency?: Maybe<Scalars["Int"]>
  pay_priority?: Maybe<Scalars["Int"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** aggregate max on columns */
export type Payables_Max_Fields = {
  __typename?: "payables_max_fields"
  amount_paid?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["timetz"]>
  last_paid?: Maybe<Scalars["timetz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  pay_priority?: Maybe<Scalars["Int"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by max() on columns of table "payables" */
export type Payables_Max_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  last_paid?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Payables_Min_Fields = {
  __typename?: "payables_min_fields"
  amount_paid?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["timetz"]>
  last_paid?: Maybe<Scalars["timetz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  pay_priority?: Maybe<Scalars["Int"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by min() on columns of table "payables" */
export type Payables_Min_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  last_paid?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** response of any mutation on the table "payables" */
export type Payables_Mutation_Response = {
  __typename?: "payables_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Payables>
}

/** input type for inserting object relation for remote table "payables" */
export type Payables_Obj_Rel_Insert_Input = {
  data: Payables_Insert_Input
  on_conflict?: Maybe<Payables_On_Conflict>
}

/** on conflict condition type for table "payables" */
export type Payables_On_Conflict = {
  constraint: Payables_Constraint
  update_columns: Array<Payables_Update_Column>
  where?: Maybe<Payables_Bool_Exp>
}

/** ordering options when selecting data from "payables" */
export type Payables_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  last_paid?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  loan_request?: Maybe<Loan_Requests_Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** primary key columns input for table: "payables" */
export type Payables_Pk_Columns_Input = {
  loan_id: Scalars["uuid"]
}

/** select columns of table "payables" */
export enum Payables_Select_Column {
  /** column name */
  AmountPaid = "amount_paid",
  /** column name */
  AmountRemain = "amount_remain",
  /** column name */
  AmountTotal = "amount_total",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DueDate = "due_date",
  /** column name */
  LastPaid = "last_paid",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  PayFrequency = "pay_frequency",
  /** column name */
  PayPriority = "pay_priority",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "payables" */
export type Payables_Set_Input = {
  amount_paid?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["timetz"]>
  last_paid?: Maybe<Scalars["timetz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  pay_priority?: Maybe<Scalars["Int"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** aggregate stddev on columns */
export type Payables_Stddev_Fields = {
  __typename?: "payables_stddev_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
  pay_priority?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "payables" */
export type Payables_Stddev_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Payables_Stddev_Pop_Fields = {
  __typename?: "payables_stddev_pop_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
  pay_priority?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "payables" */
export type Payables_Stddev_Pop_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Payables_Stddev_Samp_Fields = {
  __typename?: "payables_stddev_samp_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
  pay_priority?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "payables" */
export type Payables_Stddev_Samp_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Payables_Sum_Fields = {
  __typename?: "payables_sum_fields"
  amount_paid?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  pay_frequency?: Maybe<Scalars["Int"]>
  pay_priority?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "payables" */
export type Payables_Sum_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** update columns of table "payables" */
export enum Payables_Update_Column {
  /** column name */
  AmountPaid = "amount_paid",
  /** column name */
  AmountRemain = "amount_remain",
  /** column name */
  AmountTotal = "amount_total",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DueDate = "due_date",
  /** column name */
  LastPaid = "last_paid",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  PayFrequency = "pay_frequency",
  /** column name */
  PayPriority = "pay_priority",
  /** column name */
  UpdatedAt = "updated_at",
}

/** aggregate var_pop on columns */
export type Payables_Var_Pop_Fields = {
  __typename?: "payables_var_pop_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
  pay_priority?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "payables" */
export type Payables_Var_Pop_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Payables_Var_Samp_Fields = {
  __typename?: "payables_var_samp_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
  pay_priority?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "payables" */
export type Payables_Var_Samp_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Payables_Variance_Fields = {
  __typename?: "payables_variance_fields"
  amount_paid?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  pay_frequency?: Maybe<Scalars["Float"]>
  pay_priority?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "payables" */
export type Payables_Variance_Order_By = {
  amount_paid?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  pay_frequency?: Maybe<Order_By>
  pay_priority?: Maybe<Order_By>
}

/** query root */
export type Query_Root = {
  __typename?: "query_root"
  /** fetch data from the table: "edges" */
  edges: Array<Edges>
  /** fetch aggregated fields from the table: "edges" */
  edges_aggregate: Edges_Aggregate
  /** fetch data from the table: "edges" using primary key columns */
  edges_by_pk?: Maybe<Edges>
  /** fetch data from the table: "encumbrance_participants" */
  encumbrance_participants: Array<Encumbrance_Participants>
  /** fetch aggregated fields from the table: "encumbrance_participants" */
  encumbrance_participants_aggregate: Encumbrance_Participants_Aggregate
  /** fetch data from the table: "encumbrance_participants" using primary key columns */
  encumbrance_participants_by_pk?: Maybe<Encumbrance_Participants>
  /** fetch data from the table: "encumbrances" */
  encumbrances: Array<Encumbrances>
  /** fetch aggregated fields from the table: "encumbrances" */
  encumbrances_aggregate: Encumbrances_Aggregate
  /** fetch data from the table: "encumbrances" using primary key columns */
  encumbrances_by_pk?: Maybe<Encumbrances>
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
  /** fetch data from the table: "loan_risk" */
  loan_risk: Array<Loan_Risk>
  /** fetch aggregated fields from the table: "loan_risk" */
  loan_risk_aggregate: Loan_Risk_Aggregate
  /** fetch data from the table: "loan_risk" using primary key columns */
  loan_risk_by_pk?: Maybe<Loan_Risk>
  /** fetch data from the table: "payables" */
  payables: Array<Payables>
  /** fetch aggregated fields from the table: "payables" */
  payables_aggregate: Payables_Aggregate
  /** fetch data from the table: "payables" using primary key columns */
  payables_by_pk?: Maybe<Payables>
  /** fetch data from the table: "receivables" */
  receivables: Array<Receivables>
  /** fetch aggregated fields from the table: "receivables" */
  receivables_aggregate: Receivables_Aggregate
  /** fetch data from the table: "receivables" using primary key columns */
  receivables_by_pk?: Maybe<Receivables>
  /** fetch data from the table: "recommendation_risk" */
  recommendation_risk: Array<Recommendation_Risk>
  /** fetch aggregated fields from the table: "recommendation_risk" */
  recommendation_risk_aggregate: Recommendation_Risk_Aggregate
  /** fetch data from the table: "recommendation_risk" using primary key columns */
  recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
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
export type Query_RootEdgesArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** query root */
export type Query_RootEdges_AggregateArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** query root */
export type Query_RootEdges_By_PkArgs = {
  edge_id: Scalars["uuid"]
}

/** query root */
export type Query_RootEncumbrance_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Encumbrance_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrance_Participants_Order_By>>
  where?: Maybe<Encumbrance_Participants_Bool_Exp>
}

/** query root */
export type Query_RootEncumbrance_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Encumbrance_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrance_Participants_Order_By>>
  where?: Maybe<Encumbrance_Participants_Bool_Exp>
}

/** query root */
export type Query_RootEncumbrance_Participants_By_PkArgs = {
  encumbrance_id: Scalars["uuid"]
  recipient_id: Scalars["uuid"]
}

/** query root */
export type Query_RootEncumbrancesArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
}

/** query root */
export type Query_RootEncumbrances_AggregateArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
}

/** query root */
export type Query_RootEncumbrances_By_PkArgs = {
  encumbrance_id: Scalars["uuid"]
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
export type Query_RootLoan_RiskArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Risk_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** query root */
export type Query_RootLoan_Risk_By_PkArgs = {
  agent_id: Scalars["uuid"]
  request_id: Scalars["uuid"]
}

/** query root */
export type Query_RootPayablesArgs = {
  distinct_on?: Maybe<Array<Payables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Payables_Order_By>>
  where?: Maybe<Payables_Bool_Exp>
}

/** query root */
export type Query_RootPayables_AggregateArgs = {
  distinct_on?: Maybe<Array<Payables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Payables_Order_By>>
  where?: Maybe<Payables_Bool_Exp>
}

/** query root */
export type Query_RootPayables_By_PkArgs = {
  loan_id: Scalars["uuid"]
}

/** query root */
export type Query_RootReceivablesArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
}

/** query root */
export type Query_RootReceivables_AggregateArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
}

/** query root */
export type Query_RootReceivables_By_PkArgs = {
  loan_id: Scalars["uuid"]
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

/** columns and relationships of "receivables" */
export type Receivables = {
  __typename?: "receivables"
  amount_received: Scalars["float8"]
  amount_remain: Scalars["float8"]
  amount_total: Scalars["float8"]
  created_at: Scalars["timestamptz"]
  due_date?: Maybe<Scalars["date"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  last_received?: Maybe<Scalars["timestamptz"]>
  loan_id: Scalars["uuid"]
  /** An object relationship */
  loan_request: Loan_Requests
  receive_frequency?: Maybe<Scalars["Int"]>
  receiver_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  updated_at: Scalars["timestamptz"]
  /** An object relationship */
  user?: Maybe<User>
}

/** aggregated selection of "receivables" */
export type Receivables_Aggregate = {
  __typename?: "receivables_aggregate"
  aggregate?: Maybe<Receivables_Aggregate_Fields>
  nodes: Array<Receivables>
}

/** aggregate fields of "receivables" */
export type Receivables_Aggregate_Fields = {
  __typename?: "receivables_aggregate_fields"
  avg?: Maybe<Receivables_Avg_Fields>
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<Receivables_Max_Fields>
  min?: Maybe<Receivables_Min_Fields>
  stddev?: Maybe<Receivables_Stddev_Fields>
  stddev_pop?: Maybe<Receivables_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Receivables_Stddev_Samp_Fields>
  sum?: Maybe<Receivables_Sum_Fields>
  var_pop?: Maybe<Receivables_Var_Pop_Fields>
  var_samp?: Maybe<Receivables_Var_Samp_Fields>
  variance?: Maybe<Receivables_Variance_Fields>
}

/** aggregate fields of "receivables" */
export type Receivables_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Receivables_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "receivables" */
export type Receivables_Aggregate_Order_By = {
  avg?: Maybe<Receivables_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Receivables_Max_Order_By>
  min?: Maybe<Receivables_Min_Order_By>
  stddev?: Maybe<Receivables_Stddev_Order_By>
  stddev_pop?: Maybe<Receivables_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Receivables_Stddev_Samp_Order_By>
  sum?: Maybe<Receivables_Sum_Order_By>
  var_pop?: Maybe<Receivables_Var_Pop_Order_By>
  var_samp?: Maybe<Receivables_Var_Samp_Order_By>
  variance?: Maybe<Receivables_Variance_Order_By>
}

/** input type for inserting array relation for remote table "receivables" */
export type Receivables_Arr_Rel_Insert_Input = {
  data: Array<Receivables_Insert_Input>
  on_conflict?: Maybe<Receivables_On_Conflict>
}

/** aggregate avg on columns */
export type Receivables_Avg_Fields = {
  __typename?: "receivables_avg_fields"
  amount_received?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  receive_frequency?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "receivables" */
export type Receivables_Avg_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "receivables". All fields are combined with a logical 'AND'. */
export type Receivables_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Receivables_Bool_Exp>>>
  _not?: Maybe<Receivables_Bool_Exp>
  _or?: Maybe<Array<Maybe<Receivables_Bool_Exp>>>
  amount_received?: Maybe<Float8_Comparison_Exp>
  amount_remain?: Maybe<Float8_Comparison_Exp>
  amount_total?: Maybe<Float8_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  due_date?: Maybe<Date_Comparison_Exp>
  encumbrance_id?: Maybe<Uuid_Comparison_Exp>
  last_received?: Maybe<Timestamptz_Comparison_Exp>
  loan_id?: Maybe<Uuid_Comparison_Exp>
  loan_request?: Maybe<Loan_Requests_Bool_Exp>
  receive_frequency?: Maybe<Int_Comparison_Exp>
  receiver_id?: Maybe<Uuid_Comparison_Exp>
  status?: Maybe<String_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
}

/** unique or primary key constraints on table "receivables" */
export enum Receivables_Constraint {
  /** unique or primary key constraint */
  ReceivablesPkey = "receivables_pkey",
}

/** input type for incrementing integer column in table "receivables" */
export type Receivables_Inc_Input = {
  amount_received?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  receive_frequency?: Maybe<Scalars["Int"]>
}

/** input type for inserting data into table "receivables" */
export type Receivables_Insert_Input = {
  amount_received?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  last_received?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  loan_request?: Maybe<Loan_Requests_Obj_Rel_Insert_Input>
  receive_frequency?: Maybe<Scalars["Int"]>
  receiver_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
  user?: Maybe<User_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Receivables_Max_Fields = {
  __typename?: "receivables_max_fields"
  amount_received?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  last_received?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  receive_frequency?: Maybe<Scalars["Int"]>
  receiver_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by max() on columns of table "receivables" */
export type Receivables_Max_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  encumbrance_id?: Maybe<Order_By>
  last_received?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
  receiver_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Receivables_Min_Fields = {
  __typename?: "receivables_min_fields"
  amount_received?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  last_received?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  receive_frequency?: Maybe<Scalars["Int"]>
  receiver_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by min() on columns of table "receivables" */
export type Receivables_Min_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  encumbrance_id?: Maybe<Order_By>
  last_received?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
  receiver_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** response of any mutation on the table "receivables" */
export type Receivables_Mutation_Response = {
  __typename?: "receivables_mutation_response"
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"]
  /** data of the affected rows by the mutation */
  returning: Array<Receivables>
}

/** input type for inserting object relation for remote table "receivables" */
export type Receivables_Obj_Rel_Insert_Input = {
  data: Receivables_Insert_Input
  on_conflict?: Maybe<Receivables_On_Conflict>
}

/** on conflict condition type for table "receivables" */
export type Receivables_On_Conflict = {
  constraint: Receivables_Constraint
  update_columns: Array<Receivables_Update_Column>
  where?: Maybe<Receivables_Bool_Exp>
}

/** ordering options when selecting data from "receivables" */
export type Receivables_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  due_date?: Maybe<Order_By>
  encumbrance_id?: Maybe<Order_By>
  last_received?: Maybe<Order_By>
  loan_id?: Maybe<Order_By>
  loan_request?: Maybe<Loan_Requests_Order_By>
  receive_frequency?: Maybe<Order_By>
  receiver_id?: Maybe<Order_By>
  status?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user?: Maybe<User_Order_By>
}

/** primary key columns input for table: "receivables" */
export type Receivables_Pk_Columns_Input = {
  loan_id: Scalars["uuid"]
}

/** select columns of table "receivables" */
export enum Receivables_Select_Column {
  /** column name */
  AmountReceived = "amount_received",
  /** column name */
  AmountRemain = "amount_remain",
  /** column name */
  AmountTotal = "amount_total",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DueDate = "due_date",
  /** column name */
  EncumbranceId = "encumbrance_id",
  /** column name */
  LastReceived = "last_received",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  ReceiveFrequency = "receive_frequency",
  /** column name */
  ReceiverId = "receiver_id",
  /** column name */
  Status = "status",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "receivables" */
export type Receivables_Set_Input = {
  amount_received?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  due_date?: Maybe<Scalars["date"]>
  encumbrance_id?: Maybe<Scalars["uuid"]>
  last_received?: Maybe<Scalars["timestamptz"]>
  loan_id?: Maybe<Scalars["uuid"]>
  receive_frequency?: Maybe<Scalars["Int"]>
  receiver_id?: Maybe<Scalars["uuid"]>
  status?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** aggregate stddev on columns */
export type Receivables_Stddev_Fields = {
  __typename?: "receivables_stddev_fields"
  amount_received?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  receive_frequency?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "receivables" */
export type Receivables_Stddev_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Receivables_Stddev_Pop_Fields = {
  __typename?: "receivables_stddev_pop_fields"
  amount_received?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  receive_frequency?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "receivables" */
export type Receivables_Stddev_Pop_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Receivables_Stddev_Samp_Fields = {
  __typename?: "receivables_stddev_samp_fields"
  amount_received?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  receive_frequency?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "receivables" */
export type Receivables_Stddev_Samp_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Receivables_Sum_Fields = {
  __typename?: "receivables_sum_fields"
  amount_received?: Maybe<Scalars["float8"]>
  amount_remain?: Maybe<Scalars["float8"]>
  amount_total?: Maybe<Scalars["float8"]>
  receive_frequency?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "receivables" */
export type Receivables_Sum_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
}

/** update columns of table "receivables" */
export enum Receivables_Update_Column {
  /** column name */
  AmountReceived = "amount_received",
  /** column name */
  AmountRemain = "amount_remain",
  /** column name */
  AmountTotal = "amount_total",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DueDate = "due_date",
  /** column name */
  EncumbranceId = "encumbrance_id",
  /** column name */
  LastReceived = "last_received",
  /** column name */
  LoanId = "loan_id",
  /** column name */
  ReceiveFrequency = "receive_frequency",
  /** column name */
  ReceiverId = "receiver_id",
  /** column name */
  Status = "status",
  /** column name */
  UpdatedAt = "updated_at",
}

/** aggregate var_pop on columns */
export type Receivables_Var_Pop_Fields = {
  __typename?: "receivables_var_pop_fields"
  amount_received?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  receive_frequency?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "receivables" */
export type Receivables_Var_Pop_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Receivables_Var_Samp_Fields = {
  __typename?: "receivables_var_samp_fields"
  amount_received?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  receive_frequency?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "receivables" */
export type Receivables_Var_Samp_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Receivables_Variance_Fields = {
  __typename?: "receivables_variance_fields"
  amount_received?: Maybe<Scalars["Float"]>
  amount_remain?: Maybe<Scalars["Float"]>
  amount_total?: Maybe<Scalars["Float"]>
  receive_frequency?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "receivables" */
export type Receivables_Variance_Order_By = {
  amount_received?: Maybe<Order_By>
  amount_remain?: Maybe<Order_By>
  amount_total?: Maybe<Order_By>
  receive_frequency?: Maybe<Order_By>
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

/** subscription root */
export type Subscription_Root = {
  __typename?: "subscription_root"
  /** fetch data from the table: "edges" */
  edges: Array<Edges>
  /** fetch aggregated fields from the table: "edges" */
  edges_aggregate: Edges_Aggregate
  /** fetch data from the table: "edges" using primary key columns */
  edges_by_pk?: Maybe<Edges>
  /** fetch data from the table: "encumbrance_participants" */
  encumbrance_participants: Array<Encumbrance_Participants>
  /** fetch aggregated fields from the table: "encumbrance_participants" */
  encumbrance_participants_aggregate: Encumbrance_Participants_Aggregate
  /** fetch data from the table: "encumbrance_participants" using primary key columns */
  encumbrance_participants_by_pk?: Maybe<Encumbrance_Participants>
  /** fetch data from the table: "encumbrances" */
  encumbrances: Array<Encumbrances>
  /** fetch aggregated fields from the table: "encumbrances" */
  encumbrances_aggregate: Encumbrances_Aggregate
  /** fetch data from the table: "encumbrances" using primary key columns */
  encumbrances_by_pk?: Maybe<Encumbrances>
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
  /** fetch data from the table: "loan_risk" */
  loan_risk: Array<Loan_Risk>
  /** fetch aggregated fields from the table: "loan_risk" */
  loan_risk_aggregate: Loan_Risk_Aggregate
  /** fetch data from the table: "loan_risk" using primary key columns */
  loan_risk_by_pk?: Maybe<Loan_Risk>
  /** fetch data from the table: "payables" */
  payables: Array<Payables>
  /** fetch aggregated fields from the table: "payables" */
  payables_aggregate: Payables_Aggregate
  /** fetch data from the table: "payables" using primary key columns */
  payables_by_pk?: Maybe<Payables>
  /** fetch data from the table: "receivables" */
  receivables: Array<Receivables>
  /** fetch aggregated fields from the table: "receivables" */
  receivables_aggregate: Receivables_Aggregate
  /** fetch data from the table: "receivables" using primary key columns */
  receivables_by_pk?: Maybe<Receivables>
  /** fetch data from the table: "recommendation_risk" */
  recommendation_risk: Array<Recommendation_Risk>
  /** fetch aggregated fields from the table: "recommendation_risk" */
  recommendation_risk_aggregate: Recommendation_Risk_Aggregate
  /** fetch data from the table: "recommendation_risk" using primary key columns */
  recommendation_risk_by_pk?: Maybe<Recommendation_Risk>
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
export type Subscription_RootEdgesArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEdges_AggregateArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEdges_By_PkArgs = {
  edge_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootEncumbrance_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Encumbrance_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrance_Participants_Order_By>>
  where?: Maybe<Encumbrance_Participants_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEncumbrance_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Encumbrance_Participants_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrance_Participants_Order_By>>
  where?: Maybe<Encumbrance_Participants_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEncumbrance_Participants_By_PkArgs = {
  encumbrance_id: Scalars["uuid"]
  recipient_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootEncumbrancesArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEncumbrances_AggregateArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
}

/** subscription root */
export type Subscription_RootEncumbrances_By_PkArgs = {
  encumbrance_id: Scalars["uuid"]
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
export type Subscription_RootLoan_RiskArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Risk_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLoan_Risk_By_PkArgs = {
  agent_id: Scalars["uuid"]
  request_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootPayablesArgs = {
  distinct_on?: Maybe<Array<Payables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Payables_Order_By>>
  where?: Maybe<Payables_Bool_Exp>
}

/** subscription root */
export type Subscription_RootPayables_AggregateArgs = {
  distinct_on?: Maybe<Array<Payables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Payables_Order_By>>
  where?: Maybe<Payables_Bool_Exp>
}

/** subscription root */
export type Subscription_RootPayables_By_PkArgs = {
  loan_id: Scalars["uuid"]
}

/** subscription root */
export type Subscription_RootReceivablesArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
}

/** subscription root */
export type Subscription_RootReceivables_AggregateArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
}

/** subscription root */
export type Subscription_RootReceivables_By_PkArgs = {
  loan_id: Scalars["uuid"]
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
  GuarantorsPkey = "guarantors_pkey",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Supporters_Delete_At_Path_Input = {
  guarantee_division?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Supporters_Delete_Elem_Input = {
  guarantee_division?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Supporters_Delete_Key_Input = {
  guarantee_division?: Maybe<Scalars["String"]>
}

/** input type for incrementing integer column in table "supporters" */
export type Supporters_Inc_Input = {
  pledge_amount?: Maybe<Scalars["float8"]>
}

/** input type for inserting data into table "supporters" */
export type Supporters_Insert_Input = {
  guarantee_division?: Maybe<Scalars["jsonb"]>
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
}

/** select columns of table "supporters" */
export enum Supporters_Select_Column {
  /** column name */
  GuaranteeDivision = "guarantee_division",
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

/** expression to compare columns of type timetz. All fields are combined with logical 'AND'. */
export type Timetz_Comparison_Exp = {
  _eq?: Maybe<Scalars["timetz"]>
  _gt?: Maybe<Scalars["timetz"]>
  _gte?: Maybe<Scalars["timetz"]>
  _in?: Maybe<Array<Scalars["timetz"]>>
  _is_null?: Maybe<Scalars["Boolean"]>
  _lt?: Maybe<Scalars["timetz"]>
  _lte?: Maybe<Scalars["timetz"]>
  _neq?: Maybe<Scalars["timetz"]>
  _nin?: Maybe<Array<Scalars["timetz"]>>
}

/** columns and relationships of "user" */
export type User = {
  __typename?: "user"
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  created_at: Scalars["timestamptz"]
  demographic_info?: Maybe<Scalars["jsonb"]>
  /** An array relationship */
  edges: Array<Edges>
  /** An array relationship */
  edgesByLenderId: Array<Edges>
  /** An aggregated array relationship */
  edgesByLenderId_aggregate: Edges_Aggregate
  /** An aggregated array relationship */
  edges_aggregate: Edges_Aggregate
  email: Scalars["String"]
  /** An array relationship */
  encumbrances: Array<Encumbrances>
  /** An aggregated array relationship */
  encumbrances_aggregate: Encumbrances_Aggregate
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
  /** An array relationship */
  loan_risks: Array<Loan_Risk>
  /** An aggregated array relationship */
  loan_risks_aggregate: Loan_Risk_Aggregate
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  name: Scalars["String"]
  phone: Scalars["String"]
  /** An array relationship */
  receivables: Array<Receivables>
  /** An aggregated array relationship */
  receivables_aggregate: Receivables_Aggregate
  /** An array relationship */
  recommendationRisksByRecommenderId: Array<Recommendation_Risk>
  /** An aggregated array relationship */
  recommendationRisksByRecommenderId_aggregate: Recommendation_Risk_Aggregate
  /** An array relationship */
  recommendation_risks: Array<Recommendation_Risk>
  /** An aggregated array relationship */
  recommendation_risks_aggregate: Recommendation_Risk_Aggregate
  /** An array relationship */
  supporters: Array<Supporters>
  /** An aggregated array relationship */
  supporters_aggregate: Supporters_Aggregate
  updated_at: Scalars["timestamptz"]
  user_number: Scalars["Int"]
  user_type: Scalars["user_t"]
}

/** columns and relationships of "user" */
export type UserDemographic_InfoArgs = {
  path?: Maybe<Scalars["String"]>
}

/** columns and relationships of "user" */
export type UserEdgesArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserEdgesByLenderIdArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserEdgesByLenderId_AggregateArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserEdges_AggregateArgs = {
  distinct_on?: Maybe<Array<Edges_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Edges_Order_By>>
  where?: Maybe<Edges_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserEncumbrancesArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserEncumbrances_AggregateArgs = {
  distinct_on?: Maybe<Array<Encumbrances_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Encumbrances_Order_By>>
  where?: Maybe<Encumbrances_Bool_Exp>
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
export type UserLoan_RisksArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserLoan_Risks_AggregateArgs = {
  distinct_on?: Maybe<Array<Loan_Risk_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Loan_Risk_Order_By>>
  where?: Maybe<Loan_Risk_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserReceivablesArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserReceivables_AggregateArgs = {
  distinct_on?: Maybe<Array<Receivables_Select_Column>>
  limit?: Maybe<Scalars["Int"]>
  offset?: Maybe<Scalars["Int"]>
  order_by?: Maybe<Array<Receivables_Order_By>>
  where?: Maybe<Receivables_Bool_Exp>
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
  balance?: Maybe<Float8_Comparison_Exp>
  corpus_share?: Maybe<Float8_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  demographic_info?: Maybe<Jsonb_Comparison_Exp>
  edges?: Maybe<Edges_Bool_Exp>
  edgesByLenderId?: Maybe<Edges_Bool_Exp>
  email?: Maybe<String_Comparison_Exp>
  encumbrances?: Maybe<Encumbrances_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  kyc_approved?: Maybe<Boolean_Comparison_Exp>
  loan_participants?: Maybe<Loan_Participants_Bool_Exp>
  loan_requests?: Maybe<Loan_Requests_Bool_Exp>
  loan_risks?: Maybe<Loan_Risk_Bool_Exp>
  max_exposure?: Maybe<Float_Comparison_Exp>
  min_interest_rate?: Maybe<Float_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  phone?: Maybe<String_Comparison_Exp>
  receivables?: Maybe<Receivables_Bool_Exp>
  recommendationRisksByRecommenderId?: Maybe<Recommendation_Risk_Bool_Exp>
  recommendation_risks?: Maybe<Recommendation_Risk_Bool_Exp>
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
  demographic_info?: Maybe<Array<Maybe<Scalars["String"]>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type User_Delete_Elem_Input = {
  demographic_info?: Maybe<Scalars["Int"]>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type User_Delete_Key_Input = {
  demographic_info?: Maybe<Scalars["String"]>
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
  balance?: Maybe<Scalars["float8"]>
  corpus_share?: Maybe<Scalars["float8"]>
  created_at?: Maybe<Scalars["timestamptz"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  edges?: Maybe<Edges_Arr_Rel_Insert_Input>
  edgesByLenderId?: Maybe<Edges_Arr_Rel_Insert_Input>
  email?: Maybe<Scalars["String"]>
  encumbrances?: Maybe<Encumbrances_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars["uuid"]>
  kyc_approved?: Maybe<Scalars["Boolean"]>
  loan_participants?: Maybe<Loan_Participants_Arr_Rel_Insert_Input>
  loan_requests?: Maybe<Loan_Requests_Arr_Rel_Insert_Input>
  loan_risks?: Maybe<Loan_Risk_Arr_Rel_Insert_Input>
  max_exposure?: Maybe<Scalars["Float"]>
  min_interest_rate?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  receivables?: Maybe<Receivables_Arr_Rel_Insert_Input>
  recommendationRisksByRecommenderId?: Maybe<
    Recommendation_Risk_Arr_Rel_Insert_Input
  >
  recommendation_risks?: Maybe<Recommendation_Risk_Arr_Rel_Insert_Input>
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
  balance?: Maybe<Order_By>
  corpus_share?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  demographic_info?: Maybe<Order_By>
  edgesByLenderId_aggregate?: Maybe<Edges_Aggregate_Order_By>
  edges_aggregate?: Maybe<Edges_Aggregate_Order_By>
  email?: Maybe<Order_By>
  encumbrances_aggregate?: Maybe<Encumbrances_Aggregate_Order_By>
  id?: Maybe<Order_By>
  kyc_approved?: Maybe<Order_By>
  loan_participants_aggregate?: Maybe<Loan_Participants_Aggregate_Order_By>
  loan_requests_aggregate?: Maybe<Loan_Requests_Aggregate_Order_By>
  loan_risks_aggregate?: Maybe<Loan_Risk_Aggregate_Order_By>
  max_exposure?: Maybe<Order_By>
  min_interest_rate?: Maybe<Order_By>
  name?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  receivables_aggregate?: Maybe<Receivables_Aggregate_Order_By>
  recommendationRisksByRecommenderId_aggregate?: Maybe<
    Recommendation_Risk_Aggregate_Order_By
  >
  recommendation_risks_aggregate?: Maybe<Recommendation_Risk_Aggregate_Order_By>
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
  demographic_info?: Maybe<Scalars["jsonb"]>
}

/** select columns of table "user" */
export enum User_Select_Column {
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
  Phone = "phone",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserNumber = "user_number",
  /** column name */
  UserType = "user_type",
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
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
  phone?: Maybe<Scalars["String"]>
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
  Phone = "phone",
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
      | "phone"
      | "demographic_info"
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
      | "user_number"
      | "corpus_share"
      | "kyc_approved"
    >
  >
}

export type GetLenderDashboardInfoQueryVariables = Exact<{
  user_id: Scalars["uuid"]
}>

export type GetLenderDashboardInfoQuery = { __typename?: "query_root" } & {
  lender?: Maybe<
    { __typename?: "user" } & Pick<User, "balance" | "corpus_share">
  >
  corpusInvestment: { __typename?: "receivables_aggregate" } & {
    aggregate?: Maybe<
      { __typename?: "receivables_aggregate_fields" } & {
        sum?: Maybe<
          { __typename?: "receivables_sum_fields" } & Pick<
            Receivables_Sum_Fields,
            "amount_total" | "amount_remain" | "amount_received"
          >
        >
      }
    >
  }
  corpusShares: { __typename?: "user_aggregate" } & {
    aggregate?: Maybe<
      { __typename?: "user_aggregate_fields" } & {
        sum?: Maybe<
          { __typename?: "user_sum_fields" } & Pick<
            User_Sum_Fields,
            "corpus_share"
          >
        >
      }
    >
  }
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
    > & {
        loan_requests: Array<
          { __typename?: "loan_requests" } & Pick<
            Loan_Requests,
            | "confirmation_date"
            | "payback_status"
            | "purpose"
            | "risk_calc_result"
            | "status"
            | "created_at"
            | "amount"
          >
        >
      }
  >
}

export type SetUserCashBalanceMutationVariables = Exact<{
  userId: Scalars["uuid"]
  amount: Scalars["float8"]
}>

export type SetUserCashBalanceMutation = { __typename?: "mutation_root" } & {
  user?: Maybe<{ __typename?: "user" } & Pick<User, "balance">>
}

export type ApproveKycMutationVariables = Exact<{
  userId: Scalars["uuid"]
  kycApproved: Scalars["Boolean"]
}>

export type ApproveKycMutation = { __typename?: "mutation_root" } & {
  user?: Maybe<{ __typename?: "user" } & Pick<User, "id" | "kyc_approved">>
}

export type AddSupportersMutationVariables = Exact<{
  supporters: Array<Supporters_Insert_Input>
}>

export type AddSupportersMutation = { __typename?: "mutation_root" } & {
  supporters?: Maybe<
    { __typename?: "supporters_mutation_response" } & {
      returning: Array<
        { __typename?: "supporters" } & Pick<
          Supporters,
          "status" | "supporter_id" | "pledge_amount"
        >
      >
    }
  >
}

export type CreateLoanRequestMutationVariables = Exact<{
  request: Loan_Requests_Insert_Input
}>

export type CreateLoanRequestMutation = { __typename?: "mutation_root" } & {
  insert_loan_requests_one?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "amount" | "purpose" | "status" | "risk_calc_result"
    >
  >
}

export type GetCorpusDataQueryVariables = Exact<{
  statusList: Array<Scalars["loan_request_status"]>
}>

export type GetCorpusDataQuery = { __typename?: "query_root" } & {
  loans: Array<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "risk_calc_result" | "confirmation_date"
    >
  >
  corpus: { __typename?: "user_aggregate" } & {
    aggregate?: Maybe<
      { __typename?: "user_aggregate_fields" } & {
        sum?: Maybe<
          { __typename?: "user_sum_fields" } & Pick<
            User_Sum_Fields,
            "balance" | "corpus_share"
          >
        >
      }
    >
  }
  corpusInvestment: { __typename?: "receivables_aggregate" } & {
    aggregate?: Maybe<
      { __typename?: "receivables_aggregate_fields" } & {
        sum?: Maybe<
          { __typename?: "receivables_sum_fields" } & Pick<
            Receivables_Sum_Fields,
            "amount_total" | "amount_remain" | "amount_received"
          >
        >
      }
    >
  }
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
  loan_requests_by_pk?: Maybe<
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
      | "payback_status"
    > & {
        supporters: Array<
          { __typename?: "supporters" } & Pick<
            Supporters,
            "status" | "supporter_id" | "pledge_amount"
          > & {
              user: { __typename?: "user" } & Pick<
                User,
                "id" | "corpus_share" | "balance"
              >
            }
        >
        user: { __typename?: "user" } & Pick<User, "demographic_info">
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
    > & {
        payables: Array<
          { __typename?: "payables" } & Pick<
            Payables,
            | "pay_frequency"
            | "due_date"
            | "last_paid"
            | "amount_total"
            | "amount_paid"
            | "amount_remain"
          >
        >
      }
  >
}

export type StartLoanMutationVariables = Exact<{
  request_id: Scalars["uuid"]
  payable: Payables_Insert_Input
  receivable: Receivables_Insert_Input
}>

export type StartLoanMutation = { __typename?: "mutation_root" } & {
  update_loan_requests_by_pk?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "status"
    >
  >
  insert_payables_one?: Maybe<
    { __typename?: "payables" } & Pick<Payables, "amount_total" | "amount_paid">
  >
  insert_receivables_one?: Maybe<
    { __typename?: "receivables" } & Pick<
      Receivables,
      "amount_total" | "amount_received" | "status"
    >
  >
}

export type UpdateLoanRequestWithOfferMutationVariables = Exact<{
  requestId: Scalars["uuid"]
  newOffer: Scalars["jsonb"]
}>

export type UpdateLoanRequestWithOfferMutation = {
  __typename?: "mutation_root"
} & {
  update_loan_requests_by_pk?: Maybe<
    { __typename?: "loan_requests" } & Pick<
      Loan_Requests,
      "request_id" | "status" | "risk_calc_result"
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
    >
  >
}

export type GetEdgesByStatusQueryVariables = Exact<{
  status: Scalars["edge_status"]
}>

export type GetEdgesByStatusQuery = { __typename?: "query_root" } & {
  edges: Array<
    { __typename?: "edges" } & Pick<Edges, "trust_amount"> & {
        from_user?: Maybe<
          { __typename?: "user" } & Pick<User, "id" | "user_number" | "name">
        >
        to_user?: Maybe<
          { __typename?: "user" } & Pick<User, "id" | "user_number" | "name">
        >
      }
  >
}

export type InsertEdgeMutationVariables = Exact<{
  edge: Edges_Insert_Input
}>

export type InsertEdgeMutation = { __typename?: "mutation_root" } & {
  insert_edges?: Maybe<
    { __typename?: "edges_mutation_response" } & {
      returning: Array<
        { __typename?: "edges" } & Pick<
          Edges,
          "edge_id" | "status" | "other_user_email" | "trust_amount"
        > & {
            from_user?: Maybe<
              { __typename?: "user" } & Pick<User, "name" | "balance">
            >
            to_user?: Maybe<{ __typename?: "user" } & Pick<User, "name">>
          }
      >
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
  delete_receivables?: Maybe<
    { __typename?: "receivables_mutation_response" } & Pick<
      Receivables_Mutation_Response,
      "affected_rows"
    >
  >
  delete_payables?: Maybe<
    { __typename?: "payables_mutation_response" } & Pick<
      Payables_Mutation_Response,
      "affected_rows"
    >
  >
  delete_encumbrances?: Maybe<
    { __typename?: "encumbrances_mutation_response" } & Pick<
      Encumbrances_Mutation_Response,
      "affected_rows"
    >
  >
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
  delete_loan_risk?: Maybe<
    { __typename?: "loan_risk_mutation_response" } & Pick<
      Loan_Risk_Mutation_Response,
      "affected_rows"
    >
  >
  delete_loan_participants?: Maybe<
    { __typename?: "loan_participants_mutation_response" } & Pick<
      Loan_Participants_Mutation_Response,
      "affected_rows"
    >
  >
  delete_encumbrance_participants?: Maybe<
    { __typename?: "encumbrance_participants_mutation_response" } & Pick<
      Encumbrance_Participants_Mutation_Response,
      "affected_rows"
    >
  >
  delete_loan_requests?: Maybe<
    { __typename?: "loan_requests_mutation_response" } & Pick<
      Loan_Requests_Mutation_Response,
      "affected_rows"
    >
  >
  delete_edges?: Maybe<
    { __typename?: "edges_mutation_response" } & Pick<
      Edges_Mutation_Response,
      "affected_rows"
    >
  >
  delete_user?: Maybe<
    { __typename?: "user_mutation_response" } & Pick<
      User_Mutation_Response,
      "affected_rows"
    >
  >
}

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
    insert_user_one(object: $user) {
      id
      created_at
      email
      user_type
      name
      phone
      demographic_info
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
      user_number
      corpus_share
      kyc_approved
    }
  }
`
export const GetLenderDashboardInfoDocument = gql`
  query GetLenderDashboardInfo($user_id: uuid!) {
    lender: user_by_pk(id: $user_id) {
      balance
      corpus_share
    }
    corpusInvestment: receivables_aggregate(
      where: { loan_request: { status: { _eq: "live" } } }
    ) {
      aggregate {
        sum {
          amount_total
          amount_remain
          amount_received
        }
      }
    }
    corpusShares: user_aggregate {
      aggregate {
        sum {
          corpus_share
        }
      }
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
      loan_requests {
        confirmation_date
        payback_status
        purpose
        risk_calc_result
        status
        created_at
        amount
        purpose
      }
    }
  }
`
export const SetUserCashBalanceDocument = gql`
  mutation SetUserCashBalance($userId: uuid!, $amount: float8!) {
    user: update_user_by_pk(
      pk_columns: { id: $userId }
      _set: { balance: $amount }
    ) {
      balance
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
export const AddSupportersDocument = gql`
  mutation AddSupporters($supporters: [supporters_insert_input!]!) {
    supporters: insert_supporters(objects: $supporters) {
      returning {
        status
        supporter_id
        pledge_amount
      }
    }
  }
`
export const CreateLoanRequestDocument = gql`
  mutation CreateLoanRequest($request: loan_requests_insert_input!) {
    insert_loan_requests_one(object: $request) {
      request_id
      amount
      purpose
      status
      risk_calc_result
    }
  }
`
export const GetCorpusDataDocument = gql`
  query GetCorpusData($statusList: [loan_request_status!]!) {
    loans: loan_requests(where: { status: { _in: $statusList } }) {
      request_id
      risk_calc_result
      confirmation_date
    }
    corpus: user_aggregate(where: { user_type: { _eq: "lender" } }) {
      aggregate {
        sum {
          balance
          corpus_share
        }
      }
    }
    corpusInvestment: receivables_aggregate(
      where: { loan_request: { status: { _eq: "live" } } }
    ) {
      aggregate {
        sum {
          amount_total
          amount_remain
          amount_received
        }
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
    loan_requests_by_pk(request_id: $request_id) {
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
      payback_status
      supporters {
        status
        supporter_id
        pledge_amount
        user {
          id
          corpus_share
          balance
        }
      }
      user {
        demographic_info
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
      payables {
        pay_frequency
        due_date
        last_paid
        amount_total
        amount_paid
        amount_remain
      }
    }
  }
`
export const StartLoanDocument = gql`
  mutation StartLoan(
    $request_id: uuid!
    $payable: payables_insert_input!
    $receivable: receivables_insert_input!
  ) {
    update_loan_requests_by_pk(
      pk_columns: { request_id: $request_id }
      _set: { status: "live" }
    ) {
      request_id
      status
    }
    insert_payables_one(object: $payable) {
      amount_total
      amount_paid
    }
    insert_receivables_one(object: $receivable) {
      amount_total
      amount_received
      status
    }
  }
`
export const UpdateLoanRequestWithOfferDocument = gql`
  mutation UpdateLoanRequestWithOffer($requestId: uuid!, $newOffer: jsonb!) {
    update_loan_requests_by_pk(
      pk_columns: { request_id: $requestId }
      _set: { status: "awaiting_borrower_confirmation" }
      _append: { risk_calc_result: $newOffer }
    ) {
      request_id
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
    }
  }
`
export const GetEdgesByStatusDocument = gql`
  query GetEdgesByStatus($status: edge_status!) {
    edges: edges(where: { status: { _eq: $status } }) {
      from_user {
        id
        user_number
        name
      }
      to_user {
        id
        user_number
        name
      }
      trust_amount
    }
  }
`
export const InsertEdgeDocument = gql`
  mutation InsertEdge($edge: edges_insert_input!) {
    insert_edges(objects: [$edge]) {
      returning {
        edge_id
        status
        other_user_email
        trust_amount
        from_user {
          name
          balance
        }
        to_user {
          name
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
    delete_receivables(where: {}) {
      affected_rows
    }
    delete_payables(where: {}) {
      affected_rows
    }
    delete_encumbrances(where: {}) {
      affected_rows
    }
    delete_supporters(where: {}) {
      affected_rows
    }
    delete_recommendation_risk(where: {}) {
      affected_rows
    }
    delete_loan_risk(where: {}) {
      affected_rows
    }
    delete_loan_participants(where: {}) {
      affected_rows
    }
    delete_encumbrance_participants(where: {}) {
      affected_rows
    }
    delete_loan_requests(where: {}) {
      affected_rows
    }
    delete_edges(where: {}) {
      affected_rows
    }
    delete_user(where: {}) {
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
    GetLenderDashboardInfo(
      variables: GetLenderDashboardInfoQueryVariables
    ): Promise<GetLenderDashboardInfoQuery> {
      return withWrapper(() =>
        client.request<GetLenderDashboardInfoQuery>(
          print(GetLenderDashboardInfoDocument),
          variables
        )
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
    SetUserCashBalance(
      variables: SetUserCashBalanceMutationVariables
    ): Promise<SetUserCashBalanceMutation> {
      return withWrapper(() =>
        client.request<SetUserCashBalanceMutation>(
          print(SetUserCashBalanceDocument),
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
    AddSupporters(
      variables: AddSupportersMutationVariables
    ): Promise<AddSupportersMutation> {
      return withWrapper(() =>
        client.request<AddSupportersMutation>(
          print(AddSupportersDocument),
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
    GetCorpusData(
      variables: GetCorpusDataQueryVariables
    ): Promise<GetCorpusDataQuery> {
      return withWrapper(() =>
        client.request<GetCorpusDataQuery>(
          print(GetCorpusDataDocument),
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
    GetEdgesByStatus(
      variables: GetEdgesByStatusQueryVariables
    ): Promise<GetEdgesByStatusQuery> {
      return withWrapper(() =>
        client.request<GetEdgesByStatusQuery>(
          print(GetEdgesByStatusDocument),
          variables
        )
      )
    },
    InsertEdge(
      variables: InsertEdgeMutationVariables
    ): Promise<InsertEdgeMutation> {
      return withWrapper(() =>
        client.request<InsertEdgeMutation>(print(InsertEdgeDocument), variables)
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
