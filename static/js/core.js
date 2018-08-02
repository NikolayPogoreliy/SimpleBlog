function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}
function createTagElement(tagname, cls='', id='', extraData=''){
    var ele = document.createElement(tagname);
    if (cls.length) {ele.className = cls;}
    if (id.length) {ele.id = id;}
    if (extraData.length) {
        extraData = JSON.parse(extraData);
        for(var data in extraData){
            if (~data.indexOf('data')){
                ele.dataset[data.substr(5)] = extraData[data];
            } else {
                ele[data] = extraData[data];
            }
        }
    }
    return ele;
}

function getAllUsers(url){
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: allUsersCallback
    });
}

function retrieveUser(url){
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: retrieveUserCallback
    });
}

function getAllPosts(url){
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: homePageCallback
    });
}

function retrievePost(url){
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: retrievePostCallback
    });
}
function updatePost(e){
    var url = e.currentTarget.dataset['url'];
    var data = {
        title: document.getElementById('title-input').value,
        text: document.getElementById('text-input').value,
        is_published: document.getElementById('is-published').checked,
    }
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
        dataType: 'json', // Set datatype - affects Accept header
        headers: {
            "X-HTTP-Method-Override": "PUT",
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")
        },
        success: retrievePostCallback

    });
}

function createPost(e){
    var url = e.currentTarget.dataset['url'];
    var data = {
        title: document.getElementById('title-input').value,
        text: document.getElementById('text-input').value,
        is_published: document.getElementById('is-published').checked,
        author: author_id
    }
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        dataType: 'json', // Set datatype - affects Accept header
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json",

        },
        success: retrievePostCallback

    });
}

function getTargetContainer(id){
    var targetContainer = document.getElementById(id);
    targetContainer.innerHTML = '';
    return targetContainer;
}

function setAsideHeading(targetContainer, text){
    var headingContainer = document.createElement('div');
    headingContainer.className = 'col col-sm-3';
    var heading = document.createElement('h2');
    heading.innerHTML = text
    headingContainer.appendChild(heading);
    targetContainer.appendChild(headingContainer);
}

function allUsersCallback(data){
    var parentContainer = getTargetContainer('result-row');
    container = createTagElement('div', 'col-12', 'all-posts-title-container');
    title = createTagElement('h2','all-posts-title ');
    title.innerHTML = "All Authors";
    container.appendChild(title);
    parentContainer.appendChild(container);

    data.forEach(function(item){
        var outerContainer = createTagElement('div', 'col-10 offset-sm-1 row align-items-center all-posts-container')
        var container = createTagElement('div','col-10');
        var p = createTagElement('p', 'created-author');
        var span = createTagElement('span', 'created-span');
        span.innerHTML = item.posts.length +" posts";
        p.appendChild(span);
        container.appendChild(p);

        p = createTagElement('p', 'post-title');
        link = createTagElement('a', 'prevented user-retrieve','','{"href":"#"}');
        link.dataset['url'] = item.url;
        link.dataset['method'] = "GET";
        link.innerHTML = item.first_name + ' ' + item.last_name;
        p.appendChild(link);
        container.appendChild(p);
        outerContainer.appendChild(container);
        container = createTagElement('div', 'col-2 ml-auto');
        var img = createTagElement('img','','','{"src":"/static/img/small_img.jpg", "alt": "some img"}');
        container.appendChild(img);
        outerContainer.appendChild(container);
        parentContainer.appendChild(outerContainer);
    });
}

function allPostsCallback(data){
    var parentContainer = getTargetContainer('result-row');
    container = createTagElement('div', 'col-12', 'all-posts-title-container');
    title = createTagElement('h2','all-posts-title ');
    title.innerHTML = "All Articles";
    container.appendChild(title);
    parentContainer.appendChild(container);

    function repeatingContent(item){
        var outerContainer = createTagElement('div', 'col-10 offset-sm-1 row align-items-center all-posts-container')
        var container = createTagElement('div','col-10');
        var p = createTagElement('p', 'created-author');
        var span = createTagElement('span', 'created-span');
        span.innerHTML = new Date(item.created).toDateString() +"&nbsp;/&nbsp;";
        p.appendChild(span);
        var link = createTagElement('a', 'prevented user-retrieve','', '{"href":"#"}');
        link.dataset['url'] = item.author.url;
        link.dataset['method'] = "GET";
        span = createTagElement('span', 'author-span');
        span.innerHTML = item.author.first_name + ' ' + item.author.last_name;
        link.appendChild(span);
        p.appendChild(link);
        container.appendChild(p);
        p = createTagElement('p', 'post-title');
        link = createTagElement('a', 'prevented post-retrieve','','{"href":"#"}');
        link.dataset['url'] = item.url;
        link.dataset['method'] = "GET";
        link.innerHTML = item.title;
        p.appendChild(link);
        container.appendChild(p);
        outerContainer.appendChild(container);
        container = createTagElement('div', 'col-2 ml-auto');
        var img = createTagElement('img','','','{"src":"/static/img/small_img.jpg", "alt": "some img"}');
        container.appendChild(img);
        outerContainer.appendChild(container);
        parentContainer.appendChild(outerContainer);
    }
    try{
        data.forEach(repeatingContent);
    } catch(e) {
        repeatingContent(data);
    }


}

function retrieveUserCallback(data){
    var parentContainer = getTargetContainer('result-row');

    container = createTagElement('div', 'col-12', 'all-posts-title-container');
    title = createTagElement('h2','all-posts-title ');
    title.innerHTML = "All posts of&nbsp;";
    link = createTagElement('a','prevented user-retrieve','', '{"href":"#"}');
    link.dataset['url'] = data.url;
    link.dataset['method'] = "GET";
    link.innerText = data.first_name + ' ' + data.last_name;
    title.appendChild(link);
    container.appendChild(title);
    parentContainer.appendChild(container);

    data.posts.forEach(function(item){
        var outerContainer = createTagElement('div', 'col-10 offset-sm-1 row align-items-center all-posts-container')
        var container = createTagElement('div','col-10');
        var p = createTagElement('p', 'created-author');
        var span = createTagElement('span', 'created-span');
        span.innerHTML = 'Created:&nbsp;'+ new Date(item.created).toString();
        p.appendChild(span);
        container.appendChild(p);

        p = createTagElement('p', 'post-title');
        link = createTagElement('a', 'prevented post-retrieve','','{"href":"#"}');
        link.dataset['url'] = item.url;
        link.dataset['method'] = "GET";
        link.innerHTML = item.title;
        p.appendChild(link);
        container.appendChild(p);
        outerContainer.appendChild(container);
        container = createTagElement('div', 'col-2 ml-auto');
        var img = createTagElement('img','','','{"src":"/static/img/small_img.jpg", "alt": "some img"}');
        container.appendChild(img);
        outerContainer.appendChild(container);
        parentContainer.appendChild(outerContainer);
    });
}


function retrievePostCallback(data){
    var parentContainer = getTargetContainer('result-row');
    var imgContainer = createTagElement('div', 'col-6', 'last-post-img');
    var img = document.createElement('img');
    img.src = '/static/img/big_med_img.jpg';
    img.alt = 'some img';
    imgContainer.appendChild(img);
    parentContainer.appendChild(imgContainer);

    var postContainer = createTagElement('div','col-6', 'last-post' );

    var title = createTagElement('h1','last-post-title', 'editable-title');
    title.innerHTML = data.title;
    postContainer.appendChild(title);

    var p = createTagElement('p', 'created-author');
    var span = createTagElement('span', 'created-span');
    span.innerHTML = "Created: " + new Date(data.created).toDateString();
    p.appendChild(span);
    postContainer.appendChild(p);

    var p = createTagElement('p', 'created-author');
    var span = createTagElement('span', 'author-span');
    span.innerHTML = "By: ";
    var link = createTagElement('a', 'prevented user-retrieve','', '{"href":"#"}');
    link.dataset['url'] = data.author.url;
    link.dataset['method'] = "GET";
    link.innerHTML = data.author.first_name + ' ' + data.author.last_name;
    span.appendChild(link);
    p.appendChild(span);
    postContainer.appendChild(p);

    if(user==data.author.username) {
        var container = createTagElement('div', 'col-12 row');
        var button = createTagElement('button', 'btn btn-block btn-sm pre-update','pre-update','{"innerText":"EDIT"}');
        button.dataset['url'] = data.url+'update/';
        button.addEventListener('click', preUpdatePost);
        container.appendChild(button);
        postContainer.appendChild(container);
    }

    parentContainer.appendChild(postContainer);

    var container = createTagElement('div', 'col-12 row')
    postContainer = createTagElement('div','col-10 offset-sm-1 row');
    var textWrapper = createTagElement('div','col-12','editable-text');
    textWrapper.innerHTML = data.text;
    postContainer.appendChild(textWrapper);
    container.appendChild(postContainer);
    parentContainer.appendChild(container);
}


function homePageCallback(data){
    var parentContainer = getTargetContainer('result-row');
    var imgContainer = createTagElement('div', 'col-8', 'last-post-img');
    var img = document.createElement('img');
    img.src = '/static/img/big_img.jpg';
    img.alt = 'some img';
    imgContainer.appendChild(img);
    parentContainer.appendChild(imgContainer);
    var postContainer = createTagElement('div','col-4', 'last-post' );
    var title = createTagElement('h1','last-post-title');
    title.innerHTML = data[0].title;
    var text = createTagElement('p','last-post-text');
    t = data[0].text;
    text.innerHTML = t.substr(0, 100)+" ...";
    var link = createTagElement('a', 'prevented post-retrieve last-post-link', '','{"href":"#", "innerHTML": "READ MORE >"}');
    link.dataset['url'] =data[0].url;
    link.dataset['method'] = "GET";

    postContainer.appendChild(title);
    postContainer.appendChild(text);
    postContainer.appendChild(link);
    parentContainer.appendChild(postContainer);
    container = createTagElement('div', 'col-12');
    title = createTagElement('h2','all-posts-title');
    title.innerHTML = "Top Articles";
    container.appendChild(title);
    parentContainer.appendChild(container);
//    parentContainer.appendChild(container);
    var outerContainer = createTagElement('div', 'col-12 row top-posts-container align-items-end')
    for (var i=0; i < 3; i++){
        var ind = Math.floor(Math.random() * (data.length - 1)) +1;
        container = createTagElement('div', 'col col-4 top-story');
        link = createTagElement('a', 'prevented post-retrieve','', '{"href":"#"}');
        link.dataset['url'] = data[ind].url;
        link.dataset['method'] = "GET";
        var title = createTagElement("h3", 'random-post-title');

        title.innerHTML=data[ind].title;
        var img = createTagElement('img','','','{"src":"/static/img/med_img.jpg"}');
        link.appendChild(title);
        link.appendChild(img);
        container.appendChild(link);
        outerContainer.appendChild(container);
    }
    parentContainer.appendChild(outerContainer);
    container = createTagElement('div', 'col-12', 'all-posts-title-container');
    title = createTagElement('h2','all-posts-title ');
    title.innerHTML = "All Articles";
    container.appendChild(title);
    parentContainer.appendChild(container);

    data.forEach(function(item){
        var outerContainer = createTagElement('div', 'col-10 offset-sm-1 row align-items-center all-posts-container')
        var container = createTagElement('div','col-10');
        var p = createTagElement('p', 'created-author');
        var span = createTagElement('span', 'created-span');
        span.innerHTML = new Date(item.created).toDateString() +"&nbsp;/&nbsp;";
        p.appendChild(span);
        var link = createTagElement('a', 'prevented user-retrieve','', '{"href":"#"}');
        link.dataset['url'] = item.author.url;
        link.dataset['method'] = "GET";
        span = createTagElement('span', 'author-span');
        span.innerHTML = item.author.first_name + ' ' + item.author.last_name;
        link.appendChild(span);
        p.appendChild(link);
        container.appendChild(p);
        p = createTagElement('p', 'post-title');
        link = createTagElement('a', 'prevented post-retrieve','','{"href":"#"}');
        link.dataset['url'] = item.url;
        link.dataset['method'] = "GET";
        link.innerHTML = item.title;
        p.appendChild(link);
        container.appendChild(p);
        outerContainer.appendChild(container);
        container = createTagElement('div', 'col-2 ml-auto');
        var img = createTagElement('img','','','{"src":"/static/img/small_img.jpg", "alt": "some img"}');
        container.appendChild(img);
        outerContainer.appendChild(container);
        parentContainer.appendChild(outerContainer);
    });
}

function preUpdatePost(e){
    url = e.currentTarget.dataset['url'];
    titleElement = document.getElementById('editable-title');
    title = titleElement.innerHTML;
    textElement = document.getElementById('editable-text');
    text = textElement.innerHTML;
    titleInput = createTagElement('input', 'form-control','title-input','{"name":"title-input", "type":"text"}');
    titleInput.value = title;
    textInput = createTagElement('textarea','form-control','text-input','{"name":"text-input", "rows":"30"}');
    textInput.value = text;
    titleElement.parentNode.replaceChild(titleInput, titleElement);
    textElement.parentNode.replaceChild(textInput, textElement);
    button = document.getElementById('pre-update');
    button.parentNode.removeChild(button);
    var container = createTagElement('div','col-10 offset-sm-1');
    var chbx = createTagElement('input','form-check-input', 'is-published','{"type":"checkbox"}');
    chbx.checked = true;
    var label = createTagElement('label','form-check-label','','{"for":"is-published", "innerText": "Published"}');
    container.appendChild(chbx);
    container.appendChild(label);
    var parentContainer = document.getElementById('result-row');
    parentContainer.appendChild(container);
    var container = createTagElement('div','col-10 offset-sm-1');
    var button = createTagElement('button','btn btn-primary btn-block','update-btn','{"innerText":"UPDATE"}');
    button.dataset['url'] = url;
    button.addEventListener('click', updatePost);
    container.appendChild(button);
    parentContainer.appendChild(container);
}

function getPostCreationForm(url){
    var parentContainer = getTargetContainer('result-row');
    var container = createTagElement('div', 'col-10 offset-sm-1 form-group')
    var input = createTagElement('input', 'form-control','title-input','{"name":"title-input", "type":"text", "placeholder":"Title"}');
    container.appendChild(input);
    parentContainer.appendChild(container);

    var container = createTagElement('div', 'col-10 offset-sm-1 form-group')
    var input = createTagElement('textarea','form-control','text-input','{"name":"text-input", "rows":"20"}');
    var label = createTagElement('label','form-check-label','','{"for":"text-input", "innerText": "Text"}');
    container.appendChild(input);
    container.appendChild(label);
    parentContainer.appendChild(container);

    var container = createTagElement('div', 'col-10 offset-sm-1 form-group')
    var chbx = createTagElement('input','form-check-input', 'is-published','{"type":"checkbox"}');
    chbx.checked = true;
    var label = createTagElement('label','form-check-label','','{"for":"is-published", "innerText": "Published"}');
    container.appendChild(chbx);
    container.appendChild(label);
    parentContainer.appendChild(container);

    var container = createTagElement('div', 'col-10 offset-sm-1 form-group')
    var button = createTagElement('button','btn btn-primary btn-block','update-btn','{"innerText":"CREATE"}');
    button.dataset['url'] = url;
    button.addEventListener('click', createPost);
    container.appendChild(button);
    parentContainer.appendChild(container);

}