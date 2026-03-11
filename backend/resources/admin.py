from django.contrib import admin
from .models import Resource, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ("name",)


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "subcategory", "phone")
    list_filter = ("category", "subcategory", "tags")
    search_fields = ("name", "description", "address", "phone")
    filter_horizontal = ("tags",)