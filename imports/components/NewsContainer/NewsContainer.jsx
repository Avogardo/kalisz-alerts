import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import {
  AccountOutlineIcon,
  CalendarMultipleCheckIcon,
  MessageOutlineIcon,
} from 'mdi-react';
import './NewsContainer.css';

const formatDate = (date) => {
  const monthNamesEng = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNamesEng[monthIndex]}, ${year}`;
};

const styles = {
  newsCard: {
    padding: 20,
    marginTop: 50,
  },
  headerCard: {
    padding: '0 25px',
    backgroundColor: '#000000',
    marginBottom: 20,
  },
};

class NewsContainer extends Component {
  static renderImage(news) {
    const blob = new Blob([news.enterImage.data.image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return (
      <div>
        <img className="enter-news-image" src={imageUrl} alt={news.enterImage.data.name} />
      </div>
    );
  }

  render() {
    const { topNews, authors } = this.props;
    const {
      newsCard,
      headerCard,
    } = this.props.classes;

    return (
      <section>
        {topNews.length ?
          <Card className={newsCard}>
            <CardHeader className={headerCard} title={<span className="header-card-title">Latest News</span>} />

            {topNews.map((news, index) => (
              <Card key={news._id}>
                <GridList cellHeight={250} cols={1}>
                  <GridListTile className="enter-news-tile" key={news._id}>
                    {NewsContainer.renderImage(news)}
                  </GridListTile>
                </GridList>
                <CardHeader
                  title={news.title}
                  subheader={
                    <span className="subtitle-tile">
                      {authors.length ?
                        <Fragment>
                          <AccountOutlineIcon className="user-icon" size={17} /> {authors[index]}
                        </Fragment>
                        :
                        ''
                      }
                      <CalendarMultipleCheckIcon
                        className="middle-icon"
                        size={17}
                      /> {formatDate(news.createdAt)}
                      <MessageOutlineIcon className="middle-icon" size={17} /> 06 Comments
                    </span>
                  }
                />
                <CardContent>
                  <Typography component="p">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    , sed do eiusmod tempor incididunt.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Card>
          :
          ''
        }
      </section>
    );
  }
}

NewsContainer.defaultProps = {
  topNews: [],
  authors: [],
};

NewsContainer.propTypes = {
  topNews: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    enterImage: PropTypes.shape({
      data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.instanceOf(Uint8Array).isRequired,
      }),
    }).isRequired,
  }).isRequired),
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  classes: PropTypes.shape({
    newsCard: PropTypes.string.isRequired,
    headerCard: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(NewsContainer);
