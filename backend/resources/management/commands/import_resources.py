import csv
from django.core.management.base import BaseCommand
from resources.models import Resource

class Command(BaseCommand):
    help = 'Import resources from a CSV file into the Resource model'

    def handle(self, *args, **kwargs):
        try:
            with open('cleaned_resources.csv', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                count = 0
                for row in reader:
                    # Avoid duplicates based on name + phone
                    if not Resource.objects.filter(name=row['name'], phone=row['phone']).exists():
                        Resource.objects.create(
                            name=row['name'],
                            phone=row['phone'],
                            address=row.get('address', ''),
                            website=row.get('website', ''),
                            description=row.get('description', ''),
                            category='social'  # Default category (adjust if needed)
                        )
                        count += 1

                self.stdout.write(self.style.SUCCESS(f"Successfully imported {count} resources."))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("Could not find 'extracted_resources.csv'."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error during import: {e}"))
