function createIssue(repoName, repoOwner, title, description){
    $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    headers:{
      Authorization: "token " + "ed1a0d9e7a50219a2611df060b9a606244a04133"
    },
    data: JSON.stringify({
      title: title,
      body: description,
    })
  }).done(function(response) {
    console.log("response from github", response);
    handleResponse(response)
  }).fail(function(error){
    console.log("error from github", error);
    handleError(error)
  });
}

class GithubInteractor{
  constructor(token){
    this.token = token
  }
}

function handleResponse(githubResponse){
  $('<a/>', {
   id: 'issue_url',
   href: githubResponse.url,
   text: githubResponse.title
}).appendTo('#issue');

}

function handleError(githubError){
  console.log("Post error: Unauthorized")
}

function submitForm(event){
  console.log("submiting form!");
  event.preventDefault();
  var repoName = $('#repoName').val(),
      repoOwner = $('#repoOwner').val(),
      title = $('#title').val(),
      description = $('#body').val()
  createIssue(repoName, repoOwner, title, description)
}
$('#githubForm').submit(submitForm)
