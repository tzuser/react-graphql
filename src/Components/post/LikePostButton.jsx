import React, { Component } from 'react';
import { GrayButton, RedButton, DisabledButton } from 'com_/IconButton.jsx';
import { graphql, Mutation, Query } from 'react-apollo';
import { Button, Icon } from 'gestalt';
import gql from 'graphql-tag';
import { errorReply } from '_public';
import likesQuery from 'gql_/likes.gql';
import initSelf from 'com_/InitSelf';

const LIKE = gql`
  mutation like($post: ID!, $isLike: Boolean!) {
    like(post: $post, isLike: $isLike)
  }
`;

@initSelf()
@graphql(
  gql`
    query IsLike($id: ID!) {
      isLike(id: $id)
    }
  `,
  {
    options: props => {
      return {
        variables: {
          id: props.postID,
        },
        //fetchPolicy: "network-only"
      };
    },
  }
)
class LikeButton extends Component {
  state = { addLoading: false };
  render() {
    let {
      postID,
      push,
      data: { isLike, refetch, loading },
      selfUser,
    } = this.props;
    console.log(postID, '//');
    let Btn = isLike ? GrayButton : RedButton;
    if (loading || this.state.addLoading) Btn = DisabledButton;
    return (
      <Mutation mutation={LIKE}>
        {like => (
          <Btn
            onClick={() => {
              this.setState({ addLoading: true });
              like({
                variables: { post: postID, isLike: !isLike },
                refetchQueries: [
                  {
                    query: likesQuery,
                    variables: {
                      first: 20,
                      userName: selfUser && selfUser.name,
                    },
                  },
                ],
              })
                .then(data => {
                  refetch()
                    .then(err => {
                      this.setState({ addLoading: false });
                    })
                    .catch(err => {
                      this.setState({ addLoading: false });
                    });
                })
                .catch(error => {
                  this.setState({ addLoading: false });
                  errorReply({ error, push });
                });
            }}
          >
            <Icon size={14} accessibilityLabel="喜欢" icon="heart" />
            {isLike ? '不喜欢' : '喜欢'}
          </Btn>
        )}
      </Mutation>
    );
  }
}

export default LikeButton;
