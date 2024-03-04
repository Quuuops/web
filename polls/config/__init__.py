# polls/config/__init__.py
from importlib import import_module
from pathlib import Path

app_urls = []


def include_app_urls(app_name):
    try:
        module = import_module(app_name)
        app_urls.extend(module.urlpatterns)
    except (ImportError, AttributeError) as e:
        pass


for module in Path(__file__).parent.glob('*.py'):
    if module.name.startswith('__'):
        continue

    try:
        app_name = f'polls.config.{module.stem}'
        include_app_urls(app_name)
    except ImportError:
        pass
