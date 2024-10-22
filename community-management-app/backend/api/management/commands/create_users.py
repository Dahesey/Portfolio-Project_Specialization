from django.core.management.base import BaseCommand
from api.models import User

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User.objects.create_user(username='admin', password='12admin3', role='admin')
        User.objects.create_user(username='frontdesk', password='12frontdesk3', role='frontdesk')
        User.objects.create_user(username='finance', password='12finance3', role='finance')

        self.stdout.write(self.style.SUCCESS('Successfully created users'))
