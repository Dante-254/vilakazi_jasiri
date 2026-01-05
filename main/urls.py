from django.urls import path, include
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("structure/kenya-scouts-law/", views.kenya_scouts_law, name="kenya_scouts_law"),
    path("structure/leadership/", views.leadership, name="leadership"),
    path("what-we-do/news/", views.news, name="news"),
    path("what-we-do/upcoming-events/", views.upcoming_events, name="upcoming_events"),
    path("what-we-do/past-events/", views.past_events, name="past_events"),
]