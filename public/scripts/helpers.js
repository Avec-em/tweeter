const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Emily",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@em" },
    "content": {
      "text": "I'm not superstitious, but I am a little stitious"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function(tweet) {
  // loops through tweets
  for (const tweet of tweetData) {
    // calls createTweetElement for each tweet
    const currentTweet = createTweetElement(tweet)
    // takes return value and appends it to the tweets container
    $('.tweet-container').prepend(currentTweet)

  }
};


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

    renderTweets(tweetData)

const handleFormSubmission = function (event) {
  event.preventDefault();
  const data = $(this).serialize();
  $.post('/tweets', data, function() {
    console.log(data)
  })
};

//pass it to create tweet & console log data and looks how it is supposed to once it is good to go, then render and prepend.
