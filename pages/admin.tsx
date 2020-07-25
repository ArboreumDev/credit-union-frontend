import { gql, useQuery } from '@apollo/client';
import withData from '../config';


const query = gql`
	query {
	  users {
	    id
	    name
	  }
	}
`

const Index = ({ users } ) => {
  return (
    <Query    // <- Wrapping the main component with Query component from react-apollo
      query={ query }
      fetchPolicy={ 'cache-and-network' }
    >
      {({ loading, data, error }) => {
        if(error) {
          return (<div>Error..</div>);
        }
        return (
          <div>
            <h1>My users </h1>
            {
                users.map(user => (<p>user.name</p>))
            }
          </div>
        );
      }}
    </Query>
  );
};

export default withData(Index)