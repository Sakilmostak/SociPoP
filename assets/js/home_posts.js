{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        //fetching the post form by its id
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            //prevent the element from doing its default function
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    newPost = newPostDom(data.data.post, data.data.username);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                    $('#post-text-area').val(''); // to remove text from textarea after it is posted

                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post, username){

        // return $(`<li id="post-${post._id}">
        //             <p>
        //                 <small class="post-name">
        //                     ${username}
        //                 </small>
        //                 <span class="content-container">${post.content}</span> 
        //                 <small class="delete-container">
        //                     <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-regular fa-trash-can"></i></a>
        //                 </small>
                        
                
        //                 <!-- display the likes of this post, if the user is logged in, then show the link to toggle likes, else, just show the count -->
        //                 <span class="like-container">
        //                         <a class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
        //                             ${post.likes.length} <i class="fa-regular fa-thumbs-up"></i>
        //                         </a>
        //                 </span>

        //             </p>
        //             <div id="post-comments">
        //                     <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
        //                         <input type="text" name="content" placeholder="Type Here to add comment..." required>
        //                         <input type="hidden" name="post" value="${post._id}" >
        //                         <input type="submit" value="Add Comment">
        //                     </form>
                
        //                 <div class="post-comments-list">
        //                     <ul id="post-comments-${post._id}">
        //                     </ul>
        //                 </div>
        //             </div>
        //         </li>
        // `)

        return $(`<li id="post-${post._id}">
                    <p>
                        <small class="post-name">
                            ${username}
                        </small>
                        <span class="content-container">${post.content}</span>
                        
                        <small class="delete-container">
                            <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-regular fa-trash-can"></i></a>
                        </small>
                        
                
                        <!-- display the likes of this post, if the user is logged in, then show the link to toggle likes, else, just show the count -->
                        <span class="like-container">
                            <a class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
                                ${post.likes.length} <i class="fa-regular fa-thumbs-up"></i>
                            </a>
                        </span>
                
                    </p>
                    <div class="post-comments">
                            <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" class="comment-text-area" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${post._id}" >
                                <input type="submit" value="Add Comment">
                            </form>
                
                
                        <div id="post-comments-list-${post._id}">
                            <ul id="post-comments-${post._id}">
                            </ul>
                        </div>
                    </div>
                </li>`);
    }


    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}

    