from rest_framework import serializers
from .models import *
from django.db.models import Sum


# -------------------- User Serializer --------------------

class UserSerializerField(serializers.ModelSerializer):
    class Meta:
        model = UserTest
        fields = "__all__"


# ///////////////////// POSTS SERIALIZER /////////////////////

# -------------------- POST SERIALIZER --------------------
class PostsSerializer(serializers.ModelSerializer):
    # Tags
    tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
    # User
    post_owner = serializers.SerializerMethodField('get_extra_fielduser', read_only=True)
    # Liks
    num_likes = serializers.SerializerMethodField('get_extra_field_like', read_only=True)

    def get_extra_fielduser(self, member):
        return UserSerializerField(UserTest.objects.get(pk=member.user.id)).data

    # NUM of  COMMENTS
    num_comments = serializers.SerializerMethodField('get_extra_field', read_only=True)

    def get_extra_field(self, member):
        comments_numer = Comment.objects.filter(post=member.pk).count()
        return comments_numer

    def get_extra_field_like(self, member):
        likes_numer = PostLikes.objects.filter(post=member.pk).aggregate(Sum('value'))
        if not likes_numer["value__sum"]:
            likes_numer["value__sum"] = 0
        return likes_numer["value__sum"]

    class Meta:
        model = Posts
        fields = ['pk', "title", "content", "rate_number", "tags", "created_at", "main_Image",
                  "post_owner", "num_comments", "num_likes", "user"]
        read_only_fields = ('Num_comments', "post_owner", "tags")


# -------------------- POST SERIALIZER --------------------
class SetPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ["pk", "title", "content", "tags", "main_Image", "user"]
        read_only_fields = ("pk", "tags")


# -------------------- POST Rate SERIALIZER --------------------

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostRates
        fields = '__all__'


# -------------------- POST LIKES SERIALIZER --------------------
class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLikes
        fields = '__all__'


# -------------------- User FavoritesSerializer SERIALIZER --------------------
class UserFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavorites
        fields = '__all__'


# -------------------- END POST SERIALIZER --------------------


# -------------------- Comment SERIALIZER --------------------
class SetCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


# -------------------- Get Comment SERIALIZER --------------------
class GetCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["pk", "comment", "created_at", "is_answer", "user"]
        depth = 1


# -------------------- END Comment SERIALIZER --------------------


# -------------------- REPLAY SERIALIZER --------------------
class SetReplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReplays
        fields = '__all__'


from rest_framework import serializers
from .models import *
from django.db.models import Sum


# -------------------- User Serializer --------------------

class UserSerializerField(serializers.ModelSerializer):
    class Meta:
        model = UserTest
        fields = "__all__"


# ///////////////////// POSTS SERIALIZER /////////////////////

# -------------------- POST SERIALIZER --------------------
class PostsSerializer(serializers.ModelSerializer):
    # Tags
    tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
    # User
    post_owner = serializers.SerializerMethodField('get_extra_fielduser', read_only=True)
    # Liks
    num_likes = serializers.SerializerMethodField('get_extra_field_like', read_only=True)

    def get_extra_fielduser(self, member):
        return UserSerializerField(UserTest.objects.get(pk=member.user.id)).data

    # NUM of  COMMENTS
    num_comments = serializers.SerializerMethodField('get_extra_field', read_only=True)

    def get_extra_field(self, member):
        comments_numer = Comment.objects.filter(post=member.pk).count()
        return comments_numer

    def get_extra_field_like(self, member):
        likes_numer = PostLikes.objects.filter(post=member.pk).aggregate(Sum('value'))
        if not likes_numer["value__sum"]:
            likes_numer["value__sum"] = 0
        return likes_numer["value__sum"]

    class Meta:
        model = Posts
        fields = ['pk', "title", "content", "rate_number", "tags", "created_at", "main_Image",
                  "post_owner", "num_comments", "num_likes", "user"]
        read_only_fields = ('Num_comments', "post_owner", "tags")


# -------------------- POST SERIALIZER --------------------
class SetPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ["pk", "title", "content", "tags", "main_Image", "user"]
        read_only_fields = ("pk", "tags")


# -------------------- POST Rate SERIALIZER --------------------

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostRates
        fields = '__all__'


# -------------------- POST LIKES SERIALIZER --------------------
class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLikes
        fields = '__all__'


# -------------------- User FavoritesSerializer SERIALIZER --------------------
class UserFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavorites
        fields = '__all__'


# -------------------- END POST SERIALIZER --------------------


# -------------------- Comment SERIALIZER --------------------
class SetCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


# -------------------- Get Replay SERIALIZER --------------------
class GetReplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReplays
        fields = ["pk", "replay", "created_at", "user"]
        depth = 1


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


class PostPageDETAILSSerializer(serializers.ModelSerializer):
    # Tags
    tags = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Tags.objects.all())
    # User
    post_owner = serializers.SerializerMethodField('get_extra_fielduser', read_only=True)
    # Liks
    num_likes = serializers.SerializerMethodField('get_extra_field_like', read_only=True)

    def get_extra_fielduser(self, member):
        return UserSerializerField(UserTest.objects.get(pk=member.user.id)).data

    # NUM of  COMMENTS
    num_comments = serializers.SerializerMethodField('get_extra_field', read_only=True)

    def get_extra_field(self, member):
        comments_numer = Comment.objects.filter(post=member.pk).count()
        return comments_numer

    def get_extra_field_like(self, member):
        likes_numer = PostLikes.objects.filter(post=member.pk).aggregate(Sum('value'))
        if not likes_numer["value__sum"]:
            likes_numer["value__sum"] = 0
        return likes_numer["value__sum"]

    comments = serializers.SerializerMethodField('get_extra_field')

    def get_extra_field(self, member):
        comments = Comment.objects.filter(post=member.pk)
        return CommentSerializerField(comments, many=True).data

    class Meta:
        model = Posts
        fields = ['pk', "title", "content", "rate_number", "num_likes", "num_comments", "created_at", "user",
                  "main_Image", "selected_at_by_admin", "post_owner", "tags", "comments"]
