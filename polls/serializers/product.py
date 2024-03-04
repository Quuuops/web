import os

from django.core.files.storage import default_storage
from django.utils.crypto import get_random_string
from rest_framework import serializers

from polls.models.product import Product


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.ImageField(
    )

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        image = validated_data.pop('images', None)
        product = Product.objects.create(**validated_data)
        if image:
            product.images = self.save_image(image)
            product.save()
        return product

    def update(self, instance, validated_data):
        image = validated_data.pop('images', None)
        instance = super().update(instance, validated_data)
        if image:
            self.delete_image(instance.images.path)  # Получаем путь к файлу изображения
            instance.images = self.save_image(image)
            instance.save()
        return instance

    def delete(self, instance):
        self.delete_image(instance.images)
        instance.delete()

    def save_image(self, image):
        unique_filename = self.generate_unique_filename(image)
        return default_storage.save(unique_filename, image)

    def delete_image(self, image_path):
        if image_path and default_storage.exists(image_path):
            default_storage.delete(image_path)

    def generate_unique_filename(self, image):
        random_string = get_random_string(length=10)
        extension = os.path.splitext(image.name)[-1]
        return os.path.join('products', f'{random_string}{extension}')
