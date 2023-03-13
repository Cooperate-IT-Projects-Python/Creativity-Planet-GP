from rest_framework import serializers
from .models import *


# USER Serializer

# User Serializer
class UserSerializerField(serializers.ModelSerializer):
    class Meta:
        model = UserTest
        fields = ["name"]


# Replay Serializer
class ReplaySerializerField(serializers.ModelSerializer):
    replay_owner = serializers.SerializerMethodField('get_extra_field')

    def get_extra_field(self, member):
        return UserSerializerField(UserTest.objects.get(pk=member.user.id)).data

    class Meta:
        model = CommentReplays
        fields = ["replay", "created_at", "replay_owner"]


# Comment Serializer
class CommentSerializerField(serializers.ModelSerializer):
    comment_owner = serializers.SerializerMethodField('get_extra_fielduser')
    comment_replays = serializers.SerializerMethodField('get_extra_fieldreplay')

    def get_extra_fielduser(self, member):
        return UserSerializerField(UserTest.objects.get(pk=member.user.id)).data

    def get_extra_fieldreplay(self, member):
        comment_replays = CommentReplays.objects.filter(comment=member.pk)
        return ReplaySerializerField(comment_replays, many=True).data

    class Meta:
        model = Comment
        fields = ["comment", "is_answer", "created_at", "comment_owner", "comment_replays"]


class AllPostsSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
    username = serializers.CharField(
        source="user.name", read_only=True)

    # userimage = serializers.CharField(
    #     source="user.image", read_only=True)
    comments = serializers.SerializerMethodField('get_extra_field')

    def get_extra_field(self, member):
        comments = Comment.objects.filter(post=member.pk)
        return CommentSerializerField(comments, many=True).data

    class Meta:
        model = Posts
        fields = ['pk', "title", "content", "rate_number", "created_at", "user",
                  "main_Image", "selected_at_by_admin", "username", "tags", "comments"]
        # depth = 2


# Posts model Serializer
class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'

# class CommentsSerializer(serializers.ModelSerializer):
#     tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
#     tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
#
#     class Meta:
#         model = Posts
#         fields = ['pk', "comment", "created_at", "is_answer", ]


# class AllPostsSerializer(serializers.ModelSerializer):
#     tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
#     username = serializers.CharField(
#         source="user.name", read_only=True)
#
#     # userimage = serializers.CharField(
#     #     source="user.image", read_only=True)
#     class Meta:
#         model = Posts
#         fields = ['pk', "title", "content", "rate_number", "created_at",
#                   "main_Image", "selected_at_by_admin", "username", "tags", "comment"]
#         depth = 2
