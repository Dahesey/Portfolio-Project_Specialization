from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserRegistrationSerializer(serializers.ModelSerializer):
    church_name = serializers.CharField(required=True)
    gender = serializers.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female')])
    contact_number = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'confirm_password', 'church_name', 'gender', 'contact_number']

    def validate(self, data):
        # Ensure passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        # Remove confirm_password since we don't need to store it
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
        )

        # Create the associated UserProfile with additional fields
        UserProfile.objects.create(
            user=user,
            church_name=validated_data['church_name'],
            gender=validated_data['gender'],
            contact_number=validated_data['contact_number']
        )

        return user
