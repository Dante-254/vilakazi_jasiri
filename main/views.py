from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, "home.html")

def about(request):
    return render(request, "about.html")

def contact(request):
    return render(request, "contact.html")

def kenya_scouts_law(request):
    return render(request, "kenya_scouts_law.html")

def leadership(request):
    return render(request, "leadership.html")

def news(request):
    return render(request, "news.html")

def upcoming_events(request):
    return render(request, "upcoming_events.html")

def past_events(request):
    return render(request, "past_events.html")