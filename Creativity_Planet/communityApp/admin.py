from django.contrib import admin
from .models import *
# POST -  POST Comments - POST REPORTS - POST RATES - TAGS -
# COMMENT REPORTS - COMMENT REPLAYS - REPLAYS REPORTS
# Register your models here.
admin.site.register(UserTest)
admin.site.register(Posts)
admin.site.register(Tags)
admin.site.register(PostImages)
admin.site.register(PostRates)
admin.site.register(PostLikes)
admin.site.register(Comment)
admin.site.register(UserFavorites)
admin.site.register(CommentReports)
admin.site.register(CommentReplays)
admin.site.register(ReplayReports)

