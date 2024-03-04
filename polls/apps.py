from django.apps import AppConfig
import requests
from webpack_loader.loader import WebpackLoader


class ExternalWebpackLoader(WebpackLoader):

  def load_assets(self):
    url = self.config['STATS_URL']
    return requests.get(url).json()


class PollsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'polls'
