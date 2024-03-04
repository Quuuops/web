from django.views.generic import ListView
from polls.models.order import Order


class OrderList(ListView):
    model = Order
    template_name = 'order/list.html'
    context_object_name = 'orders'
    ordering = ['-date']
    paginate_by = 10

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def get_queryset(self):
        return Order.objects.filter(status=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Order List'
        return context