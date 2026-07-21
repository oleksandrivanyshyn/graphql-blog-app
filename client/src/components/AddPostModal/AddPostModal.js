import { useMutation, gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        title
        createdAt
        content
        user {
          name
        }
      }
    }
  }
`;

export default function AddPostModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const [addPost, { data, loading }] = useMutation(CREATE_POST);

  const handleClick = () => {
    setError(null);
    addPost({
      variables: {
        title,
        content,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.postCreate.userErrors.length) {
        setError(data.postCreate.userErrors[0].message);
      } else {
        handleClose();
        setTitle('');
        setContent('');
      }
    }
  }, [data]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick} disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
