from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.


@login_required
def finanflow(request):
    return render(request, 'finan/dashboard.html')


@login_required
def receitas(request):
    return render(request, 'finan/receitas.html')


@login_required
def despesas(request):
    return render(request, 'finan/despesas.html')


@login_required
def categorias(request):
    return render(request, 'finan/categorias.html')
