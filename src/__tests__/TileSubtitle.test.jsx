import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import {
  CalendarMultipleCheckIcon,
  MessageOutlineIcon,
  AccountOutlineIcon,
} from 'mdi-react';
import TileSubtitle from '../../imports/components/NewsContainer/TileSubtitle/TileSubtitle.jsx';

describe('TileSubtitle', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      index: 0,
      createdAt: new Date(),
    };

    testRenderer = TestRenderer.create(<TileSubtitle {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TileSubtitle {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always render span wrapper', () => {
    expect(testInstance.findByProps({className: 'subtitle-tile'})).toBeDefined();
  });

  it('always render calendar wrappers', () => {
    expect(testInstance.findAllByProps({className: 'tile-subtitle-item'}).length).toBeGreaterThan(0);
  });

  it('always render a CalendarMultipleCheckIcon icon', () => {
    expect(testInstance.findByType(CalendarMultipleCheckIcon)).toBeDefined();
  });

  it('always render a MessageOutlineIcon icon', () => {
    expect(testInstance.findByType(MessageOutlineIcon)).toBeDefined();
  });

  describe('There are no authors', () => {
    it('never render AccountOutlineIcon icon', () => {
      expect(testInstance.findAllByType(AccountOutlineIcon).length).toBe(0);
    });
  });

  describe('There are authors', () => {
    beforeEach(() => {
      props = {
        authors: ['Jakub'],
        index: 0,
        createdAt: new Date(),
      };

      testRenderer = TestRenderer.create(<TileSubtitle {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<TileSubtitle {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('always render AccountOutlineIcon icon', () => {
      expect(testInstance.findByType(AccountOutlineIcon)).toBeDefined();
    });
  });

  describe('Title subtitle component is aside', () => {
    beforeEach(() => {
      props = {
        isAside: true,
        index: 0,
        createdAt: new Date(),
      };

      testRenderer = TestRenderer.create(<TileSubtitle {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<TileSubtitle {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('always render aside span wrapper', () => {
      expect(testInstance.findByProps({className: 'subtitle-tile aside-margin'})).toBeDefined();
    });
  });
});
