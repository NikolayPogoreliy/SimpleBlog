//var script = document.createElement('script');
//    script.src = 'static/js/core.js';
//    document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function(){

    $('.prevented').on('click', function(event){
        event.preventDefault();
    });

    $('.all-users-link').on('click',function(e){
        e.preventDefault();
        getAllUsers(e.target.dataset['url']);
    });

    $('.all-posts-link').on('click',function(e){
        e.preventDefault();
        getAllPosts(e.target.dataset['url'],allPostsCallback);
    });
    $('.btn-add-post').on('click', function(e){
        e.preventDefault();
        getPostCreationForm(e.currentTarget.dataset['url']);
    })
    $('#result-row').on('click', '.user-retrieve', function(e){
        e.preventDefault();
        retrieveUser(e.currentTarget.dataset['url']);
    });

    $('#result-row').on('click', '.post-retrieve', function(e){
        e.preventDefault();
        retrievePost(e.currentTarget.dataset['url']);
    });

    getAllPosts('/blog/', homePageCallback);
});

function getAllPosts(url, callback){
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: callback
    });
}