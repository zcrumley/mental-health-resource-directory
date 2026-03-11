from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter
from .models import Resource
from .serializers import ResourceSerializer


class ResourceFilter(FilterSet):
    tags = CharFilter(field_name="tags__name", lookup_expr="iexact")
    category = CharFilter(field_name="category", lookup_expr="iexact")
    subcategory = CharFilter(field_name="subcategory", lookup_expr="iexact")

    class Meta:
        model = Resource
        fields = ["tags", "category", "subcategory"]


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ResourceFilter

    search_fields = ["name", "description", "address"]


@api_view(["GET"])
def categories_list(request):
    choices = Resource._meta.get_field("category").choices
    data = [{"key": key, "label": label} for key, label in choices]
    return Response(data)