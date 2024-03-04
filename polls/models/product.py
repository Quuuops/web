from django.db import models
from django.utils import timezone

from polls.models.enum import Supplier, ProductStatus


class Product(models.Model):
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=100,  choices=ProductStatus.choices, default=ProductStatus.offline, null=False, blank=False)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    supplier = models.CharField(max_length=50, choices=Supplier.choices)
    brand = models.CharField(max_length=50, null=False, default='default')
    category = models.CharField(max_length=50, default='default category')
    images = models.ImageField(upload_to='product/', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class SimpleProduct(models.Model):

    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    quantity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='simple_products')
