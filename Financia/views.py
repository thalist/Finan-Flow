from .forms import DespesaForm
from .models import Categoria, Despesa
from django.shortcuts import render, get_object_or_404, redirect
from django.shortcuts import render, redirect, get_object_or_404
from .models import Categoria, Receita, Despesa
from .forms import CategoriaForm, ReceitaForm, DespesaForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from collections import defaultdict
from datetime import datetime
import json
from decimal import Decimal

# inicia tudo
@login_required
def home_redirect(request):
    """
    Redireciona a raiz '/' para o dashboard.
    """
    return redirect('dashboard')


# Dashboard view
@login_required
def finanflow(request):
    # -----------------------
    # Receitas e despesas
    # -----------------------
    receitas = Receita.objects.all()
    despesas = Despesa.objects.all()

    # Totais
    total_receitas = float(receitas.aggregate(total=Sum('valor'))['total'] or 0)
    total_despesas = float(despesas.aggregate(total=Sum('valor'))['total'] or 0)
    saldo_atual = float(total_receitas - total_despesas)

    # -----------------------
    # Transações recentes
    # -----------------------
    todas_transacoes = sorted(
        list(receitas) + list(despesas),
        key=lambda t: t.data,
        reverse=True
    )
    transacoes_recentes = []
    for t in todas_transacoes[:5]:
        t.tipo = 'receita' if isinstance(t, Receita) else 'despesa'
        transacoes_recentes.append(t)

    # -----------------------
    # Despesas por categoria
    # -----------------------
    despesas_por_categoria = {}
    for d in despesas:
        nome = d.categoria.nome
        if nome not in despesas_por_categoria:
            despesas_por_categoria[nome] = {
                'valor': 0,
                'percent': 0,
                'cor_class': 'cor-' + nome.lower().replace(' ', '-')
            }
        despesas_por_categoria[nome]['valor'] += float(d.valor)

    # Calcular percentual
    for cat, dados in despesas_por_categoria.items():
        dados['percent'] = round((dados['valor'] / total_despesas * 100), 1) if total_despesas else 0

    # -----------------------
    # Evolução mensal: receitas e despesas por mês
    # -----------------------
    evolucao = {}
    for t in list(receitas) + list(despesas):
        mes = t.data.strftime('%Y-%m')
        if mes not in evolucao:
            evolucao[mes] = {'receitas': 0, 'despesas': 0}
        if isinstance(t, Receita):
            evolucao[mes]['receitas'] += float(t.valor)
        else:
            evolucao[mes]['despesas'] += float(t.valor)

    # Ordenar por mês
    meses = sorted(evolucao.keys())
    receitas_por_mes = [float(evolucao[m]['receitas']) for m in meses]
    despesas_por_mes = [float(evolucao[m]['despesas']) for m in meses]

    # -----------------------
    # Dados para gráfico de pizza
    # -----------------------
    categorias = list(despesas_por_categoria.keys())
    valores_categorias = [float(despesas_por_categoria[cat]['valor']) for cat in categorias]

    # -----------------------
    # Contexto do template
    # -----------------------
    context = {
        'saldo_atual': saldo_atual,
        'total_receitas': total_receitas,
        'total_despesas': total_despesas,
        'transacoes_recentes': transacoes_recentes,
        'despesas_por_categoria': despesas_por_categoria,
        # Variáveis para JS
        'meses': json.dumps(meses),
        'receitas_por_mes': json.dumps(receitas_por_mes),
        'despesas_por_mes': json.dumps(despesas_por_mes),
        'categorias': json.dumps(categorias),
        'valores_categorias': json.dumps(valores_categorias),
    }

    return render(request, 'finan/dashboard.html', context)


# View de receitas
@login_required
def receitas(request):
    lista = Receita.objects.order_by('-data')
    total = sum(r.valor for r in lista)
    return render(request, 'finan/receitas.html', {'transacoes': lista, 'total': total})


def receita_create(request):
    if request.method == 'POST':
        form = ReceitaForm(request.POST)
        next_url = request.POST.get('next', '/receitas/')
        if form.is_valid():
            form.save()
            return redirect(next_url)
    else:
        form = ReceitaForm()
        next_url = request.GET.get('next', '/receitas/')

    return render(request, 'finan/transacao_form.html', {
        'form': form,
        'next_url': next_url,
        'titulo': 'Nova Receita'
    })

def receita_update(request, id):
    receita = get_object_or_404(Receita, id=id)
    if request.method == 'POST':
        form = ReceitaForm(request.POST, instance=receita)
        if form.is_valid():
            form.save()
            messages.success(request, "Receita atualizada com sucesso!")
            return redirect('receitas')
    else:
        form = ReceitaForm(instance=receita)
    return render(request, 'finan/transacao_form.html', {'form': form, 'titulo': 'Editar Receita'})


def receita_delete(request, id):
    receita = get_object_or_404(Receita, id=id)

    if request.method == 'POST':
        next_url = request.POST.get('next', 'receitas')  # pega do POST ou padrão
        receita.delete()
        messages.success(request, "Receita excluída com sucesso!")
        return redirect(next_url)

    next_url = request.GET.get('next', 'receitas')  # pega do GET na primeira renderização
    return render(request, 'finan/transacao_confirm_delete.html', {
        'receita': receita,
        'titulo': 'Excluir Receita',
        'next_url': next_url
    })


# View de despesas


@login_required
def despesas(request):
    transacoes = Despesa.objects.order_by('-data')

    # Total de despesas
    total = transacoes.aggregate(total_valor=Sum('valor'))['total_valor'] or 0

    # Total por categoria
    despesas_por_categoria = {}
    for d in transacoes:
        nome_cat = d.categoria.nome
        if nome_cat not in despesas_por_categoria:
            despesas_por_categoria[nome_cat] = {
                'valor': 0, 'percent': 0, 'cor_class': ''}
        despesas_por_categoria[nome_cat]['valor'] += d.valor

    # Calcula percentual e cor
    for nome_cat, dados in despesas_por_categoria.items():
        dados['percent'] = round(
            (dados['valor'] / total * 100), 2) if total else 0
        dados['cor_class'] = 'cor-' + nome_cat.lower().replace(' ', '-')

    return render(request, 'finan/despesas.html', {
        'transacoes': transacoes,
        'total': total,
        'despesas_por_categoria': despesas_por_categoria
    })


# Funções de CRUD
@login_required
def despesa_create(request):
    if request.method == 'POST':
        form = DespesaForm(request.POST)
        next_url = request.POST.get('next', '/despesas/')  # pega do POST ou padrão
        if form.is_valid():
            form.save()
            messages.success(request, "Despesa criada com sucesso!")
            return redirect(next_url)
    else:
        form = DespesaForm()
        next_url = request.GET.get('next', '/despesas/')  # pega do GET ou padrão

    return render(request, 'finan/transacao_form.html', {
        'form': form,
        'next_url': next_url,
        'titulo': 'Nova Despesa'
    })


@login_required
def despesa_update(request, id):
    despesa = get_object_or_404(Despesa, id=id)
    if request.method == 'POST':
        form = DespesaForm(request.POST, instance=despesa)
        if form.is_valid():
            form.save()
            messages.success(request, "Despesa atualizada com sucesso!")
            return redirect('despesas')
    else:
        form = DespesaForm(instance=despesa)
    return render(request, 'finan/transacao_form.html', {'form': form, 'titulo': 'Editar Despesa'})


@login_required
def despesa_delete(request, id):
    despesa = get_object_or_404(Despesa, id=id)
    if request.method == 'POST':
        despesa.delete()
        messages.success(request, "Despesa excluída com sucesso!")
        return redirect('despesas')
    return render(request, 'finan/transacao_confirm_delete.html', {'transacao': despesa, 'titulo': 'Excluir Despesa'})

# View de categorias
# Listagem de todas as categorias


def categoria_list(request):
    categorias_receita = Categoria.objects.filter(tipo='R').order_by('nome')
    categorias_despesa = Categoria.objects.filter(tipo='D').order_by('nome')
    return render(request, 'finan/categorias.html', {
        'categorias_receita': categorias_receita,
        'categorias_despesa': categorias_despesa
    })

# Criar nova categoria

def categoria_create(request):
    """
    View para criar uma nova categoria.
    Funciona com redirecionamento dinâmico usando next_url.
    """
    if request.method == 'POST':
        form = CategoriaForm(request.POST)
        # Pega next_url do POST (enviado pelo campo hidden)
        next_url = request.POST.get('next', '/categorias/')
        if form.is_valid():
            form.save()
            return redirect(next_url)  # redireciona para onde veio
    else:
        form = CategoriaForm()
        # Pega next_url do GET na primeira vez
        next_url = request.GET.get('next', '/categorias/')

    # Renderiza o formulário, passando next_url para o template
    return render(request, 'finan/categoria_form.html', {
        'form': form,
        'next_url': next_url,
        'titulo': 'Nova Categoria'
    })

# Editar categoria existente


def categoria_update(request, id):
    categoria = get_object_or_404(Categoria, id=id)
    if request.method == 'POST':
        form = CategoriaForm(request.POST, instance=categoria)
        if form.is_valid():
            form.save()
            messages.success(request, "Categoria atualizada com sucesso!")
            return redirect('categorias')
    else:
        form = CategoriaForm(instance=categoria)
    return render(request, 'finan/categoria_form.html', {'form': form, 'titulo': 'Editar Categoria'})

# Excluir categoria


def categoria_delete(request, id):
    categoria = get_object_or_404(Categoria, id=id)
    if request.method == 'POST':
        categoria.delete()
        messages.success(request, "Categoria excluída com sucesso!")
        return redirect('categorias')
    return render(request, 'finan/categoria_confirm_delete.html', {'categoria': categoria})
