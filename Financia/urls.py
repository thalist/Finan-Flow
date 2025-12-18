from django.urls import path
from . import views

urlpatterns = [

    # dashboard
    # raiz redireciona para dashboard
    path('', views.home_redirect, name='home_redirect'),

    # dashboard principal
    path('dashboard/', views.finanflow, name='dashboard'),

    # Categorias
    path('categorias/', views.categoria_list, name='categorias'),
    path('categorias/nova/', views.categoria_create, name='categoria_create'),
    path('categorias/<int:id>/editar/',
         views.categoria_update, name='categoria_update'),
    path('categorias/<int:id>/excluir/',
         views.categoria_delete, name='categoria_delete'),
    path('dashboard/', views.finanflow, name='dashboard'),

    # Receitas
    path('receitas/', views.receitas, name='receitas'),
    path('receitas/nova/', views.receita_create, name='receita_create'),
    path('receita/<int:id>/editar/', views.receita_update, name='receita_update'),
    path('receita/<int:id>/excluir/', views.receita_delete, name='receita_delete'),

    # Despesas
    path('despesas/', views.despesas, name='despesas'),
    path('despesas/nova/', views.despesa_create, name='despesa_create'),
    path('despesa/<int:id>/editar/', views.despesa_update, name='despesa_update'),
    path('despesa/<int:id>/excluir/', views.despesa_delete, name='despesa_delete'),
]
