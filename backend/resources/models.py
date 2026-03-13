from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Resource(models.Model):
    CATEGORY_CHOICES = [
        ("medical-mental-health", "Medical and Mental Health"),
        ("housing-shelter", "Housing and Shelter"),
        ("social-services", "Social Services"),
        ("specialized-services", "Specialized Services"),
    ]

    SUBCATEGORY_CHOICES = [
        ("mental health ", "Mental Health"),
        ("medical", " Medical"),
        ("substance-use", "Substance Use"),
        ("dental", "Dental"),

        ("emergency-shelter", "Emergency Shelter"),
        ("housing-rental-assistance", "Housing & Rental Assistance"),
        ("temporary-transitional", "Temporary & Transitional"),
        
        ("transportation", "Transportation"),
        ("clothing", "Clothing"),
        ("education-employment", "Education & Employment"),
        ("financial", "Financial"),
        ("legal", "Legal"),

        ("deaf", "Deaf"),
        ("domestic-violence", "Domestic Violence"),
        ("hiv-aids", "HIV / AIDS"),
        ("first-responders", "First Responders"),
        ("idd", "IDD"),
        ("pregnancy", "Pregnancy"),
        ("veterans", "Veterans"),
    ]

    name = models.CharField(max_length=255)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(max_length=50, choices=SUBCATEGORY_CHOICES, blank=True)

    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.name