from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    email = models.EmailField()
    receive_messages = models.BooleanField(default=True, help_text="Receive messages")
    additional_field = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.name

    def full_name(self):
        return f'{self.name} {self.surname}'
