// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);


        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment,data.data.username);
                    $(`#post-comments-${postId}`).append(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                    $('.comment-text-area').val(''); // to remove text from textarea after it is posted

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment,username){
        // CHANGE :: show the count of zero likes on this comment

        // return $(`<li id="comment-${ comment._id }">
        //                 <p>
                            
        //                     <small>
        //                         <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
        //                     </small>
                            
        //                     ${comment.content}
        //                     <br>
        //                     <small>
        //                         ${username}
        //                     </small>
        //                     <small>
                            
        //                         <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
        //                             0 Likes
        //                         </a>
                            
        //                     </small>

        //                 </p>    

        //         </li>`);

        return $(`<li id="comment-${ comment._id }">
                    <p>
                        <small class="comment-name">
                            ${username} 
                        </small>
                
                        <span class="comment-content-container">
                            ${comment.content}
                        </span>
                        
                        <small class="comment-delete-container">
                            <a class="delete-comment-button" href="/comments/destroy/${ comment._id }"><i class="fa-regular fa-trash-can"></i></a>
                        </small>
                        
                        <!-- display the likes of this comment, if the user is logged in, then show the link to toggle likes, else, just show the count -->
                        <span class="comment-like-container">
                                <a class="toggle-like-button" data-likes="${ comment.likes.length }" href="/likes/toggle/?id=${ comment._id }&type=Comment">
                                ${ comment.likes.length } <i class="fa-regular fa-thumbs-up"></i>
                                </a>
                        </span>
                
                    </p>    
                
                </li>`
        );
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}