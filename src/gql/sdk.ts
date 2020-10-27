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
  jsonb: any
  timestamptz: any
  uuid: any
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

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root"
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>
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
export type Mutation_RootUpdate_UserArgs = {
  _append?: Maybe<User_Append_Input>
  _delete_at_path?: Maybe<User_Delete_At_Path_Input>
  _delete_elem?: Maybe<User_Delete_Elem_Input>
  _delete_key?: Maybe<User_Delete_Key_Input>
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
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
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

/** subscription root */
export type Subscription_Root = {
  __typename?: "subscription_root"
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
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
  created_at: Scalars["timestamptz"]
  demographic_info?: Maybe<Scalars["jsonb"]>
  email: Scalars["String"]
  id: Scalars["uuid"]
  name: Scalars["String"]
  phone: Scalars["String"]
  updated_at: Scalars["timestamptz"]
}

/** columns and relationships of "user" */
export type UserDemographic_InfoArgs = {
  path?: Maybe<Scalars["String"]>
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
  count?: Maybe<Scalars["Int"]>
  max?: Maybe<User_Max_Fields>
  min?: Maybe<User_Min_Fields>
}

/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>
  distinct?: Maybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<User_Max_Order_By>
  min?: Maybe<User_Min_Order_By>
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

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>
  _not?: Maybe<User_Bool_Exp>
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  demographic_info?: Maybe<Jsonb_Comparison_Exp>
  email?: Maybe<String_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  phone?: Maybe<String_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
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

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  created_at?: Maybe<Scalars["timestamptz"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: "user_max_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: "user_min_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
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
  created_at?: Maybe<Order_By>
  demographic_info?: Maybe<Order_By>
  email?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  phone?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
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
  CreatedAt = "created_at",
  /** column name */
  DemographicInfo = "demographic_info",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Phone = "phone",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  created_at?: Maybe<Scalars["timestamptz"]>
  demographic_info?: Maybe<Scalars["jsonb"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["uuid"]>
  name?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  updated_at?: Maybe<Scalars["timestamptz"]>
}

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  DemographicInfo = "demographic_info",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Phone = "phone",
  /** column name */
  UpdatedAt = "updated_at",
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
      "id" | "created_at" | "email" | "name" | "phone" | "demographic_info"
    >
  >
}

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllUsersQuery = { __typename?: "query_root" } & {
  user: Array<
    { __typename?: "user" } & Pick<
      User,
      "id" | "created_at" | "email" | "name" | "phone" | "demographic_info"
    >
  >
}

export const CreateUserDocument = gql`
  mutation CreateUser($user: user_insert_input!) {
    insert_user_one(object: $user) {
      id
      created_at
      email
      name
      phone
      demographic_info
    }
  }
`
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    user {
      id
      created_at
      email
      name
      phone
      demographic_info
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
  }
}
export type Sdk = ReturnType<typeof getSdk>
