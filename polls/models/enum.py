class ChoiceEnum:
    @classmethod
    def choices(cls):
        return [(getattr(cls, choice)[0], getattr(cls, choice)[1]) for choice in cls.__dict__ if not choice.startswith('_')]

    @classmethod
    def get_html_options(cls):
        return [{'value': choice[0], 'label': choice[1]} for choice in cls.choices()]


class Supplier(ChoiceEnum):
    adidas = ("adidas", "Adidas")
    nike = ("nike", "Nike")


class ProductStatus(ChoiceEnum):
    online = ("online", "Online")
    offline = ("offline", "Offline")


class PaymentType(ChoiceEnum):
    cash_on_delivery = ('cash_on_delivery', 'Cash on Delivery')
    credit_card = ('credit_card', 'Credit Card')
    paypal = ('paypal', 'PayPal')
