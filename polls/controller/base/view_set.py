from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from polls.models.enum import Supplier, ProductStatus
from polls.models.product import Product
from polls.serializers.product import ProductSerializer


class Abcstat(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get_form_options() -> dict:
        supplier_options = [{'value': supplier[0], 'label': supplier[1]} for supplier in Supplier.choices()]
        status_options = [{'value': status[0], 'label': status[1]} for status in ProductStatus.choices()]
        return {'supplier_options': supplier_options, 'status_options': status_options}

    @action(detail=False, methods=['get'])
    def options(self, request) -> Response:
        form_options = self.get_form_options()
        return Response(form_options)
