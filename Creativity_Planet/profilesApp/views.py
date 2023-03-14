from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect,reverse
from django.contrib.auth import get_user_model, login,logout,authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required
#imports for verification by mail
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.db.models.query_utils import Q
from .tokens import account_activation_token

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from .serializers import SignUpUserSerialzer


@api_view(['POST'])
def register(request):
    # if request.method == "POST":
        # form = UserRegistrationForm(request.POST,request.FILES)
    userser = SignUpUserSerialzer(data=request.data)
    print('hello0')
    if userser.is_valid():
        print('hello1')
        user = userser.save(is_active = False)
        print('hello2')
        activateEmail(request, user, userser.validated_data['email'])
        print('hello3')
        return Response(userser.data)

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def custom_login(request):
    # if request.user.is_authenticated:
    #     return redirect(reverse('home'))

    username=request.data['username']
    password=request.data['password']
    print(username)
    print(password)
    print('login1')
    user = authenticate(username=username, password=password)
    print('login2')
    print(user)
    if user is not None:
        login(request, user)
        return Response({"user": user.id})

    else:
        return Response("error")

@api_view(['POST'])
def custom_logout(request):
    logout(request)
    return Response("logged out")




def activateEmail(request, user, to_email):
    mail_subject = 'Activate your user account.'
    message = render_to_string('template_activate_account.html', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        messages.success(request, f'Dear <b>{user}</b>, please go to you email <b>{to_email}</b> inbox and click on \
            received activation link to confirm and complete the registration. <b>Note:</b> Check your spam folder.')
    else:
        messages.error(request,
            f'Problem sending confirmation email to {to_email}, check if you typed it correctly.')

@api_view(['GET'])
def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return Response('account activated')
    else:
        return Response('activation failed')
