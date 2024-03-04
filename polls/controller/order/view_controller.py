from django.views.generic import TemplateView


class OrderView(TemplateView):
    template_name = "order/view.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['additional_data'] = 'This is additional data.'
        return context

