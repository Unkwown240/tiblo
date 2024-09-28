from rest_framework import serializers
from users.models import NewUser

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'first_name', 'start_date', 'about', 'followers', 'password', 'topic', 'blogs_written')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    # def serialize(self, data):
    #     new = {}
    #     fields = NewUser._meta.fields
    #     print(fields.)
    #     for i in fields:
    #         data[i] = new[i]
    #     print(new)




class CustomUserSerializerWithoutAbout(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'first_name', 'start_date', 'followers', 'password', 'topic', 'blogs_written')
        extra_kwargs = {'password': {'write_only': True}}