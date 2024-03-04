from django.urls import path, include, re_path

urlpatterns = [
    path('api/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]

