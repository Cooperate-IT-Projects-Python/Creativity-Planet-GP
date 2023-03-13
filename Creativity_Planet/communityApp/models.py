from django.db import models
from datetime import datetime
from django.core.validators import MaxValueValidator, MinValueValidator


# POST -  POST Comments - POST REPORTS - POST RATES - TAGS -
# COMMENT REPORTS - COMMENT REPLAYS - REPLAYS REPORTS
class UserTest(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Posts(models.Model):
    title = models.CharField(max_length=200, unique=True)
    content = models.TextField()
    rate_number = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    selected_at_by_admin = models.BooleanField(default=False)
    main_Image = models.ImageField(upload_to='media/posts/%y/%m/%d', null=False, blank=False)
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title


class Tags(models.Model):
    name = models.CharField(max_length=20)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='tags')

    def __str__(self):
        return self.name


class PostImages(models.Model):
    image = models.ImageField(upload_to='media/posts/%y/%m/%d', null=False, blank=False)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='postImages')

    def __str__(self):
        return self.post.image


class PostRates(models.Model):
    RATES_CHOICES = (
        (-1, "Down"),
        (0, "Hold"),
        (1, "Up"),
    )
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='postRates')
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='postRates')
    value = models.IntegerField(choices=RATES_CHOICES, default=0)

    def __str__(self):
        return f"rating {self.value} on {self.post.title} by {self.user} "


class PostReports(models.Model):
    reason = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='postReports')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='postReports')

    def __str__(self):
        return f"report {self.id} on comment {self.post} from {self.user}"


class Comment(models.Model):
    comment = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    is_answer = models.BooleanField(default=False)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='comment')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='comment')

    def __str__(self):
        return f"comment {self.id} on {self.post.title} from {self.user}"


class CommentReplays(models.Model):
    replay = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='commentReplays')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='commentReplays')

    def __str__(self):
        return f"Comment-report {self.id} on comment {self.comment} reported by {self.user}"


class CommentReports(models.Model):
    reason = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='commentReports')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='commentReports')

    def __str__(self):
        return f"Comment-report {self.id} on comment {self.comment} reported by {self.user}"


class ReplayReports(models.Model):
    reason = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    replay = models.ForeignKey(CommentReplays, on_delete=models.CASCADE, related_name='replayReports')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='replayReports')

    def __str__(self):
        return f"Comment-report {self.id} on comment {self.comment} reported by {self.user}"


class UserFavorites(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='userFavorites')
    user = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name='userFavorites')

    def __str__(self):
        return f"favorite {self.id} on {self.post} from {self.user}"
