from djoser.views import TokenCreateView, TokenDestroyView, UserViewSet
from rest_framework.permissions import AllowAny


class CustomUserCreateView(UserViewSet):
    permission_classes = [AllowAny]  # Разрешаем регистрацию для всех пользователей

    def perform_create(self, serializer):
        user = serializer.save()
        # Дополнительные действия при создании пользователя, например, отправка электронной почты с подтверждением

