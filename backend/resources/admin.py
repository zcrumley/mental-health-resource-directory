from django.contrib import admin
from .models import Resource, Tag

class ResourceAdmin(admin.ModelAdmin):
    filter_horizontal = ('tags',)

admin.site.register(Resource, ResourceAdmin)
admin.site.register(Tag)
