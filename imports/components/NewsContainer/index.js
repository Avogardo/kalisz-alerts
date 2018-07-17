import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { News as NewsCollection } from '/imports/api/news';
import NewsContainer from './NewsContainer.jsx';

const getTrackerLoader = composer =>
  (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() =>
      Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = composer(props, onData, env);
      }));

    return () => {
      if (typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };

const composer = (props, onData) => {
  const topNewsHandler = Meteor.subscribe('recentNewsWithLimit', 4);
  const userListHandler = Meteor.subscribe('userList');

  if (topNewsHandler.ready()) {
    const options = {
      limit: props.enterContainer ? 3 : 4,
    };
    const topNews = NewsCollection.find({}, options).fetch();

    onData(null, {
      topNews,
    });

    if (userListHandler.ready()) {
      const users = Meteor.users.find({}).fetch();
      const authors = topNews.map(news =>
        users.find(user => user._id === news.authorId).profile.name);

      onData(null, {
        topNews,
        authors,
      });
    }
  } else {
    onData(null, {});
  }
};

export default compose(getTrackerLoader(composer))(NewsContainer);
