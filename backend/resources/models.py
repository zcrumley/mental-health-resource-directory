from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Resource(models.Model):
    CATEGORY_CHOICES = [
        ('food', 'Food'),
        ('housing', 'Housing / Shelter'),
        ('transportation', 'Transportation'),
        ('medical', 'Medical'),
        ('work', 'Work'),
        ('social', 'Social'),
    ]

    name = models.CharField(max_length=255)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.name
