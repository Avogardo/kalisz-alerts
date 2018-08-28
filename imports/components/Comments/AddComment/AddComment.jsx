import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardActions,
  Button,
  withStyles,
  Input,
  Snackbar,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import './AddComment.css';

const AddCommentElement = styled(Card)`
  && {
    background-color: #ecf0f1;
    box-shadow: unset;
  
    ${props => !!props.commentcard && css`
      padding: 50px 20px;
      margin-top: 80px;
    `}
  
    ${props => !!props.commentchildrencard && css`
      padding: 25px 20px;
      width: 100%;
    `}
  }
`;
const AddCommentHeader = styled(CardHeader)`
  && {
    padding: 0;
  
    ${props => !!props.commentheader && css`
      margin-bottom: 50px;
    `}
  
    ${props => !!props.commentchildrenheader && css`
      margin-bottom: 20px;
    `}
  }
`;

const styles = {
  actionCard: {
    flexDirection: 'column',
    padding: 0,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: '6px 12px',
    fontSize: 13,
    color: '#777777',
    boxSizing: 'border-box',
    marginBottom: '16px',
    marginLeft: 0,
    marginRight: 0,
    '&:focus': {
      border: '1px solid #ced4da',
    },
  },
  inputMultiline: {
    backgroundColor: '#ffffff',
    padding: 12,
    fontSize: 13,
    color: '#777777',
    boxSizing: 'border-box',
    marginBottom: '16px',
    marginLeft: 0,
    marginRight: 0,
    '&:focus': {
      border: '1px solid #ced4da',
    },
  },
  button: {
    backgroundColor: '#f6214b',
  },
};

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);

    this.state = {
      author: '',
      content: '',
      isSnackBarOpen: false,
      snackBarMessage: '',
      authorError: false,
      contentError: false,
    };
  }

  onAuthorChange({ target: { value } }) {
    this.setState({
      author: value,
    });
  }

  onContentChange({ target: { value } }) {
    this.setState({
      content: value,
    });
  }

  addComment() {
    const { author, content } = this.state;
    const {
      createComment,
      parentId,
      newsId,
      isChildComment,
      onExpand,
    } = this.props;

    if (this.validateForm(author, content)) {
      return;
    }

    createComment(
      author,
      content,
      newsId,
      parentId,
    ).then(() => {
      this.clearState();
      if (isChildComment) {
        onExpand();
      }
      this.setState({
        snackBarMessage: 'Comment has been created',
        isSnackBarOpen: true,
      });
    }).catch((error) => {
      this.setState({
        snackBarMessage: `Error: ${error.message}`,
        isSnackBarOpen: true,
      });
    });
  }

  clearState() {
    this.setState({
      author: '',
      content: '',
    });
  }

  validateForm(author, content) {
    const { isLoggedIn } = this.props;
    let isError = false;

    if (!isLoggedIn) {
      if (author.length < 3) {
        isError = true;
        this.setState({
          authorError: true,
        });
      } else {
        this.setState({
          authorError: false,
        });
      }
    }

    if (content.length < 3) {
      isError = true;
      this.setState({
        contentError: true,
      });
    } else {
      this.setState({
        contentError: false,
      });
    }

    return isError;
  }

  snackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      isSnackBarOpen: false,
    });
  };

  render() {
    const { isLoggedIn, isChildComment } = this.props;
    const {
      actionCard,
      input,
      inputMultiline,
      button,
    } = this.props.classes;
    const {
      author,
      content,
      isSnackBarOpen,
      snackBarMessage,
      authorError,
      contentError,
    } = this.state;

    return (
      <AddCommentElement
        commentcard={isChildComment ? 0 : 1}
        commentchildrencard={isChildComment ? 1 : 0}
      >
        <AddCommentHeader
          commentheader={isChildComment ? 0 : 1}
          commentchildrenheader={isChildComment ? 1 : 0}
          title={<h4 className="add-comment-header">Post Comment</h4>}
        />

        <CardActions className={actionCard}>
          {!isLoggedIn &&
            <Input
              className={input}
              placeholder="Enter Name"
              fullWidth
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={this.onAuthorChange}
              value={author}
              error={authorError}
              disableUnderline={!authorError}
            />
          }

          <Input
            className={[inputMultiline, 'input-multiline'].join(' ')}
            placeholder="Message"
            fullWidth
            multiline
            inputProps={{
              'aria-label': 'Description',
            }}
            onChange={this.onContentChange}
            value={content}
            error={contentError}
            disableUnderline={!contentError}
          />

          <Button
            onClick={this.addComment}
            className={button}
            variant="raised"
            color="secondary"
          >
            Post Comment
          </Button>
        </CardActions>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSnackBarOpen}
          autoHideDuration={3500}
          onClose={this.snackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackBarMessage}</span>}
        />
      </AddCommentElement>
    );
  }
}

AddComment.defaultProps = {
  parentId: '',
  newsId: '',
  isChildComment: false,
  onExpand: () => {},
};

AddComment.propTypes = {
  parentId: PropTypes.string,
  newsId: PropTypes.string,
  onExpand: PropTypes.func,
  isChildComment: PropTypes.bool,
  classes: PropTypes.shape({
    actionCard: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    inputMultiline: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
  createComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};


export default withStyles(styles)(AddComment);
