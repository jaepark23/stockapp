from django.contrib import admin
from .models import Share
# Register your models here.

class StockAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'count')

admin.site.register(Share, StockAdmin)
