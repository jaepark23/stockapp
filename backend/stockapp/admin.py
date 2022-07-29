from django.contrib import admin
from .models import Share, User
from django.contrib.auth.admin import UserAdmin
# Register your models here.


class StockAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'count')


class UserAdmin(admin.ModelAdmin):
    fields = ('username', 'email', 'balance', 'order_history')


admin.site.register(User, UserAdmin)
admin.site.register(Share, StockAdmin)
