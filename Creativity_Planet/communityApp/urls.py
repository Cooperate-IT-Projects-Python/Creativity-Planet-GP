from django.urls import path
from . import views

urlpatterns = [
    # Get All Posts generics
    path('posts/', views.PostsGetSet.as_view()),
    # Get Update Delete Post generics
    path('postgetupdel/<int:pk>', views.PostGETUPDEL.as_view()),
    # Top Post
    path('posttop/', views.TopPosts.as_view()),
    # Post Page
    path('postpage/<int:pk>', views.PostPageGet.as_view()),
    # Comment Set
    path('setcomment/', views.CommentSet.as_view()),
    # Comment Up del
    path('commentupdel/<int:pk>', views.CommentUpDel.as_view()),
    # Replay Set
    path('setreplay/', views.ReplaySet.as_view()),
    # Replay Up del
    path('replayupdel/<int:pk>', views.ReplayUpDel.as_view()),
    # Reports
    path('postreport/', views.PostReport.as_view()),
    path('commentreport/', views.CommentReport.as_view()),
    path('replayreport/', views.ReplayReport.as_view()),
]
