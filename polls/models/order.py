from django.db import models

from polls.models.product import Product
from polls.models.customer import Customer
from polls.models.enum import PaymentType


class Order(models.Model):
    date = models.DateTimeField(auto_now_add=True, db_comment='Date of place Order')
    code = models.CharField(max_length=100, verbose_name='Order Code',  blank=False, unique=True, db_index=True, editable=False, db_comment='Order Code')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    status = models.BooleanField(default=False, db_comment='Order Status')
    brand = models.CharField(max_length=50, help_text='Brand', null=False, default='default', db_index=True)
    coupon_code = models.CharField(max_length=20, blank=True, null=True)
    currency = models.CharField(max_length=3, blank=True, null=True)
    currency_rate = models.DecimalField(max_digits=10, decimal_places=4, default=1, blank=True, null=True)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    email = models.EmailField()
    grand_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_mobile_app = models.BooleanField(default=False)
    first_order = models.BooleanField(default=False)
    additional_info = models.JSONField(blank=True, null=True)
    payment_type = models.CharField(max_length=20, choices=PaymentType.choices, blank=True, null=True)
    images = models.ImageField(upload_to='electronics', null=True)
    quantity = models.PositiveIntegerField(default=0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def subtotal(self):
        return self.price * self.quantity


class Address(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip_code}"


class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for Order #{self.order.id} - {self.amount}"


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.PositiveIntegerField()

    def __str__(self):
        return f"Review by {self.customer.name} for {self.product.name}"

