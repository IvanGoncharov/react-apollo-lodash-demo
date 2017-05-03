import React from 'react';
import gql from 'graphql-tag';
import { gqlLodash } from './utils';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
function MyComponent({data: {loading, peopleToFilms}}) {
  if (loading) return (<div> Loading... </div>);
  let people = Object.keys(peopleToFilms);
  return (
    <dl>
        {people.map(name => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>
              {peopleToFilms[name].map(film => (
                <div> {film} </div>
              ))}
            </dd>
          </div>
        ))}
    </dl>
  );
}

const query = gql`
  query {
    peopleToFilms: allPeople @_(get: "people") {
      people @_(
        keyBy: "name"
        mapValues: "filmConnection.films"
      ) {
        name
        filmConnection {
          films @_(map: "title") {
            title
          }
        }
      }
    }
  }
`;

export default gqlLodash(query)(MyComponent);
