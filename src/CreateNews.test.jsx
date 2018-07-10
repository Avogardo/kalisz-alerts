import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import CreateNews from '../imports/components/CreateNews/CreateNews.jsx';
import {
  CardActions,
  TextField,
} from '@material-ui/core';

describe("Create news", () => {
  let testRenderer, testInstance;

  beforeEach(() => {
    testRenderer = TestRenderer.create(<CreateNews />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateNews />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a form', () => {
    expect(testInstance.findAllByType('form')).toHaveLength(1)
  });

  it('always renders a CardActions', () => {
    expect(testInstance.findAllByType(CardActions)).toHaveLength(1)
  });

  it('always renders TextField', () => {
    expect(testInstance.findAllByType(TextField)).toHaveLength(3)
  });
});
