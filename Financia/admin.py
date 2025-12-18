from django.contrib import admin
from .models import Categoria
from .models import Receita
from .models import Despesa

# Register your models here.
admin.site.register(Categoria)
admin.site.register(Receita)
admin.site.register(Despesa)