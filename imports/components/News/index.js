import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import {
  News as NewsCollection,
  actions as newsActions,
} from '/imports/api/news';
import { isAdmin } from '../../api/users';
import News from './News.jsx';

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
  const newsId = props.match.params.id;
  const { onRemoveNews } = props;
  const { goToCreateNews } = newsActions;
  const newsHandler = Meteor.subscribe('singleNews', newsId);
  const newsWithPhotosHandler = Meteor.subscribe('singleNews', newsId, true);
  const userListHandler = Meteor.subscribe('userList');

  const unit8ArrayToUrl = (image) => {
    const blob = new Blob([image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  if (newsHandler.ready()) {
    let news = NewsCollection.find({ _id: newsId }).fetch();
    const userId = Meteor.userId();

    if (userListHandler.ready()) {
      const users = Meteor.users.find({}).fetch();
      const author = [users.find(user => user._id === news[0].authorId).profile.name];

      if (newsWithPhotosHandler.ready()) {
        news = NewsCollection.find({ _id: newsId }).fetch();

        if (news[0].images && news[0].images.data.length > 1) {
          onData(null, {
            ...props,
            news,
            unit8ArrayToUrl,
            onRemoveNews,
            author,
            isAdmin: isAdmin(userId),
            goToCreateNews,
          });
        }
      } else {
        onData(null, {
          ...props,
          news,
          unit8ArrayToUrl,
          onRemoveNews,
          author,
          isAdmin: isAdmin(userId),
          goToCreateNews,
        });
      }
    } else {
      onData(null, {
        ...props,
        news,
        unit8ArrayToUrl,
        onRemoveNews,
        isAdmin: isAdmin(userId),
        goToCreateNews,
      });
    }
  }
};

export default compose(getTrackerLoader(composer))(News);
