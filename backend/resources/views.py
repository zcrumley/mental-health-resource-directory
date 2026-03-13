from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter
from .models import Resource
from .serializers import ResourceSerializer


SUBCATEGORY_TAG_MAP = {
    "psychiatric-inpatient": ["psychiatric-inpatient", "mental-health", "crisis"],
    "general-medical": ["general-medical", "medical", "healthcare"],
    "substance-use": ["substance-use", "addiction", "recovery"],
    "dental": ["dental"],

    "emergency-shelter": ["emergency-shelter", "shelter", "housing", "homeless"],
    "housing-rental-assistance": ["housing-rental-assistance", "rental-assistance", "housing"],
    "temporary-transitional": ["temporary-transitional", "temporary-housing", "transitional-housing", "housing"],

    "clothing": ["clothing"],
    "education-career-development": ["education", "career-development", "employment", "job-training"],
    "financial": ["financial", "financial-assistance", "benefits"],
    "legal": ["legal"],
    "transportation": ["transportation"],

    "deaf": ["deaf"],
    "domestic-violence": ["domestic-violence"],
    "hiv-aids": ["hiv-aids"],
    "first-responders": ["first-responders"],
    "idd": ["idd", "intellectual-developmental-disabilities"],
    "pregnancy": ["pregnancy"],
    "veterans": ["veterans"],
}


class ResourceFilter(FilterSet):
    tags = CharFilter(field_name="tags__name", lookup_expr="iexact")

    class Meta:
        model = Resource
        fields = ["tags"]


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ResourceFilter
    search_fields = ["name", "description", "address"]

    def get_queryset(self):
        queryset = Resource.objects.all()

        category = self.request.query_params.get("category")
        subcategory = self.request.query_params.get("subcategory")
        tag = self.request.query_params.get("tags")

        if subcategory:
            tag_names = SUBCATEGORY_TAG_MAP.get(subcategory, [])

            query = Q(subcategory__iexact=subcategory)

            if tag_names:
                query |= Q(tags__name__in=tag_names)

            queryset = queryset.filter(query).distinct()

        elif category:
            queryset = queryset.filter(category__iexact=category)

        if tag:
            queryset = queryset.filter(tags__name__iexact=tag)

        return queryset.distinct()


@api_view(["GET"])
def categories_list(request):
    choices = Resource._meta.get_field("category").choices
    data = [{"key": key, "label": label} for key, label in choices]
    return Response(data)