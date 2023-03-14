from django.shortcuts import render
from .models import Posts
from .serializers import *
from rest_framework import generics, mixins
from rest_framework.authentication import TokenAuthentication
from django.db.models import Count

"""
@ PostsGetSet , PostGETUPDEL Are Created USing generics API
@ PostPageGet Created Using mixins 
@ CommentSet are Created Using mixins API To USe Only the  Post Method 
"""


# /////////////////////////// POSTS ///////////////////////////

# -------------------- GET ALL POSTS AND SET POST --------------------
class PostsGetSet(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    authentication_classes = [TokenAuthentication]

    # -------------------- POST GET UPDATE DELETE  --------------------


class PostGETUPDEL(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    authentication_classes = [TokenAuthentication]

    # -------------------- POST Page GET   --------------------


class PostPageGet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                  generics.GenericAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostPageSerializer

    def get(self, request, pk):
        return self.retrieve(request)

    def put(self, request, pk):
        return self.update(request)

    def delete(self, request, pk):
        return self.destroy(request)

    # --------------------GET Top 5 Posts --------------------


class TopPosts(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Posts.objects.all().order_by("-rate_number")[:5]

    serializer_class = PostsSerializer

    def get(self, request):
        return self.list(request)

    # --------------------GET Hot 5 Posts --------------------GET


class HotPosts(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    def num_comments(self):
        num_comments = Comment.objects.filter(post=self.id).count()
        return num_comments

    queryset = Posts.objects.all() \
                   .annotate(num_comments=Count('comment')) \
                   .order_by('-num_comments')[:5]
    serializer_class = PostsSerializer

    def get(self, request):
        return self.list(request)

    # -------------------- Rate Post --------------------GET


class RatePost(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = PostRates.objects.all()
    serializer_class = RateSerializer

    def post(self, request):
        return self.create(request)

    # -------------------- User Favorites--------------------GET


class SetUserFavorites(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = UserFavorites.objects.all()
    serializer_class = UserFavoritesSerializer

    def post(self, request):
        return self.create(request)

    # -------------------- User Favorites--------------------GET


# /////////////////////////// COMMENT  ///////////////////////////

# -------------------- SET COMMENT  --------------------

class CommentSet(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = SetCommentSerializer

    def post(self, request):
        return self.create(request)

    # -------------------- Delete Update COMMENT  --------------------


class CommentUpDel(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                   generics.GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = SetCommentSerializer

    def get(self, request, pk):
        return self.retrieve(request)

    def put(self, request, pk):
        return self.update(request)

    def delete(self, request, pk):
        return self.destroy(request)


# /////////////////////////// REPLAY ///////////////////////////

# -------------------- SET REPLAY  --------------------


class ReplaySet(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = CommentReplays.objects.all()
    serializer_class = SetReplaySerializer

    def post(self, request):
        return self.create(request)


class ReplayUpDel(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                  generics.GenericAPIView):
    queryset = CommentReplays.objects.all()
    serializer_class = SetReplaySerializer

    def get(self, request, pk):
        return self.retrieve(request)

    def put(self, request, pk):
        return self.update(request)

    def delete(self, request, pk):
        return self.destroy(request)


# -------------------- END REPLAY  --------------------
class PostReport(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = PostReports.objects.all()
    serializer_class = SetPostReportSerializer

    def post(self, request):
        return self.create(request)


class CommentReport(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = CommentReports.objects.all()
    serializer_class = SetCommentReportSerializer

    def post(self, request):
        return self.create(request)


class ReplayReport(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = ReplayReports.objects.all()
    serializer_class = SetReplayReportSerializer

    def post(self, request):
        return self.create(request)

# -------------------- SET Report  --------------------
