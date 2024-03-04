from django.urls import path
from polls.controller.order.view_controller import OrderView
from polls.controller.order.list_controller import OrderList

urlpatterns = [
    path('order', OrderView.as_view(), name="order_view"),
    path('order_list', OrderList.as_view(), name="order_list"),
    # path('orders/<int:order_id>/', order_detail, name='order_detail'),
]
