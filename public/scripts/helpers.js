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
  // creates tweet HTML with input from client
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
  // stops tweet from posting after submission
  event.preventDefault();
  //checks if tweet meets requirments re: length and input
  let tweetBody =  ($(this).children('textarea').val())
  if (!tweetBody) {
    //error for nothing input into textarea
    $('.error-message').text('This is the opposite of TMI... gimme something!')
    $('.error-message').slideDown("slow")
    return;
  } else if (tweetBody.length > 140) {
    //error for too much text in text area
    $('.error-message').text('TMI - 140 characters max plz!')
    $('.error-message').slideDown("slow")
    return;
  }
  //if all goes well, no error message
  $('.error-message').slideUp("slow")
  const data = $(this).serialize();
  //post tweet to top of feed
  $.post('/tweets', data)
  .then(function (response) {
    //clear form and reset counter
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
  //ensure HTML will not be read after submission
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
