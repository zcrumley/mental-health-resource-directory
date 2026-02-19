from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter
from .models import Resource
from .serializers import ResourceSerializer


class ResourceFilter(FilterSet):
    tags = CharFilter(field_name="tags__name", lookup_expr="iexact")
    category = CharFilter(field_name="category", lookup_expr="iexact")

    class Meta:
        model = Resource
        fields = ['tags', 'category']


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ResourceFilter
