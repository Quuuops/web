from django.urls import path, include
from rest_framework import routers

from polls.controller.product.view_controller import ProductViewSet

router = routers.DefaultRouter()
router.register(r'product', ProductViewSet)

urlpatterns = [
    path('', include(router.urls))
]

