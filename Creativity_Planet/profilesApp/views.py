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
from communityApp.models import Posts,UserFavorites
from communityApp.serializers import PostsSerializer,UserFavoritesSerializer
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated  

from django.views.decorators.csrf import csrf_exempt


from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from .serializers import SignUpUserSerialzer


@api_view(['POST'])
def register(request):
    # if request.method == "POST":
        # form = UserRegistrationForm(request.POST,request.FILES)
    print("hiiiiiiiiiiiiiiiiiiiiiiiiii")
    print(request.data)
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
        return Response({
            "user_id": user.id,
            "username": user.username,
            # "image": user.image,
                         })

    else:
        return Response("error")


@api_view(['POST'])
@csrf_exempt
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

@api_view(['GET'])
def user_profile(request):
    user = request.user
    posts = Posts.objects.filter(user=user)
    serial = PostsSerializer(posts,many=True)
    favposts = UserFavorites.objects.filter(user=user)
    # query= favposts.userFavorites.all()
    print(favposts)
    # print(query)
    favserial = UserFavoritesSerializer(favposts,many=True)

    return Response({"posts":serial.data,"favposts":favserial.data})

@api_view(['POST'])
def edit_user_profile(request):
    user = request.user
    user.first_name = request.POST['first_name']
    user.last_name = request.POST['last_name']
    user.save()
    return Response("profile edited")

# class PostsGetSet(generics.ListCreateAPIView):
#     user = request.user
#     queryset = Posts.objects.filter(user=user)
#     serializer_class = PostsSerializer
# from django.http import JsonResponse

# import json
# @api_view(['POST'])
# def custom_login(request):
#     # if request.user.is_authenticated:
#     #     return redirect(reverse('home'))
#     data = json.loads(request.body)
#     username = data.get('username')
#     password = data.get('password')
#     print(username)
#     print(password)
#     print('login1')
#     user = authenticate(username=username, password=password)
#     print('login2')
#     print(user)
#     if user is not None:
#         login(request, user)
#         return JsonResponse({"detail": "Success"})

#     else:
#         return JsonResponse({"detail": "Invalid credentials"},status=400)

@api_view(['POST'])
def password_reset_request(request):
    if request.method == 'POST':
            print("pass1")
        # form = PasswordResetForm(request.POST)
        # if form.is_valid():
            user_email = request.data['email']
            print("pass2")
            
            associated_user = get_user_model().objects.filter(Q(email=user_email)).first()
            print("pass3")

            if associated_user:
                subject = "Password Reset request"
                message = render_to_string("template_reset_password.html", {
                    'user': associated_user,
                    'domain': get_current_site(request).domain,
                    'uid': urlsafe_base64_encode(force_bytes(associated_user.pk)),
                    'token': account_activation_token.make_token(associated_user),
                    "protocol": 'https' if request.is_secure() else 'http'
                })
                email = EmailMessage(subject, message, to=[associated_user.email])
                print("pass4")
                if email.send():
                    messages.success(request,
                        """
                        <h2>Password reset sent</h2><hr>
                        <p>
                            We've emailed you instructions for setting your password, if an account exists with the email you entered. 
                            You should receive them shortly.<br>If you don't receive an email, please make sure you've entered the address 
                            you registered with, and check your spam folder.
                        </p>
                        """
                    )
                    print("pass5")
                    return Response("Password reset sent")
                else:
                    return Response("reset sent")



    # form = PasswordResetForm()
    # return render(
    #     request=request,
    #     template_name="password_reset.html",
    #     context={"form": form}
    #     )

@api_view(['GET','POST'])
def passwordResetConfirm(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        print("confr0")
    except:
        user = None
    print("confr1")
    print(user)

    if user is not None and account_activation_token.check_token(user, token):
        print("enter1")
        if request.method == 'POST':
            passser = ChangePasswordSerializer(data=request.data)
            print("enter2")

            # form = SetPasswordForm(user, request.POST)
            # password=request.data['password']
            if passser.is_valid():
                print('passre1')
                passw = passser.save()
                print('passre2')
                # form.save()
                return Response("pass succefuly changed")
            else:
                return Response("error")
        else:
            passser = ChangePasswordSerializer()  
            return Response(passser.data)  

    else:
        return Response(" major error")

    


