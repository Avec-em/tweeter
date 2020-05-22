//Function to render tweets from the createTweetElement & prepend them to tweet-container
const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const currentTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container

    $('.tweet-container').prepend(currentTweet);
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
      <p>${escape(tweet.content.text)}</p>
    </div>
    <footer>  
      <p>${moment((tweet.created_at)).fromNow()}</p>
      <span class="material-icons"> favorite_border outlined_flag repeat</span>
    </footer>
    </article>`
  return $tweet;
};


const handleFormSubmission = function (event) {
  event.preventDefault();
  let tweetBody =  ($(this).children('textarea').val())
  if (!tweetBody) {
    $('.error-message').text('This is the opposite of TMI... gimme something!')
    $('.error-message').slideDown("slow")
    return;
  } else if (tweetBody.length > 140) {
    $('.error-message').text('TMI - 140 characters max plz!')
    $('.error-message').slideDown("slow")
    return;
  }
  $('.error-message').slideUp("slow")
  const data = $(this).serialize();
  $.post('/tweets', data)
  .then(function (response) {
    $('form')[0].reset();
    $('.counter').text(140);
    loadTweets();
  })
};

const loadTweets = () => $.get('/tweets', JSON)
.done(function (response) {
  $('.tweet-container').empty();
  renderTweets(response);
})

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
//pass it to create tweet & console log data and looks how it is supposed to once it is good to go, then render and prepend.
