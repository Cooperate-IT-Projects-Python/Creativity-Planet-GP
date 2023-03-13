from rest_framework import serializers
from .models import *


# -------------------- User Serializer --------------------

class UserSerializerField(serializers.ModelSerializer):
    class Meta:
        model = UserTest
        fields = ["name"]


# -------------------- POST SERIALIZER --------------------
class PostsSerializer(serializers.ModelSerializer):
    # Tags
    tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
    # User
    post_owner = serializers.SerializerMethodField('get_extra_fielduser', read_only=True)

    def get_extra_fielduser(self, member):
        return UserSerializerField(UserTest.objects.get(pk=member.user.id)).data

    # NUM of  COMMENTS
    Num_comments = serializers.SerializerMethodField('get_extra_field', read_only=True)

    def get_extra_field(self, member):
        comments_numer = Comment.objects.filter(post=member.pk).count()
        return comments_numer

    class Meta:
        model = Posts
        fields = ['pk', "title", "content", "rate_number", "tags", "created_at", "main_Image",
                  "post_owner", "Num_comments", "user"]
        read_only_fields = ('user', 'Num_comments', "post_owner")


# -------------------- END POST SERIALIZER --------------------


# -------------------- Comment SERIALIZER --------------------
class SetCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


# -------------------- END Comment SERIALIZER --------------------


# -------------------- REPLAY SERIALIZER --------------------
class SetReplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReplays
        fields = '__all__'


# -------------------- END REPLAY SERIALIZER --------------------

# -------------------- Reports SERIALIZER --------------------
class SetPostReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostReports
        fields = '__all__'


class SetCommentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReports
        fields = '__all__'


class SetReplayReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplayReports
        fields = '__all__'


# -------------------- END Reports SERIALIZER --------------------


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


class PostPageSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
    # User
    post_owner = serializers.SerializerMethodField('get_extra_fielduser')

    def get_extra_fielduser(self, member):
        return UserSerializerField(UserTest.objects.get(pk=member.user.id)).data

    comments = serializers.SerializerMethodField('get_extra_field')

    def get_extra_field(self, member):
        comments = Comment.objects.filter(post=member.pk)
        return CommentSerializerField(comments, many=True).data

    class Meta:
        model = Posts
        fields = ['pk', "title", "content", "rate_number", "created_at", "user",
                  "main_Image", "selected_at_by_admin", "post_owner", "tags", "comments"]
        # depth = 2
