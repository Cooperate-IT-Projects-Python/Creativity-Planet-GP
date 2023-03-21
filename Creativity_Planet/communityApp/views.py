from django.shortcuts import render
from .models import Posts
from .serializers import *
from rest_framework import generics, mixins
from rest_framework.authentication import TokenAuthentication
from django.db.models import Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.shortcuts import get_object_or_404

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

    # --------------------Create POST --------------------


@api_view(['POST'])
def create_post(request):
    created_post = SetPostSerializer(data=request.data)
    try:
        created_post.is_valid(raise_exception=True)
        print("Valid")
        created_post.save()
        post = Posts.objects.filter(id=created_post.data["pk"]).first()
        for tag in request.data["tags"]:
            tag_obj = Tags()
            tag_obj.name = tag.lower().strip(' \t\n\r')
            tag_obj.post = post
            tag_obj.save()
        return JsonResponse(created_post.data,
                            safe=False, status=status.HTTP_200_OK)
        # return Response(created_post.data, status=status.HTTP_200_OK)
    except ValueError:
        print(created_post.errors)
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)
        # return Response(status=status.HTTP_404_NOT_FOUND)

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

    # -------------------- Like Post --------------------GET


@api_view(['POST'])
def post_likes(request, pk):
    post = Posts.objects.filter(pk=pk).first()
    user = UserTest.objects.filter(pk=request.data["user"]).first()
    if not post:
        return JsonResponse("error: No Post With This id", status=status.HTTP_409_CONFLICT, safe=False)
    if not user:
        return JsonResponse("error: No USER With This id", status=status.HTTP_409_CONFLICT, safe=False)
    like_post = PostLikes()
    like_post.post = post
    like_post.user = user

    if like_post.save():
        like_post_ser = LikesSerializer(like_post)
        return JsonResponse(like_post_ser.data,
                            safe=False, status=status.HTTP_200_OK)
    return JsonResponse("error: This User Already Liked this Post", status=status.HTTP_409_CONFLICT, safe=False)

    # -------------------- User Favorites--------------------GET


class SetUserFavorites(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = UserFavorites.objects.all()
    serializer_class = UserFavoritesSerializer

    def post(self, request):
        return self.create(request)

    # -------------------- User Favorites--------------------GET


# /////////////////////////// COMMENT  ///////////////////////////
    # -------------------- SET COMMENT  --------------------GET

@api_view(['POST'])
def set_comment(request, pk):
    post = Posts.objects.filter(pk=pk).first()
    user = UserTest.objects.filter(pk=request.data["user"]).first()
    comment = request.data["comment"]
    if not post:
        return JsonResponse("error: No Post With This id", status=status.HTTP_409_CONFLICT, safe=False)
    if not user:
        return JsonResponse("error: No USER With This id", status=status.HTTP_409_CONFLICT, safe=False)
    post_comment = Comment()
    post_comment.post = post
    post_comment.user = user
    post_comment.comment = comment
    post_comment.save()
    post_comment_ser = LikesSerializer(post_comment)
    return JsonResponse(post_comment_ser.data,
                        safe=False, status=status.HTTP_200_OK)


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
