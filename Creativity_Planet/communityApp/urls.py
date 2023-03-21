from django.urls import path
from . import views

urlpatterns = [
    # //// Posts API ////
    # Get All Posts generics
    path('posts/', views.PostsGetSet.as_view()),
    # Create Post
    path('createpost/', views.create_post),
    # Get Update Delete Post generics
    path('postgetupdel/<int:pk>', views.PostGETUPDEL.as_view()),
    # Top Post
    path('posttop/', views.TopPosts.as_view()),
    # Hot Post
    path('posthot/', views.HotPosts.as_view()),
    # Rate Post
    path('ratepost/', views.RatePost.as_view()),
    # Like Post
    path('likepost/<int:pk>', views.post_likes),
    # Set User Favorites (Follow)
    path('postfollow/', views.SetUserFavorites.as_view()),
    # Post Page
    path('postpage/<int:pk>', views.PostPageGet.as_view()),
    # //// Comments API ////
    # CREATE COMMENT
    path('createcomment/<int:pk>', views.set_comment),
    # Comment Set
    path('setcomment/', views.CommentSet.as_view()),
    # Comment Up del
    path('commentupdel/<int:pk>', views.CommentUpDel.as_view()),
    # //// REPLAY API ////
    # Replay Set
    path('setreplay/', views.ReplaySet.as_view()),
    # Replay Up del
    path('replayupdel/<int:pk>', views.ReplayUpDel.as_view()),
    # //// REPORTS API ////
    # Reports
    path('postreport/', views.PostReport.as_view()),
    path('commentreport/', views.CommentReport.as_view()),
    path('replayreport/', views.ReplayReport.as_view()),
]
