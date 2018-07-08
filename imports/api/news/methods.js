import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isAdmin } from '/imports/api/users';
import {
  AddNewsSchema,
  NewsIdentitySchema,
  UpdateNewsSchema,
} from './schema.js';
import News from './News.js';

const throwErrorIfNotAdmin = () => {
  if (!isAdmin()) {
    throw new Meteor.Error(
      'create.news.unauthorized',
      'Only redactor is authorized to carry out this operation',
    );
  }
};

/**
 * Create new news
 * @param   { String }  title    news title
 * @param   { String }  content  news content
 * @param   { Array }   images   images (blobs)
 * @param   { Array }   tags     tags (strings)
 * @return  { String }           news
 */
export const createNews = new ValidatedMethod({
  name: 'news.add',
  validate: AddNewsSchema.validator({ clean: true }),
  run({
    title,
    content,
    images,
    tags,
  }) {
    throwErrorIfNotAdmin();

    const authorId = Meteor.userId();
    const createdAt = new Date();

    return News.insert({
      authorId,
      createdAt,
      title,
      content,
      images,
      tags,
    });
  },
});

/**
 * Remove news
 * @param   { String }   newsId  news id
 * @return  { Boolean }          true if no error
 */
export const removeNews = new ValidatedMethod({
  name: 'news.remove',
  validate: NewsIdentitySchema.validator({ clean: true }),
  run({ newsId }) {
    throwErrorIfNotAdmin();
    return News.remove({ _id: newsId });
  },
});

/**
 * Update news
 * @param   { String }  newsId   news id
 * @param   { String }  title    news title
 * @param   { String }  content  news content
 * @param   { Array }   images   images (blobs)
 * @param   { Array }   tags     tags (strings)
 * @return  { String }           news
 */
export const updateNews = new ValidatedMethod({
  name: 'news.update',
  validate: UpdateNewsSchema.validator({ clean: true }),
  run({
    newsId,
    title,
    content,
    images,
    tags,
  }) {
    throwErrorIfNotAdmin();

    return News.update(newsId, {
      $set: {
        title,
        content,
        images,
        tags,
      },
    });
  },
});