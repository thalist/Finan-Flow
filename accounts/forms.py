from allauth.account.forms import LoginForm
from allauth.account.forms import SignupForm


class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field in self.fields.values():
            field.widget.attrs.update({
                'class': 'input-style'
            })


class CustomSignupForm(SignupForm):

    def save(self, request):
        user = super().save(request)
        return user
