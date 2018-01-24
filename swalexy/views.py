from django.shortcuts import render


homepage = {
    'title': 'HomePage',
    'names': {
        'ade',
        'olu'
    }
}

eventpage = {
    'title': 'Events',
}

gallerypage = {
    'title': 'Gallery',
    'names': [
        'ade',
        'olu'
    ]
}


def home(request):

    return render(request, 'home.html', homepage)


def events(request):
    return render(request, 'events.html', eventpage)


def gallery(request):
    return render(request, 'gallery.html')
