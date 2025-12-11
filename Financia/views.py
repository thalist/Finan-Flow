from django.shortcuts import render

# Create your views here.


def finanflow(request):
    return render(request, 'finan/list.html')
