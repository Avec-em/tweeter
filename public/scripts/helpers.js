//Function to render tweets from the createTweetElement & prepend them to tweet-container
const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const currentTweet = createTweetElement(tweet)
    // takes return value and appends it to the tweets container
    $('.tweet-container').prepend(currentTweet)
  }
};

//Function to create the Element that hosts the tweet, and to apply
const createTweetElement = function(tweet) {
  let $tweet =         
  `<article class="tweet">
    <header>
      <div>
        <img src="${(tweet.user.avatars)}" alt="Profile Avatar"><p class="user-name"> ${(tweet.user.name)} </p>
      </div>
      <p class="user-ID">${(tweet.user.handle)}</p>
    </header>
    <div class="tweet-body">
      <p>${(tweet.content.text)}</p>
    </div>
    <footer>
      <p>${(tweet.created_at)}</p>
      <p>button test</p>
    </footer>
    </article>`
  return $tweet;
};


const handleFormSubmission = function (event) {
  event.preventDefault();
  let tweetBody =  ($(this).children('textarea').val())
  if (!tweetBody) {
    alert('What are you humming about?!')
    return;
  } else if (tweetBody.length > 140) {
    alert('You are humming about too much!')
    return;
  }
  const data = $(this).serialize();
  $.post('/tweets', data)
  .then(function (response) {
    console.log('response AFTER POST:>> ', response);
    loadTweets()
  })
};

const loadTweets = () => $.get('/tweets', JSON)
.done(function (response) {
  renderTweets(response);
})



//pass it to create tweet & console log data and looks how it is supposed to once it is good to go, then render and prepend.
