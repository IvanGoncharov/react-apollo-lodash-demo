import { graphql } from 'react-apollo';
import { graphqlLodash } from 'graphql-lodash';

export function gqlLodash(rawQuery, config) {
  const {query, transform} = graphqlLodash(rawQuery);
  let origProps = (config && config.props) || ((props) => props);

  return (comp) => graphql(query, {...config,
    props: (props) => origProps({
      ...props,
      rawData: props.data,
      data: transform(props.data)
    })
  })(comp);
}
